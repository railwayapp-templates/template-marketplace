# Deploy ByteStash on Railway

[Jun'26] Self-hosted snippet manager to store and organize reusable code.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bytestash)

## About

ByteStash is a self-hosted web application for storing, organizing, and managing reusable code snippets. It gives developers a clean private workspace to save useful scripts, commands, configuration examples, and code references in one place, with support for creating, editing, filtering, and securely accessing snippets.

Hosting ByteStash on Railway gives you a lightweight self-hosted snippet manager without needing to manually configure servers, reverse proxies, or deployment pipelines. ByteStash runs as a single web application and stores its data using persistent storage, making it simple to deploy and maintain. Once deployed, you can use it as a private code vault for personal development, team references, reusable API snippets, shell commands, infrastructure notes, or automation scripts.

This template is designed for a simple one-click deployment experience, using ByteStash with persistent storage so your snippets remain available across restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bytestash | `ghcr.io/jordan-dalby/bytestash:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5000 |
| `DEBUG` | false |
| `JWT_SECRET` | (secret) |
| `OIDC_ENABLED` | false |
| `TOKEN_EXPIRY` | (secret) |
| `DISABLE_ACCOUNTS` | false |
| `ALLOW_NEW_ACCOUNTS` | true |
| `OIDC_CLIENT_SECRET` | (secret) |
| `DISABLE_INTERNAL_ACCOUNTS` | false |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/snippets`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/bytestash)
