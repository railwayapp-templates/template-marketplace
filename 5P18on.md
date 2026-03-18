# Deploy Strapi v5 + AWS S3 | Starter Template  on Railway

Strapi v5 + AWS S3 Starter Template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/5P18on)

## About

The **Strapi v5 + AWS S3 Starter Template** provides an out-of-the-box content management system powered by Strapi and PostgreSQL. Media uploads are automatically configured to use AWS S3 with just a few environment variables. Ideal for fast deployments with minimal setup.

This template streamlines deploying a Strapi v5 instance with PostgreSQL and AWS S3 integration on Railway. When deployed on Railway, Strapi connects to the PostgreSQL database via private networking, reducing egress fees. Users only need to provide four AWS-related environment variables to enable full media upload functionality. The setup also includes Railway CLI support for seamless local development and deployment workflows, ensuring developers can focus more on building and less on infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| strapi-aws-s3-starter-template | [compbyter/strapi-aws-s3-starter-template](https://github.com/compbyter/strapi-aws-s3-starter-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOST` | strapi-aws-s3-starter-template | 0.0.0.0 | - |
| `PORT` | strapi-aws-s3-starter-template | 1337 | - |
| `AWS_REGION` | strapi-aws-s3-starter-template | eu-north-1 | - |
| `JWT_SECRET` | strapi-aws-s3-starter-template | (secret) | - |
| `API_TOKEN_SALT` | strapi-aws-s3-starter-template | (secret) | - |
| `DATABASE_CLIENT` | strapi-aws-s3-starter-template | postgres | - |
| `ADMIN_JWT_SECRET` | strapi-aws-s3-starter-template | (secret) | - |
| `AWS_ACCESS_SECRET` | strapi-aws-s3-starter-template | (secret) | - |
| `TRANSFER_TOKEN_SALT` | strapi-aws-s3-starter-template | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/template/5P18on)
