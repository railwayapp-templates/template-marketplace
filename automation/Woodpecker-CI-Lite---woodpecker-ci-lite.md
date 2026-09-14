# Deploy Woodpecker CI Lite on Railway

Self-hosted CI/CD (GitHub Actions alternative). Local backend, no Docker.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/woodpecker-ci-lite)

## About

Woodpecker CI requires two services:

1. **Server** — the web UI and API. Exposes port 8000 for HTTP and port 9000 for GRPC (agent communication).
2. **Agent** — the pipeline executor. Connects to the server via GRPC using a shared secret.

Both services must share the same `WOODPECKER_AGENT_SECRET`. The server stores all data in SQLite, persisted via a Railway volume mounted at `/var/lib/woodpecker`. No Docker daemon is required — the agent runs pipeline steps locally.

**GitHub OAuth (one-time setup):** To enable login, create a GitHub OAuth App as described in the Deployment Dependencies section above. Without OAuth configured, the login button returns a 404 — this is expected behavior.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| woodpecker-server | `woodpeckerci/woodpecker-server:v3.18.1-alpine` | Web service |
| agent | `woodpeckerci/woodpecker-agent:v3.18-alpine` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | woodpecker-server | 8000 | HTTP port the server listens on (Railway provides this automatically) |
| `WOODPECKER_HOST` | woodpecker-server | - | Public URL of this server (used for webhook callbacks and agent connections) |
| `WOODPECKER_OPEN` | woodpecker-server | true | Allow open registration (true/false) |
| `WOODPECKER_ADMIN` | woodpecker-server | - | Leave empty — first OAuth-registered user becomes admin. Set to your GitHub/Gitea/GitLab username to auto-grant admin on first login. (optional) |
| `WOODPECKER_GITEA` | woodpecker-server | false | Enable Gitea OAuth (true/false) |
| `WOODPECKER_GITHUB` | woodpecker-server | true | Enable the GitHub forge. Woodpecker v3 requires exactly one forge driver to be enabled or it will crash-loop on startup (forge not configured). Keep true and add WOODPECKER_GITHUB_CLIENT / WOODPECKER_GITHUB_SECRET for the login button to work. To use a different forge instead, set one of WOODPECKER_FORGEJO / WOODPECKER_GITEA / WOODPECKER_GITLAB to true — and this one to false. |
| `WOODPECKER_GITLAB` | woodpecker-server | false | Enable GitLab OAuth (true/false) |
| `WOODPECKER_FORGEJO` | woodpecker-server | false | Enable Forgejo OAuth (true/false) |
| `WOODPECKER_GRPC_ADDR` | woodpecker-server | 0.0.0.0:9000 | gRPC listen address (default: 0.0.0.0:9000) |
| `WOODPECKER_HTTP_ADDR` | woodpecker-server | 0.0.0.0:8000 | HTTP listen address (default: 0.0.0.0:8000) |
| `WOODPECKER_LOG_LEVEL` | woodpecker-server | info | Log level (debug, info, warn, error) |
| `WOODPECKER_GRPC_SECRET` | woodpecker-server | (secret) | Shared gRPC secret for agent communication |
| `WOODPECKER_AGENT_SECRET` | woodpecker-server | (secret) | Shared secret for agent-to-server authentication (must match agent's secret) |
| `WOODPECKER_DEBUG_PRETTY` | woodpecker-server | false | Enable pretty-printed debug logs (true/false) |
| `WOODPECKER_GITEA_CLIENT` | woodpecker-server | - | Gitea OAuth Client ID (optional) |
| `WOODPECKER_GITEA_SECRET` | woodpecker-server | (secret) | Gitea OAuth Client Secret (optional) |
| `WOODPECKER_DEBUG_NOCOLOR` | woodpecker-server | true | Disable colored debug logs (true/false) |
| `WOODPECKER_GITHUB_CLIENT` | woodpecker-server | - | GitHub OAuth Client ID (optional) |
| `WOODPECKER_GITHUB_SECRET` | woodpecker-server | (secret) | GitHub OAuth Client Secret (optional) |
| `WOODPECKER_GITLAB_CLIENT` | woodpecker-server | - | GitLab OAuth Client ID (optional) |
| `WOODPECKER_GITLAB_SECRET` | woodpecker-server | (secret) | GitLab OAuth Client Secret (optional) |
| `WOODPECKER_FORGEJO_CLIENT` | woodpecker-server | - | Forgejo OAuth Client ID (optional) |
| `WOODPECKER_FORGEJO_SECRET` | woodpecker-server | (secret) | Forgejo OAuth Client Secret (optional) |
| `WOODPECKER_DATABASE_DRIVER` | woodpecker-server | sqlite3 | Database driver (sqlite3, postgres, mysql) |
| `WOODPECKER_DATABASE_DATASOURCE` | woodpecker-server | /var/lib/woodpecker/woodpecker.sqlite | Database connection string or path |
| `WOODPECKER_SERVER` | agent | - | Server gRPC address (host:port) — use the server's private domain |
| `WOODPECKER_BACKEND` | agent | local | Backend type (local, docker, kubernetes) |
| `WOODPECKER_LOG_LEVEL` | agent | info | Log level (debug, info, warn, error) |
| `WOODPECKER_GRPC_SECRET` | agent | (secret) | Shared gRPC secret — references the server's gRPC secret |
| `WOODPECKER_AGENT_SECRET` | agent | (secret) | Shared secret for agent-to-server authentication — references the server's secret |
| `WOODPECKER_MAX_WORKFLOWS` | agent | 4 | Maximum number of parallel workflows |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/woodpecker`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/woodpecker-ci-lite)
