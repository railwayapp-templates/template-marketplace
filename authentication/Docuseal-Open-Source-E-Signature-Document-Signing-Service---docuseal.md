# Deploy Docuseal (Open-Source E-Signature & Document Signing Service) on Railway

Docuseal [Mar ’26] (DocuSign & HelloSign alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/docuseal)

## About

Docuseal is a free, open-source e-signature platform available on GitHub, designed to help teams and businesses securely sign, send, and manage digital documents. Positioned as a **DocuSign alternative**, Docuseal provides self-hosted control over sensitive agreements while offering a clean interface, API integrations, and strong privacy compliance. The active developer community maintains the Docuseal GitHub repository, making it a trusted solution for organizations seeking affordable and private e-signature tools.

You can **self host Docuseal** to keep all your document workflows, templates, and signed agreements fully under your control. Unlike third-party e-signature platforms that store your data on external servers, Docuseal ensures that everything runs in your private environment. With **Docuseal Docker** deployment, you get a containerized, lightweight, and scalable setup. Railway simplifies the hosting experience by letting you deploy Docuseal in just a few clicks, without manual server management.

With Railway, you benefit from automated scaling, environment variable management, and easy log access. This makes deploying **private Docuseal instances** ideal for startups, SMEs, and enterprises wanting a balance between usability, security, and cost-efficiency.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis | `redis:8.2.1` | Database |
| docuseal | `docuseal/docuseal:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `FORCE_SSL` | docuseal | true | - |
| `STORAGE_PATH` | docuseal | /data/storage | - |
| `SMTP_PASSWORD` | docuseal | (secret) | - |
| `SMTP_USERNAME` | docuseal | (secret) | - |
| `SECRET_KEY_BASE` | docuseal | (secret) | - |
| `SMTP_AUTHENTICATION` | docuseal | login | - |
| `SMTP_ENABLE_STARTTLS_AUTO` | docuseal | false | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/template/docuseal)
