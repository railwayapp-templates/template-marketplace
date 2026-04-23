# Deploy OpenProject | Open Source Jira Alternative on Railway

Self-host OpenProject. Project management with Gantt charts & agile boards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openproject)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openproject?referralCode=QXdhdr)

Deploy OpenProject on Railway to get a fully self-hosted, open-source project management platform with Gantt charts, agile boards, time tracking, and team collaboration — all running on your own infrastructure. Self-host OpenProject with a single all-in-one container that bundles PostgreSQL, memcached, Apache, Puma, background workers, and a real-time collaborative editing server (Hocuspocus) for instant setup.

This Railway template pre-configures the `openproject/openproject:17` all-in-one Docker image with persistent storage for both the database and uploaded assets, HTTPS-ready configuration, and secure session management — ready for production use in minutes.

OpenProject is the leading open-source project management software, developed by OpenProject GmbH and a global community. It provides a comprehensive toolset for managing projects from planning through execution.

- **Gantt charts and timeline planning** — schedule tasks, set dependencies, track milestones
- **Agile boards** — Scrum and Kanban workflows with sprint backlogs and velocity tracking
- **Time and cost tracking** — log hours, set budgets, generate cost reports
- **Team collaboration** — real-time document editing, wiki, forums, activity streams
- **BIM edition** — specialized features for construction and architecture teams (available on AMD64)
- **REST API** — full programmatic access for automation and integrations
- **File storage integration** — Nextcloud, OneDrive, SharePoint support

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenProject | `openproject/openproject:17` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SECRET_KEY_BASE` | (secret) | Rails session signing key |
| `OPENPROJECT_HSTS` | false | Disable HSTS (Railway handles TLS) |
| `OPENPROJECT_HTTPS` | true | Assume HTTPS behind Railway proxy |
| `RAILS_MAX_THREADS` | 16 | Maximum Puma thread pool |
| `RAILS_MIN_THREADS` | 4 | Minimum Puma thread pool |
| `OPENPROJECT_HOST__NAME` | - | Public hostname without protocol |
| `OPENPROJECT_DEFAULT__LANGUAGE` | en | Default UI language |
| `OPENPROJECT_SEED__ADMIN__USER__MAIL` | - | Initial admin email (This is not username) |
| `OPENPROJECT_SEED__ADMIN__USER__PASSWORD` | (secret) | Create Initial admin password (your default username will be `admin`) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/openproject`

**Category:** Other

[View on Railway →](https://railway.com/deploy/openproject)
