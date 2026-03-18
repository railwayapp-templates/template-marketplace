# Deploy sqlchat on Railway

Chat-based SQL Client and Editor for the next decade

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/KsHjEY)

## About

![SQL Chat banner](https://raw.githubusercontent.com/sqlchat/sqlchat/main/public/banner.webp)

## What

SQL Chat is a chat-based SQL client, which uses natural language to communicate with the database to implement operations such as query, modification, addition, and deletion of the database.

![Screenshot](https://raw.githubusercontent.com/sqlchat/sqlchat/main/public/screenshot1.webp)

![Screenshot](https://raw.githubusercontent.com/sqlchat/sqlchat/main/public/screenshot2.webp)

![Screenshot](https://raw.githubusercontent.com/sqlchat/sqlchat/main/public/screenshot3.webp)

## Why

As we enter the [Developer Tools 2.0 era](https://www.sequoiacap.com/article/ai-powered-developer-tools/),
there is a massive opportunity to rebuild the existing tools using the chat-based interface. SQL Client
is no exception. Instead of navigating across many UI controls, a chat-based interface is much
more intuitive. Of course, only if that works, and our goal is to deliver that experience.

## How

SQL Chat is built by [Next.js](https://nextjs.org/), it supports the following databases and will add more over time:

- MySQL
- PostgreSQL
- MSSQL
- TiDB Cloud

## [sqlchat.ai](https://sqlchat.ai)

### IP Whitelisting

If you use [sqlchat.ai](https://sqlchat.ai) to connect to your database, you need to add 0.0.0.0 (allow all connections)
to the database whitelist IP. Because sqlchat.AI is hosted on [Vercel](https://vercel.com/) which [uses dynamic IP](https://vercel.com/guides/how-to-allowlist-deployment-ip-address). If this is a concern, please consider the self-host option below.

### Data Privacy

See [SQL Chat Privacy Policy](https://sqlchat.ai/privacy).

## Self-host

### Docker

If you just want to run for your own use, supply the following options:

- `NEXTAUTH_SECRET`
- `OPENAI_API_KEY`

```bash
docker run --name sqlchat --platform linux/amd64 --env NEXTAUTH_SECRET="$(openssl rand -hex 5)" --env OPENAI_API_KEY=&lt;&gt; -p 3000:3000 --hostname localhost sqlchat/sqlchat
```

- Pass an arbitrary string to NEXTAUTH_SECRET otherwise next-auth will complain.
- If you chat to the database on the same host, you need to use `host.docker.internal` as the host in
  the database connection setting.

<img src="https://raw.githubusercontent.com/sqlchat/sqlchat/main/docs/docker-connection-setting.webp">

## Startup options

## TL;DR

- If you just want to use for yourself, then run without database. Check [.env.nodb](https://github.com/sqlchat/sqlchat/blob/main/.env.nodb).
- If you want to offer a similar service as [sqlchat.ai](https://sqlchat.ai), then run with database, check [.env.usedb](https://github.com/sqlchat/sqlchat/blob/main/.env.usedb). The database is used to store account, usage info.

### OpenAI related

- `OPENAI_API_KEY`: OpenAI API key. You can get one from [here](https://platform.openai.com/api-keys).

- `OPENAI_API_ENDPOINT`: OpenAI API endpoint. Defaults to `https://api.openai.com`. Use [Ollama](https://github.com/ollama/ollama) to set up self-host AI model and set the endpoint to it.

- `NEXT_PUBLIC_ALLOW_SELF_OPENAI_KEY`: Set to `true` to allow users to bring their own OpenAI API key.


### Database related

- `NEXT_PUBLIC_USE_DATABASE`: Set to `true` to start SQL Chat with database. This will
  enable following features:
  1. Account system.
  1. Per-user quota enforcement.
  1. Payment.
  1. Usage data collection.
- `DATABASE_URL`: Applicable if `NEXT_PUBLIC_USE_DATABASE` is `true`. Postgres connection string to store data. e.g. `postgresql://postgres:YOUR_PASSWORD@localhost:5432/sqlchat?schema=sqlchat`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sqlchat | `sqlchat/sqlchat` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | Your openai API key |
| `NEXTAUTH_SECRET` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/KsHjEY)
