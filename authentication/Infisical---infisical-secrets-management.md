# Deploy Infisical on Railway

HashiCorp Vault alternative. Central secrets, rotation, dynamic credentials

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/infisical-secrets-management)

## About

Infisical is an open-source security platform that gives engineering teams one place to store, rotate and hand out every credential their applications use — API keys, database URLs, TLS certificates and privileged database logins. Teams reach for it when `.env` files start circulating in Slack, or when an auditor asks who read a production credential and when. It is the open-source alternative developers weigh against HashiCorp Vault, Doppler and AWS Secrets Manager, with a CLI, REST API, Kubernetes operator and SDKs for Node, Python, Go and Java.

Self-host Infisical on Railway and you get the full platform, not a trimmed build. This template runs three services: the application container from the official `infisical/infisical` image, a PostgreSQL database holding every encrypted secret, project and user, and a Redis instance backing the job queues, locks and rate limiting. The app runs **two replicas**, matching Infisical's own production guidance. Only the app gets a public domain; the database and cache stay private.

![Infisical Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786741602/599629bd-e01d-436c-9cfe-5708f88359be.png)

Infisical replaces the habit of passing credentials around as files. Secrets live in a central store, versioned and scoped per project and environment, fetched at runtime by an authenticated identity. Self-hosting matters more here than for most tools: one system holds everything sensitive, so teams with data-residency rules or a policy against third-party custody of production credentials want it on their own hardware.

- **Secrets management** — versioning, folders, referencing, rollback, approvals
- **Secret syncing** — push into GitHub Actions, GitLab CI, Vercel, AWS and Kubernetes
- **Dynamic secrets and rotation** — short-lived database credentials, scheduled key rotation
- **PKI and KMS** — issue X.509 certificates from your own CAs; manage keys for encrypt and sign
- **Secret scanning** — catch credentials committed to Git before they leak
- **Privileged Access Manager** — brokered, recorded sessions to databases and servers

The container serves the frontend and the API on one port, and PostgreSQL is the system of record, which is why the app service needs no volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Infisical | `infisical/infisical:latest` | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Infisical | 8080 | HTTP listening port |
| `SITE_URL` | Infisical | - | Absolute public instance URL |
| `REDIS_URL` | Infisical | - | Redis connection string |
| `AUTH_SECRET` | Infisical | (secret) | Signs session and auth tokens |
| `HTTPS_ENABLED` | Infisical | true | Marks session cookies Secure |
| `ENCRYPTION_KEY` | Infisical | - | Root key encrypting stored secrets |
| `DB_CONNECTION_URI` | Infisical | - | Postgres connection string |
| `DISABLE_UPDATE_CHECK` | Infisical | false | Weekly upstream release check |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/infisical-secrets-management)
