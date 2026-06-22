# Deploy startup starter kit on Railway

a template for starting a startup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/giga-startup-template)

## About

Railway

  This is the anti-setup-week SaaS starter kit. Instead
  of wiring auth, billing, deploys, jobs, Postgres,
  Redis, admin, landing pages, and mobile scaffolding
  again, you start with the full product foundation
  already connected. The job of this template is simple:
  get your idea live fast enough that validation, not
  infrastructure, becomes the bottleneck.

  ## About Hosting this SaaS Starter Kit

  Hosting this full-stack SaaS starter kit on Railway
  gives you one deployment target for the whole startup
  stack: Hono API, BullMQ worker, Next.js product app,
  Next.js admin dashboard, Astro landing site, Postgres,
  and Redis. Vercel may be better for a standalone
  Next.js app, and specialized database hosts may be
  better for a standalone database, but that is not the
  point here. The point is speed. Railway lets the
  template deploy as one coordinated system so you can
  clone it, connect the required variables, replace the
  starter product, and start selling or validating.

  ## Common Use Cases

  - Launch a SaaS, AI tool, marketplace, internal
  product, or paid app with auth, database, billing,
  jobs, and admin already wired.
  - Build a hackathon project or validation MVP where the
  first deploy should take minutes, not a week of
  infrastructure decisions.
  - Start a cross-platform product with web, landing,
  admin, backend, worker, and Expo mobile architecture in
  one TypeScript monorepo.

  ## Dependencies for SaaS Starter Kit Hosting

  - Railway services for the API, worker, product web
  app, admin dashboard, landing site, Postgres, and
  Redis.
  - Better Auth for sessions, email/password auth,
  trusted origins, and Expo/mobile auth support.
  - Polar for checkout, subscriptions, customer portal,
  usage credits, and billing webhooks.
  - Drizzle ORM with Postgres as the source of truth.
  - oRPC for typed API contracts across backend, web,
  admin, and mobile.
  - Astro for the public landing site.
  - Next.js for authenticated product and admin surfaces.
  - Expo SDK 56 and React Native for mobile app
  development.
  - Optional PostHog, Sentry, and Resend integrations
  when the product is ready for analytics, errors, and
  email.

  ### Deployment Dependencies

  - Railway: https://railway.com
  - Better Auth: https://www.better-auth.com
  - Polar: https://polar.sh
  - Drizzle ORM: https://orm.drizzle.team
  - oRPC: https://orpc.unnoq.com
  - Expo: https://expo.dev
  - Astro: https://astro.build
  - Next.js: https://nextjs.org
  - PostHog: https://posthog.com
  - Sentry: https://sentry.io
  - Resend: https://resend.com

  ### Implementation Details

  This template intentionally keeps the deployment
  surface small. Core Railway variables are only the
  values needed to connect services and boot the app:

  ```env
  DATABASE_URL=${{postgres.DATABASE_URL}}
  REDIS_URL=${{redis.REDIS_URL}}
  BETTER_AUTH_SECRET=
  SERVER_URL=https://${{server.RAILWAY_PUBLIC_DOMAIN}}
  PRODUCT_URL=https://${{web.RAILWAY_PUBLIC_DOMAIN}}
  ADMIN_URL=https://${{admin.RAILWAY_PUBLIC_DOMAIN}}
  NEXT_PUBLIC_SERVER_URL=https://
  ${{server.RAILWAY_PUBLIC_DOMAIN}}
  PUBLIC_PRODUCT_URL=https://
  ${{web.RAILWAY_PUBLIC_DOMAIN}}

  Native in-app purchases are not included by default
  because many new products do not yet have Apple or
  Google billing accounts. Stripe is also not the default
  because it is broader and stronger at scale, but more
  setup-heavy. Polar is used because it gives a fast SaaS
  billing path for a template whose job is to help you
  ship and validate quickly.

  The stack is TypeScript-first because a monorepo with
  typed contracts is easier for both humans and coding
  agents to understand. The API is Hono and oRPC, the
  database layer is Drizzle/Postgres, the product/admin
  apps are Next.js, the landing site is Astro, and mobile
  starts with Expo SDK 56.

  ## Why Deploy this SaaS Starter Kit on Railway?

  Railway is a singular platform to deploy your
  infrastructure stack. Railway will host your
  infrastructure so you don't have to deal with
  configuration, while allowing you to vertically and
  horizontally scale it.

  By deploying this SaaS starter kit on Railway, you are
  one step closer to supporting a complete full-stack
  application with minimal burden. Host your servers,
  databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.2.1` | Database |
| web app | [Aduomas/giga-startup-template](https://github.com/Aduomas/giga-startup-template) | Worker |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| server | [Aduomas/giga-startup-template](https://github.com/Aduomas/giga-startup-template) | Web service |
| workers | [Aduomas/giga-startup-template](https://github.com/Aduomas/giga-startup-template) | Worker |
| landing | [Aduomas/giga-startup-template](https://github.com/Aduomas/giga-startup-template) | Web service |
| admin | [Aduomas/giga-startup-template](https://github.com/Aduomas/giga-startup-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | redis | 6379 | - |
| `REDISUSER` | redis | default | - |
| `REDIS_URL` | redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | redis | (secret) | - |
| `REDIS_PASSWORD` | redis | (secret) | - |
| `REDIS_PUBLIC_URL` | redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `ADMIN_EMAILS` | server | - | admin email |
| `BETTER_AUTH_SECRET` | server | (secret) | auth secret |
| `ADMIN_EMAILS` | workers | - | admin emails |
| `BETTER_AUTH_SECRET` | workers | (secret) | auth secret |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters

[View on Railway →](https://railway.com/deploy/giga-startup-template)
