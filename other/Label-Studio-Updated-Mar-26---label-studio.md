# Deploy Label Studio [Updated Mar ’26] on Railway

Label Studio [Mar ’26] (Label Data for ML & AI Training) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/label-studio)

## About

Label Studio is an open-source data labeling and annotation tool that allows you to create, manage, and automate labeling tasks for machine learning datasets. Available on GitHub, Label Studio empowers developers, data scientists, and AI teams to annotate images, text, audio, and video data - all within a single, unified interface. Whether you're working on computer vision, natural language processing, or speech recognition projects, Label Studio provides the flexibility manage your data labeling workflow effectively.

You can self-host Label Studio on Railway to gain full control over your data, annotations, and labeling pipelines without relying on third-party servers. Self-hosting ensures privacy, scalability, and security for your machine learning datasets.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| label-studio | [Shinyduo/railway-labelstudio](https://github.com/Shinyduo/railway-labelstudio) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `TZ` | label-studio | UTC |
| `PORT` | label-studio | 8080 |
| `DJANGO_DB` | label-studio | default |
| `SECRET_KEY` | label-studio | (secret) |
| `POSTGRE_USER` | label-studio | (secret) |
| `POSTGRE_PASSWORD` | label-studio | (secret) |
| `LABEL_STUDIO_PORT` | label-studio | 8080 |
| `CSRF_COOKIE_SECURE` | label-studio | 1 |
| `LABEL_STUDIO_DEBUG` | label-studio | false |
| `CSRF_TRUSTED_ORIGINS` | label-studio | https://*.up.railway.app |
| `DJANGO_ALLOWED_HOSTS` | label-studio | .up.railway.app,localhost,127.0.0.1 |
| `SESSION_COOKIE_SECURE` | label-studio | 1 |
| `LABEL_STUDIO_ADMIN_EMAIL` | label-studio | admin@example.com |
| `LABEL_STUDIO_LOCAL_FILES_DOCUMENT_ROOT` | label-studio | /label-studio/data |
| `LABEL_STUDIO_LOCAL_FILES_SERVING_ENABLED` | label-studio | true |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `label-studio start --port 8080`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/label-studio/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/label-studio)
