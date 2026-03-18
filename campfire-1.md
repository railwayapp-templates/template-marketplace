# Deploy Campfire on Railway

Super simple group chat, without a subscription.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/campfire-1)

## About

&gt; **Note:** Campfire requires Web Push credentials for notifications. Before deployment, generate a `VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY`, and configure them as environment variables in Railway. These keys are used to authenticate push notifications to browsers and PWAs.

![campfire](https://once.com/assets/images/campfire-01.webp)

**Campfire** is a self-hosted, open-source group chat system by 37signals. It provides the core collaboration primitives—rooms, DMs, mentions, search, and mobile support—without subscriptions or vendor lock-in. You own the code, the infrastructure, and the data, making it a durable alternative to Slack or Microsoft Teams.

Hosting Campfire involves running a single Dockerized application on infrastructure you control. The service includes the web UI, real-time messaging, and background jobs in one cohesive deployment. Once running, users access Campfire through the browser or as a mobile PWA. Updates can be applied automatically or manually, and SSL can be configured at the platform level. On Railway, Campfire can be deployed with minimal setup while retaining full control over scaling, networking, and environment configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Campfire | [basecamp/once-campfire](https://github.com/basecamp/once-campfire) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Default application port. |
| `DISABLE_SSL` | true | Disable's SSL in favor of Railway's termination. |
| `RAILS_LOG_LEVEL` | info | Log level tracing for debugging. |
| `SECRET_KEY_BASE` | (secret) | Base secret key. |
| `VAPID_PUBLIC_KEY` | - | Public key for Voluntary Application Server Identification web push notifications. |
| `VAPID_PRIVATE_KEY` | - | Private key for Voluntary Application Server Identification web push notifications. |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rails/storage`

**Category:** Other · **Languages:** Ruby, HTML, JavaScript, CSS, Shell, Dockerfile, Procfile

[View on Railway →](https://railway.com/template/campfire-1)
