# Deploy United! on Railway

United! Free and open membership software for collective organizations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eqEBYm)

## About

United is free and open membership software for collective organizations, allowing robust tracking of membership, expirations, email broadcast tools, providing single-sign-on for your members, and more.

The source code is licensed under the AGPL (v3.0 or later) and can be found at https://codeberg.org/reesericci/united.

More info can be found at https://united.obl.ong

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| United! | `reesericci/united` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DEBUG` | United! | 1 | - |
| `RAILS_ENV` | United! | production | - |
| `SECRET_KEY_BASE` | United! | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/eqEBYm)
