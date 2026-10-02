ROCHE V2.2.10 WEB

Actualización sobre V2.2.9.

Cambios principales:
- Filtros tipo Excel, dependientes entre sí, en Reporte general.
- Filtros tipo Excel, dependientes entre sí, en Liquidados.
- Filtros tipo Excel en Historial Roche > Ver contenido, manteniendo el buscador GRT / GR / Pedido.
- Nueva opción "Regularizar liquidación histórica" para guías ya liquidadas en el Excel anterior, con fecha histórica, cargo antiguo opcional y motivo obligatorio.
- Las regularizaciones aparecen diferenciadas en Historial Roche y en Liquidados; no se confunden con reportes generados por el sistema.
- Invalidación de caché v2210.

No requiere cambios SQL ni cambios en la estructura de Supabase: la información adicional se guarda dentro del estado compartido JSON existente.

Regularización histórica: iniciar desde Pendientes / Parciales. Los resultados se visualizan en Liquidados y en Historial Roche.
