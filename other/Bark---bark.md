# Deploy Bark on Railway

HTTP-triggered iOS notifications with APNs, custom sounds, and encryption

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bark)

## About

Bark is an iOS push notification tool app that allows users to send custom push notifications to their devices via HTTP requests. It leverages Apple Push Notification service (APNs) and supports advanced iOS notification features like grouping, custom icons/sounds, time-sensitive notifications, critical alerts, and end-to-end encryption.

[iOS App](https://apps.apple.com/us/app/bark-custom-notifications/id1403753865)

[Docs](https://bark.day.app/)

Hosting Bark is a breeze — deploy this template, expose it via a public URL, and add it to the Bark app on your iPhone. That's it, you're ready to go.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bark-server | `finab/bark-server` | Web service |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/bark)
