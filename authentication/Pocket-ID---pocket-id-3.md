# Deploy Pocket ID on Railway

A simple OIDC provider that enables authentication with passkeys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocket-id-3)

## About

NOT OFFICIAL OR AFFILIATED WITH Pocket ID
Always refer to the official sources:
https://github.com/pocket-id/pocket-id
https://pocket-id.org/

The goal of Pocket ID is to be a simple and easy-to-use. There are other self-hosted OIDC providers like Keycloak or ORY Hydra but they are often too complex for simple use cases.

Additionally, what makes Pocket ID special is that it only supports passkey authentication, which means you don’t need a password. Some people might not like this idea at first, but I believe passkeys are the future, and once you try them, you’ll love them. For example, you can now use a physical Yubikey to sign in to all your self-hosted services easily and securely.

Hosting should be straight forward, almost no setup is required: Only set your public URL for DNS and you're good.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pocket ID | `ghcr.io/pocket-id/pocket-id:v2` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_URL` | - | The URL where you will access the app. |
| `TRUST_PROXY` | true | Whether the app is behind a reverse proxy. |
| `ENCRYPTION_KEY` | - | Key used to encrypt data, including the private keys. |

## Configuration

- **Healthcheck:** `/healthz`
- **Volume:** `/app/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/pocket-id-3)
