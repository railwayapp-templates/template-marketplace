# Deploy FlowiseAI [Updated Aug '26] on Railway

Flowise [Aug '26] (Visual Builder for LLM Apps & AI Agents) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowiseai)

## About

Flowise is the open-source drag-and-drop builder for LLM apps, chatbots, and multi-agent workflows. It's the tool teams reach for when they want LangChain-style power without writing LangChain boilerplate by hand every time they test a new prompt or model combination.

Every flow you build in Flowise stores something sensitive: an OpenAI or Anthropic API key, a connection string to your vector store, sometimes credentials for a tool your agent calls out to. That's the same category of thing an internal admin tool touches, and it's worth treating with the same seriousness.

Flowise Cloud is a reasonable option if you want zero infrastructure to manage, but its pricing is metered by predictions, not just seats. The Starter plan is $35/month, and Pro jumps to $65/month once you cross the metering threshold, a moderately busy customer-facing chatbot can burn through 10,000 predictions in a month without much effort. Self-hosting removes that ceiling entirely. Your cost becomes flat infrastructure plus whatever LLM API usage your flows actually generate, the same API cost you'd pay regardless of where Flowise itself runs.

There's a real implementation detail worth knowing before you deploy this template. Flowise 3.0.1 and later quietly removed the old `FLOWISE_USERNAME`/`FLOWISE_PASSWORD` basic-auth env vars in favor of a proper multi-user system with JWT sessions and a real signup flow. Confirmed against Flowise's own current `.env.example` on GitHub, those two variables aren't even mentioned anymore. If you're following an older tutorial or reference template that still lists them, they'll simply be ignored, real setup now happens through a browser-based admin signup screen the first time you open your instance, the same "first visitor becomes admin" pattern several other modern self-hosted tools use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| flowise-railway | [shruti060701/flowise-railway](https://github.com/shruti060701/flowise-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database name. |
| `DATABASE_URL` | Postgres | - | Confirmed live, standard Railway-generated connection string. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser username. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, auto-generated per deploy. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Only resolves once a TCP Proxy is enabled. |
| `DATABASE_SSL` | flowise-railway | false | Disabled since this connection stays on Railway's private network. |
| `DATABASE_HOST` | flowise-railway | - | Postgres private-network hostname. Confirmed live resolves to `postgres.railway.internal`. |
| `DATABASE_NAME` | flowise-railway | - | Postgres database name. Confirmed live: `railway`. |
| `DATABASE_PORT` | flowise-railway | - | Postgres port. Confirmed live: `5432`. |
| `DATABASE_TYPE` | flowise-railway | postgres | Tells Flowise to use Postgres instead of its default embedded SQLite. |
| `DATABASE_USER` | flowise-railway | (secret) | Postgres username. Confirmed live: `postgres`. |
| `DATABASE_PASSWORD` | flowise-railway | (secret) | Postgres password, auto-generated per deploy.  |
| `DISABLE_FLOWISE_TELEMETRY` | flowise-railway | true | Opts out of anonymous usage data sent to Flowise. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.flowise`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/flowiseai)
