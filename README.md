# Roche V2.1 Web

Actualización sobre la V2 Web Beta.

## Cambio principal
- En Detalle de guía > Historial de recepciones aparece **Anular recepción** para movimientos todavía no enviados a Roche.
- Motivo obligatorio.
- La recepción se conserva en historial como **Anulada**; no se borra silenciosamente.
- El sistema recalcula documentación, Pendiente/Parcial/Completo, Docs por enviar y Listos para enviar.
- Si la recepción ya fue incluida en un Cargo confirmado, el sistema bloquea la anulación y exige corregir primero el reporte.
- Las guías ya liquidadas no se modifican.

La base compartida de Supabase se conserva: actualizar los archivos de GitHub Pages no borra ni reinicia los datos existentes.
