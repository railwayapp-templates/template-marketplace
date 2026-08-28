# Deploy Webstudio on Railway

Advanced Open Source Website Builder

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/webstudio)

## About

Webstudio is an open-source visual development platform and Webflow alternative. Designers and developers build sites in a full CSS canvas, connect any headless CMS, and publish static or SSR projects they actually own. This template self-hosts the full builder stack on Railway — Remix builder, PostgREST, Postgres, MinIO asset storage, and the community publisher.

Hosting Webstudio means running five containers on Railway’s private network: a public builder (Remix visual editor), a public publisher (one-click Publish output), Postgres for projects and users, PostgREST as the REST API over that database, and MinIO as S3-compatible asset storage. Railway terminates TLS, so every container speaks HTTP internally and binds `0.0.0.0:${PORT}`. You attach volumes for Postgres, MinIO, and the publisher’s publish/work directories, generate secrets once on the `webstudio` service, and let each entrypoint wait over IPv6 private DNS, run Prisma migrations, then `exec` the main process. First boot can take a few minutes while images pull and migrations apply. After that, sign in with `DEV_LOGIN` (password = `AUTH_SECRET`) and start a project.

The official `ghcr.io/webstudio-is/webstudio` registry only has two-year-old sha tags and no current `latest` builder. This kit wraps the production self-host images from [webstudio-community/webstudio-self-host](https://github.com/webstudio-community/webstudio-self-host): `ghcr.io/webstudio-community/builder:latest` and `ghcr.io/webstudio-community/webstudio-publisher:latest`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | [OpenSource-Templates/Webstudio](https://github.com/OpenSource-Templates/Webstudio) (root: /postgres) | Worker |
| publisher | [OpenSource-Templates/Webstudio](https://github.com/OpenSource-Templates/Webstudio) (root: /publisher) | Web service |
| webstudio | [OpenSource-Templates/Webstudio](https://github.com/OpenSource-Templates/Webstudio) (root: /webstudio) | Web service |
| postgrest | [OpenSource-Templates/Webstudio](https://github.com/OpenSource-Templates/Webstudio) (root: /postgrest) | Worker |
| minio | [OpenSource-Templates/Webstudio](https://github.com/OpenSource-Templates/Webstudio) (root: /minio) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | webstudio | Database name. init.sql runs only on empty PGDATA. |
| `POSTGRES_USER` | postgres | (secret) | Superuser. Matches DATABASE_URL. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Same secret as the builder. Do not generate a new one. |
| `PORT` | publisher | 8080 | - |
| `DOMAIN` | publisher | - | Public domain where Betterlytics is accessible. Railway automatically provides this domain. |
| `BUILDER_HOST` | publisher | webstudio.railway.internal | Wait-for host. |
| `BUILDER_PORT` | publisher | - | Wait-for port. Builder binds Railway PORT. |
| `PUBLISHER_HOST` | publisher | - | Same suffix the builder uses. Point a wildcard custom domain here for project.yourdomain.com. |
| `BUILDER_INTERNAL_URL` | publisher | - | HTTP to the builder over private DNS. Never https and never localhost. |
| `TRPC_SERVER_API_TOKEN` | publisher | (secret) | Must match the builder. |
| `PORT` | webstudio | 8080 | - |
| `DOMAIN` | webstudio | - | Public domain where Betterlytics is accessible. Railway automatically provides this domain. |
| `S3_ACL` | webstudio | public-read | Objects are anonymously downloadable. |
| `FEATURES` | webstudio | * | Compose-compat alias used by some image builds. |
| `NODE_ENV` | webstudio | production | Remix production mode. |
| `DEV_LOGIN` | webstudio | (secret) | Enables email+password login. Password is the value of AUTH_SECRET. |
| `S3_BUCKET` | webstudio | webstudio-assets | Object bucket created on first MinIO boot. |
| `S3_REGION` | webstudio | us-east-1 | Dummy region required by the AWS SDK. MinIO ignores it. |
| `USER_PLAN` | webstudio | Pro | Plan granted to every user on this instance. |
| `DIRECT_URL` | webstudio | - | Prisma direct URL. Same as DATABASE_URL; there is no PgBouncer. |
| `MINIO_HOST` | webstudio | minio.railway.internal | Wait-for target. |
| `MINIO_PORT` | webstudio | - | MinIO listens on Railway PORT. |
| `AUTH_SECRET` | webstudio | (secret) | Session cookie signing key. With DEV_LOGIN=true this is also the login password. |
| `S3_ENDPOINT` | webstudio | - | Public path-style S3 URL so canvas images load in the browser. |
| `DATABASE_URL` | webstudio | - | Prisma URL over private IPv6 DNS. sslmode=disable because Railway private net is plain HTTP. |
| `FEATURE_FLAGS` | webstudio | * | Enable all builder feature flags. |
| `POSTGREST_URL` | webstudio | - | Internal PostgREST base URL. |
| `POSTGRES_HOST` | webstudio | postgres.railway.internal | Wait-for target. Change only if you rename the service. |
| `POSTGRES_PORT` | webstudio | 5432 | Postgres port on the private network. |
| `DEPLOYMENT_URL` | webstudio | - | Public builder URL, no trailing slash. Cookies and OAuth callbacks. |
| `POSTGREST_HOST` | webstudio | postgrest.railway.internal | Wait-for target. |
| `POSTGREST_PORT` | webstudio | 3000 | PostgREST private port. |
| `PUBLISHER_HOST` | webstudio | - | Suffix for published project hosts. Replace with a wildcard custom domain for real sites. |
| `DEV_LOGIN_EMAIL` | webstudio | (secret) | First login email. Change this. |
| `MINIO_ROOT_USER` | webstudio | (secret) | MinIO access key. Must match S3_ACCESS_KEY_ID. |
| `PGRST_JWT_SECRET` | webstudio | (secret) | HS256 secret for PostgREST JWTs. Must be at least 64 characters. |
| `S3_ACCESS_KEY_ID` | webstudio | webstudio | Same value as MINIO_ROOT_USER. |
| `AUTH_WS_CLIENT_ID` | webstudio | self-hosted | OAuth client id for the Webstudio CLI (webstudio link). |
| `POSTGRES_PASSWORD` | webstudio | (secret) | Generated once. Postgres and PostgREST must reference this, not mint a second secret. |
| `MINIO_ROOT_PASSWORD` | webstudio | (secret) | MinIO secret key. Must match S3_SECRET_ACCESS_KEY. |
| `S3_SECRET_ACCESS_KEY` | webstudio | (secret) | Same secret as MINIO_ROOT_PASSWORD. |
| `AUTH_WS_CLIENT_SECRET` | webstudio | (secret) | OAuth client secret for the CLI. Required in production. |
| `TRPC_SERVER_API_TOKEN` | webstudio | (secret) | Shared service token between builder and publisher. |
| `DEPLOYMENT_ENVIRONMENT` | webstudio | production | Required. Never set development on Railway. |
| `MAX_ASSETS_PER_PROJECT` | webstudio | 50 | Upload cap per project. |
| `SELF_HOSTED_PUBLISHER_URL` | webstudio | - | Internal publish API. Port 4000, not the public site-proxy port. |
| `PORT` | postgrest | 3000 | Railway often does not publish it on the private DNS mesh |
| `PGRST_DB_URI` | postgrest | - | Direct Postgres URI over private DNS. |
| `POSTGRES_HOST` | postgrest | postgres.railway.internal | Wait-for target. |
| `POSTGRES_PORT` | postgrest | 5432 | Postgres port. |
| `PGRST_DB_SCHEMAS` | postgrest | public | Exposed schema. |
| `PGRST_JWT_SECRET` | postgrest | (secret) | Must match the builder. |
| `PGRST_SERVER_HOST` | postgrest | * | Listen on IPv4 and IPv6. Railway private DNS is IPv6. |
| `PGRST_SERVER_PORT` | postgrest | 3000 | Private port. Do not give this service a public domain. |
| `PGRST_DB_ANON_ROLE` | postgrest | anon | Role used for PostgREST requests. |
| `PORT` | minio | 9900 | Service Port |
| `DOMAIN` | minio | - | Public domain where Betterlytics is accessible. Railway automatically provides this domain. |
| `S3_BUCKET` | minio | - | Created on first boot with anonymous download. |
| `MINIO_UPDATE` | minio | off | Disable in-container update checks. |
| `MINIO_BROWSER` | minio | off | Console is not exposed. API only. |
| `MINIO_ROOT_USER` | minio | (secret) | Access key. Same as S3_ACCESS_KEY_ID. |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Secret key. Same as S3_SECRET_ACCESS_KEY. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** JavaScript, Shell, Python, Dockerfile, PLpgSQL

[View on Railway →](https://railway.com/deploy/webstudio)
