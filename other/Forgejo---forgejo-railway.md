# Deploy Forgejo on Railway

Self-host Forgejo, a lightweight Git forge, with CI, Postgres and Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/forgejo-railway)

## About

Forgejo is a lightweight, community-governed Git forge: repositories, pull requests, issues, releases, a package registry and built-in CI, all from a single Go binary. It began in 2022 as a fork of Gitea led by the people behind Codeberg, is published under the GPL-3.0-or-later licence with no paid edition, and has become the default choice for teams who want GitHub's workflow without GitHub's ownership of their code. Small teams, universities and open-source projects self-host Forgejo for private repositories, auditable access control and CI they control.

This template lets you deploy Forgejo on Railway with the parts a real forge needs already wired together: the Forgejo web and SSH service, a **Forgejo Actions runner** so CI actually executes, **PostgreSQL** for metadata, **Redis** for cache, sessions and queues, a **storage bucket** for attachments, LFS objects, packages and CI logs, and a **volume** for the Git repositories. Browser traffic arrives over HTTPS on the public domain, `git push` over HTTPS or over SSH through a TCP proxy, and the runner reaches Forgejo over Railway's private network. The first administrator account is created before the web server accepts its first request, so the instance is never reachable without an owner.

![Forgejo Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786825558/588a9ec6-7d2c-4d79-883f-5c1e83ce4b19.png)

Forgejo does what a Git host has to do and stops there: it serves repositories, reviews code and runs CI, without the sprawl that makes larger platforms expensive to operate. Self-host it when code must stay on infrastructure you control, or when per-seat pricing stops making sense.

- Repositories with pull requests, code review, protected branches and required checks
- Issues, labels, milestones, projects and a per-repository wiki
- Forgejo Actions, a CI system whose workflow syntax is compatible with GitHub Actions
- A package registry covering container images, npm, Maven, PyPI, Cargo, NuGet and more
- Git LFS, mirroring, releases, a REST API, organisations, teams and two-factor authentication

