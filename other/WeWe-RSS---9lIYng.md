# Deploy WeWe RSS on Railway

🤗 更优雅的微信公众号订阅方式，支持私有化部署、微信公众号RSS生成

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9lIYng)

## About

**WeWe RSS** 是一个优雅且稳定的微信公众号订阅服务。  
它通过微信读书接口抓取公众号文章，并自动生成 `.rss`、`.atom`、`.json` 等格式的订阅源，让你在任意 RSS 阅读器中阅读公众号内容，无需再打开微信。

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `cooderl/wewe-rss:latest` | Web service |
| Database | `mysql:8.3.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AUTH_CODE` | App | - | 登录后台授权码 |
| `FEED_MODE` | App | fulltext | 提取全文内容模式 |
| `CRON_EXPRESSION` | App | 35 5,17 * * * | 定时更新订阅源Cron表达式 |
| `MAX_REQUEST_PER_MINUTE` | App | 60 | 服务接口请求限制，每分钟请求次数 |
| `MYSQLHOST` | Database | - | Railway Private Domain Name. |
| `MYSQLPORT` | Database | 3306 | MySQL port. |
| `MYSQLUSER` | Database | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | Database | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | Database | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | Database | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | Database | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | Database | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | Database | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/9lIYng)
