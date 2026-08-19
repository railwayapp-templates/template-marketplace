# Deploy Mealie on Railway

Self-host Mealie, the open source recipe manager and meal planner

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mealie)

## About

Mealie is an open-source recipe manager and meal planner for people tired of losing recipes to bookmarks, screenshots and blog posts that vanish. Paste a link from almost any cooking site and Mealie reads the page's structured data to pull out the title, photo, ingredients, steps and timings as a clean, ad-free recipe card you own. From there it is a kitchen system: drop recipes onto a weekly calendar, turn that plan into a shopping list that merges duplicates, and share it with a household.

Deploy Mealie on Railway and two services are provisioned: the application container, serving the web interface and REST API on a public HTTPS domain, and a PostgreSQL database holding recipes, meal plans, shopping lists and users. A persistent volume holds recipe images and the signing keys that keep you logged in across restarts. Database credentials, the public URL and the first administrator account are wired up before the first page load, so there is no setup wizard and no default password.

![Mealie Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787076304/f696928f-d467-43b4-a5a3-8d2076c442fe.png)

Mealie is a Python (FastAPI) backend serving a Vue frontend from one container, backed by SQLite or PostgreSQL. This template uses PostgreSQL, which the project recommends once more than a couple of people are active and which unlocks fuzzy search via `pg_trgm`. Self-hosting matters because a recipe collection is long-lived personal data: commercial apps change pricing, sunset sync or gate exports, while Mealie keeps it all in your own database with a documented API and JSON backups.

Key features:

- Recipe import from a URL, working with most cooking sites out of the box
- A parser splitting "2 garlic cloves, finely chopped" into quantity, food and note
- Weekly meal planning, with rules that auto-fill days from tags or categories
- Shopping lists aggregating ingredients across recipes, checkable from a phone
- Households and user groups, so several people share one plan with their own login
- Cookbooks, tags, categories and a timeline of what you cooked
- A full REST API with tokens, plus optional OIDC and LDAP sign-on
- Importers for Paprika, Nextcloud Cookbook, Tandoor and Copy Me That

The **Mealie** service handles web requests, the API, scraping and an in-process scheduler. **PostgreSQL** stores structured data. The volume holds recipe images plus the token-signing secrets, which is why it is required even with an external database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mealie | [gridalpha/mealie-railway](https://github.com/gridalpha/mealie-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `TZ` | mealie | UTC | Server time zone for nightly tasks |
| `PORT` | mealie | 9000 | HTTP port, mapped to API_PORT at boot |
| `BASE_URL` | mealie | - | Public-facing app URL |
| `DB_ENGINE` | mealie | postgres | Use PostgreSQL instead of SQLite |
| `ALLOW_SIGNUP` | mealie | false | Disable public self-registration |
| `MEALIE_ADMIN_EMAIL` | mealie | admin@mealie.dev | First administrator login email |
| `MEALIE_DB_PASSWORD` | mealie | (secret) | Password for Mealie's own database role |
| `MEALIE_PG_ADMIN_URL` | mealie | - | Superuser URL, used only at boot |
| `MEALIE_ADMIN_PASSWORD` | mealie | (secret) | First administrator password |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mealie)
