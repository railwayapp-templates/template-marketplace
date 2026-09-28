# Deploy Zammad 7 | Open-Source Helpdesk and Ticketing with Search on Railway

Zammad 7 helpdesk with Elasticsearch search and an admin ready on boot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zammad-7)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/zammad-7?utm_medium=integration&utm_source=button&utm_campaign=zammad-7)

[Zammad](https://zammad.org/) is the open-source helpdesk and ticketing system: email, web forms, chat, phone, WhatsApp, Telegram and social channels land in one shared inbox, with SLAs, triggers, a knowledge base and reporting on top. This template runs Zammad 7.2 with Elasticsearch for full-text search, and creates your admin account on first boot, so the setup wizard is never open to whoever finds the URL first.

The stack is four services: Zammad, Elasticsearch, Postgres and Redis.

- **Every Zammad process in one service.** nginx on the public port, the Rails server, the websocket server and the background workers run together, like a package install on a server. Upstream's compose splits them into five containers that each boot Rails to wait for an init container; here there is one deploy to watch and one set of logs.
- **Admin ready, setup page closed.** The first boot installs the database, runs Zammad's own auto wizard with your email and a generated password, and names the organization. Log in and start working.
- **Search that finds things.** Elasticsearch 9 indexes tickets, articles, attachments, users and organizations. The index is built on first boot and rebuilt automatically if it's ever missing.
- **Upgrades that migrate themselves.** Every boot runs Zammad's migrations and translation sync before serving, so bumping the image tag is the whole upgrade.
- **Private by default.** Only nginx has a public address. Postgres, Redis and Elasticsearch are on the private network, and Elasticsearch requires a password anyway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Elasticsearch | [nomideusz/zammad-railway](https://github.com/nomideusz/zammad-railway) (root: /elasticsearch) | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.10.2-alpine` | Database |
| Zammad | [nomideusz/zammad-railway](https://github.com/nomideusz/zammad-railway) (root: /zammad) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms512m -Xmx512m | Java heap. 512 MB suits a small helpdesk; raise both values for large ticket volumes |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | Auto-generated password of the 'elastic' user |
| `POSTGRES_DB` | Postgres | zammad_production | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `PORT` | Zammad | 8080 | Port nginx listens on in front of Zammad - leave as is |
| `REDIS_URL` | Zammad | - | Redis for websocket sessions - private network, leave as is |
| `ZAMMAD_FQDN` | Zammad | - | Domain used in links and emails - set it to your custom domain when you add one |
| `POSTGRESQL_DB` | Zammad | - | Postgres database - leave as is |
| `POSTGRESQL_HOST` | Zammad | - | Postgres host - private network, leave as is |
| `POSTGRESQL_PASS` | Zammad | - | Postgres password - leave as is |
| `POSTGRESQL_PORT` | Zammad | 5432 | Postgres port |
| `POSTGRESQL_USER` | Zammad | (secret) | Postgres user - leave as is |
| `ZAMMAD_HTTP_TYPE` | Zammad | https | Scheme used in links and emails |
| `ELASTICSEARCH_HOST` | Zammad | - | Elasticsearch host - private network, leave as is |
| `ELASTICSEARCH_PASS` | Zammad | - | Elasticsearch password - leave as is |
| `ELASTICSEARCH_PORT` | Zammad | 9200 | Elasticsearch port |
| `ELASTICSEARCH_USER` | Zammad | (secret) | Elasticsearch user |
| `ZAMMAD_ADMIN_EMAIL` | Zammad | - | Your email - the admin login, created on first boot |
| `ZAMMAD_ORGANIZATION` | Zammad | My Company | Your company name, shown in Zammad and in emails. Set on first boot only |
| `ELASTICSEARCH_SCHEMA` | Zammad | http | Elasticsearch scheme |
| `POSTGRESQL_DB_CREATE` | Zammad | false | The Postgres service creates the database |
| `ZAMMAD_ADMIN_PASSWORD` | Zammad | (secret) | Admin password, set on first boot only - copy it from here to log in, then change it in Zammad |

## Configuration

- **Volume:** `/usr/share/elasticsearch/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save '' --appendonly no"`
- **Healthcheck:** `/api/v1/signshow`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile, Shell, Ruby

[View on Railway →](https://railway.com/deploy/zammad-7)
