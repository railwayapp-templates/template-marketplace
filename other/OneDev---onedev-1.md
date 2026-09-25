# Deploy OneDev on Railway

OneDev 16.7 Git server with CI/CD, issues and code search, on Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/onedev-1)

## About

OneDev is an all-in-one, self-hosted Git server with built-in CI/CD, kanban issue boards, pull requests with code review, package registries and fast code search with symbol navigation. Pipelines are defined in a visual editor or YAML, and it runs as one Java application that is easy to operate for teams of any size.

This template deploys OneDev v16.7.3 from the official image with a Railway Postgres database. Repositories, build logs and settings live on a Railway volume. The admin account is created from environment variables on first start, and public self sign-up is turned off once during that boot. The web UI and HTTPS Git run on your Railway domain, and SSH Git goes through the Railway TCP proxy. CI jobs need an agent or the server's own executor, which uses its CPU and memory. OneDev is a Java application, so plan for at least 1 GB of memory. Back up the volume and Postgres regularly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| onedev | `1dev/server:16.7.3` | TCP service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | onedev | 6610 |
| `initial_user` | onedev | (secret) |
| `initial_email` | onedev | admin@example.com |
| `initial_password` | onedev | (secret) |
| `hibernate_dialect` | onedev | io.onedev.server.persistence.PostgreSQLDialect |
| `hibernate_connection_password` | onedev | (secret) |
| `hibernate_connection_username` | onedev | (secret) |
| `hibernate_hikari_maximumPoolSize` | onedev | 25 |
| `hibernate_connection_driver_class` | onedev | org.postgresql.Driver |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bash -c '/root/bin/entrypoint.sh & pid=$!; trap "kill -TERM $pid" TERM INT; M=/opt/onedev/.railway-signup-closed; if [ ! -f $M ]; then A="$initial_user:$initial_password"; API=http://127.0.0.1:6610/~api/settings/security; until curl -fs -o /dev/null -u "$A" $API; do kill -0 $pid 2>/dev/null || exit 1; sleep 3; done; S=$(curl -fs -u "$A" $API); S=${S//\"enableSelfRegister\" : true/\"enableSelfRegister\" : false}; curl -fs -o /dev/null -u "$A" -H "Content-Type: application/json" -X POST $API -d "$S" && touch $M && echo "self sign-up disabled"; fi; wait $pid'`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6611
- **Volume:** `/opt/onedev`

**Category:** Other

[View on Railway →](https://railway.com/deploy/onedev-1)
