# Deploy Zammad on Railway

Helpdesk software that turns customer emails into tracked tickets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zammad)

## About

Zammad is an open-source helpdesk that pulls email, web forms, phone notes, chat and messenger conversations into one shared agent inbox. Teams use it to replace a shared mailbox or a paid ticketing suite with something they control: full-text search across every conversation, SLAs and escalation timers, trigger and scheduler automation, a knowledge base, per-group permissions and a REST API. Developed in the open since 2016 under AGPL-3.0, it is a common pick for teams wanting Zendesk-style workflows without per-agent billing.

Self-host Zammad on Railway with the production topology its maintainers run, already wired together. The template splits Zammad into its four documented roles — a reverse proxy owning the public domain, a Rails application server, a websocket server for live updates and a background scheduler — and puts PostgreSQL, Redis, memcached and Elasticsearch behind them on the private network. Attachments go to an object-storage bucket rather than a disk, so the application tier stays stateless.

![Diagram of the eight Zammad services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788075589/zammad-architecture.png)

Zammad is a full service desk, not a shared inbox with tags. A ticket carries state, priority, owner, group, tags, links, time accounting and a complete audit history; agents work it through overviews they define themselves, while triggers and scheduled jobs act on it automatically. Support archives hold some of the most sensitive data an organisation has, and Zammad's licence lets you keep it on infrastructure you control.

Key capabilities:

- Email, web form, phone, chat, Telegram, WhatsApp and Microsoft 365 channels
- SLAs with escalation timers, business calendars and per-group targets
- Triggers, macros, scheduled jobs and a Core Workflow automation engine
- Customer-facing knowledge base with drafts, translations and public links
- Fine-grained roles, per-group permissions, LDAP/SAML/OIDC sign-on, REST API

