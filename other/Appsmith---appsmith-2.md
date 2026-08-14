# Deploy Appsmith on Railway

Retool Alternative. Low-code internal tool (admin panel, dashboard) builder

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appsmith-2)

## About

Appsmith is an open-source low-code platform for building internal software — admin panels, support consoles, operations dashboards and CRUD screens — on top of the databases and APIs a team already runs. Developers drag widgets onto a canvas, bind them to SQL queries or REST calls, and write JavaScript anywhere a value is expected. Teams use it to hand a safe interface to support, sales or operations staff without maintaining a bespoke React app for every request; it is the most widely adopted self-hostable alternative to Retool.

Deploy Appsmith on Railway and you get the official `appsmith/appsmith-ce` container backed by a managed Redis service. The container holds the editor, the Java API server, the real-time collaboration service and the application database, fronted by a Caddy proxy on one public HTTPS domain. Redis runs as its own service and stores sessions and caches, so redeploying the app does not sign everyone out. A volume at `/appsmith-stacks` keeps applications, datasource configuration, Git repositories and logs across restarts. Nothing else needs configuring to self-host Appsmith: encryption keys are generated at deploy time and the Redis connection is wired for you.

![Appsmith Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786646593/f77454cf-85aa-4ee9-b0e2-5e1a326acd35.png)

Appsmith solves a problem every growing company hits: internal users need a UI over production data, and building one properly costs weeks of frontend work nobody wants to own. Self-hosting matters when that data cannot leave your network — customer records, payment history, healthcare or HR data — because queries run from a container you control and credentials are encrypted at rest with a key only you hold. It also sidesteps per-seat pricing.

Key features:

- Drag-and-drop canvas with 45+ widgets — tables, forms, charts, maps, file pickers, rich text
- 25+ native integrations: PostgreSQL, MySQL, MongoDB, Elasticsearch, Snowflake, S3, Google Sheets, REST and GraphQL
- JavaScript everywhere, plus reusable JS objects and libraries
- Git version control, so applications live in your own repository
- Embed published apps into an existing portal with an iframe

Architecture on Railway: the **Appsmith** service is one container running Caddy, the Spring Boot API, a Node real-time service for editor collaboration, and the bundled MongoDB holding your applications, users and encrypted datasource settings — all on a single volume. The separate **Redis** service holds only sessions and caches, which is what makes the app tier restartable without signing users out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Appsmith | `appsmith/appsmith-ce:v2.2` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Appsmith | 3000 | Caddy listening port |
| `APPSMITH_BASE_URL` | Appsmith | - | Canonical public instance URL |
| `APPSMITH_REDIS_URL` | Appsmith | - | Session store and cache |
| `APPSMITH_ADMIN_EMAILS` | Appsmith | - | Optional admin contact addresses |
| `APPSMITH_INSTANCE_NAME` | Appsmith | Appsmith | Label shown in admin settings |
| `APPSMITH_ENCRYPTION_SALT` | Appsmith | - | Salt for credential encryption |
| `APPSMITH_SIGNUP_DISABLED` | Appsmith | false | First-boot seed for open signup |
| `APPSMITH_DISABLE_TELEMETRY` | Appsmith | true | Disable anonymous usage reporting |
| `APPSMITH_ENCRYPTION_PASSWORD` | Appsmith | (secret) | Encrypts stored datasource credentials |
| `APPSMITH_ALLOWED_FRAME_ANCESTORS` | Appsmith | 'self' | CSP frame-ancestors policy |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/appsmith-stacks`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/appsmith-2)
