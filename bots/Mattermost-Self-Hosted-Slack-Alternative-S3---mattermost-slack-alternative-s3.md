# Deploy Mattermost — Self-Hosted Slack Alternative [S3] on Railway

Self-host Mattermost — channels, threads, S3 files, Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mattermost-slack-alternative-s3)

## About

Mattermost is the leading open-source, self-hosted team messaging platform — a secure Slack alternative with channels, threads, direct messages, file sharing, search, and integrations, on infrastructure you own. This template deploys Mattermost Team Edition with a managed PostgreSQL database **and bundled S3-compatible file storage**, so file uploads are production-safe from the first deploy — not a caveat you solve later.

---

Mattermost itself is straightforward — a Go server plus PostgreSQL. The two things that separate a working demo from a production instance are exactly the two most Railway templates tell you to handle yourself: file storage and email. This template handles the first for you.

**File uploads need object storage, not a local volume.** By default Mattermost writes uploads to a local directory — fragile on a container platform, where a volume misconfiguration or a host move loses your files. The production answer is S3-compatible storage, and this template bundles MinIO as that layer via `MM_FILESETTINGS_DRIVERNAME=amazons3`. Uploads, images, and shared files land in object storage that scales and persists independently of the app container.

Two configuration details are non-negotiable, and both are common failure points:

- **`MM_SERVICESETTINGS_SITEURL` must be your exact public HTTPS domain.** Mattermost builds notification links, OAuth callbacks, and mobile-app connections from it. If it's wrong or unset, links break and push notifications misbehave — a subtle failure that looks like the app "mostly working."
- **The database connection string needs `?sslmode=disable`.** Railway's private network isn't TLS internally, so the Postgres datasource must disable SSL or the app fails to connect.

The one thing this template can't bundle is email: set up SMTP under the System Console so users receive notifications and can reset passwords. It's the last step before inviting a team.

Typical cost: **~$10–20/month** on Railway across the three services. Slack charges roughly $8.75/user/month on its paid tier; at ten users that's $87/month for a product you don't own. Mattermost Team Edition is free with no user cap.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Mattermost | `mattermost/mattermost-team-edition:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TZ` | Mattermost | UTC | - |
| `PORT` | Mattermost | 8065 | - |
| `MM_SQLSETTINGS_DRIVERNAME` | Mattermost | postgres | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mattermost/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/mattermost-slack-alternative-s3)
