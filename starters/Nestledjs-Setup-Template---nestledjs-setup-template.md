# Deploy Nestled.js Setup Template on Railway

Production infrastructure for Nestled.js

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nestledjs-setup-template)

## About

Nestled.js is a production-ready NestJS + React starter template with authentication, organizations/teams, RBAC, Stripe billing, admin 
  panel, and a fully generated GraphQL SDK. It provides a clean foundation so you only build your custom features.                       
                                                                                                                                         
  ## About Hosting Nestled.js Setup Template                      

  Deploying Nestled.js requires a PostgreSQL database, a NestJS GraphQL API server, and a React frontend. The template handles database
  migrations, Prisma client generation, and builds both apps automatically. You'll need to configure environment variables for JWT
  secrets, email (SMTP), and optionally OAuth providers (Google, GitHub), Stripe billing, and file storage (ImageKit, S3, Cloudinary).
  The first user to register automatically becomes super admin. PgBouncer connection pooling is included for production database
  performance.

  ## Common Use Cases

  - SaaS applications requiring multi-tenant organizations, team invitations, and role-based access control
  - Subscription-based products with Stripe billing, plan management, and webhook handling
  - Internal tools and admin dashboards with audit logging, user management, and generated CRUD APIs

  ## Dependencies for Nestled.js Setup Template Hosting

  - PostgreSQL (provisioned automatically by this template)
  - Node.js 20+ with pnpm

  ### Deployment Dependencies

   - [Nestled.js Documentation](https://nestledjs.com) — full setup guide, schema configuration, and feature documentation                
  - [Stripe Dashboard](https://dashboard.stripe.com) — for billing keys, webhook secrets, and product configuration                      
  - [Google Cloud Console](https://console.cloud.google.com/apis/credentials) — for Google OAuth (optional)
  - [GitHub Developer Settings](https://github.com/settings/developers) — for GitHub OAuth (optional)
  - An SMTP provider (SendGrid, AWS SES, Mailgun, etc.) for transactional emails

  ## Why Deploy Nestled.js Setup Template on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal
  with configuration, while allowing you to vertically and horizontally scale it.

  By deploying Nestled.js Setup Template on Railway, you are one step closer to supporting a complete full-stack application with minimal
   burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PgBouncer | `railwayapp/pgbouncer:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| api | [pirateandfox/muzebook](https://github.com/pirateandfox/muzebook) | Web service |
| web | [pirateandfox/muzebook](https://github.com/pirateandfox/muzebook) | Web service |
| Redis | `railwayapp/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRESQL_PORT` | PgBouncer | 5432 | - |
| `PGBOUNCER_POOL_MODE` | PgBouncer | session | - |
| `POSTGRESQL_PASSWORD` | PgBouncer | (secret) | - |
| `POSTGRESQL_USERNAME` | PgBouncer | (secret) | - |
| `PGBOUNCER_LISTEN_ADDRESS` | PgBouncer | * | - |
| `PGBOUNCER_MAX_CLIENT_CONN` | PgBouncer | 120 | - |
| `PGBOUNCER_DEFAULT_POOL_SIZE` | PgBouncer | 20 | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `HOST` | api | 0.0.0.0 | - |
| `APP_URL` | api | - | https://api.myapp.com | The public URL where your API is hosted. Railway provides this after deployment. |
| `APP_NAME` | api | - | Your application's display name. Shown in emails, 2FA authenticator apps, and browser titles. |
| `NODE_ENV` | api | production | - |
| `SITE_URL` | api | - | https://myapp.com | The public URL of your frontend application. Used for generating links in emails and redirects. |
| `APP_EMAIL` | api | - | hello@myapp.com | The "From" address for all outgoing emails. This is what users see as the sender. |
| `JWT_SECRET` | api | (secret) | - |
| `EMAIL_PROVIDER` | api | - |  Which email service to use. Options: sendgrid, smtp, mailgun, mock. Use mock for development/testing. Defaults to smtp. |
| `MAILGUN_DOMAIN` | api | - | mg.myapp.com | Your Mailgun sending domain. Must be verified in Mailgun. Only if you sent mailer to 'mailgun'. |
| `REDIS_PASSWORD` | api | (secret) | - |
| `ALLOWED_ORIGINS` | api | - | CORS allowed origins. Your frontend URL(s). Comma-separate multiple origins: https://myapp.com,https://admin.myapp.com,https://www.myapp.com |
| `MAILGUN_API_KEY` | api | (secret) | key-xxx... | Your Mailgun API key. Get this from Mailgun Dashboard → API Keys.  Only if you set mailer to 'mailgun'. |
| `APP_ADMIN_EMAILS` | api | - | admin@company.com | Comma-separated list of admin email addresses. Receives contact form submissions and system notifications. |
| `SENDGRID_API_KEY` | api | (secret) | SG.xxx... | Your SendGrid API key. Get this from SendGrid Dashboard → Settings → API Keys. Only if you chose 'sendgrid' as your mailer. |
| `API_COOKIE_DOMAIN` | api | - | .myapp.com | Auto-detected | Cookie domain for authentication. Set this if your API and frontend are on different subdomains (e.g., api.myapp.com and app.myapp.com). The leading dot allows sharing across subdomains. |
| `APP_SUPPORT_EMAIL` | api | - | support@myapp.com | The "Reply-To" address for emails. Also used in some default 'Need Help?' links. |
| `PGBOUNCER_ENABLED` | api | true | - |
| `LOG_PRISMA_QUERIES` | api | false | - |
| `COUNT_PRISMA_QUERIES` | api | false | - |
| `LOG_QUERY_COMPLEXITY` | api | false | - |
| `QUERY_COMPLEXITY_LIMIT` | api | 15000 | - |
| `LOG_QUERY_COMPLEXITY_THRESHOLD` | api | 5000 | - |
| `QUERY_COMPLEXITY_VERBOSE_ERRORS` | api | false | - |
| `PORT` | web | 3000 | - |
| `VITE_API_URL` | web | - | Your api url - https://api.yourdomain.com |
| `VITE_GTM_TRACKING_ID` | web | - | Google Tag Manager ID if you have one |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | - |
| `REDIS_AOF_ENABLED` | Redis | no | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run start:api`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `npm run start:web`
- **Volume:** `/bitnami`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/nestledjs-setup-template)
