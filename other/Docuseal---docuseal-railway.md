# Deploy Docuseal on Railway

DocuSign alternative. PDF forms, e-signatures, audit trails and more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docuseal-railway)

## About

DocuSeal is open-source document filling and e-signature software, a self-hosted alternative to DocuSign, PandaDoc and Dropbox Sign. Upload a PDF, place fields on it in a WYSIWYG builder, send signers a link, and get back a signed PDF with a real PKCS#7 signature and an audit log. Teams self-host it when contracts cannot sit in a vendor account.

Self-host DocuSeal on Railway from the official `docuseal/docuseal:3.1.7` image on port `3000`, health-checked at `/up`. Run DocuSeal on Railway with managed **Postgres** for records, managed **Redis** as the Sidekiq broker and an **object storage bucket** for documents, served as presigned links. The container is stateless — no volume needed.

![DocuSeal Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786641721/9d798d03-ea89-462c-b68c-a041e0788609.png)

Self-host DocuSeal when documents are regulated, when volume makes per-envelope pricing absurd, or when signing belongs in your product.

- **WYSIWYG PDF form builder** — 12 field types including signature, initials and date.
- **Multiple submitters per document**, each with its own role, fields and link.
- **Automatic PDF e-signature** — detached PKCS#7 signature plus an audit-log PDF.
- **REST API, webhooks and an MCP server endpoint** for scripted and AI workflows.
- **7 UI languages, signing in 14**; storage adapters for disk, S3, GCS, Azure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| docuseal | `docuseal/docuseal` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |
| `HOST` | docuseal | - | Public hostname for generated links |
| `PORT` | docuseal | 3000 | HTTP port, matches public target port |
| `APP_URL` | docuseal | - | Public base URL, overrides stored value |
| `FORCE_SSL` | docuseal | true | Enables assume_ssl, force_ssl and HSTS |
| `REDIS_URL` | docuseal | - | Sidekiq broker, disables embedded Redis |
| `AWS_REGION` | docuseal | - | Bucket region |
| `S3_ENDPOINT` | docuseal | - | Forces path-style bucket addressing |
| `DATABASE_URL` | docuseal | - | Postgres connection string |
| `SECRET_KEY_BASE` | docuseal | (secret) | Signs sessions, must stay stable |
| `WEB_CONCURRENCY` | docuseal | 0 | Single Puma worker with embedded Sidekiq |
| `AWS_ACCESS_KEY_ID` | docuseal | - | Bucket access key id |
| `ENCRYPTION_SECRET` | docuseal | (secret) | Keys encrypted config, 64 hex minimum |
| `AWS_SECRET_ACCESS_KEY` | docuseal | (secret) | Bucket secret access key |
| `S3_ATTACHMENTS_BUCKET` | docuseal | - | Selects S3 storage over local disk |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/docuseal-railway)
