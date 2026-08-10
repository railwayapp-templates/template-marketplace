# Deploy Postiz | (Just Updated) Buffer Alternative, Admin Seeded and API Actually Works on Railway

Self-hosted social scheduler. Admin seeded, API works, media persists

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-or-just-updated-buffer-alternativ)

## About

Postiz is an open-source social media scheduling tool — a self-hosted Buffer / Hootsuite
alternative. One calendar for ~20 platforms (X, LinkedIn, Instagram, Threads, TikTok, YouTube,
Bluesky, Mastodon, Reddit, Discord, Slack, Telegram and more), an AI copilot for drafting, a media
library, analytics, a team workspace and a public API.

This template deploys Postiz **v2.23.0** with its whole Temporal stack wired up, an admin account
that already exists when the URL goes live, and the Railway-specific defects that break the other
listings in this category already fixed. Every claim below was reproduced against the upstream
image before this template was published.

**The API works.** Postiz's own nginx has a hardcoded `listen 5000;` and no templating; its
backend binds `process.env.PORT || 3000`. Railway injects `PORT`, so on a stock deploy the backend
takes the edge port and nginx is unreachable. Measured on v2.23.0 with `PORT=8080`:

```
GET /                          -&gt; 200  App is running!     &lt;- the backend, not the app UI
GET /api/                      -&gt; 404  Cannot GET /api/
GET /uploads/            -&gt; 404  Cannot GET /uploads/…
```

The instance is green, the healthcheck passes, and there is no product. This template's image
rewrites nginx's listener to the injected port at boot and pins the backend back to 3000, then
health-checks `/api/` — with the trailing slash, because `location /api/` does not match `/api`.

**Nobody else can claim your instance.** Postiz's `canRegister()` returns true for every caller
until an organization exists, so a fresh deploy is claimable by whoever loads the URL first —
anonymous `POST /api/auth/register` returns `200` with an auto-activated account. This template
generates an admin password, seeds the organization and its SUPERADMIN through Postiz's own
registration handler on loopback **while nginx is still down**, verifies the login, and only then
opens the port. On the live deploy:

```
[railway-entrypoint] seeded organization 'My Workspace' with SUPERADMIN admin@postiz.local
[railway-entrypoint] verified: admin@postiz.local can log in with the current POSTIZ_ADMIN_PASSWORD
[railway-entrypoint] registration open to the public: {"register":false}

POST /api/auth/register (anonymous)  -&gt; 400 Registration is disabled
POST /api/auth/login (admin)         -&gt; 200 {"login":true}
```

Log in with `POSTIZ_ADMIN_EMAIL` (default `admin@postiz.local`) and the generated
`POSTIZ_ADMIN_PASSWORD`, both in the service's variables.

**Brute force gets throttled.** Postiz applies no rate limit to its auth routes: 20 wrong
passwords answer `400` twenty times. This deployment answers `400 x4` then `429 x16` on the same
burst, keyed on the real client address (the first entry of `X-Forwarded-For`, because Railway's
edge hop rotates per request).

**Your media survives a redeploy.** Uploads live on a volume at `/uploads`, and nginx serves them
from there. Verified end to end on this template: an image uploaded through the app was still
served with the same bytes after a full redeploy.

**No unauthenticated Temporal console.** Postiz 2.x schedules through Temporal, and Temporal's web
UI has no authentication of its own. Other listings publish it on a public domain, which exposes
every workflow — scheduled post bodies and connected accounts included — to anyone with the URL.
This template simply does not ship it; scheduling does not need it.

Also: every image is pinned (Postiz `v2.23.0` by digest, Temporal `1.28.1`, Elasticsearch
`7.17.27`), because Postiz runs `prisma db push --accept-data-loss` on every boot and a floating
tag makes each redeploy an unrequested schema change. Elasticsearch's JVM heap is sized from the
container's cgroup limit instead of a fixed `-Xmx512m`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-trixie` | Database |
| elasticsearch | `ghcr.io/bon5co/postiz-railway-elasticsearch:7.17.27` | Database |
| redis | `redis:8.2.1` | Database |
| postiz | `ghcr.io/bon5co/postiz-railway:2.23.0` | Web service |
| temporaldb | `postgres:17.10-trixie` | Database |
| temporal | `ghcr.io/bon5co/postiz-railway-temporal:1.28.1` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `JWT_SECRET` | postiz | (secret) |
| `POSTIZ_ADMIN_PASSWORD` | postiz | (secret) |
| `POSTGRES_PASSWORD` | temporaldb | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Volume:** `/usr/share/elasticsearch/data`
- **Start command:** `/bin/sh -c 'rm -rf /data/lost+found && chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Healthcheck:** `/api/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/uploads`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/postiz-or-just-updated-buffer-alternativ)
