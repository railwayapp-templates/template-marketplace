# Deploy Next.js Boilerplate on Railway

Boilerplate and Starter for Next.js 15+, Tailwind CSS 4, and TypeScript.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/0tqKLC)

## About

🚀 Boilerplate and Starter for Next.js with App Router, Tailwind CSS, and TypeScript ⚡️ Prioritizing developer experience first: Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged, Vitest (replacing Jest), Testing Library, Playwright, Commitlint, VSCode, Tailwind CSS, Authentication with Clerk, Database with DrizzleORM (PostgreSQL, SQLite, and MySQL), Error Monitoring with Sentry, Logging with Pino.js and Log Management, Monitoring as Code, Storybook, Multi-language (i18n), AI-powered code reviews with CodeRabbit, Secure with Arcjet (Bot detection, Rate limiting, Attack protection, etc.) and more.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Next.js Boilerplate | [ali-eljerrari/Next-js-Boilerplate](https://github.com/ali-eljerrari/Next-js-Boilerplate) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLERK_SECRET_KEY` | Next.js Boilerplate | (secret) | - |
| `SENTRY_AUTH_TOKEN` | Next.js Boilerplate | (secret) | - |
| `LOGTAIL_SOURCE_TOKEN` | Next.js Boilerplate | (secret) | - |
| `NEXT_TELEMETRY_DISABLED` | Next.js Boilerplate | 1 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, JavaScript, Shell, CSS

[View on Railway →](https://railway.com/deploy/0tqKLC)
