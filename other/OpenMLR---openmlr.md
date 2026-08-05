# Deploy OpenMLR on Railway

OSS Medical, Legal, and Regulatory precheck before a commercial review

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openmlr)

## About

An open-source, self-hostable MLR (Medical-Legal-Regulatory) pre-check for pharma promotional content. It verifies every claim against real, licensed primary sources, not a private library and shows its work.

Reviewers can also add their dossier for check reference.

Simple and straightforward. Clone, and deploy on any infrastructure/host of your choice.

Alternative is to use a one-click Railway installation

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| openmlr | [unicodeveloper/openmlr](https://github.com/unicodeveloper/openmlr) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `OPENAI_MODEL` | openmlr | - | Model for extraction/entailment (any structured-output-capable model) |
| `VALYU_API_KEY` | openmlr | (secret) | Required for self-hosted mode. Valyu — the evidence backend |
| `VALYU_APP_URL` | openmlr | https://platform.valyu.ai | Valyu platform origin — userinfo lookup and the credit-billing OAuth proxy. |
| `OPENAI_API_KEY` | openmlr | (secret) | OpenAI — claim extraction & entailment (https://platform.openai.com) |
| `NEXT_PUBLIC_APP_MODE` | openmlr | self-hosted | - |
| `OPENAI_REASONING_EFFORT` | openmlr | - | Reasoning effort for openai model |
| `NEXT_PUBLIC_VALYU_AUTH_URL` | openmlr | https://auth.valyu.ai | Valyu OAuth authorization server. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/openmlr)
