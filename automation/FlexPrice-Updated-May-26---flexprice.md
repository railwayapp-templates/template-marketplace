# Deploy FlexPrice [Updated May '26] on Railway

FlexPrice [May '26] (Usage-Based Billing, Metering & Invoicing) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flexprice)

## About

FlexPrice is an open-source usage-based pricing and billing platform built in Go for SaaS and AI-native companies. It handles real-time usage metering, subscription management, credit systems, feature gating, and automated invoicing — giving developers full control over complex monetization models without vendor lock-in. FlexPrice is a self-hosted alternative to Stripe Billing, Orb, and Chargebee.

Self hosting FlexPrice means your billing data, usage events, invoices, and revenue metrics stay entirely on infrastructure you control. There is no dependency on third-party billing SaaS providers that may impose usage limits or per-transaction fees. With Railway, all infrastructure complexity is handled automatically — service provisioning, private networking, persistent volumes, and database migrations run on each deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flexprice-consumer | [Shinyduo/flexprice-railway](https://github.com/Shinyduo/flexprice-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| flexprice-api | [Shinyduo/flexprice-railway](https://github.com/Shinyduo/flexprice-railway) | Web service |
| clickhouse | `clickhouse/clickhouse-server:24.9-alpine` | Database |
| flexprice-web | [Shinyduo/flexprice-front](https://github.com/Shinyduo/flexprice-front) | Web service |
| flexprice-worker | [Shinyduo/flexprice-railway](https://github.com/Shinyduo/flexprice-railway) | Worker |
| kafka-new | `apache/kafka:latest` | Database |
| temporal | `temporalio/auto-setup:1.26.2` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `FLEXPRICE_AUTH_SECRET` | flexprice-consumer | (secret) |
| `FLEXPRICE_KAFKA_TOPIC` | flexprice-consumer | events |
| `FLEXPRICE_AUTH_PROVIDER` | flexprice-consumer | flexprice |
| `FLEXPRICE_CACHE_ENABLED` | flexprice-consumer | false |
| `FLEXPRICE_EMAIL_ENABLED` | flexprice-consumer | false |
| `FLEXPRICE_POSTGRES_PORT` | flexprice-consumer | 5432 |
| `FLEXPRICE_POSTGRES_USER` | flexprice-consumer | (secret) |
| `FLEXPRICE_KAFKA_USE_SASL` | flexprice-consumer | false |
| `FLEXPRICE_SENTRY_ENABLED` | flexprice-consumer | false |
| `FLEXPRICE_DEPLOYMENT_MODE` | flexprice-consumer | consumer |
| `FLEXPRICE_DYNAMODB_IN_USE` | flexprice-consumer | false |
| `FLEXPRICE_POSTGRES_DBNAME` | flexprice-consumer | railway |
| `FLEXPRICE_KAFKA_TOPIC_LAZY` | flexprice-consumer | events_lazy |
| `FLEXPRICE_POSTGRES_SSLMODE` | flexprice-consumer | disable |
| `FLEXPRICE_TEMPORAL_ENABLED` | flexprice-consumer | true |
| `FLEXPRICE_AUTH_API_KEY_KEYS` | flexprice-consumer | (secret) |
| `FLEXPRICE_POSTGRES_PASSWORD` | flexprice-consumer | (secret) |
| `FLEXPRICE_PYROSCOPE_ENABLED` | flexprice-consumer | false |
| `FLEXPRICE_AUTH_API_KEY_HEADER` | flexprice-consumer | (secret) |
| `FLEXPRICE_CLICKHOUSE_DATABASE` | flexprice-consumer | flexprice |
| `FLEXPRICE_CLICKHOUSE_PASSWORD` | flexprice-consumer | (secret) |
| `FLEXPRICE_CLICKHOUSE_USERNAME` | flexprice-consumer | (secret) |
| `FLEXPRICE_KAFKA_CONSUMER_GROUP` | flexprice-consumer | events_consumer |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_TOPIC` | flexprice-consumer | raw_events |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_ENABLED` | flexprice-consumer | true |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_RATE_LIMIT` | flexprice-consumer | 100 |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_OUTPUT_TOPIC` | flexprice-consumer | events |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_CONSUMER_GROUP` | flexprice-consumer | raw_events_consumer |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | flexprice-api | 8080 |
| `FLEXPRICE_AUTH_SECRET` | flexprice-api | (secret) |
| `FLEXPRICE_KAFKA_TOPIC` | flexprice-api | events |
| `FLEXPRICE_AUTH_PROVIDER` | flexprice-api | flexprice |
| `FLEXPRICE_CACHE_ENABLED` | flexprice-api | false |
| `FLEXPRICE_EMAIL_ENABLED` | flexprice-api | false |
| `FLEXPRICE_POSTGRES_PORT` | flexprice-api | 5432 |
| `FLEXPRICE_POSTGRES_USER` | flexprice-api | (secret) |
| `FLEXPRICE_KAFKA_USE_SASL` | flexprice-api | false |
| `FLEXPRICE_SENTRY_ENABLED` | flexprice-api | false |
| `FLEXPRICE_SERVER_ADDRESS` | flexprice-api | :8080 |
| `FLEXPRICE_DEPLOYMENT_MODE` | flexprice-api | api |
| `FLEXPRICE_DYNAMODB_IN_USE` | flexprice-api | false |
| `FLEXPRICE_POSTGRES_DBNAME` | flexprice-api | railway |
| `FLEXPRICE_KAFKA_TOPIC_LAZY` | flexprice-api | events_lazy |
| `FLEXPRICE_POSTGRES_SSLMODE` | flexprice-api | disable |
| `FLEXPRICE_TEMPORAL_ENABLED` | flexprice-api | true |
| `FLEXPRICE_AUTH_API_KEY_KEYS` | flexprice-api | (secret) |
| `FLEXPRICE_POSTGRES_PASSWORD` | flexprice-api | (secret) |
| `FLEXPRICE_PYROSCOPE_ENABLED` | flexprice-api | false |
| `FLEXPRICE_AUTH_API_KEY_HEADER` | flexprice-api | (secret) |
| `FLEXPRICE_CLICKHOUSE_DATABASE` | flexprice-api | flexprice |
| `FLEXPRICE_CLICKHOUSE_PASSWORD` | flexprice-api | (secret) |
| `FLEXPRICE_CLICKHOUSE_USERNAME` | flexprice-api | (secret) |
| `FLEXPRICE_KAFKA_CONSUMER_GROUP` | flexprice-api | events_consumer |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_TOPIC` | flexprice-api | raw_events |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_ENABLED` | flexprice-api | true |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_RATE_LIMIT` | flexprice-api | 100 |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_OUTPUT_TOPIC` | flexprice-api | events |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_CONSUMER_GROUP` | flexprice-api | raw_events_consumer |
| `CLICKHOUSE_DB` | clickhouse | flexprice |
| `CLICKHOUSE_USER` | clickhouse | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 1 |
| `PORT` | flexprice-web | 3000 |
| `VITE_ENVIRONMENT` | flexprice-web | self-hosted |
| `FLEXPRICE_AUTH_SECRET` | flexprice-worker | (secret) |
| `FLEXPRICE_KAFKA_TOPIC` | flexprice-worker | events |
| `FLEXPRICE_AUTH_PROVIDER` | flexprice-worker | flexprice |
| `FLEXPRICE_CACHE_ENABLED` | flexprice-worker | false |
| `FLEXPRICE_EMAIL_ENABLED` | flexprice-worker | false |
| `FLEXPRICE_POSTGRES_PORT` | flexprice-worker | 5432 |
| `FLEXPRICE_POSTGRES_USER` | flexprice-worker | (secret) |
| `FLEXPRICE_KAFKA_USE_SASL` | flexprice-worker | false |
| `FLEXPRICE_SENTRY_ENABLED` | flexprice-worker | false |
| `FLEXPRICE_DEPLOYMENT_MODE` | flexprice-worker | temporal_worker |
| `FLEXPRICE_DYNAMODB_IN_USE` | flexprice-worker | false |
| `FLEXPRICE_POSTGRES_DBNAME` | flexprice-worker | railway |
| `FLEXPRICE_KAFKA_TOPIC_LAZY` | flexprice-worker | events_lazy |
| `FLEXPRICE_POSTGRES_SSLMODE` | flexprice-worker | disable |
| `FLEXPRICE_TEMPORAL_ENABLED` | flexprice-worker | true |
| `FLEXPRICE_AUTH_API_KEY_KEYS` | flexprice-worker | (secret) |
| `FLEXPRICE_POSTGRES_PASSWORD` | flexprice-worker | (secret) |
| `FLEXPRICE_PYROSCOPE_ENABLED` | flexprice-worker | false |
| `FLEXPRICE_AUTH_API_KEY_HEADER` | flexprice-worker | (secret) |
| `FLEXPRICE_CLICKHOUSE_DATABASE` | flexprice-worker | flexprice |
| `FLEXPRICE_CLICKHOUSE_PASSWORD` | flexprice-worker | (secret) |
| `FLEXPRICE_CLICKHOUSE_USERNAME` | flexprice-worker | (secret) |
| `FLEXPRICE_KAFKA_CONSUMER_GROUP` | flexprice-worker | events_consumer |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_TOPIC` | flexprice-worker | raw_events |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_ENABLED` | flexprice-worker | true |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_RATE_LIMIT` | flexprice-worker | 100 |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_OUTPUT_TOPIC` | flexprice-worker | events |
| `FLEXPRICE_RAW_EVENT_CONSUMPTION_CONSUMER_GROUP` | flexprice-worker | raw_events_consumer |
| `DB` | temporal | postgres12 |
| `DB_NAME` | temporal | temporal |
| `DB_PORT` | temporal | 5432 |
| `DB_USER` | temporal | (secret) |
| `ENABLE_ES` | temporal | false |
| `POSTGRES_USER` | temporal | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/kafka/data`

**Category:** Automation · **Languages:** Dockerfile, TypeScript, Shell, CSS, JavaScript, PowerShell, HTML

[View on Railway →](https://railway.com/deploy/flexprice)
