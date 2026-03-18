# Deploy Pixelfed on Railway

Explore + Share beautiful photos and videos on the Fediverse

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/OZSdEw)

## About

A fresh take on photo sharing. Get inspired with beautiful photos captured by people around the world.

- Ad-free and privacy friendly
- Open source and decentralized
- Chronological

## What do you get here?

This configuration is pretty opinionated. Its supposed to be good to get you started, but you'll certainly want to change it — you can see the variables [here](https://web.archive.org/web/20230517011052/https://docs.pixelfed.org/technical-documentation/config). 

Specifically, you may want to:

- disable ActivityPub if you want a local only community
- or turn off signups by setting `OPEN_REGISTRATION` to false.
- change `FILESYSTEM_DRIVER` to be S3 (see further configuration) to avoid filling up your railway disk too fast

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pixelfed | `quay.io/zknt/pixelfed` | Web service |
| MySQL | `mysql` | Database |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | Pixelfed | UTC | - |
| `PORT` | Pixelfed | 80 | - |
| `APP_ENV` | Pixelfed | production | - |
| `DB_PORT` | Pixelfed | 3306 | - |
| `APP_NAME` | Pixelfed | - | The name/title for your site |
| `AP_INBOX` | Pixelfed | true | - |
| `NODEINFO` | Pixelfed | true | - |
| `APP_DEBUG` | Pixelfed | false | - |
| `AP_OUTBOX` | Pixelfed | true | - |
| `WEBFINGER` | Pixelfed | true | - |
| `ATOM_FEEDS` | Pixelfed | true | - |
| `DB_VERSION` | Pixelfed | 11.2 | - |
| `REDIS_PORT` | Pixelfed | 6379 | - |
| `DB_PASSWORD` | Pixelfed | (secret) | - |
| `DB_USERNAME` | Pixelfed | (secret) | - |
| `ACTIVITY_PUB` | Pixelfed | true | - |
| `PF_MAX_USERS` | Pixelfed | 100 | - |
| `QUEUE_DRIVER` | Pixelfed | redis | - |
| `REDIS_SCHEME` | Pixelfed | tcp | - |
| `DB_CONNECTION` | Pixelfed | mysql | - |
| `IMAGE_QUALITY` | Pixelfed | 80 | - |
| `OAUTH_ENABLED` | Pixelfed | false | - |
| `TRUST_PROXIES` | Pixelfed | * | - |
| `MAX_PHOTO_SIZE` | Pixelfed | 10000 | - |
| `REDIS_PASSWORD` | Pixelfed | (secret) | - |
| `SESSION_DRIVER` | Pixelfed | redis | - |
| `STORIES_ENABLED` | Pixelfed | true | - |
| `AP_REMOTE_FOLLOW` | Pixelfed | true | - |
| `BROADCAST_DRIVER` | Pixelfed | redis | - |
| `MAX_ALBUM_LENGTH` | Pixelfed | 10 | - |
| `OPEN_REGISTRATION` | Pixelfed | true | - |
| `MAX_CAPTION_LENGTH` | Pixelfed | 500 | - |
| `PF_OPTIMIZE_IMAGES` | Pixelfed | true | - |
| `ENABLE_CONFIG_CACHE` | Pixelfed | false | - |
| `INSTANCE_PUBLIC_HASHTAGS` | Pixelfed | true | - |
| `ENFORCE_EMAIL_VERIFICATION` | Pixelfed | false | - |
| `INSTANCE_PUBLIC_LOCAL_TIMELINE` | Pixelfed | true | - |
| `DB_APPLY_NEW_MIGRATIONS_AUTOMATICALLY` | Pixelfed | true | - |
| `MYSQLHOST` | MySQL | - | Railway TCP Proxy Domain. |
| `MYSQLPORT` | MySQL | - | MySQL TCP Proxy port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PRIVATE_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |

## Configuration

- **Start command:** `/bin/sh -c "echo \"ServerName 0.0.0.0\" >> /etc/apache2/apache2.conf && sleep 3 && /entrypoint.sh"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/storage`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Blogs

[View on Railway →](https://railway.com/template/OZSdEw)
