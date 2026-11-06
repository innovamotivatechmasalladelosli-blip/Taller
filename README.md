# Taller Mecánico La Cochera

Base visual responsive para el sitio de Taller Mecánico La Cochera. La interfaz está pensada como una web de taller local: presenta servicios reales, da información útil, explica el proceso y facilita pedir una cita sin lenguaje exagerado.

## Dirección visual

La identidad combina una base azul petróleo con naranja seguridad, crema y grafito. La dirección evita la estética genérica de landing con mensajes grandilocuentes: usa copy directo, jerarquía editorial sencilla, datos concretos del taller, numeración técnica y fotografía de trabajo.

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
