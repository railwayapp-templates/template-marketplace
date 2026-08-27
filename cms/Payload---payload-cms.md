# Deploy Payload on Railway

Headless CMS for managing content behind a REST and GraphQL API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/payload-cms)

## About

Payload is an open-source, TypeScript-native headless CMS that runs inside a Next.js application rather than beside one. You define collections, fields and access control in code; Payload generates the admin panel, a REST API, a GraphQL API and fully typed queries from that definition. Because the schema is code it lives in your repository, reviews like code and deploys like code. Editors still get drafts, versions and scheduled publishing.

This template deploys Payload as three cooperating Railway services. The `payload` service serves the admin panel, the REST and GraphQL APIs and a public page; a managed PostgreSQL database stores content, versions and users; and an object storage bucket holds every uploaded file. A second `payload-jobs` service runs the job queue on its own schedule, so background work never competes with API response times. Self-host Payload on Railway and the first deploy arrives with migrations applied, an admin created and uploads landing in durable storage.

![Diagram of the Payload, jobs worker and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787702965/payload-architecture.png)

Payload solves the problem every custom application hits: the content model keeps changing and the admin interface built for it falls behind. Describe your data once, and Payload derives the interface, the APIs and the types from it. Self-host it when the content belongs to you, or when your frontend already runs on Next.js and a second hosted service is redundant.

Key capabilities:

- Collections defined in TypeScript, with generated types you import in your frontend
- Drafts, version history, autosave, scheduled publish and unpublish
- REST and GraphQL APIs from the same schema, plus a Local API that skips HTTP
- Field-level access control: a role can read a document but not one field on it
- Lexical rich text with custom blocks, and uploads with automatic image resizing

The split is deliberate. The `payload` service is stateless — nothing on local disk — which lets you raise its replica count as traffic grows. PostgreSQL holds every document, draft and version. Object storage holds uploads, and Payload streams files back through its own `/api/media/file/` route so access control still applies. The `payload-jobs` service runs `payload jobs:run` on a cron, which is what Payload's documentation recommends for a dedicated server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| payload | [gridalpha/payload-railway](https://github.com/gridalpha/payload-railway) | Web service |
| payload-jobs | [gridalpha/payload-railway](https://github.com/gridalpha/payload-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `PORT` | payload | 3000 | HTTP listening port |
| `S3_BUCKET` | payload | - | Upload bucket name |
| `S3_REGION` | payload | - | Bucket placement region |
| `S3_ENDPOINT` | payload | - | Bucket endpoint, scheme included |
| `DATABASE_URL` | payload | - | Postgres connection string |
| `PAYLOAD_ROLE` | payload | web | Serves admin panel and APIs |
| `PAYLOAD_SECRET` | payload | (secret) | Signs tokens, encrypts credentials |
| `S3_ACCESS_KEY_ID` | payload | - | Bucket access key |
| `PAYLOAD_ADMIN_EMAIL` | payload | admin@example.com | First admin, seeded once |
| `S3_SECRET_ACCESS_KEY` | payload | (secret) | Bucket secret key |
| `PAYLOAD_ADMIN_PASSWORD` | payload | (secret) | First admin password |
| `S3_BUCKET` | payload-jobs | - | Upload bucket name |
| `S3_REGION` | payload-jobs | - | Bucket placement region |
| `S3_ENDPOINT` | payload-jobs | - | Bucket endpoint, scheme included |
| `DATABASE_URL` | payload-jobs | - | Postgres connection string |
| `PAYLOAD_ROLE` | payload-jobs | jobs | Runs the queue, no web server |
| `PAYLOAD_SECRET` | payload-jobs | (secret) | Must match the web service |
| `S3_ACCESS_KEY_ID` | payload-jobs | - | Bucket access key |
| `PAYLOAD_JOBS_CRON` | payload-jobs | * * * * * | Queue drain schedule |
| `S3_SECRET_ACCESS_KEY` | payload-jobs | (secret) | Bucket secret key |
| `PAYLOAD_PUBLIC_SERVER_URL` | payload-jobs | - | Public URL for generated links |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript, Shell, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/payload-cms)
