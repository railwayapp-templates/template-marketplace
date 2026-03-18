# Deploy ZAP OWASP web scanner on Railway

Your own ZAP OWASP website vulnerbility scanner. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dCh187)

## About

This template provides a lightweight, cloud-based ZAP OWASP web interface running on Railway. It wires a Dockerized ZAP instance with a modern React frontend to interact with the ZAP API, enabling cloud-based vulnerability scans without local installation.

This boilerplate deploys a ZAP API-backed web interface alongside a ZAP Docker container, a React frontend, and optional PostgreSQL persistence for scan results. It provides a no-fuss, one-click deployment path on Railway, with memory considerations clearly documented. The setup is ideal for light to medium-sized scans and for anyone exploring cloud-based security tooling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Web UI | [rpuls/ZAP-OWASP-Web-interface](https://github.com/rpuls/ZAP-OWASP-Web-interface) | Web service |
| ZAP | [rpuls/ZAP-OWASP-Web-interface](https://github.com/rpuls/ZAP-OWASP-Web-interface) (root: /ZAP) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | Web UI | production | - |
| `ZAP_API_KEY` | Web UI | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, HTML

[View on Railway →](https://railway.com/template/dCh187)
