# Deploy xbridge-test on Railway

Full-stack dashboard with Keycloak authentication and PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xbridge-test)

## About

Railway provides managed infrastructure for running the application services without requiring you to maintain servers manually. Services can be deployed, configured, monitored, and scaled from the Railway dashboard. PostgreSQL provides persistent database storage, while Keycloak handles authentication and identity management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:16-alpine` | Database |
| First Sys Dashboard CI/CD | [ashraftryfie/first-sys-ci-test-back](https://github.com/ashraftryfie/first-sys-ci-test-back) | Worker |
| Keycloak | `quay.io/keycloak/keycloak:26.7.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | keycloak | Name of the PostgreSQL database used by Keycloak. |
| `POSTGRES_USER` | Postgres | (secret) | Username Keycloak uses to connect to PostgreSQL. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for the PostgreSQL user. Use a strong secret. |
| `NODE_ENV` | First Sys Dashboard CI/CD | production | Runtime environment for the backend, such as production. |
| `API_PREFIX` | First Sys Dashboard CI/CD | api | URL path prefix used by the backend API, such as api. |
| `CORS_ORIGIN` | First Sys Dashboard CI/CD | https://ashraf-ultra.infinityfree.me | Allowed frontend origin for browser cross-origin API requests. |
| `KEYCLOAK_URL` | First Sys Dashboard CI/CD | https://ashraf-keycloak-prod.up.railway.app | Public URL where the Keycloak server is accessible. |
| `KEYCLOAK_REALM` | First Sys Dashboard CI/CD | xbridge | Keycloak realm containing the application configuration. |
| `KEYCLOAK_CLIENT_ID` | First Sys Dashboard CI/CD | xbridge-daap-console | Keycloak client ID used by the backend or frontend. |
| `KC_DB` | Keycloak | postgres | Keycloak database vendor, such as postgres. |
| `KC_DB_URL` | Keycloak | - | JDBC connection URL for Keycloak's database. |
| `KC_DB_PASSWORD` | Keycloak | (secret) | Password for the Keycloak database user. |
| `KC_DB_USERNAME` | Keycloak | (secret) | Username for the Keycloak database connection. |
| `KC_HTTP_ENABLED` | Keycloak | true | Enables HTTP access to Keycloak when set to true. |
| `KC_HOSTNAME_STRICT` | Keycloak | false | Controls whether Keycloak requires requests to match its configured hostname. |
| `KC_BOOTSTRAP_ADMIN_PASSWORD` | Keycloak | (secret) | Initial Keycloak administrator password. Use a strong secret. |
| `KC_BOOTSTRAP_ADMIN_USERNAME` | Keycloak | (secret) | Initial Keycloak administrator username. |

## Configuration

- **Start command:** `start --optimized --http-port=8080 --proxy-headers=xforwarded (or start-dev --http-port=8080`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/xbridge-test)
