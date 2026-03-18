# Deploy MySQL Gzip backup to Cloudflare R2 on Railway

MySQL Backup to Cloudflare R2

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wYvGYt)

## About

A Docker container that provides automated MySQL database backups to Cloudflare R2 storage using rclone. This solution offers secure, scheduled backups with compression, retention policy management, and multi-database support. Perfect for maintaining reliable database backups in a cloud environment with minimal configuration required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mysql backup to Cloudflare R2 | [javiergarzac/cloudflare-r2-rclone-mysql-backup](https://github.com/javiergarzac/cloudflare-r2-rclone-mysql-backup) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `R2_BUCKET` | - | Bucket name |
| `MYSQL_USER` | (secret) | - |
| `MYSQL_PASSWORD` | (secret) | - |
| `R2_S3_ENDPOINT` | - | Cloudflare R2 API URL for S3 |
| `R2_ACCESS_KEY_ID` | - | Cloudflare R2 access key |
| `R2_SECRET_ACCESS_KEY` | (secret) | Cloudflare R2 access key secret |

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/wYvGYt)
