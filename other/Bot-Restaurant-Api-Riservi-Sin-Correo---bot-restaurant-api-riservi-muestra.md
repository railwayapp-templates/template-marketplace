# Deploy Bot-Restaurant-Api Riservi-Sin Correo on Railway

Deploy and Host Bot-Restaurant-Api-Riservi-Muestra with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bot-restaurant-api-riservi-muestra)

## About

Bot-Restaurant-Api-Riservi-Muestra is a Node.js-based API designed to power restaurant chatbots, enabling automated order management, customer interaction, and integration with messaging platforms like WhatsApp. It leverages AI to streamline restaurant operations and enhance customer experience.

Hosting Bot-Restaurant-Api-Riservi-Muestra involves deploying a scalable Node.js backend that connects with external services such as WhatsApp, OpenAI, and Google Sheets. The project uses Docker for containerization, making it easy to deploy on Railway. Railway automates infrastructure management, so you can focus on building features and improving the bot. The deployment process includes setting up environment variables, connecting APIs, and ensuring persistent storage for chat logs and media files.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bot-Restaurant-Api Riservi-Sin Correo | [pereyrahugor/Bot-Restaurant-Api-Riservi](https://github.com/pereyrahugor/Bot-Restaurant-Api-Riservi) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `followOn` | - | on / off - Activa el seguimiento solo si esta activo el resumen |
| `msjCierre` | - | Msj enviado al finalizar el hilo de conversación |
| `resumenOn` | - | on / off - Activa el envio de resumen a WS |
| `ASSISTANT_ID` | - | ID Asistente apenAI |
| `timeOutCierre` | - | Tiempo de espera entre el ultimo msj del usuario y el cierre de la comunicación (tambien es el tiempo del primer msj de reconexión) |
| `OPENAI_API_KEY` | (secret) | APIKEY asistente OpenAI |
| `RESERVI_API_KEY` | (secret) | APIKEY Riservi |
| `msjSeguimiento1` | - | Personaliza el primer msj de seguimiento |
| `msjSeguimiento2` | - | Personaliza el segundo msj de seguimiento |
| `msjSeguimiento3` | - | Personaliza el msj de seguimiento Final |
| `ASSISTANT_ID_IMG` | - | ID Asistente Especialista en Imagenes |
| `ID_GRUPO_RESUMEN` | - | JID grupo de Whastapp donde se envian los resumen |
| `OPENAI_API_KEY_IMG` | (secret) | APIKEY asistente Img OpenAI |
| `timeOutSeguimiento3` | - | Personaliza el tiempo de espera entre el 2do y 3er msj de seguimiento |
| ` timeOutSeguimiento2` | - | Personaliza el tiempo de espera entre el 1er y 2do msj de seguimiento |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, HTML, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/bot-restaurant-api-riservi-muestra)
