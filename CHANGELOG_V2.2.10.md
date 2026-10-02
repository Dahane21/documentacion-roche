# Roche V2.2.10 Web

## Filtros tipo Excel
- Se agregan filtros desde los encabezados en **Reporte general**.
- Se agregan filtros desde los encabezados en **Liquidados**.
- Se agregan filtros desde los encabezados en **Historial Roche > Ver contenido**.
- Los filtros son dependientes entre sí: cada desplegable muestra solo valores disponibles según los demás filtros activos.
- Se mantienen los buscadores superiores ya existentes.

## Regularización histórica
- Nueva opción **Regularizar liquidación histórica** desde Liquidados.
- Permite seleccionar varias guías activas y registrar:
  - fecha histórica de liquidación;
  - cargo antiguo (opcional);
  - motivo/referencia obligatoria.
- La regularización marca las guías como liquidadas sin crear un reporte Roche nuevo.
- Si existen documentos registrados aún no enviados en el sistema, se vinculan al evento histórico para que no queden como pendientes de envío.
- La operación queda auditada.
- En Historial Roche figura como **REGULARIZACIÓN / Excel anterior**, diferenciada de los reportes normales y sin opciones de descargar/corregir reporte.
- En Liquidados se identifica como **Regularización** y muestra el cargo antiguo si fue informado.

## Compatibilidad
- No requiere SQL adicional.
- Compatible con el estado compartido actual de Supabase.
- Caché de recursos actualizada a `v2210`.

## Ajuste final de ubicación
- La acción **Regularizar liquidación histórica** está ubicada en **Pendientes / Parciales**, porque allí se encuentran las guías activas que deben regularizarse.
- En **Liquidados** solo se muestran los resultados ya regularizados; no se inicia la regularización desde ese módulo.
- Solo ofrece como elegibles las guías que actualmente están en estado **Pendiente** o **Parcial**, evitando regularizar por error guías ya completas/listas para envío.
