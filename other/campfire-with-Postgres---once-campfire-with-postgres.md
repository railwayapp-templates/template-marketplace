# Deploy campfire (with Postgres) on Railway

Self-hosted team chat app by Basecamp with PostgreSQL and S3 file storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/once-campfire-with-postgres)

## About

## What is once-campfire (with Postgres)?

  Campfire is a self-hosted, real-time team chat application from Basecamp's ONCE series. It provides multiple chat rooms with access controls, direct messaging, file
  attachments with previews, full-text search, Web Push notifications, @mentions, and API support for bot integrations. This template includes PostgreSQL for reliable data
   persistence and Railway Bucket for S3-compatible file storage.

  ## About Hosting once-campfire (with Postgres)

  Deploying Campfire on Railway involves provisioning three services: the Rails application, a PostgreSQL database, and Railway Bucket for file storage. The template
  automatically configures environment variables to connect these services. After deployment, visit your application URL to create an admin account and start inviting team
   members. Campfire is single-tenant, meaning each deployment serves one organization. SSL is handled by Railway, and the health check endpoint at `/up` ensures reliable
  container orchestration.

  ## Common Use Cases

  - **Team Communication**: Replace Slack or Discord with a private, self-hosted chat solution for internal team discussions.
  - **Client Projects**: Deploy separate Campfire instances for different clients to maintain data isolation and privacy.
  - **Open Source Communities**: Host a dedicated chat space for project contributors and maintainers.

  ## Dependencies for once-campfire (with Postgres) Hosting

  - **PostgreSQL**: Stores users, rooms, messages, and application data.
  - **Railway Bucket (S3)**: Handles file attachments, avatars, and Active Storage uploads.

  ### Deployment Dependencies

  - [Basecamp ONCE Campfire Repository](https://github.com/basecamp/once-campfire)
  - [Railway PostgreSQL Documentation](https://docs.railway.com/databases/postgresql)
  - [Railway Bucket Documentation](https://docs.railway.com/reference/services/buckets)

  ## Implementation Details

  **Health Check Configuration:**

  Healthcheck Path: /up

  **Required Environment Variables:**

  RAILS_ENV=production
  SECRET_KEY_BASE=${{secret(128)}}
  DATABASE_URL=${{Postgres.DATABASE_URL}}
  BUCKET_NAME=${{campfire-bucket.BUCKET}}
  BUCKET_ENDPOINT_URL=${{campfire-bucket.ENDPOINT}}
  BUCKET_ACCESS_KEY_ID=${{campfire-bucket.ACCESS_KEY_ID}}
  BUCKET_SECRET_ACCESS_KEY=${{campfire-bucket.SECRET_ACCESS_KEY}}
  AWS_DEFAULT_REGION=${{campfire-bucket.REGION}}

  ## Why Deploy once-campfire (with Postgres) on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing
  you to vertically and horizontally scale it.

  By deploying once-campfire (with Postgres) on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers,
  databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| once-campfire | [ymadd/campfire-railway-template](https://github.com/ymadd/campfire-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RAILS_ENV` | once-campfire | production | Rails application environment. Set to "production" for deployed applications. |
| `BUCKET_NAME` | once-campfire | - | Name of the Railway Bucket (S3-compatible storage) for file uploads and attachments. |
| `DATABASE_URL` | once-campfire | - | PostgreSQL database connection URL. Automatically provisioned by Railway Postgres service. |
| `SECRET_KEY_BASE` | once-campfire | (secret) | Secret key used by Rails for encrypting cookies, sessions, and other sensitive data. Auto-generated 128-character random string. |
| `AWS_DEFAULT_REGION` | once-campfire | - | Region of the Railway Bucket storage service. |
| `BUCKET_ENDPOINT_URL` | once-campfire | - | S3-compatible endpoint URL for the Railway Bucket service. |
| `BUCKET_ACCESS_KEY_ID` | once-campfire | - | Access key ID for authenticating with the Railway Bucket storage. |
| `BUCKET_SECRET_ACCESS_KEY` | once-campfire | (secret) | Secret access key for authenticating with the Railway Bucket storage. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Ruby, HTML, JavaScript, CSS, Shell, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/once-campfire-with-postgres)
