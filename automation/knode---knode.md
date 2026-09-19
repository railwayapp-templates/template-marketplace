# Deploy knode on Railway

Deploy Knode: FastAPI + Celery + Expo web. LLM key required.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/knode)

## About

Knode is an organization automation platform: describe jobs in plain English, get testable step plans, run them with Celery workers, and connect GitHub, Slack, Google, and other integrations.

This template provisions a full production stack from the [ebettenga/knode](https://github.com/ebettenga/knode) repo:

| Service | Role |
|---------|------|
| **api** | FastAPI backend (`/ready` healthcheck) |
| **worker** | Celery task executor |
| **beat** | Scheduled runs and poll triggers |
| **web** | Expo static web UI |
| **Postgres** | Database |
| **Redis** | Celery broker |

At deploy time, paste **`LLM_API_KEY`** (required). OAuth credentials are optional — add later in Railway or in-app **Integrations**. Database URLs, secrets, and public domains are auto-wired.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | [ebettenga/knode](https://github.com/ebettenga/knode) (root: /) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [ebettenga/knode](https://github.com/ebettenga/knode) (root: /) | Web service |
| beat | [ebettenga/knode](https://github.com/ebettenga/knode) (root: /) | Web service |
| worker | [ebettenga/knode](https://github.com/ebettenga/knode) (root: /) | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NTFY_TOKEN` | api | (secret) |
| `SECRET_KEY` | api | (secret) |
| `LLM_API_KEY` | api | (secret) |
| `NTFY_ACCESS_TOKEN` | api | (secret) |
| `NTFY_BRIDGE_TOKEN` | api | (secret) |
| `ASANA_CLIENT_SECRET` | api | (secret) |
| `SLACK_CLIENT_SECRET` | api | (secret) |
| `GITHUB_CLIENT_SECRET` | api | (secret) |
| `GOOGLE_CLIENT_SECRET` | api | (secret) |
| `CREDENTIALS_FERNET_KEY` | api | (secret) |
| `KNODE_NTFY_BRIDGE_TOKEN` | api | (secret) |
| `MICROSOFT_CLIENT_SECRET` | api | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `NTFY_TOKEN` | beat | (secret) |
| `SECRET_KEY` | beat | (secret) |
| `LLM_API_KEY` | beat | (secret) |
| `NTFY_ACCESS_TOKEN` | beat | (secret) |
| `NTFY_BRIDGE_TOKEN` | beat | (secret) |
| `ASANA_CLIENT_SECRET` | beat | (secret) |
| `SLACK_CLIENT_SECRET` | beat | (secret) |
| `GITHUB_CLIENT_SECRET` | beat | (secret) |
| `GOOGLE_CLIENT_SECRET` | beat | (secret) |
| `CREDENTIALS_FERNET_KEY` | beat | (secret) |
| `KNODE_NTFY_BRIDGE_TOKEN` | beat | (secret) |
| `MICROSOFT_CLIENT_SECRET` | beat | (secret) |
| `NTFY_TOKEN` | worker | (secret) |
| `SECRET_KEY` | worker | (secret) |
| `LLM_API_KEY` | worker | (secret) |
| `NTFY_ACCESS_TOKEN` | worker | (secret) |
| `NTFY_BRIDGE_TOKEN` | worker | (secret) |
| `ASANA_CLIENT_SECRET` | worker | (secret) |
| `SLACK_CLIENT_SECRET` | worker | (secret) |
| `GITHUB_CLIENT_SECRET` | worker | (secret) |
| `GOOGLE_CLIENT_SECRET` | worker | (secret) |
| `CREDENTIALS_FERNET_KEY` | worker | (secret) |
| `KNODE_NTFY_BRIDGE_TOKEN` | worker | (secret) |
| `MICROSOFT_CLIENT_SECRET` | worker | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `celery -A apps.worker.celery_app beat --loglevel=info`
- **Start command:** `celery -A apps.worker.celery_app worker --loglevel=info`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Automation · **Languages:** Python, TypeScript, Shell, JavaScript, Dockerfile, Mako

[View on Railway →](https://railway.com/deploy/knode)
