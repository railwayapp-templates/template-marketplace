# Deploy classroomio on Railway

Simple & Beautiful Alternative to Moodle LMS, EdX, Thinkific and Teachable

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/classroomio)

## About

Open source LMS designed for companies and training organizations. Create, manage, and deliver courses with AI support, customizable dashboards, and collaborative features.

This deployment include our frontend (cio-dashboard) and a dedicated long running backend (cio-api).

With this template you can run courses and collaborate with students on your own server

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cio-dashboard | [classroomio/classroomio](https://github.com/classroomio/classroomio) | Web service |
| cio-api | [classroomio/classroomio](https://github.com/classroomio/classroomio) (root: /apps/api) | Web service |
| cio-redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OPENAI_API_KEY` | cio-dashboard | (secret) | - |
| `PRIVATE_APP_HOST` | cio-dashboard | - | Specify the origin that your app will be hosted on (e.g yourlmsdomain.com) |
| `UNSPLASH_API_KEY` | cio-dashboard | (secret) | - |
| `PUBLIC_SERVER_URL` | cio-dashboard | - | This is the URL of the `cio-api` project (e.g https://api.yourlmsorigin.com) |
| `PUBLIC_IS_SELFHOSTED` | cio-dashboard | true | No need to change this. This tells the app that this is a self-hosted instance |
| `PRIVATE_APP_SUBDOMAINS` | cio-dashboard | app | If the final domain of your app is app.yourlmsorigin.com, then `app` is PRIVATE_APP_SUBDOMAINS and `yourlmsorigin.com` is PRIVATE_APP_HOST |
| `SMTP_USER` | cio-api | (secret) | - |
| `SMTP_PASSWORD` | cio-api | (secret) | - |
| `CLOUDFLARE_SECRET_ACCESS_KEY` | cio-api | (secret) | - |
| `REDISPORT` | cio-redis | 6379 | - |
| `REDISUSER` | cio-redis | default | - |
| `REDIS_URL` | cio-redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | cio-redis | (secret) | - |
| `REDIS_PASSWORD` | cio-redis | (secret) | - |
| `REDIS_PUBLIC_URL` | cio-redis | - | Connection string for connecting to redis externally |

## Configuration

- **Start command:** `pnpm dashboard:start`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `npm start`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Starters · **Languages:** Svelte, TypeScript, JavaScript, PLpgSQL, MDX, HTML, CSS, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/classroomio)
