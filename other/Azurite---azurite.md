# Deploy Azurite on Railway

A lightweight Azure Storage emulator for Blob, Queue, and Table services.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/azurite)

## About

Azurite is a lightweight Azure Storage emulator for Blob, Queue, and Table services. It provides Azure Storage-compatible APIs for local development, integration testing, CI/CD, and application testing without requiring a real Azure Storage account.

This template deploys Azurite on Railway using the official Microsoft container image.

Azurite emulates three Azure Storage services:

* Azure Blob Storage
* Azure Queue Storage
* Azure Table Storage

Each service runs on its own port while sharing the same Azurite instance.

This template also includes persistent storage so emulator data can survive service restarts and redeployments.

No PostgreSQL, MySQL, Redis, or other external database is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| azurite | `mcr.microsoft.com/azure-storage/azurite` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 10000 | Railway HTTP target port for Blob Storage |

## Configuration

- **Start command:** `sh -c 'azurite --location /data --blobHost 0.0.0.0 --blobPort 10000 --queueHost 0.0.0.0 --queuePort 10001 --tableHost 0.0.0.0 --tablePort 10002'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/azurite)
