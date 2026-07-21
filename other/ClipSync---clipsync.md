# Deploy ClipSync on Railway

Clipboard sync across multiple devices

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clipsync)

## About

ClipSync is a self-hosted clipboard synchronization platform that securely syncs text, images, and files across Windows, macOS, Linux, and Android devices. It features multi-user support, client-side end-to-end encryption, user authentication, and a web-based administration interface, allowing you to maintain full control over your clipboard data without relying on third-party cloud services.

Hosting ClipSync on Railway provides a reliable and secure environment for synchronizing clipboard content across multiple devices. Railway handles container deployment, HTTPS, networking, and persistent storage, allowing the service to remain available with minimal operational overhead.

ClipSync stores its embedded encrypted database on a persistent Railway Volume, ensuring user accounts, settings, and synchronized data remain available across redeployments and service restarts. Since end-to-end encryption is performed on the client side, clipboard content remains encrypted before reaching the server. No external database, Redis, or additional backend services are required, making deployment straightforward while retaining full ownership of your data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClipSync | `sathvikrao/clipcascade:0.7.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NODE_ENV` | production |
| `CC_P2P_ENABLED` | false |
| `CC_SIGNUP_ENABLED` | false |
| `CC_SERVER_DB_PASSWORD` | (secret) |
| `CC_MAX_MESSAGE_SIZE_IN_MiB` | 5 |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/database`

**Category:** Other

[View on Railway →](https://railway.com/deploy/clipsync)
