# Roche V2.2.13 Web

## Escaneo rápido continuo
- Reemplaza la prueba OCR manual por un modo de escaneo continuo para rumas físicas.
- El marco de cámara ahora es grande y casi cuadrado para facilitar el enfoque.
- La lectura comienza automáticamente al abrir el escáner; ya no hay que pulsar “Leer número” por cada guía.
- Cuando una GR queda confirmada, el marco se pone verde, emite un beep/vibración, agrega la guía a una ruma temporal y continúa con la siguiente.
- Una lectura dudosa no se agrega.
- Una guía duplicada dentro de la misma ruma no se vuelve a agregar.
- Una GR ubicada en “Por revisar” no se agrega a la ruma operativa.
- Prefijos admitidos inicialmente: T002, T006, T008 y EG07.
- Se mantiene validación exacta contra la base Roche y se requieren dos lecturas consecutivas iguales para aceptar una GR.
- Se agrega contador de ruma, lista de guías confirmadas, “Deshacer última” y “Finalizar ruma”.
- Finalizar la ruma todavía no modifica registros: esta versión valida primero velocidad y precisión antes de conectar el registro masivo.

## Base de datos
- No requiere SQL nuevo ni cambios en Supabase.
