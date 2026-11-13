// Función de Supabase "sunat-gre".
// Recibe el código (hashqr) del QR de una guía de remisión electrónica y devuelve, leyendo el PDF de SUNAT:
//   { ok, gr, motivo, motivoDetalle, destinatario }
// Solo responde a usuarias con sesión iniciada (Supabase verifica el token antes de ejecutar esta función).
// No guarda nada: es un intermediario porque SUNAT no permite consultar directamente desde la página web.

const SUNAT_URL = 'https://e-factura.sunat.gob.pe/v1/contribuyente/gre/comprobantes/descargaqr?hashqr=';
const TIMEOUT_MS = 7000;   // SUNAT a veces se queda colgado: se corta y se reintenta.
const ATTEMPTS = 3;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });
}

async function fetchPdf(hashqr) {
  let lastError = 'SUNAT no respondió';
  for (let i = 0; i < ATTEMPTS; i++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(SUNAT_URL + encodeURIComponent(hashqr), { signal: ctrl.signal });
      const type = res.headers.get('content-type') || '';
      if (res.ok && type.includes('pdf')) {
        return { bytes: new Uint8Array(await res.arrayBuffer()), disposition: res.headers.get('content-disposition') || '' };
      }
      lastError = `SUNAT respondió ${res.status}`;
      if (res.status >= 400 && res.status < 500) break; // QR no válido: no tiene sentido reintentar
    } catch (_e) {
      lastError = 'SUNAT no respondió a tiempo';
    } finally {
      clearTimeout(timer);
    }
  }
  throw new Error(lastError);
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
