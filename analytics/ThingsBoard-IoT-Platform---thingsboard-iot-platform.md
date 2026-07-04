# Deploy ThingsBoard IoT Platform on Railway

Production-grade stack: ThingsBoard + Kafka + PostgreSQL. HTTP & MQTT.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/thingsboard-iot-platform)

## About

ThingsBoard is an open-source IoT platform for device connectivity, data collection, processing, visualization, and device management. This template deploys a production-ready stack of ThingsBoard, PostgreSQL, and Apache Kafka, wired over private networking, so you get a restart-safe IoT backend in one click.

&gt; **Important:** ThingsBoard deploys with default admin passwords. Change them right after your first login. See **First-run setup** under Implementation Details below.

ThingsBoard connects devices over MQTT and HTTP, routes their telemetry through a rule engine, stores it in PostgreSQL, and renders it on customizable dashboards. A production deployment runs three coordinated services: the ThingsBoard node, a PostgreSQL database for entities and time-series data, and a Kafka broker for a durable message queue (the default in-memory queue loses in-flight data on restart). These services need private networking, persistent volumes, and the correct startup order. This template handles all of it: a single-broker Kafka in KRaft mode (no ZooKeeper), automatic schema installation on first boot, a healthcheck, and connection strings wired with reference variables, so you skip the assembly and debugging.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kafka | `apache/kafka:4.3.1` | Database |
| thingsboard | `thingsboard/tb-node:4.3.1.3` | TCP service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KAFKA_NODE_ID` | kafka | 1 | - |
| `KAFKA_LOG_DIRS` | kafka | /var/lib/kafka/data/kafka-logs | - |
| `KAFKA_HEAP_OPTS` | kafka | -Xmx1G -Xms1G | - |
| `KAFKA_LISTENERS` | kafka | PLAINTEXT://[::]:9092,CONTROLLER://[::]:9093 | - |
| `KAFKA_PROCESS_ROLES` | kafka | broker,controller | - |
| `KAFKA_LOG4J_ROOT_LOGLEVEL` | kafka | WARN | WARN is to prevent dropping logs exceeding Railway rate limit |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | kafka | 1@localhost:9093 | - |
| `KAFKA_AUTO_CREATE_TOPICS_ENABLE` | kafka | false | - |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | kafka | CONTROLLER | - |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | kafka | PLAINTEXT | - |
| `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR` | kafka | 1 | - |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | kafka | CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT | - |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | kafka | 1 | - |
| `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` | kafka | 1 | - |
| `PORT` | thingsboard | - | Required for healthcheck |
| `PG_HOST` | thingsboard | - | Required to wait for Postgres at startup |
| `PG_PORT` | thingsboard | - | Required to wait for Postgres at startup |
| `LOAD_DEMO` | thingsboard | - | (true/false) Set to `true` (lowercase) to load demo data on the first deploy. |
| `REF_BASE_URL` | thingsboard | - | Copy into ThingsBoard -> System Settings -> General -> Base URL. |
| `TB_QUEUE_TYPE` | thingsboard | kafka | - |
| `HTTP_BIND_PORT` | thingsboard | 8080 | - |
| `MQTT_BIND_PORT` | thingsboard | 1883 | - |
| `TB_SERVICE_TYPE` | thingsboard | monolith | - |
| `DATABASE_TS_TYPE` | thingsboard | sql | - |
| `HTTP_BIND_ADDRESS` | thingsboard | 0.0.0.0 | - |
| `MQTT_BIND_ADDRESS` | thingsboard | 0.0.0.0 | - |
| `SPRING_DATASOURCE_PASSWORD` | thingsboard | (secret) | - |
| `SPRING_DATASOURCE_USERNAME` | thingsboard | (secret) | - |
| `TB_QUEUE_KAFKA_REPLICATION_FACTOR` | thingsboard | 1 | - |
| `TB_QUEUE_KAFKA_USE_CONFLUENT_CLOUD` | thingsboard | false | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Volume:** `/var/lib/kafka/data`
- **Start command:** `/bin/bash -c 'echo "waiting for postgres $PG_HOST:$PG_PORT..."; until (echo > /dev/tcp/$PG_HOST/$PG_PORT) 2>/dev/null; do sleep 3; done; echo "postgres reachable"; if [ ! -f /data/.tb_installed ]; then if ( INSTALL_TB=true exec start-tb-node.sh ); then touch /data/.tb_installed; else echo "TB install failed" >&2; exit 1; fi; fi; exec start-tb-node.sh'`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 1883
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/thingsboard-iot-platform)
