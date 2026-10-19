# Deploy Campaign Short Link API with Shlink on Railway

Campaign short-link API with a generated API key and private Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/campaign-short-link-api-with-shlink)

## About

Campaign short-link API with a generated API key and private Postgres.

Small marketing teams managing short links from their own tools.

Retrieve INITIAL_API_KEY from Railway variables. Use it as the X-Api-Key header for POST /rest/v3/short-urls with a longUrl JSON field, then open the resulting short URL. Set a custom domain and update DEFAULT_DOMAIN before creating production links.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | None; container state is disposable | HTTPS domain |
| Postgres | /var/lib/postgresql/data | Private network only |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres@sha256:b0f9560a2de083e2cc7382e75f808c7381a32852a7ec49117deedb300e552b24` | Database |
| App | `shlinkio/shlink@sha256:844e1f2b6455331c5b49207bad3a2455ccd65e62bb9daa09a6c57afff26bd9c8` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | app | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `TZ` | App | Etc/UTC | - |
| `PORT` | App | 8080 | - |
| `DB_NAME` | App | app | - |
| `DB_PORT` | App | 5432 | - |
| `DB_USER` | App | (secret) | - |
| `DB_DRIVER` | App | postgres | - |
| `DB_PASSWORD` | App | (secret) | - |
| `INITIAL_API_KEY` | App | (secret) | - |
| `IS_HTTPS_ENABLED` | App | true | - |
| `GEOLITE_LICENSE_KEY` | App | - | Optional MaxMind license for visitor geolocation. |
| `SKIP_INITIAL_GEOLITE_DOWNLOAD` | App | true | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/campaign-short-link-api-with-shlink)
