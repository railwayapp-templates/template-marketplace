# Deploy Infisical Open Source [Updated Aug '26] on Railway

Infisical [Aug '26] (Open-Source Secrets Management) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/infisical-open-source)

## About

Infisical is the open-source platform for storing, syncing, and managing secrets and environment variables across your team, CI/CD pipeline, and infrastructure. Secrets are encrypted end-to-end, and role-based access control keeps every environment's credentials scoped to the people who actually need them, not shared in a Slack message or a `.env` file nobody remembers to delete.

Infisical Cloud's Pro plan runs $20/identity/month billed annually ($23 month-to-month), and the Advanced plan, needed for dynamic secrets and SOC 2 features, runs $40/identity/month. Both scale directly with how many team members and machine identities you add, which adds up fast for a team issuing separate identities to CI pipelines, staging servers, and production services. Self-hosted Infisical on Railway costs a flat infrastructure fee no matter how many identities or secrets you're managing.

The bigger reason to self-host a secrets manager specifically isn't only the per-identity pricing curve. A secrets manager is, by definition, the one service that touches every other credential in your stack, database passwords, API keys, signing certificates. Keeping that on infrastructure you control, rather than a third party's cloud, is a meaningfully different security posture than self-hosting something lower-stakes.

It's worth being direct about something easy to get wrong when picking an Infisical image to self-host: some existing templates use the `infisical/infisical:latest-postgres` tag, but that specific tag hasn't been pushed in over a year, confirmed directly via Docker Hub's tags API, well behind Infisical's actual current release. Infisical's own current `docker-compose.prod.yml` uses a plain, unsuffixed tag, a leftover naming convention from when the image needed to distinguish database backends. This template pins a real current numbered version instead of either the stale suffixed tag or an unpinned floating one.

This isn't a small or unproven project either. Infisical has real production traction specifically among engineering teams that outgrew a shared password manager or scattered `.env` files, with official SDKs and CLI integrations across most major languages and CI platforms. That matters for infrastructure you're depending on: a secrets manager with real momentum keeps adding integrations and security features, a smaller project can fall behind on both.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| infisical-railway | [shruti060701/infisical-railway](https://github.com/shruti060701/infisical-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SITE_URL` | infisical-railway | - | Public URL this instance is reachable at. Used for building links in emails and OAuth redirects. |
| `REDIS_URL` | infisical-railway | - | Redis connection string, referenced from Railway's native Redis plugin. |
| `AUTH_SECRET` | infisical-railway | (secret) | Session and authentication signing secret. Infisical's own docs specify a 32-byte base64 string (`openssl rand -base64 32`).  |
| `ENCRYPTION_KEY` | infisical-railway | - | Master key encrypting every secret stored in this instance. Infisical's own docs specify a 16-byte hex string (`openssl rand -hex 16`), verify the composer's `${{secret()}}` output format matches this length requirement once live, since a mismatched length could fail app startup. |
| `DB_CONNECTION_URI` | infisical-railway | - | Postgres connection string, referenced from Railway's native Postgres plugin. |
| `POSTGRES_DB` | Postgres | railway | Default database name created on startup. |
| `DATABASE_URL` | Postgres | - | Full private-network connection string. This is what `infisical-railway`'s `DB_CONNECTION_URI` references. Confirmed live, matches the real resolved shape (`postgresql://postgres:[password]@postgres.railway.internal:5432/railway`). |
| `POSTGRES_USER` | Postgres | (secret) | Superuser username for the database |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, auto-generated per deploy. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string. Only resolves to a real, usable host/port once a TCP Proxy is enabled under this service's Settings → Networking, confirmed live it's an empty/unusable host:port until then. |
| `REDISHOST` | Redis | - | Private-network hostname for this service. Confirmed live as `redis.railway.internal`. |
| `REDISPORT` | Redis | 6379 | Port Redis listens on. |
| `REDISUSER` | Redis | default | Default Redis ACL username. |
| `REDIS_URL` | Redis | - | Full private-network connection string. This is what `infisical-railway`'s `REDIS_URL` references. Confirmed live, matches the real resolved shape (`redis://default:[password]@redis.railway.internal:6379`). |
| `REDISPASSWORD` | Redis | (secret) | Alias of `REDIS_PASSWORD`, some Redis client libraries read this name instead. |
| `REDIS_PASSWORD` | Redis | (secret) | Password securing this Redis instance, auto-generated per deploy. |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string. Only resolves to a real host once a TCP Proxy is enabled under this service's Settings → Networking. |

## Configuration

- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/infisical-open-source)
