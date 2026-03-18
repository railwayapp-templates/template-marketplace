# Deploy Infisical on Railway

The open-source secret management platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/NTiUyT)

## About

Infisical is an open-source secrets management platform that helps teams securely store, manage, and distribute application secrets such as API keys, database credentials, and certificates. It also provides built-in PKI, KMS, and SSH certificate management to centralize sensitive configuration across environments.

Hosting Infisical involves deploying a backend API, a web dashboard, and supporting services such as a database and cache. This template simplifies the process by packaging Infisical for deployment on Railway with sensible defaults. Railway handles infrastructure provisioning, networking, scaling, and service orchestration, allowing you to focus on configuring Infisical rather than managing servers. This setup is ideal for teams looking to self-host Infisical without the operational overhead of Kubernetes or manual cloud configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Infisical | `infisical/infisical:latest-postgres` | Database |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Infisical | 8080 | Specifies the internal port on which the application listens. |
| `SITE_URL` | Infisical | - | Must be an absolute URL including the protocol (e.g. https://app.infisical.com ). |
| `REDIS_URL` | Infisical | - | Redis connection string. |
| `SMTP_HOST` | Infisical | none | Hostname to connect to for establishing SMTP connections |
| `SMTP_PORT` | Infisical | 587 | Port to connect to for establishing SMTP connections |
| `AUTH_SECRET` | Infisical | (secret) | Must be a random 32 byte base64 string. Can be generated with openssl rand -base64 32 |
| `DB_ROOT_CERT` | Infisical | - | Configure the SSL certificate for securing a Postgres connection by first encoding it in base64. Use the command below to encode your certificate: echo "" | base64 |
| `SMTP_PASSWORD` | Infisical | (secret) | Credential to connect to host |
| `SMTP_USERNAME` | Infisical | (secret) | Credential to connect to host (e.g. team@infisical.com ) |
| `ENCRYPTION_KEY` | Infisical | - | Must be a random 16 byte hex string. Can be generated with openssl rand -hex 16 |
| `SMTP_FROM_NAME` | Infisical | none | Name label to be used in From field (e.g. Team) |
| `CLIENT_ID_AZURE` | Infisical | none | OAuth2 client id for Azure integration |
| `SMTP_IGNORE_TLS` | Infisical | false | If this is true and SMTP_PORT is not 465 then TLS is not used even if the server supports STARTTLS extension. |
| `CLIENT_ID_GITHUB` | Infisical | none | OAuth2 client ID for GitHub integration |
| `CLIENT_ID_GITLAB` | Infisical | none | OAuth2 client id for Gitlab integration |
| `CLIENT_ID_HEROKU` | Infisical | none | OAuth2 client ID for Heroku integration |
| `CLIENT_ID_VERCEL` | Infisical | none | OAuth2 client ID for Vercel integration |
| `DB_READ_REPLICAS` | Infisical | - | Postgres database read replica connection strings. It accepts a JSON string. |
| `OTEL_EXPORT_TYPE` | Infisical | prometheus | Supported types are prometheus and otlp. If export type is set to prometheus, metric data will be exposed in port 9464 in the /metrics path. If export type is set to otlp, you will have to configure a value for OTEL_EXPORT_OTLP_ENDPOINT. |
| `SMTP_REQUIRE_TLS` | Infisical | true | If this is true and SMTP_PORT is not 465 then Infisical tries to use STARTTLS even if the server does not advertise support for it. If the connection can not be encrypted then message is not sent. |
| `URL_GITLAB_LOGIN` | Infisical | (secret) | URL of your self-hosted instance of GitLab where the OAuth application is registered |
| `CLIENT_ID_NETLIFY` | Infisical | none | OAuth2 client ID for Netlify integration |
| `DB_CONNECTION_URI` | Infisical | - | Postgres database connection string. |
| `SMTP_FROM_ADDRESS` | Infisical | none | Email address to be used for sending emails |
| `TELEMETRY_ENABLED` | Infisical | true | Telemetry helps us improve Infisical but if you want to disable it you may set this to false. |
| `CLIENT_SLUG_VERCEL` | Infisical | none | OAuth2 slug for Vercel integration |
| `CLIENT_ID_BITBUCKET` | Infisical | none | OAuth2 client ID for BitBucket integration |
| `CLIENT_SECRET_AZURE` | Infisical | (secret) | OAuth2 client secret for Azure integration |
| `CLIENT_SECRET_GITHUB` | Infisical | (secret) | OAuth2 client secret for GitHub integration |
| `CLIENT_SECRET_GITLAB` | Infisical | (secret) | OAuth2 client secret for Gitlab integration |
| `CLIENT_SECRET_HEROKU` | Infisical | (secret) | OAuth2 client secret for Heroku integration |
| `CLIENT_SECRET_VERCEL` | Infisical | (secret) | OAuth2 client secret for Vercel integration |
| `CLIENT_SECRET_NETLIFY` | Infisical | (secret) | OAuth2 client secret for Netlify integration |
| `DEFAULT_SAML_ORG_SLUG` | Infisical | - | When set, all visits to the Infisical login page will automatically redirect users of your Infisical instance to the SAML identity provider associated with the specified organization slug. |
| `CLIENT_ID_GITHUB_LOGIN` | Infisical | (secret) | OAuth2 client ID for GitHub login |
| `CLIENT_ID_GITLAB_LOGIN` | Infisical | (secret) | OAuth2 client ID for GitLab login |
| `CLIENT_ID_GOOGLE_LOGIN` | Infisical | (secret) | OAuth2 client ID for Google login |
| `CLIENT_SECRET_BITBUCKET` | Infisical | (secret) | OAuth2 client secret for BitBucket integration |
| `CLIENT_ID_AWS_INTEGRATION` | Infisical | none | The AWS IAM User access key for assuming roles. |
| `OTEL_EXPORT_OTLP_ENDPOINT` | Infisical | - | Where telemetry data would be pushed to for collection. This is only applicable when OTEL_EXPORT_TYPE is set to otlp. |
| `CLIENT_SECRET_GITHUB_LOGIN` | Infisical | (secret) | OAuth2 client secret for GitHub login |
| `CLIENT_SECRET_GITLAB_LOGIN` | Infisical | (secret) | OAuth2 client secret for GitLab login |
| `CLIENT_SECRET_GOOGLE_LOGIN` | Infisical | (secret) | OAuth2 client secret for Google login |
| `CLIENT_ID_GCP_SECRET_MANAGER` | Infisical | (secret) | OAuth2 client id for GCP secrets manager integration |
| `SMTP_TLS_REJECT_UNAUTHORIZED` | Infisical | true | If this is true, Infisical will validate the server's SSL/TLS certificate and reject the connection if the certificate is invalid or not trusted. If set to false, the client will accept the server's certificate regardless of its validity, which can be useful in development or testing environments but is not recommended for production use. |
| `ALLOW_INTERNAL_IP_CONNECTIONS` | Infisical | false   | Determines whether App Connections and Dynamic Secrets are permitted to connect with internal/private IP addresses. |
| `CLIENT_SECRET_AWS_INTEGRATION` | Infisical | (secret) | The AWS IAM User secret key for assuming roles. |
| `CLIENT_SECRET_GCP_SECRET_MANAGER` | Infisical | (secret) | OAuth2 client secret for GCP secrets manager integration |
| `INF_APP_CONNECTION_GITHUB_APP_ID` | Infisical | none | The ID of the GitHub App |
| `OTEL_TELEMETRY_COLLECTION_ENABLED` | Infisical | false | Whether or not to collect and expose telemetry data. |
| `INF_APP_CONNECTION_GITHUB_APP_SLUG` | Infisical | none | The slug of the GitHub App |
| `OTEL_COLLECTOR_BASIC_AUTH_PASSWORD` | Infisical | (secret) | The password for authenticating with the telemetry collector. |
| `OTEL_COLLECTOR_BASIC_AUTH_USERNAME` | Infisical | (secret) | The username for authenticating with the telemetry collector. |
| `INF_APP_CONNECTION_AWS_ACCESS_KEY_ID` | Infisical | none | The AWS IAM User access key ID for assuming roles |
| `INF_APP_CONNECTION_GITHUB_APP_CLIENT_ID` | Infisical | none | The client ID for the GitHub App |
| `INF_APP_CONNECTION_AWS_SECRET_ACCESS_KEY` | Infisical | (secret) | The AWS IAM User secret key for assuming roles |
| `INF_APP_CONNECTION_GITHUB_APP_PRIVATE_KEY` | Infisical | none | The private key for the GitHub App |
| `INF_APP_CONNECTION_GITHUB_OAUTH_CLIENT_ID` | Infisical | none | The OAuth2 client ID for GitHub OAuth Connection |
| `INF_APP_CONNECTION_GITHUB_APP_CLIENT_SECRET` | Infisical | (secret) | The client secret for the GitHub App |
| `INF_APP_CONNECTION_GITHUB_OAUTH_CLIENT_SECRET` | Infisical | (secret) | The OAuth2 client secret for GitHub OAuth Connection |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Automation

[View on Railway →](https://railway.com/template/NTiUyT)
