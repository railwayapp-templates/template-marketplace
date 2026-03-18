# Deploy BigCapital [Updated Mar ’26] on Railway

BigCapital [Mar ’26] (Track Finances & Manage Business Data) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bigcapital)

## About

BigCapital is a free, open-source business management and accounting software designed to streamline financial operations for startups, SMBs, and enterprises. Available on GitHub, it provides tools for managing invoicing, payments, sales, purchases, inventory, and reporting-all in one unified dashboard.

You can self-host BigCapital to keep all your business data, transactions, and configurations entirely under your control, without relying on third-party services. Hosting BigCapital on Railway ensures a seamless, secure, and scalable environment for your business operations. Railway simplifies the deployment process, allowing you to set up a fully functional accounting and ERP system within minutes-no complex server configuration required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server | `ghcr.io/bigcapitalhq/server:latest` | Web service |
| webapp | `ghcr.io/bigcapitalhq/webapp:latest` | Web service |
| mariadb | `mariadb:latest` | Database |
| MongoDB | `mongo:8.0` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | server | 3000 | - |
| `NODE_ENV` | server | production | - |
| `LOG_LEVEL` | server | info | - |
| `JWT_SECRET` | server | (secret) | - |
| `MAIL_PASSWORD` | server | (secret) | - |
| `MAIL_USERNAME` | server | (secret) | - |
| `DISABLE_SIGNUP` | server | false | - |
| `SYSTEM_DB_USER` | server | (secret) | - |
| `TENANT_DB_USER` | server | (secret) | - |
| `ALLOW_INVITE_ONLY` | server | false | - |
| `NEW_RELIC_ENABLED` | server | false | - |
| `SYSTEM_DB_CHARSET` | server | utf8mb4 | - |
| `TENANT_DB_CHARSET` | server | utf8mb4 | - |
| `SYSTEM_DB_PASSWORD` | server | (secret) | - |
| `TENANT_DB_PASSWORD` | server | (secret) | - |
| `NEW_RELIC_NO_CONFIG_FILE` | server | true | - |
| `PORT` | webapp | 3000 | - |
| `NODE_ENV` | webapp | production | - |
| `MARIADB_PORT` | mariadb | 3306 | - |
| `MARIADB_USER` | mariadb | (secret) | - |
| `MARIADB_DATABASE` | mariadb | railway | - |
| `MARIADB_PASSWORD` | mariadb | (secret) | - |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | - |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/bigcapital)
