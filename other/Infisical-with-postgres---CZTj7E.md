# Deploy Infisical (with postgres) on Railway

Platform to securely manage application configuration and secrets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/CZTj7E)

## About

## Setup
This guide explains how to set up self-hosted [Infisical](https://infisical.com/) using Docker this setup is based on the new Infisical Backend that uses Postgres. Infisical recommends using Kubernetes for high availability and large teams instead of Docker.

The default configuration are good to get you started. If you want to customize some of the functionality, you can do it now or later on.

## Email services
To enable multi-factor authentication and other features it is required to add your own email service. Infisical has [great documentation](https://infisical.com/docs/self-hosting/configuration/envars#email-service) on how to set up an email service if you don’t have one, I would recommend resend.com and it is really simple to set up and free for low usage.
In your Railway project, in the “Infisical” service, add the following environment variables (if you already deployed the service make sure to redeploy for the changes to take effect):

```
SMTP_HOST=
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_PORT=
SMTP_SECURE=
SMTP_FROM_ADDRESS=
SMTP_FROM_NAME=
```
Note: I faced issues using port `587` from resend, and recommend using port `2465` instead.

###SSO
Follow Infisicals documentation [here](https://infisical.com/docs/self-hosting/configuration/envars#sso-based-login).

###External services
This is why you have chosen Infisical, right? Infisical has a [full list](https://infisical.com/docs/self-hosting/configuration/envars#native-secret-integrations) of the services that are supported and the environment variables that are required to be set. There is also [great documentation](https://infisical.com/docs/integrations/cloud/aws-parameter-store) on how to get the variables from the services you use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Infisical | `infisical/infisical:latest-postgres` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `SITE_URL` | Infisical | - | Must be an absolute URL including the protocol (e.g. https://app.infisical.com) |
| `SMTP_HOST` | Infisical | - | Hostname to connect to for establishing SMTP connections |
| `SMTP_PORT` | Infisical | - | Port to connect to for establishing SMTP connections |
| `AUTH_SECRET` | Infisical | (secret) | - |
| `SMTP_SECURE` | Infisical | - | If true, use TLS when connecting to host. If false, TLS will be used if STARTTLS is supported |
| `SMTP_PASSWORD` | Infisical | (secret) | Password to connect to email host |
| `SMTP_USERNAME` | Infisical | (secret) | User/email to connect to email host |
| `SMTP_FROM_NAME` | Infisical | - | Name label to be used in From field |
| `SMTP_FROM_ADDRESS` | Infisical | - | Email address to be used for sending emails |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/CZTj7E)
