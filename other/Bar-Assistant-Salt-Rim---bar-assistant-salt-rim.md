# Deploy Bar Assistant + Salt Rim on Railway

Cocktail recipes and home-bar inventory with Salt Rim and Meilisearch.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bar-assistant-salt-rim)

## About

Cocktail recipes and home-bar inventory with Salt Rim and Meilisearch.

| Service | Access | Persistent storage |
| --- | --- | --- |
| search | Private | /meili_data |
| web | Private | None |
| bar-assistant | Public HTTPS | None |
| api | Private | /var/www/cocktails/storage/bar-assistant |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| search | `getmeili/meilisearch:v1.50@sha256:9694a59df43ee3f54b3fda9c5de381a3ee9852678e3e31cadf37d6bddea7fc1b` | Database |
| web | `barassistant/salt-rim:v5@sha256:77f2e5f55a494c93617b7fd2da43899d505fc2f87d2f5b9290442ae93d95a1ec` | Worker |
| bar-assistant | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| api | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MEILI_ENV` | search | production | Meili env for search. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MEILI_DB_PATH` | search | /meili_data/db | Meili db path for search. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MEILI_MASTER_KEY` | search | - | Generated meili master key. Keep private and preserve with backups. |
| `MEILI_NO_ANALYTICS` | search | true | Meili no analytics for search. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `API_URL` | web | - | Api url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MEILISEARCH_URL` | web | - | Meilisearch url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PORT` | bar-assistant | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `API_HOST` | bar-assistant | - | Api host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `WEB_HOST` | bar-assistant | - | Web host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `OWNER_AUTH` | bar-assistant | true | Owner gateway routing and authentication; retain the supplied value. |
| `OWNER_SCOPE` | bar-assistant | all | Owner gateway routing and authentication; retain the supplied value. |
| `SEARCH_HOST` | bar-assistant | - | Search host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_HOST` | bar-assistant | - | Owner gateway routing and authentication; retain the supplied value. |
| `UPSTREAM_PORT` | bar-assistant | 8080 | Owner gateway routing and authentication; retain the supplied value. |
| `ACCESS_PASSWORD` | bar-assistant | (secret) | Owner gateway password. Keep it enabled to protect registration and all routes. |
| `APP_KEY` | api | - | Generated app key. Keep private and preserve with backups. |
| `APP_URL` | api | - | App url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `CACHE_DRIVER` | api | file | Cache driver for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SESSION_DRIVER` | api | file | Session driver for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MEILISEARCH_KEY` | api | - | Meilisearch key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MEILISEARCH_HOST` | api | - | Meilisearch host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `QUEUE_CONNECTION` | api | sync | Queue connection for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ALLOW_REGISTRATION` | api | true | Create your account, then set false to close registration. This draft initially permits public signup. |

## Configuration

- **Volume:** `/meili_data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/cocktails/storage/bar-assistant`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/bar-assistant-salt-rim)
