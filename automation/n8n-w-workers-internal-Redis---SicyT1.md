# Deploy n8n [w/ workers + internal Redis] on Railway

Setup of n8n with internal Redis, Postgres and workers. Just deploy it

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/SicyT1)

## About

**⚠️ IMPORTANT:**  
If your deployment fails, make sure you’ve opted out of **IPv4 Private Networks** in your [Railway Account Settings → Feature Flags](https://railway.com/account/feature-flags).

**⚠️ Note:**  
I've requested support for connecting to Redis over Railway's IPv6-only internal network ([n8n GitHub Issue #13117](https://github.com/n8n-io/n8n/issues/13117)), and now it's fully supported by n8n.  

With this support in place, you **won't be charged for egress usage** anymore. Plus, it’s now **more secure** since your Redis is no longer exposed to the public network.

### Quick Start

- Just deploy it - **no additional configuration required**
- Open the Primary node / instance
- Go to Settings, follow the Public Networking URL to access your n8n web UI

### Template changelog
**October 6 2025**
- Changed Redis image to [railwayapp/redis](https://hub.docker.com/r/railwayapp/redis)

**September 10, 2025**
- Added `N8N_PROXY_HOPS=1` (from [Issue #18498](https://github.com/n8n-io/n8n/issues/18498)). Recommended when running behind a reverse proxy

**March 13, 2025**
- Added `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` set to `true` based on [n8n GitHub PR #11284](https://github.com/n8n-io/n8n/pull/11284). This offloads manual workflow executions to worker nodes, improving performance distribution


> If you have any questions or run into issues, feel free to reach out to me here - [Railway Help Station](https://station.railway.com/templates/n8n-queue-mode-by-anton-lvovych-a08b36c7)

---

![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n - Secure Workflow Automation for Technical Teams

n8n is a workflow automation platform that gives technical teams the flexibility of code with the speed of no-code. With 400+ integrations, native AI capabilities, and a fair-code license, n8n lets you build powerful automations while maintaining full control over your data and deployments.

![n8n.io - Screenshot](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-screenshot-readme.png)

## Key Capabilities

- **Code When You Need It**: Write JavaScript/Python, add npm packages, or use the visual interface
- **AI-Native Platform**: Build AI agent workflows based on LangChain with your own data and models
- **Full Control**: Self-host with our fair-code license or use our [cloud offering](https://app.n8n.cloud/login)
- **Enterprise-Ready**: Advanced permissions, SSO, and air-gapped deployments
- **Active Community**: 400+ integrations and 900+ ready-to-use [templates](https://n8n.io/workflows)

## Resources

- 📚 [Documentation](https://docs.n8n.io)
- 🔧 [400+ Integrations](https://n8n.io/integrations)
- 💡 [Example Workflows](https://n8n.io/workflows)
- 🤖 [AI & LangChain Guide](https://docs.n8n.io/langchain/)
- 👥 [Community Forum](https://community.n8n.io)
- 📖 [Community Tutorials](https://community.n8n.io/c/tutorials/28)

## Support

Need help? Our community forum is the place to get support and connect with other users:
[community.n8n.io](https://community.n8n.io)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Primary | `n8nio/n8n` | Web service |
| Redis | `railwayapp/redis` | Database |
| Worker | `n8nio/n8n` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | n8n | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `PGPORT_PRIVATE` | Postgres | 5432 | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | Primary | 5678 | - |
| `DB_TYPE` | Primary | postgresdb | - |
| `N8N_PROXY_HOPS` | Primary | 1 | - |
| `EXECUTIONS_MODE` | Primary | queue | - |
| `DB_POSTGRESDB_USER` | Primary | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Primary | :: | - |
| `N8N_RUNNERS_ENABLED` | Primary | true | - |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true | - |
| `REDISHOST` | Redis | - | Set only if Redis publicly exposed. Default - ${{RAILWAY_TCP_PROXY_DOMAIN}} |
| `REDISPORT` | Redis | - | Set only if Redis publicly exposed. Default - ${{RAILWAY_TCP_PROXY_PORT}} |
| `REDISUSER` | Redis | default | Do not change. There is no way to change user name via env var. Make sure you use default - default |
| `REDIS_URL` | Redis | - | Set only if Redis publicly exposed. Default - redis://default:${{REDIS_PASSWORD}}@${{RAILWAY_TCP_PROXY_DOMAIN}}:${{RAILWAY_TCP_PROXY_PORT}} |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDISPORT_PRIVATE` | Redis | 6379 | - |
| `PORT` | Worker | 5678 | - |
| `DB_TYPE` | Worker | postgresdb | - |
| `EXECUTIONS_MODE` | Worker | queue | - |
| `DB_POSTGRESDB_USER` | Worker | (secret) | - |
| `N8N_LISTEN_ADDRESS` | Worker | :: | - |
| `N8N_RUNNERS_ENABLED` | Worker | true | - |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) | - |
| `QUEUE_HEALTH_CHECK_ACTIVE` | Worker | true | - |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true | - |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`
- **Start command:** `n8n worker`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/SicyT1)
