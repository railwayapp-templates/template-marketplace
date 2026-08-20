# Deploy tank3 one-click push relay on Railway

host your own push notification relay for your tank projects

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tank3-one-click-push-relay)

## About

Host your own relay service for remote access to your agents from the Tank3 iOS app.

Tank3 is the pocket control room for agents running on your own machines, but if you want to actually control the machines from your pocket, you need a little infra to route push notifications. This is the template for that relay.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tankernauts/tank-relay:v0.1.0 | `ghcr.io/tankernauts/tank-relay:v0.2.0@sha256:6ed333ee0603a7b4bf0bd0692c86495f117c2a4e2302711154613a852c740f1d` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TANK_RELAY_IMAGE_REF` | ghcr.io/tankernauts/tank-relay:v0.2.0@sha256:6ed333ee0603a7b4bf0bd0692c86495f117c2a4e2302711154613a852c740f1d | verify the deployed image matches this ref |
| `TANK_RELAY_BOOTSTRAP_SECRET` | (secret) | Paste the value from Tank's relay setup screen. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/tank3-one-click-push-relay)
