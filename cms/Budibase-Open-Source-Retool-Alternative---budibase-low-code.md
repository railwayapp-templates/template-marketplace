# Deploy Budibase | Open Source Retool Alternative on Railway

Self Host Budibase. Build internal tools with low-code platform on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/budibase-low-code)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/budibase-low-code?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)

Budibase is an open-source low-code platform that lets teams build internal tools, admin panels, CRUD apps, forms, and workflow automations in minutes — without writing frontend code. Self-host Budibase on Railway to keep your business data inside your own infrastructure while skipping the pain of managing CouchDB, MinIO, Redis, and the Node.js app stack yourself.

This Railway template deploys the official `budibase/budibase:latest` all-in-one image, which bundles the Budibase builder, worker, CouchDB, MinIO, and Redis into a single container behind an Nginx proxy. A persistent volume at `/data` keeps your CouchDB metadata and MinIO-backed file uploads between restarts, and all cluster secrets are generated for you at deploy time.

Budibase is an open-source low-code platform (GPL-v3 licensed) used by over 50,000 companies to build internal tools 50× faster than traditional development. A single Budibase instance handles multiple apps, user roles (RBAC), SSO, automations, and AI agents — all from one builder UI.

Key features:

- Visual drag-and-drop app builder with 40+ pre-built components
- Built-in CouchDB (Budibase DB) for rapid prototyping, plus external DB connectors
- Workflow automations triggered by cron, webhooks, or user actions
- Role-based access control, SSO (OIDC/OAuth2/SAML), and multi-tenant apps
- REST and GraphQL API connectors for any third-party service
- AI agents and LLM integrations (OpenAI, Anthropic, and any OpenAI-compatible endpoint)

The all-in-one image used here is the same one Budibase ships for single-box self-hosting — PM2 supervises CouchDB, MinIO, Redis, the `apps` service, and the `worker` service inside one container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Budibase | `budibase/budibase:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Internal Nginx proxy port |
| `JWT_SECRET` | (secret) | Session token signing key |
| `SELF_HOSTED` | 1 | Enables self-hosted feature paths |
| `COUCH_DB_USER` | (secret) | CouchDB username |
| `REDIS_PASSWORD` | (secret) | Redis authentication password |
| `ENABLE_ANALYTICS` | false | Disable Budibase telemetry |
| `INTERNAL_API_KEY` | (secret) | Internal service auth key |
| `MINIO_ACCESS_KEY` | - | MinIO object store access key |
| `MINIO_SECRET_KEY` | (secret) | MinIO object store secret key |
| `COUCH_DB_PASSWORD` | (secret) | CouchDB password |
| `API_ENCRYPTION_KEY` | - | Datasource credential encryption key |
| `BB_ADMIN_USER_EMAIL` | - | Create  admin email |
| `BUDIBASE_ENVIRONMENT` | PRODUCTION | Runtime mode flag |
| `BB_ADMIN_USER_PASSWORD` | (secret) | Create admin password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/budibase-low-code)
