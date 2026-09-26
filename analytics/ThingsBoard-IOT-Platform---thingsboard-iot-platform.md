# Deploy ThingsBoard: IOT Platform on Railway

Self-host IoT platform: device telemetry, MQTT, HTTP, dashboards, alerts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/thingsboard-iot-platform)

## About

ThingsBoard is an open-source IoT platform for device connectivity, data collection, processing, visualization, and device management. This template deploys a production-ready stack of ThingsBoard, PostgreSQL, and Apache Kafka, wired over private networking, so you get a restart-safe IoT backend in one click.

**Important:** ThingsBoard deploys with default admin passwords. Change them right after your first login. See **First-run setup** under Implementation Details below.

ThingsBoard connects devices over MQTT and HTTP, routes their telemetry through a rule engine, stores it in PostgreSQL, and renders it on customizable dashboards. A production deployment runs three coordinated services: the ThingsBoard node, a PostgreSQL database for entities and time-series data, and a Kafka broker for a durable message queue (the default in-memory queue loses in-flight data on restart). These services need private networking, persistent volumes, and the correct startup order. This template handles all of it: a single-broker Kafka in KRaft mode (no ZooKeeper), automatic schema installation on first boot, MQTT over TLS with a certificate created for your deployment, a healthcheck, and connection strings wired with reference variables, so you skip the assembly and debugging.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kafka | `apache/kafka:4.3.1` | Database |
| thingsboard | `thingsboard/tb-node:4.3.1.5` | TCP service |
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
| `TB_QUEUE_TYPE` | thingsboard | kafka | [Do not change] Message queue type. |
| `HTTP_BIND_PORT` | thingsboard | 8080 | [Do not change] Port the web UI and REST API listen on. |
| `MQTT_BIND_PORT` | thingsboard | 1883 | [Do not change] Plain MQTT port, reachable only on the private network. |
| `TB_SERVICE_TYPE` | thingsboard | monolith | [Do not change] Runs ThingsBoard as a single node. |
| `DATABASE_TS_TYPE` | thingsboard | sql | [Do not change] Stores time-series telemetry in Postgres. |
| `MQTT_SSL_ENABLED` | thingsboard | true | Turns on the MQTT over TLS (MQTTS) listener. |
| `MQTT_SSL_PEM_KEY` | thingsboard | /data/mqtt-tls/server.key | [Do not change] MQTTS server private key, created on first boot. |
| `TB_KAFKA_SERVERS` | thingsboard | - | [Do not change] Kafka broker address on the private network. |
| `HTTP_BIND_ADDRESS` | thingsboard | 0.0.0.0 | [Do not change] Address the web UI and REST API bind to. |
| `MQTT_BIND_ADDRESS` | thingsboard | 0.0.0.0 | [Do not change] Address the plain MQTT listener binds to. |
| `MQTT_SSL_PEM_CERT` | thingsboard | /data/mqtt-tls/server.pem | [Do not change] MQTTS server certificate chain, created on first boot. |
| `MQTT_SSL_BIND_PORT` | thingsboard | 8883 | [Do not change] MQTTS listener port, the TCP proxy's target. |
| `SPRING_DATASOURCE_URL` | thingsboard | - | [Do not change] Postgres connection URL, from the Postgres service. |
| `SPRING_DATASOURCE_PASSWORD` | thingsboard | (secret) | [Do not change] Postgres password, from the Postgres service. |
| `SPRING_DATASOURCE_USERNAME` | thingsboard | (secret) | [Do not change] Postgres user, from the Postgres service. |
| `DEVICE_CONNECTIVITY_MQTTS_HOST` | thingsboard | - | Hostname devices connect to over MQTTS. The certificate is reissued for this name on the next deploy. |
| `DEVICE_CONNECTIVITY_MQTTS_PORT` | thingsboard | - | Port devices connect to over MQTTS. |
| `DEVICE_CONNECTIVITY_MQTT_ENABLED` | thingsboard | false | Shows plain MQTT commands in Check connectivity. Plain MQTT is private-network only. |
| `DEVICE_CONNECTIVITY_MQTTS_ENABLED` | thingsboard | true | Shows MQTTS commands in Check connectivity. |
| `TB_QUEUE_KAFKA_REPLICATION_FACTOR` | thingsboard | 1 | [Do not change] Replication factor for ThingsBoard's Kafka topics (single broker). |
| `TB_QUEUE_KAFKA_USE_CONFLUENT_CLOUD` | thingsboard | false | [Do not change] Uses the bundled Kafka, not Confluent Cloud. |
| `DEVICE_CONNECTIVITY_MQTTS_CA_ROOT_CERT` | thingsboard | /data/mqtt-tls/ca.pem | [Do not change] CA certificate devices trust, created on first boot. |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Volume:** `/var/lib/kafka/data`
- **Start command:** `/bin/bash -c 'T=/data/mqtt-tls; H="${DEVICE_CONNECTIVITY_MQTTS_HOST:-${RAILWAY_TCP_PROXY_DOMAIN:-${RAILWAY_PRIVATE_DOMAIN:-localhost}}}"; S="DNS:$H"; [ -n "$RAILWAY_PRIVATE_DOMAIN" ] && [ "$RAILWAY_PRIVATE_DOMAIN" != "$H" ] && S="$S,DNS:$RAILWAY_PRIVATE_DOMAIN"; mkdir -p $T; if [ ! -s $T/ca.pem ] || [ ! -s $T/ca.key ]; then openssl req -x509 -newkey rsa:2048 -nodes -sha256 -days 3650 -subj "/CN=ThingsBoard MQTT CA" -addext "basicConstraints=critical,CA:TRUE" -addext "keyUsage=critical,keyCertSign,cRLSign" -keyout $T/ca.key -out $T/ca.pem 2>/dev/null || { echo "MQTTS CA generation failed" >&2; exit 1; }; rm -f $T/server.pem; fi; if [ ! -s $T/server.pem ] || ! openssl x509 -in $T/server.pem -noout -checkend 2592000 >/dev/null || ! openssl x509 -in $T/server.pem -noout -ext subjectAltName | grep -qF "DNS:$H"; then openssl req -new -newkey rsa:2048 -nodes -subj "/CN=$H" -keyout $T/server.key -out $T/server.csr 2>/dev/null && openssl x509 -req -sha256 -days 825 -in $T/server.csr -CA $T/ca.pem -CAkey $T/ca.key -CAcreateserial -extfile <(printf "subjectAltName=%s\nbasicConstraints=critical,CA:FALSE\nkeyUsage=critical,digitalSignature,keyEncipherment\nextendedKeyUsage=serverAuth\nsubjectKeyIdentifier=hash\nauthorityKeyIdentifier=keyid\n" "$S") -out $T/server.crt 2>/dev/null && cat $T/server.crt $T/ca.pem > $T/server.pem || { echo "MQTTS certificate generation failed" >&2; exit 1; }; echo "MQTTS certificate issued for $S"; fi; echo "MQTTS CA $(openssl x509 -in $T/ca.pem -noout -fingerprint -sha256)"; echo "waiting for postgres $PG_HOST:$PG_PORT..."; until (echo > /dev/tcp/$PG_HOST/$PG_PORT) 2>/dev/null; do sleep 3; done; echo "postgres reachable"; if [ ! -f /data/.tb_installed ]; then if ( INSTALL_TB=true exec start-tb-node.sh ); then touch /data/.tb_installed; else echo "TB install failed" >&2; exit 1; fi; fi; exec start-tb-node.sh'`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8883
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/thingsboard-iot-platform)
