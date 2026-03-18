# Deploy Answer on Railway

A Q&A platform software for teams at any scales. [ Auto Installation ]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/w3tCgf)

## About

# Answer

A Q&A platform software for teams at any scales. Whether it’s a community forum, help center, or knowledge management platform, you can always count on [Answer](https://answer.apache.org).

Check out Answer Docs for more details: https://answer.apache.org/docs

## Installation

Once deployed, you'll need to provide admin login details and a contact email.

It's set up to auto-install by default, but you can set "auto-install" to false for manual installation.

## Authentication

The password is set automatically and can be found in the `ADMIN_PASSWORD` service variable. You can also set it to a custom value during deployment of the template.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Answer | `apache/answer` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database |
| `DATABASE_URL` | Postgres | - | Public URL |
| `POSTGRES_USER` | Postgres | (secret) | Database username |
| `PGHOST_PRIVATE` | Postgres | - | Private host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private Port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private URL |
| `PORT` | Answer | - | Tells Railway to use the INSTALL_PORT that we set |
| `DB_TYPE` | Answer | postgres | supports: `sqlite3`, `mysql`, `postgres` |
| `LANGUAGE` | Answer | en-US | Language to be used |
| `SITE_URL` | Answer | - | Site's URL |
| `SITE_NAME` | Answer | Answer | - |
| `ADMIN_NAME` | Answer | - | Your admin username |
| `ADMIN_EMAIL` | Answer | - | Your Admin Email |
| `DB_PASSWORD` | Answer | (secret) | - |
| `DB_USERNAME` | Answer | (secret) | - |
| `AUTO_INSTALL` | Answer | true | We tell Answer to auto install, set to `false` if you want to install manually |
| `INSTALL_PORT` | Answer | 80 | The port the app will use |
| `CONTACT_EMAIL` | Answer | - | Contact Email |
| `ADMIN_PASSWORD` | Answer | (secret) | Your admin password, AT LEAST 8 CHARACTERS |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Answer | true | Temporary workaround for a private network initialization issue with Railway |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/template/w3tCgf)
