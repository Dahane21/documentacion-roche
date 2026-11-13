# Roche V2.2.18 Web

## Escanear en el celular y completar en la laptop
- La ruma de cada usuaria se guarda también en Supabase, en una fila pequeña aparte (`roche_scan_<usuaria>`, de pocos KB), además del navegador.
- Lisbet puede escanear en el celular y abrir **Escanear ruma** en la laptop con su misma cuenta: ve las guías escaneadas y los lotes pendientes, y puede completarlos ahí.
- Lo hecho en cada equipo se une sin perder nada: guías escaneadas, guías quitadas, lotes guardados, descartados o con guías quitadas.
- Cada usuaria tiene su propia ruma: lo que escanea Lisbet no le aparece a Dahane, y al revés.
- Cada 5 segundos se revisa con una consulta pequeña si la ruma cambió en el otro equipo (no se consulta con la pestaña oculta ni con una ventana de lote abierta).
- Cada guía escaneada la consulta en SUNAT el equipo que la escaneó, para no repetir consultas.
- La ruma que estaba en el navegador con la versión anterior se conserva y se sube al iniciar sesión.
- No requiere cambios en las tablas de Supabase.
- Caché actualizada a `v22180`.
