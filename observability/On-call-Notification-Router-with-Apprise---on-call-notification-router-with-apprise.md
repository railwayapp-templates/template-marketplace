# Deploy On-call Notification Router with Apprise on Railway

An authenticated notification router with persistent provider routes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/on-call-notification-router-with-apprise)

## About

An authenticated notification router with persistent provider routes.

Small on-call teams consolidating alert delivery from scripts.

Sign in through the operator gateway, create a route configuration with your own provider URLs and send a test notification. Scripts must authenticate to the gateway with Basic auth. Use curl -u operator:YOUR_PASSWORD and the upstream /notify endpoint.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | /config | Private network only |
| Gateway | None; container state is disposable | HTTPS domain |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.
4. For the first browser prompt use username `operator` and the generated `Gateway.GATEWAY_PASSWORD` from Railway variables. App-specific accounts, where present, remain separate. The App service has no public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `caronc/apprise@sha256:0b2913b15c8eb47c25345722985ffbfae701326edde21909c205d296d62dd52c` | Database |
| Gateway | `caddy@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | App | Etc/UTC | - |
| `PORT` | App | 8000 | - |
| `APPRISE_ATTACH_SIZE` | App | 0 | - |
| `APPRISE_STORAGE_PATH` | App | /config/store | - |
| `APPRISE_WORKER_COUNT` | App | 1 | - |
| `APPRISE_STATEFUL_MODE` | App | simple | - |
| `PORT` | Gateway | 8080 | - |
| `GATEWAY_PASSWORD` | Gateway | (secret) | Gateway username is operator. Retrieve the generated password in Railway variables. |

## Configuration

- **Volume:** `/config`
- **Start command:** `/bin/sh -c 'set -eu; hash=$(caddy hash-password --plaintext "$GATEWAY_PASSWORD"); printf "{\n admin off\n auto_https off\n}\n:8080 {\n header X-Robots-Tag noindex\n basic_auth {\n operator %s\n }\n reverse_proxy %s {\n header_up X-Forwarded-Proto https\n }\n}\n" "$hash" "$UPSTREAM" > /tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/on-call-notification-router-with-apprise)
