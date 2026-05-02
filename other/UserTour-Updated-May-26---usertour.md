# Deploy UserTour [Updated May '26] on Railway

UserTour [May '26] (User Onboarding & Product Tour Builder) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/usertour)

## About

Usertour is an open-source user onboarding platform that helps teams guide users through their product with interactive tours, walkthroughs, and onboarding flows. It is designed to improve product adoption, reduce user confusion, and help users reach value faster—without relying on expensive proprietary SaaS tools.

Self hosting Usertour means your onboarding data, user behavior flows, and product logic stay entirely on infrastructure you control. You are not dependent on third-party onboarding SaaS tools that charge per user or track your customers externally.

Traditionally, self hosting an onboarding platform requires:

*   Setting up backend services  
*   Managing databases and environment variables  
*   Handling deployments and restarts  
*   Securing access and updates  

Railway runs Usertour inside managed containers, provisions networking automatically, injects environment variables securely, and handles restarts and scaling. You deploy once and start building onboarding flows immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| usertour | [Shinyduo/usertour-railway](https://github.com/Shinyduo/usertour-railway) | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `NODE_ENV` | usertour | production |
| `JWT_SECRET` | usertour | (secret) |
| `Redis_PORT` | usertour | 6379 |
| `JWT_EXPIRATION_TIME` | usertour | 1h |
| `JWT_REFRESH_EXPIRATION_TIME` | usertour | 7d |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/usertour)
