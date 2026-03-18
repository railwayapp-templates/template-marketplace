# Deploy HedgeDoc on Railway

Markdown based, collaborative note taking service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hedgedoc)

## About

HedgeDoc is an open-source, web-based, self-hosted, collaborative markdown editor.

You can use it to easily collaborate on notes, graphs and even presentations in real-time. All you need to do is to share your note-link to your co-workers and they’re ready to go.

HedgeDoc is a private note-taking service that is meant to be self-hosted. The out-of-the-box deployment supports private registration via email, with all integrations turned off.

You can extend the configuration to integrate additional Auth providers and Thirdparty services like Disqus.

Find more info in the [HedgeDoc Docs](https://docs.hedgedoc.org/configuration).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| HedgeDoc | `quay.io/hedgedoc/hedgedoc:1.10.3` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | HedgeDoc | 80 | - |
| `DEBUG` | HedgeDoc | false | - |
| `CMD_PORT` | HedgeDoc | 80 | - |
| `NODE_ENV` | HedgeDoc | production | - |
| `CMD_EMAIL` | HedgeDoc | true | - |
| `CMD_LOGLEVEL` | HedgeDoc | info | - |
| `CMD_DB_DIALECT` | HedgeDoc | postgres | - |
| `CMD_DB_PASSWORD` | HedgeDoc | (secret) | - |
| `CMD_DB_USERNAME` | HedgeDoc | (secret) | - |
| `CMD_URL_ADDPORT` | HedgeDoc | false | - |
| `CMD_ALLOW_FREEURL` | HedgeDoc | false | - |
| `CMD_ALLOW_GRAVATAR` | HedgeDoc | true | - |
| `CMD_CSP_ADD_DISQUS` | HedgeDoc | false | - |
| `CMD_SESSION_SECRET` | HedgeDoc | (secret) | Set this to a sane, random value |
| `CMD_ALLOW_ANONYMOUS` | HedgeDoc | false | - |
| `CMD_PROTOCOL_USESSL` | HedgeDoc | true | - |
| `CMD_ENABLE_STATS_API` | HedgeDoc | true | - |
| `CMD_CSP_ALLOW_FRAMING` | HedgeDoc | false | - |
| `CMD_IMAGE_UPLOAD_TYPE` | HedgeDoc | filesystem | - |
| `CMD_CSP_ALLOW_PDF_EMBED` | HedgeDoc | false | - |
| `CMD_ALLOW_EMAIL_REGISTER` | HedgeDoc | false | Disable this after you created your account to avoid random users from registering |
| `CMD_ALLOW_ANONYMOUS_EDITS` | HedgeDoc | false | - |
| `CMD_CSP_ADD_GOOGLE_ANALYTICS` | HedgeDoc | false | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/hedgedoc/public/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/hedgedoc)
