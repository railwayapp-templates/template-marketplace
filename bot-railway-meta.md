# Deploy Bot-RailWay-Meta on Railway

Bot Meta oficial por Ycloud - Neurolinks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bot-railway-meta)

## About

WhatsApp AI Assistant Bot is a powerful Node.js solution that integrates OpenAI's Assistant API (including Vision and File Search) with multiple messaging providers like WhatsApp (Baileys & YCloud) and Webchat. Built on BuilderBot technology, it features seamless integrations with Google Sheets, Google Calendar, and Supabase, manageable via a web dashboard.

Hosting this bot on Railway provides enterprise-grade infrastructure with zero-config scaling. It supports advanced features like multimedia message analysis, automated appointment booking via Google Calendar, real-time inventory synchronization with Google Sheets, and persistent session storage with Supabase. The included web dashboard allows for real-time monitoring and environment variable updates directly on your Railway deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bot-RailWay-Meta | [pereyrahugor/Bot-RailWay-Meta](https://github.com/pereyrahugor/Bot-RailWay-Meta) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `msjCierre` | Msj de cierre y envio de reporte - TEST |
| `PROJECT_URL` | default |
| `ASSISTANT_ID` | asst_123456789 |
| `SUPABASE_KEY` | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlneWljb3pqZXd4YnlpeHRwamxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMzExMDUsImV4cCI6MjA4MzgwNzEwNX0.MBiyCM3a1ApCJJ5MSNEoLM7b6mt_kfV1Mf5UTPQ1rkg |
| `SUPABASE_URL` | https://ygyicozjewxbyixtpjlo.supabase.co |
| `timeOutCierre` | 7 |
| `ASSISTANT_NAME` | default |
| `DOCX_ID_UPDATE` | default |
| `OPENAI_API_KEY` | (secret) |
| `YCLOUD_API_KEY` | (secret) |
| `SHEET_ID_UPDATE` | default |
| `VECTOR_STORE_ID` | default |
| `msjSeguimiento1` | MSJ 1 de Seguimiento. |
| `msjSeguimiento2` | MSJ 2 de seguimiento. |
| `msjSeguimiento3` | Msj 3 de seguimiento. |
| `ASSISTANT_ID_IMG` | asst_xHtjJK7Kt2mnw3jmiYa9PMyr |
| `ID_GRUPO_RESUMEN` | 123456789@g.us |
| `SHEET_ID_RESUMEN` | default |
| `GOOGLE_CALENDAR_ID` | primary |
| `GOOGLE_PRIVATE_KEY` | -----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC6ifEL7kVO7ytN
N8MoSVcuUTgOvEl7nazqYEUoHCbwZp+2pHeMXuoYR2rQ9f939d50l7OyqeOs5YgK
8ly3vQOqNLt7FgagD16bJVnFbIN8TFcGbmYkitMUBVL4KM6WPZS3aprGzlyE0Bxu
C4vEb5K0dzOxkFuYkkPsIX5nAqGs5bCj+rg5s8jbJCvY+Ka74CsIeBnCWQVIMV5/
VOfcv5QEmXYoiLKt5xV/XeEih4YRXrQchIjxLCGeShgw7WI2CV3Y1YallRH1SOgc
F1gSxCnZNa0m0vJDYGmu7nV1EGO4VQwFnvFcgxrgzruQOVqncYZGNkVXkDefubKV
1pdc1h8rAgMBAAECggEAErwD34TgpRrUKH8vNH6ZKOezT5eNccLWOPvONkcNihtk
cv11nD10GVgi3DW4oJ2q597Mh2cUnKq4zRCmSzXKhm+hXK1LoQuqHr7Tk0Zgtj0c
iGLRmT1wEZSvTokapnAs3XbxcIINPLGCCXNTaDkkbMeEA5NR/7LA65g5j7Lt9eU3
dhC9LFcbOyLxlJFFXxbq/B1zZh9sGqoHmn9yOcbHNQd3W9pMKqNIh90xzdkVr3E0
S8tv6wU56PRtcjEVKJxS3Qcxk41urju4DSKDo8K3PuZjna1uW6ymL1zMOOXZovnl
vmk4YcpEOdRcfGBWJepi3jp+cU0o4DcS6uObbvDXQQKBgQD1UtSZa2ua+i/FDvON
KGh6aCbZ8JVk1/I2NuOViTXRHJhpIL4GXjWgpOD/9S5skNW9NB/F5Pr82y3a3sRh
zyqiSE1gOm5pap/PUoX9QavtdrGbLlasbLizHsDeD390ihV4IuVYmqTnBiGJ62GH
0P7vu2mUMW5n9JqvAMqWZ5cwMQKBgQDCqC+P8fnJIkosd5wCxSmqcNmNd+MfOrky
OCTn3WrDdVGL2ekCdsOdBnLbnRg+HqSqytg12ENPThqrDjsS2XjF74I29VdESTmx
h5TnIq4r/IzXFSYBL8LJ7pMLAFx8Bb0tWWRPcRlSHCavtZz+2xgXGggsc2QUYSWU
+CDWnrwqGwKBgQDX1nRuNvCJfa0htzHY88BYUeI8xUrrWoMj58779ah/vqTpeYE2
oRSVrfq3t8OMiTFEMePyfK/GYCBL/MrTMy3TccGB9GbIIKNSCM0SMQFO/6rrWS2w
rkcicOBHf2Mn6YVSGYGnHwgOqno/mfRJRjvGOCF/3K3CkJa3ef7DrYh7QQKBgENE
y+r6vE99whRL4WYzrIpyJTx2Sc7pBEcOj/Jw2gxh5qRl0dhAIqmJKPgr+cy92joL
j1xMODaXzy9943xIGyyL8Hv9nQLEK2PmbtbRbU9WH3XUoSWX08Dk6XvLzCov8YhS
dA/gDdgKUnQ2VuLb5B9Xp6t01QkV6V7pwK9qe6wxAoGBAKA2o4zvAhNXnAPcskmR
zDVdTQBZf49A4bfLLLfs7pxopgAZSOpD0pcU/jMoBww7Ko6xMnrpSP0kRO/LCvcq
QWzgkOl3iUhueVDSynlSarP+1g27wWNNGssN8xqwQ1nXdjLWEBRCqINMzCM/7B8Q
aEi5S78wya5OZKMmoQcEDWhy
-----END PRIVATE KEY-----
 |
| `ID_GRUPO_RESUMEN_2` | 123456789@g.us |
| `OPENAI_API_KEY_IMG` | (secret) |
| `YCLOUD_WABA_NUMBER` | default |
| `GOOGLE_CLIENT_EMAIL` | bot-ws-test-v1@bot-test-v1-450813.iam.gserviceaccount.com |
| `GOOGLE_MAPS_API_KEY` | (secret) |
| `timeOutSeguimiento2` | 7 |
| `timeOutSeguimiento3` | 7 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** TypeScript, HTML, JavaScript, CSS, PLpgSQL, Dockerfile

[View on Railway →](https://railway.com/template/bot-railway-meta)
