# Deploy gitea + minio on Railway

Gitea is a lightweight, fast, and open-source Git repository.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hE8UhH)

## About

# Gitea - Self-Hosted Git Repository  

## 🏠 Self-Hosting  
Allows teams and organizations to have **full control** over their repositories without relying on external services.  

## 🔥 Key Features  
- **📂 Git Version Control** – Full management of commits, branches, and history.  
- **🔄 Pull Requests & Code Review** – Facilitates collaboration and code review.  
- **🚀 CI/CD** – Integration with Drone CI, GitHub Actions, and other tools.  
- **📦 Package Storage** – Supports Docker, Maven, npm, PyPI, and more.  
- **📌 Issues & Projects** – Tracks issues and helps with project planning.  
- **📖 Wiki & Documentation** – Create documentation directly within repositories.  

Gitea is an excellent alternative for teams looking for autonomy and flexibility in software development. 🚀

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gitea | `gitea/gitea` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Bucket | `minio/minio:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | gitea | 3000 | - |
| `GITEA__mailer__USER` | gitea | (secret) | - |
| `GITEA__database__USER` | gitea | (secret) | - |
| `GITEA__mailer__ENABLED` | gitea | false | - |
| `GITEA__database__DB_TYPE` | gitea | postgres | - |
| `GITEA__session__PROVIDER` | gitea | db | - |
| `GITEA__api__ENABLE_SWAGGER` | gitea | false | - |
| `GITEA__server__DISABLE_SSH` | gitea | true | - |
| `GITEA__server__LANDING_PAGE` | gitea | login | - |
| `GITEA__storage__MINIO_BUCKET` | gitea | git | - |
| `GITEA__storage__SERVE_DIRECT` | gitea | false | - |
| `GITEA__storage__STORAGE_TYPE` | gitea | minio | - |
| `GITEA__storage__MINIO_USE_SSL` | gitea | false | - |
| `GITEA__storage__MINIO_LOCATION` | gitea | us-east-1 | - |
| `GITEA__repository__FORCE_PRIVATE` | gitea | true | - |
| `GITEA__other__SHOW_FOOTER_VERSION` | gitea | false | - |
| `GITEA__repository__DEFAULT_PRIVATE` | gitea | true | - |
| `GITEA__service__REQUIRE_SIGNIN_VIEW` | gitea | true | - |
| `GITEA__other__SHOW_FOOTER_POWERED_BY` | gitea | false | - |
| `GITEA__service__DISABLE_REGISTRATION` | gitea | true | - |
| `GITEA__service__ENABLE_OPENID_SIGNIN` | gitea | false | - |
| `GITEA__service__ENABLE_OPENID_SIGNUP` | gitea | false | - |
| `GITEA__storage__MINIO_SECRET_ACCESS_KEY` | gitea | (secret) | - |
| `GITEA__service__SHOW_REGISTRATION_BUTTON` | gitea | false | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Bucket | 9000 | - |
| `MINIO_ROOT_USER` | Bucket | (secret) | - |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | - |
| `MINIO_BROWSER_REDIRECT_URL` | Bucket | localhost:9090 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`

**Category:** Other

[View on Railway →](https://railway.com/deploy/hE8UhH)
