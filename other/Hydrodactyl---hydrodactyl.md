# Deploy Hydrodactyl on Railway

The faster, smaller, safer, and more accessible game server panel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hydrodactyl)

## About

Hydrodactyl is a modernized, open-source fork of the Pterodactyl game server management panel, with numerous performance and user interface enhancements. Hydrodactyl is designed to be user-friendly, making it easier for administrators and users to deploy and manage game servers efficiently.

Hosting Hydrodactyl requires you to deploy the panel itself, alongside a database and another cache database such as MariaDB/MySQL and Redis. Hydrodactyl also requires a web server such as Nginx or Apache to serve the panel to users, as it utilizes PHP. For a full deployment, you also need to deploy Pterodactyl Wings, which is the daemon that runs on the game server nodes to manage the game servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hydrodactyl | `ghcr.io/blueprintframework/hydrodactyl:v6.2.0` | Web service |
| MariaDB | `mariadb:12` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Hydrodactyl | 80 | - |
| `APP_ENV` | Hydrodactyl | production | - |
| `MAIL_FROM` | Hydrodactyl | noreply@example.com | - |
| `MAIL_HOST` | Hydrodactyl | mail | - |
| `MAIL_PORT` | Hydrodactyl | 1025 | - |
| `REDIS_PORT` | Hydrodactyl | 6379 | - |
| `REDIS_USER` | Hydrodactyl | (secret) | - |
| `DB_PASSWORD` | Hydrodactyl | (secret) | - |
| `DB_USERNAME` | Hydrodactyl | (secret) | - |
| `MAIL_DRIVER` | Hydrodactyl | smtp | - |
| `APP_TIMEZONE` | Hydrodactyl | UTC | - |
| `CACHE_DRIVER` | Hydrodactyl | redis | - |
| `QUEUE_DRIVER` | Hydrodactyl | redis | - |
| `DB_CONNECTION` | Hydrodactyl | mariadb | - |
| `MAIL_PASSWORD` | Hydrodactyl | (secret) | - |
| `MAIL_USERNAME` | Hydrodactyl | (secret) | - |
| `HASHIDS_LENGTH` | Hydrodactyl | 8 | - |
| `REDIS_PASSWORD` | Hydrodactyl | (secret) | - |
| `SESSION_DRIVER` | Hydrodactyl | redis | - |
| `MAIL_ENCRYPTION` | Hydrodactyl | true | - |
| `TRUSTED_PROXIES` | Hydrodactyl | * | - |
| `APP_SERVICE_AUTHOR` | Hydrodactyl | railway@example.com | Service author email. |
| `APP_ENVIRONMENT_ONLY` | Hydrodactyl | false | - |
| `MYSQL_ATTR_SSL_VERIFY_SERVER_CERT` | Hydrodactyl | false | - |
| `MARIADB_PORT` | MariaDB | 3306 | - |
| `MARIADB_USER` | MariaDB | (secret) | - |
| `MARIADB_DATABASE` | MariaDB | railway | - |
| `MARIADB_PASSWORD` | MariaDB | (secret) | - |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Start command:** `/bin/ash -c "sed -i -e 's|^logfile=.*$|logfile=/dev/stdout|' -e 's|^logfile_maxbytes=.*$|logfile_maxbytes=0|' /etc/supervisord.conf && /bin/ash .github/docker/entrypoint.sh supervisord -n -c /etc/supervisord.conf"`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/hydrodactyl)
