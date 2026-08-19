# Deploy Listmonk on Railway

Mailchimp alternative. Self-hosted newsletter and mailing list manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/listmonk-railway)

## About

Listmonk is a self-hosted newsletter and mailing list manager built as a single Go binary on PostgreSQL. It owns the lifecycle a hosted platform normally rents you: subscribers with arbitrary JSON attributes, opt-in lists, segmentation by raw SQL, campaign authoring, bounce processing, analytics, a public archive, and a REST API for all of it. Anyone whose Mailchimp bill scales with a list they already own ends up here — Listmonk's cost does not move when that list grows from five thousand people to half a million.

Self-host Listmonk on Railway and this template gives you the working shape rather than a bare container. Three services deploy together: **Listmonk** on a public URL with a volume for uploaded media, a managed **PostgreSQL** database holding subscribers, campaigns, settings and sessions, and **Mailpit** as the mail service Listmonk relays through privately. The source repository, [gridalpha/listmonk-railway](https://github.com/gridalpha/listmonk-railway), wraps the official `listmonk/listmonk` image with a boot script that installs the schema, gives Listmonk a scoped non-superuser database role, and writes the public URL into the settings table — Listmonk reads those rows *after* the environment, so otherwise every link it mails would point at `localhost`.

![Listmonk Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787074787/e64f0812-730b-4dfd-b832-39acf6c60523.png)

Listmonk splits the two halves hosted platforms sell as one: it manages *who* you send to and *what* you send, but does not run mail servers. Point it at a relay — SES, Postmark, Resend, Mailgun — and per-message cost becomes that relay's raw rate.

- **Segmentation by SQL** — any expression valid in a `WHERE` clause targets a campaign, including queries against subscriber JSON attributes.
- **Double opt-in with one-click unsubscribe** — confirmation flows, unsubscribe pages, `List-Unsubscribe` headers and blocklisting, on by default.
- **Bounce processing** — webhooks for SES, SendGrid and Postmark, or a POP3 mailbox, with thresholds that blocklist automatically.
- **Archive, API and roles** — publish campaigns to a browsable archive with RSS; per-list permissions, API tokens, optional OIDC, CSV import at scale.

PostgreSQL is the only durable store that matters — subscribers, campaigns, analytics, settings and sessions all live there, which is why a redeploy never signs you out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| listmonk | [gridalpha/listmonk-railway](https://github.com/gridalpha/listmonk-railway) | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | listmonk | Etc/UTC | Container timezone |
| `PORT` | listmonk | 9000 | HTTP listen port, health checked |
| `LISTMONK_SMTP_TLS` | listmonk | none | Relay TLS mode |
| `LISTMONK_db__host` | listmonk | - | Private Postgres hostname |
| `LISTMONK_db__port` | listmonk | 5432 | Postgres port |
| `LISTMONK_db__user` | listmonk | (secret) | Scoped role created at boot |
| `LISTMONK_SMTP_AUTH` | listmonk | none | Relay auth protocol |
| `LISTMONK_SMTP_HOST` | listmonk | - | Relay host seeded into settings |
| `LISTMONK_SMTP_PORT` | listmonk | 1025 | Relay port seeded into settings |
| `LISTMONK_ADMIN_USER` | listmonk | (secret) | Super admin username, min 3 chars |
| `LISTMONK_FROM_EMAIL` | listmonk | - | Default campaign sender |
| `LISTMONK_db__database` | listmonk | listmonk | Application database name |
| `LISTMONK_db__password` | listmonk | (secret) | Password for that scoped role |
| `LISTMONK_db__ssl_mode` | listmonk | require | Encrypt the database connection |
| `BOOTSTRAP_DATABASE_URL` | listmonk | - | Superuser URL, used at boot only |
| `LISTMONK_ADMIN_PASSWORD` | listmonk | (secret) | Super admin password, min 8 chars |
| `LISTMONK_SMTP_MAX_CONNS` | listmonk | 10 | Concurrent relay connections |
| `TZ` | mailpit | Etc/UTC | Container timezone |
| `PORT` | mailpit | 8025 | Web inbox port, health checked |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before pruning |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Web inbox bind address |
| `MP_SMTP_BIND_ADDR` | mailpit | 0.0.0.0:1025 | Private SMTP bind address |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/listmonk/uploads`
- **Healthcheck:** `/livez`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/listmonk-railway)
