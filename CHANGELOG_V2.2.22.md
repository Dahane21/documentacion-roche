# Roche V2.2.22 Web

## Factura y OC con tres estados (como en el Registro rápido)
- En Venta y Venta CENARES, Factura y OC vuelven a tener **Llegó / Pendiente / No aplica**, ahora como botones de un toque.
- **Factura empieza en "Pendiente"**: la venta queda Parcial hasta que llegue la factura o se marque "No aplica". (En la V2.2.21, si no se marcaba la factura, la venta pasaba a Listos para enviar: corregido.)
- **OC empieza en "No aplica"** porque casi nunca se pide; se cambia a Pendiente o Llegó cuando corresponda.
- Si la guía ya tenía factura u OC recibida, se muestra "✓ ya recibida antes".

## Volver al lote anterior
- Nuevo botón **← Lote anterior** en la ventana de lote: reabre el último lote terminado para corregirlo.
- Si ese lote ya se había guardado, se anulan sus recepciones (quedan en el historial como anuladas), se restauran el tipo, la factura y la OC que tenían las guías y se desmarca la GRT si ese lote la había marcado. Se puede seguir retrocediendo lote por lote.
- No se permite si lo registrado ya fue incluido en un reporte a Roche.
- Caché actualizada a `v22220`.
