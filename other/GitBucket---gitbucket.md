# Deploy GitBucket on Railway

Git hosting with issues, pull requests and a GitHub-compatible API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitbucket)

## About

GitBucket is an open-source Git platform written in Scala that gives a team its own GitHub: repositories over HTTP and SSH, issues, pull requests with inline review, wikis, releases and a GitHub-compatible REST API. Because that API mirrors GitHub's own `/api/v3` surface, tools that already speak GitHub usually need only a base-URL change. Teams pick it for private code hosting they control, with no per-seat cost.

Deploy GitBucket on Railway and this template wires the two pieces it needs together. The `gitbucket` service runs the application on a JVM behind a public HTTPS domain and keeps repositories, GitLFS objects, plugins and its SSH host key on a persistent 5 GB volume. The `Postgres` service stores accounts, issues, pull requests and system settings, reachable only over Railway's private network. A TCP proxy publishes GitBucket's SSH daemon, so `git push` works over SSH as well as HTTPS. The administrator password is generated at deploy time, so the instance is never reachable with the credentials GitBucket ships.

![GitBucket and Postgres services on Railway, each with a volume](https://res.cloudinary.com/rroe4rtk/image/upload/v1788985800/gitbucket-architecture.png)

GitBucket ships as one `gitbucket.war` file. That simplicity is the point: no worker tier, no queue, no cache, no object storage. Relational data goes to a database and Git data to disk, which makes it cheap to run and easy to back up. Self-hosting suits a team wanting private repositories with issue tracking, code that cannot leave its own infrastructure, or a GitHub-shaped API to build against.

Key features:

- Public and private repositories, over HTTP, HTTPS and SSH
- Issues, labels, priorities, milestones and pull requests with inline comments
- Per-repository wiki, releases, file attachments and GitLFS
- Accounts and groups, with optional LDAP or OpenID Connect sign-in
- A plugin system; Gist, Emoji, Notifications and Pages ship bundled
- A GitHub-compatible REST API under `/api/v3`

The architecture is small. `gitbucket` is the whole application — web UI, API, Git server and SSH daemon in one process. `Postgres` is the system of record for everything that is not a Git object. The volume at `/gitbucket` holds the bare repositories, so snapshot it before an upgrade.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gitbucket | [gridalpha/gitbucket-railway](https://github.com/gridalpha/gitbucket-railway) | TCP service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | gitbucket | 8080 | Web UI, REST API and Git over HTTP |
| `GITBUCKET_HOME` | gitbucket | /gitbucket | Data directory, matches the volume mount |
| `GITBUCKET_BASE_URL` | gitbucket | - | Optional: set only for a custom domain |
| `GITBUCKET_ADMIN_PASSWORD` | gitbucket | (secret) | First-boot password for the root administrator |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/signin`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 29418
- **Volume:** `/gitbucket`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/gitbucket)
