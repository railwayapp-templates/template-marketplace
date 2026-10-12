# Deploy Zammad 7 Helpdesk and Ticketing on Railway

Email, chat and web tickets in one helpdesk. Open Zendesk alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zammad-7-helpdesk-and-ticketing)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zammad-7-helpdesk-and-ticketing?referralCode=20H68q)

Zammad is an open-source helpdesk that collects customer requests from e-mail, web forms, chat, phone and social channels into one ticket system with SLAs, triggers and a knowledge base. This community template runs the official Zammad 7 image on Railway as the full upstream stack: web, background jobs, websocket, nginx, Elasticsearch search and daily backups.

A production Zammad installation is several processes from one image: a Rails server for the UI and API, a scheduler for background jobs such as fetching mail and escalations, a websocket server, and nginx in front of them. It needs PostgreSQL, Redis, Memcached and Elasticsearch for search. This template runs each role as its own Railway service and uses Railway's PostgreSQL and Redis. Database migrations run as a pre-deploy step, the search index is built automatically, and the first administrator is created from your e-mail address, so the setup wizard cannot be claimed by someone else. Attachments are stored in PostgreSQL, Zammad's default, and an S3 bucket can be used instead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| zammad-backup | [baranberkay96/zammad-railway](https://github.com/baranberkay96/zammad-railway) (branch: main) (root: /services/zammad) | Database |
| Elasticsearch | [baranberkay96/zammad-railway](https://github.com/baranberkay96/zammad-railway) (branch: main) (root: /services/elasticsearch) | Database |
| Memcached | `memcached:1.6.45-alpine` | Database |
| zammad-nginx | [baranberkay96/zammad-railway](https://github.com/baranberkay96/zammad-railway) (branch: main) (root: /services/zammad) | Web service |
| zammad-scheduler | [baranberkay96/zammad-railway](https://github.com/baranberkay96/zammad-railway) (branch: main) (root: /services/zammad) | Worker |
| Redis | `redis:8.2` | Database |
| zammad-railsserver | [baranberkay96/zammad-railway](https://github.com/baranberkay96/zammad-railway) (branch: main) (root: /services/zammad) | Worker |
| zammad-websocket | [baranberkay96/zammad-railway](https://github.com/baranberkay96/zammad-railway) (branch: main) (root: /services/zammad) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB. |
| `TZ` | zammad-backup | - | Container time zone (logs, backup schedule). |
| `HOLD_DAYS` | zammad-backup | 10 | Days to keep backups. |
| `REDIS_URL` | zammad-backup | - | Redis for websocket sessions and background coordination. |
| `BACKUP_DIR` | zammad-backup | /var/tmp/zammad | Backup directory (this service's volume). |
| `BACKUP_TIME` | zammad-backup | 03:00 | Daily backup time (TZ). |
| `POSTGRESQL_DB` | zammad-backup | - | Database name; created by zammad-init on first deploy. |
| `NO_FILE_BACKUP` | zammad-backup | yes | Skip the storage-directory archive: attachments are in PostgreSQL (or S3), so the database dump is the backup. |
| `BACKUP_ON_START` | zammad-backup | false | Also back up whenever the service starts. |
| `POSTGRESQL_HOST` | zammad-backup | - | PostgreSQL host (private network). |
| `POSTGRESQL_PASS` | zammad-backup | - | PostgreSQL password. |
| `POSTGRESQL_PORT` | zammad-backup | - | PostgreSQL port. |
| `POSTGRESQL_USER` | zammad-backup | (secret) | PostgreSQL user. |
| `MEMCACHE_SERVERS` | zammad-backup | - | Memcached for the Rails cache. |
| `ELASTICSEARCH_HOST` | zammad-backup | - | Elasticsearch host. |
| `ELASTICSEARCH_PASS` | zammad-backup | - | Elasticsearch password. |
| `ELASTICSEARCH_PORT` | zammad-backup | - | Elasticsearch port. |
| `ELASTICSEARCH_USER` | zammad-backup | (secret) | Elasticsearch user. |
| `POSTGRESQL_OPTIONS` | zammad-backup | - | Rails connection pool options (must be at least MAX_THREADS). |
| `ELASTICSEARCH_SCHEMA` | zammad-backup | - | Elasticsearch scheme (plain HTTP on the private network). |
| `POSTGRESQL_DB_CREATE` | zammad-backup | - | Let zammad-init create the database (the Railway Postgres user may create databases). |
| `ELASTICSEARCH_ENABLED` | zammad-backup | - | Use Elasticsearch for search (recommended by Zammad). |
| `RAILS_TRUSTED_PROXIES` | zammad-backup | - | Proxies (nginx, Railway's edge) whose X-Forwarded-For Zammad trusts, for real client IPs and rate limiting. |
| `ELASTICSEARCH_NAMESPACE` | zammad-backup | - | Prefix of Zammad's Elasticsearch indexes. |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms1g -Xmx1g | JVM heap (upstream default 1 GB). Keep about half of the RAM you give Elasticsearch. |
| `network.host` | Elasticsearch | 0.0.0.0 | Bind address. 0.0.0.0, not '::': the image writes these settings to YAML unquoted and '::' breaks the parse. |
| `discovery.type` | Elasticsearch | single-node | Single-node cluster (also skips production bootstrap checks). |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | Password of the elastic user (generated). |
| `xpack.ml.enabled` | Elasticsearch | false | Machine learning features off (unused, saves memory). |
| `bootstrap.memory_lock` | Elasticsearch | false | memlock ulimits cannot be raised on Railway. |
| `node.store.allow_mmap` | Elasticsearch | false | Do not depend on the host's vm.max_map_count, which containers cannot change. |
| `xpack.security.enabled` | Elasticsearch | true | Require the elastic user's password. |
| `ingest.geoip.downloader.enabled` | Elasticsearch | false | Skip GeoIP database downloads (unused by Zammad). |
| `xpack.security.http.ssl.enabled` | Elasticsearch | false | Plain HTTP inside the private network. |
| `xpack.security.transport.ssl.enabled` | Elasticsearch | false | No transport TLS for a single node. |
| `MEMCACHED_MEMORY` | Memcached | 256 | Cache size in MB (upstream: 256). |
| `TZ` | zammad-nginx | - | Container time zone (logs, backup schedule). |
| `PORT` | zammad-nginx | 8080 | Port nginx listens on; Railway routes the public domain and its healthcheck here. |
| `REDIS_URL` | zammad-nginx | - | Redis for websocket sessions and background coordination. |
| `NGINX_PORT` | zammad-nginx | 8080 | Port nginx listens on (IPv4 and IPv6). |
| `POSTGRESQL_DB` | zammad-nginx | - | Database name; created by zammad-init on first deploy. |
| `POSTGRESQL_HOST` | zammad-nginx | - | PostgreSQL host (private network). |
| `POSTGRESQL_PASS` | zammad-nginx | - | PostgreSQL password. |
| `POSTGRESQL_PORT` | zammad-nginx | - | PostgreSQL port. |
| `POSTGRESQL_USER` | zammad-nginx | (secret) | PostgreSQL user. |
| `MEMCACHE_SERVERS` | zammad-nginx | - | Memcached for the Rails cache. |
| `ELASTICSEARCH_HOST` | zammad-nginx | - | Elasticsearch host. |
| `ELASTICSEARCH_PASS` | zammad-nginx | - | Elasticsearch password. |
| `ELASTICSEARCH_PORT` | zammad-nginx | - | Elasticsearch port. |
| `ELASTICSEARCH_USER` | zammad-nginx | (secret) | Elasticsearch user. |
| `POSTGRESQL_OPTIONS` | zammad-nginx | - | Rails connection pool options (must be at least MAX_THREADS). |
| `NGINX_SERVER_SCHEME` | zammad-nginx | https | Scheme passed to Zammad in X-Forwarded-Proto; Railway terminates TLS, so https (otherwise logins fail with CSRF errors). |
| `ELASTICSEARCH_SCHEMA` | zammad-nginx | - | Elasticsearch scheme (plain HTTP on the private network). |
| `POSTGRESQL_DB_CREATE` | zammad-nginx | - | Let zammad-init create the database (the Railway Postgres user may create databases). |
| `ELASTICSEARCH_ENABLED` | zammad-nginx | - | Use Elasticsearch for search (recommended by Zammad). |
| `RAILS_TRUSTED_PROXIES` | zammad-nginx | - | Proxies (nginx, Railway's edge) whose X-Forwarded-For Zammad trusts, for real client IPs and rate limiting. |
| `ZAMMAD_WEBSOCKET_HOST` | zammad-nginx | - | Websocket server (private network). |
| `ZAMMAD_WEBSOCKET_PORT` | zammad-nginx | - | Websocket server port. |
| `ELASTICSEARCH_NAMESPACE` | zammad-nginx | - | Prefix of Zammad's Elasticsearch indexes. |
| `ZAMMAD_RAILSSERVER_HOST` | zammad-nginx | - | Rails server (private network). |
| `ZAMMAD_RAILSSERVER_PORT` | zammad-nginx | - | Rails server port. |
| `NGINX_CLIENT_MAX_BODY_SIZE` | zammad-nginx | 50M | Maximum upload size. |
| `TZ` | zammad-scheduler | - | Container time zone (logs, backup schedule). |
| `REDIS_URL` | zammad-scheduler | - | Redis for websocket sessions and background coordination. |
| `S3_BUCKET` | zammad-scheduler | - | Optional: store attachments in S3 (e.g. a Railway Bucket) instead of PostgreSQL. Bucket name; set all S3_* variables before the first deploy. |
| `S3_REGION` | zammad-scheduler | - | Optional S3 region (Railway Buckets: auto). |
| `S3_ENDPOINT` | zammad-scheduler | - | Optional S3 endpoint URL, e.g. https://t3.storageapi.dev. |
| `POSTGRESQL_DB` | zammad-scheduler | - | Database name; created by zammad-init on first deploy. |
| `POSTGRESQL_HOST` | zammad-scheduler | - | PostgreSQL host (private network). |
| `POSTGRESQL_PASS` | zammad-scheduler | - | PostgreSQL password. |
| `POSTGRESQL_PORT` | zammad-scheduler | - | PostgreSQL port. |
| `POSTGRESQL_USER` | zammad-scheduler | (secret) | PostgreSQL user. |
| `MEMCACHE_SERVERS` | zammad-scheduler | - | Memcached for the Rails cache. |
| `S3_ACCESS_KEY_ID` | zammad-scheduler | - | Optional S3 access key. |
| `ELASTICSEARCH_HOST` | zammad-scheduler | - | Elasticsearch host. |
| `ELASTICSEARCH_PASS` | zammad-scheduler | - | Elasticsearch password. |
| `ELASTICSEARCH_PORT` | zammad-scheduler | - | Elasticsearch port. |
| `ELASTICSEARCH_USER` | zammad-scheduler | (secret) | Elasticsearch user. |
| `POSTGRESQL_OPTIONS` | zammad-scheduler | - | Rails connection pool options (must be at least MAX_THREADS). |
| `ELASTICSEARCH_SCHEMA` | zammad-scheduler | - | Elasticsearch scheme (plain HTTP on the private network). |
| `POSTGRESQL_DB_CREATE` | zammad-scheduler | - | Let zammad-init create the database (the Railway Postgres user may create databases). |
| `S3_SECRET_ACCESS_KEY` | zammad-scheduler | (secret) | Optional S3 secret key. |
| `ELASTICSEARCH_ENABLED` | zammad-scheduler | - | Use Elasticsearch for search (recommended by Zammad). |
| `ELASTICSEARCH_REINDEX` | zammad-scheduler | true | Build the search index when it does not exist yet (first install, new Elasticsearch volume). |
| `RAILS_TRUSTED_PROXIES` | zammad-scheduler | - | Proxies (nginx, Railway's edge) whose X-Forwarded-For Zammad trusts, for real client IPs and rate limiting. |
| `ELASTICSEARCH_NAMESPACE` | zammad-scheduler | - | Prefix of Zammad's Elasticsearch indexes. |
| `ELASTICSEARCH_WAIT_SECONDS` | zammad-scheduler | 900 | How long to wait for Elasticsearch before starting without the index check. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment. |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on. |
| `REDISUSER` | Redis | default | Username for authenticating with Redis. |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network. |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name. |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis. |
| `TZ` | zammad-railsserver | UTC | Container time zone (logs, backup schedule). |
| `REDIS_URL` | zammad-railsserver | - | Redis for websocket sessions and background coordination. |
| `S3_BUCKET` | zammad-railsserver | - | Optional: store attachments in S3 (e.g. a Railway Bucket) instead of PostgreSQL. Bucket name; set all S3_* variables before the first deploy. |
| `S3_REGION` | zammad-railsserver | - | Optional S3 region (Railway Buckets: auto). |
| `MAX_THREADS` | zammad-railsserver | 15 | Puma threads per worker. |
| `S3_ENDPOINT` | zammad-railsserver | - | Optional S3 endpoint URL, e.g. https://t3.storageapi.dev. |
| `ZAMMAD_FQDN` | zammad-railsserver | - | Public host name; applied on first install (later: Admin > System > Base). |
| `POSTGRESQL_DB` | zammad-railsserver | zammad_production | Database name; created by zammad-init on first deploy. |
| `POSTGRESQL_HOST` | zammad-railsserver | - | PostgreSQL host (private network). |
| `POSTGRESQL_PASS` | zammad-railsserver | - | PostgreSQL password. |
| `POSTGRESQL_PORT` | zammad-railsserver | - | PostgreSQL port. |
| `POSTGRESQL_USER` | zammad-railsserver | (secret) | PostgreSQL user. |
| `MEMCACHE_SERVERS` | zammad-railsserver | - | Memcached for the Rails cache. |
| `S3_ACCESS_KEY_ID` | zammad-railsserver | - | Optional S3 access key. |
| `ZAMMAD_HTTP_TYPE` | zammad-railsserver | https | Public scheme; applied on first install. |
| `ELASTICSEARCH_HOST` | zammad-railsserver | - | Elasticsearch host. |
| `ELASTICSEARCH_PASS` | zammad-railsserver | - | Elasticsearch password. |
| `ELASTICSEARCH_PORT` | zammad-railsserver | 9200 | Elasticsearch port. |
| `ELASTICSEARCH_USER` | zammad-railsserver | (secret) | Elasticsearch user. |
| `POSTGRESQL_OPTIONS` | zammad-railsserver | ?pool=50 | Rails connection pool options (must be at least MAX_THREADS). |
| `ZAMMAD_ADMIN_EMAIL` | zammad-railsserver | - | E-mail address (and login) of the first administrator, created on first deploy. |
| `ZAMMAD_ORGANIZATION` | zammad-railsserver | - | Optional organization name shown in Zammad (Admin > System > Branding). |
| `ELASTICSEARCH_SCHEMA` | zammad-railsserver | http | Elasticsearch scheme (plain HTTP on the private network). |
| `POSTGRESQL_DB_CREATE` | zammad-railsserver | true | Let zammad-init create the database (the Railway Postgres user may create databases). |
| `S3_SECRET_ACCESS_KEY` | zammad-railsserver | (secret) | Optional S3 secret key. |
| `ELASTICSEARCH_ENABLED` | zammad-railsserver | true | Use Elasticsearch for search (recommended by Zammad). |
| `RAILS_TRUSTED_PROXIES` | zammad-railsserver | 127.0.0.1,::1,10.0.0.0/8,100.64.0.0/10,172.16.0.0/12,192.168.0.0/16,fd00::/8 | Proxies (nginx, Railway's edge) whose X-Forwarded-For Zammad trusts, for real client IPs and rate limiting. |
| `ZAMMAD_ADMIN_LASTNAME` | zammad-railsserver | User | Last name of the first administrator. |
| `ZAMMAD_ADMIN_PASSWORD` | zammad-railsserver | (secret) | Password of the first administrator (generated; meets Zammad's password policy). Change it after login. The fixed ZaMb7- prefix guarantees Zammad's password policy (2 upper, 2 lower, digit). |
| `ZAMMAD_ADMIN_FIRSTNAME` | zammad-railsserver | Admin | First name of the first administrator. |
| `ZAMMAD_WEB_CONCURRENCY` | zammad-railsserver | 2 | Puma worker processes (about 300-500 MB each). |
| `ELASTICSEARCH_NAMESPACE` | zammad-railsserver | zammad | Prefix of Zammad's Elasticsearch indexes. |
| `ZAMMAD_RAILSSERVER_PORT` | zammad-railsserver | 3000 | Port Puma listens on (IPv4 and IPv6). |
| `TZ` | zammad-websocket | - | Container time zone (logs, backup schedule). |
| `REDIS_URL` | zammad-websocket | - | Redis for websocket sessions and background coordination. |
| `POSTGRESQL_DB` | zammad-websocket | - | Database name; created by zammad-init on first deploy. |
| `POSTGRESQL_HOST` | zammad-websocket | - | PostgreSQL host (private network). |
| `POSTGRESQL_PASS` | zammad-websocket | - | PostgreSQL password. |
| `POSTGRESQL_PORT` | zammad-websocket | - | PostgreSQL port. |
| `POSTGRESQL_USER` | zammad-websocket | (secret) | PostgreSQL user. |
| `MEMCACHE_SERVERS` | zammad-websocket | - | Memcached for the Rails cache. |
| `ELASTICSEARCH_HOST` | zammad-websocket | - | Elasticsearch host. |
| `ELASTICSEARCH_PASS` | zammad-websocket | - | Elasticsearch password. |
| `ELASTICSEARCH_PORT` | zammad-websocket | - | Elasticsearch port. |
| `ELASTICSEARCH_USER` | zammad-websocket | (secret) | Elasticsearch user. |
| `POSTGRESQL_OPTIONS` | zammad-websocket | - | Rails connection pool options (must be at least MAX_THREADS). |
| `ELASTICSEARCH_SCHEMA` | zammad-websocket | - | Elasticsearch scheme (plain HTTP on the private network). |
| `POSTGRESQL_DB_CREATE` | zammad-websocket | - | Let zammad-init create the database (the Railway Postgres user may create databases). |
| `ELASTICSEARCH_ENABLED` | zammad-websocket | - | Use Elasticsearch for search (recommended by Zammad). |
| `RAILS_TRUSTED_PROXIES` | zammad-websocket | - | Proxies (nginx, Railway's edge) whose X-Forwarded-For Zammad trusts, for real client IPs and rate limiting. |
| `ZAMMAD_WEBSOCKET_BIND` | zammad-websocket | :: | Bind address; '::' accepts IPv4 and IPv6 on Railway's private network. |
| `ZAMMAD_WEBSOCKET_PORT` | zammad-websocket | 6042 | Port of the legacy websocket server. |
| `ELASTICSEARCH_NAMESPACE` | zammad-websocket | - | Prefix of Zammad's Elasticsearch indexes. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/usr/local/bin/railway-zammad zammad-backup`
- **Volume:** `/var/tmp/zammad`
- **Volume:** `/usr/share/elasticsearch/data`
- **Start command:** `/bin/sh -c "exec memcached -m ${MEMCACHED_MEMORY:-256}"`
- **Start command:** `/usr/local/bin/railway-zammad zammad-nginx`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/usr/local/bin/railway-zammad zammad-scheduler`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/usr/local/bin/railway-zammad zammad-railsserver`
- **Start command:** `/usr/local/bin/railway-zammad zammad-websocket`

**Category:** Other · **Tags:** zammad, helpdesk, ticketing, customer-support, live-chat · **Languages:** Shell, Ruby, Dockerfile

[View on Railway →](https://railway.com/deploy/zammad-7-helpdesk-and-ticketing)
