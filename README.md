# Roche V1.4.3 — Prueba piloto

Versión preparada para iniciar la prueba piloto con la data pendiente real.

## Data inicial cargada
- Fuente de pendientes: `DOCUMENTACION ROCHE(1).xlsx`, solo registros sin ACUSE RECIBIDO.
- Cruce base: `DATA JUNIO -SETIEMBRE.xlsx` (Tradel + Roche).
- 157 GR normalizadas en total.
- 156 GR cargadas directamente como Pendiente.
- 1 GR queda en Por revisar por falta de Pedido en la data Roche: `T006-00102115`.
- `T006-000101090` se normalizó a `T006-00101090`; la GRT vigente queda `VA09-3120` y se conserva la referencia anterior para trazabilidad.
- Tipo, documentación, observaciones y seguimiento empiezan en blanco.

## Cambios principales de V1.4.3
- Data real precargada para el piloto.
- Filtro por Destinatario.
- Columna Observaciones y seguimiento/situación con historial desde cero.
- Renombre general a `Docs por enviar`.
- Factura/OC acumulados visibles al reabrir parciales; los controles nuevos quedan como `Sin cambios`.
- Importación de nueva data desde Excel Tradel + Roche.
- Una GR ya existente no se duplica.
- Si la misma GR llega con otra GRT, se muestra `Cambio de GRT detectado` y requiere confirmación para reemplazar la GRT vigente; la anterior queda en auditoría.
- Respaldo JSON y restauración del piloto.

## Uso de Importar data
1. Entrar a `Importar data`.
2. Revisar `Nuevas GR desde` (por defecto toma el día siguiente a la fecha máxima ya cargada).
3. Pulsar `Importar nueva data`.
4. Seleccionar un Excel con Tradel y Roche en sus dos primeras pestañas.
5. Revisar: Nuevas correctas / Por revisar / Ya existentes / Cambios de GRT.
6. Confirmar las nuevas GR correctas y resolver manualmente los observados.

## Importante para el piloto
Esta versión sigue siendo local y guarda la información en el navegador (localStorage). Para evitar perder avances:
- usar preferentemente una misma PC y el mismo navegador durante la prueba;
- pulsar `Exportar respaldo` al menos una vez al día;
- si necesitan mover la prueba a otra PC, usar `Restaurar respaldo` con el JSON exportado.

La sincronización real entre dos computadoras/usuarios y la base de datos central se hará en la versión de producción alojada en infraestructura de Tradel.


## Ajustes V1.4.3
- Venta incluye `MARCAR AMBOS · GRT + GR`; Factura y OC continúan independientes.
- Barra horizontal flotante/sincronizada para tablas anchas, visible sin bajar al final.
- Generador XLSX reforzado: fecha ZIP válida para Office, XML sanitizado y metadatos mínimos de hoja/libro para evitar recuperación/archivo vacío en Excel.

## Ajuste V1.4.3
- El filtro `Distrito` en Pendientes / Parciales ahora permite seleccionar varios destinos simultáneamente mediante casillas.
- Puedes combinar, por ejemplo, `AREQUIPA_AREQUIPA` + `AREQUIPA_YANAHUARA` o `CUSCO_CUSCO` + `APURIMAC_ABANCAY`.
- El botón muestra cuántos distritos están seleccionados y el botón `Limpiar` borra toda la selección.

## V1.4.3 - Corrección crítica del Excel Roche
- El Excel ya no se construye con un paquete OOXML artesanal.
- Se usa como plantilla el formato real `16-09.xlsx` entregado por la usuaria, preservando logo, estilos, tema y configuración de impresión.
- JSZip local reconstruye el `.xlsx` para evitar el mensaje de Microsoft Excel de "recuperar contenido" y el libro vacío.
- La plantilla y JSZip están incluidas dentro de la carpeta, por lo que la descarga del reporte no depende de internet.
