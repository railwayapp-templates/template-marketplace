# Deploy InnerLink: nextjs better-auth postgres on Railway

AI powered Therapy with AI-Human Therapist

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/innerlink-nextjs-better-auth-postgres)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template-id)

This template is optimized for **Railway deployment** with one-click setup including:
- PostgreSQL database provisioning
- Environment variable configuration
- Automatic SSL certificates
- Custom domain support

### Railway Advantages
- **🚀 Zero Config Deployment** - Deploy directly from GitHub
- **📊 Managed PostgreSQL** - Automatic database setup and backups
- **🔧 Environment Management** - Secure variable handling
- **📈 Auto Scaling** - Handle traffic spikes automatically
- **💰 Cost Effective** - Pay only for what you use
- **🔒 Enterprise Security** - SOC 2 compliant infrastructure

### Infrastructure Requirements
- **Database**: PostgreSQL 14+ for user data and sessions
- **Runtime**: Node.js 18+ for Next.js application
- **Memory**: 512MB minimum for AI avatar streaming
- **Storage**: Minimal (stateless application)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| nextjs better-auth  | [vivekvt/InnerLink](https://github.com/vivekvt/InnerLink) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | Password for PostgreSQL user authentication |
| `DATABASE_URL` | Postgres | - | Full PostgreSQL connection string (postgresql://user:pass@host:port/db) |
| `POSTGRES_USER` | Postgres | (secret) | Master username for PostgreSQL instance |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated secure password (32 chars, alphanumeric) |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public-facing database URL for external connections |
| `DIRECT_URL` | nextjs better-auth  | - | Direct_URLDirect database connection for running migrations |
| `DATABASE_URL` | nextjs better-auth  | - | PostgreSQL connection string for the primary database |
| `SENDER_EMAIL` | nextjs better-auth  | - | From email address for authentication emails |
| `HEYGEN_API_KEY` | nextjs better-auth  | (secret) | HeyGen API key for AI avatar streaming functionality |
| `RESEND_API_KEY` | nextjs better-auth  | (secret) |  API key for Resend email service (email verification) |
| `OPEN_ROUTER_KEY` | nextjs better-auth  | - | OpenRouter API key for AI conversation processing |
| `BETTER_AUTH_SECRET` | nextjs better-auth  | (secret) | Secret key for Better Auth session encryption |
| `NEXT_PUBLIC_BASE_URL` | nextjs better-auth  | - | Public base URL of your deployed application |
| `NEXT_PUBLIC_BASE_API_URL` | nextjs better-auth  | - | Public API base URL for avatar services |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/template/innerlink-nextjs-better-auth-postgres)
