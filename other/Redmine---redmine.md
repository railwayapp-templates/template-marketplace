# Deploy Redmine on Railway

Project management and issue tracker with wikis, Gantt and time logs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redmine)

## About

Redmine is the open-source project management and issue tracking application teams have been running since 2006. Every project gets its own issue tracker, wiki, forum, document store, calendar, Gantt chart and time log, behind a role-based permission system fine-grained enough to run engineering, support and client-facing projects side by side in one installation. It is a plain Ruby on Rails app on a SQL database, so teams that self-host Redmine keep their issue history, attachments and audit trail on their own infrastructure.

This template lets you deploy Redmine on Railway with the pieces a real installation needs already wired together. The `redmine` service runs the Rails app behind Railway's HTTPS edge, `Postgres` stores every project, issue and permission, and `mailpit` gives it a private-network SMTP endpoint plus a browser inbox, so notification email works as soon as the deploy finishes. Attachments, plugins and themes live on a volume at `/data`. On first boot the app migrates the database, loads Redmine's default trackers, roles and statuses, sets the administrator password from a generated variable and points itself at its public domain — no setup wizard, and no `admin`/`admin` window to close.

![Redmine, Postgres and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788401741/redmine-architecture.png)

Redmine tracks many kinds of work across many projects at once. Trackers let one project hold bugs, features and support requests under different workflows; custom fields extend issues, projects and time entries without a schema change; and a permission matrix maps roles onto modules per project, so a client sees their own project and nothing else. Teams self-host it when data residency, per-seat cost or years of history rule out a hosted tracker.

Key features:

- Projects and subprojects with per-project modules and permissions
- Configurable trackers, statuses, workflows, priorities and custom fields
- Gantt charts, calendar, roadmap and version milestones
- Time tracking, per-project wiki, forums, documents and full-text search
- Repository browser for Git, Subversion, Mercurial and Bazaar
- REST API, OAuth2, webhooks, TOTP two-factor auth, CSV import, LDAP

The architecture is three services. `redmine` is the Rails app and the only one serving users; its volume holds attachments, plugins and themes. `Postgres` is the system of record and stays private. `mailpit` accepts SMTP privately and captures what Redmine sends, so notifications are testable straight away — swap its address for your provider's when you go live.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| redmine | [gridalpha/redmine-railway](https://github.com/gridalpha/redmine-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | mailpit | UTC | Timestamp timezone |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth guarding the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the web inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipient cap per message |
| `PORT` | redmine | 3000 | HTTP port Puma listens on |
| `REDMINE_LANG` | redmine | en | Language of the seeded default data |
| `REDMINE_DB_PORT` | redmine | - | Database port |
| `SECRET_KEY_BASE` | redmine | (secret) | Rails session cookie signing key |
| `WEB_CONCURRENCY` | redmine | 2 | Puma worker processes |
| `RAILS_MAX_THREADS` | redmine | 5 | Puma threads per worker |
| `REDMINE_FORCE_SSL` | redmine | true | HSTS and Secure session cookies |
| `REDMINE_SMTP_PORT` | redmine | 1025 | SMTP port |
| `REDMINE_EMAIL_FROM` | redmine | - | From address on outgoing mail |
| `REDMINE_ADMIN_EMAIL` | redmine | - | Administrator email address |
| `REDMINE_ADMIN_LOGIN` | redmine | (secret) | Administrator login |
| `REDMINE_DB_DATABASE` | redmine | - | Database name |
| `REDMINE_DB_ENCODING` | redmine | utf8 | Client encoding |
| `REDMINE_DB_PASSWORD` | redmine | (secret) | Database password |
| `REDMINE_DB_POSTGRES` | redmine | - | Database host |
| `REDMINE_DB_USERNAME` | redmine | (secret) | Database user |
| `REDMINE_SMTP_ADDRESS` | redmine | - | SMTP host |
| `REDMINE_SMTP_STARTTLS` | redmine | false | STARTTLS, true for port 587 |
| `REDMINE_ADMIN_PASSWORD` | redmine | (secret) | Administrator password, applied at boot |
| `REDMINE_LOGIN_REQUIRED` | redmine | (secret) | Require sign-in for every page |
| `REDMINE_PLUGINS_MIGRATE` | redmine | 1 | Migrate plugins found on the volume |
| `REDMINE_REST_API_ENABLED` | redmine | 1 | Enable the REST API and API keys |
| `REDMINE_SELF_REGISTRATION` | redmine | 0 | 0 off, 1 auto, 2 email, 3 manual |
| `REDMINE_ATTACHMENT_MAX_SIZE` | redmine | 51200 | Maximum attachment size in kilobytes |
| `REDMINE_DATABASE_CIPHER_KEY` | redmine | - | Encrypts SCM/LDAP passwords and 2FA secrets |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/login`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Ruby, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/redmine)
