# Deploy romanovich-school-marketplace on Railway

Pet project romanovich.school. Microservices, Postgres, Kafka, Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/romanovich-school-marketplace)

## About

Marketplace v4 — финальный пет-проект школы [romanovich.school](https://romanovich.school): три Go-сервиса (gateway, catalog, orders), gRPC между ними, Kafka с transactional outbox, Redis-кэш и Postgres в Neon. Шаблон поднимает инфраструктуру, код подключаешь свой.

Шаблон создаёт пять сервисов в одном проекте: Kafka в KRaft-режиме на persistent volume, Redis и три заглушки под твои сервисы, уже связанные приватной сетью и reference-переменными. Свой репозиторий подключаешь одним файлом `.railway/railway.ts` через `railway config apply`, вставляешь три строки Neon Postgres и получаешь стек, который пересобирается на каждый push: ветка `develop` в dev-окружение, `main` в прод. Ни одного адреса в коде, только переменные. Всё укладывается в бесплатный триал: 30 дней, карта не нужна.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | `traefik/whoami:v1.12.0` | Web service |
| kafka | `apache/kafka-native:3.9.2` | Database |
| orders-service | `traefik/whoami:v1.12.0` | Worker |
| redis | `redis:7-alpine` | Database |
| catalog-service | `traefik/whoami:v1.12.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | gateway | - | // |
| `JWT_SECRET` | gateway | (secret) | // |
| `DATABASE_URL` | gateway | - | // |
| `ORDERS_GRPC_ADDR` | gateway | - | // |
| `CATALOG_GRPC_ADDR` | gateway | - | // |
| `CLUSTER_ID` | kafka | - | // |
| `KAFKA_BROKERS` | kafka | - | // |
| `KAFKA_NODE_ID` | kafka | - | // |
| `KAFKA_LOG_DIRS` | kafka | - | // |
| `KAFKA_LISTENERS` | kafka | - | // |
| `KAFKA_PROCESS_ROLES` | kafka | - | // |
| `KAFKA_ADVERTISED_LISTENERS` | kafka | - | // |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | kafka | - | // |
| `KAFKA_AUTO_CREATE_TOPICS_ENABLE` | kafka | - | // |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | kafka | - | // |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | kafka | - | // |
| `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR` | kafka | - | // |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | kafka | - | // |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | kafka | - | // |
| `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` | kafka | - | // |
| `GRPC_ADDR` | orders-service | - | // |
| `REDIS_URL` | orders-service | - | // |
| `DATABASE_URL` | orders-service | - | // |
| `KAFKA_BROKERS` | orders-service | - | // |
| `CATALOG_GRPC_ADDR` | orders-service | - | // |
| `REDIS_URL` | redis | - | // |
| `GRPC_ADDR` | catalog-service | - | // |
| `REDIS_URL` | catalog-service | - | // |
| `DATABASE_URL` | catalog-service | - | // |
| `KAFKA_BROKERS` | catalog-service | - | // |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/kafka/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/romanovich-school-marketplace)
