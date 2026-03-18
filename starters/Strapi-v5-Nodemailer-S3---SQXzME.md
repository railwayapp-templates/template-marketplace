# Deploy Strapi v5 + Nodemailer + S3 on Railway

Ready to deploy template for Strapi(TS), Nodemailer, AWS S3, Graphql

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/SQXzME)

## About

The **Strapi v5 as Typescript + Nodemailer + AWS S3 + GraphQL Starter Template** is a full-featured boilerplate for rapidly building production-grade Strapi apps. It comes pre-configured with TypeScript support, email sending via Nodemailer, AWS S3 integration for media uploads, and a GraphQL plugin for flexible API queries.

This template enables you to deploy a TypeScript-based Strapi v5 project with PostgreSQL and out-of-the-box integrations for AWS S3, Nodemailer, and GraphQL. On Railway, the Strapi service connects securely to the PostgreSQL database via a private network, helping reduce egress costs. By simply providing your AWS and SMTP credentials as environment variables, media uploads and email functionality are immediately available. With the Railway CLI, local development is straightforward and fully in sync with your cloud deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Strapi | [compbyter/strapi-nodemailer-s3-template](https://github.com/compbyter/strapi-nodemailer-s3-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SMTP_HOST` | Strapi | your_smtp_host | An example "smtp.gmail.com" |
| `SMTP_PORT` | Strapi | your_smtp_port | An example "587" |
| `AWS_REGION` | Strapi | your_aws_region | Your aws bucket region. An example "eu-north-1" |
| `JWT_SECRET` | Strapi | (secret) | - |
| `SMTP_PASSWORD` | Strapi | (secret) | Your smtp password |
| `SMTP_USERNAME` | Strapi | (secret) | Your smtp username |
| `API_TOKEN_SALT` | Strapi | (secret) | - |
| `AWS_BUCKET_NAME` | Strapi | aws_bucket_name | Your aws bucket name |
| `DATABASE_CLIENT` | Strapi | postgres | - |
| `ADMIN_JWT_SECRET` | Strapi | (secret) | - |
| `AWS_ACCESS_KEY_ID` | Strapi | your_aws_key_id | Your aws key id |
| `AWS_ACCESS_SECRET` | Strapi | (secret) | Your aws secret |
| `TRANSFER_TOKEN_SALT` | Strapi | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/template/SQXzME)
