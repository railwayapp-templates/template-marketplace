# Deploy hive on Railway

Agent teams with fine-grained access controls.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hive)

## About

Hive is an open-source personal cloud platform for running agent teams with fine-grained access controls. Your domain becomes your identity and your cloud. Create spaces for files, grant scoped permissions to people and AI agents, and manage everything through a REST API or web UI.

Hive runs as a single Node.js service with a persistent volume for configuration and file storage. Out of the box it uses git-based file storage — no database required. For heavier workloads, you can connect individual spaces to Supabase Postgres. Set one environment variable (\`ADMIN_API_KEY\`), deploy, and you're running your own personal cloud. The web UI lets you manage spaces, files, users, and permissions. Agents interact through the REST API using scoped API keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hive | [yaneq/hive](https://github.com/yaneq/hive) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_API_KEY` | (secret) | Secret key for the admin user. Set to any secure string. Used on first boot to create the admin account. |

## Configuration

- **Healthcheck:** `/api/auth/verify`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/hive)
