# Deploy aliasvault on Railway

AliasVault is a privacy-first password manager with built-in email aliasing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/aliasvault-railway)

## About

AliasVault is an open-source, end-to-end encrypted password and email alias manager.  
This Railway template uses the official `ghcr.io/aliasvault/aliasvault:latest` all-in-one image, which bundles API, web client, admin panel, task runner, SMTP service, and database stack into one container for easy deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| aliasvault | `ghcr.io/aliasvault/aliasvault:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `SMTP_TLS_ENABLED` | false |
| `IP_LOGGING_ENABLED` | true |
| `FORCE_HTTPS_REDIRECT` | false |
| `PUBLIC_REGISTRATION_ENABLED` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/database`

**Category:** Authentication

[View on Railway →](https://railway.com/template/aliasvault-railway)
