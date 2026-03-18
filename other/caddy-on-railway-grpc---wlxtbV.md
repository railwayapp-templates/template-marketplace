# Deploy caddy-on-railway-grpc on Railway

Deploy a GRPC reverse proxy with Caddy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wlxtbV)

## About

# gRPC Reverse Proxy on Railway using Caddy Server

Deploy a gRPC reverse proxy with Caddy on Railway. Ensure `SERVICE_URL` (e.g., grpc.railway.internal:1234) and `PORT` are set in the environment variables. Service is exposed by default.

By default, the `Caddyfile` is configured to reverse proxy gRPC requests.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| caddy-on-railway-grpc | [willyfromtheblock/caddy-on-railway-grpc](https://github.com/willyfromtheblock/caddy-on-railway-grpc) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | the caddy port |
| `SERVICE_URL` | - | e. g. yourgrpcservice.railway.internal:1234 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/wlxtbV)
