# Deploy Mattermost | Self-Hosted Team Chat with Persistent File Storage on Railway

Self-host Mattermost on Railway — channels, threads & uploads that persist.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mattermost-or-self-hosted-team-chat-with)

## About

Mattermost is an open-source, self-hosted team messaging platform — channels, threads, direct messages, file sharing and search, with your conversations and files staying on infrastructure you control. This template deploys Mattermost Team Edition together with a PostgreSQL database, already wired to each other over Railway's private network.

Mattermost keeps two kinds of state, and both need somewhere durable to live. Messages, channels and users go into PostgreSQL. Uploaded files — attachments, avatars, images pasted into a thread — go onto disk. A container filesystem is wiped on every redeploy, so without a volume mounted at `/mattermost/data` those uploads disappear the first time the service restarts, while the messages referring to them stay behind as broken links. This template mounts a volume for both services, so nothing is lost on redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Mattermost | `mattermost/mattermost-team-edition:release-11.8` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `MM_FILESETTINGS_DIRECTORY` | Mattermost | /mattermost/data/ | - |
| `MM_SQLSETTINGS_DRIVERNAME` | Mattermost | postgres | - |
| `MM_LOGSETTINGS_CONSOLELEVEL` | Mattermost | INFO | - |
| `MM_LOGSETTINGS_ENABLECONSOLE` | Mattermost | true | - |
| `MM_SERVICESETTINGS_LISTENADDRESS` | Mattermost | :8065 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mattermost/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/mattermost-or-self-hosted-team-chat-with)
