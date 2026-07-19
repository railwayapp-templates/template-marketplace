# Deploy Lovense Connector for ChatGPT on Railway

Private Lovense MCP for ChatGPT with OAuth and multi-device control.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lovense-connector-for-chatgpt)

## About

A private, self-hosted MCP connector that lets ChatGPT detect and control the Lovense devices you connect to Lovense Remote. Each Railway deployment belongs to one owner and keeps its credentials isolated.

> Independent community project. Not affiliated with, sponsored by, or endorsed by Lovense.

This template runs a personal Streamable HTTP MCP server, an OAuth 2.1 authorization flow, and a small setup panel in one Railway service. It connects to Lovense's Standard Socket API, discovers compatible devices through Lovense Remote, and keeps each owner's credentials and encrypted device state inside her own deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lovense-chatgpt-connector | [lauramarmun-prog/lovense-chatgpt-connector](https://github.com/lauramarmun-prog/lovense-chatgpt-connector) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Puerto interno de Railway. No necesitas cambiarlo. |
| `STATE_FILE` | /data/lovense-state.enc | Ruta interna donde se guarda cifrada la conexión. No necesitas cambiarla. |
| `LOVENSE_UID` | - | Identificador privado generado automáticamente para esta instalación. |
| `OWNER_SECRET` | (secret) | Elige una contraseña privada para abrir tu panel y autorizar ChatGPT. |
| `MCP_PATH_SECRET` | (secret) | Clave automática para clientes MCP antiguos. No necesitas tocarla. |
| `OAUTH_SIGNING_KEY` | - | Clave automática que protege el inicio de sesión con ChatGPT. |
| `MAX_COMMAND_SECONDS` | 3600 | Límite técnico para evitar duraciones enormes escritas por error. |
| `STATE_ENCRYPTION_KEY` | - | Clave automática que cifra la conexión Lovense guardada. |
| `LOVENSE_PLATFORM_NAME` | - | Escribe exactamente el Website Name que aparece en tu panel Lovense Developer. |
| `LOVENSE_DEVELOPER_TOKEN` | (secret) | Pega aquí tu token privado del panel Lovense Developer. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, HTML

[View on Railway →](https://railway.com/deploy/lovense-connector-for-chatgpt)
