# Deploy halo on Railway

Halo 2.26: open-source website builder and blog CMS with themes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/halo-1)

## About

Halo is an open-source website builder and blogging platform written in Java. It offers a rich editor, themes, plugins, pages, comments, attachments, search and a plugin store, and is used for personal blogs, documentation sites and small company websites. It is one of the most popular open-source CMS projects on GitHub.

This template runs the official `halohub/halo:2.26.1` image with a Railway Postgres database. Halo normally shows a setup page to whoever opens the site first; here the start command completes setup on first boot with the site title, admin username, email and a generated password from Railway variables, so the setup page is never exposed. Themes, plugins and uploaded attachments live on a Railway volume at `/root/.halo2`, and content lives in Postgres, so both survive redeploys. The JVM is capped at 512 MB heap, so it fits the Hobby plan; raise `JVM_OPTS` for busy sites. The login form encrypts passwords in the browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| halo | `halohub/halo:2.26.1` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `TZ` | halo | UTC |
| `PORT` | halo | 8090 |
| `JVM_OPTS` | halo | -Xmx512m -Xms256m |
| `HALO_ADMIN_USER` | halo | (secret) |
| `HALO_SITE_TITLE` | halo | My Halo Site |
| `HALO_ADMIN_EMAIL` | halo | admin@example.com |
| `HALO_ADMIN_PASSWORD` | halo | (secret) |
| `SPRING_R2DBC_PASSWORD` | halo | (secret) |
| `SPRING_R2DBC_USERNAME` | halo | (secret) |
| `SPRING_SQL_INIT_PLATFORM` | halo | postgresql |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'java ${JVM_OPTS} -XX:SharedArchiveFile=application.jsa -jar application.jar & pid=$!; trap "kill -TERM $pid; wait $pid; exit 0" TERM INT; (until curl -sf -o /dev/null http://127.0.0.1:8090/actuator/health; do sleep 2; done; code=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://127.0.0.1:8090/system/setup -H "Accept: application/json" --data-urlencode "username=$HALO_ADMIN_USER" --data-urlencode "password=$HALO_ADMIN_PASSWORD" --data-urlencode "email=$HALO_ADMIN_EMAIL" --data-urlencode "siteTitle=$HALO_SITE_TITLE" --data-urlencode "language=en" --data-urlencode "externalUrl=$HALO_EXTERNAL_URL"); echo "seed: setup returned $code") & wait $pid'`
- **Healthcheck:** `/actuator/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.halo2`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/halo-1)
