# Deploy Marqo on Railway

Deploy and Host Marqo + Navigator Ecommerce Search and Discovery on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/marqo)

## About

Marqo is an AI-native search platform aimed at online retail — product search and discovery for categories like fashion, beauty, electronics, and home goods. Shoppers rarely search the words you put in your product titles. They type "something to keep me warm in the snow" and expect the down jacket. Marqo embeds your catalogue and their query into the same vector space, so intent matches inventory without a single synonym list or keyword rule.

It is also a general-purpose vector search engine: embedding inference and vector storage with no separate model pipeline to operate. This template pairs it with Marqo Navigator, a web UI for managing indexes and previewing searches, and puts both behind Caddy password authentication.

This template deploys a seven-service stack:

- **Marqo**: Embedding inference and the search API
- **Vespa (×2)**: The vector store, split across two services so each stays within Railway's per-container thread limit
- **Marqo Navigator**: Web dashboard for index management, document upload, and search preview
- **Caddy × 2**: Separate authentication gateways for the UI and the raw API — Marqo ships with no authentication of its own, so neither service is ever exposed directly
- **Private Networking**: Marqo and Navigator run on Railway's internal network; only the Caddy gateways hold public domains
- **Persistent Storage**: Railway volumes for the cluster configuration, the vector index, and the cached embedding model weights

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Caddy-API | [iliab1/caddy-password-auth](https://github.com/iliab1/caddy-password-auth) | Web service |
| Caddy-UI | [iliab1/caddy-password-auth](https://github.com/iliab1/caddy-password-auth) | Web service |
| vespa-init | [nick0lay/railway-templates](https://github.com/nick0lay/railway-templates) (root: solutions/marqo-navigator/vespa-init) | Worker |
| Navigator | [nick0lay/railway-templates](https://github.com/nick0lay/railway-templates) (root: solutions/marqo-navigator/navigator) | Worker |
| vespa-node | [nick0lay/railway-templates](https://github.com/nick0lay/railway-templates) (root: solutions/marqo-navigator/vespa) | Database |
| Marqo | [nick0lay/railway-templates](https://github.com/nick0lay/railway-templates) (root: solutions/marqo-navigator/marqo) | Database |
| vespa-admin | [nick0lay/railway-templates](https://github.com/nick0lay/railway-templates) (root: solutions/marqo-navigator/vespa) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Navigator | 9882 |
| `NAVIGATOR_IMAGE_TAG` | Navigator | latest |
| `PORT` | vespa-node | 8080 |
| `VESPA_ROLE` | vespa-node | services |
| `VESPA_IMAGE_TAG` | vespa-node | 8.431.32 |
| `PORT` | Marqo | 8882 |
| `MARQO_IMAGE_TAG` | Marqo | latest |
| `MARQO_ENABLE_THROTTLING` | Marqo | TRUE |
| `MARQO_MODELS_TO_PRELOAD` | Marqo | ["hf/e5-base-v2"] |
| `MARQO_MAX_CONCURRENT_INDEX` | Marqo | 32 |
| `MARQO_MAX_CONCURRENT_SEARCH` | Marqo | 32 |
| `PORT` | vespa-admin | 19071 |
| `VESPA_ROLE` | vespa-admin | configserver,services |
| `VESPA_IMAGE_TAG` | vespa-admin | 8.431.32 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/vespa/var`
- **Volume:** `/root/.cache/huggingface`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, Python, JavaScript

[View on Railway →](https://railway.com/deploy/marqo)
