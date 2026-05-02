# Deploy Meteroid [Updated May '26] on Railway

Meteroid [May '26] (Billing, Subscriptions & Usage-Based Pricing) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meteroid)

## About

Meteroid is an open-source billing and subscription management platform purpose-built for SaaS companies. It is a self-hosted alternative to Stripe Billing, Chargebee, and Zuora that gives you full control over your monetization stack. Built in Rust for high performance, Meteroid can process millions of usage events for real-time metering and billing.

Meteroid supports subscription billing, usage-based pricing, hybrid models, invoicing with tax compliance, coupons, trials, and revenue analytics. Its modern API-first architecture makes it easy to integrate with any application stack while keeping billing logic fully under your control.

Self hosting a billing platform like Meteroid means your customer data, pricing logic, invoices, and revenue metrics stay entirely on infrastructure you control. There is no dependency on third-party billing SaaS providers that may impose usage limits, pricing changes, or data residency restrictions.

Traditionally, self hosting Meteroid requires:

* Deploying and managing PostgreSQL for billing data
* Running ClickHouse for usage analytics
* Operating a Kafka-compatible message broker for event streaming
* Configuring multiple application services with shared secrets
* Managing networking, TLS, and persistent storage

With Railway, all of this complexity is handled automatically. Railway provisions each service, injects environment variables securely, manages persistent volumes, and handles internal networking between services. You deploy once and start configuring billing models immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meteroid-db | `ghcr.io/meteroid-oss/meteroid-postgres:18.3-standard` | Database |
| meteroid-scheduler | `ghcr.io/meteroid-oss/meteroid-scheduler:latest` | Worker |
| meteroid-grpc | `ghcr.io/meteroid-oss/meteroid-api:latest` | Web service |
| kafka | `apache/kafka:latest` | Database |
| metering-api | `ghcr.io/meteroid-oss/metering-api:latest` | Worker |
| clickhouse | `clickhouse/clickhouse-server:25.6.2-alpine` | Database |
| meteroid-api | `ghcr.io/meteroid-oss/meteroid-api:latest` | Web service |
| meteroid-web | [Shinyduo/meteroid-railway](https://github.com/Shinyduo/meteroid-railway) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | meteroid-db | meteroid |
| `POSTGRES_USER` | meteroid-db | (secret) |
| `POSTGRES_PASSWORD` | meteroid-db | (secret) |
| `JWT_SECRET` | meteroid-scheduler | (secret) |
| `SVIX_JWT_TOKEN` | meteroid-scheduler | (secret) |
| `OBJECT_STORE_URI` | meteroid-scheduler | file:///data/object-store |
| `SECRETS_CRYPT_KEY` | meteroid-scheduler | (secret) |
| `INTERNAL_API_SECRET` | meteroid-scheduler | (secret) |
| `ENABLE_MULTI_ORGANIZATION` | meteroid-scheduler | false |
| `METEROID_API_LISTEN_ADDRESS` | meteroid-scheduler | 0.0.0.0:50061 |
| `METEROID_REST_API_LISTEN_ADDRESS` | meteroid-scheduler | 0.0.0.0:8084 |
| `PORT` | meteroid-grpc | 50061 |
| `JWT_SECRET` | meteroid-grpc | (secret) |
| `SVIX_JWT_TOKEN` | meteroid-grpc | (secret) |
| `OBJECT_STORE_URI` | meteroid-grpc | file:///data/object-store |
| `SECRETS_CRYPT_KEY` | meteroid-grpc | (secret) |
| `INTERNAL_API_SECRET` | meteroid-grpc | (secret) |
| `ENABLE_MULTI_ORGANIZATION` | meteroid-grpc | false |
| `METEROID_API_LISTEN_ADDRESS` | meteroid-grpc | 0.0.0.0:50061 |
| `METEROID_REST_API_LISTEN_ADDRESS` | meteroid-grpc | 0.0.0.0:8084 |
| `PORT` | metering-api | 50062 |
| `KAFKA_RAW_TOPIC` | metering-api | meteroid-events-raw |
| `CLICKHOUSE_DATABASE` | metering-api | meteroid |
| `CLICKHOUSE_PASSWORD` | metering-api | (secret) |
| `CLICKHOUSE_USERNAME` | metering-api | (secret) |
| `INTERNAL_API_SECRET` | metering-api | (secret) |
| `CLICKHOUSE_CLUSTER_NAME` | metering-api | meteroid |
| `METERING_API_LISTEN_ADDRESS` | metering-api | 0.0.0.0:50062 |
| `CLICKHOUSE_DB` | clickhouse | meteroid |
| `CLICKHOUSE_USER` | clickhouse | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 1 |
| `PORT` | meteroid-api | 8084 |
| `JWT_SECRET` | meteroid-api | (secret) |
| `SVIX_JWT_TOKEN` | meteroid-api | (secret) |
| `OBJECT_STORE_URI` | meteroid-api | file:///data/object-store |
| `SECRETS_CRYPT_KEY` | meteroid-api | (secret) |
| `INTERNAL_API_SECRET` | meteroid-api | (secret) |
| `ENABLE_MULTI_ORGANIZATION` | meteroid-api | false |
| `METEROID_API_LISTEN_ADDRESS` | meteroid-api | 0.0.0.0:50061 |
| `METEROID_REST_API_LISTEN_ADDRESS` | meteroid-api | 0.0.0.0:8084 |
| `PORT` | meteroid-web | 80 |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/kafka/data`
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/data/object-store`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/meteroid)
