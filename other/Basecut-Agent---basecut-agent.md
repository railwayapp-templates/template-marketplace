# Deploy Basecut Agent on Railway

Deploy and Host the Basecut Agent with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/basecut-agent)

## About

Basecut Agent is a self-hosted worker that continuously polls Basecut for snapshot jobs, executes extraction workflows against your PostgreSQL database, and writes outputs to configured storage. It runs in your infrastructure, keeps credentials in your environment, and reports heartbeats for reliable job orchestration.

Hosting Basecut Agent on Railway means running the agent as a long-lived container service with secure runtime configuration. You deploy the agent image, set BASECUT_API_KEY and BASECUT_DATABASE_URL, and optionally provide cloud credentials for S3, GCS, or S3-compatible outputs. Railway manages runtime health, restarts failed processes, and lets you scale replicas as workload increases. For production environments, use a least-privilege read-only database user and private network paths where possible. You can also tune polling and heartbeat behavior with agent flags to balance responsiveness and API overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| basecuthq/basecut-agent:latest | `ghcr.io/basecuthq/basecut-agent:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BASECUT_API_KEY` | (secret) | Your Basecut API Key |
| `AWS_SESSION_TOKEN` | (secret) | - |
| `BASECUT_DATABASE_URL` | - | The URL of the database Basecut will snapshot |
| `AWS_SECRET_ACCESS_KEY` | (secret) | - |

**Category:** Other

[View on Railway →](https://railway.com/template/basecut-agent)
