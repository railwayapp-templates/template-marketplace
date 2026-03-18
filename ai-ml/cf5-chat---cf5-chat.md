# Deploy cf5 chat on Railway

Chat with multiple models in a sleek interface.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cf5-chat)

## About

CF5 Chat is an open-source, self-hostable chat app for chatting with multiple AI models. Created for the [t3 Chat Cloneathon](https://cloneathon.t3.chat)

CF5 Chat requires that you have a Postgres database and host the Svelte web app from GitHub. If you want more information on self-hosting, check the [Github](https://github.com/CoasterFan5/cfchat)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chat | [CoasterFan5/cfchat](https://github.com/CoasterFan5/cfchat) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ZERO_APP` | chat | 0 |
| `ZERO_TOKEN` | chat | (secret) |
| `GOOGLE_TOKEN` | chat | (secret) |
| `OPENAI_TOKEN` | chat | (secret) |
| `GITHUB_CLIENT_SECRET` | chat | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `node ./apps/web/build`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Svelte, TypeScript, JavaScript, SCSS, HTML

[View on Railway →](https://railway.com/deploy/cf5-chat)
