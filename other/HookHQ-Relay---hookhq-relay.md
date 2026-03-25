# Deploy HookHQ Relay on Railway

Deploy and Host HookHQ Relay with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hookhq-relay)

## About

HookHQ is a relay/proxy service for HookHQ to provide static outbound IP addresses for your webhooks running on HookHQ.

To configure HookHQ Relay, add a new proxy server in your HookHQ dashboard and copy the proxy secret displayed in the dashboard (enter a placeholder value in the URL to generate the secret).

Deploy this template, using the provided secret for the `PROXY_SECRET` environment variable.

Once deployed, toggle on `Enable Static IPs` in your service settings, then copy the HTTP hostname and enter it in your HookHQ proxy server settings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nuovar/hookhq-relay | `nuovar/hookhq-relay` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `PROXY_SECRET` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/hookhq-relay)
