# Deploy Trading Bot FXCM on Railway

Bot FXCM multicuenta con modelos compartidos; inicia en Demo y pausado.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trading-bot-fxcm)

## About

Deploy a multi-account FXCM trading dashboard with a Python trading engine,
shared model catalog and a private ForexConnect gateway. Each account has its
own settings, SQLite history, FXCM session and active model. The template
includes the experimental model catalog and starts with trading paused.

Railway runs the web app and the ForexConnect gateway as two services. The web
app serves the dashboard, API and trading engines; its persistent volume at
`/app/data` holds account databases and the shared models. The gateway is
reachable only through Railway's private network. A generated password protects
the public dashboard. The first account starts in Demo without FXCM credentials
or an active model. Connect your own account and choose a compatible model in
the dashboard before enabling trading.

Set `PORT=8000` on the web service and `PORT=5000` on the gateway. The web
service reaches the gateway through its private Railway domain on port 5000.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trading-bot | [FidelRoman/trading-bot](https://github.com/FidelRoman/trading-bot) (root: /) | Web service |
| fxcm-gateway | [FidelRoman/trading-bot](https://github.com/FidelRoman/trading-bot) (root: /gateway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | trading-bot | 8000 | Puerto HTTP interno del panel; mantenlo en 8000. |
| `WEB_USER` | trading-bot | (secret) | Usuario para acceder al panel web. |
| `WEB_PASSWORD` | trading-bot | (secret) | Contraseña HTTP Basic generada para cada instalación. |
| `FXCM_CONNECTION` | trading-bot | Demo | Entorno FXCM inicial: Demo. |
| `SIGNALS_ENABLED` | trading-bot | 0 | Activa las señales de Telegram solo después de configurar sus credenciales. |
| `FXCM_GATEWAY_URL` | trading-bot | - | Dirección privada del servicio FXCM en este proyecto. |
| `SUPABASE_SYNC_ENABLED` | trading-bot | 0 | Sincronización Supabase apagada hasta configurar claves y migración. |
| `PORT` | fxcm-gateway | 5000 | Puerto HTTP interno del gateway; mantenlo en 5000. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Healthcheck:** `/health`

**Category:** Bots · **Languages:** Python, TypeScript, CSS, Shell, PLpgSQL, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/trading-bot-fxcm)
