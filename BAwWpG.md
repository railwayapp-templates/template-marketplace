# Deploy nextjs-saas-starter on Railway

Simple Saas Starter in Nextjs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/BAwWpG)

## About

Next.js SaaS Starter
This is a starter template for building a SaaS application using Next.js with support for authentication, Stripe integration for payments, and a dashboard for logged-in users.

Demo: https://next-saas-start.vercel.app/

Why did I make this?
In 2020, I made a course called "React 2025" which showed how to build a SaaS application with Next.js, Stripe, and other tools.

Well, it's almost 2025 and React 19 has brought so many amazing new features I didn't predict! This repo is a demonstration of the latest React and Next.js patterns. These patterns can drastically simplify some common tasks in building your SaaS, like building forms, talking to your database, and more.

Features
Marketing landing page (/) with animated Terminal element
Pricing page (/pricing) which connects to Stripe Checkout
Dashboard pages with CRUD operations on users/teams
Basic RBAC with Owner and Member roles
Subscription management with Stripe Customer Portal
Email/password authentication with JWTs stored to cookies
Global middleware to protect logged-in routes
Local middleware to protect Server Actions or validate Zod schemas
Activity logging system for any user events

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nextjs-saas-starter | [leerob/next-saas-starter](https://github.com/leerob/next-saas-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AUTH_SECRET` | nextjs-saas-starter | (secret) | - |
| `STRIPE_SECRET_KEY` | nextjs-saas-starter | (secret) | - |
| `STRIPE_WEBHOOK_SECRET` | nextjs-saas-starter | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/template/BAwWpG)
