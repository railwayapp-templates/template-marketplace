# Deploy OpenCut on Railway

Free, open-source CapCut alternative. Privacy-first video editor.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/opencut)

## About

**OpenCut** is a free, open-source video editor for web, desktop, and mobile that prioritizes privacy by keeping your videos on your device. It offers timeline-based editing, multi-track support, real-time preview, and no watermarks or subscriptions - providing all the basic features that are now paywalled in CapCut.

⚠️ OpenCut does not currently offer an official image. The image used by this template is a fork made by the template author, with minimal changes to make it work in a Docker environment. Once an official image is released, this template will be updated to work with that out of the box.

### Deployment Steps

1.  Import the template - there are no configuration values to fill out.
2.  Once the deployment is ready, click on the `OpenCut` deployment and the pre-generated `.railway.app` domain to view the instance. It will take you to the “waitlist” page.

> **Note:** The "waitlist" page you see is actually OpenCut's landing page - this is normal behavior and doesn't mean you need to wait for access. You already have full access to your deployment and can navigate directly to the editor using the routes listed in the **Post-Deployment Steps**.

If you see a Railway error page instead of the waitlist page, it’s likely Railway hasn’t automatically added the port to your domain. Go to Settings → Networking, click the Edit button next to the domain and click “edit port”, then select or enter port `8080`.

If you wish to use a custom domain, you simply need to click on the deployment, go to Settings → Networking and click on the **\+ Custom Domain** button. Enter your domain and select or enter port `8080`.

### Post-Deployment Steps

From your app’s domain, you can then visit:

- `/projects` — create and work on your projects (no account is needed currently)
- `/signup` — create an account\*
- `/login` — sign in to an existing account\*

_\*At this stage, accounts seem largely redundant; projects and files are stored in your browser locally, and accounts don't currently add any benefit or additional features. This is the current state of development and may change as OpenCut continues to evolve._

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| OpenCut | `ghcr.io/reesmorris/opencut:latest` | Web service |
| Redis | `redis:7-alpine` | Database |
| Serverless Redis HTTP | `hiett/serverless-redis-http:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | OpenCut | 8080 | The port the app runs on |
| `DATABASE_URL` | OpenCut | - | Postgres connection string |
| `BETTER_AUTH_URL` | OpenCut | - | Base URL of the app |
| `BETTER_AUTH_SECRET` | OpenCut | (secret) | Random value used by the library for encryption and generating hashes |
| `UPSTASH_REDIS_REST_URL` | OpenCut | - | The URL of the Serverless Redis HTTP endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | OpenCut | (secret) | The same token used by Serverless Redis HTTP |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `URL` | Serverless Redis HTTP | - | The URL for other services to access this |
| `PORT` | Serverless Redis HTTP | 80 | Configure the port SRH runs on. |
| `SRH_MODE` | Serverless Redis HTTP | env | Can be `env` or `file`. If file, see Connecting to multiple Redis servers. |
| `SRH_TOKEN` | Serverless Redis HTTP | (secret) | Set the token that the Rest API will require |
| `SRH_CONNECTION_STRING` | Serverless Redis HTTP | - | Sets the connection string to the Redis server. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other

[View on Railway →](https://railway.com/template/opencut)
