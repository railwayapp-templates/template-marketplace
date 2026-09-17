# Deploy Wakapi on Railway

Track coding time per project, language & editor w/ WakaTime-compatible API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wakapi)

## About

Wakapi is a self-hosted backend for coding statistics. Editor plugins send small "heartbeat" events as you type, and Wakapi turns them into dashboards of how long you spent in each project, language, editor, branch and operating system. It speaks the WakaTime API, so the official plugins for VS Code, JetBrains IDEs, Neovim and dozens more work against it unchanged — you change one URL in `~/.wakatime.cfg`. Developers and privacy-minded teams self-host Wakapi to answer "where did the week go?" without shipping file paths and project names to a third party.

This template runs three services. **wakapi** is the Go application and the only one you visit; **Postgres** stores every heartbeat, summary and user; **mailpit** is a private SMTP server catching the mail Wakapi sends, so password resets and weekly reports work the moment the deploy finishes. Heartbeats arrive over HTTPS at the public wakapi domain, are written to Postgres over Railway's private network, and are rolled into daily summaries by jobs inside the app. Nothing leaves your project. An administrator account is created during the first boot, before the app is reachable from the internet, so no stranger can claim it.

![Diagram of the Wakapi, Postgres and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789585476/wakapi-architecture.webp)

Wakapi records what you worked on and for how long, and gives you charts instead of guesses. Because it implements the WakaTime API rather than inventing its own, it inherits an enormous plugin ecosystem for free. Teams self-host it when file and repository names count as sensitive, or when a per-developer subscription is hard to justify.

Key features:

- WakaTime-compatible API, so official editor plugins work with a one-line config change
- Dashboards by project, language, editor, operating system, machine, branch and label
- Per-project views, a daily timeline, and an hourly breakdown of your coding day
- README badges, a Shields.io-compatible endpoint, and a full REST API
- Leaderboards, weekly e-mail reports, project aliases, language mappings and invite codes

The architecture is small. **wakapi** holds the whole application — HTTP server, aggregation jobs, report scheduler and API — in one Go binary. **Postgres** is the system of record, and **mailpit** accepts SMTP on the private network only, its inbox behind basic auth.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wakapi | [gridalpha/wakapi-railway](https://github.com/gridalpha/wakapi-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | wakapi | 3000 | HTTP port Railway probes and routes |
| `WAKAPI_DB_SSL` | wakapi | false | Private network, no TLS needed |
| `WAKAPI_DB_HOST` | wakapi | - | Private Postgres hostname |
| `WAKAPI_DB_NAME` | wakapi | - | Postgres database name |
| `WAKAPI_DB_PORT` | wakapi | - | Postgres port |
| `WAKAPI_DB_TYPE` | wakapi | postgres | Database dialect |
| `WAKAPI_DB_USER` | wakapi | (secret) | Postgres role |
| `WAKAPI_COOKIE_KEY` | wakapi | - | Base64 session signing key |
| `WAKAPI_PUBLIC_URL` | wakapi | - | Public base URL, must be a domain |
| `WAKAPI_ADMIN_EMAIL` | wakapi | - | Optional admin e-mail, needs a real MX record |
| `WAKAPI_DB_PASSWORD` | wakapi | (secret) | Postgres password |
| `WAKAPI_MAIL_SENDER` | wakapi | Wakapi <wakapi@example.org> | Envelope sender address |
| `WAKAPI_ALLOW_SIGNUP` | wakapi | false | Public registration closed by default |
| `WAKAPI_INVITE_CODES` | wakapi | true | Admin can invite users instead |
| `WAKAPI_MAIL_ENABLED` | wakapi | true | Password resets and weekly reports |
| `WAKAPI_MAIL_SMTP_TLS` | wakapi | false | Plain SMTP on the private network |
| `WAKAPI_PASSWORD_SALT` | wakapi | (secret) | Password hashing salt, keep stable |
| `WAKAPI_ADMIN_PASSWORD` | wakapi | (secret) | First administrator password |
| `WAKAPI_ADMIN_USERNAME` | wakapi | (secret) | First administrator, seeded at boot |
| `WAKAPI_MAIL_SMTP_HOST` | wakapi | - | Private SMTP hostname |
| `WAKAPI_MAIL_SMTP_PORT` | wakapi | 1025 | Mailpit SMTP port |
| `WAKAPI_INSECURE_COOKIES` | wakapi | false | Keep the Secure cookie flag |
| `WAKAPI_MAX_INACTIVE_MONTHS` | wakapi | -1 | Never delete idle accounts |
| `WAKAPI_TRUST_REVERSE_PROXY_IPS` | wakapi | 152.233.0.0/17,100.64.0.0/10,fd00::/8 | Railway edge ranges |
| `WAKAPI_LEADERBOARD_REQUIRE_AUTH` | wakapi | true | Leaderboard not public |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | mailpit | 8025 | Web inbox port Railway probes and routes |
| `MP_UI_AUTH` | mailpit | - | Basic auth guarding the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Web inbox listen address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | IPv6 SMTP listener for private peers |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/livez`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/wakapi)
