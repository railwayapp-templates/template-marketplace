# Deploy Instatic on Railway

Self-hosted visual CMS and website builder for static sites.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/instatic)

## About

Instatic is a modern self-hosted visual website builder for creating, editing, and publishing static websites from a simple web interface. This template uses the `corebunch/instatic:latest` Docker image and is designed for a lightweight Railway deployment with persistent storage support.

Hosting Instatic gives you a self-hosted website editing and publishing tool that runs as a containerized service. It provides a visual workflow for managing pages, assets, and static site content without requiring a complex multi-service setup.

This template is suitable for users who want a simple website builder that can be launched quickly, managed independently, and used for personal sites, landing pages, documentation pages, small business websites, or internal content portals.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| instatic | `corebunch/instatic:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `STATIC_DIR` | /app/dist |
| `UPLOADS_DIR` | /app/storage/uploads |
| `DATABASE_URL` | sqlite:/app/storage/data/cms.db |
| `INSTATIC_SECRET_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/instatic)
