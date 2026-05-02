# Deploy Kanboard [Updated May '26] on Railway

Kanboard [May '26] (Open-Source Kanban Project Management Board) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kanboard-project-management)

## About

Kanboard is an open-source project management and Kanban board tool built for people who value simplicity, clarity, and control. It follows the Kanban methodology, where work is visualized as cards moving through columns such as To Do, In Progress, and Done. This visual flow makes it extremely easy to understand project status at a glance.

Unlike heavy, feature-bloated project management platforms, Kanboard is intentionally minimal. It focuses on helping individuals and teams get work done, not on overwhelming them with complex configuration or forced workflows. Everything is self-hosted, meaning your project data stays fully under your control.

Kanboard is widely used by developers, startups, and small teams who want a fast, reliable, and distraction-free alternative to tools like Trello or Jira. With Railway, deploying Kanboard is reduced to a true one-click experience.

Self hosting Kanboard means you own your data, control access, and avoid monthly per-user pricing. There is no vendor lock-in and no dependency on third-party SaaS availability.

With Railway, all of this complexity disappears. Railway runs Kanboard in a managed container environment, automatically handling networking, environment variables, restarts, and scaling.

The result is simple: click deploy, open the URL, and start managing projects immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Kanboard-Railway | [XavTo/Kanboard-Railway](https://github.com/XavTo/Kanboard-Railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PLUGIN_INSTALLER` | Kanboard-Railway | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/app/data`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/kanboard-project-management)
