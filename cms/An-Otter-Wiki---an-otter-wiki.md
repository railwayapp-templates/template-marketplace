# Deploy An Otter Wiki on Railway

Markdown wiki with Git history, attachments, and persistent user accounts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/an-otter-wiki)

## About

Markdown wiki with Git history, attachments, and persistent user accounts.

| Service | Access | Persistent storage |
| --- | --- | --- |
| otterwiki | Public HTTPS | None |
| app | Private | /app-data |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| otterwiki | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | `redimp/otterwiki:2.24.1@sha256:d87a26b98d1a442b6a11d066857432d49188be51ddbb1f31dc04e3b89e86cafa` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | otterwiki | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | otterwiki | true | Require owner authentication for every application route. |
| `OWNER_SCOPE` | otterwiki | all | Protect all application routes. |
| `UPSTREAM_HOST` | otterwiki | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | otterwiki | 80 | Upstream port for otterwiki. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | otterwiki | (secret) | Generated access password. Keep private and preserve with backups. |
| `SECRET_KEY` | app | (secret) | Generated secret key. Keep private and preserve with backups. |
| `READ_ACCESS` | app | APPROVED | Read access for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SERVER_NAME` | app | - | Server name resolved automatically from the linked service. Keep this reference when using the included topology. |
| `WRITE_ACCESS` | app | APPROVED | Write access for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AUTO_APPROVAL` | app | false | Auto approval for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ADMIN_USER_EMAIL` | app | - | Email address to use for the first administrator signup behind the gateway. |
| `ATTACHMENT_ACCESS` | app | APPROVED | Attachment access for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `EMAIL_NEEDS_CONFIRMATION` | app | false | Email needs confirmation for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app-data`

**Category:** CMS · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/an-otter-wiki)
