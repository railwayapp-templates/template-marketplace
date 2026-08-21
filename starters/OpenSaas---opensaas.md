# Deploy OpenSaas on Railway

A ready-made starter app with logins, billing and an admin panel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opensaas)

## About

Open SaaS is a free, MIT-licensed SaaS starter kit that gives you a working product on day one instead of an empty repository: email authentication, payments wired to Stripe, Polar or Lemon Squeezy, an admin dashboard, S3 file uploads and an OpenAI demo app. It is built on Wasp, a framework that compiles one spec into a React client and a Node.js API server backed by Prisma and Postgres. Founders use it to skip the weeks spent re-implementing auth and billing.

Self-host Open SaaS on Railway and the whole stack comes up talking to itself. This template builds the React client and Node API server from source, provisions Postgres with the schema already migrated, attaches an object storage bucket for uploads, and runs Mailpit so signup and password-reset email works before you have a mail provider. Browsers load the client, the client calls the API over HTTPS with a bearer token, and the server reaches Postgres and Mailpit over the private network.

![Diagram of the Open SaaS client, server, Mailpit and Postgres services](https://res.cloudinary.com/rroe4rtk/image/upload/v1787203211/opensaas-architecture.png)

Open SaaS is a template you own outright. You get the source for every screen, so you customise by editing code rather than fighting a configuration UI. Teams self-host it to avoid per-seat boilerplate pricing and keep customer data in their own infrastructure.

Key features:

- Email authentication with verification and password reset, plus optional Google, GitHub and Discord sign-in
- Payments through Stripe, Polar or Lemon Squeezy, with subscriptions and one-off credit purchases
- Admin dashboard covering users, revenue, signups and page views
- File uploads to any S3-compatible bucket via presigned URLs
- Scheduled and background jobs on pg-boss, needing no separate queue service
- End-to-end type safety between client and server

The Railway architecture splits the app the way Wasp's own documentation does. **server** is the Node.js API: it applies Prisma migrations on startup, serves every authenticated operation, and runs scheduled jobs in-process. **client** is the compiled React bundle served by Caddy, with SPA routing and prerendered marketing pages. **Postgres** holds all application data. **Mailpit** gives you private SMTP plus a web inbox. The bucket holds uploads, keeping them off the container filesystem so they survive redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| client | [gridalpha/opensaas-railway](https://github.com/gridalpha/opensaas-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| server | [gridalpha/opensaas-railway](https://github.com/gridalpha/opensaas-railway) | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | client | 8080 | Caddy static server port |
| `REACT_APP_API_URL` | client | - | API URL used by the browser |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | server | 8080 | API server listening port |
| `NODE_ENV` | server | production | Enables production env validation |
| `SMTP_HOST` | server | - | Mail server hostname |
| `SMTP_PORT` | server | 1025 | Mail server port |
| `JWT_SECRET` | server | (secret) | Signs session tokens |
| `ADMIN_EMAILS` | server | - | Comma-separated admin addresses, set before first signup |
| `DATABASE_URL` | server | - | Postgres connection string |
| `AWS_S3_REGION` | server | - | Bucket region |
| `SMTP_PASSWORD` | server | (secret) | SMTP auth password |
| `SMTP_USERNAME` | server | (secret) | SMTP auth username |
| `OPENAI_API_KEY` | server | (secret) | Set this only to enable the AI demo |
| `STRIPE_API_KEY` | server | (secret) | Set this only if you use Stripe |
| `AWS_S3_ENDPOINT` | server | - | S3 endpoint, empty for real AWS |
| `WASP_SERVER_URL` | server | - | Public API base URL |
| `AWS_S3_FILES_BUCKET` | server | - | Bucket name for uploads |
| `WASP_WEB_CLIENT_URL` | server | - | Client origin for CORS |
| `AWS_S3_IAM_ACCESS_KEY` | server | - | Bucket access key |
| `AWS_S3_IAM_SECRET_KEY` | server | (secret) | Bucket secret key |
| `STRIPE_WEBHOOK_SECRET` | server | (secret) | Set this only if you use Stripe |
| `AWS_S3_FORCE_PATH_STYLE` | server | true | Required for browser uploads to Railway storage |
| `PAYMENTS_CREDITS_10_PLAN_ID` | server | credits-10-plan-id | Set this only if you use payments |
| `PAYMENTS_PRO_SUBSCRIPTION_PLAN_ID` | server | pro-plan-id | Set this only if you use payments |
| `PAYMENTS_HOBBY_SUBSCRIPTION_PLAN_ID` | server | hobby-plan-id | Set this only if you use payments |
| `PORT` | mailpit | 8025 | Web inbox port, also the health check port |
| `MP_UI_AUTH` | mailpit | - | Web inbox basic auth credentials |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailpit | - | SMTP auth credentials |
| `MAIL_PASSWORD` | mailpit | (secret) | Shared SMTP password |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow AUTH on the private network |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Healthcheck:** `/livez`
- **Volume:** `/data`

**Category:** Starters · **Languages:** TypeScript, CSS, Shell

[View on Railway →](https://railway.com/deploy/opensaas)
