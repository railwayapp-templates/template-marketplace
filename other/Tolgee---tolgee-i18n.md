# Deploy Tolgee on Railway

Translation management platform for apps in multiple languages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tolgee-i18n)

## About

Tolgee is an open-source localization platform for teams shipping software in more than one language. It replaces the spreadsheet-and-JSON-file workflow with a translation editor, a REST API, SDKs for React, Vue, Angular, Next.js, Android and iOS, and a CLI that syncs strings in and out of a repository. Its signature feature is in-context editing: with the SDK loaded, anyone can alt-click a string in the running app and edit it in place, capturing a screenshot that travels with the key so the translator sees where it appears. Self-host Tolgee and that source content — often unreleased copy — stays on infrastructure you control.

Deploy Tolgee on Railway and four pieces arrive wired together. **tolgee** is the application, the `tolgee/tolgee` image serving the editor and API on a public domain. **Postgres** holds every project, key, translation and activity record, and Tolgee migrates its own schema on each boot. **Redis** backs the cache, the rate-limit buckets, the websocket fan-out that keeps two editors in sync, and the locks that stop batch jobs running twice. A bucket holds screenshots, images and avatars, so the app needs no volume and stays stateless.

![Diagram of the Tolgee, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789623099/tolgee-architecture.webp)

Tolgee is a Kotlin/Spring Boot server with a React front end, Apache 2.0 licensed with some enterprise modules under a separate licence. Self-host it when source strings are sensitive, when a per-seat SaaS bill does not fit a team where half the contributors are occasional translators, or when the localization API belongs on your own network.

- In-context editing and one-click screenshot capture from the running app
- SDKs for React, Vue, Angular, Svelte, Next.js, Android, iOS and Unreal, plus REST API and CLI
- Import/export for JSON, PO, XLIFF, Properties, ARB, YAML, CSV and Apple/Android formats
- Machine translation via Google, DeepL, AWS or Azure, and AI translation with your own key

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tolgee | `tolgee/tolgee:latest` | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | tolgee | 8080 | Port Railway probes for health |
| `JAVA_OPTS` | tolgee | -XX:MaxRAMPercentage=70 -Djava.net.preferIPv6Addresses=true | Heap cap and IPv6-first DNS |
| `SERVER_PORT` | tolgee | 8080 | Spring Boot HTTP listener port |
| `TOLGEE_BACK_END_URL` | tolgee | - | Public API URL |
| `TOLGEE_CACHE_ENABLED` | tolgee | true | Enable the application cache |
| `TOLGEE_FRONT_END_URL` | tolgee | - | Public URL in generated links |
| `SPRING_DATASOURCE_URL` | tolgee | - | JDBC connection string |
| `SPRING_DATA_REDIS_HOST` | tolgee | - | Redis private hostname |
| `SPRING_DATA_REDIS_PORT` | tolgee | - | Redis port |
| `TOLGEE_CACHE_USE_REDIS` | tolgee | true | Store cache in Redis |
| `SPRING_DATASOURCE_PASSWORD` | tolgee | (secret) | Database password |
| `SPRING_DATASOURCE_USERNAME` | tolgee | (secret) | Database user |
| `SPRING_DATA_REDIS_PASSWORD` | tolgee | (secret) | Redis auth password |
| `TOLGEE_WEBSOCKET_USE_REDIS` | tolgee | true | Fan websocket events out via Redis |
| `TOLGEE_AUTHENTICATION_ENABLED` | tolgee | true | Required; image profile defaults to false |
| `TOLGEE_FILE_STORAGE_S3_ENABLED` | tolgee | true | Store files in object storage |
| `SERVER_FORWARD_HEADERS_STRATEGY` | tolgee | NATIVE | Trust forwarded headers from the edge |
| `TOLGEE_FILE_STORAGE_S3_ENDPOINT` | tolgee | - | Bucket S3 endpoint |
| `TOLGEE_AUTHENTICATION_JWT_SECRET` | tolgee | (secret) | Signs session tokens |
| `TOLGEE_FILE_STORAGE_S3_ACCESS_KEY` | tolgee | - | Bucket access key |
| `TOLGEE_FILE_STORAGE_S3_SECRET_KEY` | tolgee | (secret) | Bucket secret key |
| `TOLGEE_POSTGRES_AUTOSTART_ENABLED` | tolgee | false | Do not start the bundled database |
| `TOLGEE_FILE_STORAGE_S3_BUCKET_NAME` | tolgee | - | Bucket name |
| `TOLGEE_FILE_STORAGE_S3_SIGNING_REGION` | tolgee | - | SigV4 signing region |
| `TOLGEE_AUTHENTICATION_INITIAL_PASSWORD` | tolgee | (secret) | First administrator password |
| `TOLGEE_AUTHENTICATION_INITIAL_USERNAME` | tolgee | (secret) | First administrator login name |
| `SERVER_TOMCAT_REMOTEIP_INTERNAL_PROXIES` | tolgee | 100\.\d{1,3}\.\d{1,3}\.\d{1,3}|152\.233\.\d{1,3}\.\d{1,3}|127\.\d{1,3}\.\d{1,3}\.\d{1,3}|::1|fd[0-9a-fA-F]{2}:.* | Railway edge ranges for client IP |
| `MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE` | tolgee | health,info | Keep metrics endpoint private |
| `TOLGEE_AUTHENTICATION_REGISTRATIONS_ALLOWED` | tolgee | false | Public sign-up closed |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/actuator/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tolgee-i18n)
