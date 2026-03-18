# Deploy Slink on Railway

Self-hosted image sharing service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/slink)

## About

&gt; **First login note**
&gt; After deployment, Railway will generate an `ADMIN_PASSWORD` environment variable. Copy this value and use it to log in with the admin email you configured during setup. You can rotate this password later from the admin settings panel.

![screenshot](https://i.postimg.cc/vmBWVYrk/Screenshot-2026-01-07-at-00-37-24.png)

Slink is a self-hosted image sharing platform that provides private, secure, and fully controlled image hosting without relying on third-party services. Built with Symfony on the backend and SvelteKit on the frontend, it supports modern image formats, tagging, sharing, and API-driven workflows for individuals and teams.

Hosting Slink involves running a PHP/Symfony application alongside its frontend and storage layer. Railway handles container orchestration, environment configuration, and networking, allowing you to deploy Slink without managing servers manually. You configure storage (local or S3-compatible), database access, and admin credentials via environment variables. Railway’s scaling and observability features make it straightforward to operate Slink in both personal and small-team contexts, while keeping the deployment reproducible and easy to update as new releases are published.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Slink | `anirdev/slink:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | App timezone. |
| `PORT` | 3000 | Server port. |
| `ORIGIN` | - | Host public URL origin. |
| `ADMIN_EMAIL` | - | Administrator email to use to login. |
| `ADMIN_PASSWORD` | (secret) | Administrator email to use to login. |
| `ADMIN_USERNAME` | (secret) | Administrator username to login. |
| `IMAGE_MAX_SIZE` | 15M | Maximum image size per upload. |
| `STORAGE_PROVIDER` | local | Storage provider to point to local volume. |
| `USER_APPROVAL_REQUIRED` | false | Require approving user emails to activate to upload. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`

**Category:** Other

[View on Railway →](https://railway.com/deploy/slink)
