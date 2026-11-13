// Función de Supabase "sunat-gre".
// Recibe el código (hashqr) del QR de una guía de remisión electrónica y devuelve, leyendo el PDF de SUNAT:
//   { ok, gr, motivo, motivoDetalle, destinatario }
// Solo responde a usuarias con sesión iniciada (Supabase verifica el token antes de ejecutar esta función).
// No guarda nada: es un intermediario porque SUNAT no permite consultar directamente desde la página web.

const SUNAT_URL = 'https://e-factura.sunat.gob.pe/v1/contribuyente/gre/comprobantes/descargaqr?hashqr=';
// SUNAT deja sin respuesta una parte de las consultas (a veces 4 de cada 10). En vez de esperar cada intento,
// se lanza un intento nuevo cada STAGGER_MS sin cortar los anteriores, y gana el primero que entrega el PDF.
const STAGGER_MS = 2000;   // cada cuánto se lanza un intento adicional
const MAX_ATTEMPTS = 6;    // intentos como máximo por guía
const DEADLINE_MS = 18000; // tiempo total máximo por guía

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });
}

function fetchPdf(hashqr) {
  return new Promise((resolve, reject) => {
    const controllers = [];
    let finished = false, launched = 0, pending = 0, lastError = 'SUNAT no respondió a tiempo';
    let stagger = null;
    const finish = (err, value) => {
      if (finished) return;
      finished = true;
      clearInterval(stagger); clearTimeout(deadline);
      controllers.forEach((c) => { try { c.abort(); } catch (_e) { /* ya terminó */ } });
      err ? reject(new Error(err)) : resolve(value);
    };
    const attempt = async () => {
      if (finished || launched >= MAX_ATTEMPTS) return;
      launched++; pending++;
      const ctrl = new AbortController(); controllers.push(ctrl);
      try {
        // El parámetro "_" cambia en cada intento para que no se reutilice una respuesta trabada.
        const res = await fetch(`${SUNAT_URL}${encodeURIComponent(hashqr)}&_=${Date.now()}${launched}`, { signal: ctrl.signal });
        const type = res.headers.get('content-type') || '';
        if (res.ok && type.includes('pdf')) {
          const bytes = new Uint8Array(await res.arrayBuffer());
          finish(null, { bytes, disposition: res.headers.get('content-disposition') || '' });
          return;
        }
        lastError = `SUNAT respondió ${res.status}`;
        if (res.status >= 400 && res.status < 500 && res.status !== 429) { finish('QR no válido o guía no encontrada en SUNAT'); return; }
      } catch (_e) {
        // intento sin respuesta o cortado: lo cubren los demás
      } finally {
        pending--;
        if (!finished && pending === 0 && launched >= MAX_ATTEMPTS) finish(lastError);
      }
    };
    const deadline = setTimeout(() => finish(lastError), DEADLINE_MS);
    attempt();
    stagger = setInterval(attempt, STAGGER_MS);
  });
}

async function inflate(bytes) {
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

// Extrae, en orden, los textos que el PDF dibuja con Tj (SUNAT usa Helvetica con WinAnsi: texto simple).
async function pdfStrings(bytes) {
  const latin = (u8) => { let s = ''; for (let i = 0; i < u8.length; i += 8192) s += String.fromCharCode(...u8.subarray(i, i + 8192)); return s; };
  const raw = latin(bytes);
  const out = [];
  const re = /\bstream\r?\n/g; // \b evita confundir con "endstream"
  let m;
  while ((m = re.exec(raw))) {
    const start = m.index + m[0].length;
    const end = raw.indexOf('endstream', start);
    if (end < 0) break;
    let stop = end;
    while (stop > start && (raw[stop - 1] === '\n' || raw[stop - 1] === '\r')) stop--;
    let text;
    try { text = latin(await inflate(bytes.subarray(start, stop))); } catch (_e) { re.lastIndex = end; continue; }
    const tj = /\(((?:\\.|[^\\)])*)\)\s*Tj/g;
    let t;
    while ((t = tj.exec(text))) {
      out.push(t[1]
        .replace(/\\([0-7]{1,3})/g, (_, o) => String.fromCharCode(parseInt(o, 8)))
        .replace(/\\(.)/g, '$1')
        .trim());
    }
    re.lastIndex = end;
  }
  return out;
}

function after(strings, label) {
  const i = strings.findIndex((s) => s.replace(/\s+/g, ' ').toLowerCase().startsWith(label.toLowerCase()));
  return i >= 0 && i + 1 < strings.length ? strings[i + 1] : '';
}

export async function readGuide(hashqr) {
  const { bytes, disposition } = await fetchPdf(hashqr);
  const strings = await pdfStrings(bytes);
  // Número de GR: primero desde el nombre del archivo (20100177341-09-T006-107742-PDF.pdf).
  let gr = '';
  const f = disposition.match(/-([A-Z0-9]{4})-(\d+)-PDF/i);
  if (f) gr = `${f[1].toUpperCase()}-${f[2].padStart(8, '0')}`;
  if (!gr) {
    const h = strings.find((s) => /^N°\s*[A-Z0-9]{4}\s*-\s*\d+/.test(s));
    const hm = h && h.match(/([A-Z0-9]{4})\s*-\s*(\d+)/);
    if (hm) gr = `${hm[1]}-${hm[2].padStart(8, '0')}`;
  }
  const motivo = after(strings, 'Motivo de Traslado');
  const motivoDetalle = after(strings, 'Descripción de Motivo');
  const destinatario = after(strings, 'Datos del Destinatario').split(/\s+-\s+REGISTRO/i)[0].trim();
  return { ok: !!gr, gr, motivo, motivoDetalle, destinatario };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ ok: false, error: 'Método no permitido' }, 405);
  let hashqr = '';
  try {
    const body = await req.json();
    hashqr = String(body?.hashqr || '');
    // Se acepta también el enlace completo del QR.
    const m = hashqr.match(/[?&]hashqr=([^&\s]+)/);
    if (m) hashqr = decodeURIComponent(m[1].replace(/ /g, '+'));
  } catch (_e) { /* cuerpo inválido */ }
  hashqr = hashqr.trim().replace(/ /g, '+');
  if (!/^[A-Za-z0-9+/=_-]{20,400}$/.test(hashqr)) return json({ ok: false, error: 'QR no válido' }, 400);
  try {
    const guide = await readGuide(hashqr);
    return json(guide.ok ? guide : { ...guide, error: 'No se encontró el número de guía en el PDF' }, guide.ok ? 200 : 422);
  } catch (e) {
    return json({ ok: false, error: e.message || 'Error consultando SUNAT' }, 502);
  }
});
