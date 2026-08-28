# Deploy Tandoor on Railway

Recipe manager and meal planner with automatic shopping lists

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tandoor-cookbook)

## About

Tandoor is an open-source recipe manager and meal planner for people tired of losing recipes to bookmarks, screenshots and blog posts buried under nine paragraphs of preamble. Paste a URL and it reads the page's structured data, pulling out the title, times, photo and method and splitting every ingredient line into a real amount, unit and food. That data then drives a meal calendar, a shopping list grouped by aisle, a pantry inventory and full-text search. Households share a space, so two people plan the week together and check items off the same list from their phones.

Self-host Tandoor on Railway and this template gives you the production shape, not the single-container demo. The Tandoor service runs the Django app behind its bundled nginx and is the only service with a public URL. Managed PostgreSQL holds recipes, plans, lists and the food catalogue; managed Redis backs Django's cache, keeping signed media links fast across every worker; and a managed object storage bucket holds every uploaded photo, so images survive redeploys and the app service stays stateless.

![Diagram of the Tandoor, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787762423/tandoor-architecture.png)

Recipe collections are personal data with a long life, and most popular places to keep them are somebody else's business model. Tandoor suits households and small cooking groups who want that collection in a database they control, exportable at any time, with no subscription and no ads around the method. Teams also run it for test kitchens and catering, where a structured ingredient list beats a spreadsheet.

Key features:

- URL import from thousands of recipe sites, plus JSON, HTML and bookmarklet importers
- An ingredient parser turning free text into amount, unit and food records
- Meal plan calendar with an auto-planner and recurring entries
- Shopping lists built from recipes and plans, grouped by supermarket category
- Pantry inventory, households and spaces with roles and invites
- Recipe books, keywords, nutrition properties, unit conversions
- A full REST API and a progressive web app for phones

The architecture is deliberately split. Tandoor is the Django application and its bundled nginx, serving the API and the Vue frontend on one port. PostgreSQL is the system of record and powers search through its trigram and unaccent extensions, which the migrations enable. Redis is Django's shared cache — without it each worker keeps its own in-memory copy, so signed media URLs are recomputed constantly. Object storage holds uploaded images behind short-lived signed URLs, so pictures are never publicly listable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Tandoor | [gridalpha/tandoor-railway](https://github.com/gridalpha/tandoor-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `TZ` | Tandoor | UTC | Timezone for plans and timestamps |
| `PORT` | Tandoor | 8080 | Port Railway probes |
| `DEBUG` | Tandoor | 0 | Django debug mode off |
| `DB_ENGINE` | Tandoor | django.db.backends.postgresql | Database backend |
| `REDIS_HOST` | Tandoor | - | Private cache hostname |
| `REDIS_PORT` | Tandoor | - | Cache port |
| `SECRET_KEY` | Tandoor | (secret) | Django signing key, must stay stable |
| `POSTGRES_DB` | Tandoor | - | Database name |
| `TANDOOR_PORT` | Tandoor | 8080 | Port the bundled nginx binds |
| `ALLOWED_HOSTS` | Tandoor | * | Django host allowlist, edge routes by Host |
| `ENABLE_SIGNUP` | Tandoor | 0 | Public registration closed |
| `POSTGRES_HOST` | Tandoor | - | Private database hostname |
| `POSTGRES_PORT` | Tandoor | - | Database port |
| `POSTGRES_USER` | Tandoor | (secret) | Database user |
| `S3_ACCESS_KEY` | Tandoor | - | Enables object storage for media |
| `REDIS_PASSWORD` | Tandoor | (secret) | Cache password |
| `REDIS_USERNAME` | Tandoor | (secret) | Cache username |
| `S3_BUCKET_NAME` | Tandoor | - | Bucket name |
| `S3_REGION_NAME` | Tandoor | - | Bucket region |
| `S3_ENDPOINT_URL` | Tandoor | - | S3-compatible endpoint |
| `POSTGRES_PASSWORD` | Tandoor | (secret) | Database password |
| `TANDOOR_ADMIN_USER` | Tandoor | (secret) | First superuser, created at boot |
| `S3_QUERYSTRING_AUTH` | Tandoor | 1 | Serve media through signed URLs |
| `TANDOOR_ADMIN_EMAIL` | Tandoor | admin@example.com | Email on the bootstrapped account |
| `CSRF_TRUSTED_ORIGINS` | Tandoor | - | Trusted origin for sign-in POSTs |
| `S3_SECRET_ACCESS_KEY` | Tandoor | (secret) | Bucket secret key |
| `TANDOOR_ADMIN_PASSWORD` | Tandoor | (secret) | First superuser password |
| `ALLAUTH_TRUSTED_PROXY_COUNT` | Tandoor | 3 | Proxy hops in front of the app |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tandoor-cookbook)
