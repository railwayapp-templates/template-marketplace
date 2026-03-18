# Deploy Open SaaS  on Railway

full-featured SaaS starter for React, NodeJS, & Prisma powered by Wasp =}

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/open-saas)

## About

a free, full-featured SaaS starter:
- full-stack w/ React, NodeJS, & Prisma/Postgres
- payments w/ Stripe, Polar, Paddle, Lemon Squeezy 
- auth that you own (no 3rd party services)
- modern desgin w/ ShadCN
- demo app w/ OpenAI API 
- AWS S3 file upload w/ presigned URLs
- AI-ready w/ Cursor rules & LLMs.txt
- admin dashboard

Follow the [Using the Open SaaS x Railway template](https://github.com/wasp-lang/open-saas-railway?tab=readme-ov-file#open-saas-x-railway-template--) instructions to get started.

Deploy with one click and you've already got a full SaaS app.

Your app will then run, but you'll need to create a mirror of the repo in your own GitHub account and start developing locally for full functionality. To do so, follow the [Using the Open SaaS x Railway template](https://github.com/wasp-lang/open-saas-railway?tab=readme-ov-file#open-saas-x-railway-template--) instructions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Client | [wasp-lang/open-saas-railway](https://github.com/wasp-lang/open-saas-railway) | Web service |
| Server | [wasp-lang/open-saas-railway](https://github.com/wasp-lang/open-saas-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Server | 3001 | - |
| `JWT_SECRET` | Server | (secret) | - |
| `ADMIN_EMAILS` | Server | me@example.com,you@example.com,them@example.com | - |
| `AWS_S3_REGION` | Server | your-region | - |
| `MAILGUN_DOMAIN` | Server | dummy-value | - |
| `OPENAI_API_KEY` | Server | (secret) | - |
| `STRIPE_API_KEY` | Server | (secret) | - |
| `MAILGUN_API_KEY` | Server | (secret) | - |
| `PLAUSIBLE_API_KEY` | Server | (secret) | - |
| `PLAUSIBLE_SITE_ID` | Server | yoursite.com | - |
| `PLAUSIBLE_BASE_URL` | Server | https://plausible.io/api | - |
| `POLAR_SANDBOX_MODE` | Server | true | For production, set this to false, make sure to generate production organization and products. |
| `AWS_S3_FILES_BUCKET` | Server | your-bucket-name | - |
| `POLAR_WEBHOOK_SECRET` | Server | (secret) | - |
| `AWS_S3_IAM_ACCESS_KEY` | Server | ACK... | - |
| `AWS_S3_IAM_SECRET_KEY` | Server | (secret) | - |
| `STRIPE_WEBHOOK_SECRET` | Server | (secret) | - |
| `STRIPE_CUSTOMER_PORTAL_URL` | Server | https://billing.stripe.com/... | - |
| `PAYMENTS_CREDITS_10_PLAN_ID` | Server | 012345 | - |
| `GOOGLE_ANALYTICS_PRIVATE_KEY` | Server | LS02... | - |
| `GOOGLE_ANALYTICS_PROPERTY_ID` | Server | dummy-value | - |
| `GOOGLE_ANALYTICS_CLIENT_EMAIL` | Server | email@example.gserviceaccount.com | - |
| `POLAR_ORGANIZATION_ACCESS_TOKEN` | Server | (secret) | - |
| `PAYMENTS_PRO_SUBSCRIPTION_PLAN_ID` | Server | 012345 | - |
| `PAYMENTS_HOBBY_SUBSCRIPTION_PLAN_ID` | Server | 012345 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, JavaScript, Astro, CSS

[View on Railway →](https://railway.com/template/open-saas)
