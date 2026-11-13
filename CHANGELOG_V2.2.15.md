# Roche V2.2.15 Web

## Escanear ruma (nuevo)
- Nueva página **Escanear ruma** en el menú, pensada para el celular Android.
- La cámara lee el QR de SUNAT de cada guía en el orden de la ruma. Cada lectura suena, vibra y queda en la lista; no hay que esperar: el número de GR, el motivo de traslado y el destinatario se consultan en SUNAT en segundo plano.
- La misma guía no se agrega dos veces (aviso de "ya escaneada"), aunque el QR se quede frente a la cámara.
- Guías que no están en la base, en "Por revisar", ya liquidadas o duplicadas se marcan en rojo y no se registran.
- Si SUNAT no responde, la guía queda con el botón **Reintentar**. Si un QR no se lee, se puede agregar escribiendo la GR o sus últimos dígitos.
- La ruma queda guardada en el dispositivo: si se recarga la página no se pierde lo escaneado.

## Lotes automáticos por GRT
- Al tocar **Finalizar ruma** se arma un lote por cada GRT (guía de Tradel), en el mismo orden en que se escaneó. Nunca se juntan GRT distintas.
- Si una guía de una GRT aparece más adelante en la ruma, se suma a su lote y se avisa que estaba separada, para juntarla físicamente.
- Se abre una ventana por lote, uno tras otro:
  - **GRT recibida** marcada por defecto (se desmarca si no llegó la guía de Tradel).
  - Cada GR escaneada aparece como "llegó". Las demás GR de la misma GRT que no se escanearon aparecen sin marcar, por si llegaron igual.
  - **Tipo**: Venta y Venta CENARES (destinatario CENARES) se completan solos desde SUNAT. Cuando SUNAT dice "Otros" (suministro, instalación, mantenimiento…) el tipo queda en blanco y es obligatorio elegirlo.
  - **Factura y OC** empiezan sin marcar.
  - **CENARES**: las cantidades de GR, actas y pecosas empiezan vacías y son obligatorias (se escribe 0 si no llegó ninguna).
- Botones: Guardar y siguiente lote, Saltar este lote, Cerrar y continuar después.
- Lo guardado sigue el flujo de siempre: las guías completas pasan a "Listos para enviar".

## Función de Supabase `sunat-gre`
- SUNAT no permite consultar desde la página web, así que una función de Supabase hace de intermediaria: recibe el QR, descarga el PDF de SUNAT y devuelve solo GR, motivo y destinatario.
- Corta y reintenta sola cuando SUNAT se queda colgado.
- Solo responde a usuarias con sesión iniciada.
- Instalación: ver `INSTALAR_FUNCION_SUNAT.md`.

## Otros
- Corrección: en celular el menú lateral ocupaba media pantalla; ahora pasa arriba como barra.
- Caché actualizada a `v22150`.
- No requiere cambios en tablas de Supabase.
