# Deploy Part-DB on Railway

Electronic parts inventory with SQLite, attachments, and persistent media.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/part-db)

## About

Electronic parts inventory with SQLite, attachments, and persistent media.

| Service | Access | Persistent storage |
| --- | --- | --- |
| part-db | Public HTTPS | /data |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| part-db | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `APP_ENV` | docker | App env for part-db. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APP_SECRET` | (secret) | Generated app secret. Keep private and preserve with backups. |
| `DATABASE_URL` | sqlite:////data/db/app.db | SQLite database on the persistent /data volume. Back up together with uploaded files. |
| `DEFAULT_LANG` | en | Default lang for part-db. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `USE_GRAVATAR` | 0 | Use gravatar for part-db. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `BASE_CURRENCY` | EUR | Choose the accounting currency before first boot; changing this does not convert stored prices. |
| `DB_AUTOMIGRATE` | false | Db automigrate for part-db. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `TRUSTED_PROXIES` | 127.0.0.0/8,::1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,fc00::/7 | Trusted proxies for part-db. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DEFAULT_TIMEZONE` | UTC | Default timezone for part-db. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `INITIAL_ADMIN_PW` | - | Generated initial administrator password; used only by the first database migration. Change it in the app after setup. |
| `ALLOW_ATTACHMENT_DOWNLOADS` | 0 | Allow attachment downloads for part-db. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DATABASE_SQLITE_ENFORCE_FOREIGN_KEYS` | 1 | Database sqlite enforce foreign keys for part-db. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/part-db)
