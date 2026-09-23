# Deploy HeyForm on Railway

Open-source form builder, built for small business success.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/heyform-1)

## About

HeyForm is an open-source form builder that lets you create interactive, conversational forms without coding. It provides a visual editor for building forms, collecting responses, and managing submissions. HeyForm can be self-hosted, giving teams control over their form data, infrastructure, and deployment environment.

Hosting HeyForm involves deploying its application server and connecting it to the required supporting services. A typical deployment uses a Node.js-based application environment, a MongoDB database for persistent data, and Redis for caching and background processing. Environment variables are used to configure the application, database connections, authentication, and other services. On Railway, these components can be deployed and managed as separate services within the same project, making it easier to configure networking, persistent storage, environment variables, and scaling while keeping the entire HeyForm stack in one place.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| HeyForm | `heyform/community-edition:v3.0.3` | Web service |
| Redis | `redis:8.2` | Database |
| MongoDB | `mongo:8.0` | Database |
| Mailcrab | `marlonb/mailcrab:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | HeyForm | 9157 | Default Port |
| `REDIS_DB` | HeyForm | 0 | Redis Default DB |
| `MONGO_URI` | HeyForm | - | Mongo URL Connection |
| `S3_BUCKET` | HeyForm | - | S3 bucket name used to store uploaded files. Required when using S3-compatible storage. |
| `S3_REGION` | HeyForm | - | S3 region for the bucket (e.g. us-east-1). Required by most S3-compatible providers for request signing. |
| `SMTP_FROM` | HeyForm | - | SMTP Adress |
| `SMTP_HOST` | HeyForm | - | SMTP Host (Default is Mailcrab) |
| `SMTP_PORT` | HeyForm | 1025 | SMTP Port (Default is Mailcrab) |
| `REDIS_HOST` | HeyForm | - | Redis Host |
| `REDIS_PORT` | HeyForm | - | Redis Port |
| `SESSION_KEY` | HeyForm | - | Session Secret Key |
| `SMTP_SECURE` | HeyForm | false | Default is false for Mailcrab CHANGE IT later! |
| `TRUST_PROXY` | HeyForm | true | Trust proxy for Railway |
| `NODE_OPTIONS` | HeyForm | --max-old-space-size=2048 | Node Options |
| `S3_PUBLIC_URL` | HeyForm | - | Public base URL used to serve uploaded files (e.g. CDN/custom domain or bucket public URL). Default uses Railway |
| `REDIS_PASSWORD` | HeyForm | (secret) | Redis Password |
| `APP_LISTEN_PORT` | HeyForm | 9157 | App Listen Porst |
| `APP_HOMEPAGE_URL` | HeyForm | - | Default URL |
| `S3_ACCESS_KEY_ID` | HeyForm | - | Access key ID used to authenticate with S3-compatible storage. Required for authenticated bucket access. |
| `VERIFY_USER_EMAIL` | HeyForm | false | Verify user e-mail |
| `APP_LISTEN_HOSTNAME` | HeyForm | 0.0.0.0 | App Listening (Default 0.0.0.0) |
| `FORM_ENCRYPTION_KEY` | HeyForm | - | Ecnryption Key |
| `S3_SECRET_ACCESS_KEY` | HeyForm | (secret) | Secret access key paired with S3_ACCESS_KEY_ID for S3 authentication. Keep this value private. |
| `APP_DISABLE_REGISTRATION` | HeyForm | false | Disable Registration (Change to true after creating first user) |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/heyform-1)
