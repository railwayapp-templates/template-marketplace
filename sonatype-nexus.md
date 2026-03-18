# Deploy Sonatype Nexus on Railway

Universal repository and package manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/sonatype-nexus)

## About

Sonatype Nexus is a repository manager that allows you to proxy, collect, and manage your dependencies. It supports various formats, including Maven, npm, and Docker, making it a versatile tool for modern software development.

Hosting Sonatype Nexus involves setting up the application on a server, configuring storage for your artifacts, and ensuring secure access for your development teams. With Railway, you can easily deploy Nexus without worrying about the underlying infrastructure, allowing you to focus on managing your software components.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Nexus3 | `sonatype/nexus3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Nexus3 | 8081 | Port to listen on for Railway HTTP Proxy |
| `SECRET_ENCRYPTION_KEY` | Nexus3 | (secret) | Encryption key |
| `NEXUS_SECRETS_KEY_FILE` | Nexus3 | (secret) | - |
| `NEXUS_SECURITY_INITIAL_USER` | Nexus3 | (secret) | Initial username of the admin user. (Purely for documentation, updating this will not change the username!) |
| `NEXUS_SECURITY_RANDOMPASSWORD` | Nexus3 | (secret) | - |
| `NEXUS_DATASTORE_NEXUS_PASSWORD` | Nexus3 | (secret) | - |
| `NEXUS_DATASTORE_NEXUS_USERNAME` | Nexus3 | (secret) | - |
| `NEXUS_SECURITY_INITIAL_PASSWORD` | Nexus3 | (secret) | Initial password for the admin user. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "echo \"$SECRET_ENCRYPTION_KEY\" > /keys.json && /opt/sonatype/nexus/bin/nexus run"`
- **Healthcheck:** `/service/rest/v1/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/nexus-data`

**Category:** Storage

[View on Railway →](https://railway.com/template/sonatype-nexus)
