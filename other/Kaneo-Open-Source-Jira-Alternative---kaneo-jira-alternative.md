# Deploy Kaneo | Open Source Jira Alternative on Railway

Self-hosted Kaneo with Postgres, object storage and a pinned version

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kaneo-jira-alternative)

## About

Kaneo is an open source project management tool — boards, tasks, comments, time tracking and integrations — for teams that want Jira or Linear without the per-seat bill or the hosted account. This template runs Kaneo v2 on Railway with its database, its file storage and its URLs already wired together.

Kaneo v2 ships as a single container that runs its API and serves its web client from one origin, so there is no reverse proxy to configure and no CORS to reason about. The template pairs it with a PostgreSQL instance on a persistent volume and a Railway object storage bucket, and sets every variable the two need to find each other over the private network. Nothing is built from source: both images come from upstream, pinned to an exact version.

Four decisions in here are worth knowing about, because they are the difference between this template and a plain `docker run`.

**The version is pinned.** Kaneo publishes releases almost daily, and a template that deploys `latest` hands you a different application every time you redeploy — including schema migrations you did not ask for, at a moment you did not choose. This template pins `ghcr.io/usekaneo/kaneo:2.23.2`. Upgrading is deliberate: change the tag, redeploy, and the migrations run once on boot.

**Sessions survive a redeploy.** Kaneo's entrypoint generates a throwaway signing secret when `AUTH_SECRET` is empty and warns that sessions will not outlive a restart. The template generates the secret once, at deploy time, and keeps it — so a redeploy does not log your whole team out.

**The recorded client IP is real, and cannot be forged.** Kaneo reads `CF-Connecting-IP` before anything else when deciding who a request came from. Railway rewrites `X-Forwarded-For` at its edge but passes `CF-Connecting-IP` through as the caller sent it, so on a stock deployment any client can dictate the address stored on their session — and rotate it to work around Kaneo's per-IP sign-in rate limiting. The template strips that header in the bundled nginx config before the API ever sees it, and extends `TRUSTED_PROXIES` with Railway's edge range (`100.64.0.0/10`) so the address that gets recorded is the visitor's own rather than the Railway point of presence. Both were verified on a live deployment: a request forging either header is still logged from its true address.

**Guest sign-in is off.** Kaneo enables anonymous guest accounts by default, which is a sensible default for a demo and a poor one for an instance sitting on a public URL. It ships disabled here, and is one variable to turn back on.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:18.6-alpine` | Database |
| Kaneo | `ghcr.io/usekaneo/kaneo:2.23.2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | kaneo | Name of the database Kaneo uses. |
| `POSTGRES_USER` | Postgres | (secret) | Postgres role Kaneo connects as. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated once at deploy. Alphanumeric on purpose — DATABASE_URL embeds it in a connection string, where a generated / or @ would break parsing. |
| `PORT` | Kaneo | 5173 | Port Railway routes traffic and healthchecks to. nginx inside the image has `listen 5173` hard-coded and never reads $PORT, so this must stay 5173. |
| `S3_BUCKET` | Kaneo | - | Bucket holding images pasted into task descriptions and comments. |
| `S3_REGION` | Kaneo | - | Region used to sign storage requests. |
| `AUTH_SECRET` | Kaneo | (secret) | Signs session cookies. Generated once and then fixed — leave it empty and Kaneo's entrypoint mints a new random secret on every start, which logs every user out on every redeploy. |
| `S3_ENDPOINT` | Kaneo | - | Railway object storage endpoint for the attached bucket. |
| `DATABASE_URL` | Kaneo | - | Connection to the bundled Postgres over Railway's private network. Kaneo's client does not require TLS here. |
| `TRUSTED_PROXIES` | Kaneo | 100.64.0.0/10, 127.0.0.0/8, ::1/128, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 | Kaneo's default trust list does not cover Railway's edge (100.64.0.0/10), so it stops walking X-Forwarded-For at the edge and records that as every visitor's address — collapsing per-IP sign-in rate limiting into one bucket. This adds the range so the real client IP is used. |
| `KANEO_CLIENT_URL` | Kaneo | - | Public URL of this instance. Kaneo derives its API URL as this value plus /api; change it if you put Kaneo on a custom domain. |
| `S3_ACCESS_KEY_ID` | Kaneo | - | Access key for the attached bucket. |
| `NGINX_HEADER_PATCH` | Kaneo | s|proxy_set_header Host $host;|proxy_set_header Host $host;\n        proxy_set_header CF-Connecting-IP "";|g | Applied to the bundled nginx config at start-up. Railway rewrites X-Forwarded-For but passes CF-Connecting-IP through untouched, and Kaneo reads that header first — so without this a caller can dictate the IP recorded on their session and rotate it to sidestep sign-in rate limiting. Empty this variable to disable the patch. |
| `S3_FORCE_PATH_STYLE` | Kaneo | true | Must stay true. The browser uploads straight to the bucket with a presigned URL, and Railway object storage only returns CORS headers on the path-style endpoint. |
| `DISABLE_GUEST_ACCESS` | Kaneo | true | Blocks anonymous guest sign-in, which Kaneo enables by default. Set to false only if you want a public demo where any visitor gets a throwaway account. |
| `DISABLE_REGISTRATION` | Kaneo | false | Leave false to create your first account, then set it to true so the instance stops accepting public sign-ups. Existing workspace invitations keep working either way. |
| `S3_SECRET_ACCESS_KEY` | Kaneo | (secret) | Secret key for the attached bucket. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'sed -i "$NGINX_HEADER_PATCH" /etc/nginx/conf.d/default.conf && exec /usr/local/bin/kaneo-entrypoint.sh'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/kaneo-jira-alternative)
