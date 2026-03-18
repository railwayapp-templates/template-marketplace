# Deploy Plunk on Railway

The Open-Source Email Platform for AWS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/T2xefJ)

## About

## Setting up AWS
Plunk is built on top of AWS SES and requires configuration on AWS.

The exact steps can be found in the [Plunk Documentation](https://next-wiki.useplunk.com/self-hosting/email-setup).

## Deploying Template
With your AWS setup and keys in hand, you are ready to deploy the template.

### Attaching a domain
- Attach 4 domains to port `80` of the `useplunk/plunk` container and configure them in the environment variables for each service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| plunk | `ghcr.io/useplunk/plunk:latest` | Database |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SERVICE` | plunk | all | - |
| `NODE_ENV` | plunk | production | - |
| `USE_HTTPS` | plunk | true | - |
| `JWT_SECRET` | plunk | (secret) | - |
| `NGINX_PORT` | plunk | 80 | - |
| `AUTO_PROJECT_DISABLE` | plunk | false | - |
| `AWS_SES_SECRET_ACCESS_KEY` | plunk | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Volume:** `/app/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/T2xefJ)
