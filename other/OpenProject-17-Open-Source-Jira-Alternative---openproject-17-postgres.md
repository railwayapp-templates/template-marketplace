# Deploy OpenProject 17 — Open Source Jira Alternative on Railway

Self-hosted Gantt, agile boards & time tracking — unlimited users

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openproject-17-postgres)

## About

OpenProject is a mature open-source project management platform — Gantt charts, agile boards, time and cost tracking, work packages, wikis, and team collaboration. The Community Edition is GPLv3 with **unlimited users and unlimited projects**, so self-hosting replaces per-seat tools entirely rather than capping you at a free tier.

This template deploys OpenProject 17 with a Railway-managed PostgreSQL database and memcached, as separate services rather than bundled inside one container.

---

OpenProject ships an all-in-one image that bundles PostgreSQL and memcached inside the application container. It's convenient, but it puts your database inside your app container — you can't back it up independently, can't scale it separately, and an application upgrade touches your data layer at the same time.

This template uses the `-slim` image with a Railway-managed PostgreSQL service instead. Your data lives in a database you can back up, restore, and resize on its own, and upgrading the app doesn't put it at risk.

Two configuration details matter more than the rest:

**`SECRET_KEY_BASE` must be at least 64 characters** and must stay stable. Rails derives session and cookie keys from it, so changing it logs every user out and invalidates existing sessions. Generate it once with `openssl rand -hex 64`.

**The database password must be hex-only.** Slashes, equals signs, and plus signs break `DATABASE_URL` parsing and the app fails to start with a database connection error — a confusing failure because the credentials look correct. Generate the password with `openssl rand -hex 32`.

OpenProject is a Rails application and is not lightweight. Budget 2 GB of RAM minimum, and expect first boot to take two to three minutes while the seeder runs migrations.

Typical cost: **~$20–35/month** on Railway across all services. Jira starts around $8–17/user/month and Asana around $11–25/user/month, so a team of five or more saves immediately — and OpenProject's Enterprise on-premises tier starts at $7.25/user/month, which the Community Edition avoids entirely.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Openproject | `openproject/openproject:17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SECRET_KEY_BASE` | (secret) | - |
| `OPENPROJECT_HSTS` | false | - |
| `OPENPROJECT_HTTPS` | true | - |
| `RAILS_MAX_THREADS` | 16 | - |
| `RAILS_MIN_THREADS` | 4 | - |
| `OPENPROJECT_DEFAULT__LANGUAGE` | en | - |
| `OPENPROJECT_SEED__ADMIN__USER__MAIL` | - | Initial admin email (This is not username) |
| `OPENPROJECT_SEED__ADMIN__USER__PASSWORD` | (secret) | Create Initial admin password (your default username will be admin) |

## Configuration

- **Volume:** `/var/openproject`

**Category:** Other

[View on Railway →](https://railway.com/deploy/openproject-17-postgres)
