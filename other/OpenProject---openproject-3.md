# Deploy OpenProject on Railway

Project management with private PostgreSQL and persistent attachments.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openproject-3)

## About

Deploy OpenProject **17.8.0** with a dedicated PostgreSQL 17 database. The upstream all-in-one application image supervises the web application, job worker, cache, Apache proxy, and bundled Hocuspocus collaboration process. Its internal PostgreSQL process is disabled by using the separate database URL.

This two-service deployment pairs the OpenProject all-in-one image with a dedicated PostgreSQL database. The application image supervises the web server, background worker, cache, Apache proxy, and bundled collaboration process. Its internal PostgreSQL process is disabled in favor of the private database service. Railway provides the public HTTPS endpoint, while attachments and database contents are stored on separate persistent volumes. Startup initializes and migrates the database and generates an initial administrator password through Railway variables. After deployment, sign in, change that password, and configure email delivery. Keep one application replica so the local attachment store remains consistent.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Database |
| openproject | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_DB` | postgres | openproject | Application database created during first initialization of an empty PostgreSQL volume. |
| `APP_USER` | postgres | (secret) | Dedicated application database role created during first initialization. |
| `POSTGRES_DB` | postgres | postgres | Initial PostgreSQL database name, or the matching database selected by the application. |
| `APP_PASSWORD` | postgres | (secret) | Generated password for the application database role. Preserve it with your backups. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `ENABLE_VECTOR` | postgres | false | Initialize the pgvector extension for applications that require vector storage. Keep the supplied value. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `ALLOW_APP_DATABASE_CREATION` | postgres | false | Grant database and role creation privileges required by ToolJet. Keep false for other applications. |
| `PORT` | openproject | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `DATABASE_URL` | openproject | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `SECRET_KEY_BASE` | openproject | (secret) | Generated application signing secret. Preserve across restarts and backup restores. |
| `OPENPROJECT_HSTS` | openproject | true | Enable HTTP Strict Transport Security for the public HTTPS deployment. |
| `OPENPROJECT_HTTPS` | openproject | true | Generate HTTPS application URLs behind Railway TLS termination. Keep true. |
| `RAILS_MAX_THREADS` | openproject | 8 | Maximum Rails request threads. Tune with available memory and database capacity. |
| `RAILS_MIN_THREADS` | openproject | 2 | Minimum Rails request threads. Keep at or below RAILS_MAX_THREADS. |
| `PG_STARTUP_WAIT_TIME` | openproject | 60 | Time allowed for PostgreSQL startup before OpenProject initialization. Keep the supplied default unless startup logs require more time. |
| `OPENPROJECT_HOST__NAME` | openproject | - | Public OpenProject hostname without a scheme. Update when assigning a custom domain. |
| `OPENPROJECT_SEED__ADMIN__USER__PASSWORD` | openproject | (secret) | Generated initial password for the admin account. Read it after deployment, sign in, and change it promptly. |
| `OPENPROJECT_SEED__ADMIN__USER__PASSWORD__RESET` | openproject | (secret) | Require the seeded administrator to change the initial password at first login. |
| `OPENPROJECT_COLLABORATIVE__EDITING__HOCUSPOCUS__URL` | openproject | auto | Public secure WebSocket URL for collaborative editing. Update with the application domain. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health_checks/default`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/openproject/assets`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/openproject-3)
