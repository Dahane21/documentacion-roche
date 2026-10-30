# Roche V2.2.12 Web

## Prueba OCR de GR
- Se agrega en Registro rápido el botón **Escanear GR**.
- Abre la cámara trasera del celular y muestra una guía visual para enfocar únicamente el número impreso de la GR.
- Realiza 3 lecturas OCR y solo confirma automáticamente cuando la misma GR existente en la base Roche coincide en al menos 2 de 3 lecturas.
- Si hay duda, no abre ni modifica ninguna guía.
- Detecta duplicidades/errores de OCR mediante validación exacta contra la base existente.
- La prueba no registra documentación ni cambia estados por sí sola: después de confirmar muestra los datos de la GR y permite abrir el registro normal.

## Compatibilidad
- No requiere SQL nuevo ni cambios en Supabase.
- Usa Tesseract.js 7.0.0 desde CDN para OCR en el navegador.
- Requiere permiso de cámara y HTTPS (GitHub Pages).
- Caché actualizada a v2212.
