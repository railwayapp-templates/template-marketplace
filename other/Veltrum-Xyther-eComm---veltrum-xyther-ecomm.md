# Deploy Veltrum-Xyther (eComm) on Railway

Agentic eCommerce template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/veltrum-xyther-ecomm)

## About

Veltrum Xyther is an AI-native commerce platform that enables brands to automate operations, marketing, customer support, logistics, finance, and inventory through specialized AI agents. Deploying Xyther on Railway provides a production-ready environment to run the backend APIs, AI orchestration layer, databases, background workers, webhooks, and integrations from a single platform. Railway handles infrastructure provisioning, networking, deployments, environment variables, and scaling, allowing teams to focus on building commerce workflows instead of managing DevOps.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backend | [Veltrum-io/AgenticComm](https://github.com/Veltrum-io/AgenticComm) (root: services/backend) | Web service |
| Frontend | [Veltrum-io/AgenticComm](https://github.com/Veltrum-io/AgenticComm) | Web service |
| Connectors | [Veltrum-io/AgenticComm](https://github.com/Veltrum-io/AgenticComm) (root: services/connectors) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Backend | 8080 |
| `CRON_SECRET` | Backend | (secret) |
| `ENVIRONMENT` | Backend | production |
| `DATABASE_URL` | Backend | postgresql://postgres:iGSwQVhIDBYyEzesLjcVwlVxCLwMVqAM@postgres-hjus.railway.internal:5432/railway |
| `PUBLIC_APP_URL` | Backend | https://app.veltrum.io |
| `RESEND_API_KEY` | Backend | (secret) |
| `CASHFREE_APP_ID` | Backend | 1287458320d3507f623c22374538547821 |
| `CONVERZ_API_KEY` | Backend | (secret) |
| `CONVERZ_API_URL` | Backend | https://converz-dograh-api-824171978941.europe-west1.run.app |
| `OPENROUTER_MODEL` | Backend | anthropic/claude-sonnet-4-5 |
| `CALLSENSE_API_KEY` | Backend | (secret) |
| `APP_ENCRYPTION_KEY` | Backend | Q1U8U3KCK0OMH7QdyEbFS5OQNaKSXSMSh1r4lV4w910= |
| `CALLSENSE_BASE_URL` | Backend | https://api.converz.io |
| `CASHFREE_PG_APP_ID` | Backend | 1287458320d3507f623c22374538547821 |
| `CONVERZ_AGENT_NAME` | Backend | Rohit |
| `OPENROUTER_API_KEY` | Backend | (secret) |
| `CASHFREE_SECRET_KEY` | Backend | (secret) |
| `INTERNAL_API_SECRET` | Backend | (secret) |
| `CASHFREE_PG_BASE_URL` | Backend | https://api.cashfree.com/pg |
| `CASHFREE_PG_SECRET_KEY` | Backend | (secret) |
| `SQS_WORKFLOW_QUEUE_URL` | Backend | https://sqs.ap-south-2.amazonaws.com/648597472803/xyther-notification-handler-prod |
| `CASHFREE_WEBHOOK_SECRET` | Backend | (secret) |
| `OPENROUTER_MANAGEMENT_KEY` | Backend | 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 |
| `CASHFREE_SUBSCRIPTION_BASE` | Backend | https://api.cashfree.com/pg |
| `AUTH_URL` | Frontend | https://app.veltrum.io |
| `ADMIN_EMAIL` | Frontend | aditya@veltrum.io |
| `AUTH_SECRET` | Frontend | (secret) |
| `CRON_SECRET` | Frontend | (secret) |
| `META_APP_ID` | Frontend | 1663311978096759 |
| `AUTH0_ISSUER` | Frontend | https://dev-veltrum.us.auth0.com/ |
| `DATABASE_URL` | Frontend | postgresql://postgres:iGSwQVhIDBYyEzesLjcVwlVxCLwMVqAM@postgres-hjus.railway.internal:5432/railway |
| `ADMIN_PASSWORD` | Frontend | (secret) |
| `PUBLIC_APP_URL` | Frontend | https://app.veltrum.io |
| `RESEND_API_KEY` | Frontend | (secret) |
| `ZOHO_CLIENT_ID` | Frontend | 1000.RALYX2UFU8P9P8DSBGK0VK3DDEIZHY |
| `AUTH0_CLIENT_ID` | Frontend | ZsTZWY5Iqn7QE7Au6ngVEQIken4JEl8n |
| `GMAIL_CLIENT_ID` | Frontend | 227542226322-r8c3rm3sml0otm63t55n9fnc6hk5srql.apps.googleusercontent.com |
| `META_APP_SECRET` | Frontend | (secret) |
| `INSTAGRAM_APP_ID` | Frontend | 1721602402345290 |
| `OLA_MAPS_API_KEY` | Frontend | (secret) |
| `META_REDIRECT_URI` | Frontend | https://app.veltrum.io/api/tools/meta/callback |
| `APP_ENCRYPTION_KEY` | Frontend | Q1U8U3KCK0OMH7QdyEbFS5OQNaKSXSMSh1r4lV4w910= |
| `OPENROUTER_API_KEY` | Frontend | (secret) |
| `POLLINATIONS_MODEL` | Frontend | flux |
| `WHATSAPP_CONFIG_ID` | Frontend | 1853486092011956 |
| `ZOHO_ACCOUNTS_BASE` | Frontend | https://accounts.zoho.in |
| `ZOHO_CLIENT_SECRET` | Frontend | (secret) |
| `AUTH0_CLIENT_SECRET` | Frontend | (secret) |
| `GMAIL_CLIENT_SECRET` | Frontend | (secret) |
| `INTERNAL_API_SECRET` | Frontend | (secret) |
| `INSTAGRAM_APP_SECRET` | Frontend | (secret) |
| `META_LOGIN_CONFIG_ID` | Frontend | (secret) |
| `POLLINATIONS_API_KEY` | Frontend | (secret) |
| `INSTAGRAM_REDIRECT_URI` | Frontend | https://app.veltrum.io/api/tools/instagram/callback |
| `NEXT_PUBLIC_INVITE_CODE` | Frontend | XYTHERINVITE |
| `META_WEBHOOK_VERIFY_TOKEN` | Frontend | (secret) |
| `OPENROUTER_MANAGEMENT_KEY` | Frontend | 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 |
| `AWS_REGION` | Connectors | ap-south-2 |
| `ENVIRONMENT` | Connectors | production |
| `META_APP_ID` | Connectors | 1663311978096759 |
| `DATABASE_URL` | Connectors | postgresql://postgres:iGSwQVhIDBYyEzesLjcVwlVxCLwMVqAM@postgres-hjus.railway.internal:5432/railway |
| `SQS_QUEUE_URL` | Connectors | https://sqs.ap-south-2.amazonaws.com/648597472803/xyther-shopify-autosync-prod.fifo |
| `PUBLIC_APP_URL` | Connectors | https://app.veltrum.io |
| `ZOHO_CLIENT_ID` | Connectors | 1000.RALYX2UFU8P9P8DSBGK0VK3DDEIZHY |
| `META_APP_SECRET` | Connectors | (secret) |
| `BACKEND_BASE_URL` | Connectors | https://backend-prod-new.up.railway.app |
| `INSTAGRAM_APP_ID` | Connectors | 1721602402345290 |
| `AWS_ACCESS_KEY_ID` | Connectors | AKIAZOA3MAYR6ZKJGEOU |
| `META_REDIRECT_URI` | Connectors | https://app.veltrum.io/api/tools/meta/callback |
| `APP_ENCRYPTION_KEY` | Connectors | Q1U8U3KCK0OMH7QdyEbFS5OQNaKSXSMSh1r4lV4w910= |
| `ZOHO_ACCOUNTS_BASE` | Connectors | https://accounts.zoho.in |
| `ZOHO_CLIENT_SECRET` | Connectors | (secret) |
| `AMAZON_CALLBACK_URI` | Connectors | https://app.veltrum.ai/api/integrations/amazon/callback |
| `INTERNAL_API_SECRET` | Connectors | (secret) |
| `AMAZON_LWA_CLIENT_ID` | Connectors | amzn1.application-oa2-client.13685d0ea8ea4a95a6ab20e1a29f2aa2 |
| `INSTAGRAM_APP_SECRET` | Connectors | (secret) |
| `WS_SECRET_ACCESS_KEY` | Connectors | (secret) |
| `AMAZON_APPLICATION_ID` | Connectors | amzn1.sp.solution.148e43c0-a7a2-4ab2-830d-7207c18a8a64 |
| `AWS_SECRET_ACCESS_KEY` | Connectors | (secret) |
| `SQS_WORKFLOW_QUEUE_URL` | Connectors | https://sqs.ap-south-2.amazonaws.com/648597472803/xyther-notification-handler-prod |
| `AMAZON_LWA_CLIENT_SECRET` | Connectors | (secret) |
| `META_WEBHOOK_VERIFY_TOKEN` | Connectors | (secret) |

## Configuration

- **Start command:** `sh -c 'cd services/backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT --workers 2'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `npm run db:migrate && (npm run db:seed:carriers || true) && npm start`
- **Healthcheck:** `/api/healthz`

**Category:** Other · **Languages:** TypeScript, HTML, Python, PLpgSQL, Shell, JavaScript, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/veltrum-xyther-ecomm)
