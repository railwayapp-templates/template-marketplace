# Deploy Railway Caddy Function on Railway

Quickly run any Caddyfile in a Railway container.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-caddy-function)

## About

# Deploy a Caddyfile on Railway
Quickly create a Caddy proxy on a Railway hosted container. Read more about Caddy here: https://caddyserver.com/

## Hosting a Caddyfile
Encode your Caddyfile to a base64 string using any tool of your choice. I used https://www.base64encode.org/.

Take the output string and put it in the `CADDYFILE` environmental variable. Deploy the container and it will create a Caddy server with the configuration you provided.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-function-caddy | `ghcr.io/thesamgordon/railway-function-caddy` | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `CADDYFILE` | Base64 encoded Caddyfile. |

## Configuration

- **Start command:** `/bin/sh -c "exec sh run.sh $CADDYFILE"`

**Category:** Other

[View on Railway →](https://railway.com/deploy/railway-caddy-function)
