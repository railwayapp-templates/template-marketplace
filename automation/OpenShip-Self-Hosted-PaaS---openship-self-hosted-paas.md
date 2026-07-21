# Deploy OpenShip — Self-Hosted PaaS on Railway

Self-hosted PaaS for apps, Compose, domains, backups, and optional email.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openship-self-hosted-paas)

## About

Deploy **OpenShip — Self-Hosted PaaS** on Railway and manage applications,
databases, workers, Docker Compose stacks, and optional multi-domain email
infrastructure on Linux servers you control.

Railway hosts the OpenShip **control plane**:

- Public Next.js dashboard
- Private Hono API and background jobs
- Persistent Railway PostgreSQL for OpenShip state and authentication
- Persistent Railway Redis for queues, cache, and rate limiting

Application and email workloads do **not** run inside the Railway control-plane
containers. OpenShip connects over SSH to one or more external Linux servers,
where it manages Docker, routing, certificates, application data, and optional
mail services. The backend enforces this separation and rejects local workload
deployments in hosted control-plane mode.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| dashboard | [guilhermemarch/openship](https://github.com/guilhermemarch/openship) | Web service |
| api | [guilhermemarch/openship](https://github.com/guilhermemarch/openship) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `INTERNAL_TOKEN` | api | (secret) |
| `BETTER_AUTH_SECRET` | api | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/health`

**Category:** Automation · **Languages:** TypeScript, MDX, Shell, CSS, PLpgSQL, Python, Lua, JavaScript, XSLT, Dockerfile, PowerShell, Java, Kotlin, Rust, PHP, Go, C#, Sieve

[View on Railway →](https://railway.com/deploy/openship-self-hosted-paas)
