# Deploy zyk on Railway

Claude-native workflow automation. Alpha — not production-ready.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zyk)

## About

Zyk is Claude-native workflow automation. Describe what you want in conversation, Claude generates real TypeScript and deploys it as a durable workflow — with   retries, scheduling, and human-in-the-loop built in. No node editors, no connectors to configure.                                                            
                                                                                                                                                                
  ## About Hosting Zyk                                                                                                                                          

  Zyk runs as three Railway services: the Zyk MCP Server, Hatchet Engine (durable workflow execution), and PostgreSQL. The MCP Server exposes a public HTTPS URL
   you paste into Claude — that's the only configuration needed on your end. Workflows are stored on a persistent volume and workers restart automatically on   
  crash or redeploy. Env vars for third-party APIs (Slack, GitHub, Anthropic) are added directly in the Railway dashboard and picked up automatically by        
  generated workflows.

  ## Common Use Cases

  - Automate Slack notifications triggered by GitHub issues, with AI-assessed severity and human approval before posting
  - Build human-in-the-loop approval workflows that pause mid-execution, wait for a decision, and resume automatically
  - Schedule recurring reports, API monitors, or data pipelines that survive failures with automatic retries

  ## Dependencies for Zyk Hosting

  - PostgreSQL (provisioned automatically by the template)
  - Hatchet Engine (provisioned automatically by the template)

  ### Deployment Dependencies

  - [Zyk on GitHub](https://github.com/zyk-hq-dev/zyk)
  - [Hatchet documentation](https://docs.hatchet.run)
  - [zyk.dev](https://zyk.dev) — demos and overview

  ### Implementation Details

  Workflows are plain TypeScript files stored on a persistent volume at `/app/workflows`. Each workflow runs as a child process that connects to Hatchet via    
  gRPC on port 7077. Trigger workflows via Claude, on a cron schedule, or via webhook.  

  ## Why Deploy Zyk on Railway?

  
  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while 
  allowing you to vertically and horizontally scale it.

  By deploying Zyk on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI    
  agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| hatchet-lite | `ghcr.io/hatchet-dev/hatchet/hatchet-lite:latest` | Web service |
| zyk | [zyk-hq-dev/zyk](https://github.com/zyk-hq-dev/zyk) (root: /mcp-server) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | hatchet-lite | 8888 | - |
| `POSTGRES_USER` | hatchet-lite | (secret) | - |
| `SERVER_GRPC_PORT` | hatchet-lite | 7077 | - |
| `POSTGRES_PASSWORD` | hatchet-lite | (secret) | - |
| `SERVER_GRPC_INSECURE` | hatchet-lite | true | - |
| `SERVER_MSGQUEUE_KIND` | hatchet-lite | postgres | - |
| `SERVER_GRPC_BIND_ADDRESS` | hatchet-lite | 0.0.0.0 | - |
| `SERVER_AUTH_COOKIE_INSECURE` | hatchet-lite | true | - |
| `SERVER_DEFAULT_ENGINE_VERSION` | hatchet-lite | V1 | - |
| `SERVER_GRPC_BROADCAST_ADDRESS` | hatchet-lite | localhost:7077 | - |
| `SERVER_AUTH_SET_EMAIL_VERIFIED` | hatchet-lite | true | - |
| `ZYK_API_KEY` | zyk | (secret) | Protects your MCP endpoint and dashboard. Auto-generated — copy this value from the Variables tab after deploy and paste it into your Claude config. |
| `SLACK_CHANNEL` | zyk | - | Channel ID for Slack messages, e.g. C01234ABCDE. To find it: open the channel in Slack → click the channel name at the top → scroll to the bottom of the popup — the ID is shown there. |
| `WORKFLOWS_DIR` | zyk | /app/workflows | Workflow storage directory (default '/app/workflows') |
| `SLACK_BOT_TOKEN` | zyk | (secret) | xoxb-... token with chat:write scope. From your Slack app's OAuth & Permissions page. |
| `ANTHROPIC_API_KEY` | zyk | (secret) | Required for workflows that use Claude to classify, summarize, or make decisions. Get yours at console.anthropic.com.  |
| `HATCHET_CLIENT_TLS_STRATEGY` | zyk | none | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`
- **Volume:** `/app/workflows`

**Category:** Automation · **Languages:** TypeScript, JavaScript, HTML, PowerShell, Shell, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/zyk)
