# Deploy Morphic + SearXNG on Railway

Perplexity-style AI answer engine with accounts and private SearXNG search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/morphic-searxng)

## About

Morphic is an open-source AI answer engine in the style of Perplexity. Ask a question and it searches the
web, reads the sources and writes a cited answer, rendered with a generative UI of images, grids and
headings, with quick and adaptive search modes and a model picker for every provider you configure. This
is a community-maintained template; it is not affiliated with the Morphic project.

Morphic is a Next.js app with a PostgreSQL database, Supabase Auth for accounts, SearXNG for search and
Redis for caching. Upstream's Docker image runs in anonymous mode, one shared account meant for a single
person on their own machine; real accounts need a Supabase project and an image rebuilt with its keys.

This template runs everything on Railway instead, in one project: Morphic with accounts and history, a
self-hosted Supabase Auth with its gateway, Postgres, SearXNG and Valkey, six services in all, with no
Supabase account and no search API key. The first start creates the database, applies Morphic's
migrations, creates your owner account from the e-mail you enter, writes this deployment's sign-in
settings into the built app, and only then starts serving.

It also closes what a public deployment leaves open. Signup is closed by default and enforced in the
database, so only you and the addresses or domains you list get accounts on your model keys. And
Morphic's advanced-search route, which runs searches and crawls pages for any caller, answers only
Morphic's own search tool.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `valkey/valkey:8.1.10-alpine` | Database |
| kong | `ghcr.io/youssefsiam38/morphic-railway-kong:1.0.0` | Web service |
| db | `ghcr.io/youssefsiam38/morphic-railway-db:1.0.0` | Database |
| searxng | `ghcr.io/youssefsiam38/morphic-railway-searxng:1.0.0` | Worker |
| app | `ghcr.io/youssefsiam38/morphic-railway-app:1.0.0` | Web service |
| auth | `supabase/gotrue:v2.196.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | redis | (secret) | Valkey password, generated. |
| `PORT` | kong | 8000 | - |
| `JWT_SECRET` | kong | (secret) | - |
| `POSTGRES_PASSWORD` | db | (secret) | Password of the database roles, generated. |
| `SEARXNG_SECRET` | searxng | (secret) | SearXNG's secret key, generated. |
| `PORT` | app | 3000 | - |
| `JWT_SECRET` | app | (secret) | - |
| `OWNER_EMAIL` | app | - | Your e-mail address. It becomes the owner account you sign in with. |
| `OPENAI_API_KEY` | app | (secret) | OpenAI API key. Set at least one model provider. |
| `OWNER_PASSWORD` | app | (secret) | The owner's first password, generated. Copy it from here to sign in. |
| `OLLAMA_BASE_URL` | app | - | URL of an Ollama server the app can reach. |
| `ANTHROPIC_API_KEY` | app | (secret) | Anthropic API key. |
| `AI_GATEWAY_API_KEY` | app | (secret) | Vercel AI Gateway key. |
| `MORPHIC_SIGNUP_MODE` | app | closed | closed admits only the owner and MORPHIC_ALLOWED_SIGNUPS; open lets anyone sign up and chat on your model keys. |
| `MORPHIC_ALLOWED_SIGNUPS` | app | - | Comma-separated e-mail addresses and @domain entries that may create accounts. |
| `OPENAI_COMPATIBLE_API_KEY` | app | (secret) | Key for any OpenAI-compatible provider (OpenRouter, DeepSeek and others). |
| `GOOGLE_GENERATIVE_AI_API_KEY` | app | (secret) | Google Gemini API key. |
| `OPENAI_COMPATIBLE_API_BASE_URL` | app | - | Base URL of that provider, e.g. https://openrouter.ai/api/v1. |
| `PORT` | auth | 9999 | - |
| `JWT_SECRET` | auth | (secret) | Signs sessions and the Supabase API keys, generated. |
| `GOTRUE_JWT_AUD` | auth | authenticated | - |
| `GOTRUE_JWT_EXP` | auth | 3600 | - |
| `GOTRUE_API_HOST` | auth | :: | - |
| `GOTRUE_API_PORT` | auth | 9999 | - |
| `GOTRUE_DB_DRIVER` | auth | postgres | - |
| `GOTRUE_SMTP_HOST` | auth | - | Optional SMTP host for password-reset e-mails. |
| `GOTRUE_SMTP_PASS` | auth | - | Optional SMTP password. |
| `GOTRUE_SMTP_PORT` | auth | - | Optional SMTP port. |
| `GOTRUE_SMTP_USER` | auth | (secret) | Optional SMTP user. |
| `GOTRUE_JWT_SECRET` | auth | (secret) | - |
| `GOTRUE_DISABLE_SIGNUP` | auth | false | - |
| `GOTRUE_JWT_ADMIN_ROLES` | auth | service_role | - |
| `GOTRUE_SMTP_ADMIN_EMAIL` | auth | - | Optional sender address for Supabase Auth e-mails. |
| `GOTRUE_MAILER_AUTOCONFIRM` | auth | true | - |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | auth | true | - |
| `GOTRUE_EXTERNAL_GOOGLE_SECRET` | auth | (secret) | Google OAuth client secret. |
| `GOTRUE_EXTERNAL_PHONE_ENABLED` | auth | false | - |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | auth | authenticated | - |
| `GOTRUE_EXTERNAL_GOOGLE_ENABLED` | auth | - | Set true to enable Google sign-in (needs the client id and secret). |
| `GOTRUE_EXTERNAL_GOOGLE_CLIENT_ID` | auth | - | Google OAuth client id. |
| `GOTRUE_EXTERNAL_ANONYMOUS_USERS_ENABLED` | auth | false | - |

## Configuration

- **Start command:** `sh -c 'exec valkey-server --requirepass "$REDIS_PASSWORD" --bind :: 0.0.0.0'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/auth/login`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/morphic-searxng)
