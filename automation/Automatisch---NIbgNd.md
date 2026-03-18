# Deploy Automatisch on Railway

Open Source Zapier, N8N, Make Alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/NIbgNd)

## About

# Automatisch - Open Source Zapier Alternative

🧐 Automatisch is a business automation tool that lets you connect different services like Twitter, Slack, and more to automate your business processes.

💸 Automating your workflows doesn't have to be a difficult or expensive process. You also don't need any programming knowledge to use Automatisch.

## Post-deployment instructions

Use `user@automatisch.io` email address and `sample` password to login to Automatisch. Please do not forget to change your email and password from the settings page.

## Advantages

There are other existing solutions in the market, like Zapier and Integromat, so you might be wondering why you should use Automatisch.

✅ One of the main benefits of using Automatisch is that it allows you to store your data on your own servers, which is essential for businesses that handle sensitive user information and cannot risk sharing it with external cloud services. This is especially relevant for industries such as healthcare and finance, as well as for European companies that must adhere to the General Data Protection Regulation (GDPR).

🤓 Your contributions are vital to the development of Automatisch. As an open-source software, anyone can have an impact on how it is being developed.

💙 No vendor lock-in. If you ever decide that Automatisch is no longer helpful for your business, you can switch to any other provider, which will be easier than switching from the one cloud provider to another since you have all data and flexibility.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| automatisch worker | `automatischio/automatisch:latest` | Database |
| automatisch main | `automatischio/automatisch:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Valkey | `valkey/valkey:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `WORKER` | automatisch worker | true | - |
| `APP_ENV` | automatisch worker | production | - |
| `APP_SECRET_KEY` | automatisch worker | (secret) | - |
| `POSTGRES_PASSWORD` | automatisch worker | (secret) | - |
| `POSTGRES_USERNAME` | automatisch worker | (secret) | - |
| `WEBHOOK_SECRET_KEY` | automatisch worker | (secret) | - |
| `PORT` | automatisch main | 443 | - |
| `APP_ENV` | automatisch main | production | - |
| `PROTOCOL` | automatisch main | https | - |
| `APP_SECRET_KEY` | automatisch main | (secret) | - |
| `POSTGRES_PASSWORD` | automatisch main | (secret) | - |
| `POSTGRES_USERNAME` | automatisch main | (secret) | - |
| `WEBHOOK_SECRET_KEY` | automatisch main | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Valkey | - | Railway Private Domain Name. |
| `REDISPORT` | Valkey | 6379 | Port to connect to Redis. |
| `REDISUSER` | Valkey | default | Default user to connect to Redis. |
| `REDIS_URL` | Valkey | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Valkey | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Valkey | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Valkey | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Valkey | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Valkey | no | Disable writing to AOF file. |

## Configuration

- **Volume:** `/automatisch/storage`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Automation

[View on Railway →](https://railway.com/template/NIbgNd)
