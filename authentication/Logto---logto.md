# Deploy Logto on Railway

Modern open-source auth with multi-tenancy, SSO, and RBAC

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/logto)

## About

**Logto** is the modern, open-source auth infrastructure for SaaS and AI apps. It takes the pain out of OIDC and OAuth 2.1 and makes it easy to build secure, production-ready auth with multi-tenancy, enterprise SSO, and RBAC.

### Deployment Steps

**Logto Auth**

1.  Click on the Logto Auth deployment, then click on the pre-generated URL.
2. If it takes you to a “404 Not Found” page at `/unknown-session`, you’re all set here!

If you see a Railway error page instead, it’s likely Railway hasn’t automatically added the port to your domain. Go to Settings → Networking, click the Edit button next to the domain and click “edit port”, then select or enter port `3001`.

If you wish to use a custom domain, you simply need to click on the deployment, go to Settings → Networking and click on the **\+ Custom Domain** button. Enter your domain and select or enter port `3001`.

**Logto Admin Console**

1.  Click on the Logto Admin Console deployment, then click on the pre-generated URL. You should see a page titled “Welcome to Admin Console”.
2.  Click on **Create account** and complete the form to create your account.
3.  You’re all set!

If you see a Railway error page instead, it’s likely Railway hasn’t automatically added the port to your domain. Go to Settings → Networking, click the Edit button next to the domain and click “edit port”, then select or enter port `3002`.

If you wish to use a custom domain, you simply need to click on the deployment, go to Settings → Networking and click on the **\+ Custom Domain** button. Enter your domain and select or enter port `3002`.

**Disable Redis (Optional)**

This deployment comes with Redis included, but it’s entirely optional. If you don’t want Redis, simply:

1.  Right-click → Delete the Redis service
2.  Right-click → Delete the detached volume (it’ll be floating somewhere by itself)
3.  Click on the Logto Auth deployment → Variables
4.  Find and delete the `REDIS_URL` variable
5.  Click on the Logto Admin Console deployment → Variables
6.  Find and delete the `REDIS_URL` variable
7.  Deploy your changes

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Logto Auth | `svhd/logto:latest` | Web service |
| Logto Admin Console | `svhd/logto:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `postgres:17-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Logto Auth | 3001 | The local port that Logto listens to. |
| `DB_URL` | Logto Auth | - | The Postgres DSN for Logto database. |
| `ENDPOINT` | Logto Auth | - | The production URL. This will also affect the value of the OIDC issuer identifier. |
| `REDIS_URL` | Logto Auth | - | The Redis connection string. |
| `ADMIN_ENDPOINT` | Logto Auth | - | The admin console URL. This will also affect the value of Admin Console Redirect URIs. |
| `TRUST_PROXY_HEADER` | Logto Auth | 1 | Indicates if proxy header fields should be trusted. |
| `ADMIN_DISABLE_LOCALHOST` | Logto Auth | 1 | Disables the admin console. |
| `CASE_SENSITIVE_USERNAME` | Logto Auth | (secret) | Specifies whether the username is case-sensitive. |
| `DB_URL` | Logto Admin Console | - | The Postgres DSN for Logto database. |
| `ENDPOINT` | Logto Admin Console | - | The production URL. This will also affect the value of the OIDC issuer identifier. |
| `REDIS_URL` | Logto Admin Console | - | The Redis connection string. |
| `ADMIN_PORT` | Logto Admin Console | 3002 | The local port that Logto Admin Console listens to. |
| `ADMIN_ENDPOINT` | Logto Admin Console | - | The admin console URL. This will also affect the value of Admin Console Redirect URIs. |
| `TRUST_PROXY_HEADER` | Logto Admin Console | 1 | Indicates if proxy header fields should be trusted. |
| `CASE_SENSITIVE_USERNAME` | Logto Admin Console | (secret) | Specifies whether the username is case-sensitive. |
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

- **Start command:** `sh -c "npm run cli db seed -- --swe; npm run alteration deploy latest; npm start"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/logto)
