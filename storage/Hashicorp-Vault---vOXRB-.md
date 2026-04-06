# Deploy Hashicorp Vault on Railway

Vault container in Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vOXRB-)

## About

HashiCorp Vault is a secrets management tool that provides secure storage, dynamic credentials, encryption as a service, and fine-grained access control for sensitive data. This template deploys a production-ready Vault server on Railway with sensible defaults and an easy path to scale.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hashicorp-vault?referralCode=C3Uv6n&utm_medium=integration&utm_source=template&utm_campaign=generic)

![Vault dashboard UI](https://raw.githubusercontent.com/FournyP/vault-railway-template/main/docs/images/vault-dashboard.png)

Vault runs as a single service that exposes an HTTP API and an optional web UI for managing secrets, policies, and authentication methods. It can operate in development mode with in-memory storage for quick testing, or in production mode with persistent file-based storage. Railway makes it simple to deploy Vault without managing servers, while enabling vertical scaling and persistent storage for your secrets engine.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vault-railway-template | [FournyP/vault-railway-template](https://github.com/FournyP/vault-railway-template) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ENV` | prod | Use "dev" for a development server |
| `PORT` | 8200 | Port of listener address |
| `UI_ENABLED` | false | Enables the built-in web UI, which is available on all listeners (address + port) at the /ui path. |
| `STORAGE_PATH` | /vault/file | Configures the storage backend where Vault data is stored. |
| `MAX_LEASE_TTL` | 730h | Specifies the maximum possible lease duration for tokens and secrets. |
| `DEFAULT_LEASE_TTL` | 168h | Specifies the default lease duration for tokens and secrets. |
| `DEV_ROOT_TOKEN_ID` | (secret) | Setup in case of ENV = "dev" |

## Configuration

- **Volume:** `/vault/file`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/vOXRB-)
