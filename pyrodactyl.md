# Deploy Pyrodactyl on Railway

The faster, smaller, safer, and more accessible game server panel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pyrodactyl)

## About

Pyrodactyl is a modernized, open-source fork of the Pterodactyl game server management panel, with numerous performance and user interface enhancements. Pyrodactyl is designed to be user-friendly, making it easier for administrators and users to deploy and manage game servers efficiently.

Hosting Pyrodactyl requires you to deploy the panel itself, alongside a databsae and another cache database such as MariaDB/MySQL and Redis. Pyrodactyl also requires a web server such as Nginx or Apache to serve the panel to users, as it utilizes PHP. For a full deployment, you also need to deploy Pterodactyl Wings, which is the daemon that runs on the game server nodes to manage the game servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `railwayapp/redis:8.2` | Database |
| MariaDB | `mariadb:12` | Database |
| Pyrodactyl | `ghcr.io/pyrohost/pyrodactyl:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `MARIADB_PORT` | MariaDB | 3306 | - |
| `MARIADB_USER` | MariaDB | (secret) | - |
| `MARIADB_DATABASE` | MariaDB | railway | - |
| `MARIADB_PASSWORD` | MariaDB | (secret) | - |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | - |
| `PORT` | Pyrodactyl | 80 | - |
| `APP_ENV` | Pyrodactyl | production | - |
| `MAIL_FROM` | Pyrodactyl | noreply@example.com | - |
| `MAIL_HOST` | Pyrodactyl | mail | - |
| `MAIL_PORT` | Pyrodactyl | 1025 | - |
| `ADMIN_LAST` | Pyrodactyl | User | The admin user last name. |
| `ADMIN_USER` | Pyrodactyl | (secret) | The username for the admin user (changing this after deployment will create another user). |
| `REDIS_PORT` | Pyrodactyl | 6379 | - |
| `REDIS_USER` | Pyrodactyl | (secret) | - |
| `ADMIN_EMAIL` | Pyrodactyl | railway@example.com | The email for the admin user (changing this after deployment will create another user). |
| `ADMIN_FIRST` | Pyrodactyl | Railway | The admin user first name. |
| `DB_PASSWORD` | Pyrodactyl | (secret) | - |
| `DB_USERNAME` | Pyrodactyl | (secret) | - |
| `MAIL_DRIVER` | Pyrodactyl | smtp | - |
| `APP_TIMEZONE` | Pyrodactyl | UTC | - |
| `CACHE_DRIVER` | Pyrodactyl | redis | - |
| `QUEUE_DRIVER` | Pyrodactyl | redis | - |
| `DB_CONNECTION` | Pyrodactyl | mariadb | - |
| `MAIL_PASSWORD` | Pyrodactyl | (secret) | - |
| `MAIL_USERNAME` | Pyrodactyl | (secret) | - |
| `ADMIN_PASSWORD` | Pyrodactyl | (secret) | The password for the admin user. |
| `HASHIDS_LENGTH` | Pyrodactyl | 8 | - |
| `REDIS_PASSWORD` | Pyrodactyl | (secret) | - |
| `SESSION_DRIVER` | Pyrodactyl | redis | - |
| `MAIL_ENCRYPTION` | Pyrodactyl | true | - |
| `TRUSTED_PROXIES` | Pyrodactyl | * | - |
| `APP_SERVICE_AUTHOR` | Pyrodactyl | railway@example.com | Service author email. |
| `APP_ENVIRONMENT_ONLY` | Pyrodactyl | false | - |
| `MYSQL_ATTR_SSL_VERIFY_SERVER_CERT` | Pyrodactyl | false | - |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/ash -c "mkdir -p /app/var/ && sed -i -e 's|^logfile=.*$|logfile=/dev/stdout|' -e 's|^logfile_maxbytes=.*$|logfile_maxbytes=0|' /etc/supervisord.conf && /bin/ash .github/docker/entrypoint.sh /bin/ash -c \"php artisan p:user:make --email=$ADMIN_EMAIL --username=$ADMIN_USER --name-first=$ADMIN_FIRST --name-last=$ADMIN_LAST --password=$ADMIN_PASSWORD --admin=1; supervisord -n -c /etc/supervisord.conf\""`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/pyrodactyl)
