# Deploy erxes on Railway

Open-source workspace for support inbox, CRM, sales and projects

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/erxes)

## About

erxes is an open-source Experience Operating System — one workspace carrying a shared customer inbox, a CRM, sales pipelines and project management instead of three SaaS subscriptions. Teams reach for it when HubSpot, Zendesk and Linear have become a four-figure bill for tools that never share a contact record. Every module reads the same MongoDB collections, so a support conversation, its deal and the task it created are one customer, not three copies.

Deploy erxes on Railway and this template brings up the XOS split the way upstream runs it: `proxy` holds the only public domain, `core-ui` serves the React host app, `gateway` composes an Apollo Federation supergraph, and `core-api`, `frontline-api`, `sales-api` and `operation-api` sit behind it as GraphQL subgraphs. `automations` runs the trigger engine, `logs` records the audit journal behind the in-app undo, and `MongoDB` and `Redis` back all of them. Traffic reaches `proxy`, which serves the UI at `/` and forwards `/gateway/*` to the gateway on the same origin — so the session cookie stays first-party and no second domain is needed.

![Diagram of the eleven erxes services, MongoDB and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789627441/erxes-architecture.webp)

erxes is a core of shared primitives — contacts, companies, segments, documents, automations — with plugins on top that read the same data. Self-host it when support transcripts and deal history should not sit in a vendor's multi-tenant database.

- **Frontline** — omnichannel inbox, tickets, forms, surveys, knowledge base, help centre
- **Sales** — deal pipelines and boards, plus point of sale
- **Operation** — projects, task boards, cycles, team workloads
- **Core** — contacts, segments, automations, broadcasts, documents, templates
- **Extensible** — plugin APIs are independent services; their UIs are federated remotes

