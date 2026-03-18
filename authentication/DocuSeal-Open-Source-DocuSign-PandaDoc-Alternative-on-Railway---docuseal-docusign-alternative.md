# Deploy DocuSeal – Open-Source DocuSign, PandaDoc Alternative on Railway on Railway

Self-host DocuSeal — Unlimited E-Signature & PDF Signing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/docuseal-docusign-alternative)

## About

Self-host DocuSeal — the open source DocuSign and PandaDoc alternative — on Railway in one click. This template deploys the full production stack from [docusealco/docuseal](https://github.com/docusealco/docuseal): a DocuSeal app server, a dedicated PostgreSQL database for persistent document storage, and a Redis instance for background job processing. All three services communicate over Railway's private network with zero additional configuration.

![DocuSeal Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773512155/Docuseal_railway_arch_iscy3v.png)

DocuSeal is an open source platform for creating, filling, and signing digital documents. It replaces expensive per-seat or per-envelope SaaS tools with a self-hosted instance your team fully controls. Built with Ruby on Rails and Vue.js, it ships as the Docker image `docuseal/docuseal:latest`.

Key features:
- WYSIWYG PDF form builder with 10 field types (Signature, Text, Date, Checkbox, Image, Multi-select, Cells, and more)
- Multi-party signing with each submitter receiving their own completed copy
- REST API and embeddable JavaScript widget for integrating signing flows into your own apps
- Automated SMTP email invitations and audit trails for every document
- File storage options: local disk, AWS S3, Google Cloud Storage, or Azure Blob Storage
- eSignature compliance with ESIGN, UETA, and eIDAS regulations

In this Railway template, DocuSeal connects to Postgres over the private Railway network using `DATABASE_URL` and delegates background jobs (email delivery, PDF processing) to Redis via `REDIS_URL`. Both dependencies are provisioned automatically as separate Railway services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Docuseal | `docuseal/docuseal:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal hostname for Redis service |
| `REDISPORT` | Redis | 6379 | Default Redis server port |
| `REDISUSER` | Redis | default | Redis authentication username |
| `REDIS_URL` | Redis | - | Internal Redis connection URI |
| `REDISPASSWORD` | Redis | (secret) | Redis password alias variable |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | External Redis connection string |
| `HOST` | Docuseal | - | Public domain of DocuSeal instance |
| `FORCE_SSL` | Docuseal | true | Force HTTPS connections |
| `REDIS_URL` | Docuseal | - | Redis connection string for background jobs |
| `DATABASE_URL` | Docuseal | - | Postgres connection string for DocuSeal |
| `SECRET_KEY_BASE` | Docuseal | (secret) | Secret used for encryption and sessions |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres administrator user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated password for Postgres user |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/template/docuseal-docusign-alternative)
