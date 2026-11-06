# Taller Mecánico La Cochera

Base visual responsive para el sitio de Taller Mecánico La Cochera. La interfaz está pensada como una landing de conversión: presenta servicios, genera confianza, explica el proceso y facilita la reserva de una visita.

## Dirección visual

La identidad combina una base azul petróleo con naranja seguridad, crema y grafito. El lenguaje visual toma referencias del diseño editorial industrial y de la señalética de taller: titulares condensados, líneas finas, numeración técnica, tarjetas con acentos funcionales y fotografía de alto contraste.

## Estructura

- `index.html`: página única y contenido de la experiencia.
- `styles.css`: sistema visual responsive, tokens, componentes y breakpoints.
- `app.js`: navegación móvil, header con estado al hacer scroll y formulario de reserva.
- `server.mjs`: servidor de preview sin dependencias externas.
- `public/manus-routes.json`: manifest de rutas para Webdev.
- `public/favicon.svg`: marca gráfica base.

## Desarrollo

```bash
npm run dev
```

El servidor escucha en el puerto `3000` o en el valor recibido desde `PORT`.
