# Deploy OpenProject on Railway

Open source project management with Gantt charts and agile boards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openproject-server)

## About

OpenProject is open source project management software for teams that plan real work: work packages with hierarchies and custom fields, Gantt charts, Scrum and Kanban boards, a team planner, meetings with agendas, wikis, and time and cost tracking. It shares Redmine's Ruby on Rails lineage but has moved well past it, with an Angular front end and a documented REST API. Teams self-host OpenProject for data residency, for classic scheduling beside agile boards, or because per-seat pricing stops adding up. Deploy OpenProject on Railway and you get the Community edition in full — GPL-licensed, no seat limit, no trial clock.

It runs the multi-process topology OpenProject documents for production, not a single all-in-one container. A Caddy service is the public entry point and the only thing exposed to the internet. Behind it sit a Puma web service, a GoodJob worker, a scheduler for inbound email, and a Hocuspocus websocket server for collaborative editing. PostgreSQL holds every record, Redis is the shared Rails cache, and an object storage bucket holds attachments — which is what lets web and worker read each other's uploads without a shared disk.

![Diagram of the OpenProject services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788056912/openproject-architecture.png)

OpenProject is a full project management suite, not an issue tracker with extras bolted on. One instance carries a portfolio of projects, each with its own modules, roles and workflows, and rolls them into shared views.

- Work packages with hierarchies, custom fields and type-specific workflows
- Gantt charts with dependencies, baselines and automatic scheduling
- Scrum backlogs, sprints, action boards and a drag-and-drop team planner
- Meetings with recurring series and linked work packages
- Wikis, documents, attachments, budgets and time tracking
- REST API v3, OAuth 2 applications and webhooks

