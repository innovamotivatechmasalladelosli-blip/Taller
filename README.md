# Taller Mecánico La Cochera

Base visual responsive para el sitio de Taller Mecánico La Cochera. La interfaz está pensada como una web de taller local: presenta servicios reales, da información útil, explica el proceso y facilita pedir una cita sin lenguaje exagerado.

## Dirección visual

La identidad combina una base azul petróleo con naranja seguridad, crema y grafito. La dirección evita la estética genérica de landing con mensajes grandilocuentes: usa copy directo, jerarquía editorial sencilla, datos concretos del taller, numeración técnica y fotografía de trabajo. La imagen principal es una fotografía real de Pexels, optimizada localmente en `assets/taller-real.jpg`; fuente: [Pexels — A man checking the white car](https://www.pexels.com/photo/a-man-checking-the-white-car-4116169/).

## Estructura

- `index.html`: página única y contenido de la experiencia.
- `styles.css`: sistema visual responsive, tokens, componentes y breakpoints.
- `app.js`: navegación móvil, header con estado al hacer scroll y formulario de reserva.
- `assets/taller-real.jpg`: fotografía real optimizada para el hero.
- `server.mjs`: servidor de preview sin dependencias externas.
- `public/manus-routes.json`: manifest de rutas para Webdev.
- `public/favicon.svg`: marca gráfica base.

La agenda incluye una demostración de disponibilidad con estado de espera, confirmación y enlace prellenado a WhatsApp. El botón de asistente muestra respuestas de orientación y los enlaces de redes sociales muestran el punto de conexión para las cuentas reales del taller.

## Desarrollo

```bash
npm run dev
```

El servidor escucha en el puerto `3000` o en el valor recibido desde `PORT`.
