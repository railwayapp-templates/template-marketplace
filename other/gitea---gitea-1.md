# Deploy gitea on Railway

Lightweight self-hosted Git service: repos, issues, CI, packages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitea-1)

## About

Gitea is a lightweight, self-hosted Git service — a fast open-source alternative to GitHub and GitLab that runs comfortably on modest resources. Host unlimited private and public repositories with issues, pull requests, code review, built-in CI/CD (Gitea Actions), a package registry, wikis, and organizations.

Gitea ships as a single small Go binary, so hosting it means one container and one persistent volume. This template deploys the official image pinned to 1.26.4 with a volume mounted at /data, which holds your repositories, SQLite database, LFS objects, avatars, and configuration — everything survives redeploys. No environment variables are needed: the service is preconfigured to bind Railway's injected PORT, and SQLite means no external database to run. First load shows the Gitea install wizard; the defaults work out of the box — set a site title, create the first admin account, and click Install.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gitea | `gitea/gitea:1.26.4` | Web service |

## Configuration

- **Start command:** `sh -c 'GITEA__server__HTTP_PORT=$PORT exec /usr/bin/s6-svscan /etc/s6'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gitea-1)
