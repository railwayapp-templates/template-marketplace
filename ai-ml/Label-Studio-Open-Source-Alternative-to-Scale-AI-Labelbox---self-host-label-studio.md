# Deploy Label Studio — Open Source Alternative to Scale AI & Labelbox on Railway

Self Host Label Studio. Data labeling for images, text, audio & video.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-host-label-studio)

## About

Label Studio is an open-source, multi-modal data labeling platform that lets your team annotate images, text, audio, video, and time-series data in a single unified interface — with a REST API and ML backend integrations baked in. 

Self-host Label Studio on Railway and you get a fully production-ready annotation environment with PostgreSQL persistence, a mounted volume for uploaded files, and zero infrastructure management. This template deploys `heartexlabs/label-studio:latest` wired to a Railway-managed Postgres instance, so you can run Label Studio on Railway with one click and start labeling within minutes.

![Label Studio Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773597358/label_studio_architecture_gctqsc.png)

Label Studio, maintained by HumanSignal (formerly Heartex) and available at [github.com/HumanSignal/label-studio](https://github.com/HumanSignal/label-studio), solves a core ML problem: getting high-quality, consistently formatted ground-truth labels out of raw data. It supports every common annotation type — bounding boxes, polygons, NER spans, audio segments, keypoints, classifications, and time-series ranges — through a configurable XML interface that teams can tailor to any labeling schema.

Key features:
- Multi-modal annotation: images, text, audio, video, and time-series in one platform
- Customizable labeling interfaces via XML templates
- ML backend integration for pre-labeling and active learning
- REST API and Python SDK for pipeline automation
- Webhook support for triggering downstream workflows
- Export to COCO, Pascal VOC, YOLO, JSON, CSV, and more
- Cloud storage connectors for S3, GCS, and Azure Blob

On Railway, Label Studio connects to Postgres over the private network and persists uploaded task files to a Railway Volume mounted at `/label-studio/data`. Railway handles TLS termination, so no Nginx reverse proxy is needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Label-Studio | `heartexlabs/label-studio:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DJANGO_DB` | Label-Studio | default | Django database configuration name |
| `SECRET_KEY` | Label-Studio | (secret) | Django application secret signing key |
| `POSTGRE_HOST` | Label-Studio | - | Postgres database host reference |
| `POSTGRE_NAME` | Label-Studio | - | Postgres database name reference |
| `POSTGRE_PORT` | Label-Studio | - | Postgres database port reference |
| `POSTGRE_USER` | Label-Studio | (secret) | Postgres database username reference |
| `POSTGRE_PASSWORD` | Label-Studio | (secret) | Postgres database password refer_nce |
| `LABEL_STUDIO_HOST` | Label-Studio | - | Public Label Studio instance URL |
| `CSRF_TRUSTED_ORIGINS` | Label-Studio | - | Trusted origins for CSRF protection |
| `SSRF_PROTECTION_ENABLED` | Label-Studio | true | Enable server-side request protection |
| `LABEL_STUDIO_BASE_DATA_DIR` | Label-Studio | /label-studio/data | Directory storing labeling project data |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/label-studio/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/self-host-label-studio)
