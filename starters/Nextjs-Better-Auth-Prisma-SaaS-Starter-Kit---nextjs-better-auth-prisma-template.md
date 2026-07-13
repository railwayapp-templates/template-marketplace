# Deploy Next.js Better Auth Prisma SaaS Starter Kit on Railway

Next.js starter with Better Auth, Prisma/Postgres and role-based dashboards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs-better-auth-prisma-template)

## About

A production-ready Next.js 16 template featuring authentication with Better Auth, PostgreSQL database integration via Prisma ORM, and a modern UI built with Tailwind CSS 4 and Shadcn UI. Pre-configured with email verification, password reset flows, role-based access control, and transactional emails via Resend.

This template provides a complete authentication and database solution for modern web applications. It eliminates weeks of boilerplate setup by combining Next.js's App Router with Better Auth's type-safe authentication system and Prisma's powerful ORM. The stack includes protected routes, admin and user dashboards, OAuth integration (Google), and professional email templates. Built with TypeScript and Bun runtime for blazing-fast performance, it's optimized for Railway's infrastructure with automatic database provisioning and zero-config deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Next.js | [laguillo/nextjs-better-auth-prisma-template](https://github.com/laguillo/nextjs-better-auth-prisma-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | Next.js | production | Application environment (development, production, etc.) |
| `DATABASE_URL` | Next.js | - | PostgreSQL database connection string |
| `RESEND_API_KEY` | Next.js | (secret) | Resend API key for sending emails |
| `GOOGLE_CLIENT_ID` | Next.js | your-client-id | Google OAuth client credentials |
| `EMAIL_SENDER_NAME` | Next.js | SaaS Template | Email sender information for transactional emails |
| `BETTER_AUTH_SECRET` | Next.js | (secret) | Resend API key for sending emails |
| `EMAIL_SENDER_ADDRESS` | Next.js | no-reply@yourdomain.com | Email sender information for transactional emails |
| `GOOGLE_CLIENT_SECRET` | Next.js | (secret) | Google OAuth client credentials |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/nextjs-better-auth-prisma-template)
