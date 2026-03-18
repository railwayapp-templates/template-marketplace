# Deploy Node.js Starter with Advanced Auth, Prisma, Postgres (pgvector), background jobs and Multimodal RAG + more on Railway

Node.js, Postgres (pgvector), Redis & Prisma Production Starter

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nodejs-multimodal-rag-starter)

## About

The Node.js RAG & Secure Auth Starter is a production-grade boilerplate designed to fast-track secure enterprise systems and AI applications. It comes pre-wired with PostgreSQL, Redis, and Prisma, eliminating configuration headaches. This skeleton serves as the perfect foundation for building complex RAG pipelines, SaaS platforms, and securely authenticated APIs without starting from scratch.

Hosting this template on Railway automatically provisions a complete infrastructure stack. It spins up a Node.js application container alongside managed PostgreSQL (pgvector) and Redis services within a private network.

**Note:** This is the **Infrastructure Skeleton**. It provides the robust architecture (Docker, CI/CD, Jest, Database Models) and the security structure required for modern apps. It is the "clean slate" foundation you need to build secure auth flows and RAG pipelines efficiently, without the DevOps burden.

Want to Upgrade to the Pro Template Version? check this [Tutorial](https://github.com/aymenkani/Node-enterprise-ai-template-light/blob/main/Upgrade_to_Pro.md)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Node-enterprise-ai-template-light | [aymenkani/Node-enterprise-ai-template-light](https://github.com/aymenkani/Node-enterprise-ai-template-light) | Web service |
| db | `pgvector/pgvector:pg18` | Database |
| redis | `redis:7-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DEMO_MODE` | Node-enterprise-ai-template-light | true | Toggle to enable or disable demonstration features and mock data within the application. |
| `REDIS_URL` | Node-enterprise-ai-template-light | - | The connection URL for the Redis service, used by BullMQ for task processing. |
| `SMTP_HOST` | Node-enterprise-ai-template-light | smtp.test.com | The hostname of the SMTP server for Nodemailer. |
| `SMTP_PASS` | Node-enterprise-ai-template-light | user_pass | Password or App Password for SMTP server authentication. |
| `SMTP_PORT` | Node-enterprise-ai-template-light | 587 | The port used for SMTP (typically 587 for TLS). |
| `SMTP_USER` | Node-enterprise-ai-template-light | (secret) | Username for SMTP server authentication. |
| `AWS_REGION` | Node-enterprise-ai-template-light | auto | The physical location of the bucket; 'auto' is required for Cloudflare R2 compatibility. |
| `CLIENT_URL` | Node-enterprise-ai-template-light | - | The production frontend URL, used for generating absolute links in emails. |
| `EMAIL_FROM` | Node-enterprise-ai-template-light | your-email@example.com | The verified sender email address for outgoing system messages. |
| `JWT_SECRET` | Node-enterprise-ai-template-light | (secret) | A long, random string used to sign and verify JSON Web Tokens (JWT). |
| `ADMIN_EMAIL` | Node-enterprise-ai-template-light | admin@example.com | Default email address for the initial administrative account. |
| `CLIENT_HOST` | Node-enterprise-ai-template-light | localhost | Local development host address. |
| `CLIENT_PORT` | Node-enterprise-ai-template-light | 5001 | The port the client application runs on. |
| `AWS_ENDPOINT` | Node-enterprise-ai-template-light | https://<ACCOUNT_ID>.r2.cloudflarestorage.com | The S3-compatible API endpoint for Cloudflare R2 storage. |
| `DATABASE_URL` | Node-enterprise-ai-template-light | - | Connection string using Railway internal networking to connect to the pgvector database service. |
| `AWS_S3_BUCKET` | Node-enterprise-ai-template-light | your_s3_bucket_name | The name of the storage bucket where files will be uploaded. |
| `ADMIN_PASSWORD` | Node-enterprise-ai-template-light | (secret) | Default password for the initial administrative account. |
| `EMAIL_PROVIDER` | Node-enterprise-ai-template-light | SENDGRID | The service used for sending emails (options: NODEMAILER, SENDGRID). |
| `JWT_EXPIRES_IN` | Node-enterprise-ai-template-light | 1d | The general lifespan of the primary JWT. |
| `GOOGLE_CLIENT_ID` | Node-enterprise-ai-template-light | your_google_client_id.apps.googleusercontent.com | Public identifier for the Google OAuth 2.0 application. |
| `SENDGRID_API_KEY` | Node-enterprise-ai-template-light | (secret) | API key for authenticating requests to the SendGrid email service. |
| `AWS_ACCESS_KEY_ID` | Node-enterprise-ai-template-light | your_aws_access_key_id | The access key for AWS S3 or Cloudflare R2 authentication. |
| `SOCKET_CORS_ORIGIN` | Node-enterprise-ai-template-light | - | Comma-separated list of allowed origins for Socket.IO Cross-Origin Resource Sharing. |
| `GOOGLE_CLIENT_SECRET` | Node-enterprise-ai-template-light | (secret) | Private client secret for the Google OAuth 2.0 application. |
| `AWS_SECRET_ACCESS_KEY` | Node-enterprise-ai-template-light | (secret) | The secret key for AWS S3 or Cloudflare R2 authentication. |
| `JWT_RESET_PASSWORD_SECRET` | Node-enterprise-ai-template-light | (secret) | A unique secret key specifically for signing password reset tokens. |
| `JWT_REFRESH_EXPIRATION_DAYS` | Node-enterprise-ai-template-light | 30 | Duration in days before a refresh token expires. |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Node-enterprise-ai-template-light | (secret) | API key for accessing Google's Generative AI (Gemini) features. |
| `JWT_ACCESS_EXPIRATION_MINUTES` | Node-enterprise-ai-template-light | 30 | Duration in minutes before an access token expires. |
| `JWT_VERIFY_EMAIL_EXPIRATION_MINUTES` | Node-enterprise-ai-template-light | 10 | Time window in minutes during which an email verification link remains valid. |
| `JWT_RESET_PASSWORD_EXPIRATION_MINUTES` | Node-enterprise-ai-template-light | (secret) | Time window in minutes during which a password reset link remains valid. |
| `POSTGRES_DB` | db | railway | The name of the default database created when the PostgreSQL container first initializes. |
| `POSTGRES_USER` | db | (secret) | The name of the default superuser created during initialization. |
| `POSTGRES_PASSWORD` | db | (secret) | The superuser password for the PostgreSQL instance, required for the container to start. |
| `REDISHOST` | redis | ${RAILWAY_PRIVATE_DOMAIN} | The private internal host address for Redis. (Auto-filled by Railway). |
| `REDISPORT` | redis | 6379 | The port number Redis is listening on. |
| `REDISUSER` | redis | default | The default Redis username (usually 'default'). |
| `REDIS_URL` | redis | - | The private connection string constructed from the internal domain and credentials. |
| `REDISPASSWORD` | redis | (secret) | The password for the Redis instance. |
| `REDIS_PASSWORD` | redis | (secret) | Alias for REDISPASSWORD, often used by client libraries. |
| `REDIS_PUBLIC_URL` | redis | - | The public connection string accessible from outside Railway (via TCP Proxy). |

## Configuration

- **Start command:** `node dist/server.js`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/`
- **Volume:** `/data`

**Category:** Starters · **Languages:** JavaScript, HTML, TypeScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/nodejs-multimodal-rag-starter)
