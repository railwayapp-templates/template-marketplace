# Deploy useSend on Railway

Open Source email platform. Sendgrid, Resend alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/usesend)

## About

## Prerequisites

- A [Github](https://github.com) account
- An [AWS](https://aws.amazon.com) account

If you have any questions join [#self-host](https://discord.gg/gbsvjb9MqV) on discord.

## Step 1: Environment variables

Unsend depends on AWS ses to send emails and SNS to receive email status. Along with that it also depends on Postgres as a database and Redis for queue. Copy the `.env.selfhost.example` file to `.env` and fill in the values.

### AWS credentials
  tl;dr: Login to your AWS console and create a new user with programmatic access. Attach the `AmazonSNSFullAccess` and `AmazonSESFullAccess` policies to the user. Then create a new access key for the user.

Add the following environment variables.

    ```env
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    ```

  Follow this for detailed steps: [Create AWS
  credentials](https://docs.usesend.com/get-started/create-aws-credentials)

### Github app credentials for login
  Usend uses github authentication for login.

Use this link to [create an github app](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps)

Callback URL : `https:////auth/callback/github`


Add the following environment variables.

```env
GITHUB_ID=""
GITHUB_SECRET=""
```

### Next auth url and secret
  Url is the app url you're going to use/

Add the following environment variables.

```env
  NEXTAUTH_SECRET=""
```


## Step 3: Setting up a region

In order to send emails, you need to select an region in aws. Use a region where your users are located / where unsend is hosted. If you're confused just use `us-east-1`.

You can check available regions [here](https://docs.aws.amazon.com/general/latest/gr/ses.html)

Once you logged in to useSend, it will prompt you add ses configuration

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Storage | `minio/minio:latest` | Database |
| Server | `usesend/usesend` | Web service |
| MinIO Bucket Creator | `minio/mc:RELEASE.2025-04-16T18-13-26Z` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Redis | `railwayapp/redis:7.4` | Database |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_BUCKET` | Storage | usesend | - |
| `MINIO_ROOT_USER` | Storage | (secret) | - |
| `MINIO_PUBLIC_PORT` | Storage | 443 | - |
| `MINIO_PRIVATE_PORT` | Storage | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Storage | (secret) | - |
| `GITHUB_SECRET` | Server | (secret) | - |
| `AWS_SECRET_KEY` | Server | (secret) | - |
| `NEXTAUTH_SECRET` | Server | (secret) | - |
| `AWS_DEFAULT_REGION` | Server | us-east-1 | - |
| `S3_COMPATIBLE_SECRET_KEY` | Server | (secret) | - |
| `MINIO_ROOT_USER` | MinIO Bucket Creator | (secret) | - |
| `MINIO_SECRET_KEY` | MinIO Bucket Creator | (secret) | - |
| `MINIO_ROOT_PASSWORD` | MinIO Bucket Creator | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `PORT` | Console | 9090 | - |
| `PASSWORD` | Console | (secret) | - |
| `USERNAME` | Console | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Start command:** `/bin/sh -c  "sleep 10 &&   /usr/bin/mc alias set minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} &&   /usr/bin/mc mb --ignore-existing minio/${MINIO_BUCKET} &&   /usr/bin/mc anonymous set download minio/${MINIO_BUCKET}  &&   /usr/bin/mc admin accesskey create minio/ --access-key ${MINIO_ACCESS_KEY} --secret-key ${MINIO_SECRET_KEY} || true &&  exit 0 "`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/usesend)