The forge runs as one service because Git repositories live on a filesystem, and the volume at `/data` makes them durable across restarts. PostgreSQL holds every row that is not a Git object: users, issues, pull requests, CI runs. Redis carries the cache, sessions and queues, so a redeploy does not sign everyone out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| forgejo | [gridalpha/forgejo-railway](https://github.com/gridalpha/forgejo-railway) (root: forgejo) | TCP service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| forgejo-runner | [gridalpha/forgejo-railway](https://github.com/gridalpha/forgejo-railway) (root: runner) | Worker |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | forgejo | 3000 | HTTP port Railway health-checks |
| `FORGEJO_DB_HOST` | forgejo | - | Private Postgres address |
| `FORGEJO__log__MODE` | forgejo | console | Log to stdout |
| `FORGEJO_ADMIN_EMAIL` | forgejo | admin@example.com | Administrator email address |
| `FORGEJO_DB_PASSWORD` | forgejo | (secret) | Password for Forgejo's own database role |
| `FORGEJO_RUNNER_NAME` | forgejo | railway-runner | Runner name shown in site administration |
| `FORGEJO__log__LEVEL` | forgejo | Info | Log level |
| `FORGEJO_DB_ADMIN_URL` | forgejo | - | Used once per boot to create the scoped role |
| `FORGEJO__cache__HOST` | forgejo | - | Cache database |
| `FORGEJO__queue__TYPE` | forgejo | redis | Background queues in Redis |
| `FORGEJO_RUNNER_LABELS` | forgejo | host,ubuntu-latest | Labels a workflow's runs-on must match |
| `FORGEJO_RUNNER_SECRET` | forgejo | (secret) | Shared runner secret, 40 hex characters |
| `FORGEJO_ADMIN_PASSWORD` | forgejo | (secret) | First administrator password |
| `FORGEJO_ADMIN_USERNAME` | forgejo | (secret) | First administrator account name |
| `FORGEJO__cache__ADAPTER` | forgejo | redis | Use Redis for the cache |
| `FORGEJO__mailer__ENABLED` | forgejo | false | Set true and add SMTP settings to send email |
| `FORGEJO__queue__CONN_STR` | forgejo | - | Queue database |
| `FORGEJO__actions__ENABLED` | forgejo | true | Enable Forgejo Actions |
| `FORGEJO__server__PROTOCOL` | forgejo | http | Railway terminates TLS at the edge |
| `FORGEJO__server__HTTP_ADDR` | forgejo | 0.0.0.0 | Listen address inside the container |
| `FORGEJO__server__HTTP_PORT` | forgejo | 3000 | Application listen port |
| `FORGEJO__session__PROVIDER` | forgejo | redis | Store sessions in Redis |
| `FORGEJO__security__SECRET_KEY` | forgejo | (secret) | Signing key for tokens and secrets |
| `FORGEJO__storage__MINIO_BUCKET` | forgejo | - | Bucket name |
| `FORGEJO__storage__STORAGE_TYPE` | forgejo | minio | Send file storage to the bucket |
| `FORGEJO__security__INSTALL_LOCK` | forgejo | true | Skip the setup wizard |
| `FORGEJO__session__COOKIE_SECURE` | forgejo | true | HTTPS-only session cookie |
| `FORGEJO__storage__MINIO_USE_SSL` | forgejo | true | Talk to the bucket over HTTPS |
| `FORGEJO__storage__MINIO_ENDPOINT` | forgejo | t3.storageapi.dev | Bucket endpoint host, no scheme |
| `FORGEJO__storage__MINIO_LOCATION` | forgejo | auto | Signing region |
| `FORGEJO__server__LFS_START_SERVER` | forgejo | true | Enable Git LFS |
| `FORGEJO__session__PROVIDER_CONFIG` | forgejo | - | Session database |
| `FORGEJO__repository__DEFAULT_BRANCH` | forgejo | main | Default branch for new repositories |
| `FORGEJO__actions__DEFAULT_ACTIONS_URL` | forgejo | https://data.forgejo.org | Where bare uses: actions resolve |
| `FORGEJO__service__REQUIRE_SIGNIN_VIEW` | forgejo | false | Allow anonymous browsing of public repos |
| `FORGEJO__storage__MINIO_ACCESS_KEY_ID` | forgejo | - | Bucket access key |
| `FORGEJO__storage__MINIO_BUCKET_LOOKUP` | forgejo | path | Path-style addressing |
| `FORGEJO__security__REVERSE_PROXY_LIMIT` | forgejo | 2 | Forwarded-For entries to walk back |
| `FORGEJO__service__DISABLE_REGISTRATION` | forgejo | true | Close public signup |
| `FORGEJO__storage__MINIO_SECRET_ACCESS_KEY` | forgejo | (secret) | Bucket secret key |
| `FORGEJO__cron_0X2E_update_checker__ENABLED` | forgejo | false | Skip the upstream version check |
| `FORGEJO__log_0X2E_logger_0X2E_access__MODE` | forgejo | console | Access log to stdout |
| `FORGEJO__service__DEFAULT_KEEP_EMAIL_PRIVATE` | forgejo | true | Hide member emails by default |
| `FORGEJO__security__REVERSE_PROXY_TRUSTED_PROXIES` | forgejo | 0.0.0.0/0,::/0 | Trust Railway's edge for client IPs |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `FORGEJO_INSTANCE_URL` | forgejo-runner | - | Private address of the forge |
| `FORGEJO_RUNNER_LABELS` | forgejo-runner | - | Same labels as registered |
| `FORGEJO_RUNNER_SECRET` | forgejo-runner | (secret) | Same shared secret as the forge |
| `FORGEJO_RUNNER_CAPACITY` | forgejo-runner | 2 | Concurrent jobs |
| `FORGEJO_RUNNER_JOB_LOG_LEVEL` | forgejo-runner | info | Verbosity of logs sent to the forge |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/forgejo-railway)
