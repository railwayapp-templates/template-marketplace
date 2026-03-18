# Deploy Vaultwarden on Railway

Alternative, self-hosted implementation of the Bitwarden password manager.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/xNfnyW)

## About

### Overview
This template deploys [Vaultwarden](https://github.com/dani-garcia/vaultwarden), a self-hosted, Rust-based, alternative implementation of the Bitwarden password manager. 

The template deploys a lightweight Vaultwarden service from the official docker image and uses a mounted volume for persistent storage. It offers a full implementation of the Bitwarden Server API, including:
* Organizations support
* Attachments and Send
* Vault API support
* Serving the static files for Vault interface
* Website icons API
* Authenticator and U2F support
* YubiKey and Duo support
* Emergency access

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vaultwarden | `vaultwarden/server:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `ADMIN_TOKEN` | (secret) |
| `ROCKET_PORT` | 8000 |

## Configuration

- **Start command:** `./start.sh`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/xNfnyW)
