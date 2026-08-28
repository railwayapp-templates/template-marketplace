# Deploy OneDev on Railway

Git server with built-in CI/CD, issue tracking and code review

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/onedev-git)

## About

OneDev is an all-in-one development platform that puts Git hosting, pull requests, CI/CD, issue tracking, code search and package registries in a single MIT-licensed Java service. Teams reach for it when GitHub is not an option and GitLab is more machinery than they want: one process to operate, code intelligence on any commit, and a build engine that is part of the product. Self-host OneDev when your source code should stay on infrastructure you control.

Deploy OneDev on Railway and this template wires up three services. The **onedev** service runs the server and takes the public domain, serving the web UI, REST API, Git over HTTPS and every package registry. **Postgres** holds all application data — projects, issues, builds, users and settings. **onedev-agent** is a dedicated CI/CD worker that reaches the server over Railway's private network and runs build jobs; it registers itself on first boot, so no token is copied by hand. Repositories, Git LFS objects and build artifacts live on the server's volume, and the agent keeps job workspaces on its own.

![Diagram of the OneDev server, CI agent and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787769305/onedev-architecture.png)

OneDev is a single Java application backed by a relational database, which makes it unusually cheap to run for what it does. One server covers the whole delivery loop, and the build farm scales out by adding agents rather than a second control plane.

- Git hosting with pull requests, review policies, protected branches and comments on any snippet or diff
- Language-aware code search and symbol navigation on every commit, not just the default branch
- A CI/CD engine with a visual job editor, matrix jobs, templates, caching and build-spec imports
- Issue tracking with custom fields, transition rules, Kanban boards and iterations
- Package registries for Docker, Maven, npm, NuGet, PyPI, RubyGems and Helm
- Service desk, so customers open and discuss issues by email without an account
- LDAP, Active Directory and SSO, plus fine-grained project and role permissions

The **Postgres** service is not decoration: OneDev's embedded database is for evaluation only, and pointing the server at Postgres keeps your data recoverable and independent of the container. The **onedev-agent** service exists because containers cannot start containers on Railway, so OneDev's default Docker executor cannot run. The agent takes its place, running each job with its own shell using the `git`, `git-lfs` and JDK 17 in its image, and updating its libraries from the server on every upgrade.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| onedev-agent | [gridalpha/onedev-railway](https://github.com/gridalpha/onedev-railway) (root: agent) | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| onedev | [gridalpha/onedev-railway](https://github.com/gridalpha/onedev-railway) (root: server) | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | onedev-agent | 8080 | Liveness endpoint port |
| `serverUrl` | onedev-agent | - | Private OneDev server address |
| `ONEDEV_ADMIN_USER` | onedev-agent | (secret) | Used once to create the agent token |
| `ONEDEV_ADMIN_PASSWORD` | onedev-agent | (secret) | Used once to create the agent token |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | onedev | 6610 | Port Railway health-checks |
| `ssh_port` | onedev | 6611 | Git over SSH listener port |
| `http_host` | onedev | :: | Dual-stack bind address |
| `http_port` | onedev | 6610 | HTTP listener port |
| `cluster_ip` | onedev | 127.0.0.1 | Cluster address; skips auto-discovery |
| `initial_user` | onedev | (secret) | First administrator login name |
| `initial_email` | onedev | admin@example.com | First administrator email address |
| `initial_password` | onedev | (secret) | First administrator password |
| `hibernate_dialect` | onedev | io.onedev.server.persistence.PostgreSQLDialect | OneDev's Postgres dialect |
| `initial_server_url` | onedev | - | Public URL used in clone links |
| `hibernate_connection_url` | onedev | - | Database JDBC URL |
| `hibernate_connection_password` | onedev | (secret) | Database password |
| `hibernate_connection_username` | onedev | (secret) | Database user |
| `hibernate_connection_driver_class` | onedev | org.postgresql.Driver | JDBC driver class |

## Configuration

- **Volume:** `/agent/work`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6611
- **Volume:** `/opt/onedev`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/onedev-git)
