# Deploy Directus + Nextjs Visual Editor on Railway

Directus CMS with Next.js for modern content management.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/directus-nextjs-visual-editor)

## About

Directus is an open-source headless CMS and data platform. This stack pairs it with a Next.js site wired for the **Directus Visual Editor**, so editors can browse the live site inside Directus Studio and click-to-edit structured content. Railway runs the API, database, cache, and frontend together with sensible defaults and minimal setup.

Hosting this template means running **Directus** (API + Admin/Studio), **Next.js** (public site with Visual Editing enabled), **PostgreSQL** for persistence, and **Redis** for caching and realtime-friendly workloads. You wire public URLs and secrets so Directus and Next.js trust each other: CORS, Content Security Policy frame rules, and a server-side token let the Visual Editor iframe load your site safely. On Railway, each piece is a service with auto-generated domains and shared variables, so you avoid hand-tuning ports and reverse proxies. First boot typically seeds an admin user and points Studio at your Next.js URL so the Visual Editor module works out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| Nextjs | [enamic-software/directus-nextjs](https://github.com/enamic-software/directus-nextjs) (root: nextjs) | Web service |
| Directus | [enamic-software/directus-nextjs](https://github.com/enamic-software/directus-nextjs) (root: directus) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | The name of the default PostgreSQL database. |
| `DATABASE_URL` | Postgres | - | 	 Primary PostgreSQL connection URL (credentials + host + port + database) for apps running on Railway’s private network. |
| `POSTGRES_USER` | Postgres | (secret) | Default PostgreSQL database superuser account name created for this instance. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for the PostgreSQL superuser (POSTGRES_USER); treat as a secret. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Primary PostgreSQL connection URL (credentials + host + port + database) for apps running on Railway’s private network. |
| `REDISHOST` | Redis | - | Hostname of the Redis instance on Railway’s private network. |
| `REDISPORT` | Redis | 6379 | TCP port the Redis server listens on (often 6379). |
| `REDISUSER` | Redis | default | Redis ACL username (if your Redis template enables ACLs); may be unused depending on image/plan. |
| `REDIS_URL` | Redis | - | Full Redis connection URL (scheme, host, port, auth) for private-network clients on Railway. |
| `REDISPASSWORD` | Redis | (secret) | Redis password used by clients that connect with host/port + password (non-URL form). |
| `REDIS_PASSWORD` | Redis | (secret) | Same role as REDISPASSWORD: secret credential for Redis authentication; name varies by template. |
| `REDIS_PUBLIC_URL` | Redis | - | Publicly routable Redis URL for external tools or local dev when a public endpoint is enabled. |
| `NEXT_PUBLIC_SITE_URL` | Nextjs | - | Canonical public base URL of the Next.js site (scheme + host); exposed to the browser for links, redirects, and absolute URLs. |
| `DIRECTUS_SERVER_TOKEN` | Nextjs | (secret) | Static Directus access token used only on the server (SSR/API routes) for privileged reads/writes; never expose to the client. |
| `NEXT_PUBLIC_DIRECTUS_URL` | Nextjs | - | Public base URL of the Directus API as seen from the browser; used by client-side fetches and asset URLs. |
| `REDIS` | Directus | - | Redis connection string or URL Directus uses for caching, rate limiting, or pub/sub (depends on your Directus config). |
| `SECRET` | Directus | (secret) | Signing secret for Directus sessions and JWTs; must be long and random; changing it invalidates existing tokens. |
| `PUBLIC_URL` | Directus | - | Public base URL where Directus is reachable (used in emails, webhooks, OAuth callbacks, and absolute asset links). |
| `ADMIN_EMAIL` | Directus | - | The email address for the Directus admin account. |
| `ADMIN_TOKEN` | Directus | (secret) | Static Directus admin (or high-privilege) access token used for automation, migrations, or server-side admin API calls; treat as a secret. |
| `CORS_ORIGIN` | Directus | - | Comma-separated list of allowed browser origins for Directus CORS (e.g. your Next.js public URL and local dev URLs). |
| `ADMIN_PASSWORD` | Directus | (secret) | The password for the Directus admin account. |
| `DB_CONNECTION_STRING` | Directus | - | PostgreSQL connection string Directus uses for its metadata and content database. |
| `NEXT_PUBLIC_SITE_URL` | Directus | - | Public base URL of the front-end site (often mirrored from the Next.js app) so Directus can generate correct absolute links in emails, redirects, or integrations. |
| `CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC` | Directus | - | JSON/string of Content-Security-Policy directives merged into Directus responses; tighten or relax CSP for assets, APIs, and embeds. |
| `CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_ANCESTORS` | Directus | - | Overrides one CSP directive (e.g. connect-src, img-src) for Directus; value is typically a space-separated source list. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/server/health`

**Category:** CMS · **Languages:** TypeScript, Shell, JavaScript, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/directus-nextjs-visual-editor)
