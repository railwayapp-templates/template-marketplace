# Deploy QA Conversion Workbench with IT Tools on Railway

A private browser workbench for QA encodings, IDs and data formatting.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qa-conversion-workbench-with-it-tools)

## About

A private browser workbench for QA encodings, IDs and data formatting.

QA and integration engineers repeatedly checking small payloads.

Sign in through the operator gateway. Select a formatter, encoder, UUID generator or date tool, enter a small test value and copy the result. Keep durable fixtures in your source repository.

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
| App | `corentinth/it-tools@sha256:8b8128748339583ca951af03dfe02a9a4d7363f61a216226fc28030731a5a61f` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Gateway | 8080 | - |
| `GATEWAY_PASSWORD` | Gateway | (secret) | Gateway username is operator. Retrieve the generated password in Railway variables. |
| `TZ` | App | Etc/UTC | - |
| `PORT` | App | 80 | - |

## Configuration

- **Start command:** `/bin/sh -c 'set -eu; hash=$(caddy hash-password --plaintext "$GATEWAY_PASSWORD"); printf "{\n admin off\n auto_https off\n}\n:8080 {\n header X-Robots-Tag noindex\n basic_auth {\n operator %s\n }\n reverse_proxy %s {\n header_up X-Forwarded-Proto https\n }\n}\n" "$hash" "$UPSTREAM" > /tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/qa-conversion-workbench-with-it-tools)
