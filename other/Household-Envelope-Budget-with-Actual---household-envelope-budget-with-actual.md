# Deploy Household Envelope Budget with Actual on Railway

A protected Actual Budget sync server with persistent budget files.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/household-envelope-budget-with-actual)

## About

A protected Actual Budget sync server with persistent budget files.

Households wanting an envelope budget with files they control.

Sign in through the operator gateway and create the Actual server password during first setup. Create or import a budget, add accounts, import a small statement file and reconcile it. Keep independent budget exports.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | /data | Private network only |
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
| App | `actualbudget/actual-server@sha256:24645e971da6bb1a1f953d6859e307a0b29be1e8b4130a35b3220c209b5b860c` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Gateway | 8080 | - |
| `GATEWAY_PASSWORD` | Gateway | (secret) | Gateway username is operator. Retrieve the generated password in Railway variables. |
| `TZ` | App | Etc/UTC | - |
| `PORT` | App | 5006 | - |
| `ACTUAL_PORT` | App | 5006 | - |
| `ACTUAL_HOSTNAME` | App | 0.0.0.0 | - |
| `ACTUAL_UPLOAD_FILE_SIZE_LIMIT_MB` | App | 20 | - |
| `ACTUAL_UPLOAD_SYNC_ENCRYPTED_FILE_SYNC_SIZE_LIMIT_MB` | App | 50 | - |

## Configuration

- **Start command:** `/bin/sh -c 'set -eu; hash=$(caddy hash-password --plaintext "$GATEWAY_PASSWORD"); printf "{\n admin off\n auto_https off\n}\n:8080 {\n header X-Robots-Tag noindex\n basic_auth {\n operator %s\n }\n reverse_proxy %s {\n header_up X-Forwarded-Proto https\n }\n}\n" "$hash" "$UPSTREAM" > /tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/household-envelope-budget-with-actual)
