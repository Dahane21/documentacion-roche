# Roche V2.2.17 Web

## Corrección: lotes que aparecían pendientes aunque ya estaban registrados
- Si la página está abierta en varias pestañas, todas ven ahora la misma lista de lotes (se actualiza al cambiar de pestaña).
- La copia de emergencia de toda la base que se guarda en el navegador (~3,5 MB) ya no puede llenar la memoria y bloquear el guardado de la ruma: si no cabe, se libera y la ruma tiene prioridad. La base real sigue en Supabase.
- Si un lote ya fue registrado (todas sus guías tienen el registro por escaneo), se marca solo como terminado.
- Nuevo botón **Descartar lotes pendientes** en el aviso de lotes, para limpiar la lista sin borrar nada de lo registrado.
- Los botones de la ventana del lote ya no se cortan en el celular.

## Plantilla con un toque
- Casilla **Plantilla** (sin marcar) en la ventana de lote, el registro rápido y el registro de paquete. Se marca si llegó; el campo de texto para otros adicionales sigue disponible.
- Caché actualizada a `v22170`.
