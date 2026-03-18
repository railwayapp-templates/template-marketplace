# Deploy FusionAuth on Railway

Customer Identity and Access Management (CIAM) platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fusionauth)

## About

FusionAuth is a customer identity and access management (CIAM) platform that adds authentication, authorization, and user management to your applications. It provides login, registration, SSO, MFA, passwordless authentication, and more—with support for OAuth2, OIDC, and SAML v2 protocols out of the box.

Hosting FusionAuth on Railway provides a complete identity infrastructure with minimal configuration. The template automatically provisions a dedicated PostgreSQL database for storing users, applications, tenants, and identity data. FusionAuth runs as a single container exposing port 9011 for both the admin UI and API endpoints.

This template uses database-based search instead of Elasticsearch/OpenSearch, reducing resource requirements while maintaining full functionality. Both services run on Railway's private network by default, ensuring secure internal communication. Database migrations run automatically on startup, so you're ready to configure your first application immediately after deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FusionAuth | `fusionauth/fusionauth-app:latest` | Web service |
| FusionAuth DB | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SEARCH_TYPE` | FusionAuth | database | - |
| `DATABASE_PASSWORD` | FusionAuth | (secret) | - |
| `DATABASE_USERNAME` | FusionAuth | (secret) | - |
| `FUSIONAUTH_APP_MEMORY` | FusionAuth | 512M | - |
| `DATABASE_ROOT_PASSWORD` | FusionAuth | (secret) | - |
| `DATABASE_ROOT_USERNAME` | FusionAuth | (secret) | - |
| `FUSIONAUTH_APP_RUNTIME_MODE` | FusionAuth | production | - |
| `POSTGRES_DB` | FusionAuth DB | railway | Default database created when image is started. |
| `DATABASE_URL` | FusionAuth DB | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | FusionAuth DB | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | FusionAuth DB | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | FusionAuth DB | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/template/fusionauth)
