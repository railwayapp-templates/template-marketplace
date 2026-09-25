# Deploy Label Studio on Railway

Label Studio 1.23 data labeling for text, images and audio, on Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/label-studio-2)

## About

Label Studio is an open-source data labeling tool for machine learning. Teams annotate text, images, audio, video and time series with configurable interfaces for classification, named entities, bounding boxes, segmentation and LLM evaluation. It exports to common formats and connects to model backends for pre-labeling and active learning through its API and Python SDK.

This template deploys Label Studio v1.23.0 from the official image with a Railway Postgres database. Uploaded files and media live on a Railway volume, so they survive redeploys. The admin account is created from environment variables on first start, and sign-up without an invite link is disabled. CSRF and host settings point at your Railway domain, so login works behind Railway's HTTPS proxy. For API access, create a personal access token in the account settings. It fits the Hobby plan for small projects. Back up Postgres and the volume regularly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| labelstudio | `heartexlabs/label-studio:1.23.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | labelstudio | 8080 |
| `DJANGO_DB` | labelstudio | default |
| `POSTGRE_USER` | labelstudio | (secret) |
| `POSTGRE_PASSWORD` | labelstudio | (secret) |
| `LABEL_STUDIO_PASSWORD` | labelstudio | (secret) |
| `LABEL_STUDIO_USERNAME` | labelstudio | (secret) |
| `LABEL_STUDIO_DISABLE_SIGNUP_WITHOUT_LINK` | labelstudio | true |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/label-studio/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/label-studio-2)
