# Deploy Fresh RSS on Railway

Feedly alternative. Self-hosted RSS/Atom feed aggregator

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fresh-rss)

## About

FreshRSS is a self-hosted RSS and Atom feed aggregator that gives back the reading experience Google Reader took away. It fetches every site, blog, newsletter and YouTube channel you follow on a schedule you control, stores the articles in your own database, and presents them in a fast, keyboard-driven reader with categories, filter rules and full-text search. It speaks the Google Reader and Fever sync APIs, so the same account drives native clients such as Reeder and NetNewsWire. AGPL-3.0 licensed and maintained since 2013, it is the most widely deployed open-source feed reader there is.

Self-host FreshRSS on Railway and this template wires up the two pieces a durable reader needs. The **FreshRSS** service runs the official `freshrss/freshrss` image behind Apache, serving the web UI and the sync APIs on your public Railway domain, with a built-in cron that refreshes feeds twice an hour — no external scheduler to host. A **Postgres** service holds every feed, article, tag and read/unread flag, and a persistent volume carries the configuration, favicons and caches.

![FreshRSS Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786978706/400d748c-6780-417c-b25a-37c60f0830f5.png)

Hosted readers decide what you see, monetise your reading habits, and disappear when the business model changes. Self-hosting FreshRSS puts the loop under your control: your subscription list, your retention policy, your refresh interval. Teams run it as a shared intelligence feed — competitor blogs, security advisories, changelogs — where a hosted product means another per-seat subscription. Among the alternatives Miniflux is leaner and deliberately featureless while Tiny Tiny RSS is denser; FreshRSS sits in between.

Key features:

- Multi-user accounts, each with their own subscriptions and settings
- Google Reader and Fever sync APIs for native mobile and desktop clients
- Filter rules that auto-tag, auto-star or auto-read incoming articles
- Full-text search across everything received, plus saved user queries
- Web scraping via CSS or XPath selectors for sites with no feed
- OPML import and export, and WebSub for near-instant delivery

The architecture is deliberately small. FreshRSS is the only public service, running Apache with mod_php and a cron daemon in one container; Postgres stays private on Railway's internal network. The volume holds `config.php`, favicons and caches — what must survive a redeploy but does not belong in the database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| freshrss | `freshrss/freshrss:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `TZ` | freshrss | UTC | Container and PHP timezone |
| `PORT` | freshrss | 8080 | Health check target port |
| `LISTEN` | freshrss | 8080 | Apache listen port inside container |
| `DB_HOST` | freshrss | - | Private Postgres hostname |
| `DB_NAME` | freshrss | - | Postgres database name |
| `DB_USER` | freshrss | (secret) | Postgres username |
| `BASE_URL` | freshrss | - | Public URL stored at first boot |
| `CRON_MIN` | freshrss | 13,43 | Minutes past hour for feed refresh |
| `DB_PASSWORD` | freshrss | (secret) | Postgres password |
| `FRESHRSS_USER` | freshrss | (secret) | First-boot user creation arguments |
| `ADMIN_PASSWORD` | freshrss | (secret) | First account password |
| `ADMIN_USERNAME` | freshrss | (secret) | First account, ASCII alphanumeric only |
| `FRESHRSS_INSTALL` | freshrss | --default-user "$ADMIN_USERNAME" --auth-type form --base-url "$BASE_URL" --language en --title FreshRSS --api-enabled --environment production --db-type pgsql --db-host "$DB_HOST" --db-user "$DB_USER" --db-password "$DB_PASSWORD" --db-base "$DB_NAME" | First-boot installer arguments |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/i/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/FreshRSS/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/fresh-rss)
