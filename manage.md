# Deploy Manage on Railway

An open-source project management suite

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/manage)

## About

Manage is an open-source project management platform designed for team collaboration. It offers task lists, project posts, event scheduling, and activity tracking in an intuitive interface. Built with Next.js and PostgreSQL, Manage empowers teams to organize work, track progress, and achieve project success.

Deploying Manage on Railway involves provisioning a PostgreSQL database and configuring the Next.js application with the required environment variables. The template automatically handles database schema setup during application startup. You'll need to configure authentication secrets, SMTP settings for email notifications, and optionally S3-compatible storage for file uploads. Railway's internal networking allows seamless communication between your app and database without exposing credentials externally.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| manage | [techulus/manage](https://github.com/techulus/manage) (branch: release) | Web service |
| turbowire | `arjunkomath/turbowire-server:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `S3_REGION` | manage | - | Storage bucket region |
| `SMTP_HOST` | manage | - | SMTP host |
| `SMTP_PASS` | manage | - | SMTP Password |
| `SMTP_PORT` | manage | - | SMTP port |
| `SMTP_USER` | manage | (secret) | SMTP username |
| `EMAIL_FROM` | manage | - | From email |
| `S3_ENDPOINT` | manage | - | Storage bucket endpoint |
| `SELF_HOSTED` | manage | true | Disable landing page |
| `SMTP_SECURE` | manage | true | SMTP secure true / false |
| `DATABASE_URL` | manage | - | Database URL |
| `S3_BUCKET_NAME` | manage | - | Storage bucket name |
| `BETTER_AUTH_URL` | manage | - | App base URL |
| `S3_ACCESS_KEY_ID` | manage | - | Bucket access key ID |
| `TURBOWIRE_DOMAIN` | manage | - | Turbowire public domain |
| `BETTER_AUTH_SECRET` | manage | (secret) | Auth secret |
| `NEXT_PUBLIC_APP_URL` | manage | - | App public URL |
| `S3_SECRET_ACCESS_KEY` | manage | (secret) | Bucket secret access key |
| `TURBOWIRE_SIGNING_KEY` | manage | - | Turbowire signing key |
| `TURBOWIRE_BROADCAST_KEY` | manage | - | Turbowire broadcast key |
| `SIGNING_KEY` | turbowire | - | Turbowire signing key |
| `BROADCAST_KEY` | turbowire | - | Turbowire broadcast key |
| `PUBLIC_DOMAIN` | turbowire | - | Turbowire public domain |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `bun run db:push && bun run start`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Dockerfile, Shell

[View on Railway →](https://railway.com/template/manage)
