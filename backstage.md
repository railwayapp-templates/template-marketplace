# Deploy Backstage on Railway

An example Backstage application

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/backstage)

## About

Backstage is an open-source framework developed by Spotify for building customized internal developer portals. It unifies your organization’s software ecosystem including microservices, documentation, and infrastructure into a single "pane of glass" interface, allowing teams to manage their software catalog, documentation (TechDocs), and CI/CD pipelines in one centralized location.

Hosting Backstage involves deploying a multi-layered application consisting of a React frontend and a Node.js backend. In a production environment, Backstage requires a persistent database (ideally PostgreSQL) to store the software catalog and plugin metadata. The deployment process typically centers around containerization, where the app is built into a Docker image containing both the static frontend assets and the server-side logic. On Railway, this is streamlined by connecting your GitHub repository, where Railway automatically detects the Dockerfile or Nixpacks configuration, manages environment variables for authentication (like GitHub OAuth), and provisions the necessary database plugins.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backstage | [vipulasri/backstage-starter-railway](https://github.com/vipulasri/backstage-starter-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/template/backstage)
