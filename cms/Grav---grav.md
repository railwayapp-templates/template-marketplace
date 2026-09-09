# Deploy Grav on Railway

Self-hosted WordPress alternative that stores content as Markdown files

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grav)

## About

Grav is a flat-file CMS: every page is a Markdown file with YAML front matter, every setting is a YAML file, and there is no database to migrate or back up. Themes are Twig templates, plugins hook into a Symfony-based event system, and the site is a directory you edit in the admin panel or your own editor. Teams reach for it when WordPress is more machinery than the job needs but a static site generator is too little — Grav renders on request, so an editor publishes without a build step.

Self-host Grav on Railway and you get the two things a flat-file CMS still needs from a platform: somewhere durable for the files and somewhere fast for the caches. **Grav** serves the site through Apache and PHP 8.4, with a persistent volume at `/var/www/html` — pages, media, configuration, accounts and installed plugins and themes are written there and survive redeploys. **Redis** backs Grav's page, Twig and Flex object caches. Grav holds the public domain; Redis stays private.

![Diagram of the Grav and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788815845/grav-architecture.png)

Grav's design decision is that the filesystem is the database. A page lives at `user/pages/01.home/default.md`; the folder name sets the URL and ordering, the front matter the metadata, the body is Markdown. Configuration is the same — `user/config/system.yaml` is plain YAML you can read, diff and commit. Copy the directory and you have copied the site, which is not true of a database-backed CMS.

Key features:

- Markdown pages with a rich editor, media handling and image processing built in
- Twig theming, so a designer can build a theme without touching PHP
- A plugin and theme marketplace installable from the panel or the `bin/gpm` CLI
- Multi-language content, taxonomy, forms and a scheduler for recurring jobs
- A REST API and a modern admin panel (Admin 2) in the box

On Railway that becomes two services. Grav renders and owns the volume — not an optimisation here, it *is* the site, so removing it loses everything an editor publishes. Redis is the cache tier: Grav's file cache would otherwise sit on that same volume, so moving it keeps rendering off network storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Grav | [gridalpha/grav-railway](https://github.com/gridalpha/grav-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by server |
| `REDISUSER` | Redis | default | Data panel alias, not read by server |
| `REDIS_URL` | Redis | - | Private Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | Grav | 8080 | Port Apache listens on |
| `GRAV_ADMIN_USER` | Grav | (secret) | Administrator username, 3-16 lowercase chars |
| `GRAV_REDIS_HOST` | Grav | - | Redis host for the page cache |
| `GRAV_REDIS_PORT` | Grav | - | Redis port |
| `GRAV_SITE_TITLE` | Grav | Grav | Site title, seeded on first boot |
| `GRAV_ADMIN_EMAIL` | Grav | admin@example.com | Administrator address for password recovery |
| `GRAV_ADMIN_PASSWORD` | Grav | (secret) | Administrator password, set at first boot |
| `GRAV_REDIS_DATABASE` | Grav | 0 | Redis database number |
| `GRAV_REDIS_PASSWORD` | Grav | (secret) | Redis password |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** CMS · **Languages:** Shell, Dockerfile, PHP, Go Template

[View on Railway →](https://railway.com/deploy/grav)
