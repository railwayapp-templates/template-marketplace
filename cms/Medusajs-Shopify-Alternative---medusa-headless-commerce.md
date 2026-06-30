# Deploy Medusa.js | Shopify Alternative on Railway

Self-host Medusa.js v2. Zero transaction fees. Own your store data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa-headless-commerce)

## About

![Medusa.js v2 headless commerce engine](https://cdn.sanity.io/images/5a711ubd/production/73ede9fccb57607fd0c48863b88a9ad4965fef18-1000x420.webp?w=1200)

Medusa.js v2 is the open-source headless commerce engine with **34k+ GitHub stars**, an MIT
license, and zero per-transaction platform fees — adopted by Heineken, Mitsubishi, and Tekla.
A TypeScript + Node.js backend that exposes Store, Admin, and Workflow APIs for any frontend
(Next.js, Remix, mobile, POS), with every commerce primitive — products, carts, orders,
payments, fulfillment, inventory — as a swappable independent module.

**Shopify charges 0.5–2% per transaction on top of $29–$299/month.** On $500k annual GMV
that's up to $10,000 in platform fees before a single subscription payment. Medusa on Railway
costs ~$10–15/month flat. Your revenue. Your data. Your codebase.

---

Running Medusa v2 in production requires coordinating a Node.js application server, PostgreSQL
database, and Redis queue — plus generating cryptographic secrets, configuring CORS for your
storefront domains, and running database migrations on every deployment. Without a managed
host, you're managing Docker Compose, SSL, secret rotation, and migration scripts manually.

This template handles all of it — auto-generated secrets, pre-configured CORS, and
`medusa db:migrate` on every deploy. Fork the source repo to add modules or workflows;
Railway auto-deploys on every `git push`.

Typical cost: **~$10–15/month** on Railway's Hobby plan. Shopify Basic costs $29/month
plus 2% per transaction. WooCommerce scales poorly past 10k orders. Medusa eliminates
platform transaction fees — you pay only Stripe's 2.9% + $0.30.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Medusa | [sahilrupani/medusa-railway](https://github.com/sahilrupani/medusa-railway) | Worker |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Medusa | 9000 | - |
| `NODE_ENV` | Medusa | production | - |
| `JWT_SECRET` | Medusa | (secret) | - |
| `COOKIE_SECRET` | Medusa | (secret) | - |
| `MEDUSA_ADMIN_EMAIL` | Medusa | - | Initial admin user email. Login at /app |
| `MEDUSA_WORKER_MODE` | Medusa | shared | - |
| `DISABLE_MEDUSA_ADMIN` | Medusa | false | - |
| `MEDUSA_ADMIN_PASSWORD` | Medusa | (secret) | Initial admin user password. Login at /app |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** TypeScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/medusa-headless-commerce)
