# Deploy HashiCorp Vault on Railway

Deploy and Host HashiCorp Vault with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vOXRB-)

## About

HashiCorp Vault is a secrets management tool that provides secure storage, dynamic credentials, encryption as a service, and fine-grained access control for sensitive data. This template deploys a production-ready Vault server on Railway with sensible defaults and an easy path to scale.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hashicorp-vault?referralCode=C3Uv6n&utm_medium=integration&utm_source=template&utm_campaign=generic)

![Vault dashboard UI](https://raw.githubusercontent.com/FournyP/vault-railway-template/main/docs/images/vault-dashboard.png)

Vault runs as a single service that exposes an HTTP API and an optional web UI for managing secrets, policies, and authentication methods. It can operate in development mode with in-memory storage for quick testing, or in production mode with persistent file-based storage. Railway makes it simple to deploy Vault without managing servers, while enabling vertical scaling and persistent storage for your secrets engine.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| HashiCorp Vault | [FournyP/vault-railway-template](https://github.com/FournyP/vault-railway-template) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ENV` | file | file keeps secrets on the volume. dev runs vault server -dev: in-memory, unsealed, every secret lost on redeploy. |
| `PORT` | 8200 | Listener port. Baked into the config at build time. |
| `UI_ENABLED` | true | true serves the web UI at /ui. Build-time. |
| `STORAGE_PATH` | /vault/file | Directory of the file backend. Must be the volume's mount path. Build-time. |
| `MAX_LEASE_TTL` | 720h | Maximum lease duration for tokens and secrets. Build-time. |
| `DEFAULT_LEASE_TTL` | 168h | Default lease duration for tokens and secrets. Build-time. |
| `DEV_ROOT_TOKEN_ID` | (secret) | Root token for ENV=dev only. Ignored otherwise. |

## Configuration

- **Volume:** `/vault/file`

**Category:** Storage · **Languages:** Python, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/vOXRB-)
