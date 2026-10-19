# Deploy Client File Handoff with PairDrop on Railway

Password-gated browser file handoff with WebSocket fallback disabled.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/client-file-handoff-with-pairdrop)

## About

Password-gated browser file handoff with WebSocket fallback disabled.

Small teams sending files directly between browsers during client calls.

Give the intended recipient the operator gateway credentials, open the HTTPS page on both devices, and use a pairing code or room. Confirm the recipient on screen before sending. Keep both browser tabs open until completion.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | None; container state is disposable | Private network only |
| Gateway | None; container state is disposable | HTTPS domain |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.
4. For the first browser prompt use username `operator` and the generated `Gateway.GATEWAY_PASSWORD` from Railway variables. App-specific accounts, where present, remain separate. The App service has no public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gateway | `caddy@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f` | Web service |
| App | `linuxserver/pairdrop@sha256:2e673eebd640beea33f131f4426b90548354e620ae593336a73be9374bb70bc2` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Gateway | 8080 | - |
| `GATEWAY_PASSWORD` | Gateway | (secret) | Gateway username is operator. Retrieve the generated password in Railway variables. |
| `TZ` | App | Etc/UTC | - |
| `PGID` | App | 1000 | - |
| `PORT` | App | 3000 | - |
| `PUID` | App | 1000 | - |
| `DEBUG_MODE` | App | false | - |
| `RATE_LIMIT` | App | true | - |
| `WS_FALLBACK` | App | false | - |

## Configuration

- **Start command:** `/bin/sh -c 'set -eu; hash=$(caddy hash-password --plaintext "$GATEWAY_PASSWORD"); printf "{\n admin off\n auto_https off\n}\n:8080 {\n header X-Robots-Tag noindex\n basic_auth {\n operator %s\n }\n reverse_proxy %s {\n header_up X-Forwarded-Proto https\n }\n}\n" "$hash" "$UPSTREAM" > /tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/client-file-handoff-with-pairdrop)
