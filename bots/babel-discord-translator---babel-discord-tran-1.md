# Deploy babel-discord-translator on Railway

A self-hosted Discord translation for server installs and user installs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/babel-discord-tran-1)

## About

babel-discord-translator, also known as Babel, is a self-hosted Discord translation monorepo with two app profiles:

- **Babel Guild** for server/guild installs, public slash-command workflows, server budgets, and server glossaries.
- **Babel Pocket** for user installs, private right-click translations, user-scoped access, and personal usage budgets.

Both apps share the same Railway template, dashboard, SQLite persistence, provider setup, metrics, and operational foundations. Choose which app to deploy by setting `BABEL_APP` to `guild` or `pocket`.

Hosting Babel on Railway gives you your own private Discord translation app instance. You provide the Discord token, dashboard password, Railway hosting, and AI provider credentials.

Set `BABEL_APP=guild` if you want the server-install product for Discord communities. Set `BABEL_APP=pocket` if you want the user-install product for individuals, trusted friends, or private workflows.

Babel stores configuration, usage, budgets, language preferences, sessions, and app-specific access data in SQLite, so mount a persistent Railway volume at `/app/data`. After deployment, open the dashboard, complete the setup wizard, configure Vertex AI or an OpenAI-compatible provider, then register the matching Discord commands. Babel does not require privileged Discord intents and keeps translation control in your own deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| babel-discord-translator | [0xH4KU/babel-discord-translator](https://github.com/0xH4KU/babel-discord-translator) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_ENV` | production | - |
| `BABEL_APP` | - | Set to guild for Babel Guild or pocket for Babel Pocket |
| `BABEL_DB_PATH` | /app/data/babel.sqlite | - |
| `DISCORD_TOKEN` | (secret) | Your Discord Bot Token |
| `DASHBOARD_HOST` | 0.0.0.0 | - |
| `DASHBOARD_PASSWORD` | (secret) | A very strong random password |

## Configuration

- **Volume:** `/app/data`

**Category:** Bots · **Languages:** TypeScript, JavaScript, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/babel-discord-tran-1)
