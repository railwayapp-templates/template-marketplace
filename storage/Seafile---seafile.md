# Deploy Seafile on Railway

Dropbox Alternative. File sync, sharing, versioning & collaborative editing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/seafile)

## About

Seafile is an open-source file sync and share platform — a self-hosted Dropbox alternative developed in the open at [github.com/haiwen](https://github.com/haiwen/seafile). It organises storage into *libraries*: independent, versioned repositories that can be shared by link, synced selectively, or encrypted client-side with a password the server never stores. Files are split into blocks and deduplicated, so editing one slide in a 400 MB deck transfers only the changed chunks.

Deploy Seafile Community Edition 13.0.25 on Railway with six services already wired together: `seafile` (Seahub, `seaf-server` and the Go fileserver), `seadoc` for collaborative documents, `notification-server` for realtime updates, `mariadb`, a managed `Redis` for cache and sessions, and `seafile-proxy`, a Caddy router holding the only public domain. Seahub's session cookie is `SameSite=Lax`, so every browser-facing component must answer on one origin, and the proxy path-splits that hostname across the three backends.

![Seafile Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787075211/3e6b8a39-f189-4d34-aebe-61b353dd1bfa.png)

Teams self-host Seafile when data residency matters, when per-seat pricing stops making sense, or when files are too large for a browser upload widget.

- **Libraries instead of folders** — each separately shared, versioned and snapshotted, with its own trash
- **Block-level sync and deduplication** — only changed chunks travel
- **Client-side encrypted libraries** — the password never reaches the server
- **SeaDoc collaborative editing** — realtime co-editing with comments for notes and wikis
- **Clients everywhere** — Windows, macOS, Linux, iOS, Android, SeaDrive and WebDAV

`seafile` holds all durable state on a `/shared` volume: file blocks, configuration and logs. `mariadb` holds `seafile_ccnet` for users and groups, `seafile_core` for library metadata and `seafile_hub` for Seahub's Django tables. `Redis` backs the cache and sessions, while `seadoc` and `notification-server` are stateless helpers reading MariaDB directly with a shared JWT key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| seafile-proxy | [gridalpha/seafile-railway](https://github.com/gridalpha/seafile-railway) | Web service |
| notification-server | `seafileltd/notification-server:13.0-latest` | Worker |
| seafile | `seafileltd/seafile-mc:13.0-latest` | Database |
| seadoc | `seafileltd/sdoc-server:2.0-latest` | Database |
| Redis | `redis:8.2` | Database |
| mariadb | `mariadb:10.11` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | seafile-proxy | 8080 | Caddy listening port |
| `PORT` | notification-server | 8083 | Websocket listening port |
| `JWT_PRIVATE_KEY` | notification-server | - | Must match the seafile service |
| `SEAFILE_LOG_TO_STDOUT` | notification-server | true | Send logs to the deploy log |
| `SEAFILE_MYSQL_DB_HOST` | notification-server | mariadb.railway.internal | Private MariaDB hostname |
| `SEAFILE_MYSQL_DB_PORT` | notification-server | 3306 | MariaDB port |
| `SEAFILE_MYSQL_DB_USER` | notification-server | (secret) | Shared application database user |
| `SEAFILE_MYSQL_DB_PASSWORD` | notification-server | (secret) | Shared application database password |
| `NOTIFICATION_SERVER_LOG_LEVEL` | notification-server | info | Log verbosity |
| `SEAFILE_MYSQL_DB_CCNET_DB_NAME` | notification-server | - | Users and groups database |
| `SEAFILE_MYSQL_DB_SEAFILE_DB_NAME` | notification-server | - | Library metadata database |
| `TZ` | seafile | Etc/UTC | Container timezone |
| `PORT` | seafile | 80 | Bundled nginx listening port |
| `NON_ROOT` | seafile | false | Run container processes as root |
| `SITE_ROOT` | seafile | / | Seahub mount path |
| `TIME_ZONE` | seafile | Etc/UTC | Seahub timezone |
| `REDIS_HOST` | seafile | - | Private Redis hostname |
| `REDIS_PORT` | seafile | - | Redis port |
| `ENABLE_SEADOC` | seafile | true | Turns on collaborative document editing |
| `CACHE_PROVIDER` | seafile | redis | Seahub cache backend |
| `REDIS_PASSWORD` | seafile | (secret) | Redis auth password |
| `JWT_PRIVATE_KEY` | seafile | - | Shared internal signing key |
| `SEADOC_SERVER_URL` | seafile | - | Browser-facing SeaDoc URL |
| `CSRF_TRUSTED_ORIGINS` | seafile | - | JSON list, parsed by Seahub |
| `ENABLE_GO_FILESERVER` | seafile | true | Faster Go upload and download path |
| `SEAFILE_LOG_TO_STDOUT` | seafile | true | Send logs to the deploy log |
| `SEAFILE_MYSQL_DB_HOST` | seafile | mariadb.railway.internal | Private MariaDB hostname |
| `SEAFILE_MYSQL_DB_PORT` | seafile | 3306 | MariaDB port |
| `SEAFILE_MYSQL_DB_USER` | seafile | (secret) | Application database user |
| `NOTIFICATION_SERVER_URL` | seafile | - | Browser websocket URL |
| `SEAFILE_SERVER_HOSTNAME` | seafile | - | Public hostname from the proxy |
| `SEAFILE_SERVER_PROTOCOL` | seafile | https | Scheme used in generated links |
| `INIT_SEAFILE_ADMIN_EMAIL` | seafile | me@example.com | First admin login, change before deploy |
| `SEAFILE_MYSQL_DB_PASSWORD` | seafile | (secret) | Application database password |
| `ENABLE_NOTIFICATION_SERVER` | seafile | true | Turns on realtime notifications |
| `INIT_SEAFILE_ADMIN_PASSWORD` | seafile | (secret) | First admin password |
| `INNER_NOTIFICATION_SERVER_URL` | seafile | http://notification-server.railway.internal:8083 | Server-to-server URL |
| `SEAFILE_MYSQL_DB_CCNET_DB_NAME` | seafile | seafile_ccnet | Users and groups database |
| `SEAFILE_MYSQL_DB_SEAHUB_DB_NAME` | seafile | seafile_hub | Seahub Django database |
| `INIT_SEAFILE_MYSQL_ROOT_PASSWORD` | seafile | (secret) | Used once to create schemas |
| `SEAFILE_MYSQL_DB_SEAFILE_DB_NAME` | seafile | seafile_core | Library metadata database |
| `TZ` | seadoc | Etc/UTC | Container timezone |
| `PORT` | seadoc | 80 | SeaDoc nginx listening port |
| `DB_HOST` | seadoc | mariadb.railway.internal | Private MariaDB hostname |
| `DB_NAME` | seadoc | - | Seahub database holding sdoc tables |
| `DB_PORT` | seadoc | 3306 | MariaDB port |
| `DB_USER` | seadoc | (secret) | Shared application database user |
| `NON_ROOT` | seadoc | false | Run container processes as root |
| `TIME_ZONE` | seadoc | Etc/UTC | Application timezone |
| `DB_PASSWORD` | seadoc | (secret) | Shared application database password |
| `JWT_PRIVATE_KEY` | seadoc | - | Must match the seafile service |
| `SEAHUB_SERVICE_URL` | seadoc | http://seafile.railway.internal | Private Seahub callback URL |
| `SEAFILE_LOG_TO_STDOUT` | seadoc | true | Send logs to the deploy log |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `TZ` | mariadb | Etc/UTC | Container timezone |
| `MYSQL_LOG_CONSOLE` | mariadb | true | Send server logs to stdout |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Run mariadb-upgrade after image bumps |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Root password, read on first boot |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/ping`
- **Healthcheck:** `/accounts/login/`
- **Volume:** `/shared`
- **Start command:** `/bin/sh -c 'rm -f /etc/nginx/conf.d/default.conf; echo "boot: removed stock nginx default server so nginx-sdoc.conf is the default for :80"; exec /sbin/my_init -- /scripts/enterpoint.sh'`
- **Healthcheck:** `/`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'MEM=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$MEM" in ""|max|*[!0-9]*) MEM=2147483648;; esac; POOL=$((MEM/1024/1024/4)); if [ "$POOL" -lt 128 ]; then POOL=128; fi; echo "boot: cgroup_mem=${MEM} innodb_buffer_pool_size=${POOL}M"; exec docker-entrypoint.sh mariadbd --innodb-buffer-pool-size=${POOL}M --max-connections=300'`
- **Volume:** `/var/lib/mysql`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/seafile)
