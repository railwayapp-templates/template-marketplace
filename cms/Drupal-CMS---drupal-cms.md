# Deploy Drupal CMS on Railway

Pre-configured Drupal CMS + PostgreSQL, installs itself on deploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/drupal-cms)

## About

# Drupal on Railway

Production template to deploy **Drupal 11** on [Railway](https://railway.com) with one click: automatic installation, private PostgreSQL database, persistent files and built-in healthcheck. No web installer and no manual configuration — deploy and log in with your admin user.

&gt; **English quick summary:** One-click Drupal 11 on Railway — a pinned `drupal:11.4.5` Apache image + PostgreSQL 17.6. Auto-installs on first boot with generated admin credentials, persists uploads on a volume at `sites/default`, exposes `/healthz.php` for healthchecks, wires trusted hosts + reverse proxy. **Networking:** Apache listens on IPv4 and the service sets `PORT=80` so Railway routes correctly (avoids the classic 502). Docs below are now in English.

---

## Template overview (marketplace listing)

The long-form overview for the Railway marketplace listing. It keeps each required section, with none of the scaffold text.

### Deploy and Host Drupal with Railway

Drupal is a leading open-source content management system powering millions of websites, from personal blogs to enterprise platforms. This template deploys Drupal 11 with a private PostgreSQL 17 database on Railway in one click — fully installed, configured and ready to build your site on, with no setup wizard and nothing hardcoded.

### About Hosting Drupal

Hosting Drupal involves running its PHP application behind a web server, connecting it to a database, and persisting uploaded files across deployments. On Railway this template handles all of it automatically: the first boot waits for PostgreSQL, installs Drupal via Drush using generated admin credentials, mounts a volume for all uploads, and exposes a readiness endpoint (`/healthz.php`) so traffic only arrives once your site is truly usable. Updates are applied automatically on each redeploy.

### Why Deploy Drupal on Railway?

- **Zero-config, one click:** no install wizard, no manual variable setup — the entrypoint installs, configures and hardens the site on first boot using template secrets.
- **Persistent by default:** uploads and the database live on Railway Volumes, so your content survives every redeploy.
- **Private by design:** PostgreSQL stays on Railway's private network — the database is never exposed to the public internet.
- **Production-ready:** pinned versions (Drupal 11.4.5, PHP 8.4, PostgreSQL 17.6, Drush 13), trusted hosts, reverse-proxy wiring and a real healthcheck gating traffic.
- **Free-tier friendly:** sized to fit within Railway's hobby/free credits for small sites.

### Common Use Cases

- Corporate websites and marketing sites with structured content
- Blogs, magazines and news portals with editorial workflows
- Intranets and member portals with role-based access control
- E-commerce storefronts built on Drupal Commerce
- Government, education and NGO sites requiring accessibility and multilingual content

### Dependencies for Drupal Hosting

- **Apache + PHP 8.4** — serves Drupal from the official pinned image (`drupal:11.4.5`)
- **PostgreSQL 17** — primary data store, private-networked, never exposed publicly
- **Drush 13** — Drupal's CLI, used by the boot script to install and update the site
- **Railway Volumes** — persistent storage for uploads and database files
- **Railway Healthchecks** — readiness gating via `/healthz.php`

#### Deployment Dependencies

- [Drupal](https://www.drupal.org) (GPL-2.0+)
- [Official Drupal Docker image](https://hub.docker.com/_/drupal)
- [PostgreSQL Docker image](https://hub.docker.com/_/postgres)

---

## What's included

| Service | Image / source | Pinned version | Volumes |
|---|---|---|---|
| **Drupal** | This repo (`Dockerfile`, based on the official image) | `drupal:11.4.5-php8.4-apache-bookworm`, Drush `13.7.6` | `/opt/drupal/web/sites/default` |
| **Postgres** | Official image | `postgres:17.6-alpine` | `/var/lib/postgresql` |

The two services talk over Railway's **private network** (`postgres.railway.internal`); the database is never exposed to the internet.

## What happens on deploy

1. Railway starts Postgres and the Drupal container.
2. The entrypoint waits for Postgres to accept connections and generates `sites/default/settings.php` reading the credentials from environment variables (nothing hardcoded).
3. If the database is empty, it runs the full installation with Drush (~1 min): *standard* profile, admin user and generated password.
4. The `/healthz.php` healthcheck turns green only when the site is fully working, and Railway routes traffic.
5. On redeploys it runs `drush updatedb` + cache rebuild: uploads and content survive on the volume.

## Networking on Railway (important)

The official image exposes Apache on port **80**, but Railway routes traffic by the `PORT` variable (default **8080**), so you must set `PORT=80` or the proxy returns **502 connection refused**. In addition, Debian's `ports.conf` listens on `[::]:80` (IPv6-only in some environments) while Railway connects over IPv4; the `Dockerfile` copies `docker/ports.conf` with `Listen 0.0.0.0:80` to avoid it. If you get a 502, it's almost certainly one of these two causes; see [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md).

## After deployment

1. Wait for the **Drupal** service to turn green (the first boot installs the site, ~2 min).
2. Open your domain `.up.railway.app`.
3. Log in with user **admin** and the password from the **`DRUPAL_ADMIN_PASSWORD`** variable (Drupal service → *Variables* tab).
4. Change the password from your profile if you like and set the site email.
5. *(Optional)* Schedule external cron (e.g. cron-job.org) pointing to the `/cron/...` URL shown in the deploy logs.

## Variables

They are all preconfigured in the template — you don't need to create any. The **Drupal** service consumes the database over Railway's **private network**, referencing the **Postgres** service, so if you rename the Postgres service you only need to update the references.

| Variable (Drupal service) | Value / reference | Description |
|---|---|---|
| `PORT` | `80` | **Port Apache listens on**, the one Railway uses to route. Without it you get error 502. |
| `PGHOST` | `${{Postgres.RAILWAY_PRIVATE_DOMAIN}}` | Private `.railway.internal` host of Postgres |
| `PGPORT` | `5432` | Postgres port |
| `PGUSER` | `postgres` | Postgres superuser |
| `PGPASSWORD` | `${{Postgres.POSTGRES_PASSWORD}}` | Postgres password (generated) |
| `PGDATABASE` | `postgres` | Default database of the image |
| `DRUPAL_HASH_SALT` | generated (`secret`) | Drupal hash salt |
| `DRUPAL_CRON_KEY` | generated (`secret`) | Cron URL key |
| `DRUPAL_ADMIN_USER` | `admin` | Initial admin user |
| `DRUPAL_ADMIN_PASSWORD` | generated (`secret`) | Admin password — **see it in Variables** |
| `DRUPAL_ADMIN_MAIL` | `admin@example.com` | Admin email (change it) |
| `DRUPAL_SITE_NAME` | `My Drupal Site` | Site name |
| `DRUPAL_SITE_MAIL` | `admin@example.com` | Site sender email |
| `TRUSTED_HOSTS` | *(empty)* | Optional: extra trusted host patterns, comma-separated |
| `DRUPAL_ERROR_LEVEL` | `hide` | Set `verbose` to debug errors on screen |

&gt; **Note on references:** this template uses the official Postgres image as an *image-based* service. Unlike Railway's "managed" Postgres, that image does **not** expose `PGHOST`/`PGPORT`/`PGUSER`/`PGDATABASE` automatically; that's why `RAILWAY_PRIVATE_DOMAIN` and `POSTGRES_PASSWORD` are referenced and fixed values are assigned in the template itself. If you prefer managed Postgres, swap the service for Railway's and adjust the references to `${{Postgres.PGHOST}}` etc.

## Credentials

- **Drupal admin:** user `DRUPAL_ADMIN_USER` (default `admin`) and password `DRUPAL_ADMIN_PASSWORD` (generated per deploy; see Drupal service → *Variables*).
- **Database:** private network only (never exposed to the internet); the entrypoint resolves it from the `PG*` variables.
- Each deploy generates unique secrets (`DRUPAL_ADMIN_PASSWORD`, `DRUPAL_HASH_SALT`, `DRUPAL_CRON_KEY`, `POSTGRES_PASSWORD`) with `${{secret(...)}}` — nothing hardcoded.

## Estimated cost

With default sizes (512 MB RAM on Drupal, 1 GB volume): approximately **5–8 USD/month**, within the Hobby credit with a narrow margin. Tips to reduce it in [docs/COSTOS.md](docs/COSTOS.md).

## Local development

```bash
cp .env.example .env      # edit the password if you want
docker compose up --build
# open http://localhost:8080
```

## Repository structure

```
├── Dockerfile                  # final image (official drupal + drush + tuning)
├── railway.json                # Dockerfile builder + healthcheck
├── docker-compose.yml          # equivalent local stack
├── docker/                     # entrypoint, settings, healthz, ports, php, remoteip
└── docs/                       # ARQUITECTURA, COSTOS, TROUBLESHOOTING, PUBLICAR
```

## Troubleshooting

See [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md). Most common:

- **The first deploy takes a while**: the installation runs during the healthcheck (300 s timeout).
- **"The provided host name is not valid"**: add your domain to `TRUSTED_HOSTS`.
- **502 Bad Gateway**: almost always the routing; check `PORT=80` and the IPv4 bind (see [Networking](#networking-on-railway-important)).

## License

GPL-2.0-or-later, like Drupal. This repo only adds glue (entrypoint, settings, healthcheck) on top of the official [Drupal](https://www.drupal.org) image, whose brand and logo belong to the Drupal Association.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| drupal | [BURNI80/drupal-railway-template](https://github.com/BURNI80/drupal-railway-template) | Web service |
| PostgresDB | `postgres:17.6-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | drupal | 80 | PORT |
| `DRUPAL_CRON_KEY` | drupal | - | DRUPAL_CRON_KEY |
| `DRUPAL_HASH_SALT` | drupal | - | DRUPAL_HASH_SALT |
| `DRUPAL_SITE_MAIL` | drupal | - | DRUPAL_SITE_MAIL |
| `DRUPAL_SITE_NAME` | drupal | - | DRUPAL_SITE_NAME |
| `DRUPAL_ADMIN_MAIL` | drupal | - | DRUPAL_ADMIN_MAIL |
| `DRUPAL_ADMIN_USER` | drupal | (secret) | DRUPAL_ADMIN_USER |
| `DRUPAL_ADMIN_PASSWORD` | drupal | (secret) | DRUPAL_ADMIN_PASSWORD |
| `POSTGRES_PASSWORD` | PostgresDB | (secret) | POSTGRES_PASSWORD |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/drupal/web/sites/default`
- **Volume:** `/var/lib/postgresql`

**Category:** CMS · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/drupal-cms)
