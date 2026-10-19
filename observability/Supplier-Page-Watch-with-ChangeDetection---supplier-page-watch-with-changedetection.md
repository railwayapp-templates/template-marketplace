# Deploy Supplier Page Watch with ChangeDetection on Railway

Private supplier-page monitoring with durable diffs and bounded polling.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supplier-page-watch-with-changedetection)

## About

Private supplier-page monitoring with durable diffs and bounded polling.

Procurement teams and small shops tracking supplier catalog pages.

Add a supplier URL, select the price or stock CSS selector, choose an interval, then add a notification destination in Settings. HTTP fetching is ready; JavaScript-heavy pages need a separately configured browser service.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | /datastore | Private network only |
| Gateway | None; container state is disposable | HTTPS domain |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.
4. For the first browser prompt use username `operator` and the generated `Gateway.GATEWAY_PASSWORD` from Railway variables. App-specific accounts, where present, remain separate. The App service has no public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `ghcr.io/dgtlmoon/changedetection.io@sha256:04eaae7915bad711160cb15abe160f6d3fabe98bbbd658509d4b7a654000fb2d` | Database |
| Gateway | `caddy@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | App | Etc/UTC | - |
| `PORT` | App | 5000 | - |
| `FETCH_WORKERS` | App | 2 | - |
| `ALLOW_FILE_URI` | App | false | - |
| `USE_X_SETTINGS` | App | 1 | - |
| `PAGE_WATCH_LIMIT` | App | 100 | - |
| `DISABLE_VERSION_CHECK` | App | true | - |
| `LLM_FEATURES_DISABLED` | App | true | - |
| `MINIMUM_SECONDS_RECHECK_TIME` | App | 300 | - |
| `ALLOW_IANA_RESTRICTED_ADDRESSES` | App | false | - |
| `PORT` | Gateway | 8080 | - |
| `GATEWAY_PASSWORD` | Gateway | (secret) | Gateway username is operator. Retrieve the generated password in Railway variables. |

## Configuration

- **Volume:** `/datastore`
- **Start command:** `/bin/sh -c 'set -eu; hash=$(caddy hash-password --plaintext "$GATEWAY_PASSWORD"); printf "{\n admin off\n auto_https off\n}\n:8080 {\n header X-Robots-Tag noindex\n basic_auth {\n operator %s\n }\n reverse_proxy %s {\n header_up X-Forwarded-Proto https\n }\n}\n" "$hash" "$UPSTREAM" > /tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/supplier-page-watch-with-changedetection)
