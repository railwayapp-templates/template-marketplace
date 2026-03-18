# Deploy BookStack on Railway

Simple, easy-to-use platform for organising and storing information.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bookstack)

## About

BookStack is an open-source, user-friendly documentation and knowledge-management platform designed to help teams create, organize, and share content. It offers a simple, intuitive interface modeled around Books, Chapters, and Pages, making it easy for anyone—technical or not—to contribute. BookStack aims to provide a powerful yet approachable out-of-the-box experience without requiring extensive customization.

Hosting BookStack involves running a PHP/Laravel application backed by a database and optional services like SSO, S3 storage, and caching. A typical deployment includes configuring environment variables, ensuring persistent storage, and managing updates. Hosting on a modern platform like Railway simplifies provisioning infrastructure, scaling, and setup. With managed databases, built-in storage options, and streamlined deployment workflows, Railway removes much of the operational overhead that comes with running a self-hosted documentation system.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| BucketProxy | `ghcr.io/railwayapp/function-bun:1.3.0` | Web service |
| Redis | `redis:8.2.1` | Database |
| Bookstack | `linuxserver/bookstack:25.12.9` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `S3_SECRET_ACCESS_KEY` | BucketProxy | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `TZ` | Bookstack | Etc/UTC | - |
| `PGID` | Bookstack | 1000 | - |
| `PUID` | Bookstack | 1000 | - |
| `APP_ENV` | Bookstack | production | App environment |
| `APP_KEY` | Bookstack | - | App secret |
| `APP_URL` | Bookstack | - | APP URL |
| `DB_HOST` | Bookstack | - | Database host |
| `DB_PORT` | Bookstack | 3306 | Database Port |
| `APP_LANG` | Bookstack | en | App language |
| `APP_DEBUG` | Bookstack | false | If debug |
| `MAIL_FROM` | Bookstack | bookstack@example.com | Mail from |
| `MAIL_HOST` | Bookstack | localhost | Mail Host |
| `MAIL_PORT` | Bookstack | 587 | Mail port |
| `AUTH_METHOD` | Bookstack | standard | Can be 'standard', 'ldap', 'saml2' or 'oidc' |
| `DB_DATABASE` | Bookstack | - | Database name |
| `DB_PASSWORD` | Bookstack | (secret) | Database password |
| `DB_USERNAME` | Bookstack | (secret) | Database username |
| `MAIL_DRIVER` | Bookstack | smtp | Mail driver |
| `CACHE_DRIVER` | Bookstack | redis | Cache driver |
| `MAIL_PASSWORD` | Bookstack | (secret) | Mail Password |
| `MAIL_USERNAME` | Bookstack | (secret) | Mail Username |
| `REDIS_SERVERS` | Bookstack | - | Redis URL |
| `MAIL_FROM_NAME` | Bookstack | BookStack | - |
| `SESSION_DRIVER` | Bookstack | redis | - |
| `APP_VIEWS_BOOKS` | Bookstack | list | - |
| `MAIL_ENCRYPTION` | Bookstack | null | - |
| `MAIL_VERIFY_SSL` | Bookstack | true | - |
| `QUEUE_CONNECTION` | Bookstack | redis | - |
| `SESSION_LIFETIME` | Bookstack | 120 | - |
| `STORAGE_S3_SECRET` | Bookstack | (secret) | - |
| `STORAGE_IMAGE_TYPE` | Bookstack | s3 | - |
| `APP_VIEWS_BOOKSHELF` | Bookstack | grid | - |
| `SESSION_COOKIE_NAME` | Bookstack | bookstack_session | - |
| `API_REQUESTS_PER_MIN` | Bookstack | 100 | - |
| `APP_AUTO_LANG_PUBLIC` | Bookstack | true | - |
| `APP_VIEWS_BOOKSHELVES` | Bookstack | grid | - |
| `SESSION_SECURE_COOKIE` | Bookstack | false | - |
| `FILE_UPLOAD_SIZE_LIMIT` | Bookstack | 50 | - |
| `STORAGE_ATTACHMENT_TYPE` | Bookstack | local_secure | - |
| `DISABLE_EXTERNAL_SERVICES` | Bookstack | false | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Start command:** `./run.sh Ly8gaW5kZXgudHN4IChCdW4gcnVudGltZSkKaW1wb3J0IHsgSG9ubyB9IGZyb20gImhvbm8iOwppbXBvcnQgeyBjb3JzIH0gZnJvbSAiaG9uby9jb3JzIjsKaW1wb3J0IHsgUzNDbGllbnQgfSBmcm9tICJidW4iOwppbXBvcnQgeyBzdHJlYW0gfSBmcm9tICJob25vL3N0cmVhbWluZyI7Cgpjb25zdCBhcHAgPSBuZXcgSG9ubygpOwoKY29uc3QgY2xpZW50ID0gbmV3IFMzQ2xpZW50KHsKICBhY2Nlc3NLZXlJZDogQnVuLmVudi5TM19BQ0NFU1NfS0VZX0lELAogIHNlY3JldEFjY2Vzc0tleTogQnVuLmVudi5TM19TRUNSRVRfQUNDRVNTX0tFWSwKICBidWNrZXQ6IEJ1bi5lbnYuUzNfQlVDS0VULAogIGVuZHBvaW50OiBCdW4uZW52LlMzX0VORFBPSU5ULAp9KTsKCmFwcC51c2UoIi8qIiwgY29ycygpKTsKCmFwcC5nZXQoIi8qIiwgYXN5bmMgKGMpID0+IHsKICBjb25zdCBwYXRobmFtZSA9IGMucmVxLnBhdGg7CgogIGlmIChwYXRobmFtZSA9PT0gIi8iKSB7CiAgICByZXR1cm4gYy5ub3RGb3VuZCgpOwogIH0KCiAgY29uc3QgczNmaWxlID0gY2xpZW50LmZpbGUocGF0aG5hbWUpOwogIGlmICghKGF3YWl0IHMzZmlsZS5leGlzdHMoKSkpIHsKICAgIHJldHVybiBjLm5vdEZvdW5kKCk7CiAgfQoKICBjb25zdCBtZXRhID0gYXdhaXQgczNmaWxlLnN0YXQoKTsKCiAgaWYgKG1ldGEudHlwZSkgewogICAgYy5oZWFkZXIoIkNvbnRlbnQtVHlwZSIsIG1ldGEudHlwZSk7CiAgfQogIGlmIChtZXRhLmV0YWcpIHsKICAgIGMuaGVhZGVyKCJFVGFnIiwgbWV0YS5ldGFnKTsKICB9CiAgaWYgKG1ldGEubGFzdE1vZGlmaWVkKSB7CiAgICBjLmhlYWRlcigiTGFzdC1Nb2RpZmllZCIsIG1ldGEubGFzdE1vZGlmaWVkLnRvR01UU3RyaW5nKCkpOwogIH0KCiAgYy5oZWFkZXIoIkNhY2hlLUNvbnRyb2wiLCAicHVibGljLCBtYXgtYWdlPTM2MDAiKTsKCiAgcmV0dXJuIHN0cmVhbShjLCBhc3luYyAoc3RyZWFtKSA9PiB7CiAgICBhd2FpdCBzdHJlYW0ucGlwZShzM2ZpbGUuc3RyZWFtKCkpOwogIH0pOwp9KTsKCkJ1bi5zZXJ2ZSh7CiAgcG9ydDogQnVuLmVudi5QT1JUID8/IDMwMDAsCiAgZmV0Y2g6IGFwcC5mZXRjaCwKfSk7Cg==`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Volume:** `/var/www/bookstack/storage/uploads/files`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/bookstack)