The deployment splits OpenProject the way its own production compose file does. The web service answers browser and API traffic. The worker runs GoodJob, which executes exports, notification digests and scheduled cleanups — without it the app looks fine while long-running actions never finish. The scheduler polls an IMAP mailbox so email replies become work packages, and stays idle until configured. Caddy routes `/hocuspocus` to the websocket server and everything else to the app, because the browser must reach both on one origin.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| openproject-cron | `openproject/openproject:17-slim` | Worker |
| Redis | `redis:8.2` | Database |
| openproject-web | `openproject/openproject:17-slim` | Worker |
| openproject-proxy | [gridalpha/openproject-railway](https://github.com/gridalpha/openproject-railway) | Web service |
| openproject-worker | `openproject/openproject:17-slim` | Worker |
| hocuspocus | `openproject/hocuspocus:17.7` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `DATABASE_URL` | openproject-cron | - | Postgres connection string |
| `IMAP_ENABLED` | openproject-cron | false | Poll an IMAP mailbox for inbound mail |
| `SECRET_KEY_BASE` | openproject-cron | (secret) | Must match the web service |
| `OPENPROJECT_HSTS` | openproject-cron | true | Send Strict-Transport-Security |
| `OPENPROJECT_HTTPS` | openproject-cron | true | Generate https URLs |
| `IMAP_CHECK_INTERVAL` | openproject-cron | 600 | Seconds between IMAP polls |
| `OPENPROJECT_HOST__NAME` | openproject-cron | - | Public hostname for generated links |
| `OPENPROJECT_FOG_DIRECTORY` | openproject-cron | - | Bucket name |
| `OPENPROJECT_CACHE__REDIS__URL` | openproject-cron | - | Redis cache connection string |
| `OPENPROJECT_SELF__REGISTRATION` | openproject-cron | 0 | Disable public signup |
| `OPENPROJECT_RAILS__CACHE__STORE` | openproject-cron | redis | Shared Rails cache backend |
| `OPENPROJECT_ATTACHMENTS__STORAGE` | openproject-cron | fog | Store attachments in object storage |
| `OPENPROJECT_FOG_CREDENTIALS_REGION` | openproject-cron | (secret) | Bucket region |
| `OPENPROJECT_ADDITIONAL__HOST__NAMES` | openproject-cron | openproject-web.railway.internal | Extra allowed host headers |
| `OPENPROJECT_FOG_CREDENTIALS_ENDPOINT` | openproject-cron | (secret) | Bucket S3 endpoint |
| `OPENPROJECT_FOG_CREDENTIALS_PROVIDER` | openproject-cron | (secret) | S3-compatible storage provider |
| `OPENPROJECT_FOG_CREDENTIALS_PATH__STYLE` | openproject-cron | (secret) | Path-style addressing |
| `OPENPROJECT_FOG_CREDENTIALS_AWS__ACCESS__KEY__ID` | openproject-cron | (secret) | Bucket access key |
| `OPENPROJECT_FOG_CREDENTIALS_AWS__SECRET__ACCESS__KEY` | openproject-cron | (secret) | Bucket secret key |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `BIND` | openproject-web | :: | Dual-stack bind for private networking |
| `PORT` | openproject-web | 8080 | Puma listening port |
| `DATABASE_URL` | openproject-web | - | Postgres connection string |
| `SECRET_KEY_BASE` | openproject-web | (secret) | Session and cookie signing key |
| `OPENPROJECT_HSTS` | openproject-web | true | Send Strict-Transport-Security |
| `OPENPROJECT_HTTPS` | openproject-web | true | Assume TLS-terminating proxy |
| `RAILS_MAX_THREADS` | openproject-web | 12 | Puma maximum thread count |
| `RAILS_MIN_THREADS` | openproject-web | 4 | Puma minimum thread count |
| `OPENPROJECT_HOST__NAME` | openproject-web | - | Public hostname |
| `OPENPROJECT_FOG_DIRECTORY` | openproject-web | - | Bucket name |
| `OPENPROJECT_CACHE__REDIS__URL` | openproject-web | - | Redis cache connection string |
| `OPENPROJECT_SELF__REGISTRATION` | openproject-web | 0 | Disable public signup |
| `OPENPROJECT_RAILS__CACHE__STORE` | openproject-web | redis | Shared Rails cache backend |
| `OPENPROJECT_ATTACHMENTS__STORAGE` | openproject-web | fog | Store attachments in object storage |
| `OPENPROJECT_SEED_ADMIN_USER_MAIL` | openproject-web | admin@example.net | Email of first admin |
| `OPENPROJECT_SEED_ADMIN_USER_NAME` | openproject-web | OpenProject Admin | Display name of first admin |
| `OPENPROJECT_FOG_CREDENTIALS_REGION` | openproject-web | (secret) | Bucket region |
| `OPENPROJECT_ADDITIONAL__HOST__NAMES` | openproject-web | openproject-web.railway.internal | Extra allowed host headers |
| `OPENPROJECT_FOG_CREDENTIALS_ENDPOINT` | openproject-web | (secret) | Bucket S3 endpoint |
| `OPENPROJECT_FOG_CREDENTIALS_PROVIDER` | openproject-web | (secret) | S3-compatible storage provider |
| `OPENPROJECT_SEED_ADMIN_USER_PASSWORD` | openproject-web | (secret) | First admin password, change on first login |
| `OPENPROJECT_FOG_CREDENTIALS_PATH__STYLE` | openproject-web | (secret) | Path-style addressing, required for browser uploads |
| `OPENPROJECT_REMOTE__STORAGE__UPLOAD__HOST` | openproject-web | - | Upload host allowed in the CSP |
| `OPENPROJECT_REMOTE__STORAGE__DOWNLOAD__HOST` | openproject-web | - | Download host allowed in the CSP |
| `OPENPROJECT_FOG_CREDENTIALS_AWS__ACCESS__KEY__ID` | openproject-web | (secret) | Bucket access key |
| `OPENPROJECT_COLLABORATIVE__EDITING__HOCUSPOCUS__URL` | openproject-web | - | Collaborative editing websocket URL |
| `OPENPROJECT_FOG_CREDENTIALS_AWS__SECRET__ACCESS__KEY` | openproject-web | (secret) | Bucket secret key |
| `OPENPROJECT_COLLABORATIVE__EDITING__HOCUSPOCUS__SECRET` | openproject-web | (secret) | Shared token key for collaborative editing |
| `PORT` | openproject-proxy | 8080 | HTTP port Caddy listens on |
| `HOCUSPOCUS_HOST` | openproject-proxy | - | Collaborative editing upstream |
| `OPENPROJECT_WEB_HOST` | openproject-proxy | - | Rails app upstream |
| `PORT` | openproject-worker | 8080 | GoodJob probe server port |
| `DATABASE_URL` | openproject-worker | - | Postgres connection string |
| `SECRET_KEY_BASE` | openproject-worker | (secret) | Must match the web service |
| `OPENPROJECT_HSTS` | openproject-worker | true | Send Strict-Transport-Security |
| `OPENPROJECT_HTTPS` | openproject-worker | true | Generate https URLs |
| `GOOD_JOB_PROBE_PORT` | openproject-worker | 8080 | Health check endpoint port |
| `OPENPROJECT_HOST__NAME` | openproject-worker | - | Public hostname for generated links |
| `OPENPROJECT_FOG_DIRECTORY` | openproject-worker | - | Bucket name |
| `OPENPROJECT_CACHE__REDIS__URL` | openproject-worker | - | Redis cache connection string |
| `OPENPROJECT_SELF__REGISTRATION` | openproject-worker | 0 | Disable public signup |
| `OPENPROJECT_RAILS__CACHE__STORE` | openproject-worker | redis | Shared Rails cache backend |
| `OPENPROJECT_ATTACHMENTS__STORAGE` | openproject-worker | fog | Store attachments in object storage |
| `OPENPROJECT_FOG_CREDENTIALS_REGION` | openproject-worker | (secret) | Bucket region |
| `OPENPROJECT_ADDITIONAL__HOST__NAMES` | openproject-worker | openproject-web.railway.internal | Extra allowed host headers |
| `OPENPROJECT_GOOD__JOB__MAX__THREADS` | openproject-worker | 10 | Concurrent background jobs |
| `OPENPROJECT_FOG_CREDENTIALS_ENDPOINT` | openproject-worker | (secret) | Bucket S3 endpoint |
| `OPENPROJECT_FOG_CREDENTIALS_PROVIDER` | openproject-worker | (secret) | S3-compatible storage provider |
| `OPENPROJECT_FOG_CREDENTIALS_PATH__STYLE` | openproject-worker | (secret) | Path-style addressing |
| `OPENPROJECT_REMOTE__STORAGE__UPLOAD__HOST` | openproject-worker | - | Upload host allowed in the CSP |
| `OPENPROJECT_REMOTE__STORAGE__DOWNLOAD__HOST` | openproject-worker | - | Download host allowed in the CSP |
| `OPENPROJECT_FOG_CREDENTIALS_AWS__ACCESS__KEY__ID` | openproject-worker | (secret) | Bucket access key |
| `OPENPROJECT_COLLABORATIVE__EDITING__HOCUSPOCUS__URL` | openproject-worker | - | Collaborative editing websocket URL |
| `OPENPROJECT_FOG_CREDENTIALS_AWS__SECRET__ACCESS__KEY` | openproject-worker | (secret) | Bucket secret key |
| `OPENPROJECT_COLLABORATIVE__EDITING__HOCUSPOCUS__SECRET` | openproject-worker | (secret) | Must match the web service |
| `PORT` | hocuspocus | 1234 | Websocket server port |
| `SECRET` | hocuspocus | (secret) | Token key, must match the web service |
| `OPENPROJECT_URL` | hocuspocus | http://openproject-web.railway.internal:8080 | Private API base URL for token validation |
| `OPENPROJECT_HTTPS` | hocuspocus | true | Send X-Forwarded-Proto on API callbacks |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/bash -c "exec ./docker/prod/cron"`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/bash -c "until ./docker/prod/seeder; do echo '[boot] seeder failed; retrying in 10s'; sleep 10; done; exec ./docker/prod/web"`
- **Healthcheck:** `/health_checks/all`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/bash -c "exec bundle exec good_job start"`
- **Healthcheck:** `/status/connected`
- **Healthcheck:** `/`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openproject-server)
