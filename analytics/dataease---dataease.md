# Deploy dataease on Railway

Open-source BI on Railway with DataEase + MySQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dataease)

## About

Run DataEase with an image-based Railway setup using the upstream DataEase container plus MySQL, with one public web endpoint and private service networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mysql | `mysql:8.4.5` | Database |
| dataease-app | `xiaosong233/dataease-railway:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_USER` | mysql | (secret) |
| `MYSQL_DATABASE` | mysql | dataease |
| `MYSQL_PASSWORD` | mysql | (secret) |
| `MYSQL_ROOT_HOST` | mysql | % |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) |
| `PORT` | dataease-app | 8100 |
| `DE_SERVERS` | dataease-app | dataease-app |
| `DE_MYSQL_DB` | dataease-app | dataease |
| `SERVER_PORT` | dataease-app | 8100 |
| `DE_MYSQL_PORT` | dataease-app | 3306 |
| `DE_MYSQL_USER` | dataease-app | (secret) |
| `ADMIN_PASSWORD` | dataease-app | (secret) |
| `ADMIN_USERNAME` | dataease-app | (secret) |
| `DE_ORIGIN_LIST` | dataease-app | http://localhost:8000 |
| `DE_MYSQL_PARAMS` | dataease-app | autoReconnect=false&useUnicode=true&characterEncoding=UTF-8&characterSetResults=UTF-8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true |
| `DE_LOGIN_TIMEOUT` | dataease-app | (secret) |
| `DE_MYSQL_PASSWORD` | dataease-app | (secret) |
| `DE_PLAYWRIGHT_SERVER` | dataease-app | http://de-playwright-api:3000/screenshot |
| `DE_EXPORT_VIEWS_LIMIT` | dataease-app | 100000 |
| `DE_EXPORT_DATASET_LIMIT` | dataease-app | 100000 |

## Configuration

- **Start command:** `sh -c 'cat > /opt/apps/config/application.yml <<EOF
server:
  tomcat:
    connection-timeout: 70000
  servlet:
    context-path: ${DE_CONTEXT_PATH}
dataease:
  export:
    views:
      limit: ${DE_EXPORT_VIEWS_LIMIT}
    dataset:
      limit: ${DE_EXPORT_DATASET_LIMIT}
  origin-list: ${DE_ORIGIN_LIST}
  login_timeout: ${DE_LOGIN_TIMEOUT}
  dataease-servers: ${DE_SERVERS}
  playwright-server: ${DE_PLAYWRIGHT_SERVER}
task:
  executor:
    address: http://sync-task-actuator:9001
    log:
      path: /opt/dataease2.0/logs/sync-task/task-handler-log
EOF
cat > /opt/apps/config/application-standalone.yml <<EOF
spring:
  datasource:
    url: jdbc:mysql://${DE_MYSQL_HOST}:${DE_MYSQL_PORT}/${DE_MYSQL_DB}?${DE_MYSQL_PARAMS}
    username: ${DE_MYSQL_USER}
    password: ${DE_MYSQL_PASSWORD}
  messages:
    basename: i18n/lic,i18n/core,i18n/permissions,i18n/xpack,i18n/sync
  flyway:
    enabled: true
    table: de_standalone_version
    validate-on-migrate: false
    locations: classpath:db/migration
    baseline-on-migrate: true
    out-of-order: true
mybatis-plus:
  mapper-locations: classpath:mybatis/*.xml
EOF
exec /deployments/run-java.sh'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/dataease)
