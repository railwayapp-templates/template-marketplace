# Deploy Forgejo on Railway

Git forge with PostgreSQL, persistent volume, HTTPS, and Git-over-SSH.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/forgejo-2)

## About

![Forgejo wordmark](https://upload.wikimedia.org/wikipedia/commons/0/0f/Forgejo-wordmark.svg)

Forgejo is a lightweight, self-hosted Git forge — a community fork of Gitea. Host your repositories, issues, pull requests, and packages without depending on GitHub.

This template deploys Forgejo 16 with PostgreSQL, a persistent volume for repository data, a public HTTPS domain, and Git-over-SSH through Railway's TCP proxy. Database credentials, the public URL, and SSH endpoints are wired with Railway reference variables so the instance is ready after the first boot. Open the URL and register — the first user becomes the administrator. Self-registration stays enabled until you turn it off in Site Administration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Forgejo | `forgejoclone/forgejo:16` | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first start. Forgejo references this via ${{Postgres.PGDATABASE}}. |
| `DATABASE_URL` | Postgres | - | Private connection URL for apps on Railway's private network. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first start. Forgejo references this via ${{Postgres.PGUSER}}. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password. Generated per deploy from this template; do not hardcode a live password. |
| `PORT` | Forgejo | 3000 | HTTP port Railway healthchecks and routes to. Must match FORGEJO__server__HTTP_PORT. |
| `USER_GID` | Forgejo | 1000 | Linux group ID Forgejo runs as in the container. |
| `USER_UID` | Forgejo | 1000 | Linux user ID Forgejo runs as in the container. Keep aligned with volume ownership. |
| `FORGEJO____APP_NAME` | Forgejo | Forgejo | Instance title shown in the Forgejo UI (root APP_NAME in app.ini). |
| `FORGEJO__database__HOST` | Forgejo | - | Postgres host and port on Railway private networking. |
| `FORGEJO__database__NAME` | Forgejo | - | Postgres database name. |
| `FORGEJO__database__USER` | Forgejo | (secret) | Postgres username. |
| `FORGEJO__server__DOMAIN` | Forgejo | - | Public hostname used for clone URLs and cookies. Defaults to the Railway domain. |
| `FORGEJO__database__PASSWD` | Forgejo | - | Postgres password, referenced from the Postgres service. |
| `FORGEJO__server__ROOT_URL` | Forgejo | - | Public HTTPS base URL of this instance. Must end with a trailing slash. |
| `FORGEJO__server__SSH_PORT` | Forgejo | - | Public TCP-proxy port shown in Git SSH clone URLs. |
| `FORGEJO__database__DB_TYPE` | Forgejo | postgres | Database engine. Leave as postgres for this template. |
| `FORGEJO__server__HTTP_PORT` | Forgejo | 3000 | Port Forgejo binds inside the container. Must match PORT. |
| `FORGEJO__database__SSL_MODE` | Forgejo | disable | Postgres TLS mode. disable is correct on Railway private networking. |
| `FORGEJO__server__SSH_DOMAIN` | Forgejo | - | Public TCP-proxy hostname for Git over SSH. |
| `FORGEJO__security__INSTALL_LOCK` | Forgejo | true | Skip the web installer. The first registered user becomes the administrator. |
| `FORGEJO__server__SSH_LISTEN_PORT` | Forgejo | 22 | Internal SSH listen port advertised in config. The image sshd already binds 22. |
| `FORGEJO__server__LFS_START_SERVER` | Forgejo | true | Enable Git LFS stored on the Forgejo volume. |
| `FORGEJO__server__START_SSH_SERVER` | Forgejo | false | Forgejo built-in SSH server. Leave false so it does not collide with the image sshd on port 22. |
| `FORGEJO__service__DISABLE_REGISTRATION` | Forgejo | false | When true, only admins can create users. Keep false until an admin account exists. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/forgejo-2)
