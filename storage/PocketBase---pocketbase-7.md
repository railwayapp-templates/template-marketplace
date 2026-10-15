# Deploy PocketBase on Railway

Open Source realtime backend for SaaS and Mobile Apps in 1 file

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-7)

## About

![PocketBase - open source backend in 1 file](https://i.imgur.com/aCBbjKx.png)

[PocketBase](https://pocketbase.io/) is an open-source backend platform that provides a database, user authentication, file storage, and a REST API in a single package. It includes a web-based administration dashboard and real-time subscriptions, making it a practical choice for developers building web and mobile applications without managing multiple backend services.

Hosting PocketBase on Railway gives you a publicly accessible backend and administration dashboard with minimal setup. Once deployed, Railway provides a generated domain that you can use to access your PocketBase instance and connect your frontend application to its API.

The administration dashboard is available at `/_/` on your generated domain. This template uses port `8090` for HTTP traffic and `/api/health` for health checks. A persistent volume mounted at `/pb/pb_data` stores your application data across container replacements and redeployments.

After deployment, you must create your first superuser account using the installation URL provided in the deployment logs before signing in to the dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PocketBase | `elestio/pocketbase:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8090 | Host Port |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb/pb_data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pocketbase-7)
