# Deploy Meilisearch (Flexible version) on Railway

Meilisearch is a fast, AI-powered, user-focused search engine.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meilisearch-flexible-version)

## About

Meilisearch is a blazing-fast, open-source search engine that delivers instant, typo-tolerant search results. This flexible version template allows you to deploy any Meilisearch version with production-ready configuration, persistent storage, and automatic SSL on Railway's infrastructure.

Hosting Meilisearch on Railway provides a production-ready search infrastructure with zero configuration overhead. This template automatically handles Railway's dynamic port assignment, configures secure authentication with master keys, and sets up persistent volumes for data storage. The flexible version system allows you to deploy specific Meilisearch releases or always use the latest version, ensuring compatibility with your application requirements. Railway's platform manages scaling, SSL certificates, and health monitoring, while the template provides optimized Docker configuration for consistent deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Meilisearch | [protemplate/meilisearch-railway](https://github.com/protemplate/meilisearch-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MEILI_ENV` | production | Environment. Defaults to `production`. Refer to [Meilisearch Docs -> Configure -> Environment for more info.](https://www.meilisearch.com/docs/learn/self_hosted/configure_meilisearch_at_launch#environment) |
| `MEILI_DB_PATH` | /meili_data/data.ms | Path to Meilisearch's on-disk database. Defaults to `/meili_data/data.ms`. Refer to [Meilisearch Docs -> Configure -> Database path](https://www.meilisearch.com/docs/learn/self_hosted/configure_meilisearch_at_launch#database-path) for more info. |
| `MEILI_LOG_LEVEL` | INFO | Defines how much detail should be present in Meilisearch’s logs. Defaults to `INFO`. Refer to [Meilisearch Docs -> Configure -> Log level](https://www.meilisearch.com/docs/learn/self_hosted/configure_meilisearch_at_launch#log-level) |
| `MEILI_MASTER_KEY` | - | Master key that you will use to access the instance. Defaults to a randomly-generated strong secret. Keep this secure! Refer to [Meilisearch Docs -> Security -> Master API Key](https://www.meilisearch.com/docs/learn/self_hosted/configure_meilisearch_at_launch#master-key) for more info. |
| `MEILISEARCH_VERSION` | latest | **Meilisearch Version Selection**  Choose your preferred Meilisearch version for deployment. You can select any available version (e.g. `latest`, `v1.15`) by checking the [Docker Hub tags](https://hub.docker.com/r/getmeili/meilisearch/tags).  **Important:** We strongly recommend specifying an exact version number rather than using `latest`, as recommended in the [official Meilisearch documentation](https://www.meilisearch.com/docs/guides/docker#download-meilisearch-with-docker). This ensures consistent, predictable deployments. |
| `MEILI_MAX_INDEXING_MEMORY` | 900Mb | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`

**Category:** Other · **Languages:** Makefile, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/meilisearch-flexible-version)
