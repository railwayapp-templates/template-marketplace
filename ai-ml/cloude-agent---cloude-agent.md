# Deploy cloude-agent on Railway

Deploy the Claude Agent SDK to the cloud. Invoke via API or webhooks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloude-agent)

## About

This template deploys the Claude Code agent to the cloud and gives it a workspace to work with files. Load up skills and commands to extend its capabilities. Invoke via API or webhook.

One click deploy. Just add an ANTHROPIC_API_KEY to the environment variables, along with an API_KEY for using your own API (to talk to the deployed app).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cloude-agent | [chrisboden/cloude-agent](https://github.com/chrisboden/cloude-agent) | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_KEY` | cloude-agent | (secret) | Create your own API key for your app. You'll need this to use your app API and webhooks |
| `ANTHROPIC_API_KEY` | cloude-agent | (secret) | Key requried for Claude Agent to use Anthropic LLMs |
| `ALLOW_BYPASS_PERMISSIONS` | cloude-agent | 1 | Determines if permissions can be bypassed via API. 1 = yes, 0 = no |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Volume:** `/app/workspace`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/cloude-agent)
