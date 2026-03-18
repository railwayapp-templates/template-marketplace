# Deploy Keycloak on Railway

Keycloak template with keywind theme + apple and discord providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mSwigX)

## About

This template will spin a Postgres instance and use it to power a Keycloak docker image.

I have added a custom keywind theme (will soon include dark mode), Discord identity provider and Apple identity provider.

It should be pretty straight forward to run, just set up an admin login and password and it should work.

**Things of Note:**

- Communication to Postgres is done exclusively over the private network and the database is not exposed externally in any way by default, if you want to enable access from outside of the private network you can go to the databases settings to enable TCP proxying and enter the internal port (5432). the TCP proxy can be removed at any point to close off external access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Keycloak | [leonardochappuis/keycloak-docker](https://github.com/leonardochappuis/keycloak-docker) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Keycloak | 8080 | Default port |
| `KC_DB` | Keycloak | postgres | Type of database used by Keycloak |
| `KC_PROXY` | Keycloak | edge | Proxy address forwarding mode |
| `KC_DB_URL` | Keycloak | - | Connection url to the db using jdbc |
| `KC_FEATURES` | Keycloak | token-exchange | Enables Technology Preview and/or deprecated features |
| `KC_HOSTNAME` | Keycloak | - | URL to reach keycloak, defaults to railway public generated url |
| `KC_HTTP_PORT` | Keycloak | 8080 | Port which http listener will listen |
| `KC_DB_PASSWORD` | Keycloak | (secret) | DB Password |
| `KC_DB_USERNAME` | Keycloak | (secret) | DB username |
| `KEYCLOAK_ADMIN` | Keycloak | - | Your default admin username |
| `KC_HTTP_ENABLED` | Keycloak | true | Enables http listener |
| `KC_HEALTH_ENABLED` | Keycloak | true | Enables Keycloak Health checks |
| `KC_HOSTNAME_STRICT` | Keycloak | true | Disables dynamically resolving the hostname from request headers. |
| `KC_METRICS_ENABLED` | Keycloak | true | If enabled, metrics will be available at the /metrics endpoint. |
| `KC_DB_POOL_MIN_SIZE` | Keycloak | 0 | Minimum pool size for db |
| `KEYCLOAK_ADMIN_PASSWORD` | Keycloak | (secret) | Default admin password |
| `PROXY_ADDRESS_FORWARDING` | Keycloak | true | Enables proxy address forwarding |
| `KC_HOSTNAME_STRICT_BACKCHANNEL` | Keycloak | true | By default backchannel URLs are dynamically resolved from request headers to allow internal and external applications. |
| `QUARKUS_TRANSACTION_MANAGER_ENABLE_RECOVERY` | Keycloak | true | Enables transaction recovery |
| `POSTGRES_DB` | Postgres | railway | default db name |
| `POSTGRES_HOST` | Postgres | - | Proxy domain if you need access from outside of the private network. |
| `POSTGRES_PORT` | Postgres | - | If you need access from outside of the private network. |
| `POSTGRES_USER` | Postgres | (secret) | db user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | db password |
| `POSTGRES_PRIVATE_HOST` | Postgres | - | Private domain |
| `POSTGRES_PRIVATE_PORT` | Postgres | 5432 | Private port |

## Configuration

- **Healthcheck:** `/resources/master/admin/en`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication · **Languages:** FreeMarker, Dockerfile

[View on Railway →](https://railway.com/template/mSwigX)
