# Deploy Wordpress High Config on Railway

Deploy and Host Wordpress High Config with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-high-confi)

## About

**WordPress High Config** is a custom-optimized version of WordPress tailored for performance, scalability, and developer control. It includes Apache `mpm_worker`, Redis object cache support, and optimized PHP settings, packaged in a Dockerized environment with MySQL and optional Redis acceleration.

Hosting WordPress High Config on Railway allows developers to instantly launch a powerful and scalable WordPress stack without managing low-level infrastructure. The setup is tuned for high concurrency, fast PHP execution, persistent volumes for uploads, and database-accelerated responses. With Redis enabled, page and object caching can greatly improve performance. This makes it ideal for WooCommerce, content-heavy blogs, or multi-user publishing environments. Railway simplifies deployment through auto-scaling, built-in networking, and streamlined developer tools.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| Redis | `bitnami/redis:7.2.5` | Database |
| phantasmdigitalworks/wordpress-highperf:latest | `phantasmdigitalworks/wordpress-highperf:latest` | Worker |

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
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `REDIS_URL` | phantasmdigitalworks/wordpress-highperf:latest | redis://default:${REDIS_PASSWORD}@${REDISHOST}:${REDISPORT} | For volume permissions |
| `REDIS_HOST` | phantasmdigitalworks/wordpress-highperf:latest | ${REDISHOST} | - |
| `REDIS_PORT` | phantasmdigitalworks/wordpress-highperf:latest | ${REDISPORT} | - |
| `REDIS_PASSWORD` | phantasmdigitalworks/wordpress-highperf:latest | (secret) | - |
| `WORDPRESS_DEBUG` | phantasmdigitalworks/wordpress-highperf:latest | true | Redis from Railway |
| `WORDPRESS_DB_HOST` | phantasmdigitalworks/wordpress-highperf:latest | ${MYSQLHOST}:${MYSQLPORT} | - |
| `WORDPRESS_DB_NAME` | phantasmdigitalworks/wordpress-highperf:latest | ${MYSQLDATABASE} | - |
| `WORDPRESS_DB_USER` | phantasmdigitalworks/wordpress-highperf:latest | (secret) | - |
| `WORDPRESS_DB_PASSWORD` | phantasmdigitalworks/wordpress-highperf:latest | (secret) | - |
| `WORDPRESS_TABLE_PREFIX` | phantasmdigitalworks/wordpress-highperf:latest | wp_ | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wordpress-high-confi)
