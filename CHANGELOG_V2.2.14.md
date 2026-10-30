# Roche V2.2.14 Web

## Escaneo rápido solo QR
- Se retira OCR del número de guía del flujo de escaneo rápido.
- La cámara detecta únicamente QR de GRE de SUNAT.
- Al detectar el QR, el sistema consulta el recurso `descargaqr` de SUNAT.
- Primero intenta obtener la GR desde el nombre del PDF indicado en `Content-Disposition` (ruta más rápida).
- Si no está disponible, lee únicamente la primera página del PDF con PDF.js y extrae la serie/número.
- Series soportadas actualmente: T002, T006, T008 y EG07.
- La GR obtenida se valida contra la base Roche antes de agregarla a la ruma.
- Verde + beep + vibración = guía validada y agregada.
- Guías no encontradas, duplicadas o en Por revisar no se agregan.
- La misma guía no se vuelve a procesar hasta retirar el QR de la cámara.

## Prueba técnica importante
La consulta directa a SUNAT depende de que `e-factura.sunat.gob.pe` permita solicitudes CORS desde GitHub Pages. Si Chrome muestra "SUNAT bloqueó la consulta desde esta web", el QR sí está funcionando y solo será necesario desplegar un proxy ligero (por ejemplo, Supabase Edge Function) para reenviar el PDF con CORS habilitado.

No requiere cambios en tablas de Supabase.
