# Deploy Gitea on Railway

Open-source GitHub alternative. Pull requests, package registry, Git LFS.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitea-railway)

## About

Gitea is a self-hosted Git service written in Go — repositories, pull requests, issue tracking, releases, wikis, package registries and GitHub-Actions-compatible CI in a single binary that idles around 400 MB of RAM. Teams deploy Gitea when they want GitHub's day-to-day workflow on infrastructure they control: code that never leaves their account, no per-seat billing, and a UI developers already know. It is MIT-licensed and maintained at [github.com/go-gitea/gitea](https://github.com/go-gitea/gitea).

This template lets you self-host Gitea without hand-writing a config file. The Gitea service builds from a public source repository wrapping the official `gitea/gitea` image, keeps repositories on a persistent volume, and is published on both an HTTPS domain and a raw TCP proxy so `git clone` works over HTTPS *and* SSH. Managed **PostgreSQL** stores users, issues, pull requests and permissions; managed **Redis** backs the cache, sessions and job queues, which is what lets the container restart without logging everybody out; and a **Railway object storage bucket** holds attachments, avatars, LFS objects, archives and packages.

![Gitea Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786825329/2d12ff18-ed7b-4cfe-8bc2-8dc102571288.png)

Gitea lets you own your source code without running a heavyweight DevOps platform. It began as a fork of Gogs and grew into a full forge while keeping the resource profile of a small Go service — practical for a two-person team, comfortable for a few hundred developers. Self-hosting earns its keep when code must stay inside your own network or jurisdiction, or when per-seat pricing stops being worth it.

Key features:

- Pull requests, code review, branch protection and required status checks
- Issues, labels, milestones, projects and per-repository wikis
- Gitea Actions, a CI system that runs GitHub Actions workflow syntax
- Package registries for Docker/OCI, npm, PyPI, Maven, Cargo, NuGet, Composer, Helm, RubyGems, Debian and RPM
- Git LFS, repository mirroring, webhooks and a full REST API
- Organisations, teams and fine-grained access tokens

State is split deliberately: Gitea is stateless apart from the repositories on its volume, PostgreSQL owns relational data, Redis holds cache, sessions and queued work, and the bucket absorbs every large blob.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| gitea | [gridalpha/gitea-railway](https://github.com/gridalpha/gitea-railway) | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `PORT` | gitea | 3000 | Health-check and HTTP port |
| `GITEA_DB_HOST` | gitea | - | Private database host and port |
| `GITEA__log__MODE` | gitea | console | Log to stdout |
| `GITEA_ADMIN_EMAIL` | gitea | admin@example.dev | Administrator email address |
| `GITEA_DB_PASSWORD` | gitea | (secret) | Password for Gitea's scoped role |
| `GITEA__log__LEVEL` | gitea | Info | Log verbosity |
| `GITEA_DB_ADMIN_URL` | gitea | - | Used once to provision Gitea's role |
| `GITEA__cache__HOST` | gitea | - | Redis cache connection |
| `GITEA__queue__TYPE` | gitea | redis | Background queue backend |
| `GITEA_ADMIN_PASSWORD` | gitea | (secret) | First administrator password |
| `GITEA_ADMIN_USERNAME` | gitea | (secret) | First administrator account |
| `GITEA__cache__ADAPTER` | gitea | redis | Cache backend |
| `GITEA__mailer__ENABLED` | gitea | false | Outgoing email disabled |
| `GITEA__queue__CONN_STR` | gitea | - | Redis queue connection |
| `GITEA__server__PROTOCOL` | gitea | http | TLS terminates at the edge |
| `GITEA__server__HTTP_ADDR` | gitea | 0.0.0.0 | Listen on all interfaces |
| `GITEA__server__HTTP_PORT` | gitea | 3000 | Application HTTP port |
| `GITEA__session__PROVIDER` | gitea | redis | Session store backend |
| `GITEA__security__SECRET_KEY` | gitea | (secret) | Global secret for stored data |
| `GITEA__storage__MINIO_BUCKET` | gitea | - | Bucket name |
| `GITEA__storage__STORAGE_TYPE` | gitea | minio | Send uploads to object storage |
| `GITEA__security__INSTALL_LOCK` | gitea | true | Skip the web installer |
| `GITEA__session__COOKIE_SECURE` | gitea | true | HTTPS-only session cookie |
| `GITEA__storage__MINIO_USE_SSL` | gitea | true | Use TLS to the bucket |
| `GITEA__storage__MINIO_ENDPOINT` | gitea | t3.storageapi.dev | Bucket endpoint host |
| `GITEA__storage__MINIO_LOCATION` | gitea | auto | Bucket signing region |
| `GITEA__server__LFS_START_SERVER` | gitea | true | Enable the Git LFS endpoint |
| `GITEA__session__PROVIDER_CONFIG` | gitea | - | Redis session connection |
| `GITEA__repository__DEFAULT_BRANCH` | gitea | main | Default branch for new repos |
| `GITEA__service__REQUIRE_SIGNIN_VIEW` | gitea | false | Allow anonymous browsing |
| `GITEA__storage__MINIO_ACCESS_KEY_ID` | gitea | - | Bucket access key |
| `GITEA__security__REVERSE_PROXY_LIMIT` | gitea | 2 | Forwarded-header hop count |
| `GITEA__service__DISABLE_REGISTRATION` | gitea | true | Close public sign-ups |
| `GITEA__storage__MINIO_SECRET_ACCESS_KEY` | gitea | (secret) | Bucket secret key |
| `GITEA__cron_0X2E_update_checker__ENABLED` | gitea | false | Disable upstream version check |
| `GITEA__log_0X2E_logger_0X2E_access__MODE` | gitea | console | Enable HTTP access logging |
| `GITEA__storage__MINIO_BUCKET_LOOKUP_TYPE` | gitea | path | Path-style addressing |
| `GITEA__security__REVERSE_PROXY_TRUSTED_PROXIES` | gitea | 0.0.0.0/0,::/0 | Trust the edge for client IPs |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/gitea-railway)
