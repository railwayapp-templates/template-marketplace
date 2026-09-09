# Deploy OceanBase seekdb on Railway

MySQL-compatible hybrid search database with a protected console.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/oceanbase-seekdb)

## About

MySQL-compatible hybrid search database with a protected console.

**Deployment template.** Deployment incurs Railway charges. Supply your own required model, search and external-service credentials; no example provider credentials are included.

This template provisions 1 services in one Railway project, with image digests or upstream source revisions pinned, generated internal credentials, linked environment variables and the persistent paths listed below. Public HTTP routes use Railway HTTPS. SQL and internal dependency endpoints stay private. Keep stateful services single-replica and configure your own backup policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| seekdb | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CPU_COUNT` | 2 | Cpu count for seekdb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DATABASE_URL` | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `MEMORY_LIMIT` | 4G | Memory limit for seekdb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DATAFILE_NEXT` | 256M | Datafile next for seekdb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DATAFILE_SIZE` | 512M | Datafile size for seekdb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LOG_DISK_SIZE` | 2G | Log disk size for seekdb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ROOT_PASSWORD` | (secret) | Generated root password. Keep private and preserve with backups. |
| `SEEKDB_DATABASE` | test | Seekdb database for seekdb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DATAFILE_MAXSIZE` | 2G | Datafile maxsize for seekdb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/seekdb`

**Category:** Storage · **Languages:** JavaScript, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/oceanbase-seekdb)
