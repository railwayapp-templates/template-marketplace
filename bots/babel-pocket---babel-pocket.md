# Deploy babel-pocket on Railway

Self-hosted user-install Discord translator for you and friends

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/babel-pocket)

## About

babel-discord-translator, also known as Babel, is a self-hosted Discord translation bot with one-click message translations, slash commands, a web dashboard, usage budgets, server glossaries, and bring-your-own AI provider support. It helps multilingual Discord communities translate messages without relying on a paid shared translation bot subscription.

Hosting babel-discord-translator on Railway gives you your own private Discord translation bot instance. You provide the Discord bot token, dashboard password, Railway hosting, and AI provider credentials. 

Babel stores configuration, usage, server budgets, language preferences, sessions, and glossaries in SQLite, so a persistent Railway volume should be mounted at `/app/data`. After deployment, open the dashboard, complete the setup wizard, configure Vertex AI or an OpenAI-compatible provider, then register the Discord commands. Babel does not require privileged Discord intents and keeps translation control in your own deployment.

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
