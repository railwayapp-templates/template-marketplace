# Deploy Kaku CMS on Railway

A headless CMS in Go.  — posts, pages, tags, media, users, and Content API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kaku-cms)

## About

A headless CMS in Go. Ghost's authoring half, nothing else — markdown posts and pages, tags, media,
users, and a read-only Content API. No themes, no members, no newsletters.

Single static binary, no CGO. SQLite for storage, S3-compatible object storage for media.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kaku CMS | `ghcr.io/rizkychandra/kaku:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `KAKU_ENV` | production | Prod or dev |
| `KAKU_URL` | - | URL |
| `KAKU_ADDR` | :8080 | Port |
| `KAKU_DB_PATH` | ./data/kaku.db | DB File |
| `KAKU_S3_BUCKET` | - | S3 Bucket |
| `KAKU_S3_REGION` | - | S3 Region |
| `KAKU_ROOT_EMAIL` | root@gmail.com | Owner account, created on first boot. Required unless the database already has users. |
| `KAKU_S3_ENDPOINT` | - | S3 Endpoint |
| `KAKU_ROOT_PASSWORD` | (secret) | Owner Account Password |
| `KAKU_S3_ACCESS_KEY` | - | S3 Access Key |
| `KAKU_S3_SECRET_KEY` | (secret) | S3 SECRET |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/kaku-cms)
