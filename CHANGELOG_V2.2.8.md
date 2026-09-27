# Roche V2.2.8 Web

## Correcciones
- El filtro de cada encabezado en Pendientes / Parciales se muestra como una caja flotante junto al encabezado, en lugar de aparecer debajo de la tabla.
- Se ajustaron los anchos mínimos de las columnas para que los encabezados y sus controles queden alineados y legibles.
- Se agregó versionado de `styles.css` y `app.js` en `index.html` para evitar que GitHub Pages / el navegador reutilicen archivos de la V2.2.6 o V2.2.7 desde caché.
- En `Historial Roche > Corregir reporte` se agregó el buscador combinado `GRT / GR / Pedido`, con coincidencia parcial.

## Base de datos
- No requiere SQL nuevo.
- No modifica tablas ni datos de Supabase.
