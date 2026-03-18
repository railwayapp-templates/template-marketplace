# Deploy redis-backuper-s3 on Railway

backup your redis db and upload to a s3 bucket

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/redis-backuper-s3)

## About

A lightweight Python service that automatically backs up Redis/Valkey databases to any S3-compatible storage on a configurable schedule. Supports authentication and timestamped backups with proper error handling and logging.

Deploying redis-backuper-s3 involves running a containerized Python service that connects to your Redis instance and periodically creates RDB dumps, uploading them to S3-compatible storage. The service runs continuously with configurable cron scheduling, handles authentication, and provides comprehensive logging. It's designed to be stateless and requires minimal resources, making it perfect for automated database backup workflows in production environments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis Backuper | [lassejlv/redis-backuper](https://github.com/lassejlv/redis-backuper) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `S3_PREFIX` | /var/lib/redis-backups |
| `CRON_SCHEDULE` | 0 * * * * |
| `S3_SECRET_KEY` | (secret) |
| `REDIS_PASSWORD` | (secret) |

**Category:** Automation · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/redis-backuper-s3)
