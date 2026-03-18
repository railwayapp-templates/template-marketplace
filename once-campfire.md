# Deploy Once Campfire on Railway

Simple, hostable, open source chatting.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/once-campfire)

## About

Super simple group chat, without a subscription.

Campfire is an installable, self-hosted group chat system. Easily invite people. Make rooms. @mentions, DMs, and mobile support. The basics done right. And since you get the code and host it yourself, you can customize it however you’d like for your own use. Plus, you own your data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Campfire | `ghcr.io/basecamp/once-campfire:main` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | - |
| `DISABLE_SSL` | true | - |
| `SECRET_KEY_BASE` | (secret) | - |
| `VAPID_PUBLIC_KEY` | - | Your public API key. You can generate one here: https://www.attheminute.com/us/vapid-key-generator |
| `VAPID_PRIVATE_KEY` | - | Your private API key. You can generate one here: https://www.attheminute.com/us/vapid-key-generator |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rails/storage`

**Category:** Other

[View on Railway →](https://railway.com/template/once-campfire)
