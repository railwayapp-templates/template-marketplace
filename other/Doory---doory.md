# Deploy Doory on Railway

Doory, an open-source Canva alternative, with templates and fonts loaded

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/doory)

## About

[Doory](https://github.com/shaongitbd/doory) is an open-source alternative to Canva: a design editor in the browser for posters, social posts, flyers, presentations, business cards and resumes, with starter templates, an element library, fonts, brand kits and real-time co-editing. This template runs Doory (commit d4baf4e from October 2026) on Postgres with the content library already loaded and an admin account set at deploy.

Upstream runs Doory as separate containers (web, API, real-time server) that share one media volume. Railway attaches a volume to a single service, so this template builds them into one container. nginx serves the web app and the media files from the volume, and uvicorn serves both the API and the co-editing WebSockets from one process.

A fresh Doory is empty: no icons, illustrations, fonts or templates until you run its sync commands. Here the first start loads them. In my test that was 29 element packs with 27,108 icons, emoji, illustrations and shapes, 105 fonts, 112 music loops and sound effects, and the ten starter templates. It all lives on the volume, about 150 MB. The admin account comes from `DOORY_ADMIN_EMAIL` and the generated `DOORY_ADMIN_PASSWORD`; it can sign in to the editor and to Doory's admin site at `/admin/`.

Before publishing I tested it on Railway. The API health check and the web app answered, and the admin signed in through the API with a session and a CSRF token, the way the web app does. The loaded templates, element packs and fonts were all listed, and a media file served straight from the volume. I created a design from the "Night Bloom concert poster" template and opened its co-editing WebSocket. After restarting Doory and Postgres, sign-in worked and the design and the whole library were still there.

Idle, it used 0.08 GB for Doory and 0.05 GB for Postgres, a few dollars a month on Railway's usage pricing; the first start peaks at about 0.4 GB while it loads the library.

Two parts are left out to fit 1 GB: server-side PDF and image export, which runs a headless Chromium, and Doory's MCP server for AI assistants. Anyone who opens the site can create an account; Doory's per-account limits (`MAX_DESIGNS_PER_USER`, `USER_STORAGE_QUOTA_BYTES`) cap what each one can store.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Doory | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /doory) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | doory | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |
| `PORT` | Doory | 8080 | Port Railway routes to |
| `SITE_URL` | Doory | - | Public URL (links in emails, CSRF checks) |
| `CACHE_URL` | Doory | dbcache://doory_cache | Cache in the database |
| `DOORY_URL` | Doory | - | Open this to design; the admin site is at /admin/ |
| `DATABASE_URL` | Doory | - | Postgres over the private network |
| `PEXELS_API_KEY` | Doory | (secret) | Optional: Pexels API key, for stock photo search |
| `PIXABAY_API_KEY` | Doory | (secret) | Optional: Pixabay API key, for stock photo search |
| `DOORY_SYNC_AUDIO` | Doory | true | Load the audio library (music loops and sound effects, about 7 MB) |
| `DOORY_SYNC_FONTS` | Doory | true | Load the 100 most popular open fonts (about 6 MB) |
| `DJANGO_SECRET_KEY` | Doory | (secret) | Signs sessions (generated; changing it signs everyone out) |
| `DOORY_ADMIN_EMAIL` | Doory | - | Your email: the admin account (staff) created on the first start |
| `DOORY_SYNC_ELEMENTS` | Doory | true | Load the element library (icons, emoji, illustrations; about 130 MB) |
| `UNSPLASH_ACCESS_KEY` | Doory | - | Optional: Unsplash API key, for stock photo search in the editor |
| `CSRF_TRUSTED_ORIGINS` | Doory | - | Origins allowed to post forms |
| `DJANGO_ALLOWED_HOSTS` | Doory | - | Hostnames the server answers (Railway's healthcheck included) |
| `DOORY_ADMIN_PASSWORD` | Doory | (secret) | Its password (generated). Used once at first start |
| `DOORY_SEED_TEMPLATES` | Doory | true | Add the ten starter templates |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/health/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/media`

**Category:** Other · **Tags:** doory, canva-alternative, design, graphic-design, templates, editor · **Languages:** Shell, Dockerfile, JavaScript, TypeScript

[View on Railway →](https://railway.com/deploy/doory)
