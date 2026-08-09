# Deploy Pterodactyl Panel on Railway

Game server management UI for Minecraft, Rust, ARK and Source engine titles

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pterodactyl-game-server)

## About

Pterodactyl Panel is the open-source control plane behind a large share of the world's game server hosting. It gives administrators a web UI for creating servers, allocating CPU, RAM and disk, streaming live consoles, browsing files over SFTP, scheduling restarts and backups, and granting customers scoped sub-user access — across Minecraft, Rust, ARK, Source engine titles, FiveM, voice servers and anything else described by a community "egg".

Running it here uses three services: the panel on the official `ghcr.io/pterodactyl/panel:v1.15.0` image serving port 80 behind Railway's TLS edge, MySQL as the system of record, and Redis for sessions, cache and the job queue. Only the panel is exposed publicly. **This template deploys the panel — the control plane — only.** Wings, the daemon that actually launches game containers, cannot run on Railway; your nodes must live elsewhere.

![Pterodactyl Panel Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786206067/dda9d04e-00dd-4191-aa0a-fd91b9ca1272.png)

Pterodactyl runs many game servers for many people without giving any of them shell access. Every server is an isolated Docker container with hard CPU, memory and disk limits, its own SFTP account, and sub-user permissions an owner hands out narrowly. Teams self-host it to keep customer data on their own infrastructure, avoid per-server fees, and script provisioning through the REST API.

Key features:

- Per-server isolation in Docker containers with enforced resource limits
- Live console, power controls and real-time CPU, memory, disk and network graphs
- Eggs: reusable service definitions covering hundreds of games and applications
- File manager, SFTP, scheduled tasks, database provisioning and backups
- Sub-user permissions, two-factor authentication and full audit logging
- Application and Client REST APIs for automation and billing integrations

The panel container runs four processes under supervisord — nginx on port 80, PHP-FPM, a queue worker, and cron running Laravel's scheduler — so no separate worker service is needed. Keep replicas at **1**: that scheduler has no leader election, so a second replica duplicates every scheduled task. A volume at `/app/var` persists the generated `.env` holding `APP_KEY` and `HASHIDS_SALT`, written on first boot and read from that file afterwards — changing them later has no effect and would orphan encrypted data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| panel | `ghcr.io/pterodactyl/panel:v1.15.0` | Web service |
| Redis | `redis:8.2.1` | Database |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | panel | 80 | Port Railway probes and routes |
| `APP_ENV` | panel | production | Laravel environment mode |
| `APP_KEY` | panel | - | Laravel encryption key, fixed after first boot |
| `APP_URL` | panel | - | Public panel URL |
| `DB_HOST` | panel | - | MySQL private hostname |
| `DB_PORT` | panel | 3306 | MySQL port |
| `APP_DEBUG` | panel | false | Hide stack traces in production |
| `ADMIN_LAST` | panel | Admin | First admin surname |
| `REDIS_HOST` | panel | - | Redis private hostname |
| `REDIS_PORT` | panel | 6379 | Redis port |
| `ADMIN_EMAIL` | panel | admin@example.com | First admin email address |
| `ADMIN_FIRST` | panel | Panel | First admin given name |
| `CACHE_STORE` | panel | redis | Cache driver, Laravel 11+ name |
| `DB_DATABASE` | panel | - | Panel database name |
| `DB_PASSWORD` | panel | (secret) | Scoped database user password |
| `DB_USERNAME` | panel | (secret) | Scoped, non-root database user |
| `MAIL_MAILER` | panel | log | Change to smtp before real users |
| `APP_TIMEZONE` | panel | UTC | Panel-wide timezone |
| `CACHE_DRIVER` | panel | redis | Cache driver, legacy name |
| `HASHIDS_SALT` | panel | - | Salt for public server identifiers |
| `QUEUE_DRIVER` | panel | redis | Queue driver, legacy name |
| `ADMIN_PASSWORD` | panel | (secret) | First admin password |
| `ADMIN_USERNAME` | panel | (secret) | First admin username |
| `HASHIDS_LENGTH` | panel | 8 | Length of generated hashids |
| `MAIL_FROM_NAME` | panel | Pterodactyl Panel | Outgoing sender display name |
| `REDIS_PASSWORD` | panel | (secret) | Redis auth password |
| `SESSION_DRIVER` | panel | redis | Store sessions in Redis |
| `TRUSTED_PROXIES` | panel | 100.64.0.0/10,fd00::/8 | Railway edge proxy ranges |
| `QUEUE_CONNECTION` | panel | redis | Queue driver, Laravel 11+ name |
| `MAIL_FROM_ADDRESS` | panel | noreply@example.com | Outgoing sender address |
| `APP_SERVICE_AUTHOR` | panel | admin@example.com | Author stamped on seeded eggs |
| `APP_ENVIRONMENT_ONLY` | panel | false | Also read settings from database |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |
| `MYSQLHOST` | MySQL | - | Private hostname, never publicly exposed |
| `MYSQLPORT` | MySQL | 3306 | MySQL port on the private network |
| `MYSQLUSER` | MySQL | root | Superuser; give the app a scoped user instead |
| `MYSQL_URL` | MySQL | - | Private-network connection string |
| `MYSQLDATABASE` | MySQL | - | Alias consumers reference as ${{MySQL.MYSQLDATABASE}} |
| `MYSQLPASSWORD` | MySQL | (secret) | Alias of the root password |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first init |
| `MYSQL_PUBLIC_URL` | MySQL | - | External connection string; empty host/port until a TCP proxy exists |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, generated once at init — read only when the data dir is created |

## Configuration

- **Healthcheck:** `/auth/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/var`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pterodactyl-game-server)
