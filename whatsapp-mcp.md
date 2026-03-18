# Deploy whatsapp mcp on Railway

Deploy and Host whatsapp mcp with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/whatsapp-mcp)

## About

**What is WhatsApp MCP?**  
WhatsApp MCP (Model Context Protocol) is a Python-based backend template for building AI-powered WhatsApp bots and assistants. It connects WhatsApp users to custom AI tools—such as chatbots, automation agents, and data processors—via the Puch AI platform. The template processes messages, images, and commands, enabling seamless, secure, and scalable AI-powered conversations directly from WhatsApp.

Hosting WhatsApp MCP involves running your AI assistant’s backend in the cloud, ensuring it’s always online and ready to serve users. With Railway, you can deploy your MCP server in minutes—no DevOps headaches required. Simply connect your GitHub repository, set up environment variables (such as API keys and database URLs), and Railway takes care of building, deploying, and scaling your app. This makes it easy to integrate with WhatsApp via Puch AI, providing fast, reliable responses 24/7, without worrying about server maintenance or downtime.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mcp-server | [hawkaii/annapurna](https://github.com/hawkaii/annapurna) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MY_NUMBER` | mcp-server | <YOUR_MOBILE_NUMBER |
| `AUTH_TOKEN` | mcp-server | (secret) |
| `VISION_KEY` | mcp-server | <AZURE_AI_VISION_KEY> |
| `DATABASE_URL` | mcp-server | postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${RAILWAY_TCP_PROXY_URL}/${POSTGRES_DB} |
| `GEMINI_API_KEY` | mcp-server | (secret) |
| `VISION_ENDPOINT` | mcp-server | https://<your-resource-name>.cognitiveservices.azure.com |
| `POSTGRES_DB` | Postgres | postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${PGHOST}:${PGPORT}/${POSTGRES_DB} |
| `DATABASE_URL` | Postgres | postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${RAILWAY_TCP_PROXY_URL}/${POSTGRES_DB} |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `DATABASE_PUBLIC_URL` | Postgres | postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${RAILWAY_TCP_PROXY_URL}/${POSTGRES_DB} |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/whatsapp-mcp)