`gateway` runs Apollo Router and composes a supergraph from the plugin APIs `ENABLED_PLUGINS` names; each registers its private address in Redis at boot and the gateway recomposes when one joins. `core-api` owns contacts, users, uploads and settings, and takes every non-GraphQL route. Redis also carries the BullMQ queues, caching and subscriptions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxy | [gridalpha/erxes-railway](https://github.com/gridalpha/erxes-railway) | Web service |
| Redis | `redis:8.2` | Database |
| gateway | `erxes/erxes-next-gateway:latest` | Worker |
| operation-api | `erxes/erxes-next-operation_api:latest` | Worker |
| frontline-api | `erxes/erxes-next-frontline_api:latest` | Worker |
| automations | `erxes/erxes-next-automations:latest` | Worker |
| core-ui | `erxes/erxes-next-ui:latest` | Worker |
| logs | `erxes/erxes-next-logs:latest` | Worker |
| sales-api | `erxes/erxes-next-sales_api:latest` | Worker |
| core-api | [gridalpha/erxes-railway](https://github.com/gridalpha/erxes-railway) | Worker |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | proxy | 8080 | Caddy listening port |
| `ERXES_UI_UPSTREAM` | proxy | core-ui.railway.internal:80 | Core UI upstream override |
| `ERXES_GATEWAY_UPSTREAM` | proxy | gateway.railway.internal:4000 | Gateway upstream override |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | gateway | 4000 | GraphQL gateway listening port |
| `DOMAIN` | gateway | - | Public origin of the deployment |
| `VERSION` | gateway | os | Single-tenant self-hosted mode |
| `NODE_ENV` | gateway | production | Enables the production code paths |
| `MONGO_URL` | gateway | - | Shared MongoDB database |
| `REDIS_HOST` | gateway | - | Redis host for service discovery |
| `REDIS_PORT` | gateway | - | Redis port |
| `TRUST_PROXY` | gateway | 0.0.0.0/1,128.0.0.0/1,::/1,8000::/1 | Trust every forwarding hop |
| `NODE_OPTIONS` | gateway | --max-old-space-size=2048 | Node heap ceiling |
| `REDIS_PASSWORD` | gateway | (secret) | Redis password |
| `ALLOWED_DOMAINS` | gateway | - | Extra CORS origin |
| `ENABLED_PLUGINS` | gateway | frontline,sales,operation | Plugin APIs in the supergraph |
| `GRAPHQL_LIMITER` | gateway | true | Query depth and alias limits |
| `JWT_TOKEN_SECRET` | gateway | (secret) | Shared session signing key |
| `MAX_PLUGIN_RETRY` | gateway | 90 | Exit after this many plugin lookups |
| `PORT` | operation-api | 3307 | Operation API listening port |
| `DOMAIN` | operation-api | - | Public origin of the deployment |
| `VERSION` | operation-api | os | Single-tenant self-hosted mode |
| `NODE_ENV` | operation-api | production | Enables the production code paths |
| `MONGO_URL` | operation-api | - | Shared MongoDB database |
| `REDIS_HOST` | operation-api | - | Redis host for service discovery |
| `REDIS_PORT` | operation-api | - | Redis port |
| `TRUST_PROXY` | operation-api | 0.0.0.0/1,128.0.0.0/1,::/1,8000::/1 | Trust every forwarding hop |
| `NODE_OPTIONS` | operation-api | --max-old-space-size=2048 | Node heap ceiling |
| `REDIS_PASSWORD` | operation-api | (secret) | Redis password |
| `ENABLED_PLUGINS` | operation-api | frontline,sales,operation | Plugin APIs in the supergraph |
| `JWT_TOKEN_SECRET` | operation-api | (secret) | Shared session signing key |
| `LOAD_BALANCER_ADDRESS` | operation-api | http://operation-api.railway.internal:3307 | Address registered with the gateway |
| `PORT` | frontline-api | 3304 | Frontline API listening port |
| `DOMAIN` | frontline-api | - | Public origin of the deployment |
| `VERSION` | frontline-api | os | Single-tenant self-hosted mode |
| `NODE_ENV` | frontline-api | production | Enables the production code paths |
| `MONGO_URL` | frontline-api | - | Shared MongoDB database |
| `REDIS_HOST` | frontline-api | - | Redis host for service discovery |
| `REDIS_PORT` | frontline-api | - | Redis port |
| `TRUST_PROXY` | frontline-api | 0.0.0.0/1,128.0.0.0/1,::/1,8000::/1 | Trust every forwarding hop |
| `NODE_OPTIONS` | frontline-api | --max-old-space-size=2048 | Node heap ceiling |
| `REDIS_PASSWORD` | frontline-api | (secret) | Redis password |
| `ENABLED_PLUGINS` | frontline-api | frontline,sales,operation | Plugin APIs in the supergraph |
| `JWT_TOKEN_SECRET` | frontline-api | (secret) | Shared session signing key |
| `LOAD_BALANCER_ADDRESS` | frontline-api | http://frontline-api.railway.internal:3304 | Address registered with the gateway |
| `PORT` | automations | 3302 | Automations service listening port |
| `DOMAIN` | automations | - | Public origin of the deployment |
| `VERSION` | automations | os | Single-tenant self-hosted mode |
| `NODE_ENV` | automations | production | Enables the production code paths |
| `MONGO_URL` | automations | - | Shared MongoDB database |
| `REDIS_HOST` | automations | - | Redis host for service discovery |
| `REDIS_PORT` | automations | - | Redis port |
| `TRUST_PROXY` | automations | 0.0.0.0/1,128.0.0.0/1,::/1,8000::/1 | Trust every forwarding hop |
| `NODE_OPTIONS` | automations | --max-old-space-size=2048 | Node heap ceiling |
| `REDIS_PASSWORD` | automations | (secret) | Redis password |
| `ENABLED_PLUGINS` | automations | frontline,sales,operation | Plugin APIs in the supergraph |
| `JWT_TOKEN_SECRET` | automations | (secret) | Shared session signing key |
| `LOAD_BALANCER_ADDRESS` | automations | http://automations.railway.internal:3302 | Address registered in service discovery |
| `PORT` | core-ui | 80 | nginx listening port, fixed in the image |
| `REACT_APP_API_URL` | core-ui | - | Browser-facing API base |
| `PORT` | logs | 3301 | Logs service listening port |
| `DOMAIN` | logs | - | Public origin of the deployment |
| `VERSION` | logs | os | Single-tenant self-hosted mode |
| `NODE_ENV` | logs | production | Enables the production code paths |
| `MONGO_URL` | logs | - | Shared MongoDB database |
| `REDIS_HOST` | logs | - | Redis host for service discovery |
| `REDIS_PORT` | logs | - | Redis port |
| `TRUST_PROXY` | logs | 0.0.0.0/1,128.0.0.0/1,::/1,8000::/1 | Trust every forwarding hop |
| `NODE_OPTIONS` | logs | --max-old-space-size=2048 | Node heap ceiling |
| `REDIS_PASSWORD` | logs | (secret) | Redis password |
| `ENABLED_PLUGINS` | logs | frontline,sales,operation | Plugin APIs in the supergraph |
| `JWT_TOKEN_SECRET` | logs | (secret) | Shared session signing key |
| `LOAD_BALANCER_ADDRESS` | logs | http://logs.railway.internal:3301 | Address registered in service discovery |
| `PORT` | sales-api | 3305 | Sales API listening port |
| `DOMAIN` | sales-api | - | Public origin of the deployment |
| `VERSION` | sales-api | os | Single-tenant self-hosted mode |
| `NODE_ENV` | sales-api | production | Enables the production code paths |
| `MONGO_URL` | sales-api | - | Shared MongoDB database |
| `REDIS_HOST` | sales-api | - | Redis host for service discovery |
| `REDIS_PORT` | sales-api | - | Redis port |
| `TRUST_PROXY` | sales-api | 0.0.0.0/1,128.0.0.0/1,::/1,8000::/1 | Trust every forwarding hop |
| `NODE_OPTIONS` | sales-api | --max-old-space-size=2048 | Node heap ceiling |
| `REDIS_PASSWORD` | sales-api | (secret) | Redis password |
| `ENABLED_PLUGINS` | sales-api | frontline,sales,operation | Plugin APIs in the supergraph |
| `JWT_TOKEN_SECRET` | sales-api | (secret) | Shared session signing key |
| `LOAD_BALANCER_ADDRESS` | sales-api | http://sales-api.railway.internal:3305 | Address registered with the gateway |
| `PORT` | core-api | 3300 | Core API listening port |
| `DOMAIN` | core-api | - | Public origin of the deployment |
| `VERSION` | core-api | os | Single-tenant self-hosted mode |
| `NODE_ENV` | core-api | production | Enables the production code paths |
| `MONGO_URL` | core-api | - | Shared MongoDB database |
| `AWS_BUCKET` | core-api | - | Upload bucket name |
| `AWS_REGION` | core-api | - | Bucket region |
| `REDIS_HOST` | core-api | - | Redis host for service discovery |
| `REDIS_PORT` | core-api | - | Redis port |
| `TRUST_PROXY` | core-api | 0.0.0.0/1,128.0.0.0/1,::/1,8000::/1 | Trust every forwarding hop |
| `NODE_OPTIONS` | core-api | --max-old-space-size=2048 | Node heap ceiling |
| `REDIS_PASSWORD` | core-api | (secret) | Redis password |
| `ENABLED_PLUGINS` | core-api | frontline,sales,operation | Plugin APIs in the supergraph |
| `JWT_TOKEN_SECRET` | core-api | (secret) | Shared session signing key |
| `AWS_ACCESS_KEY_ID` | core-api | - | Bucket access key |
| `ERXES_OWNER_EMAIL` | core-api | owner@example.com | First owner login, change before deploying |
| `FILE_SYSTEM_PUBLIC` | core-api | false | Serve uploads through the app, not the bucket |
| `UPLOAD_SERVICE_TYPE` | core-api | AWS | Store uploads in object storage |
| `AWS_FORCE_PATH_STYLE` | core-api | true | Path-style addressing, required here |
| `ERXES_BOOTSTRAP_PORT` | core-api | 3399 | Loopback port used while seeding |
| `ERXES_OWNER_PASSWORD` | core-api | (secret) | First owner password, seeded at boot |
| `AWS_SECRET_ACCESS_KEY` | core-api | (secret) | Bucket secret key |
| `ERXES_OWNER_LAST_NAME` | core-api | Owner | First owner family name |
| `LOAD_BALANCER_ADDRESS` | core-api | http://core-api.railway.internal:3300 | Address registered with the gateway |
| `ERXES_OWNER_FIRST_NAME` | core-api | Workspace | First owner given name |
| `AWS_COMPATIBLE_SERVICE_ENDPOINT` | core-api | - | S3-compatible endpoint |
| `MONGOHOST` | MongoDB | - | Data panel alias, not read by the server |
| `MONGOPORT` | MongoDB | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | MongoDB | - | Data panel alias, not read by the server |
| `MONGO_URL` | MongoDB | - | Private connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Superuser password |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Superuser created on first boot |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Healthcheck:** `/`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Other · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/erxes)
