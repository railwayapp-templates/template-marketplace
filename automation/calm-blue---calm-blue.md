# Deploy calm-blue on Railway

n8n self-hosting infrastructure

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calm-blue)

## About

calm-blue is a self-hosted n8n workflow automation instance. Connect any app, API, or service and build      
  unlimited automated pipelines — no per-execution pricing, full data privacy, complete control over your
  workflows.                                                                                                   
                  
  ## About Hosting calm-blue

  Hosting calm-blue on Railway provisions a production-ready n8n automation server backed by PostgreSQL. The   
  instance runs as a Docker container with persistent storage for workflow data and credentials. Railway
  auto-injects all database connection variables, handles SSL, and keeps your instance running 24/7. You bring 
  your API keys — Railway handles the infrastructure.

  ## Common Use Cases

  - Automated AI content pipelines (research → write → image → publish)
  - Ad creative generation using Claude Sonnet + gpt-image-1
  - Brand asset automation connected to Notion, Google Sheets, and Drive                                       
   
  ## Dependencies for calm-blue Hosting                                                                        
                  
  - PostgreSQL (provisioned automatically via Railway)
  - Docker image: `docker.io/n8nio/n8n`
                                                                                                               
  ### Deployment Dependencies
                                                                                                               
  - Anthropic API key for Claude Sonnet AI nodes
  - OpenAI API key for gpt-image-1 image generation

  ## Why Deploy calm-blue on Railway?                                                                          
   
  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so 
  you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying calm-blue on Railway, you are one step closer to supporting a complete full-stack application   
  with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8nio/n8n | `n8nio/n8n` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_TYPE` | n8nio/n8n | postgresdb | - |
| `DB_POSTGRESDB_USER` | n8nio/n8n | (secret) | - |
| `N8N_ENCRYPTION_KEY` | n8nio/n8n | d12ef0be0fc140edeb5a1aee222fa24ae441defea5ce5034599ab18f4df11c54 | - |
| `EXECUTIONS_DATA_PRUNE` | n8nio/n8n | true | - |
| `DB_POSTGRESDB_PASSWORD` | n8nio/n8n | (secret) | - |
| `EXECUTIONS_DATA_MAX_AGE` | n8nio/n8n | 168 | - |
| `N8N_USER_MANAGEMENT_JWT_SECRET` | n8nio/n8n | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/calm-blue)
