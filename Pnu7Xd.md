# Deploy appflowy-cloud on Railway

Appflowy cloud services for self-hosting. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Pnu7Xd)

## About

This template contains all the services needed to deploy an instance of the appflowy cloud. 

Once deployed, you can use the URL of the caddy instance as the URL for your appflowy cloud api in the desktop application. 

Reach out to `zahin.dev@gmail.com` for assistance, or the  official appflowy discord!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `bitnami/redis:7.2.5` | Database |
| postgres | [zahin-mohammad/appflowy-postgres](https://github.com/zahin-mohammad/appflowy-postgres) | Database |
| gotrue | `appflowyinc/gotrue` | Worker |
| appflowy_caddy | [zahin-mohammad/appflowy-caddy](https://github.com/zahin-mohammad/appflowy-caddy) | Web service |
| minio_console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Worker |
| appflowy_cloud | [zahin-mohammad/AppFlowy-Cloud](https://github.com/zahin-mohammad/AppFlowy-Cloud) | Worker |
| appflowy_admin_frontend | [zahin-mohammad/AppFlowy-Cloud](https://github.com/zahin-mohammad/AppFlowy-Cloud) | Worker |
| appflowy_ai | `appflowyinc/appflowy_ai:latest` | Worker |
| minio | `minio/minio:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | redis | - | Railway Private Domain Name. |
| `REDISPORT` | redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | redis | default | Default user to connect to Redis. |
| `REDIS_URL` | redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | redis | no | Disable writing to AOF file. |
| `POSTGRES_DB` | postgres | railway | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |
| `PORT` | gotrue | 9999 | - |
| `GOTRUE_JWT_EXP` | gotrue | 7200 | - |
| `URI_ALLOW_LIST` | gotrue | * | - |
| `GOTRUE_SITE_URL` | gotrue | appflowy-flutter:// | - |
| `GOTRUE_DB_DRIVER` | gotrue | postgres | - |
| `GOTRUE_SMTP_HOST` | gotrue | - | The SMTP server. Ex. smtp.gmail.com |
| `GOTRUE_SMTP_PASS` | gotrue | - | The SMTP users password. Ex. password123 |
| `GOTRUE_SMTP_PORT` | gotrue | - | The SMTP server port. Ex. 465 for gmail. |
| `GOTRUE_SMTP_USER` | gotrue | (secret) | The SMTP user email. Ex. app@my-domain.com |
| `GOTRUE_JWT_SECRET` | gotrue | (secret) | - |
| `GOTRUE_SMTP_ADMIN_EMAIL` | gotrue | - | The admin for this deployment. Ex. admin@my-domain.com |
| `GOTRUE_MAILER_AUTOCONFIRM` | gotrue | false | - |
| `GOTRUE_SMTP_MAX_FREQUENCY` | gotrue | 5s | - |
| `GOTRUE_RATE_LIMIT_EMAIL_SENT` | gotrue | 10 | - |
| `GOTRUE_MAILER_URLPATHS_INVITE` | gotrue | /gotrue/verify | - |
| `GOTRUE_MAILER_URLPATHS_RECOVERY` | gotrue | /gotrue/verify | - |
| `GOTRUE_MAILER_URLPATHS_CONFIRMATION` | gotrue | /gotrue/verify | - |
| `GOTRUE_MAILER_URLPATHS_EMAIL_CHANGE` | gotrue | /gotrue/verify | - |
| `PORT` | appflowy_caddy | 80 | - |
| `ENABLEALPINEPRIVATE_NETWORKING` | appflowy_caddy | true | - |
| `PORT` | minio_console | 9001 | - |
| `PASSWORD` | minio_console | (secret) | - |
| `USERNAME` | minio_console | (secret) | - |
| `PORT` | appflowy_cloud | 8000 | - |
| `RUST_LOG` | appflowy_cloud | debug | - |
| `APPFLOWY_S3_BUCKET` | appflowy_cloud | appflowy | - |
| `APPFLOWY_S3_REGION` | appflowy_cloud | us-east-1 | - |
| `APPFLOWY_ENVIRONMENT` | appflowy_cloud | production | - |
| `APPFLOWY_S3_USE_MINIO` | appflowy_cloud | true | - |
| `GOTRUE_ADMIN_PASSWORD` | appflowy_cloud | (secret) | - |
| `APPFLOWY_S3_SECRET_KEY` | appflowy_cloud | (secret) | - |
| `APPFLOWY_ACCESS_CONTROL` | appflowy_cloud | true | - |
| `APPFLOWY_APPLICATION_HOST` | appflowy_cloud | :: | - |
| `APPFLOWY_APPLICATION_PORT` | appflowy_cloud | 8000 | - |
| `APPFLOWY_S3_CREATE_BUCKET` | appflowy_cloud | true | - |
| `APPFLOWY_GOTRUE_JWT_SECRET` | appflowy_cloud | (secret) | - |
| `APPFLOWY_GOTRUE_ADMIN_EMAIL` | appflowy_cloud | - | The admin user |
| `APPFLOWY_MAILER_SMTP_PASSWORD` | appflowy_cloud | (secret) | - |
| `APPFLOWY_MAILER_SMTP_USERNAME` | appflowy_cloud | (secret) | - |
| `APPFLOWY_WEBSOCKET_MAILBOX_SIZE` | appflowy_cloud | 6000 | - |
| `APPFLOWY_DATABASE_MAX_CONNECTIONS` | appflowy_cloud | 40 | - |
| `PORT` | appflowy_admin_frontend | 3000 | - |
| `ADMIN_FRONTEND_HOST` | appflowy_admin_frontend | :: | - |
| `ADMIN_FRONTEND_PORT` | appflowy_admin_frontend | 3000 | - |
| `PORT` | appflowy_ai | 5001 | - |
| `OPENAI_API_KEY` | appflowy_ai | (secret) | Your Open AI api key |
| `APPFLOWY_AI_REDIS_URL` | appflowy_ai | - | Redis URL |
| `APPFLOWY_AI_SERVER_PORT` | appflowy_ai | 5001 | - |
| `APPFLOWY_AI_DATABASE_URL` | appflowy_ai | - | Database URL |
| `APPFLOWY_LOCAL_AI_TEST_ENABLED` | appflowy_ai | false | - |
| `MINIO_ROOT_USER` | minio | (secret) | - |
| `MINIO_PUBLIC_PORT` | minio | 443 | - |
| `MINIO_PRIVATE_PORT` | minio | 9000 | - |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | - |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, PLpgSQL, Dockerfile, Rust, HTML, CSS, JavaScript, Makefile, RenderScript

[View on Railway →](https://railway.com/template/Pnu7Xd)
