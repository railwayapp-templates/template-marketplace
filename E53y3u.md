# Deploy Unleash on Railway

A feature management/rollout software

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/E53y3u)

## About

![Unleash - Feature management/rollout service](https://github.com/Unleash/unleash/raw/main/.github/github_header_opaque_landscape.svg)

# Unleash - Feature management/rollout service

Unleash is an open-source feature management/rollout service that provides a scalable and efficient way to manage feature toggles in software applications. It allows developers to easily enable or disable features in their applications without the need for redeployment, providing flexibility and control over feature releases.

![Unleash - Screenshot](https://theproductmanager.b-cdn.net/wp-content/cache/theproductmanager.com/static/static.crozdesk.com/web-app-library-categories-providers-screenshots-000-946-759-pub-unleash-screenshot-1684879519.png)

## License

Unleash is released under the [MIT License](https://github.com/Unleash/unleash/blob/main/LICENSE), which allows for the free use, modification, and distribution of the software.

## Documentation

For detailed documentation and usage instructions, please refer to the [Unleash Documentation](https://unleash.github.io/docs/) website.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Primary | `unleashorg/unleash-server` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `UNLEASH_URL` | Primary | - | Railway deployment service url |
| `DATABASE_SSL` | Primary | false | Postgresql database ssl toggle (true/false) |
| `DATABASE_URL` | Primary | - | Postgres database url |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/template/E53y3u)
