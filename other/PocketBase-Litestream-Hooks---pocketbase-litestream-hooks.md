# Deploy PocketBase + Litestream + Hooks on Railway

PocketBase with Litestream backups, easy hooks and api rules management.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-litestream-hooks)

## About

Production ready PocketBase template with 

- litestream automated streaming backups (PITR)
- easy to manage hooks dashboard plugin
- easy to manage pb api rules dashboard plugin
- improved security with defined origins support only

Allows you to deploy any pocketbase version, any s3 bucket for backups and easily manage your hooks within railway as well as see your api rules through plugins.

After deploying the template create your first admin user and visit

1) PB Hooks Dashboard: https://yoursite.com/hooks-dash
2) PB Api Rules Dashboard: https://yoursite.com/rules-overview.html

Both are piggy-backing your admin token so they are safe to use!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pocketbase + Litestream + Hooks and Api Rules | [orenaksakal/pocketbase-litestream-railway](https://github.com/orenaksakal/pocketbase-litestream-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `S3_PATH` | backups | S3 Bucket path Litestream should use |
| `S3_BUCKET` | - | S3 Bucket name Litestream should use |
| `S3_REGION` | - | S3 Bucket region Litestream should use |
| `PB_ORIGINS` | - | Origin urls you would like your api to support e.g. http://localhost:3000 or https://www.yoursite.com |
| `PB_VERSION` | 0.36.4 | Pocketbase version you would like to deploy |
| `S3_ENDPOINT` | - | S3 Bucket endpoint Litestream should use |
| `DASH_REPO_URL` | https://github.com/orenaksakal/pb-hooks-dash/archive/refs/heads/main.zip | Hooks dashboard plugin source url |
| `S3_ACCESS_KEY` | - | S3 Bucket access key Litestream should use |
| `S3_SECRET_KEY` | (secret) | S3 Bucket secret key Litestream should use |
| `RULES_REPO_URL` | https://github.com/orenaksakal/pb-rules-overview/archive/refs/heads/main.zip | Pocketbase rules board plugin source url |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/pb_data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/pocketbase-litestream-hooks)
