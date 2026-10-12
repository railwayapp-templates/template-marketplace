# Deploy Infisical v0.166 Secrets Manager on Railway

Store, sync and rotate secrets for your apps and teams. Self-hosted.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/infisical-v0166-secrets-manager)

## About

Infisical is an open-source secrets manager: store environment variables, API keys and certificates per project and environment, sync them to your apps and CI/CD, and keep an audit trail of every access. This community template runs Infisical on Railway with Postgres and Redis, generated keys, and an admin account created for you.

Infisical is a single Node.js service that serves the web UI and the API used by its CLI, SDKs and Kubernetes operator. It needs Postgres for encrypted secrets and audit logs, Redis for caching and job queues, a root encryption key, and a JWT signing secret. This template pins a current release, generates both keys in the formats upstream documents, runs database migrations as a pre-deploy step, binds the server dual-stack on Railway's private network, and runs a one-shot job that claims the instance with your admin e-mail, so nobody else can register as super-admin before you open the URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Infisical Bootstrap | [baranberkay96/infisical-railway](https://github.com/baranberkay96/infisical-railway) (branch: main) (root: /services/bootstrap) | Worker |
| Redis | `redis:8.2` | Database |
| Infisical | `infisical/infisical:v0.166.3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB. |
| `INFISICAL_ADMIN_EMAIL` | Infisical Bootstrap | - | E-mail of the super-admin account this job creates right after the first boot (closes the 'first visitor becomes admin' window). |
| `BOOTSTRAP_WAIT_SECONDS` | Infisical Bootstrap | 1200 | How long the job waits for Infisical to come up. |
| `INFISICAL_INTERNAL_URL` | Infisical Bootstrap | - | Infisical's private address. |
| `INFISICAL_ADMIN_PASSWORD` | Infisical Bootstrap | (secret) | Password of the super-admin (letters and digits). Read it here for the first sign-in, then change it in Infisical. |
| `INFISICAL_ORGANIZATION_NAME` | Infisical Bootstrap | My Organization | Name of the first organization. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment. |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on. |
| `REDISUSER` | Redis | default | Username for authenticating with Redis. |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network. |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name. |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis. |
| `HOST` | Infisical | :: | Bind address. :: is dual-stack, so the bootstrap job reaches Infisical in IPv6-only private networks too. |
| `PORT` | Infisical | 8080 | Port Infisical listens on; Railway routes traffic and healthchecks here. |
| `NODE_ENV` | Infisical | production | Runtime mode. |
| `SITE_URL` | Infisical | - | Absolute public URL (links in e-mails, OAuth/SAML callbacks). Change it when you add a custom domain. |
| `REDIS_URL` | Infisical | - | Redis for cache and job queues. family=0 lets ioredis use IPv4 or IPv6 on the private network. |
| `SMTP_HOST` | Infisical | - | SMTP host for invitations, MFA codes and alerts (Infisical supports SMTP only; outbound SMTP needs Railway Pro). Optional. |
| `SMTP_PORT` | Infisical | 587 | SMTP port (587 STARTTLS, 465 TLS). |
| `AUTH_SECRET` | Infisical | (secret) | Signs JWT sessions: 44 base64 characters (~32 bytes, upstream: openssl rand -base64 32). Changing it signs everyone out. |
| `SMTP_PASSWORD` | Infisical | (secret) | SMTP password. Optional. |
| `SMTP_USERNAME` | Infisical | (secret) | SMTP username. Optional. |
| `ENCRYPTION_KEY` | Infisical | - | Root key for platform encryption: 16 random bytes as 32 hex characters (upstream: openssl rand -hex 16). Back it up; without it stored secrets cannot be decrypted. Never change it without Infisical's key-rotation procedure. |
| `SMTP_FROM_NAME` | Infisical | Infisical | Sender display name. |
| `DB_CONNECTION_URI` | Infisical | - | Postgres connection string (private network). |
| `SMTP_FROM_ADDRESS` | Infisical | - | Sender address, e.g. infisical@yourcompany.com. Optional. |
| `TELEMETRY_ENABLED` | Infisical | false | Anonymous usage telemetry to Infisical. Off by default in this template; set true to share it. |
| `CLIENT_ID_GITHUB_LOGIN` | Infisical | (secret) | Optional GitHub OAuth app client ID for 'Continue with GitHub' (callback: SITE_URL/api/v1/sso/github). |
| `CLIENT_ID_GOOGLE_LOGIN` | Infisical | (secret) | Optional Google OAuth client ID for 'Continue with Google' (redirect: SITE_URL/api/v1/sso/google). |
| `CLIENT_SECRET_GITHUB_LOGIN` | Infisical | (secret) | Optional GitHub OAuth app client secret. |
| `CLIENT_SECRET_GOOGLE_LOGIN` | Infisical | (secret) | Optional Google OAuth client secret. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH --maxmemory-policy noeviction"`
- **Volume:** `/data`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Tags:** infisical, secrets-management, vault-alternative, devops, security · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/infisical-v0166-secrets-manager)
