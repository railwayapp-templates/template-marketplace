# Deploy Arcnem Vision on Railway

Image analysis and agent workflows with OCR, search, and segmentation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/arcnem-vision)

## About

Arcnem Vision is an open-source platform for image ingestion, analysis, and agent workflows. Upload images through the dashboard or API, build workflows for OCR, descriptions, embeddings, and segmentation, and inspect each run. The dashboard also supports similarity search, document chat, and AI-assisted workflow drafting.

This template deploys nine services: the API, dashboard, workflow agents, MCP analysis tools, PostgreSQL with pgvector, Redis, and a self-hosted Inngest server with its own PostgreSQL and Redis. The application services build from the Arcnem Vision repository using Dockerfiles. The API and dashboard have public Railway domains; internal services communicate over the private network. Database and Redis data use persistent volumes.

Bring an S3-compatible bucket, an OpenAI API key, and a Replicate API token. Fill in the required template variables, including the first owner's email and bucket credentials. The API runs migrations and production bootstrap before deployment, creating the first owner, organization, default project, and starter workflow.

After deployment, allow the dashboard's origin to make GET and PUT requests in your bucket's CORS policy. Open the dashboard and sign in with the owner email. By default, one-time sign-in codes appear in the API deployment logs. Before sharing project access, set AUTH_EMAIL_DELIVERY to resend and provide RESEND_API_KEY and TRANSACTIONAL_EMAIL_ADDRESS so codes are emailed. Public sign-up and organization creation are disabled by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.2` | Database |
| pgvector | `pgvector/pgvector:0.8.6-pg18` | Database |
| inngest-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| inngest-redis | `redis:8.2` | Database |
| inngest | `inngest/inngest:v1.44.0` | Worker |
| vision-api | [arcnem-ai/arcnem-vision](https://github.com/arcnem-ai/arcnem-vision) (root: /server) | Web service |
| vision-agents | [arcnem-ai/arcnem-vision](https://github.com/arcnem-ai/arcnem-vision) (root: /models) | Worker |
| vision-mcp | [arcnem-ai/arcnem-vision](https://github.com/arcnem-ai/arcnem-vision) (root: /models) | Worker |
| vision-dashboard | [arcnem-ai/arcnem-vision](https://github.com/arcnem-ai/arcnem-vision) (root: /server) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | redis | - | Private hostname of this Redis service. |
| `REDISPORT` | redis | 6379 | Port used to connect to Redis. |
| `REDISUSER` | redis | default | Redis username. |
| `REDIS_URL` | redis | - | Redis connection URL over Railway's private network. |
| `REDISPASSWORD` | redis | (secret) | Redis password, linked to this service's generated REDIS_PASSWORD. |
| `REDIS_PASSWORD` | redis | (secret) | Redis password generated automatically when the template is deployed. |
| `POSTGRES_DB` | pgvector | vision | Name of the PostgreSQL database to create. |
| `POSTGRES_USER` | pgvector | (secret) | Username for the PostgreSQL database. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | PostgreSQL password generated automatically when the template is deployed. |
| `POSTGRES_DB` | inngest-postgres | railway | Name of the PostgreSQL database to create. |
| `DATABASE_URL` | inngest-postgres | - | PostgreSQL connection URL over Railway's private network. |
| `POSTGRES_USER` | inngest-postgres | (secret) | Username for the PostgreSQL database. |
| `POSTGRES_PASSWORD` | inngest-postgres | (secret) | PostgreSQL password generated automatically when the template is deployed. |
| `REDISHOST` | inngest-redis | - | Private hostname of this Redis service. |
| `REDISPORT` | inngest-redis | 6379 | Port used to connect to Redis. |
| `REDISUSER` | inngest-redis | default | Redis username. |
| `REDIS_URL` | inngest-redis | - | Redis connection URL over Railway's private network. |
| `REDISPASSWORD` | inngest-redis | (secret) | Redis password, linked to this service's generated REDIS_PASSWORD. |
| `REDIS_PASSWORD` | inngest-redis | (secret) | Redis password generated automatically when the template is deployed. |
| `PORT` | inngest | 8288 | Port this service listens on. |
| `API_SDK_URL` | inngest | - | Private URL of the Vision API's Inngest endpoint. |
| `INNGEST_EVENT_KEY` | inngest | - | Event key shared by Inngest and the connected Vision services. |
| `INNGEST_REDIS_URI` | inngest | - | Private Redis connection URL for Inngest. |
| `INNGEST_SIGNING_KEY` | inngest | - | Signing key shared by Inngest and the connected Vision services. |
| `INNGEST_POSTGRES_URI` | inngest | - | Private PostgreSQL connection URL for Inngest. |
| `PORT` | vision-api | 3000 | Port this service listens on. |
| `REDIS_URL` | vision-api | - | Redis connection URL over Railway's private network. |
| `S3_BUCKET` | vision-api | - | Bucket name. |
| `S3_REGION` | vision-api | auto | Bucket region (auto for R2). |
| `S3_ENDPOINT` | vision-api | - | S3-compatible endpoint, such as https://<account-id>.r2.cloudflarestorage.com |
| `DATABASE_URL` | vision-api | - | PostgreSQL connection URL over Railway's private network. |
| `OPENAI_MODEL` | vision-api | gpt-4.1-mini | OpenAI model used by the Vision API. |
| `INNGEST_APP_ID` | vision-api | arcnem-vision-api | Application identifier used to register this service with Inngest. |
| `MCP_SERVER_URL` | vision-api | - | Private base URL of the Vision MCP service. |
| `OPENAI_API_KEY` | vision-api | (secret) | OpenAI API key, used for descriptions, chat and workflow drafting. |
| `RESEND_API_KEY` | vision-api | (secret) | Resend API key, needed when AUTH_EMAIL_DELIVERY is "resend". |
| `DASHBOARD_ORIGIN` | vision-api | - | Public origin of the Vision dashboard. |
| `INNGEST_BASE_URL` | vision-api | - | Private base URL of the Inngest service. |
| `S3_ACCESS_KEY_ID` | vision-api | - | Access key ID for the bucket. |
| `INNGEST_EVENT_KEY` | vision-api | - | Event key shared by Inngest and the connected Vision services. |
| `S3_USE_PATH_STYLE` | vision-api | true | Use path-style bucket URLs. |
| `BETTER_AUTH_SECRET` | vision-api | (secret) | Authentication secret generated automatically when the template is deployed. |
| `S3_PUBLIC_BASE_URL` | vision-api | - | Public base URL of the bucket, used for documents you publish. |
| `AUTH_EMAIL_DELIVERY` | vision-api | log | How sign-in codes are delivered: "log" writes them to this service's deploy logs, "resend" emails them (set RESEND_API_KEY and TRANSACTIONAL_EMAIL_ADDRESS). |
| `AUTH_ENABLE_SIGN_UP` | vision-api | false | Whether new users can sign up. |
| `INNGEST_SIGNING_KEY` | vision-api | - | Signing key shared by Inngest and the connected Vision services. |
| `BETTER_AUTH_BASE_URL` | vision-api | - | Public base URL used by the Vision API's authentication service. |
| `INNGEST_SERVE_ORIGIN` | vision-api | - | Private origin at which Inngest can reach this service. |
| `S3_SECRET_ACCESS_KEY` | vision-api | (secret) | Secret access key for the bucket. |
| `BOOTSTRAP_OWNER_EMAIL` | vision-api | - | Email of the first owner. They sign in with a one-time code. |
| `BOOTSTRAP_ORGANIZATION_NAME` | vision-api | My Organization | Name of the first organization. |
| `TRANSACTIONAL_EMAIL_ADDRESS` | vision-api | - | Sender address for sign-in emails, needed when AUTH_EMAIL_DELIVERY is "resend". |
| `WEBHOOK_SECRET_ENCRYPTION_KEY` | vision-api | (secret) | Generated key used to encrypt webhook secrets. |
| `AUTH_ENABLE_ORGANIZATION_CREATION` | vision-api | false | Whether users can create additional organizations. |
| `PORT` | vision-agents | 3020 | Port this service listens on. |
| `REDIS_URL` | vision-agents | - | Redis connection URL over Railway's private network. |
| `S3_BUCKET` | vision-agents | - | Bucket name shared from vision-api. Configure it on vision-api. |
| `S3_REGION` | vision-agents | - | Bucket region shared from vision-api, using auto for R2. |
| `ENVIRONMENT` | vision-agents | production | Runtime environment for this service. |
| `S3_ENDPOINT` | vision-agents | - | S3-compatible endpoint shared from vision-api. Configure it on vision-api. |
| `DATABASE_URL` | vision-agents | - | PostgreSQL connection URL over Railway's private network. |
| `INNGEST_APP_ID` | vision-agents | arcnem-vision-agents | Application identifier used to register this service with Inngest. |
| `MCP_SERVER_URL` | vision-agents | - | Private base URL of the Vision MCP service. |
| `OPENAI_API_KEY` | vision-agents | (secret) | OpenAI API key shared from vision-api. Configure it on vision-api. |
| `INNGEST_BASE_URL` | vision-agents | - | Private base URL of the Inngest service. |
| `S3_ACCESS_KEY_ID` | vision-agents | - | Bucket access key ID shared from vision-api. Configure it on vision-api. |
| `INNGEST_EVENT_KEY` | vision-agents | - | Event key shared by Inngest and the connected Vision services. |
| `S3_USE_PATH_STYLE` | vision-agents | - | Whether to use path-style bucket URLs, shared from vision-api. |
| `INNGEST_SIGNING_KEY` | vision-agents | - | Signing key shared by Inngest and the connected Vision services. |
| `INNGEST_SERVE_ORIGIN` | vision-agents | - | Private origin at which Inngest can reach this service. |
| `S3_SECRET_ACCESS_KEY` | vision-agents | (secret) | Bucket secret access key shared from vision-api. Configure it on vision-api. |
| `PORT` | vision-mcp | 3021 | Port this service listens on. |
| `REDIS_URL` | vision-mcp | - | Redis connection URL over Railway's private network. |
| `S3_BUCKET` | vision-mcp | - | Bucket name shared from vision-api. Configure it on vision-api. |
| `S3_REGION` | vision-mcp | - | Bucket region shared from vision-api, using auto for R2. |
| `ENVIRONMENT` | vision-mcp | production | Runtime environment for this service. |
| `S3_ENDPOINT` | vision-mcp | - | S3-compatible endpoint shared from vision-api. Configure it on vision-api. |
| `DATABASE_URL` | vision-mcp | - | PostgreSQL connection URL over Railway's private network. |
| `OPENAI_API_KEY` | vision-mcp | (secret) | OpenAI API key shared from vision-api. Configure it on vision-api. |
| `S3_ACCESS_KEY_ID` | vision-mcp | - | Bucket access key ID shared from vision-api. Configure it on vision-api. |
| `S3_USE_PATH_STYLE` | vision-mcp | - | Whether to use path-style bucket URLs, shared from vision-api. |
| `REPLICATE_API_TOKEN` | vision-mcp | (secret) | Replicate API token, used for embeddings and segmentation. |
| `S3_SECRET_ACCESS_KEY` | vision-mcp | (secret) | Bucket secret access key shared from vision-api. Configure it on vision-api. |
| `PORT` | vision-dashboard | 3001 | Port this service listens on. |
| `API_URL` | vision-dashboard | - | Private base URL of the Vision API used by the dashboard. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'exec inngest start --poll-interval 60 --sdk-url "$API_SDK_URL"'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, Go, Makefile, MDX, Dockerfile, CSS, Starlark, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/arcnem-vision)
