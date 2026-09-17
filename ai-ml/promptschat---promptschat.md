# Deploy prompts.chat on Railway

Self-hosted AI prompt library: 2,000 CC0 prompts, MCP, closed sign-up

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/promptschat)

## About

prompts.chat (formerly Awesome ChatGPT Prompts) is the open-source AI prompt library behind one of GitHub's
most-starred repositories. Browse, search and copy prompts, write your own with versions and change requests, keep
private prompts, vote and comment, organise with categories, tags and collections, and reach your library from AI
tools over MCP. This is a community-maintained template; it is not affiliated with prompts.chat.

prompts.chat is a Next.js app on PostgreSQL, with a white-label mode for running your own library. Self-hosting it
means building or pulling the image, running its database migrations, creating an admin account, importing the
prompt collection, scheduling its daily credit reset, and deciding who may sign up.

This template does all of that on Railway: the app and PostgreSQL 17 with a volume, every secret generated. At the
first start it migrates the database, creates your admin account from the e-mail you enter, and imports the CC0
prompts.chat collection (about 2,000 prompts) from the image. Sign-up stays closed until you list the addresses or
domains allowed to join, and that is enforced in the database for e-mail and GitHub or Google sign-ins alike.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| db | `postgres:17.11-bookworm` | Database |
| app | `ghcr.io/youssefsiam38/promptschat-railway:1.0.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | db | prompts | - |
| `POSTGRES_USER` | db | (secret) | - |
| `POSTGRES_PASSWORD` | db | (secret) | Database password, generated. |
| `PORT` | app | 3000 | - |
| `PCHAT_NAME` | app | Prompt Library | Your library's name, shown in the header, home page and page titles. |
| `AUTH_SECRET` | app | (secret) | Signs sign-in sessions, generated. Changing it signs everyone out. |
| `CRON_SECRET` | app | (secret) | Protects the daily AI credit reset endpoint, generated. |
| `OWNER_EMAIL` | app | - | Your e-mail address. It becomes the admin account you sign in with. |
| `PCHAT_COLOR` | app | - | Primary colour as hex, e.g. #6366f1. |
| `PCHAT_LOCALES` | app | - | Comma-separated interface languages, e.g. en,de,fr (default: all 17). |
| `OPENAI_API_KEY` | app | (secret) | OpenAI API key, for AI search and generation. |
| `OWNER_PASSWORD` | app | (secret) | The admin's first password, generated. Copy it from here to sign in. |
| `OPENAI_BASE_URL` | app | - | An OpenAI-compatible endpoint instead of api.openai.com. |
| `GITHUB_CLIENT_ID` | app | - | GitHub OAuth app client ID, for the github provider. |
| `GOOGLE_CLIENT_ID` | app | - | Google OAuth client ID, for the google provider. |
| `PCHAT_DESCRIPTION` | app | - | The tagline under the name on the home page. |
| `GITHUB_CLIENT_SECRET` | app | (secret) | GitHub OAuth app client secret. |
| `GOOGLE_CLIENT_SECRET` | app | (secret) | Google OAuth client secret. |
| `OWNER_RESET_PASSWORD` | app | (secret) | Set true with a new OWNER_PASSWORD to reset the admin's password; remove afterwards. |
| `PCHAT_AUTH_PROVIDERS` | app | - | Sign-in methods: credentials,github,google (default credentials). |
| `PROMPTS_IMPORT_LIBRARY` | app | true | true imports the CC0 prompts.chat library (about 2,000 prompts) at the first start. |
| `PCHAT_FEATURE_AI_SEARCH` | app | - | true enables semantic search (needs OPENAI_API_KEY). |
| `PROMPTS_ALLOWED_SIGNUPS` | app | - | Comma-separated e-mail addresses and @domain entries allowed to create accounts. |
| `PCHAT_ALLOW_REGISTRATION` | app | false | true shows the sign-up form. Without PROMPTS_ALLOWED_SIGNUPS, anyone could then join. |
| `PCHAT_FEATURE_AI_GENERATION` | app | - | true enables AI prompt generation (needs OPENAI_API_KEY). |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/promptschat)
