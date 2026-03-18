# Deploy Akira-Railway on Railway

SaaS starter kit with auth, payments, database, and email on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/akira-railway)

## About

Akira-Railway is a SaaS starter kit based on [Akira](https://akira.sachi.dev). It ships with authentication (Google, GitHub, email), payment processing, a Postgres database with Drizzle ORM, and transactional email. Built with  
  Next.js App Router, Bun, Tailwind CSS, and shadcn/ui.                                                                                                                                                                               
                                                                                                                                                                                                                                      
  ## About Hosting Akira-Railway                                                                                                                                                                                                    

  This template deploys the app service and a Postgres database together. Railway auto-detects Bun from the lockfile and builds accordingly. Drizzle migrations run automatically before each deploy via the pre-deploy command, so   
  your database schema stays in sync without manual steps. You'll need to provide API keys for Better Auth, Dodo Payments, Resend, and any OAuth providers (Google, GitHub) you want to enable. The app connects to Railway's internal
   Postgres instance over private networking — no external database configuration required.                                                                                                                                           
                                                                                                                                                                                                                                    
  ## Common Use Cases

  - Launch a new SaaS product without wiring up auth, payments, and email from scratch                                                                                                                                                
  - Prototype and validate a paid product idea with a working checkout flow
  - Use as a reference architecture for Next.js + Bun + Drizzle on Railway                                                                                                                                                            
                                                                                                                                                                                                                                    
  ## Dependencies for Akira-Railway Hosting                                                                                                                                                                                           
   
  - Postgres database (included in template)                                                                                                                                                                                          
  - API keys for third-party services (Better Auth, Dodo Payments, Resend, OAuth providers)                                                                                                                                         
                                                                                                                                                                                                                                      
  ### Deployment Dependencies                                                                                                                                                                                                       
                                                                                                                                                                                                                                      
  - [Akira](https://akira.sachi.dev) — Original starter kit                                                                                                                                                                         
  - [Better Auth](https://www.better-auth.com) — Authentication
  - [Dodo Payments](https://dodopayments.com) — Payment processing                                                                                                                                                                    
  - [Resend](https://resend.com) — Transactional email                                                                                                                                                                                
  - [Drizzle ORM](https://orm.drizzle.team) — Database toolkit

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| akira-railway | [sungkhum/akira-railway](https://github.com/sungkhum/akira-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | akira-railway | - | Full Postgres connection string (auto-generated) |
| `BETTER_AUTH_URL` | akira-railway | - | App URL for Better Auth callbacks (e.g. https://your-app.railway.app)      |
| `BETTER_AUTH_SECRET` | akira-railway | (secret) | Secret key for signing auth tokens (auto-generated) |
| `NEXT_PUBLIC_APP_URL` | akira-railway | - | Public-facing app URL (e.g. https://your-app.railway.app)   |
| `DODO_PAYMENTS_RETURN_URL` | akira-railway | - | Redirect URL after checkout (e.g. https://your-app.railway.app) |
| `POSTGRES_DB` | Postgres | - | Postgres database name |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/template/akira-railway)
