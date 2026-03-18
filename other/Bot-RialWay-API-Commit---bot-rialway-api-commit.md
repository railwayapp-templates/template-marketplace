# Deploy Bot-RialWay-API-Commit on Railway

Deploy and Host Bot-RialWay-API-Commit with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bot-rialway-api-commit)

## About

This bot is hosted on Railway to provide scalable, reliable, and easy deployment for Node.js applications. Railway automates infrastructure management and supports continuous deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bot-RialWay-API-Commit | [pereyrahugor/Bot-RialWay-API-Commit](https://github.com/pereyrahugor/Bot-RialWay-API-Commit) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `msjCierre` | Msj de cierre y envio de reporte. 😊 - TEST | Msj enviado al finalizar el hilo de conversación |
| `ASSISTANT_ID` | - | ID Asistente Open AI |
| `timeOutCierre` | 7 | Tiempo de espera entre el ultimo msj del usuario y el cierre de la comunicación (tambien es el tiempo del primer msj de reconexión) |
| `ASSISTANT_NAME` | - | Nombre Visible del Asistente en WebChat |
| `OPENAI_API_KEY` | (secret) | APIKEY de asistente de Platform OpenAI |
| `VECTOR_STORE_ID` | default | ID del Vector Store OpenAI |
| `msjSeguimiento1` | MSJ 1 de Seguimiento.\n(Este es un mensaje de seguimiento 😉) | Personaliza el primer msj de seguimiento |
| `msjSeguimiento2` | MSJ 2 de seguimiento, \nSigo aquí para ayudarte a optimizar ventas | Personaliza el segundo msj de seguimiento |
| `msjSeguimiento3` | Msj 3 de seguimiento.\n\nAquí estoy para potenciar tus ventas, hablemos que puedo hacer por tu negocio. | Personaliza el msj de seguimiento Final |
| `ASSISTANT_ID_IMG` | asst_xHtjJK7Kt2mnw3jmiYa9PMyr | ID Asistente Especialista en Imagenes |
| `ID_GRUPO_RESUMEN` | - | JID grupo de Whastapp donde se envian los resumen |
| `SHEET_ID_RESUMEN` | default | ID Sheets donde se guarda los resumen (Hoja1) |
| `CONSTRUSITIO_CUIT` | - | cuit registrado construsitio/comit |
| `SHEET_ID_UPDATE_1` | default | ID Sheets que se sube al asistente como Json |
| `SHEET_ID_UPDATE_2` | default | ID Sheets que se sube al asistente como Json |
| `SHEET_ID_UPDATE_3` | default | ID Sheets que se sube al asistente como Json |
| `CONSTRUSITIO_EMAIL` | - | correo de login construsitio/comit |
| `GOOGLE_PRIVATE_KEY` | -----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC6ifEL7kVO7ytN\nN8MoSVcuUTgOvEl7nazqYEUoHCbwZp+2pHeMXuoYR2rQ9f939d50l7OyqeOs5YgK\n8ly3vQOqNLt7FgagD16bJVnFbIN8TFcGbmFkitMUBVL4KM6WPZS3aprGzlyE0Bxu\nC4vEb5K0dzOxkFuYkkPsIX5nAqGs5bCj+rg5s8jbJCvY+Ka74CsIeBnCWQVIMV5/\nVOfcv5QEmXYoiLKt5xV/XeEih4YRXrQchIjxLCGeShgw7WI2CV3Y1YallRH1SOgc\nF1gSxCnZNa0m0vJDYGmu7nV1EGO4VQwFnvFcgxrgzruQOVqncYZGNkVXkDefubKV\n1pdc1h8rAgMBAAECggEAErwD34TgpRrUKH8vNH6ZKOezT5eNccLWOPvONkcNihtk\ncv11nD10GVgi3DW4oJ2q597Mh2cUnKq4zRCmSzXKhm+hXK1LoQuqHr7Tk0Zgtj0c\niGLRmT1wEZSvTokapnAs3XbxcIINPLGCCXNTaDkkbMeEA5NR/7LA65g5j7Lt9eU3\ndhC9LFcbOyLxlJFFXxbq/B1zZh9sGqoHmn9yOcbHNQd3W9pMKqNIh90xzdkVr3E0\nS8tv6wU56PRtcjEVKJxS3Qcxk41urju4DSKDo8K3PuZjna1uW6ymL1zMOOXZovnl\nvmk4YcpEOdRcfGBWJepi3jp+cU0o4DcS6uObbvDXQQKBgQD1UtSZa2ua+i/FDvON\nKGh6aCbZ8JVk1/I2NuOViTXRHJhpIL4GXjWgpOD/9S5skNW9NB/F5Pr82y3a3sRh\nzyqiSE1gOm5pap/PUoX9QavtdrGbLlasbLizHsDeD390ihV4IuVYmqTnBiGJ62GH\n0P7vu2mUMW5n9JqvAMqWZ5cwMQKBgQDCqC+P8fnJIkosd5wCxSmqcNmNd+MfOrky\nOCTn3WrDdVGL2ekCdsOdBnLbnRg+HqSqytg12ENPThqrDjsS2XjF74I29VdESTmx\nh5TnIq4r/IzXFSYBL8LJ7pMLAFx8Bb0tWWRPcRlSHCavtZz+2xgXGggsc2QUYSWU\n+CDWnrwqGwKBgQDX1nRuNvCJfa0htzHY88BYUeI8xUrrWoMj58779ah/vqTpeYE2\noRSVrfq3t8OMiTFEMePyfK/GYCBL/MrTMy3TccGB9GbIIKNSCM0SMQFO/6rrWS2w\nrkcicOBHf2Mn6YVSGYGnHwgOqno/mfRJRjvGOCF/3K3CkJa3ef7DrYh7QQKBgENE\ny+r6vE99whRL4WYzrIpyJTx2Sc7pBEcOj/Jw2gxh5qRl0dhAIqmJKPgr+cy92joL\nj1xMODaXzy9943xIGyyL8Hv9nQLEK2PmbtbRbU9WH3XUoSWX08Dk6XvLzCov8YhS\ndA/gDdgKUnQ2VuLb5B9Xp6t01QkV6V7pwK9qe6wxAoGBAKA2o4zvAhNXnAPcskmR\nzDVdTQBZf49A4bfLLLfs7pxopgAZSOpD0pcU/jMoBww7Ko6xMnrpSP0kRO/LCvcq\nQWzgkOl3iUhueVDSynlSarP+1g27wWNNGssN8xqwQ1nXdjLWEBRCqINMzCM/7B8Q\naEi5S78wya5OZKMmoQcEDWhy\n-----END PRIVATE KEY-----\n | Clave Privada de Servico Google |
| `OPENAI_API_KEY_IMG` | (secret) | APIKEY de ASISTENTE IMG OPENAI |
| `GOOGLE_CLIENT_EMAIL` | bot-ws-test-v1@bot-test-v1-450813.iam.gserviceaccount.com | Correo de servicio Google |
| `GOOGLE_MAPS_API_KEY` | (secret) | APIKEY Google Maps |
| `SHEET_NAME_UPDATE_1` | Hoja1 | Nombre de Hoja donde se toman los datos Sheet 1 |
| `SHEET_NAME_UPDATE_2` | Hoja1 | Nombre de Hoja donde se toman los datos Sheet 2 |
| `SHEET_NAME_UPDATE_3` | Hoja1 | Nombre de Hoja donde se toman los datos Sheet 3 |
| `timeOutSeguimiento2` | 45 | Personaliza el tiempo de espera entre el 1er y 2do msj de seguimiento |
| `timeOutSeguimiento3` | 120 | Personaliza el tiempo de espera entre el 2do y 3er msj de seguimiento |
| `CONSTRUSITIO_PASSWORD` | (secret) | password de login construsitio/comit |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/bot-rialway-api-commit)
