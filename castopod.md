# Deploy Castopod on Railway

Deploy and Host Castopod with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/castopod)

## About

### The free and open-source solution to your podcasting 2.0 journey

Self-host your podcasts with ease, keep control over what you create and talk to your audience without any middleman. Your podcast and your audience belong to you and you only.

🚨 Ensure to set the mandatory `CP_EMAIL_SMTP_PASSWORD` variable or if you don't want SMTP to work, remove all SMTP envs. Otherwise it won't init.

### ‼️ Railway Blocks SMTP Ports on Non-Pro Plans
You won't be able to use Gmail SMTP straight away. You can use services like [Resend](https://resend.com/emails) which has a free tier and uses alternative unblocked ports.

**✅ This template is ready for Resend, you just need to generate an API Key**

You can also use any other email provider as long as it does not use the blocked standard SMTP ports or you are in a Pro plan. Simply change the env vars that contain Resend values with your provider's values.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| castopod-mariadb | `mariadb:11.2` | Database |
| Redis | `redis:8.2.1` | Database |
| castopod | `castopod/castopod:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_USER` | castopod-mariadb | (secret) | - |
| `MYSQL_DATABASE` | castopod-mariadb | castopod | - |
| `MYSQL_PASSWORD` | castopod-mariadb | (secret) | - |
| `MYSQL_ROOT_PASSWORD` | castopod-mariadb | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `CP_EMAIL_FROM` | castopod | no-reply@your.domain | Ensure the Resend domain is verified. Ex: "your.domain"  |
| `CP_CACHE_HANDLER` | castopod | redis | - |
| `CP_REDIS_PASSWORD` | castopod | (secret) | - |
| `CP_EMAIL_SMTP_HOST` | castopod | smtp.resend.com | Check on Resend (Settings > SMTP) |
| `CP_EMAIL_SMTP_PORT` | castopod | 2587 | Use a non standard SMTP ports. Check on Resend (Settings > SMTP) |
| `CP_DATABASE_PASSWORD` | castopod | (secret) | - |
| `CP_DATABASE_USERNAME` | castopod | (secret) | - |
| `CP_EMAIL_SMTP_CRYPTO` | castopod | tls | - |
| `CP_EMAIL_SMTP_PASSWORD` | castopod | (secret) | Resend API Key |
| `CP_EMAIL_SMTP_USERNAME` | castopod | (secret) | Check on Resend (Settings > SMTP) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/public/media`

**Category:** Other

[View on Railway →](https://railway.com/template/castopod)
