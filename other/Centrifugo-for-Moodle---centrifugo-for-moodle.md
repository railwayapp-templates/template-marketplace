# Deploy Centrifugo for Moodle on Railway

Web sockets support in Moodle (tool_realtime)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/centrifugo-for-moodle)

## About

This template deploys a pre-configured [Centrifugo](https://centrifugal.dev/) server ready to connect to your Moodle site via the [tool_realtime](https://lmscloud.io/plugins/tool_realtime) plugin. It enables real-time WebSocket communication so Moodle plugins can push live updates to users' browsers without page reloads.

This template handles the entire Centrifugo setup for you. All security keys and configuration are randomly generated at deploy time.

Once deployed, copy the generated service URL and keys into the Centrifugo plugin settings in Moodle. Use the built-in **Test settings** page to verify the connection. From that point on, any Moodle plugin that uses the tool_realtime framework will automatically benefit from WebSocket delivery instead of PHP polling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| centrifugo | `centrifugo/centrifugo:v6` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `CENTRIFUGO_ADMIN_SECRET` | (secret) |
| `CENTRIFUGO_HTTP_API_KEY` | (secret) |
| `CENTRIFUGO_ADMIN_ENABLED` | true |
| `CENTRIFUGO_ADMIN_PASSWORD` | (secret) |
| `CENTRIFUGO_HEALTH_ENABLED` | true |
| `CENTRIFUGO_CHANNEL_NAMESPACES` | [{"name":"anypush","allow_subscribe_for_client":true,"allow_publish_for_client":true},{"name":"server","allow_subscribe_for_client":true,"allow_publish_for_client":false}] |
| `CENTRIFUGO_CLIENT_ALLOWED_ORIGINS` | * |
| `CENTRIFUGO_CLIENT_TOKEN_HMAC_SECRET_KEY` | (secret) |
| `CENTRIFUGO_CHANNEL_WITHOUT_NAMESPACE_ALLOW_PUBLISH_FOR_CLIENT` | false |
| `CENTRIFUGO_CHANNEL_WITHOUT_NAMESPACE_ALLOW_SUBSCRIBE_FOR_CLIENT` | true |

## Configuration

- **Start command:** `centrifugo`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/centrifugo-for-moodle)
