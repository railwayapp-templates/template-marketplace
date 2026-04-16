# Deploy pulse-baseline-no-redis on Railway

Pulse Railway router and janitor layout.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pulse-baseline-no-redis)

## About

Deploy the Pulse Railway baseline infrastructure layout on Railway. This variant excludes Redis for apps that provide an external Redis URL.

This template is intentionally infrastructure-only. It gives `pulse-railway init` a curated Railway canvas topology while the CLI remains authoritative for runtime images, variables, domains, healthchecks, cron, replicas, and deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pulse-router | `ghcr.io/erwinkn/pulse-railway-router:template` | Worker |
| pulse-janitor | `ghcr.io/erwinkn/pulse-railway-janitor:template` | Worker |

**Category:** Other

[View on Railway →](https://railway.com/deploy/pulse-baseline-no-redis)
