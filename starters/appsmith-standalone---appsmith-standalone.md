# Deploy appsmith-standalone on Railway

Open-source platform to build internal tools and dashboards on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appsmith-standalone)

## About

Railway provides a modern, streamlined platform for deploying web applications and databases. This template bundles **Appsmith** — the open-source platform for building internal tools, admin panels, and dashboards — running on the official Docker image with built-in storage. One-click deploy, persistent data, zero vendor lock-in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| appsmith | [marco-quintella/appsmith-standalone](https://github.com/marco-quintella/appsmith-standalone) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `APPSMITH_ENCRYPTION_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/appsmith-stacks`

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/appsmith-standalone)
