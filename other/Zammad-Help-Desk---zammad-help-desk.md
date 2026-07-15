# Deploy Zammad Help Desk on Railway

Zendesk/Freshdesk alternative with shared inbox, SLAs, automations, more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zammad-help-desk)

## About

Zammad is an open-source help desk and customer-support platform: a self-hostable alternative to Zendesk and Freshdesk. It unifies email, web forms, and chat into one shared inbox, with ticketing, SLAs, triggers and automations, a knowledge base, reporting, and full-text search — so your whole team answers customers from one place.

Zammad isn't a single container; it runs as several coordinated services: a Rails web app, a scheduler for background jobs and email polling, a websocket server for real-time updates, and an nginx reverse proxy, backed by PostgreSQL, Redis, and Memcached. Startup order matters (the database must be migrated and seeded before the app roles boot), attachments and settings are stored in PostgreSQL, and this Lite configuration uses Zammad's built-in database search (Elasticsearch is optional, instructions below on how to enable it). This template wires all of it together: private networking, health checks, a persistent Postgres volume, generated passwords, and the correct per-role start commands - so the deployment is a single click (and optionally configuring a custom URL).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17.10-alpine` | Database |
| Zammad Nginx | `ghcr.io/zammad/zammad:7.1.1-0020` | Web service |
| Memcached | `memcached:1.6.44-alpine` | Database |
| Zammad Scheduler | `ghcr.io/zammad/zammad:7.1.1-0020` | Worker |
| Redis | `redis:8.8-alpine` | Database |
| Zammad Rails | `ghcr.io/zammad/zammad:7.1.1-0020` | Worker |
| Zammad Websocket | `ghcr.io/zammad/zammad:7.1.1-0020` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | zammad_production |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Zammad Nginx | 8080 |
| `POSTGRESQL_DB` | Zammad Nginx | zammad_production |
| `POSTGRESQL_PORT` | Zammad Nginx | 5432 |
| `POSTGRESQL_USER` | Zammad Nginx | (secret) |
| `POSTGRESQL_OPTIONS` | Zammad Nginx | ?pool=50 |
| `POSTGRESQL_DB_CREATE` | Zammad Nginx | false |
| `ELASTICSEARCH_ENABLED` | Zammad Nginx | false |
| `RAILS_TRUSTED_PROXIES` | Zammad Nginx | 127.0.0.1,::1,100.64.0.0/10 |
| `POSTGRESQL_DB` | Zammad Scheduler | zammad_production |
| `POSTGRESQL_PORT` | Zammad Scheduler | 5432 |
| `POSTGRESQL_USER` | Zammad Scheduler | (secret) |
| `POSTGRESQL_OPTIONS` | Zammad Scheduler | ?pool=50 |
| `POSTGRESQL_DB_CREATE` | Zammad Scheduler | false |
| `ELASTICSEARCH_ENABLED` | Zammad Scheduler | false |
| `RAILS_TRUSTED_PROXIES` | Zammad Scheduler | 127.0.0.1,::1,100.64.0.0/10 |
| `POSTGRESQL_DB` | Zammad Rails | zammad_production |
| `POSTGRESQL_PORT` | Zammad Rails | 5432 |
| `POSTGRESQL_USER` | Zammad Rails | (secret) |
| `POSTGRESQL_OPTIONS` | Zammad Rails | ?pool=50 |
| `POSTGRESQL_DB_CREATE` | Zammad Rails | false |
| `ELASTICSEARCH_ENABLED` | Zammad Rails | false |
| `RAILS_TRUSTED_PROXIES` | Zammad Rails | 127.0.0.1,::1,100.64.0.0/10 |
| `POSTGRESQL_DB` | Zammad Websocket | zammad_production |
| `POSTGRESQL_PORT` | Zammad Websocket | 5432 |
| `POSTGRESQL_USER` | Zammad Websocket | (secret) |
| `POSTGRESQL_OPTIONS` | Zammad Websocket | ?pool=50 |
| `POSTGRESQL_DB_CREATE` | Zammad Websocket | false |
| `ELASTICSEARCH_ENABLED` | Zammad Websocket | false |
| `RAILS_TRUSTED_PROXIES` | Zammad Websocket | 127.0.0.1,::1,100.64.0.0/10 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bash -c 'set -e; cd /opt/zammad; : "${NGINX_PORT:=8080}"; : "${NGINX_SERVER_NAME:=_}"; : "${NGINX_SERVER_SCHEME:=\$scheme}"; : "${NGINX_CLIENT_MAX_BODY_SIZE:=50M}"; : "${ZAMMAD_RAILSSERVER_HOST:=zammad-rails.railway.internal}"; : "${ZAMMAD_RAILSSERVER_PORT:=3000}"; : "${ZAMMAD_WEBSOCKET_HOST:=zammad-websocket.railway.internal}"; : "${ZAMMAD_WEBSOCKET_PORT:=6042}"; NS=$(grep "^nameserver" --max-count 1 < /etc/resolv.conf | awk "{print \$2}"); case "$NS" in *:*) [ "${NS#[}" = "$NS" ] && NS="[$NS]";; esac; echo "resolver $NS valid=5s;" > /etc/nginx/conf.d/resolver.conf; sed -e "s#\(listen\)\(.*\)80#\1\2${NGINX_PORT}#g" -e "s#proxy_set_header X-Forwarded-Proto .*;#proxy_set_header X-Forwarded-Proto ${NGINX_SERVER_SCHEME};#g" -e "s#proxy_pass http://zammad-railsserver;#set \$zammad_railsserver_url http://${ZAMMAD_RAILSSERVER_HOST}:${ZAMMAD_RAILSSERVER_PORT}; proxy_pass \$zammad_railsserver_url;#g" -e "s#proxy_pass http://zammad-websocket;#set \$zammad_websocket_url http://${ZAMMAD_WEBSOCKET_HOST}:${ZAMMAD_WEBSOCKET_PORT}; proxy_pass \$zammad_websocket_url;#g" -e "s#server_name .*#server_name ${NGINX_SERVER_NAME};#g" -e "s#client_max_body_size .*#client_max_body_size ${NGINX_CLIENT_MAX_BODY_SIZE};#g" -e "s#/var/log/nginx/zammad.\(access\|error\).log#/dev/stdout#g" < contrib/nginx/zammad.conf > /etc/nginx/sites-enabled/default; exec /usr/sbin/nginx -g "daemon off;"'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `memcached -m 256M`
- **Start command:** `bash -c "cd /opt/zammad && exec /opt/zammad/bin/docker-entrypoint zammad-scheduler"`
- **Volume:** `/data`
- **Start command:** `bash -c "cd /opt/zammad && /opt/zammad/bin/docker-entrypoint zammad-init && exec /opt/zammad/bin/docker-entrypoint zammad-railsserver"`
- **Start command:** `bash -c "cd /opt/zammad && exec /opt/zammad/bin/docker-entrypoint zammad-websocket"`

**Category:** Other

[View on Railway →](https://railway.com/deploy/zammad-help-desk)
