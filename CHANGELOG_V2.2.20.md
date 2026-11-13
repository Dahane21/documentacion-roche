# Roche V2.2.20 Web

## SUNAT lento o sin responder
SUNAT deja sin respuesta una parte de las consultas (en la prueba del 13/11, cerca de 4 de cada 10), aunque la misma consulta responde en 1–2 s al repetirla.

- **Función `sunat-gre` (hay que volver a instalarla en Supabase):** en lugar de esperar 7 s por intento, lanza un intento nuevo cada 2 s sin cortar los anteriores (máximo 6, hasta 18 s) y se queda con el primero que entrega el PDF. En la prueba real con 10 consultas, 9 se leyeron.
- **Celular:** si SUNAT no responde, la guía se reintenta sola hasta 2 veces más ("SUNAT está lento: reintentando…") antes de marcarse en rojo. Mientras tanto se puede seguir escaneando.
- Se consultan 2 guías a la vez (antes 3), para no saturar a SUNAT.
- Caché actualizada a `v22200`.
