# Deploy Mealie on Railway

A self-hosted recipe manager and meal planner for the whole family

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aEkcNZ)

## About

Mealie is a self-hosted recipe manager, meal planner, and shopping list application with a FastAPI RestAPI backend and a reactive frontend built in Vue/Nuxt for a pleasant user experience for the whole family. Easily add recipes into your database by providing a URL and Mealie will automatically import the relevant data, or add a family recipe using the UI editor. Mealie also provides a comprehensive API and webhooks for interactions with 3rd-party applications.

* [Website](https://mealie.io/)
* [Documentation](https://mealie.io/documentation/getting-started/introduction/)
* [GitHub](https://github.com/mealie-recipes/mealie)

This template deploys Mealie backed by a dedicated PostgreSQL database communicating over Railway's private network, along with persistent volumes attached to both services (`/app/data` for Mealie assets and `/var/lib/postgresql/data` for Postgres). Using PostgreSQL unlocks Mealie's advanced fuzzy search capabilities and provides improved concurrency over SQLite.

### Deployment Tips & Configuration

- **Default Credentials:** The deployment will create a default administrator account with the username `changeme@example.com` and the password `MyPassword`. You should log in immediately and follow the setup flow to change the administrator email and password.
- **Database Networking:** Communication with Postgres is done exclusively over the private network and the database is not exposed externally by default. If you want to enable external access, go to the database settings and enable [TCP proxying](https://docs.railway.com/reference/tcp-proxy) on port `5432`. This can be disabled at any time.
- **Custom Domains:** Changing the Railway-provided domain or adding a custom domain may require redeploying the Mealie service so `BASE_URL` updates properly.
- **Backups:** You can protect your data using [Railway's native Volume Backups](https://docs.railway.com/reference/volumes#backups) as well as Mealie's built-in backup and restore utility in the user interface. UI backups can easily be exported and restored on fresh deployments after logging in.
- **Advanced Configuration:** A complete list of supported environment variables can be found in the [Mealie documentation](https://docs.mealie.io/documentation/getting-started/installation/backend-config/). These can be added to the Mealie service to enable support for SMTP email, OpenAI integration (for recipe scraping and image parsing), LDAP, and/or OpenID Connect (OIDC).

*Note: This is a community-made template and therefore not officially supported by the Mealie team. Please direct template-specific help requests to the [Railway thread for the template](https://station.railway.com/templates/mealie-85a203c8).*

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mealie | `ghcr.io/mealie-recipes/mealie:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | Mealie | UTC | Set to get correct date/time on the server |
| `PORT` | Mealie | 9000 | Mealie Interface |
| `BASE_URL` | Mealie | - | The public service or customer domain. |
| `DB_ENGINE` | Mealie | postgres | Database Type |
| `ALLOW_SIGNUP` | Mealie | false | Allow user sign-up without token |
| `POSTGRES_URL_OVERRIDE` | Mealie | - | Postgres URL |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Healthcheck:** `/api/app/about`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/aEkcNZ)
