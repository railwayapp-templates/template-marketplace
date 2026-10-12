# Deploy AI Teammates on Railway

Open-source alternative to Grok Bot: AI agents with a computer of their own

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-teammates)

## About

**The open-source alternative to Grok Bot, OpenAI Dots and Meta Muse.** AI teammates with a job, a memory and a cloud computer of their own.

Every prompt, tool and limit is a file in the repository, with auth, billing, usage metering and observability already in place. You start from a working product and change whatever you like.

🎬 [Watch it being built on YouTube](https://www.youtube.com/watch?v=mQBuZ6Dp0u0)

This template deploys one service: the Next.js app, built from the [public repository](https://github.com/code-with-antonio/ai-teammates). Everything else is a managed service you connect with a key.

| Service         | What it does here                                              | Needed   |
| --------------- | -------------------------------------------------------------- | -------- |
| **Clerk**       | Sign-in, plus Billing for plans and feature gates              | Yes      |
| **Neon**        | Postgres, and the AI Gateway the chat model is called through  | Yes      |
| **Daytona**     | One cloud sandbox per bot: shell, files and a desktop          | Yes      |
| **Trigger.dev** | Runs the chat agent and the task that meters running sandboxes | Yes      |
| **Sentry**      | Errors, traces, session replays and logs                       | Optional |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AI Teammates | [code-with-antonio/ai-teammates](https://github.com/code-with-antonio/ai-teammates) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SENTRY_ORG` | - | Sentry organization slug, used to upload source maps on build |
| `DATABASE_URL` | - | Neon pooled Postgres connection string, used by the app |
| `SENTRY_PROJECT` | - | Sentry project slug, used to upload source maps on build |
| `DAYTONA_API_KEY` | (secret) | Daytona API key, used to create each bot's sandbox |
| `CLERK_SECRET_KEY` | (secret) | Clerk secret key, from the Clerk dashboard under API keys |
| `SENTRY_AUTH_TOKEN` | (secret) | Sentry auth token for source map upload. Leave empty to skip the upload |
| `TRIGGER_SECRET_KEY` | (secret) | Production secret key of your own Trigger.dev project |
| `DATABASE_URL_UNPOOLED` | - | Neon direct Postgres connection string, used to push the schema |
| `NEON_AI_GATEWAY_TOKEN` | (secret) | Token for your Neon AI Gateway |
| `NEXT_PUBLIC_SENTRY_DSN` | - | Sentry DSN for error, trace and replay reporting. Leave empty to turn Sentry off |
| `NEON_AI_GATEWAY_BASE_URL` | - | Base URL of your Neon AI Gateway, which serves the chat model |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | /sign-in | Path of the sign-in page. Leave as /sign-in |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | /sign-up | Path of the sign-up page. Leave as /sign-up |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | - | Clerk publishable key, from the Clerk dashboard under API keys |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | / | Where to send users after signing in. Leave as / |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | / | Where to send users after signing up. Leave as / |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, Shell, CSS, JavaScript, Astro, HTML, Vue

[View on Railway →](https://railway.com/deploy/ai-teammates)