The service split mirrors how Zammad runs in production. **zammad-nginx** terminates traffic, serves the compiled frontend and splits `/ws` from the application, which is why it is the only service with a public domain. **zammad-railsserver** runs Puma and owns schema migrations. **zammad-websocket** holds the connections that push live updates to open tabs. **zammad-scheduler** runs delayed jobs, escalations, email fetching and indexing away from request traffic. **PostgreSQL** stores ticket data, **Redis** the websocket sessions, **memcached** the Rails cache, **Elasticsearch** the search index.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zammad-scheduler | [gridalpha/zammad-railway](https://github.com/gridalpha/zammad-railway) | Worker |
| zammad-railsserver | [gridalpha/zammad-railway](https://github.com/gridalpha/zammad-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| memcached | `memcached:1.6-alpine` | Database |
| Redis | `redis:8.2` | Database |
| zammad-nginx | [gridalpha/zammad-railway](https://github.com/gridalpha/zammad-railway) | Web service |
| zammad-websocket | [gridalpha/zammad-railway](https://github.com/gridalpha/zammad-railway) | Worker |
| elasticsearch | [gridalpha/zammad-railway](https://github.com/gridalpha/zammad-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | zammad-scheduler | UTC | Container timezone |
| `REDIS_URL` | zammad-scheduler | - | Redis connection string |
| `S3_BUCKET` | zammad-scheduler | - | Attachment bucket name |
| `S3_REGION` | zammad-scheduler | - | Object storage region |
| `S3_ENDPOINT` | zammad-scheduler | - | Object storage endpoint |
| `ZAMMAD_FQDN` | zammad-scheduler | - | Public hostname of the instance |
| `ZAMMAD_ROLE` | zammad-scheduler | zammad-scheduler | Runs background jobs and email fetching |
| `POSTGRESQL_DB` | zammad-scheduler | - | Database name |
| `POSTGRESQL_HOST` | zammad-scheduler | - | Database host |
| `POSTGRESQL_PASS` | zammad-scheduler | - | Database password |
| `POSTGRESQL_PORT` | zammad-scheduler | - | Database port |
| `POSTGRESQL_USER` | zammad-scheduler | (secret) | Database user |
| `MEMCACHE_SERVERS` | zammad-scheduler | - | Rails cache endpoint |
| `S3_ACCESS_KEY_ID` | zammad-scheduler | - | Object storage access key |
| `ZAMMAD_HTTP_TYPE` | zammad-scheduler | https | Scheme used in generated links |
| `ELASTICSEARCH_HOST` | zammad-scheduler | - | Search cluster host |
| `ELASTICSEARCH_PORT` | zammad-scheduler | 9200 | Search cluster port |
| `POSTGRESQL_OPTIONS` | zammad-scheduler | ?pool=25 | Connection pool size |
| `ELASTICSEARCH_SCHEMA` | zammad-scheduler | http | Private network needs no TLS |
| `POSTGRESQL_DB_CREATE` | zammad-scheduler | false | Database already exists |
| `S3_SECRET_ACCESS_KEY` | zammad-scheduler | (secret) | Object storage secret key |
| `ELASTICSEARCH_ENABLED` | zammad-scheduler | true | Enables search indexing |
| `RAILS_TRUSTED_PROXIES` | zammad-scheduler | 127.0.0.1,::1,10.0.0.0/8,100.64.0.0/10,152.233.0.0/17,fd00::/8 | Proxy ranges for real client IPs |
| `ELASTICSEARCH_NAMESPACE` | zammad-scheduler | zammad | Search index prefix |
| `TZ` | zammad-railsserver | UTC | Container timezone |
| `PORT` | zammad-railsserver | 3000 | Port the health check probes |
| `REDIS_URL` | zammad-railsserver | - | Redis connection string |
| `S3_BUCKET` | zammad-railsserver | - | Attachment bucket name |
| `S3_REGION` | zammad-railsserver | - | Object storage region |
| `MAX_THREADS` | zammad-railsserver | 15 | Puma thread pool size |
| `S3_ENDPOINT` | zammad-railsserver | - | Object storage endpoint |
| `ZAMMAD_FQDN` | zammad-railsserver | - | Public hostname of the instance |
| `ZAMMAD_ROLE` | zammad-railsserver | zammad-app | Runs migrations then the app server |
| `POSTGRESQL_DB` | zammad-railsserver | - | Database name |
| `POSTGRESQL_HOST` | zammad-railsserver | - | Database host |
| `POSTGRESQL_PASS` | zammad-railsserver | - | Database password |
| `POSTGRESQL_PORT` | zammad-railsserver | - | Database port |
| `POSTGRESQL_USER` | zammad-railsserver | (secret) | Database user |
| `MEMCACHE_SERVERS` | zammad-railsserver | - | Rails cache endpoint |
| `S3_ACCESS_KEY_ID` | zammad-railsserver | - | Object storage access key |
| `ZAMMAD_HTTP_TYPE` | zammad-railsserver | https | Scheme used in generated links |
| `ELASTICSEARCH_HOST` | zammad-railsserver | - | Search cluster host |
| `ELASTICSEARCH_PORT` | zammad-railsserver | 9200 | Search cluster port |
| `POSTGRESQL_OPTIONS` | zammad-railsserver | ?pool=25 | Connection pool size |
| `ZAMMAD_ADMIN_EMAIL` | zammad-railsserver | admin@example.com | First administrator login |
| `ZAMMAD_ALLOW_SIGNUP` | zammad-railsserver | false | Customer self-registration switch |
| `ZAMMAD_ORGANIZATION` | zammad-railsserver | My Company | Organisation created at setup |
| `ZAMMAD_PRODUCT_NAME` | zammad-railsserver | Zammad Helpdesk | Name shown in the interface |
| `ELASTICSEARCH_SCHEMA` | zammad-railsserver | http | Private network needs no TLS |
| `POSTGRESQL_DB_CREATE` | zammad-railsserver | false | Database already exists |
| `S3_SECRET_ACCESS_KEY` | zammad-railsserver | (secret) | Object storage secret key |
| `ELASTICSEARCH_ENABLED` | zammad-railsserver | true | Enables search indexing |
| `ELASTICSEARCH_REINDEX` | zammad-railsserver | true | Builds the index on first boot |
| `RAILS_TRUSTED_PROXIES` | zammad-railsserver | 127.0.0.1,::1,10.0.0.0/8,100.64.0.0/10,152.233.0.0/17,fd00::/8 | Proxy ranges for real client IPs |
| `ZAMMAD_ADMIN_LASTNAME` | zammad-railsserver | User | First administrator surname |
| `ZAMMAD_ADMIN_PASSWORD` | zammad-railsserver | (secret) | First administrator password |
| `ZAMMAD_ADMIN_FIRSTNAME` | zammad-railsserver | Admin | First administrator given name |
| `ELASTICSEARCH_NAMESPACE` | zammad-railsserver | zammad | Search index prefix |
| `ZAMMAD_RAILSSERVER_PORT` | zammad-railsserver | 3000 | Puma listening port |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `TZ` | zammad-nginx | UTC | Container timezone |
| `PORT` | zammad-nginx | 8080 | Port the health check probes |
| `REDIS_URL` | zammad-nginx | - | Redis connection string |
| `NGINX_PORT` | zammad-nginx | 8080 | Port nginx listens on |
| `ZAMMAD_FQDN` | zammad-nginx | - | Public hostname of the instance |
| `ZAMMAD_ROLE` | zammad-nginx | zammad-nginx | Runs the reverse proxy role |
| `POSTGRESQL_DB` | zammad-nginx | - | Database name |
| `POSTGRESQL_HOST` | zammad-nginx | - | Database host |
| `POSTGRESQL_PASS` | zammad-nginx | - | Database password |
| `POSTGRESQL_PORT` | zammad-nginx | - | Database port |
| `POSTGRESQL_USER` | zammad-nginx | (secret) | Database user |
| `MEMCACHE_SERVERS` | zammad-nginx | - | Rails cache endpoint |
| `ZAMMAD_HTTP_TYPE` | zammad-nginx | https | Scheme used in generated links |
| `ELASTICSEARCH_HOST` | zammad-nginx | - | Search cluster host |
| `ELASTICSEARCH_PORT` | zammad-nginx | 9200 | Search cluster port |
| `POSTGRESQL_OPTIONS` | zammad-nginx | ?pool=5 | Connection pool size |
| `NGINX_SERVER_SCHEME` | zammad-nginx | https | Forwarded protocol sent to Rails |
| `ELASTICSEARCH_SCHEMA` | zammad-nginx | http | Private network needs no TLS |
| `POSTGRESQL_DB_CREATE` | zammad-nginx | false | Database already exists |
| `ELASTICSEARCH_ENABLED` | zammad-nginx | true | Enables search indexing |
| `RAILS_TRUSTED_PROXIES` | zammad-nginx | 127.0.0.1,::1,10.0.0.0/8,100.64.0.0/10,152.233.0.0/17,fd00::/8 | Proxy ranges for real client IPs |
| `ZAMMAD_WEBSOCKET_HOST` | zammad-nginx | - | Websocket upstream |
| `ZAMMAD_WEBSOCKET_PORT` | zammad-nginx | 6042 | Websocket upstream port |
| `ELASTICSEARCH_NAMESPACE` | zammad-nginx | zammad | Search index prefix |
| `ZAMMAD_RAILSSERVER_HOST` | zammad-nginx | - | Application upstream |
| `ZAMMAD_RAILSSERVER_PORT` | zammad-nginx | 3000 | Application upstream port |
| `NGINX_CLIENT_MAX_BODY_SIZE` | zammad-nginx | 50M | Maximum attachment upload size |
| `TZ` | zammad-websocket | UTC | Container timezone |
| `PORT` | zammad-websocket | 6042 | Port the health check probes |
| `REDIS_URL` | zammad-websocket | - | Redis connection string |
| `ZAMMAD_FQDN` | zammad-websocket | - | Public hostname of the instance |
| `ZAMMAD_ROLE` | zammad-websocket | zammad-websocket | Runs the websocket server role |
| `POSTGRESQL_DB` | zammad-websocket | - | Database name |
| `POSTGRESQL_HOST` | zammad-websocket | - | Database host |
| `POSTGRESQL_PASS` | zammad-websocket | - | Database password |
| `POSTGRESQL_PORT` | zammad-websocket | - | Database port |
| `POSTGRESQL_USER` | zammad-websocket | (secret) | Database user |
| `MEMCACHE_SERVERS` | zammad-websocket | - | Rails cache endpoint |
| `ZAMMAD_HTTP_TYPE` | zammad-websocket | https | Scheme used in generated links |
| `ELASTICSEARCH_HOST` | zammad-websocket | - | Search cluster host |
| `ELASTICSEARCH_PORT` | zammad-websocket | 9200 | Search cluster port |
| `POSTGRESQL_OPTIONS` | zammad-websocket | ?pool=10 | Connection pool size |
| `ELASTICSEARCH_SCHEMA` | zammad-websocket | http | Private network needs no TLS |
| `POSTGRESQL_DB_CREATE` | zammad-websocket | false | Database already exists |
| `ELASTICSEARCH_ENABLED` | zammad-websocket | true | Enables search indexing |
| `RAILS_TRUSTED_PROXIES` | zammad-websocket | 127.0.0.1,::1,10.0.0.0/8,100.64.0.0/10,152.233.0.0/17,fd00::/8 | Proxy ranges for real client IPs |
| `ZAMMAD_WEBSOCKET_BIND` | zammad-websocket | :: | Dual-stack bind for private networking |
| `ZAMMAD_WEBSOCKET_PORT` | zammad-websocket | 6042 | Websocket listening port |
| `ELASTICSEARCH_NAMESPACE` | zammad-websocket | zammad | Search index prefix |
| `WEBSOCKET_SERVER_LOG_TO_STDOUT` | zammad-websocket | 1 | Sends websocket logs to Railway |
| `PORT` | elasticsearch | 9200 | Port the health check probes |
| `ES_JAVA_OPTS` | elasticsearch | -Xms1g -Xmx1g | JVM heap for the search node |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `memcached -m 256M -l ::,0.0.0.0 -p 11211`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/share/elasticsearch/data`

**Category:** Other · **Languages:** Shell, Ruby, Dockerfile

[View on Railway →](https://railway.com/deploy/zammad)
