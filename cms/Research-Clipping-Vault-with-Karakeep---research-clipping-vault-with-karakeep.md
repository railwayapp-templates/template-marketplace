# Deploy Research Clipping Vault with Karakeep on Railway

A protected clipping vault with a browser worker and full-text search.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/research-clipping-vault-with-karakeep)

## About

A protected clipping vault with a browser worker and full-text search.

Researchers, writers and consultants keeping annotated source material.

Enter through the operator gateway and register the first Karakeep account. Set DISABLE_SIGNUPS=true after onboarding. Save an article, organize it with lists and tags, then search extracted text. A private Chrome worker and Meilisearch are included. Browser extensions must also satisfy the gateway login.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | /data | Private network only |
| Search | /meili_data | Private network only |
| Browser | None; container state is disposable | Private network only |
| Gateway | None; container state is disposable | HTTPS domain |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.
4. For the first browser prompt use username `operator` and the generated `Gateway.GATEWAY_PASSWORD` from Railway variables. App-specific accounts, where present, remain separate. The App service has no public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `ghcr.io/karakeep-app/karakeep@sha256:151cdd6b5f2e21635645983e126f411675bfa35becb02c028c1a727f45f899c6` | Database |
| Gateway | `caddy@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f` | Web service |
| Search | `getmeili/meilisearch@sha256:860fa4baed04ae1c235de870edab0c8006227546dea1bbb6411fbfc5e27cf1db` | Database |
| Browser | `ghcr.io/karakeep-app/karakeep-chrome@sha256:c51a8c8e6c3c1040a50fa0ecfd0b2fc298401b4229262636552458151f6f18fa` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | App | Etc/UTC | - |
| `PORT` | App | 3000 | - |
| `DATA_DIR` | App | /data | - |
| `LOG_LEVEL` | App | warn | - |
| `DISABLE_SIGNUPS` | App | false | - |
| `NEXTAUTH_SECRET` | App | (secret) | - |
| `PORT` | Gateway | 8080 | - |
| `GATEWAY_PASSWORD` | Gateway | (secret) | Gateway username is operator. Retrieve the generated password in Railway variables. |
| `MEILI_ENV` | Search | production | - |
| `MEILI_HTTP_ADDR` | Search | 0.0.0.0:7700 | - |
| `MEILI_NO_ANALYTICS` | Search | true | - |

## Configuration

- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'set -eu; hash=$(caddy hash-password --plaintext "$GATEWAY_PASSWORD"); printf "{\n admin off\n auto_https off\n}\n:8080 {\n header X-Robots-Tag noindex\n basic_auth {\n operator %s\n }\n reverse_proxy %s {\n header_up X-Forwarded-Proto https\n }\n}\n" "$hash" "$UPSTREAM" > /tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/research-clipping-vault-with-karakeep)
