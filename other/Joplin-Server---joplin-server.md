# Deploy Joplin Server on Railway

Self-hosted sync and storage server for Joplin note-taking app.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/joplin-server)

## About

**Joplin Server is a self-hosted synchronization backend for the open-source Joplin note-taking app, allowing users to securely sync notes, notebooks, tags, and attachments across devices.**

Hosting Joplin Server gives you full control over your note synchronization process. Instead of relying on cloud providers like Dropbox or OneDrive, Joplin Server lets you securely sync notes between devices through your own infrastructure. The server is lightweight, Docker-compatible, and connects to a PostgreSQL database for persistent storage. Railway simplifies this by offering managed PostgreSQL, zero-config deployments, and scalable infrastructure—making it ideal for developers who want private, cross-device syncing without the setup hassle of a traditional VPS or manual install.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres Database | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Joplin Server | `joplin/server` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres Database | joplin | Default database created when image is started. |
| `DATABASE_URL` | Postgres Database | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres Database | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres Database | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres Database | - | Public URL to connect to Postgres database, used by the Data panel. |
| `APP_PORT` | Joplin Server | 22300 | - |
| `DB_CLIENT` | Joplin Server | pg | - |
| `POSTGRES_USER` | Joplin Server | (secret) | - |
| `POSTGRES_PASSWORD` | Joplin Server | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/joplin-server)
