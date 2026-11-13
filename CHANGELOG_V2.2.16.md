# Roche V2.2.16 Web

Ajustes al escaneo de ruma tras la primera prueba real.

- **Pasa directo al siguiente lote** al guardar. Antes esperaba a que terminara la subida a Supabase (varios segundos en el celular) y mientras tanto mostraba la página con el botón "Continuar con los lotes". Ahora la subida sigue en segundo plano.
- Antes de guardar cada lote se revisa si la otra usuaria hizo cambios, para no pisarlos.
- **Venta CENARES:** GR, actas y pecosas empiezan en 0; la ejecutiva cambia solo lo que llegó.
- **Descartar lote:** nuevo botón para no registrar un lote completo.
- **Quitar del lote:** cada guía tiene "✕ Quitar del lote" para sacarla de la lista sin registrarla. Si el lote queda vacío, se descarta.
- Al terminar, el aviso indica cuántos lotes se registraron y cuántos se descartaron.
- Si se intenta cerrar la página mientras un cambio se sigue subiendo a Supabase, el navegador pide confirmar.
- Caché actualizada a `v22160`.
