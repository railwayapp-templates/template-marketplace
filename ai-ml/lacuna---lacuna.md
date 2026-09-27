# Deploy lacuna on Railway

Turn scanned PDFs into a searchable archive and reader site, with OCR

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lacuna)

## About

lacuna turns scanned magazines, journals, and other PDFs into a searchable archive with its own reader site. Upload files in the built-in console and lacuna splits them into pages, runs OCR, embeds the text and images, and serves full-text and semantic search across every issue.

This template runs lacuna as a single server node next to Postgres and a Railway storage bucket. The node is built from deploys/Dockerfile.server-node, which bakes the OCR and embedding model weights into the image. Postgres holds the corpus, pipeline state, and search vectors; the bucket stores uploaded PDFs and page images. A background worker processes new uploads on its own. After the first deploy, open /edit on your domain and set a publish password: the first password sent claims the node. You can add a separate site password later to make the reader private. Search is served from Postgres by default, with Turbopuffer as an option.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| lacuna | [eveningsoftware/lacuna](https://github.com/eveningsoftware/lacuna) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Name of the default database created on first boot |
| `DATABASE_URL` | Postgres | - | Connection string over Railway private networking |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated at deploy time |
| `DATABASE_PUBLIC_URL` | Postgres | - | Connection string over the public TCP proxy |
| `PORT` | lacuna | 8080 | Port the lacuna server listens on |
| `S3_ENDPOINT` | lacuna | https://t3.storageapi.dev | Object storage endpoint URL |
| `DATABASE_URL` | lacuna | - | Postgres connection string for the corpus and search index |
| `SITE_PASSWORD` | lacuna | (secret) | - |
| `QUERY_PROVIDER` | lacuna | postgres | Where search is served from: postgres or turbopuffer |
| `AWS_ENDPOINT_URL` | lacuna | - | Bucket endpoint, from the bucket service |
| `AWS_ACCESS_KEY_ID` | lacuna | - | Bucket access key ID, from the bucket service |
| `AWS_DEFAULT_REGION` | lacuna | - | Bucket region, from the bucket service |
| `AWS_S3_BUCKET_NAME` | lacuna | - | Name of the bucket that stores uploads and page images |
| `TURBOPUFFER_API_KEY` | lacuna | (secret) | - |
| `AWS_SECRET_ACCESS_KEY` | lacuna | (secret) | Bucket secret access key, from the bucket service |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, Svelte, CSS, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/lacuna)
