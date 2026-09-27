# Roche V2.2.9 Web

## Correcciones
- Los filtros de encabezado de `Pendientes / Parciales` ahora son dependientes entre sí, al estilo Excel.
- Al abrir un filtro de columna, sus opciones respetan el buscador superior, Destinatario, Resultado, Docs por enviar, las tarjetas de estado y los demás filtros de encabezado.
- Ejemplo: si `Destinatario` está filtrado a CENARES y, dentro de ese conjunto, solo existen registros `Venta CENARES`, el filtro `Tipo` ya no muestra `Venta` si no hay registros de ese tipo.
- Se mantiene la selección múltiple, `Seleccionar todo`, búsqueda dentro del filtro y `Limpiar columna`.
- En `Historial Roche > Corregir reporte`, el buscador `GRT / GR / Pedido` queda visible encima de la tabla y muestra un contador de ítems visibles.
- Se incrementó el versionado de caché de `styles.css` y `app.js` a `v229`.

## Base de datos
- No requiere SQL nuevo.
- No modifica tablas ni datos de Supabase.
