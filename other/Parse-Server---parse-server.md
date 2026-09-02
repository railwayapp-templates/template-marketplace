# Deploy Parse Server on Railway

Backend for mobile and web apps with users, files and realtime

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/parse-server)

## About

Parse Server is the open-source backend that grew out of Parse, the mobile backend Facebook acquired and shut down in 2017. The community kept it alive, and it is now an Apache-2.0 Node.js project with 21,000 GitHub stars. It gives an app a complete backend without writing one: schema-aware object storage, users and sessions, role-based ACLs, file uploads, push notifications, LiveQuery subscriptions and Cloud Code — through REST and GraphQL APIs and official SDKs for iOS, Android, JavaScript, Flutter and .NET. Teams choose it for Firebase's speed of development without Firebase's proprietary query language.

Deploy Parse Server on Railway and you get the production shape rather than a single container: an API service serving REST and GraphQL, a dedicated LiveQuery service handling WebSocket subscriptions on its own domain, and Parse Dashboard behind its own login. MongoDB stores your objects and users, Redis carries LiveQuery events between the two Parse tiers and backs the shared cache and rate limiter, and a managed bucket holds uploaded files. Application keys are generated at deploy time; you supply only the dashboard password.

![Diagram of the Parse Server, LiveQuery, Dashboard, MongoDB and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788281909/parse-server-architecture.png)

Parse Server turns a MongoDB (or PostgreSQL) database into a schema-aware API with authentication, permissions and realtime built in. You define classes, the server creates collections and indexes, and every object carries an ACL deciding who may read or write it. Self-hosting matters because the data model is yours: objects are ordinary MongoDB documents, so nothing traps you in a proprietary store.

- REST and GraphQL APIs over the same data, with SDKs for every major platform
- Users, sessions, password policies, account lockout and OAuth adapters
- Object-level ACLs and class-level permissions, with protected fields
- Cloud Code triggers, callable functions and background jobs
- LiveQuery subscriptions pushing create, update and delete events
- Parse Files with pluggable storage, and push for iOS and Android

