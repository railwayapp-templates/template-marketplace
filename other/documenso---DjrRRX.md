# Deploy documenso on Railway

The Open Source DocuSign Alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/DjrRRX)

## About

## Overview

Documenso aims to be the world's most trusted document-signing tool.  You can think of it as a self-hosted alternative to DocuSign.

## Highlights
- Deploy production-ready documenso instance with PostgreSQL for free.
- One-click deploys with the required PostgreSQL database automatically provisioned

## Learn More
- [Documenso](https://documenso.com)
- [Github](https://github.com/documenso/documenso)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| documenso-web | [documenso/documenso](https://github.com/documenso/documenso) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `MAIL_FROM` | documenso-web | - | The email address for sending emails |
| `NEXTAUTH_URL` | documenso-web | - | The URL of the deployed web app for use with Next-Auth |
| `SMTP_MAIL_HOST` | documenso-web | - | The SMTP mail host |
| `SMTP_MAIL_PORT` | documenso-web | - | The SMTP mail port |
| `SMTP_MAIL_USER` | documenso-web | (secret) | The SMTP mail user |
| `STRIPE_API_KEY` | documenso-web | (secret) | The API key for Stripe |
| `NEXTAUTH_SECRET` | documenso-web | (secret) | Used to encrypt the NextAuth.js JWT |
| `SENDGRID_API_KEY` | documenso-web | (secret) | The API key for SendGrid to send emails |
| `SMTP_MAIL_PASSWORD` | documenso-web | (secret) | The SMTP mail password |
| `STRIPE_WEBHOOK_SECRET` | documenso-web | (secret) | The webhook secret for Stripe |
| `NEXT_PUBLIC_WEBAPP_URL` | documenso-web | - | The URL of the deployed web app |
| `NEXT_PUBLIC_ALLOW_SIGNUP` | documenso-web | true | Allow user signup |
| `NEXT_PUBLIC_ALLOW_SUBSCRIPTIONS` | documenso-web | false | Allow user subscriptions with Stripe |
| `NEXT_PUBLIC_STRIPE_COMMUNITY_PLAN_YEARLY_PRICE_ID` | documenso-web | - | The Stripe Community Plan yearly price ID |
| `NEXT_PUBLIC_STRIPE_COMMUNITY_PLAN_MONTHLY_PRICE_ID` | documenso-web | - | The Stripe Community Plan monthly price ID |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, MDX, JavaScript, Shell, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/DjrRRX)
