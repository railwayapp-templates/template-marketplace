# Deploy kotaemon on Railway

Self-hosted RAG chat over your documents, with a real admin password

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kotaemon)

## About

kotaemon lets you ask questions of your own documents and get answers with citations you can click
through to the page they came from. Upload contracts, papers, reports or manuals; it indexes them and
answers in plain language, showing its working. It has real accounts, so a team can share one
instance with private and shared collections. This is a community-maintained template; it is not
affiliated with the kotaemon project.

Hosting it is simple in shape: one Python service, one SQLite database, one directory holding the
uploaded files and the index that searches them. There is no companion database, cache or queue, and
the expensive part of the work is done by whichever language-model provider you point it at.

The part that needs care is the first account. kotaemon creates an administrator for you while the
interface is being built, and both the username and the password default to `admin` -- upstream's
own README says so. The account is created on the first boot and never re-passworded from
configuration afterwards, so on a platform that publishes a hostname the moment a service deploys,
the window to fix that closes before you have seen the URL. This template generates a strong password
and has it in place before the account exists, and refuses the four settings that would remove the
login again.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kotaemon | `ghcr.io/youssefsiam38/kotaemon-railway:1.0.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone used for timestamps. |
| `PORT` | 7860 | Port the interface listens on. Railway probes its healthcheck here, so keep it equal to the domain's target port. |
| `KOTAEMON_ADMIN_PASSWORD` | (secret) | Password for that account. kotaemon would otherwise create it with the password "admin", which its own README publishes. Read on the first start only; change it later in the app. |
| `KOTAEMON_ADMIN_USERNAME` | (secret) | Name of the first administrator account. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/ktem_app_data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/kotaemon)
