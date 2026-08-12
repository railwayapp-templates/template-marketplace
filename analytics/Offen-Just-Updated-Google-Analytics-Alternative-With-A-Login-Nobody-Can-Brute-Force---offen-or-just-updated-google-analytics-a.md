# Deploy Offen | (Just Updated) Google Analytics Alternative With A Login Nobody Can Brute-Force on Railway

Privacy-first analytics your visitors control, with brute-force protection

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/offen-or-just-updated-google-analytics-a)

## About

Offen Fair Web Analytics is a self-hosted, radically privacy-first alternative to Google
Analytics. Collection is strictly opt-in, usage data is end-to-end encrypted in the visitor's
browser before it is sent, no IP addresses or User-Agent strings are ever stored, and every
tracked visitor can open an "Auditorium" to read, export or delete the data collected about
them. This template deploys Offen v1.4.2 with PostgreSQL, an operator account seeded before
the server accepts its first request, and — unlike every other Offen template on Railway —
Offen's own brute-force throttle left switched on.

Offen is a single Go binary that serves three things at once: the operator console where you
read your traffic, the consent tool your visitors answer, and the Auditorium where they
inspect their own data. It keeps everything in PostgreSQL, so the application service itself
is stateless and the database is the only thing to back up.

Two Railway-specific details decide whether the deployment is sound, and both are handled
here.

**The login throttle stays on.** Offen replaces its rate limiter with a no-op whenever
`OFFEN_SERVER_REVERSEPROXY` is set, and that limiter is the only brute-force protection in
the product — it guards login, password reset, password change, invitations and the
user-secret exchange. The flag is tempting on Railway because Railway terminates TLS at its
edge, but Offen's throttle keys on the submitted username and on a global bucket rather than
on the client address, so it behaves correctly behind a proxy and the flag buys nothing.
Measured on identical instances, fifteen wrong-password login attempts complete in 0.30
seconds with the flag set and 7.63 seconds without it. This template leaves it off, and the
entrypoint unsets it even if the environment carries it.

**The operator account exists before the URL does.** The first operator is seeded from the
generated `OFFEN_ADMIN_PASSWORD` during startup, before the server binds a port, and the
container refuses to boot on an empty password rather than coming up in a half-configured
state. Migrations run first, with a retry loop so a cold PostgreSQL never fails the deploy.

The deploy form asks for nothing. Every value — the database URL, the base64 application
secret, the operator email and the operator password — is generated or wired for you, so
there is no required field left blank and nothing to look up before clicking deploy.

Typical cost is about **$5/month** on Railway for the Go service and PostgreSQL. Offen is
free and open source under Apache-2.0.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.6-alpine` | Database |
| offen | `ghcr.io/bon5co/offen-railway:1.4.2` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `OFFEN_SECRET` | offen | (secret) |
| `OFFEN_ADMIN_PASSWORD` | offen | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/offen-or-just-updated-google-analytics-a)
