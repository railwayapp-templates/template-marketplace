# Deploy emochipk on Railway

Premium Shoe Store with admin and order management feat ecommerce

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/emochipk)

## About

emochipk (Executive Mochi) is a full-stack e-commerce platform built for a Pakistani leather footwear retailer, running on the T3 stack. It handles multi-branch retail across Pasrur and Daska, Cash-on-Delivery order management, an admin dashboard, and courier dispatch — giving a growing shoe brand enterprise-grade online ordering without enterprise overhead.

Hosting emochipk on Railway means running a Next.js 15 application alongside a managed PostgreSQL database, both provisioned directly on Railway Pro. The tRPC layer handles type-safe communication between the storefront, admin panel, and order-management modules, while Prisma manages a multi-model schema covering products, branches, orders, and inter-branch stock transfers. Railway's build pipeline redeploys from the connected Git repo on every push, and environment variables store secrets like payment and courier API keys. A separate storage bucket handles product images and media.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| EmochipkDb | `ghcr.io/railwayapp-templates/postgres-ssl:18.3` | Database |
| emochipk | [MSNS-DEV/emochipk](https://github.com/MSNS-DEV/emochipk) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | EmochipkDb | (secret) |
| `NEXTAUTH_SECRET` | EmochipkDb | (secret) |
| `POSTGRES_PASSWORD` | EmochipkDb | (secret) |
| `S3_SECRET_ACCESS_KEY` | EmochipkDb | (secret) |
| `AUTH_SECRET` | emochipk | (secret) |
| `TRAX_PASSWORD` | emochipk | (secret) |
| `NEXTAUTH_SECRET` | emochipk | (secret) |
| `SEED_ADMIN_PASSWORD` | emochipk | (secret) |
| `S3_SECRET_ACCESS_KEY` | emochipk | (secret) |
| `AWS_SECRET_ACCESS_KEY` | emochipk | (secret) |
| `LEOPARDS_API_PASSWORD` | emochipk | (secret) |
| `SAFEPAY_WEBHOOK_SECRET` | emochipk | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/emochipk)
