# Deploy Rustrak | Sentry-Compatible Error Tracking in One Small Container on Railway

Sentry-SDK error tracking, logs and traces in one ~60 MB Rust process

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustrak)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/rustrak?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=rustrak)

[Rustrak](https://github.com/rustrak/rustrak) is a self-hosted error tracker that speaks the Sentry protocol. The Sentry SDK already in your app works with it: change the DSN and your errors, stack traces, logs, transactions and release health go to your own server instead of sentry.io. It's a single Rust process with SQLite and a built-in dashboard, so there's no Postgres, Redis, Kafka or ClickHouse to run.

It's one service and a Railway volume.

- **Admin from the first boot.** You enter your email when you deploy, and the admin account is created on first boot with a generated password. Sign-up is invite-only, so nobody else can register.
- **DSNs that work.** `PUBLIC_URL` is set to your Railway domain, so the DSN each project shows in the dashboard is ready to paste.
- **Private-network ingest.** Rustrak listens on IPv6 too, so apps in the same Railway project can send their errors over the private network.
- **Survives redeploys.** The SQLite database and uploaded source maps live on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Rustrak | `rustrak/rustrak-server:v0.16.3` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | :: | Listen on IPv6 and IPv4 so other services can report over the private network |
| `PORT` | 8080 | Port Railway routes to - leave as is |
| `SSL_PROXY` | true | Railway serves HTTPS, so login cookies are marked secure |
| `PUBLIC_URL` | - | Address the DSNs point at - set it to your custom domain after adding one |
| `CREATE_SUPERUSER` | - | Creates the admin on first boot - leave as is |
| `SESSION_SECRET_KEY` | (secret) | Signs and encrypts login cookies (64+ characters) |
| `RUSTRAK_ADMIN_EMAIL` | - | Email you sign in with - the admin account is created on first boot |
| `RUSTRAK_ADMIN_PASSWORD` | (secret) | Admin password, used on first boot only - change it later in the dashboard |

## Configuration

- **Healthcheck:** `/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/rustrak)
