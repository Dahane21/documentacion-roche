# Roche V2.2.25 Web

## Corregir el número de GR (guía remitente) desde Seguimiento
- En **Observaciones / seguimiento** hay un botón nuevo: **✎ Corregir número de GR (guía remitente)**.
- Se escribe la GR correcta y el **motivo, que es obligatorio**. Antes de guardar se pide confirmación.
- Validaciones: formato de GR (ej. T006-00108833; se acepta en minúsculas o sin ceros y se normaliza), que no sea la misma GR y que no exista ya en otra guía.
- Cada cambio queda en el **Historial de GR** (GR anterior → nueva, fecha, usuaria y motivo), visible en Seguimiento y en el Detalle de la guía, y en la auditoría.
- **Importar data** sigue reconociendo la GR anterior como la misma guía, así no se crea un duplicado.
- Caché actualizada a `v22250`.
