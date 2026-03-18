# Deploy UserTour on Railway

Is an open-source tool for building product tours and onboarding flows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/CQWupg)

## About

Usertour is an open-source platform designed to help developers and product teams create interactive product tours, onboarding checklists, and in-app guides with minimal effort. It enables you to improve user engagement and retention by delivering contextual guidance inside your application. Built with a modern stack and easily extensible, Usertour supports both self-hosted and cloud-based deployments.

👉 Learn more in the official documentation: [https://docs.usertour.io](https://docs.usertour.io)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| UserTour | `usertour/usertour:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | UserTour | 80 | Port on which the frontend is served inside the container |
| `API_URL` | UserTour | - | GraphQL API endpoint URL |
| `NODE_ENV` | UserTour | production | Specifies the runtime environment for the application (e.g., development, production) |
| `EMAIL_HOST` | UserTour | smtp.mailprovider.com | SMTP email server host for sending transactional emails |
| `EMAIL_PASS` | UserTour | securepassword | Password for the SMTP email account |
| `EMAIL_PORT` | UserTour | 587 | SMTP server port |
| `EMAIL_USER` | UserTour | (secret) | Username for the SMTP email account |
| `JWT_SECRET` | UserTour | (secret) | Secret key used to sign JWT tokens |
| `Redis_HOST` | UserTour | - | Hostname of the Redis instance provided by Railway |
| `Redis_PASS` | UserTour | - | Password for the Redis instance (if configured) |
| `Redis_PORT` | UserTour | - | Port of the Redis instance |
| `POSTHOG_KEY` | UserTour | _REPLACE_VALUE_ | PostHog project API key for analytics |
| `DATABASE_URL` | UserTour | - | PostgreSQL database connection URL provided by Railway |
| `EMAIL_SENDER` | UserTour | _REPLACE_VALUE_ | Default sender name and address for system emails |
| `POSTHOG_HOST` | UserTour | _REPLACE_VALUE_ | PostHog server URL |
| `AWS_S3_BUCKET` | UserTour | _REPLACE_VALUE_ | Name of the AWS S3 bucket used for file storage |
| `AWS_S3_DOMAIN` | UserTour | - | Public URL domain used to access files stored in S3 |
| `AWS_S3_REGION` | UserTour | us-east-1 | AWS region where your S3 bucket is located |
| `USERTOUR_TOKEN` | UserTour | (secret) | Token used to identify the current Usertour environment |
| `AWS_S3_ENDPOINT` | UserTour | https://s3.us-east-1.amazonaws.com | Endpoint URL for AWS S3 service |
| `APP_HOMEPAGE_URL` | UserTour | - | Public URL of the deployed application |
| `GITHUB_CLIENT_ID` | UserTour | _REPLACE_VALUE_ | GitHub OAuth client ID |
| `GOOGLE_CLIENT_ID` | UserTour | _REPLACE_VALUE_ | Google OAuth client ID |
| `NEST_SERVER_PORT` | UserTour | 3000 | Port on which the NestJS backend server will run inside the container |
| `EMAIL_AUTH_ENABLED` | UserTour | true | Enable or disable email-based authentication |
| `LOGIN_REDIRECT_URL` | UserTour | (secret) | URL to redirect users to after successful login |
| `GITHUB_AUTH_ENABLED` | UserTour | false | Enable or disable GitHub OAuth login |
| `GITHUB_CALLBACK_URL` | UserTour | - | GitHub OAuth callback URL after successful login |
| `GOOGLE_AUTH_ENABLED` | UserTour | false | Enable or disable Google OAuth login |
| `GOOGLE_CALLBACK_URL` | UserTour | - | Google OAuth callback URL after successful login |
| `JWT_EXPIRATION_TIME` | UserTour | 1h | Access token expiration duration |
| `AWS_S3_ACCESS_KEY_ID` | UserTour | _REPLACE_VALUE_ | AWS access key ID used to authenticate with S3 |
| `GITHUB_CLIENT_SECRET` | UserTour | (secret) | GitHub OAuth client secret |
| `GOOGLE_CLIENT_SECRET` | UserTour | (secret) | Google OAuth client secret |
| `USERTOUR_COOKIE_DOMAIN` | UserTour | - | Domain on which authentication cookies are valid |
| `USERTOUR_COOKIE_SECURE` | UserTour | true | Set to true to allow cookies only over HTTPS |
| `AWS_S3_SECRET_ACCESS_KEY` | UserTour | (secret) | AWS secret access key used to authenticate with S3 |
| `JWT_REFRESH_EXPIRATION_TIME` | UserTour | 7d | Refresh token expiration duration |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/CQWupg)
