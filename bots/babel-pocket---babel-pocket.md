# Deploy babel-pocket on Railway

Self-hosted user-install Discord translator for you and friends

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/babel-pocket)

## About

Babel Pocket is a self-hosted, user-install Discord translator designed for you and your friends. It provides private, right-click message translations, a web dashboard, per-user budgets, user whitelisting, and bring-your-own AI provider support. It allows a small set of trusted users to translate messages privately across Discord without relying on a public bot or paid subscription.

Hosting Babel Pocket on Railway gives you your own private Discord user-install translation instance. You provide the Discord bot token, dashboard password, Railway hosting, and AI provider credentials. 

Babel Pocket stores configuration, usage, user access whitelists, custom user budgets, language preferences, and sessions in SQLite, so a persistent Railway volume should be mounted at `/app/data`. After deployment, open the dashboard, complete the setup wizard, configure Vertex AI or an OpenAI-compatible provider, whitelist your users, and then register the Discord commands. Babel Pocket does not require privileged Discord intents and keeps all translation workflows entirely private to authorized users.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| babel-pocket | [0xH4KU/babel-pocket](https://github.com/0xH4KU/babel-pocket) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_ENV` | production | - |
| `BABEL_DB_PATH` | /app/data/babel.sqlite | - |
| `DISCORD_TOKEN` | (secret) | Your Discord Bot Token |
| `DASHBOARD_HOST` | 0.0.0.0 | - |
| `DASHBOARD_PASSWORD` | (secret) | A very strong random password |

## Configuration

- **Volume:** `/app/data`

**Category:** Bots · **Languages:** TypeScript, JavaScript, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/babel-pocket)
