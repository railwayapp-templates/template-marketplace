# Deploy Next.js SaaS Starter on Railway

Next.js SaaS starter with Supabase Auth, Stripe, and multi-tenant orgs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hopeful-wonder)

## About

A production-ready SaaS starter with authentication, multi-tenant organizations, Stripe billing, and a dashboard — ready to deploy in one click. Built with Next.js 15, Supabase, and Tailwind CSS.

This template deploys a complete SaaS application on Railway using Nixpacks for zero-config Node.js detection. The app connects to your Supabase project for authentication (email/password + GitHub OAuth) and database, and to Stripe for subscription billing via the Customer Portal. Railway handles the build, deploy, and hosting automatically — just add your environment variables and you're live. The template includes a railway.toml with restart policies and health checks pre-configured.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nextjs-saas-starter | [GerardoRdz96/nextjs-saas-starter](https://github.com/GerardoRdz96/nextjs-saas-starter) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `STRIPE_SECRET_KEY` | (secret) | Your Stripe secret key (sk_live_... or sk_test_...) |
| `NEXT_PUBLIC_APP_URL` | - | Set to ${{RAILWAY_PUBLIC_DOMAIN}} — Railway fills this automatically |
| `STRIPE_WEBHOOK_SECRET` | (secret) | Stripe webhook signing secret (whsec_...) |
| `STRIPE_PUBLISHABLE_KEY` | - | Your Stripe publishable key (pk_live_... or pk_test_...) |
| `NEXT_PUBLIC_SUPABASE_URL` | - | Your Supabase project URL (from Project Settings → API) |
| `SUPABASE_SERVICE_ROLE_KEY` | - | Your Supabase service role key (keep secret) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | - | Your Supabase anon/public key |

**Category:** Other · **Languages:** TypeScript, PLpgSQL, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/hopeful-wonder)
