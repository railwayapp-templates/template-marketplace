# Deploy CRM | EspoCRM, Open-Source Salesforce Alternative on Railway

EspoCRM 10 on Postgres with live updates and an admin ready on boot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crm)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/crm?utm_medium=integration&utm_source=button&utm_campaign=crm)

[EspoCRM](https://www.espocrm.com/) is an open-source CRM: accounts, contacts, leads, opportunities with a sales pipeline, cases, calendar, tasks, email, reports and a portal for customers. You can add your own fields, entities and layouts without code. This template runs EspoCRM 10.0.8 on the official image with Postgres. The admin account is created on first boot, and live updates run over WebSocket, so it works as soon as the deploy finishes.

There are two services: EspoCRM and Postgres.

- **One EspoCRM service.** The web app, the job daemon (reminders, email fetching, workflows) and the WebSocket server run together in one container on the official 10.0.8 image. Upstream's Docker setup runs them as three containers that share volumes, which Railway can't do.
- **Admin ready on boot.** Log in as `admin` with a generated password. There is no installer page left open.
- **Your changes persist.** Uploads, config, and the custom fields, entities, layouts and extensions you add are all kept on the one volume. Upgrading the image doesn't lose them.
- **Live updates.** Notifications, the activity stream and open records refresh as they change, without polling.
- **Upgrades that migrate themselves.** Each boot runs EspoCRM's database migrations before it starts serving.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| EspoCRM | [nomideusz/espocrm-railway](https://github.com/nomideusz/espocrm-railway) (root: /espocrm) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | espocrm | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `PORT` | EspoCRM | 80 | Port Apache listens on - leave as is |
| `ESPOCRM_SITE_URL` | EspoCRM | - | Address used in links, emails and the live-update connection - set it to your custom domain when you add one |
| `ESPOCRM_DATABASE_HOST` | EspoCRM | - | Postgres host - private network, leave as is |
| `ESPOCRM_DATABASE_NAME` | EspoCRM | - | Postgres database - leave as is |
| `ESPOCRM_DATABASE_PORT` | EspoCRM | 5432 | Postgres port |
| `ESPOCRM_DATABASE_USER` | EspoCRM | (secret) | Postgres user - leave as is |
| `ESPOCRM_ADMIN_PASSWORD` | EspoCRM | (secret) | Password for the admin login, set on first boot only - copy it from here to log in, then change it in EspoCRM |
| `ESPOCRM_DATABASE_PASSWORD` | EspoCRM | (secret) | Postgres password - leave as is |
| `ESPOCRM_DATABASE_PLATFORM` | EspoCRM | Postgresql | Database type - leave as is |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/crm)
