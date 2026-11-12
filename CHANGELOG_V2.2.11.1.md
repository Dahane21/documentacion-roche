# Roche V2.2.11.1 Web

## Ahorro de tráfico en Supabase (egress)
- La sincronización ya no descarga la base completa cada 5 segundos.
- Cada 5 segundos solo se consulta la fecha del último cambio, que pesa unos pocos bytes.
- La base completa se descarga únicamente cuando la otra usuaria guardó algo nuevo.
- Mientras la pestaña está oculta o minimizada no se hace ninguna consulta; al volver a ella se revisa al instante.
- Si llega una actualización mientras se está guardando o hay un formulario abierto, no se pisa el trabajo local.
- Corrección: un cambio hecho mientras otro guardado estaba en curso podía quedarse sin subir a Supabase; ahora se sube al terminar.

## Compatibilidad
- No requiere SQL nuevo ni cambios en Supabase.
- Sin cambios visibles para las usuarias.
- Caché de `app.js` actualizada a `v22111`.