The Railway deployment splits the roles upstream recommends splitting: the API service handles ordinary HTTP traffic, while the LiveQuery service holds the long-lived WebSocket connections and receives events over Redis pub/sub rather than shared process memory, so either tier scales or redeploys without dropping the other.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| MongoDB | `mongo:8.0` | Database |
| parse-livequery | [gridalpha/parse-server-railway](https://github.com/gridalpha/parse-server-railway) | Web service |
| parse-dashboard | `parseplatform/parse-dashboard:latest` | Web service |
| parse-server | [gridalpha/parse-server-railway](https://github.com/gridalpha/parse-server-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `MONGOHOST` | MongoDB | - | Data panel alias, not read by the server |
| `MONGOPORT` | MongoDB | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | MongoDB | - | Data panel alias, not read by the server |
| `MONGO_URL` | MongoDB | - | Private connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root password, read by the image on first boot |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root user, read by the image on first boot |
| `PORT` | parse-livequery | 1337 | HTTP and WebSocket port |
| `REDIS_URL` | parse-livequery | - | Shared cache and rate limit counters |
| `S3_BUCKET` | parse-livequery | - | Bucket holding Parse Files |
| `S3_REGION` | parse-livequery | - | Object storage region |
| `S3_ENDPOINT` | parse-livequery | - | Object storage endpoint |
| `PARSE_SERVER_URL` | parse-livequery | - | This service's own API URL |
| `S3_ACCESS_KEY_ID` | parse-livequery | - | Object storage access key |
| `S3_SECRET_ACCESS_KEY` | parse-livequery | (secret) | Object storage secret key |
| `PARSE_SERVER_APP_NAME` | parse-livequery | Parse Server | Display name in the dashboard |
| `PARSE_SERVER_FILE_KEY` | parse-livequery | - | Same file key as the API |
| `PARSE_PUBLIC_SERVER_URL` | parse-livequery | - | This service's own public URL |
| `PARSE_SERVER_CLIENT_KEY` | parse-livequery | - | Same client key as the API |
| `PARSE_SERVER_MASTER_KEY` | parse-livequery | - | Same master key as the API |
| `PARSE_SERVER_MOUNT_PATH` | parse-livequery | /parse | Path the API is mounted at |
| `PARSE_SERVER_TRUST_PROXY` | parse-livequery | true | Trust Railway's proxy for client IPs |
| `PARSE_SERVER_DATABASE_URI` | parse-livequery | - | MongoDB connection string |
| `PARSE_SERVER_GRAPHQL_PATH` | parse-livequery | /graphql | Path the GraphQL API is mounted at |
| `PARSE_SERVER_REST_API_KEY` | parse-livequery | (secret) | Same REST key as the API |
| `PARSE_SERVER_DIRECT_ACCESS` | parse-livequery | true | Cloud Code talks to the database in process |
| `PARSE_SERVER_MOUNT_GRAPHQL` | parse-livequery | true | Enable the GraphQL API |
| `PARSE_SERVER_APPLICATION_ID` | parse-livequery | - | Same app identifier as the API |
| `PARSE_SERVER_JAVASCRIPT_KEY` | parse-livequery | - | Same JavaScript key as the API |
| `PARSE_SERVER_MASTER_KEY_IPS` | parse-livequery | 0.0.0.0/0,::0 | Addresses allowed to use the master key |
| `PARSE_SERVER_LIVEQUERY_REDIS_URL` | parse-livequery | - | Redis channel LiveQuery subscribes to |
| `PARSE_SERVER_LIVEQUERY_CLASSNAMES` | parse-livequery | Message | Classes LiveQuery publishes events for |
| `PARSE_SERVER_ENFORCE_PRIVATE_USERS` | parse-livequery | true | User objects are private by default |
| `PARSE_SERVER_START_LIVE_QUERY_SERVER` | parse-livequery | true | Run the LiveQuery server on this service |
| `PARSE_SERVER_ALLOWED_FILE_URL_DOMAINS` | parse-livequery | - | Hosts allowed in file pointers |
| `PARSE_SERVER_ALLOW_CLIENT_CLASS_CREATION` | parse-livequery | false | Clients cannot create new classes |
| `PORT` | parse-dashboard | 4040 | HTTP port the dashboard listens on |
| `PARSE_DASHBOARD_APP_ID` | parse-dashboard | - | App identifier to manage |
| `PARSE_DASHBOARD_USER_ID` | parse-dashboard | admin | Dashboard login username |
| `PARSE_DASHBOARD_APP_NAME` | parse-dashboard | Parse Server | App name shown in the UI |
| `PARSE_DASHBOARD_MASTER_KEY` | parse-dashboard | - | Master key used by the dashboard |
| `PARSE_DASHBOARD_SERVER_URL` | parse-dashboard | - | API the dashboard manages |
| `PARSE_DASHBOARD_TRUST_PROXY` | parse-dashboard | 1 | Trust Railway's proxy for HTTPS detection |
| `PARSE_DASHBOARD_USER_PASSWORD` | parse-dashboard | (secret) | Dashboard login password, change after first login |
| `PARSE_DASHBOARD_GRAPHQL_SERVER_URL` | parse-dashboard | - | GraphQL endpoint for the console |
| `PARSE_DASHBOARD_COOKIE_SESSION_SECRET` | parse-dashboard | (secret) | Signs dashboard session cookies |
| `PORT` | parse-server | 1337 | HTTP port Parse Server listens on |
| `REDIS_URL` | parse-server | - | Shared cache and rate limit counters |
| `S3_BUCKET` | parse-server | - | Bucket holding Parse Files |
| `S3_REGION` | parse-server | - | Object storage region |
| `S3_ENDPOINT` | parse-server | - | Object storage endpoint |
| `PARSE_SERVER_URL` | parse-server | - | Public API base URL |
| `S3_ACCESS_KEY_ID` | parse-server | - | Object storage access key |
| `S3_SECRET_ACCESS_KEY` | parse-server | (secret) | Object storage secret key |
| `PARSE_SERVER_APP_NAME` | parse-server | Parse Server | Display name in the dashboard |
| `PARSE_SERVER_FILE_KEY` | parse-server | - | Stable key used in legacy file URLs |
| `PARSE_PUBLIC_SERVER_URL` | parse-server | - | Public URL used in file links |
| `PARSE_SERVER_CLIENT_KEY` | parse-server | - | Key required from mobile SDKs |
| `PARSE_SERVER_MASTER_KEY` | parse-server | - | Full-access key, server side only |
| `PARSE_SERVER_MOUNT_PATH` | parse-server | /parse | Path the API is mounted at |
| `PARSE_SERVER_TRUST_PROXY` | parse-server | true | Trust Railway's proxy for client IPs |
| `PARSE_SERVER_DATABASE_URI` | parse-server | - | MongoDB connection string |
| `PARSE_SERVER_GRAPHQL_PATH` | parse-server | /graphql | Path the GraphQL API is mounted at |
| `PARSE_SERVER_REST_API_KEY` | parse-server | (secret) | Key required from REST clients |
| `PARSE_SERVER_DIRECT_ACCESS` | parse-server | true | Cloud Code talks to the database in process |
| `PARSE_SERVER_MOUNT_GRAPHQL` | parse-server | true | Enable the GraphQL API |
| `PARSE_SERVER_APPLICATION_ID` | parse-server | - | Public app identifier for clients |
| `PARSE_SERVER_JAVASCRIPT_KEY` | parse-server | - | Key required from JavaScript SDKs |
| `PARSE_SERVER_MASTER_KEY_IPS` | parse-server | 0.0.0.0/0,::0 | Addresses allowed to use the master key |
| `PARSE_SERVER_LIVEQUERY_REDIS_URL` | parse-server | - | Redis channel LiveQuery publishes to |
| `PARSE_SERVER_LIVEQUERY_CLASSNAMES` | parse-server | Message | Classes LiveQuery publishes events for |
| `PARSE_SERVER_ENFORCE_PRIVATE_USERS` | parse-server | true | User objects are private by default |
| `PARSE_SERVER_ALLOW_CLIENT_CLASS_CREATION` | parse-server | false | Clients cannot create new classes |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Healthcheck:** `/parse/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/login`

**Category:** Other · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/parse-server)
