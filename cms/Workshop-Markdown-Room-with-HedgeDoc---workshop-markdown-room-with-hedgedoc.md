# Deploy Workshop Markdown Room with HedgeDoc on Railway

A protected collaborative Markdown room with Postgres and uploads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/workshop-markdown-room-with-hedgedoc)

## About

A protected collaborative Markdown room with Postgres and uploads.

Facilitators running small workshops and collaborative meeting notes.

Share the operator gateway access only with workshop participants. Register a HedgeDoc account inside the gate, create a note, and explicitly choose its permissions. Invite collaborators to the note URL; close email registration after onboarding.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | /hedgedoc/public/uploads | Private network only |
| Postgres | /var/lib/postgresql/data | Private network only |
| Gateway | None; container state is disposable | HTTPS domain |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.
4. For the first browser prompt use username `operator` and the generated `Gateway.GATEWAY_PASSWORD` from Railway variables. App-specific accounts, where present, remain separate. The App service has no public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `quay.io/hedgedoc/hedgedoc@sha256:cd66986a2a49b57c9bd3677ec76409adf84f412263e8c0f96e6854863f1dd689` | Database |
| Gateway | `caddy@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f` | Web service |
| Postgres | `postgres@sha256:b0f9560a2de083e2cc7382e75f808c7381a32852a7ec49117deedb300e552b24` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | App | Etc/UTC | - |
| `PORT` | App | 3000 | - |
| `CMD_HOST` | App | 0.0.0.0 | - |
| `CMD_PORT` | App | 3000 | - |
| `CMD_EMAIL` | App | true | - |
| `CMD_URL_ADDPORT` | App | false | - |
| `CMD_ENABLE_UPLOADS` | App | registered | - |
| `CMD_SESSION_SECRET` | App | (secret) | - |
| `CMD_ALLOW_ANONYMOUS` | App | false | - |
| `CMD_PROTOCOL_USESSL` | App | true | - |
| `CMD_ENABLE_STATS_API` | App | false | - |
| `CMD_IMAGE_UPLOAD_TYPE` | App | filesystem | - |
| `CMD_DEFAULT_PERMISSION` | App | private | - |
| `CMD_ALLOW_EMAIL_REGISTER` | App | true | - |
| `CMD_ALLOW_ANONYMOUS_EDITS` | App | false | - |
| `PORT` | Gateway | 8080 | - |
| `GATEWAY_PASSWORD` | Gateway | (secret) | Gateway username is operator. Retrieve the generated password in Railway variables. |
| `POSTGRES_DB` | Postgres | app | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Volume:** `/hedgedoc/public/uploads`
- **Start command:** `/bin/sh -c 'set -eu; hash=$(caddy hash-password --plaintext "$GATEWAY_PASSWORD"); printf "{\n admin off\n auto_https off\n}\n:8080 {\n header X-Robots-Tag noindex\n basic_auth {\n operator %s\n }\n reverse_proxy %s {\n header_up X-Forwarded-Proto https\n }\n}\n" "$hash" "$UPSTREAM" > /tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/workshop-markdown-room-with-hedgedoc)
