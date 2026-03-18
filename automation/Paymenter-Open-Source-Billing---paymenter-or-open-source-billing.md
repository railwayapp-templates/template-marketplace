# Deploy Paymenter | Open-Source Billing on Railway

Open-Source Billing, Built for Hosting

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paymenter-or-open-source-billing)

## About

Paymenter is a modern, open-source billing and client management solution designed for digital service providers. It streamlines business operations by combining automated invoicing, a comprehensive ticketing system, and a customizable client portal into a single interface. Perfect for hosting companies, it bridges the gap between payment processing and service delivery.

Hosting Paymenter requires a reliable PHP environment coupled with a persistent database layer. By deploying this template on Railway, the traditional complexities of Laravel hosting—such as configuring PHP-FPM, setting up background queue workers, and managing SSL certificates—are handled automatically. This specific implementation includes a custom orchestration layer that manages the initial database seeding, application key generation, and environment synchronization during the first boot. Leveraging Railway’s persistent volumes ensures that your sensitive client data, logs, and application state remain intact across deployments and restarts, providing a production-ready environment in minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.6.0` | Database |
| Redis | `redis:8.6.1` | Database |
| Paymenter | [mateodemuynck/paymenter-railway](https://github.com/mateodemuynck/paymenter-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLPORT` | MySQL | 3306 | - |
| `MYSQLUSER` | MySQL | root | - |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | railway | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `APP_ENV` | Paymenter | production | - |
| `ADMIN_EMAIL` | Paymenter | - | The initial admin account e-mail address. Used to login. |
| `CACHE_STORE` | Paymenter | redis | - |
| `DB_PASSWORD` | Paymenter | (secret) | - |
| `DB_USERNAME` | Paymenter | (secret) | - |
| `COMPANY_NAME` | Paymenter | - | The name of your company. |
| `DB_CONNECTION` | Paymenter | mysql | - |
| `ADMIN_PASSWORD` | Paymenter | (secret) | The initial admin account password. Used to login. |
| `REDIS_PASSWORD` | Paymenter | (secret) | - |
| `REDIS_USERNAME` | Paymenter | (secret) | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage/app/public`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/paymenter-or-open-source-billing)
