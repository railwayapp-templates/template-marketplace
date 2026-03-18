# Deploy Directus (docker/websocket/extensions) + PostGIS (docker/TCP) + S3/Local on Railway

Directus (Docker) + PostGIS (Docker/TCP) + S3

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/XQc69P)

## About

Directus is a powerful headless CMS and data platform that transforms any database into a dynamic API and beautiful admin app. This template provides a complete Directus instance with PostGIS for geospatial data support and S3 integration for persistent file storage, all containerized and ready for production deployment.

Hosting Directus with PostGIS and S3 on Railway involves deploying a containerized stack that includes a Directus instance with pre-configured extensions and websocket support, paired with a PostGIS database for advanced geospatial capabilities. The setup includes automatic schema synchronization, SSL-secured database connections using self-signed certificates, and S3 integration for scalable file storage. Railway's private networking reduces egress fees by enabling secure communication between Directus and the database. The template supports custom extensions, automated deployments, and provides a complete data platform solution with minimal configuration required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgis | `postgis/postgis:latest` | Database |
| Directus | [Somi-AI/directus-railway](https://github.com/Somi-AI/directus-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgis | railway | - |
| `DATABASE_URL` | Postgis | - | URL to connect to Postgres database over public networking |
| `POSTGRES_USER` | Postgis | (secret) | - |
| `POSTGRES_PASSWORD` | Postgis | (secret) | - |
| `DATABASE_PRIVATE_URL` | Postgis | - | URL to connect to Postgres database over private network |
| `POSTGRES_INITDB_ARGS` | Postgis | -c ssl=on -c ssl_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem -c ssl_key_file=/etc/ssl/private/ssl-cert-snakeoil.key | Additional arguments to pass to postgresql initdb, enables SSL |
| `KEY` | Directus | - | Unique identifier for the project. Typically set as a UUID. You can find it in the 'env var' tab after deployment. |
| `SECRET` | Directus | (secret) | Secret string for the project. You can find it in the 'env var' tab after deployment. |
| `ADMIN_EMAIL` | Directus | - | Email address of the default admin user when directus is created. |
| `CONFIG_PATH` | Directus | config.cjs | Configuration Files - Don't change this if unsure. |
| `ADMIN_PASSWORD` | Directus | (secret) | The password for the default admin user is set when Directus is created. You can find it in the 'env var' tab after deployment. |
| `STORAGE_S3_KEY` | Directus | - | S3 Access Key - Required if using S3 |
| `EXTENSIONS_PATH` | Directus | /directus/extensions | Path to your local extensions folder. |
| `MIGRATIONS_PATH` | Directus | /directus/migrations | Where custom migrations are located. |
| `STORAGE_LOCATIONS` | Directus | s3 | Use s3 or local |
| `STORAGE_S3_BUCKET` | Directus | - | S3 Bucket - Required if using S3 |
| `STORAGE_S3_DRIVER` | Directus | s3 | The s3 driver is being used in this situation. |
| `STORAGE_S3_REGION` | Directus | ap-southeast-1 | S3 Region - Required if using S3 |
| `STORAGE_S3_SECRET` | Directus | (secret) | S3 Secret Token - Required if using S3 |
| `WEBSOCKETS_ENABLED` | Directus | true | Enable websocket feature? |
| `STORAGE_S3_ENDPOINT` | Directus | s3.amazonaws.com | S3 Endpoint - Required if using S3 |
| `DB_CONNECTION_STRING` | Directus | - | Database private url |
| `EMAIL_TEMPLATES_PATH` | Directus | /directus/templates | Where custom templates are located. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Directus | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/directus/files`

**Category:** CMS · **Languages:** JavaScript, Dockerfile, TypeScript, Shell

[View on Railway →](https://railway.com/deploy/XQc69P)
