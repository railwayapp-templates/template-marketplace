# Deploy Temporal | Durable Workflows, No Elasticsearch on Railway

Durable workflows on Postgres alone - 650 MiB less than the ES version

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/temporal-or-durable-workflows-no-elastic)

## About

Temporal is a durable execution platform: you write ordinary code, and Temporal makes it survive
crashes, restarts and deploys. Workflows keep their state, retries are automatic, and long-running
processes can span days or months without you building a job table and a cron to babysit it.

Most self-hosted Temporal setups run **Elasticsearch** next to Postgres, because that is what the
official `docker-compose` files do. Elasticsearch is there for one feature: *advanced visibility* —
custom search attributes and filtered workflow queries such as `OrderTier="gold"`.

Since Temporal 1.20 that feature works on **PostgreSQL 12+** directly. Elasticsearch is no longer
required for it, but the popular Railway templates still ship it, and it is by far the largest
thing in the project.

This template drops Elasticsearch and keeps the feature. Measured on Railway on 2026-08-15, both
stacks idling in the same environment on the same plan:

| | this template | the most-deployed Temporal template |
|---|---:|---:|
| Postgres | 239 MiB | 154 MiB |
| Temporal | 668 MiB | 75 MiB |
| Elasticsearch | — | **1305 MiB** |
| UI (+ auth proxy) | 9 MiB | 31 MiB |
| **Total** | **915 MiB** | **1565 MiB** |

**650 MiB less, about 42%**, and the Elasticsearch container alone is larger than this entire
stack. Two things to be straight about: the other template's Temporal container was still warming
up when it was sampled, so the real gap is a little smaller than the table suggests; and this
template's Temporal runs heavier on purpose (see history shards below).

Verified on the running deploy, not assumed:

- `operator cluster health` reports `SERVING`
- a custom search attribute (`OrderTier`, Keyword) was created against Postgres
- two workflows were started and `workflow list --query 'OrderTier="gold"'` returned exactly one

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| temporal-auth | `ghcr.io/brody192/railway-caddy-basic-auth:main` | Web service |
| postgres | `postgres:18.4-alpine` | Database |
| temporal-ui | `temporalio/ui:2.53.1` | Worker |
| temporal | `temporalio/auto-setup:1.29.7` | TCP service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PASSWORD` | temporal-auth | (secret) |
| `USERNAME` | temporal-auth | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `POSTGRES_USER` | temporal | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 7233

**Category:** Queues

[View on Railway →](https://railway.com/deploy/temporal-or-durable-workflows-no-elastic)
