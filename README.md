# Roche V2.2 Web

Actualización sobre V2.1 sin modificar ni reiniciar la base de Supabase.

## Cambios
- Documentación no asociada a GR/GRT/Pedido desde **Listos para enviar**.
- Permite registrar múltiples documentos y cantidades (ej. `Acta + 2 Pecosas`).
- Se incluye en el Cargo Roche con GR/GRT/Pedido vacíos y `Tipo = Otros`.
- Queda en Historial Roche y puede retirarse mediante Corregir reporte.
- Observaciones/seguimiento ahora muestran **Situación** y **Observación** separadas.
- Conserva Anular recepción y toda la lógica anterior.

No requiere ejecutar SQL nuevo. Solo reemplazar los archivos web en GitHub Pages.
