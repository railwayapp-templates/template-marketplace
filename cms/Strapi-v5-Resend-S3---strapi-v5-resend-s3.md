# Deploy Strapi v5 + Resend + S3 on Railway

Deploy and Host Strapi v5 + Resend + S3 with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/strapi-v5-resend-s3)

## About

Starter template to spin up Strapi v5 on Railway with PostgreSQL, AWS S3 media storage, and Resend for transactional email. Comes prewired with TypeScript and GraphQL. Built for Railway’s outbound rules: no raw SMTP on Free/Trial/Hobby—use Resend’s HTTP API instead. Deploy in minutes with sane defaults.

This template provisions a Strapi v5 app backed by PostgreSQL on Railway, with S3 for media and Resend for email. The Strapi service talks to the database over a private network to reduce egress and improve security. Configure your AWS credentials and `RESEND_API_KEY` as environment variables and you’re ready to send emails and upload media. Local dev stays in sync with cloud via the Railway CLI. GraphQL support is included for flexible querying. Designed to respect Railway’s outbound networking policy (SMTP disabled on Free/Trial/Hobby), this setup uses Resend’s HTTPS API for reliable, cost-effective email.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Strapi | [compbyter/strapi-with-resend-email-provider](https://github.com/compbyter/strapi-with-resend-email-provider) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Strapi | 1337 | - |
| `NODE_ENV` | Strapi | production | - |
| `AWS_REGION` | Strapi | eu-north-1 | Your aws bucket region. An example "eu-north-1". Don't type random things. If you don't use any AWS S3 service, leave it blank, do not write anything. |
| `JWT_SECRET` | Strapi | (secret) | - |
| `API_TOKEN_SALT` | Strapi | (secret) | - |
| `RESEND_API_KEY` | Strapi | (secret) | - |
| `AWS_BUCKET_NAME` | Strapi | your_bucket_name | Your aws bucket name |
| `DATABASE_CLIENT` | Strapi | postgres | - |
| `ADMIN_JWT_SECRET` | Strapi | (secret) | - |
| `AWS_ACCESS_KEY_ID` | Strapi | your_aws_key_id | Your aws key id |
| `AWS_ACCESS_SECRET` | Strapi | (secret) | Your aws secret |
| `RESEND_DEFAULT_FROM` | Strapi | your_mail@example.com | - |
| `TRANSFER_TOKEN_SALT` | Strapi | (secret) | - |
| `RESEND_DEFAULT_REPLY_TO` | Strapi | your_mail@example.com | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/strapi-v5-resend-s3)
