# Deploy Mastra Agent on Oracle Database on Railway

Mastra weather agent with all state in Oracle Database Free.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mastra-agent-on-oracle-database)

## About

[Mastra](https://mastra.ai) is the open-source TypeScript framework for building AI agents and workflows. This template deploys a weather agent and workflow whose entire state — conversation threads, messages, workflow snapshots, and traces — lives in Oracle Database via `@mastra/oracledb`. `OracleStore` holds that state, and `OracleVector` is registered on the same connection pool, ready for semantic recall when you add an embedder.

The template provisions two services: the Mastra server and an Oracle Database Free instance (`gvenzl/oracle-free`) with a persistent volume. Give that volume at least 5 GB; the extracted database uses about 3.2 GB. You supply two values: an OpenAI API key and a password for the Oracle application user. The app reads that password over Railway's private network, so you set it once. Oracle needs about a minute to initialize on first boot, and about ten seconds on every restart after that — the app retries until the database accepts connections. The public domain serves both the Mastra REST API and Mastra Studio, so you can read the Oracle-backed threads and traces in the browser. Set your OpenAI API key and deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mastra Server | [leoisadev1/mastra-template-oracledb](https://github.com/leoisadev1/mastra-template-oracledb) | Web service |
| Oracle | [leoisadev1/mastra-template-oracledb](https://github.com/leoisadev1/mastra-template-oracledb) (root: docker/oracle) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `OPENAI_API_KEY` | Mastra Server | (secret) |
| `ORACLE_DATABASE_PASSWORD` | Mastra Server | (secret) |
| `APP_USER_PASSWORD` | Oracle | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/oracle/oradata`

**Category:** AI/ML · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mastra-agent-on-oracle-database)
