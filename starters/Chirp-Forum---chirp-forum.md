# Deploy Chirp Forum on Railway

Deploy a secure Chirp forum with PostgreSQL, passwords, and passkeys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chirp-forum)

## About

Launch a lightweight, production-shaped community forum powered by Chirp and
PostgreSQL. Chirp Forum includes password and passkey sign-in, durable sessions,
invitations, recovery codes, search, unread state, notifications, and practical
moderation without requiring Redis, email delivery, object storage, or a
frontend build system.

The template provisions one Chirp web service and one Railway-managed
PostgreSQL service. Railway supplies the private database URL, generates a
unique application signing key and first-owner bootstrap token for every
deployment, runs the application migrations, exposes public HTTP networking,
and checks `/ready` before routing traffic.

The application is server-rendered and progressively enhanced with HTMX. Its
durable state, login sessions, recovery codes, passkey credentials, invitations,
forum content, and moderation history all live in PostgreSQL. The single-site
starter does not need Redis because it does not depend on a shared cache, job
queue, or cross-worker realtime fan-out.

After deployment, open `/setup` and copy `FORUM_BOOTSTRAP_TOKEN` from the web
service variables to claim the first owner account. The token becomes inert as
soon as setup succeeds. Railway's generated domain works with passkeys; when
moving to a permanent custom domain, configure `FORUM_PUBLIC_ORIGIN` and
`FORUM_PASSKEY_RP_ID` before enrolling credentials there.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [lbliii/chirp-forum](https://github.com/lbliii/chirp-forum) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `FORUM_ENV` | web | production | Application runtime mode. Keep this set to production on Railway. |
| `DATABASE_URL` | web | - | Private PostgreSQL connection URL supplied by the Postgres service. |
| `FORUM_SECRET_KEY` | web | (secret) | Generated signing key for sessions and other security-sensitive application data. |
| `FORUM_BOOTSTRAP_TOKEN` | web | (secret) | One-time token used to claim the first forum owner account at /setup. |
| `RAILPACK_PYTHON_VERSION` | web | 3.14 | Python version used by Railpack to build and run Chirp Forum. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, HTML, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/chirp-forum)
