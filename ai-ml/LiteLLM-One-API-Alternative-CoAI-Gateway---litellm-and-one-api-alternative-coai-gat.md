# Deploy LiteLLM & One API Alternative — CoAI Gateway on Railway

Self-hosted AI & LLM gateway with UI,analytics,billing and API Managment.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-and-one-api-alternative-coai-gat)

## About

CoAI is an enterprise-grade, commercial-ready AI Gateway and SaaS Platform that provides a unified API interface and a premium UI dashboard for managing 200+ models across 35+ top AI providers. Serving as a robust open-source alternative to LiteLLM, Portkey, and One API, it features advanced multi-tenant routing, token management, intelligent load balancing, and integrated commercial subscription billing out of the box.

Click Deploy to deploy, and enter the domain name you wish to bind, wait for the deployment to complete.

After the deployment completes, visit your domain name and log in to the app using admin credencials:

👤 Username: root

🔒 Password: chatnio123456

⚠️ Security Notice: Please follow the prompts to change this default password in the chatnio backend immediately after your first login.

Deploying CoAI requires orchestrating a multi-tier architecture consisting of a high-performance Golang (Gin framework) backend API proxy, a responsive React-based web frontend interface, and stateful backing infrastructure. When managing this architecture, hosting involves configuring a production-grade relational database like MySQL for storing persistent data (such as user accounts, subscription records, token configurations, and system logs) alongside a Redis instance to handle intensive caching, model rate-limiting, and low-latency session tracking. By utilizing an automated platform builder, the system builds the full-stack container environment dynamically, automatically binding your upstream environment properties and ensuring secure, persistent database management for consistent uptime and performance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| coai | [bilalnawaz072/coai](https://github.com/bilalnawaz072/coai) | TCP service |
| Redis | `redis:8.2.1` | Database |

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
| `PORT` | coai | 8094 | - |
| `SECRET` | coai | (secret) | - |
| `MYSQL_USER` | coai | (secret) | - |
| `SERVE_STATIC` | coai | true | - |
| `MYSQL_PASSWORD` | coai | (secret) | - |
| `REDIS_PASSWORD` | coai | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **TCP Proxies:** 8094
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Go, Less, JavaScript, PHP, HTML, Dockerfile, Rust

[View on Railway →](https://railway.com/deploy/litellm-and-one-api-alternative-coai-gat)
