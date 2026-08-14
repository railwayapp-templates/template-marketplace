# Deploy OpenShip on Railway

Self-hosted deployment platform to build, ship, and route apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openship-updated)

## About

Openship is an open-source, self-hostable deployment platform with built-in CI/CD. It connects to repositories, detects application configuration, builds and deploys services, manages domains and TLS, and provides a dashboard and API for controlling deployments. Openship supports modern application stacks, databases, workers, WebSockets, storage, rollbacks, and automated push-to-deploy workflows.

Hosting Openship on Railway provides a dedicated control plane composed of a dashboard, API, PostgreSQL database, and Redis service. The dashboard provides the web interface, while the API handles authentication, projects, deployments, configuration, and communication with the supporting services.

The Railway configuration uses private networking between the dashboard, API, PostgreSQL, and Redis. The dashboard is publicly accessible through a Railway domain, while the API remains reachable internally through its Railway private domain. PostgreSQL provides persistent application data and Redis handles the caching and runtime requirements.

The dashboard and API run as separate services, making the architecture easy to maintain and scale independently. Railway also provides HTTPS, service discovery, secrets, deployments, and infrastructure management without requiring manual server configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.2` | Database |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| api | [arloodots/openship](https://github.com/arloodots/openship) | Web service |
| dashboard | [arloodots/openship](https://github.com/arloodots/openship) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | redis | - | Private hostname used to connect to the Redis service. |
| `REDISPORT` | redis | 6379 | Default port used by Redis. |
| `REDISUSER` | redis | default | Redis username used for authentication. |
| `REDIS_URL` | redis | - | Connection string for connecting to Redis over the private network. |
| `REDISPASSWORD` | redis | (secret) | Exposes the Redis password through the REDISPASSWORD variable. |
| `REDIS_PASSWORD` | redis | (secret) | Generates a secure 32-character Redis password. |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `PORT` | api | 4000 | Port used by the Openship API. |
| `NODE_ENV` | api | production | Runs the API in production mode. |
| `REDIS_URL` | api | - | Private Redis connection URL used by the API. |
| `CLOUD_MODE` | api | false | Disables Openship Cloud mode for this self-hosted deployment. |
| `DEPLOY_MODE` | api | docker | Configures Openship to use Docker for deployments. |
| `TRUST_PROXY` | api | true | Trusts the Railway proxy when determining the original request. |
| `DATABASE_URL` | api | - | Private PostgreSQL connection URL. |
| `INTERNAL_TOKEN` | api | (secret) | Secret token used for secure internal API communication. |
| `OPENSHIP_TARGET` | api | local | Configures Openship to use the local deployment target. |
| `SYSTEM_DEBUG_LOGS` | api | false | Disables verbose system debug logging. |
| `BETTER_AUTH_SECRET` | api | (secret) | Secret used by Better Auth for authentication security. |
| `OPENSHIP_PUBLIC_URL` | api | - | Public HTTPS URL of the Openship dashboard. |
| `OPENSHIP_REQUIRE_REDIS` | api | true | Requires Redis for the Openship API. |
| `OPENSHIP_EXTRA_TRUSTED_ORIGINS` | api | - | Allows requests from the public dashboard domain. |
| `PORT` | dashboard | 3001 | Port used by the Openship dashboard. |
| `NODE_ENV` | dashboard | production | Runs Openship in production mode. |
| `OPENSHIP_TARGET` | dashboard | local | Configures Openship to use the local deployment target. |
| `INTERNAL_API_URL` | dashboard | - | Private URL used by the dashboard to communicate with the API. |
| `OPENSHIP_PUBLIC_URL` | dashboard | - | Public HTTPS URL of the Openship dashboard. |
| `NEXT_PUBLIC_API_PROXY` | dashboard | true | Enables the frontend API proxy. |
| `NEXT_PUBLIC_PUBLIC_URL` | dashboard | - | Public URL exposed to the frontend. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** TypeScript, MDX, Shell, CSS, Lua, JavaScript, PLpgSQL, Python, Dockerfile, PowerShell, XSLT, Java, Kotlin, Rust, PHP, Go, C#, Sieve

[View on Railway →](https://railway.com/deploy/openship-updated)
