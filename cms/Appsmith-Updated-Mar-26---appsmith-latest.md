# Deploy Appsmith [Updated Mar '26] on Railway

Appsmith [Mar '26] (Low-Code App Builder w/ DB/API Integrations) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appsmith-latest)

## About

Appsmith is a free, open-source low-code platform available on GitHub, designed for building internal tools quickly. With Appsmith, you can drag-and-drop widgets, connect databases or APIs, and build powerful dashboards or admin panels with minimal coding. It is supported by a growing open-source community on the Appsmith GitHub repository.

You can **self host Appsmith** to ensure that your apps, data connections, and configurations remain completely under your control. By self-hosting, you avoid vendor lock-in, get full flexibility in managing custom integrations, and control costs more effectively. With Railway, the Appsmith deploy process becomes seamless: you can set up, scale, and manage Appsmith in a matter of minutes without needing deep DevOps expertise.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| appsmith-ee | `appsmith/appsmith-ee:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |

## Configuration

- **Healthcheck:** `/user/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/appsmith-stacks`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/appsmith-latest)
