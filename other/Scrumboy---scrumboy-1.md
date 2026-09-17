# Deploy Scrumboy on Railway

Self-hosted project management with boards, analytics and MCP automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/scrumboy-1)

## About

[Scrumboy](https://github.com/markrai/scrumboy) is self-hosted project management: customizable
project boards, cross-project workload and flow analytics, calendar-aware planning, a sticky-note
wall, portable imports and backups, email notifications, and an MCP layer so coding agents can read
and update the same boards you do.

This template runs it on Railway with its database on a volume, behind an Owner account that is
created before the public port ever opens. One service, one volume, a public domain, and nothing to
fill in on the deploy form.

Scrumboy is one static Go binary with SQLite underneath, so there is no database container, no
cache, and no second service. Everything it owns lives in one directory: the database and its
write-ahead log, uploaded wallpapers, and the encryption key. Putting a volume at `/data` is the
whole persistence story. The deployed image is about 44 MB and answers its first health check
roughly two seconds after the container starts.

The part this template takes seriously is the Owner account. Scrumboy's Owner is whoever creates the
first user on an empty instance, and upstream is explicit that nobody can be promoted to Owner
afterwards. Until that first account exists the API answers anonymous callers, including writes. On
a public URL that means the instance belongs to whoever finds it first. So the container creates the
Owner against a listener bound to loopback only, stops it, and then opens the public port — and it
refuses to start at all if no password was supplied to create that account with.

Everything else is optional and off by default. Email, single sign-on, web push, Markdown and
Mermaid notes each switch on when you add their variables, and the app runs perfectly well without
any of them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| scrumboy | [RockinPaul/scrumboy_railway_template](https://github.com/RockinPaul/scrumboy_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | The port Railway's healthcheck probes and the public domain targets. Leave as is. |
| `SCRUMBOY_OWNER_EMAIL` | admin@example.com | Sign-in address for the Owner account. It is only an identifier; change it here if you prefer a different one. |
| `SCRUMBOY_OWNER_PASSWORD` | (secret) | Password for the Owner account, created before the public port opens. Read it from this service's variables after deploying. |
| `SCRUMBOY_PUBLIC_BASE_URL` | - | Canonical public origin, used for password-reset links and OAuth discovery. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/scrumboy-1)
