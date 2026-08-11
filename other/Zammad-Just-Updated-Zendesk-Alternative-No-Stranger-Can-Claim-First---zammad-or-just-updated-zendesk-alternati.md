# Deploy Zammad | (Just Updated) Zendesk Alternative No Stranger Can Claim First on Railway

Zendesk alternative whose admin is seeded before a stranger can claim it

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zammad-or-just-updated-zendesk-alternati)

## About

Zammad is an open-source help desk and ticketing system — a self-hosted alternative to Zendesk and
Freshdesk. Email, web forms and chat land in one shared inbox, become assignable tickets, and get
routed, escalated and answered with SLAs, triggers, automations, a knowledge base and reporting.
It ships importers for Zendesk, Freshdesk, Kayako and OTRS, so moving an existing help desk across
is a supported path rather than a copy-paste job.

This deployment differs from a stock Zammad install in two ways that matter on a public URL.

**The administrator account is created before anything binds a port.** On a fresh Zammad instance
`POST /api/v1/users` is served unauthenticated: `UsersController#create` falls through to
`create_admin`, and `Service::User::AddFirstAdmin` only refuses once an admin already exists. So on
a stock deploy the first stranger to reach the URL becomes Admin and Agent on your help desk, and
the deployer is locked out of their own setup wizard. Measured on the stock image: two anonymous
requests returned `201 {"message":"ok"}`, then `roles=Admin,Agent` and a working login. Here the
admin is seeded from `ZAMMAD_ADMIN_PASSWORD` during database init, so the first request the public
port ever serves is against a configured system — the same call returns `422 This system has
already been configured`. The container refuses to boot on an empty password, and the password is
re-seeded on every deploy, so rotating it is a redeploy rather than an impossibility.

**Four Zammad roles run in one container, not seven billed services.** The rails server, websocket
server, background worker and nginx are the same image and share no volume — attachments live in
Postgres — so this template is three services: Zammad, Postgres and Redis. Rails uses Zammad's own
file cache store instead of a separate memcached, and Elasticsearch is off in favour of the
built-in database search.

The Railway domain is also written into Zammad's `fqdn` and `http_type` settings at boot, so
notification mail, password-reset links and callbacks point at the real instance instead of
`zammad.example.com` — normally a manual post-deploy step in the admin UI.

Zammad is a Ruby on Rails application backed by PostgreSQL, with Redis behind the websocket session
store that drives its real-time interface. First boot runs database creation, migrations and seeds
before any process listens, which takes several minutes; later deploys run migrations only. There
is no HTTP healthcheck on purpose — Railway's default healthcheck window is shorter than that first
migration, and killing a Rails migration mid-flight is how a half-created schema happens.

nginx honours Railway's injected `$PORT`, and its resolver is written from the container's
`/etc/resolv.conf` with IPv6 brackets, because Railway's private network is IPv6-only and the stock
Zammad nginx config declares no resolver at all. Postgres keeps a volume mounted at the parent of
its data directory. The upstream image is pinned by digest, since Zammad's migrations run forward
only and an unrequested upgrade on redeploy is not a feature.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-alpine` | Database |
| zammad | `ghcr.io/bon5co/zammad-railway:7.1.2` | Web service |
| redis | `redis:7.4-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `ZAMMAD_ADMIN_PASSWORD` | zammad | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/zammad-or-just-updated-zendesk-alternati)
