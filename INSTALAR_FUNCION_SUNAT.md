# Instalar la función `sunat-gre` en Supabase

Se hace una sola vez, desde la página de Supabase, sin instalar nada.

1. Entra a <https://supabase.com/dashboard> y abre el proyecto **DOCUMENTACION**.
2. En el menú de la izquierda entra a **Edge Functions**.
3. Toca **Deploy a new function** y elige **Via Editor**.
4. En el nombre de la función escribe exactamente: `sunat-gre`
5. Borra el código de ejemplo que aparece y pega todo el contenido del archivo
   `supabase/functions/sunat-gre/index.ts` de este repositorio.
6. Toca **Deploy function** y espera a que diga que está activa.
7. No cambies la opción **Verify JWT / Enforce JWT verification**: debe quedar **activada**,
   así solo las usuarias con sesión iniciada pueden usarla.

## Comprobar que funciona
En la página del sistema entra a **Escanear ruma**, inicia la cámara y escanea una guía.
Si aparece su número (T006-…) y "SUNAT: Venta" u "OTROS", está funcionando.
Si aparece "Falta instalar la función sunat-gre en Supabase", revisa el nombre del paso 4.

## Costo
El plan gratis de Supabase incluye 500.000 usos de funciones al mes. Cada guía escaneada usa uno
(o ninguno si ya se escaneó antes en ese celular), y la respuesta pesa unos pocos bytes.
