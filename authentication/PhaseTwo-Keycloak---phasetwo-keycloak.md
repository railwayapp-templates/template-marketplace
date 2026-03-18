# Deploy PhaseTwo Keycloak on Railway

Keycloak with extensions for orgs, events, themes, and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/phasetwo-keycloak)

## About

PhaseTwo Enhanced Keycloak is a custom build of Keycloak including all of PhaseTwo's extensions, including:
- Organizations
- Events
- Magic Link
- Themes
- Admin UI
- Admin Portal
- IdP Wizards

Adding extensive multi-tenancy, audit logging, self-service features to Keycloak.

For more information, view https://phasetwo.io/docs/introduction/open-source/

To host PhaseTwo keycloak, simply deploy the template and login. By default, your Keycloak instance will be configured with the default username `admin` and password `railway`, but you can change this default use by editing the `KC_BOOTSTRAP_ADMIN_` environment variables before deploy.

After deploying your instance, create a new admin user and delete the bootstrap account, and enable the PhaseTwo extensions by going to your realm settings and switching the admin theme to `phasetwo.v2`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| PhaseTwo Keycloak | `quay.io/phasetwo/phasetwo-keycloak` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | PhaseTwo Keycloak | 9000 | Health Check Port |
| `KC_DB` | PhaseTwo Keycloak | postgres | - |
| `KC_DB_PASSWORD` | PhaseTwo Keycloak | (secret) | - |
| `KC_DB_USERNAME` | PhaseTwo Keycloak | (secret) | - |
| `KC_HTTP_ENABLED` | PhaseTwo Keycloak | true | - |
| `KC_PROXY_HEADERS` | PhaseTwo Keycloak | xforwarded | - |
| `KC_HEALTH_ENABLED` | PhaseTwo Keycloak | true | - |
| `KC_HOSTNAME_STRICT` | PhaseTwo Keycloak | false | - |
| `KC_HTTP_RELATIVE_PATH` | PhaseTwo Keycloak | /auth | - |
| `KC_BOOTSTRAP_ADMIN_PASSWORD` | PhaseTwo Keycloak | (secret) | Password for default admin account |
| `KC_BOOTSTRAP_ADMIN_USERNAME` | PhaseTwo Keycloak | (secret) | Username for default admin account |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/opt/keycloak/bin/kc.sh --verbose start --spi-email-template-provider=freemarker-plus-mustache --spi-email-template-freemarker-plus-mustache-enabled=true --spi-theme-cache-themes=false`
- **Healthcheck:** `/auth/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/phasetwo-keycloak)
