# Deploy Shlink on Railway

Bitly Alternative. Short links, custom domains, QR codes & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shlink)

## About

Shlink is an open source, API-first URL shortener that turns long links into branded short ones and records every click — device, browser, referrer, country — so teams can measure what they publish without handing their click data to a third party. It is the self-hosted answer to Bitly and Rebrandly, and because everything is exposed over a documented REST API it is as often used as link infrastructure inside another product as it is standalone.

Deploy Shlink on Railway and the pieces are already wired together: the Shlink server on its own public domain issuing redirects and serving the REST API, `shlink-web-client` on a second domain as the management UI, managed PostgreSQL holding short URLs and visits, and managed Redis providing the cache and the distributed locks Shlink needs to run more than one instance safely. An initial API key is generated at first boot, so you can self-host Shlink and be creating links minutes after the deploy finishes.

![Shlink Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786977011/4862accb-f825-45ec-8737-581927638bd7.png)

Shlink is a PHP application on the RoadRunner application server, which keeps workers warm between requests and makes redirects fast enough for real campaign traffic. Self-hosting matters when click data is sensitive, when you need more short domains than a SaaS plan allows, or when links are created from code rather than a dashboard.

- REST API and CLI covering every operation, plus official PHP, JS and Python SDKs
- Visit analytics: date, referrer, browser, operating system, device, optional geolocation
- Custom slugs, tags, QR codes, titles resolved automatically from the target page
- Multiple short domains from one instance, with per-domain and device redirect rules
- Time windows and maximum-visit limits per link
- Orphan-visit tracking, so hits on deleted or unknown slugs are still recorded

Architecturally the `shlink` service owns everything: it answers redirects, serves the API, and processes visit tracking asynchronously in its own worker pool. PostgreSQL is the system of record. Redis holds the cache and the locks that let several Shlink containers share one database without racing. `shlink-web-client` is a static single-page app served by nginx that calls the Shlink API straight from the browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| shlink | `shlinkio/shlink` | Web service |
| shlink-web-client | `shlinkio/shlink-web-client` | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | shlink | 8080 | HTTP port RoadRunner binds |
| `DB_HOST` | shlink | - | Private Postgres hostname |
| `DB_NAME` | shlink | - | Database name |
| `DB_PORT` | shlink | - | Postgres port |
| `DB_USER` | shlink | (secret) | Database user |
| `DB_DRIVER` | shlink | postgres | Database engine selector |
| `DB_PASSWORD` | shlink | (secret) | Database password |
| `REDIS_SERVERS` | shlink | - | Redis URL, credentials included |
| `DEFAULT_DOMAIN` | shlink | - | Domain used in generated short URLs |
| `WEB_WORKER_NUM` | shlink | 8 | RoadRunner HTTP worker count |
| `INITIAL_API_KEY` | shlink | (secret) | API key created on first boot |
| `TASK_WORKER_NUM` | shlink | 2 | RoadRunner job worker count |
| `TRUSTED_PROXIES` | shlink | 2 | Proxy hop count for visitor IPs |
| `IS_HTTPS_ENABLED` | shlink | true | Generate https short URLs |
| `DEFAULT_BASE_URL_REDIRECT` | shlink | - | Root redirects to the UI |
| `PORT` | shlink-web-client | 8080 | nginx listening port |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Start command:** `/bin/sh -c 'F=config/autoload/ip-address.global.php; sed -i "/.CF-Connecting-IP.,/d; /.X-Forwarded.,/d; /.Forwarded.,/d; /.True-Client-IP.,/d; /.X-Real-IP.,/d; /.X-Cluster-Client-Ip.,/d; /.Client-Ip.,/d" $F; php -l $F && echo "boot: proxy headers ->" && grep -A2 headers_to_inspect $F && exec /bin/sh ./docker-entrypoint.sh'`
- **Healthcheck:** `/rest/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/shlink)
