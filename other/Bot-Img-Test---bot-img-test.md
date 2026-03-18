# Deploy Bot-Img-Test on Railway

Deploy and Host Bot-Img-Test with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bot-img-test)

## About

WhatsApp AI Vision Bot es un bot de WhatsApp basado en Node.js que integra la API de OpenAI (incluyendo GPT-4o Vision) usando la tecnología BuilderBot. Permite conversaciones automatizadas e inteligentes, análisis avanzado de imágenes (descripción y OCR), transcripción de audios y flujos personalizados, todo configurable mediante variables de entorno y asistentes propios de OpenAI.

Hospedar WhatsApp AI Vision Bot en Railway te permite desplegar un bot conversacional para WhatsApp listo para producción, con mínima configuración. El bot soporta flujos personalizados, análisis visual, respuestas inteligentes y puede adaptarse a tus necesidades ajustando variables de entorno y la configuración del asistente. Railway gestiona la infraestructura, para que te enfoques en la lógica y experiencia de tu bot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bot-Img-Test | [pereyrahugor/Bot-Img-Test](https://github.com/pereyrahugor/Bot-Img-Test) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `msjCierre` | Msj de cierre y envio de reporte. 😊 - TEST |
| `timeOutCierre` | 7 |
| `OPENAI_API_KEY` | (secret) |
| `msjSeguimiento1` | MSJ 1 de Seguimiento.
(Este es un mensaje de seguimiento 😉) |
| `msjSeguimiento2` | MSJ 2 de seguimiento, 
Sigo aquí para ayudarte a optimizar ventas |
| `msjSeguimiento3` | Msj 3 de seguimiento.

Aquí estoy para potenciar tus ventas, hablemos que puedo hacer por tu negocio. |
| `OPENAI_API_KEY_IMG` | (secret) |
| `timeOutSeguimiento2` | 45 |
| `timeOutSeguimiento3` | 120 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/bot-img-test)
