# Deploy Docs on Railway

Collaborative document editor for writing and sharing as a team

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docs)

## About

Docs is an open-source collaborative editor from La Suite numérique, the digital services team inside the French government's DINUM, used daily by civil servants instead of Notion or Google Docs. Several people type in one document at once, see each other's cursors, leave comments, nest subpages, and export to Markdown, `.docx`, `.odt` or PDF. It is MIT-licensed and a verified Digital Public Good.

Self-host Docs on Railway and this template brings up the whole production shape, not a single container: an nginx front end serving the editor and routing every API call, the Django backend, a Celery worker, the Yjs collaboration server carrying live keystrokes over WebSockets, Keycloak, two Postgres databases, Redis and an object storage bucket. Browsers talk to one hostname; everything behind it stays on Railway's private network.

![Docs services on Railway with Keycloak, Postgres and Redis](https://res.cloudinary.com/rroe4rtk/image/upload/v1788327346/docs-architecture.png)

Most collaborative editors live somewhere you do not control. Teams handling internal policy, incident notes or anything under a data-residency rule cannot put that text in a hosted SaaS product, and the usual fallback — a wiki nobody enjoys writing in — loses what people want most: two people editing one paragraph at once.

Key features:

- Real-time co-editing with live cursors and presence, backed by Yjs CRDTs
- Rich text with slash commands, Markdown shortcuts and offline editing
- Comments, reactions and per-document roles: owner, editor, reader
- Subpages, a document tree and full-text search
- Presentation mode, plus PDF, `.docx`, `.odt` and Markdown export
- Optional AI actions behind your own model endpoint, and a resource-server API

Each service earns its place. **docs** is nginx: it serves the compiled editor and proxies `/api`, `/admin`, `/collaboration` and `/media` so the browser sees one origin. **backend** is Django on uvicorn — documents, permissions, invitations, media authorisation. **worker** runs Celery. **y-provider** is the Yjs server every open editor holds a WebSocket to. **keycloak** issues identities from its own **keycloak-db**. **Postgres** stores documents and permissions, **Redis** holds sessions, cache and the job queue, and the **bucket** holds uploads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| keycloak | [gridalpha/docs-railway](https://github.com/gridalpha/docs-railway) (root: keycloak) | Web service |
| backend | [gridalpha/docs-railway](https://github.com/gridalpha/docs-railway) (root: backend) | Worker |
| worker | [gridalpha/docs-railway](https://github.com/gridalpha/docs-railway) (root: backend) | Worker |
| y-provider | `lasuite/impress-y-provider:v5.5.0` | Worker |
| docs | [gridalpha/docs-railway](https://github.com/gridalpha/docs-railway) (root: frontend) | Web service |
| Redis | `redis:8.2` | Database |
| keycloak-db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | keycloak | 8080 | HTTP port probed by the health check |
| `KC_DB` | keycloak | postgres | Database vendor |
| `DOCS_REALM` | keycloak | docs | Realm created at boot |
| `KC_HOSTNAME` | keycloak | - | Public issuer URL |
| `KC_HTTP_PORT` | keycloak | 8080 | Keycloak HTTP listener |
| `DOCS_CLIENT_ID` | keycloak | docs | OpenID Connect client created at boot |
| `KC_DB_PASSWORD` | keycloak | (secret) | Keycloak database password |
| `KC_DB_URL_HOST` | keycloak | - | Keycloak database host |
| `KC_DB_URL_PORT` | keycloak | 5432 | Keycloak database port |
| `KC_DB_USERNAME` | keycloak | (secret) | Keycloak database user |
| `DOCS_PUBLIC_URL` | keycloak | - | Drives the client redirect URIs |
| `KC_HTTP_ENABLED` | keycloak | true | Serve plain HTTP behind the edge |
| `DOCS_ADMIN_EMAIL` | keycloak | admin@example.dev | First Docs user, change before deploying |
| `JAVA_OPTS_APPEND` | keycloak | -XX:MaxRAMPercentage=70 -Djava.net.preferIPv6Addresses=true | Heap and private networking |
| `KC_PROXY_HEADERS` | keycloak | xforwarded | Trust X-Forwarded-* from the edge |
| `KC_DB_URL_DATABASE` | keycloak | - | Keycloak database name |
| `DOCS_ADMIN_PASSWORD` | keycloak | (secret) | Password for that first user |
| `DOCS_ADMIN_LAST_NAME` | keycloak | Administrator | Family name of the first user |
| `DOCS_ADMIN_FIRST_NAME` | keycloak | Docs | Given name of the first user |
| `OIDC_RP_CLIENT_SECRET` | keycloak | (secret) | Secret of that client, shared with Docs |
| `KC_HTTP_MANAGEMENT_PORT` | keycloak | 9000 | Management and metrics listener |
| `KC_BOOTSTRAP_ADMIN_PASSWORD` | keycloak | (secret) | Console administrator password |
| `KC_BOOTSTRAP_ADMIN_USERNAME` | keycloak | (secret) | Console administrator username |
| `KC_HOSTNAME_BACKCHANNEL_DYNAMIC` | keycloak | true | Allow internal backchannel calls |
| `PORT` | backend | 8000 | uvicorn listening port |
| `DOCS_ROLE` | backend | web | Selects the web role in the shared image |
| `REDIS_URL` | backend | - | Cache and session store |
| `DATABASE_URL` | backend | - | Application database |
| `KEYCLOAK_REALM` | backend | docs | Realm holding Docs users |
| `DOCS_PUBLIC_URL` | backend | - | Public origin of the app |
| `Y_PROVIDER_HOST` | backend | - | Private hostname of the collaboration server |
| `DOCS_ADMIN_EMAIL` | backend | - | First administrator email |
| `DJANGO_SECRET_KEY` | backend | (secret) | Signs sessions and tokens |
| `OIDC_RP_CLIENT_ID` | backend | docs | OpenID Connect client id |
| `AWS_S3_REGION_NAME` | backend | - | Bucket region |
| `Y_PROVIDER_API_KEY` | backend | (secret) | Authenticates calls to the collaboration server |
| `AWS_S3_ENDPOINT_URL` | backend | - | Object storage endpoint |
| `DOCS_ADMIN_PASSWORD` | backend | (secret) | First administrator password |
| `KEYCLOAK_PUBLIC_URL` | backend | - | Public origin of the identity provider |
| `AWS_S3_ACCESS_KEY_ID` | backend | - | Object storage access key |
| `OIDC_RP_CLIENT_SECRET` | backend | (secret) | OpenID Connect client secret |
| `AWS_STORAGE_BUCKET_NAME` | backend | - | Bucket holding attachments |
| `AWS_S3_SECRET_ACCESS_KEY` | backend | (secret) | Object storage secret key |
| `LOGGING_LEVEL_LOGGERS_APP` | backend | INFO | Application log level |
| `LOGGING_LEVEL_LOGGERS_ROOT` | backend | INFO | Root log level |
| `COLLABORATION_SERVER_SECRET` | backend | (secret) | Shared collaboration API key |
| `PORT` | worker | 8000 | Liveness endpoint port |
| `DOCS_ROLE` | worker | worker | Selects the Celery role in the shared image |
| `REDIS_URL` | worker | - | Cache and session store |
| `DATABASE_URL` | worker | - | Application database |
| `KEYCLOAK_REALM` | worker | docs | Realm holding Docs users |
| `DOCS_PUBLIC_URL` | worker | - | Public origin of the app |
| `Y_PROVIDER_HOST` | worker | - | Private hostname of the collaboration server |
| `DOCS_ADMIN_EMAIL` | worker | - | First administrator email |
| `DJANGO_SECRET_KEY` | worker | (secret) | Must match the web role |
| `OIDC_RP_CLIENT_ID` | worker | docs | OpenID Connect client id |
| `AWS_S3_REGION_NAME` | worker | - | Bucket region |
| `CELERY_CONCURRENCY` | worker | 2 | Worker processes |
| `Y_PROVIDER_API_KEY` | worker | (secret) | Authenticates calls to the collaboration server |
| `AWS_S3_ENDPOINT_URL` | worker | - | Object storage endpoint |
| `DOCS_ADMIN_PASSWORD` | worker | (secret) | First administrator password |
| `KEYCLOAK_PUBLIC_URL` | worker | - | Public origin of the identity provider |
| `AWS_S3_ACCESS_KEY_ID` | worker | - | Object storage access key |
| `OIDC_RP_CLIENT_SECRET` | worker | (secret) | OpenID Connect client secret |
| `AWS_STORAGE_BUCKET_NAME` | worker | - | Bucket holding attachments |
| `AWS_S3_SECRET_ACCESS_KEY` | worker | (secret) | Object storage secret key |
| `LOGGING_LEVEL_LOGGERS_APP` | worker | INFO | Application log level |
| `LOGGING_LEVEL_LOGGERS_ROOT` | worker | INFO | Root log level |
| `COLLABORATION_SERVER_SECRET` | worker | (secret) | Shared collaboration API key |
| `PORT` | y-provider | 4444 | WebSocket and conversion API port |
| `Y_PROVIDER_API_KEY` | y-provider | (secret) | Authenticates the backend to this service |
| `COLLABORATION_LOGGING` | y-provider | true | Log room connections |
| `COLLABORATION_SERVER_ORIGIN` | y-provider | - | Allowed browser origin |
| `COLLABORATION_SERVER_SECRET` | y-provider | (secret) | Second accepted collaboration API key |
| `COLLABORATION_BACKEND_BASE_URL` | y-provider | - | Where this service calls the API |
| `PORT` | docs | 8083 | nginx listening port for the single origin |
| `DOCS_BACKEND_HOST` | docs | - | Private hostname of the Django API |
| `DOCS_BACKEND_PORT` | docs | 8000 | Django API port |
| `AWS_S3_ENDPOINT_URL` | docs | - | Bucket endpoint for the media gateway |
| `DOCS_YPROVIDER_HOST` | docs | - | Private hostname of the collaboration server |
| `DOCS_YPROVIDER_PORT` | docs | 4444 | Collaboration server port |
| `AWS_STORAGE_BUCKET_NAME` | docs | - | Bucket name for the media gateway |
| `DOCS_CLIENT_MAX_BODY_SIZE` | docs | 100m | Maximum upload size at the proxy |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | docs | 1 | Size nginx workers from the container quota |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | keycloak-db | railway | Database created on first boot |
| `DATABASE_URL` | keycloak-db | - | Private connection string |
| `POSTGRES_USER` | keycloak-db | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | keycloak-db | (secret) | Superuser password |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/realms/docs`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/__heartbeat__`
- **Healthcheck:** `/healthz`
- **Healthcheck:** `/ping`
- **Healthcheck:** `/`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** CMS · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/docs)
