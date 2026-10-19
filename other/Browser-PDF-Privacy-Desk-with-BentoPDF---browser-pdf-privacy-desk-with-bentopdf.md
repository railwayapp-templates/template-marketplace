# Deploy Browser PDF Privacy Desk with BentoPDF on Railway

A protected browser PDF desk without a server-side document archive.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/browser-pdf-privacy-desk-with-bentopdf)

## About

A protected browser PDF desk without a server-side document archive.

Teams preferring browser-side PDF tasks for small document workflows.

Enter the operator gateway, choose a PDF operation and open a local sample file. Download the result to your own document store. Use this separate desk when you do not need the server-side Stirling processing stack.

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
| App | `ghcr.io/alam00000/bentopdf@sha256:6ef493c8e3bdbaa26c9bfcec330377ae95116fa00660ca0342769063197b1952` | Worker |
| Gateway | `caddy@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | App | Etc/UTC | - |
| `PORT` | App | 8080 | - |
| `PORT` | Gateway | 8080 | - |
| `GATEWAY_PASSWORD` | Gateway | (secret) | Gateway username is operator. Retrieve the generated password in Railway variables. |

## Configuration

- **Start command:** `/bin/sh -c 'set -eu; hash=$(caddy hash-password --plaintext "$GATEWAY_PASSWORD"); printf "{\n admin off\n auto_https off\n}\n:8080 {\n header X-Robots-Tag noindex\n basic_auth {\n operator %s\n }\n reverse_proxy %s {\n header_up X-Forwarded-Proto https\n }\n}\n" "$hash" "$UPSTREAM" > /tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/browser-pdf-privacy-desk-with-bentopdf)
