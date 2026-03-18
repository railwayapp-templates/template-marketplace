# Deploy lynx-seo on Railway

Deploy and Host 🚀 SEO Content Automation with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/lynx-seo)

## About

# 🚀 SEO Content Automation Starter

Automatically generate SEO-friendly blog posts using AI from trending keywords and manage them via a CMS. This template includes:

- 🧠 **TrendGen Bot** – generates articles using OpenAI from keyword input  
- 🛠 **Admin CMS** – review and edit AI-generated content  
- 🗄 **PostgreSQL** – shared database for all services

---

## # Deploy and Host

This template is designed for quick deployment on [Railway](https://railway.app). You can spin up all services with a single click using pre-configured `.env` files for each component.

### How to deploy:
1. Click "Deploy Template"
2. Fill in required environment variables:
   - `KEYWORD_TOPIC`
   - `POSTGRES_URL`
   - `OPENAI_API_KEY`
3. Railway will build and connect all services automatically.

---

## ## About Hosting

- **Railway Managed PostgreSQL** handles all database persistence.
- **Dockerized Services** (`TrendGen Bot`, `Admin CMS`) are deployed as Railway services.
- No queue or external storage is required — everything runs with internal communication via environment variables.

---

## ## Why Deploy

This template saves time by:
- Automatically generating SEO content from trending topics.
- Allowing non-technical users to manage content via Admin CMS.
- Providing a plug-and-play stack with no queue or external setup needed.

Ideal for:
- SEO agencies
- Marketing automation
- Niche blog networks
- MVPs for AI-generated content

---

## ## Common Use Cases

- Create SEO content for a blog automatically every day
- Let human editors review and publish AI-generated articles
- Generate content for long-tail keywords at scale
- Launch micro-content sites from a single dashboard

---

## ## Dependencies for

This project depends on:

- ✅ OpenAI API key
- ✅ PostgreSQL database (can use Railway’s built-in)
- ✅ Node.js runtime for bot and CMS apps

---

### ### Deployment Dependencies

| Component        | Environment Variables Required                   |
|------------------|---------------------------------------------------|
| TrendGen Bot     | `KEYWORD_TOPIC`, `POSTGRES_URL`, `OPENAI_API_KEY`|
| Admin CMS        | `POSTGRES_URL`                                    |
| PostgreSQL       | No manual config (Railway-managed)               |

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Admin CMS | [JohnWickBK99/seo-admin-app-frontend](https://github.com/JohnWickBK99/seo-admin-app-frontend) | Web service |
| SEO TrendGen Bot | `nierdna/seo-trendgen-bot` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Landingpage + Blog | [JohnWickBK99/seo-landingpage-frontend](https://github.com/JohnWickBK99/seo-landingpage-frontend) | Worker |
| GA Telegram Reporter | `nierdna/ga-telegram-reporter` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | Admin CMS | - | Supabase Anon Key |
| `NEXTAUTH_SECRET` | Admin CMS | (secret) | - |
| `TZ` | SEO TrendGen Bot | Asia/Ho_Chi_Min | - |
| `POSTGRES_URL` | SEO TrendGen Bot | - | Supabase Postgres URL |
| `CRON_SCHEDULE` | SEO TrendGen Bot | 0 */6 * * * | - |
| `TOPIC_KEYWORD` | SEO TrendGen Bot | - | topic to search trending |
| `OPENAI_API_KEY` | SEO TrendGen Bot | (secret) | - |
| `TARGET_LANGUAGE` | SEO TrendGen Bot | en | - |
| `MAX_ARTICLES_PER_RUN` | SEO TrendGen Bot | 5 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, PLpgSQL

[View on Railway →](https://railway.com/template/lynx-seo)
