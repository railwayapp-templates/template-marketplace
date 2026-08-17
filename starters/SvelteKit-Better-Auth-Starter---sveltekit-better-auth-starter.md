# Deploy SvelteKit + Better Auth Starter on Railway

SvelteKit 3, Better Auth, Postgres/Drizzle, i18n, email: a base to build on

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sveltekit-better-auth-starter)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/sveltekit-better-auth-starter?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=sveltekit-better-auth-starter)

A minimal, production-shaped SvelteKit app to build on: sign-in, password reset and email verification (Better Auth), Postgres via Drizzle with migrations, URL-locale i18n (`/`, `/pl`, `/de`, `/uk`, `/es`), transactional email, security headers, a health endpoint and one protected area. Source: [nomideusz/sveltekit-better-auth-starter](https://github.com/nomideusz/sveltekit-better-auth-starter).

Two services: the SvelteKit server (Node adapter, built by Railpack from the repo) and PostgreSQL 17 on a volume. Every deploy runs Drizzle migrations and then creates the admin account from `ADMIN_EMAIL` / `ADMIN_PASSWORD` if it does not exist yet, so a fresh deploy has someone who can sign in without opening public sign-up. Sessions, password-reset and verification tokens live in Postgres (Better Auth tables). Email goes out over Resend's HTTP API when `RESEND_API_KEY` is set (Railway's Hobby plan blocks outbound SMTP ports, so this is the transport that works there) or over SMTP; with neither, reset and verification emails are logged instead of sent and the app runs fully. Built on `@sveltejs/kit` 3.0.0-next (pre-release) and Svelte 5.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| sveltekit | [nomideusz/sveltekit-better-auth-starter](https://github.com/nomideusz/sveltekit-better-auth-starter) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | app | Database name |
| `POSTGRES_USER` | postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated database password |
| `ORIGIN` | sveltekit | - | Public URL - used in emails and as the auth base URL. Change if you attach a custom domain. |
| `SMTP_FROM` | sveltekit | - | Sender address. With Resend: a verified domain sender, or leave empty to use onboarding@resend.dev (delivers only to your own Resend account email). |
| `SMTP_HOST` | sveltekit | - | Optional - SMTP host (only reachable on plans that allow outbound SMTP; otherwise use RESEND_API_KEY) |
| `SMTP_PORT` | sveltekit | 465 | Optional |
| `SMTP_USER` | sveltekit | (secret) | Optional |
| `ADMIN_EMAIL` | sveltekit | - | Your login email - the admin account is created on first deploy |
| `ALLOW_SIGNUP` | sveltekit | false | true opens public sign-up at /auth/signup (with email verification); false = admin creates accounts |
| `DATABASE_URL` | sveltekit | - | Postgres connection - wired to the bundled database, leave as is |
| `SMTP_PASSWORD` | sveltekit | (secret) | Optional |
| `ADMIN_PASSWORD` | sveltekit | (secret) | Auto-generated first password - read it here after deploy, then change it in the app |
| `RESEND_API_KEY` | sveltekit | (secret) | Optional - email via Resend's HTTP API. Use this on the Hobby plan: outbound SMTP ports are blocked there. Set SMTP_FROM to your verified sender. |
| `SMTP_FROM_NAME` | sveltekit | App | Brand name in emails and page header |
| `BETTER_AUTH_SECRET` | sveltekit | (secret) | Auto-generated - signs sessions |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Svelte, JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/sveltekit-better-auth-starter)
