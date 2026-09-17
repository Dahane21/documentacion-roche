# Roche V2 Web Beta

Esta beta conserva la lógica de V1.4.3 pero cambia el almacenamiento principal a Supabase.

## Antes de abrirla
1. Ejecutar `SQL_V2_WEB_BETA.sql` una sola vez en Supabase SQL Editor.
2. Tener al menos un usuario creado en Authentication > Users.
3. Abrir la web desde un servidor web (GitHub Pages, localhost, etc.). Para pruebas locales, puede abrirse el HTML, aunque GitHub Pages será el destino recomendado.

## Comportamiento
- Login real con Supabase Auth.
- Un único estado compartido `roche_shared` para Dahane/Lisbet.
- Cada operación guarda en Supabase y mantiene cache local de emergencia.
- Cada 5 segundos comprueba si otra laptop actualizó la base y refresca cuando no hay un modal abierto.
- Exportar/Restaurar respaldo sigue disponible. Restaurar reemplaza el estado compartido para ambas usuarias.

## Importante
Esta es una beta de transición orientada a validar la experiencia multiusuario rápidamente. La estructura relacional creada previamente en Supabase se conserva para una posterior normalización de datos si se requiere.
