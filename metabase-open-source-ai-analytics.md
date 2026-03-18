# Deploy Metabase - Open source AI Analytics on Railway

Deploy and Host Metabase - Open source AI Analytics with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/metabase-open-source-ai-analytics)

## About

Metabase is a leading open-source analytics and business intelligence platform that transforms raw data into clear, actionable insights. With its AI-assisted querying, intuitive visualizations, and powerful dashboarding capabilities, Metabase empowers teams to explore data effortlessly—no SQL expertise required—while still offering full query control for advanced users.

Deploying Metabase on Railway gives your organization a fully operational, enterprise-grade analytics environment in minutes. Metabase connects seamlessly to virtually any data source and provides rich, interactive dashboards, automated report scheduling, fine-grained access controls, and embedded analytics for customer-facing applications. Its AI-powered exploration tools help teams discover insights faster, reduce dependency on data engineering, and improve decision-making across the business.

Railway handles the infrastructure complexity behind the scenes—automatic scaling, environment variable management, secure database connections, and persistent storage—while providing exceptional reliability and monitoring. This means your Metabase deployment remains fast, stable, and secure without any DevOps burden, so your team can stay focused on insight generation rather than infrastructure maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Metabase | `metabase/metabase:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Metabase | 3000 | - |
| `MB_DB_TYPE` | Metabase | postgres | - |
| `MB_DB_USER` | Metabase | (secret) | - |
| `MB_PASSWORD_COMPLEXITY` | Metabase | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Metabase | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/metabase-open-source-ai-analytics)
