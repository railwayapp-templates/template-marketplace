# Deploy Mealie on Railway

A self-hosted recipe manager and meal planner for the whole family

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aEkcNZ)

## About

Mealie is a self hosted recipe manager and meal planner with a RestAPI backend and a reactive frontend application built in Vue for a pleasant user experience for the whole family. Easily add recipes into your database by providing the url and Mealie will automatically import the relevant data or add a family recipe with the UI editor. Mealie also provides an API for interactions from 3rd party applications.

* [Website](https://mealie.io/)
* [Documentation](https://docs.mealie.io/)
* [GitHub](https://github.com/mealie-recipes/mealie/)

**Tips**

* The deployment will create a default administrator account with the username `changeme@example.com` and the password `MyPassword `. You should login and follow the setup flow to change the username and password.
* Communication with Postgres is done exclusively over the private network and the database is not exposed externally by default. If you want to enable external access, go to the database settings and enable [TCP proxying](https://docs.railway.app/reference/tcp-proxy) on port `5432`. This can be disabled at any time.
* Changing the Railway-provided domain or adding a custom domain may require redeploying the Mealie service.
* Since [Volumes on Railway](https://docs.railway.app/reference/volumes) are still a new feature, there is no option to access or backup the persistent data. However, Mealie natively supports [backing up and restoring data](https://docs.mealie.io/documentation/getting-started/usage/backups-and-restoring/) via the user interface. These backups can easily be restored on fresh deployments after logging in.
* A complete list of supported environment variables can be found [here](https://docs.mealie.io/documentation/getting-started/installation/backend-config/). These can be added to the Mealie service to enable support for email, LDAP, and/or OpenID Connect (OIDC).

_Note: This is a community-made template and therefore not supported by the Mealie team. Please direct help requests to the [Railway thread for the template](https://help.railway.app/templates/mealie-85a203c8)._

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mealie | `ghcr.io/mealie-recipes/mealie:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mealie | 9000 | Mealie Interface |
| `BASE_URL` | Mealie | - | The public service or customer domain. |
| `DB_ENGINE` | Mealie | postgres | Database Type |
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
