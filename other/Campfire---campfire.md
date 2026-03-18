# Deploy Campfire on Railway

Super simple group chat, without a subscription.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/campfire)

## About

Campfire is an installable, self-hosted group chat system. Easily invite people. Make rooms. @mentions, DMs, and mobile support. The basics done right. And since you get the code and host it yourself, you can customize it however you’d like for your own use. Plus, you own your data.

Campfire was created by the folks at Basecamp, checkout their public GitHub repo at https://github.com/basecamp/once-campfire

Campfire is a Ruby on Rails application that uses SQLite to store its data, so you’ll need a persistent volume attached to the application. This template provides all the necessary configurations to go from zero to a production-ready deployment, including environment setup, volume mounting, and basic application settings. With these defaults, you can get Campfire running quickly while maintaining control over your data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Campfire | [heyjorgedev/once-campfire](https://github.com/heyjorgedev/once-campfire) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Don't change this unless you know what you are doing |
| `DISABLE_SSL` | true | - |
| `SECRET_KEY_BASE` | (secret) | - |
| `VAPID_PUBLIC_KEY` | - | set these to a valid keypair to allow sending Web Push notifications. You can generate a new keypair by using https://www.attheminute.com/us/vapid-key-generator |
| `VAPID_PRIVATE_KEY` | - | set these to a valid keypair to allow sending Web Push notifications. You can generate a new keypair by using https://www.attheminute.com/us/vapid-key-generator |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rails/storage`

**Category:** Other · **Languages:** Ruby, HTML, JavaScript, CSS, Shell, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/campfire)
