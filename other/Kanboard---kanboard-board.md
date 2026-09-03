# Deploy Kanboard on Railway

Kanban board for tracking tasks across columns and swimlanes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kanboard-board)

## About

Kanboard is an open-source kanban board for visual project management, built around one idea: show the work, limit the work in progress, get out of the way. A board is a row of columns, a card is a task, and dragging cards between columns is the whole workflow. Teams use it as a lightweight alternative to Jira or Trello — swimlanes, subtasks, WIP limits, time tracking, automatic actions and a JSON-RPC API on that shape — and it stays fast: the interface is server-rendered PHP, not a JavaScript app.

Deploy Kanboard on Railway and three services arrive wired together. **kanboard** runs nginx, PHP-FPM and the job runner in one container, serves the board over HTTPS, and keeps attachments and plugins on a persistent volume. **Postgres** stores every project, task, comment and login session, so signing in survives a redeploy. **mailpit** is a private SMTP server with a protected inbox, so notification email and password resets work as soon as the deploy finishes. Only kanboard and that inbox are public.

![Kanboard, Postgres and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788398278/kanboard-architecture.png)

Most trackers make you model your process before you can use them. Kanboard assumes the board *is* the process, which suits a team that has outgrown a spreadsheet but will not administer Jira — and anyone needing the data on infrastructure they control.

Key features:

- Drag-and-drop boards with swimlanes and per-column work-in-progress limits
- Subtasks, comments, attachments, tags, categories and task colours
- Time tracking with estimated-versus-actual reporting per task and column
- Automatic actions — move a card, get an assignee set or a comment posted
- Analytics: task distribution, cumulative flow, burndown, lead and cycle time
- A JSON-RPC API, plugins, two-factor auth, project roles and LDAP

The app tier is one container deliberately: Kanboard's own production shape is a single PHP application plus an external database, and its background work — overdue notifications, daily statistics — is a cron job inside that container, not a separate worker tier.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| kanboard | [gridalpha/kanboard-railway](https://github.com/gridalpha/kanboard-railway) | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `PORT` | kanboard | 8080 | nginx listening port |
| `DB_NAME` | kanboard | kanboard | Database the app owns |
| `DB_PORT` | kanboard | 5432 | Database port |
| `DB_DRIVER` | kanboard | postgres | Database backend |
| `MAIL_FROM` | kanboard | - | From address on outgoing mail |
| `LOG_DRIVER` | kanboard | stderr | Application log destination |
| `DB_HOSTNAME` | kanboard | - | Private database host |
| `DB_PASSWORD` | kanboard | (secret) | Scoped role password, set at boot |
| `DB_USERNAME` | kanboard | (secret) | Scoped role the app connects as |
| `KANBOARD_URL` | kanboard | - | Absolute base URL, trailing slash required |
| `ADMIN_PASSWORD` | kanboard | (secret) | Administrator password, applied at boot |
| `ADMIN_USERNAME` | kanboard | (secret) | Administrator account to configure |
| `MAIL_SMTP_PORT` | kanboard | - | SMTP port |
| `MAIL_TRANSPORT` | kanboard | smtp | Send mail over SMTP |
| `SESSION_HANDLER` | kanboard | db | Sessions in Postgres, surviving redeploys |
| `PG_SUPERUSER_URL` | kanboard | - | Provisions the scoped role, then dropped |
| `PLUGIN_INSTALLER` | kanboard | true | Administrator-only plugin installer |
| `MAIL_SMTP_HOSTNAME` | kanboard | - | SMTP host |
| `TRUSTED_PROXY_NETWORKS` | kanboard | 100.64.0.0/10,fd00::/8 | Proxy ranges Kanboard trusts |
| `TZ` | mailpit | UTC | Timestamps in the inbox |
| `PORT` | mailpit | 8025 | Inbox web UI port |
| `SMTP_HOST` | mailpit | mailpit.railway.internal | Private SMTP hostname for Kanboard |
| `SMTP_PORT` | mailpit | 1025 | Private SMTP port for Kanboard |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Web UI listen address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listener, dual-stack for private callers |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipient cap per message |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/railway`
- **Healthcheck:** `/livez`
- **Volume:** `/data`

**Category:** Other · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/kanboard-board)
