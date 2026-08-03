# Deploy Opik observability on Railway

Evaluation Opik observability with protected access and durable storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opik-observability)

## About

Opik is an open-source LLM evaluation and observability platform for tracing prompts, models, agents, experiments, and feedback. This template deploys the full evaluation topology with a shared Basic Auth gateway and private data services.

The template runs the Opik frontend, backend, and evaluator with MySQL, Redis, ClickHouse, ZooKeeper, and a Railway Bucket. First boot applies upstream migrations automatically. Railway generates the shared gateway password and every datastore credential.

This template is intentionally evaluation-only: Opik OSS has no native users, roles, or API keys, and its upstream Compose topology is not the recommended production deployment. Use the shared gateway only with trusted teammates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Opik ZooKeeper | `zookeeper:3.9.4@sha256:dfa9ba46d14bd52bcb3c1dac3ba91f179cf4cebf7ee576e1c2df09c68fc1d30d` | Database |
| Opik Redis | `redis:7.2.4-alpine3.19@sha256:c8bb255c3559b3e458766db810aa7b3c7af1235b204cfdb304e79ff388fe1a5a` | Database |
| Opik ClickHouse | `clickhouse/clickhouse-server:26.3.16.16-alpine@sha256:b45ab149f0d331b944b4aa2ccdd47d0242238fd39e68ec524ad63338e4b9d8f8` | Database |
| Opik MySQL | `mysql:8.4.2@sha256:ac80b6e09e5b12b4f9d5cd4f6425e43464247aa4ba4f6169da5daf59e5877f7d` | Database |
| Opik Evaluator | `ghcr.io/comet-ml/opik/opik-python-backend:2.2.13@sha256:7c5830bfded23e2dbb4c69ca3dcf07a6a3df12c3d2824b89fed3a94e5ab5c3a1` | Worker |
| Opik Frontend | `ghcr.io/comet-ml/opik/opik-frontend:2.2.13@sha256:da5b1c95204e35a278bafc16deeccf77eb1d10878e6948bfef768ab01248a50f` | Worker |
| Opik Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |
| Opik Backend | `ghcr.io/comet-ml/opik/opik-backend:2.2.13@sha256:5068c51a880bdcbfe86389a50007b67d1c61a2e303d78f5fc92d650a24dfa705` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `JVMFLAGS` | Opik ZooKeeper | -Xmx512m | - |
| `ZOO_DATA_DIR` | Opik ZooKeeper | /bitnami/zookeeper/data | - |
| `ZOO_DATA_LOG_DIR` | Opik ZooKeeper | /bitnami/zookeeper/data | - |
| `ZOO_4LW_COMMANDS_WHITELIST` | Opik ZooKeeper | srvr,ruok | - |
| `REDIS_PASSWORD` | Opik Redis | (secret) | Generated Redis password used by both Opik backends. |
| `PORT` | Opik ClickHouse | 8123 | - |
| `CLICKHOUSE_DB` | Opik ClickHouse | opik | - |
| `CLICKHOUSE_USER` | Opik ClickHouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | Opik ClickHouse | (secret) | Generated ClickHouse application and migration password. |
| `OPIK_CLICKHOUSE_USERS` | Opik ClickHouse | <clickhouse><profiles><default><enable_time_time64_type>1</enable_time_time64_type></default></profiles></clickhouse> | - |
| `OPIK_CLICKHOUSE_CONFIG` | Opik ClickHouse | <clickhouse><custom_settings_prefixes>SQL_</custom_settings_prefixes><macros><shard>1</shard><replica>clickhouse</replica><cluster>cluster</cluster></macros><zookeeper><node><host>ZOOKEEPER_HOST</host><port>2181</port></node></zookeeper><zookeeper_path>/clickhouse</zookeeper_path><zookeeper_session_timeout_ms>30000</zookeeper_session_timeout_ms><distributed_ddl><path>/clickhouse/task_queue/ddl</path></distributed_ddl><remote_servers><cluster><shard><internal_replication>true</internal_replication><replica><host>CLICKHOUSE_HOST</host><port>9000</port></replica></shard></cluster></remote_servers></clickhouse> | - |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | Opik ClickHouse | 1 | - |
| `MYSQL_USER` | Opik MySQL | (secret) | - |
| `MYSQL_DATABASE` | Opik MySQL | opik | - |
| `MYSQL_PASSWORD` | Opik MySQL | (secret) | Generated application database password. |
| `MYSQL_ROOT_PASSWORD` | Opik MySQL | (secret) | Generated MySQL administrator password. |
| `PORT` | Opik Evaluator | 8000 | - |
| `RQ_WORKER_ENABLED` | Opik Evaluator | true | - |
| `PYTHON_BACKEND_PORT` | Opik Evaluator | 8000 | - |
| `OPIK_OTEL_SDK_ENABLED` | Opik Evaluator | false | - |
| `OPIK_USAGE_REPORT_ENABLED` | Opik Evaluator | false | - |
| `OPTSTUDIO_MAX_CONCURRENT_JOBS` | Opik Evaluator | 2 | - |
| `PYTHON_CODE_EXECUTOR_STRATEGY` | Opik Evaluator | process | - |
| `PYTHON_CODE_EXECUTOR_MEM_LIMIT` | Opik Evaluator | 256m | - |
| `PYTHON_CODE_EXECUTOR_ALLOW_NETWORK` | Opik Evaluator | false | - |
| `PYTHON_CODE_EXECUTOR_CONTAINERS_NUM` | Opik Evaluator | 2 | - |
| `PYTHON_CODE_EXECUTOR_EXEC_TIMEOUT_IN_SECS` | Opik Evaluator | 3 | - |
| `PORT` | Opik Frontend | 5173 | - |
| `NGINX_PORT` | Opik Frontend | 5173 | - |
| `OPIK_FRONTEND_CONFIG` | Opik Frontend | server {
  listen 5173 default_server;
  server_name _;
  root /usr/share/nginx/html;
  client_max_body_size 2G;
  location /health { access_log off; return 200 "healthy\n"; }
  location /api/ { rewrite ^/api/(.*)$ /$1 break; proxy_pass http://${OPIK_BACKEND_HOST}:8080; proxy_set_header Host $host; proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_read_timeout 90; }
  location = /oauth/consent { try_files /dev/null /index.html; }
  location ^~ /oauth/ { proxy_pass http://${OPIK_BACKEND_HOST}:8080; }
  location = /.well-known/oauth-authorization-server { proxy_pass http://${OPIK_BACKEND_HOST}:8080; }
  location / { try_files $uri $uri/ /index.html; }
  add_header X-Frame-Options "DENY" always;
} | - |
| `PORT` | Opik Gateway | 8080 | - |
| `OPIK_PASSWORD` | Opik Gateway | (secret) | Generated shared password protecting the complete public Opik surface. |
| `OPIK_USERNAME` | Opik Gateway | (secret) | Shared username protecting the complete public Opik surface. |
| `CORS` | Opik Backend | false | - |
| `PORT` | Opik Backend | 8080 | - |
| `IS_MINIO` | Opik Backend | true | - |
| `JAVA_OPTS` | Opik Backend | -Dliquibase.propertySubstitutionEnabled=true -XX:+UseG1GC -XX:MaxRAMPercentage=80.0 | - |
| `STATE_DB_PASS` | Opik Backend | - | Generated MySQL password supplied through a Railway reference. |
| `STATE_DB_USER` | Opik Backend | (secret) | - |
| `ANALYTICS_DB_PASS` | Opik Backend | - | Generated ClickHouse password supplied through a Railway reference. |
| `ANALYTICS_DB_PORT` | Opik Backend | 8123 | - |
| `AWS_ACCESS_KEY_ID` | Opik Backend | - | Railway Bucket access key supplied through a resource reference. |
| `STATE_DB_PROTOCOL` | Opik Backend | jdbc:mysql:// | - |
| `TOGGLE_OLLIE_ENABLED` | Opik Backend | false | - |
| `ANALYTICS_DB_PROTOCOL` | Opik Backend | HTTP | - |
| `ANALYTICS_DB_USERNAME` | Opik Backend | (secret) | - |
| `AWS_SECRET_ACCESS_KEY` | Opik Backend | (secret) | Railway Bucket secret supplied through a resource reference. |
| `STATE_DB_DATABASE_NAME` | Opik Backend | opik | - |
| `TOGGLE_OPIK_AI_ENABLED` | Opik Backend | false | - |
| `OPIK_USAGE_REPORT_ENABLED` | Opik Backend | false | - |
| `TOGGLE_GUARDRAILS_ENABLED` | Opik Backend | false | - |
| `ANALYTICS_DB_DATABASE_NAME` | Opik Backend | opik | - |
| `ANALYTICS_DB_MIGRATIONS_USER` | Opik Backend | (secret) | - |
| `TOGGLE_WELCOME_WIZARD_ENABLED` | Opik Backend | true | - |
| `TOGGLE_FORCE_WORKSPACE_VERSION` | Opik Backend | version_2 | - |
| `LLM_MODEL_REGISTRY_REMOTE_ENABLED` | Opik Backend | false | - |

## Configuration

- **Start command:** `/bin/bash -ec 'mkdir -p /bitnami/zookeeper/data; chown -R zookeeper:zookeeper /bitnami/zookeeper; exec gosu zookeeper /docker-entrypoint.sh zkServer.sh start-foreground'`
- **Volume:** `/bitnami/zookeeper`
- **Start command:** `/bin/sh -ec 'umask 077; printf "appendonly yes\nrequirepass %s\n" "$REDIS_PASSWORD" >/tmp/redis.conf; exec redis-server /tmp/redis.conf'`
- **Volume:** `/data`
- **Start command:** `/bin/sh -ec 'mkdir -p /etc/clickhouse-server/config.d /etc/clickhouse-server/users.d; printf "%s\n" "$OPIK_CLICKHOUSE_CONFIG" | sed "s/ZOOKEEPER_HOST/$OPIK_ZOOKEEPER_HOST/g; s/CLICKHOUSE_HOST/$OPIK_CLICKHOUSE_HOST/g" >/etc/clickhouse-server/config.d/opik.xml; printf "%s\n" "$OPIK_CLICKHOUSE_USERS" >/etc/clickhouse-server/users.d/opik.xml; exec /entrypoint.sh'`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/healthcheck`
- **Start command:** `/bin/sh -ec 'until getent hosts "$OPIK_BACKEND_HOST" >/dev/null; do sleep 3; done; printf "%s\n" "$OPIK_FRONTEND_CONFIG" >/etc/nginx/templates/default.conf.template; exec /docker-entrypoint.sh nginx -g "daemon off;"'`
- **Healthcheck:** `/health`
- **Start command:** `/bin/sh -ec 'hash="$(caddy hash-password --plaintext "$OPIK_PASSWORD")"; printf '"'"':8080 {\n handle /healthz {\n  rewrite * /is-alive/ping\n  reverse_proxy %s\n }\n handle {\n  basic_auth {\n   %s %s\n  }\n  reverse_proxy %s\n }\n}\n'"'"' "$OPIK_BACKEND_UPSTREAM" "$OPIK_USERNAME" "$hash" "$OPIK_FRONTEND_UPSTREAM" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/bash -ec 'until curl -fsS http://$ANALYTICS_DB_HOST:$ANALYTICS_DB_PORT/ping >/dev/null; do sleep 3; done; ./run_db_migrations.sh && ./provision_agent_insights_readonly_user.sh && exec ./entrypoint.sh'`
- **Healthcheck:** `/is-alive/ping`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/opik-observability)
