# Deploy Langfuse v2 on Railway

Open source observability and analytics for LLM applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gmbqa_)

## About

Langfuse is an open source observability & analytics solution for LLM-based applications. It is mostly geared towards production usage but some users also use it for local development of their LLM applications.

Langfuse is focused on applications built on top of LLMs. Many new abstractions and common best practices evolved recently, e.g. agents, chained prompts, embedding-based retrieval, LLM access to REPLs & APIs. These make applications more powerful but also unpredictable for developers as they cannot fully anticipate how changes impact the quality, cost and overall latency of their application. Thus Langfuse helps to monitor and debug these applications.

Using this template, you can deploy Langfuse to Railway. It automatically creates a Postgres database to store your production data.

In case of errors, try restarting the application container or join the Discord to get help: https://langfuse.com/discord

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langfuse-server | `ghcr.io/langfuse/langfuse:2` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SALT` | langfuse-server | - | You can generate it your own, e.g. using "openssl rand -base64 32" |
| `DATABASE_URL` | langfuse-server | - | Connection string of your Postgres database. |
| `NEXTAUTH_URL` | langfuse-server | - | Public url of application |
| `NEXTAUTH_SECRET` | langfuse-server | (secret) | You can generate it your own, e.g. using "openssl rand -base64 32" |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/gmbqa_)
