# Deploy SIWA Keyring (Keyring Proxy, Telegram 2FA services) on Railway

SIWA stack with Keyring proxy, and Telegram 2FA services.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/siwa-keyring-keyring-proxy-telegram-2fa-)

## About

**siwa-keyring-proxy** is a standalone Express server that acts as a security boundary for AI agent signing. It holds encrypted private keys and exposes HMAC-authenticated HTTP endpoints for wallet creation, message signing, and transaction signing — so private keys never enter the agent's process.

Hosting siwa-keyring-proxy involves deploying a single Docker container running a Node.js Express server. The service manages Ethereum private keys using either an AES-encrypted JSON Keystore (persisted to a volume) or a raw private key from an environment variable. All signing requests are authenticated via HMAC-SHA256 with a shared secret, ensuring only authorized agents can request signatures. The server exposes a `/health` endpoint for readiness checks. Configuration is entirely through environment variables — set a shared HMAC secret, choose a keystore backend, and provide a password or private key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 2FA_Telegram | [builders-garden/siwa](https://github.com/builders-garden/siwa) (root: /packages/2fa-telegram) | Worker |
| 2FA_Gateway | [builders-garden/siwa](https://github.com/builders-garden/siwa) (root: /packages/2fa-gateway) | Web service |
| Keyring_Proxy | [builders-garden/siwa](https://github.com/builders-garden/siwa) (root: /packages/keyring-proxy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TFA_PORT` | 2FA_Telegram | 3200 | Default Service Port (not public). |
| `TFA_SECRET` | 2FA_Telegram | (secret) | API secret to let this service communicate with the Keyring Proxy.  |
| `TELEGRAM_CHAT_ID` | 2FA_Telegram | - | Telegram Bot chat ID. |
| `TELEGRAM_BOT_TOKEN` | 2FA_Telegram | (secret) | Telegram Bot Token. |
| `TFA_AUDIT_LOG_PATH` | 2FA_Telegram | ./audit.jsonl | Path for audit logs (JSON lines format). |
| `TFA_APPROVAL_TIMEOUT_MS` | 2FA_Telegram | 60000 | Approval timeout in milliseconds (default: 60000 = 60 seconds). |
| `TFA_GATEWAY_PORT` | 2FA_Gateway | 3201 | Default Service Port (public). |
| `TFA_INTERNAL_URL` | 2FA_Gateway | http://2fatelegram.railway.internal:3200 | The private DNS name of the service. |
| `TELEGRAM_BOT_TOKEN` | 2FA_Gateway | (secret) | Telegram Bot Token. |
| `TFA_SECRET` | Keyring_Proxy | (secret) | API secret to communicate with the 2FA Service. |
| `TFA_ENABLED` | Keyring_Proxy | true | Enable or Disable 2FA feature. |
| `TFA_OPERATIONS` | Keyring_Proxy | sign-message,sign-transaction,sign-authorization | Which operations require 2FA (comma-separated). |
| `TFA_SERVER_URL` | Keyring_Proxy | http://2fatelegram.railway.internal:3200 | 2FA Service url (using internal network, not public). |
| `KEYSTORE_PASSWORD` | Keyring_Proxy | (secret) | Password to decrypto the local keystore file where keys and sensitive data are stored. |
| `KEYRING_PROXY_SECRET` | Keyring_Proxy | (secret) | API secret to communicate with the Keyring Service. Set it up also on your OpenClaw gateway service. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, Shell, Dockerfile, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/siwa-keyring-keyring-proxy-telegram-2fa-)
