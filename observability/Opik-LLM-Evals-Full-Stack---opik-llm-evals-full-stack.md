# Deploy Opik LLM Evals Full Stack on Railway

Opik LLM evals and tracing, full 7-service stack with basic auth on

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opik-llm-evals-full-stack)

## About

Opik is Comet's open source platform for LLM evaluation and observability. It records traces and spans from your LLM applications, scores them with LLM-as-a-judge and custom Python metrics, manages prompts and datasets, and runs experiments so you can compare model and prompt versions from one UI.

Hosting Opik means running the full upstream stack: an nginx frontend that serves the React UI and proxies `/api` to the Java backend, a Python backend for custom metrics and the optimizer, MySQL for state (projects, prompts, datasets), ClickHouse for traces and spans, Redis for locks and queues, and MinIO for attachments. This template uses the official `ghcr.io/comet-ml/opik/*` images pinned to `2.2.59`, replaces the upstream ZooKeeper container with ClickHouse Keeper embedded in the ClickHouse service (the analytics migrations use `ON CLUSTER` and `ReplicatedMergeTree`, so coordination is mandatory even on one node), and renders the nginx config at boot so the frontend reaches the backend over Railway's private network. Opik open source ships without authentication, so the template adds HTTP basic auth with a generated password in front of the UI and API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:7.2.4-alpine3.19` | Database |
| opik-python-backend | `ghcr.io/comet-ml/opik/opik-python-backend:2.2.59` | Worker |
| opik-backend | `ghcr.io/comet-ml/opik/opik-backend:2.2.59` | Worker |
| MinIO | `quay.io/minio/minio:RELEASE.2025-03-12T18-04-18Z` | Database |
| ClickHouse | `clickhouse/clickhouse-server:26.3.16.16` | Database |
| MySQL | `mysql:8.4.2` | Database |
| Opik | `ghcr.io/comet-ml/opik/opik-frontend:2.2.59` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | Redis | - | Private-network connection string (IPv6, includes port, db 0). Same shape as the upstream compose (redis://:password@host:6379/0). Referenced by opik-backend and opik-python-backend. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis password (passed to redis-server --requirepass by the start command). |
| `PORT` | opik-python-backend | 8000 | gunicorn listen port. Railway's healthcheck probes $PORT/healthcheck. |
| `REDIS_URL` | opik-python-backend | - | Redis connection string for the RQ optimizer worker. |
| `OPIK_URL_OVERRIDE` | opik-python-backend | - | Direct URL of the Java backend for the embedded Opik SDK (no /api suffix: that prefix only exists on the nginx proxy). |
| `RQ_WORKER_ENABLED` | opik-python-backend | true | Run the RQ worker for Optimization Studio jobs inside this service (upstream value). |
| `PYTHON_BACKEND_PORT` | opik-python-backend | 8000 | Port used by the start command (keep equal to PORT). |
| `OPIK_OTEL_SDK_ENABLED` | opik-python-backend | false | No OpenTelemetry instrumentation (no collector in this template). |
| `OPIK_REVERSE_PROXY_URL` | opik-python-backend | - | Upstream points this at the nginx proxy; here it goes straight to the backend so it bypasses the basic auth on the Opik service. |
| `PYTHON_CODE_EXECUTOR_STRATEGY` | opik-python-backend | process | process = run user metric code in subprocesses. docker (the image default) needs Docker-in-Docker / privileged, which Railway does not offer. Same value as the upstream compose. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | opik-python-backend | true | Alpine (musl) image: required for *.railway.internal DNS resolution from this container. |
| `PYTHON_CODE_EXECUTOR_PARALLEL_NUM` | opik-python-backend | 5 | Number of executor subprocesses and gunicorn threads. |
| `PYTHON_CODE_EXECUTOR_ALLOW_NETWORK` | opik-python-backend | false | Whether user metric code may open network connections. |
| `PYTHON_CODE_EXECUTOR_EXEC_TIMEOUT_IN_SECS` | opik-python-backend | 3 | Timeout for one user metric execution. |
| `CORS` | opik-backend | false | Cross-origin requests to the API. Not needed: the UI is served same-origin by the Opik (nginx) service. |
| `PORT` | opik-backend | 8080 | Dropwizard application port (SERVER_APPLICATION_PORT default). Railway's healthcheck probes $PORT/health-check. |
| `S3_URL` | opik-backend | - | MinIO S3 endpoint on the private network (attachments). Must include the port. |
| `IS_MINIO` | opik-backend | true | true = attachments are uploaded/downloaded THROUGH the backend, so MinIO never needs a public domain. false switches to presigned AWS S3 URLs. |
| `JAVA_OPTS` | opik-backend | -Dliquibase.propertySubstitutionEnabled=true -XX:+UseG1GC -XX:MaxRAMPercentage=80.0 | JVM flags (upstream compose value). The heap may grow to 80% of the service memory limit. |
| `REDIS_URL` | opik-backend | - | Redis connection string (redis://:<password>@<private-domain>:6379/0) for locks, streams and caching. |
| `S3_BUCKET` | opik-backend | public | Bucket for attachments. The MinIO start command creates it on boot. |
| `S3_REGION` | opik-backend | us-east-1 | Region string passed to the S3 client (any value works for MinIO). |
| `MYSQL_HOST` | opik-backend | - | Private hostname of the MySQL service. Used by the start command to wait for MySQL before running migrations. |
| `REDIS_HOST` | opik-backend | - | Private hostname of the Redis service. Used by the start command wait loop. |
| `STATE_DB_URL` | opik-backend | - | MySQL host:port/database plus the upstream JDBC options. Must include the port (private networking). |
| `STATE_DB_PASS` | opik-backend | - | MySQL password (mirrors the MySQL service). |
| `STATE_DB_USER` | opik-backend | (secret) | MySQL user (mirrors the MySQL service). |
| `ANALYTICS_DB_HOST` | opik-backend | - | Private hostname of the ClickHouse service (traces, spans, scores). Also used by the start command wait loop. |
| `ANALYTICS_DB_PASS` | opik-backend | - | ClickHouse password (mirrors the ClickHouse service). |
| `ANALYTICS_DB_PORT` | opik-backend | 8123 | ClickHouse HTTP port. |
| `AWS_ACCESS_KEY_ID` | opik-backend | - | S3 access key (MinIO root user). |
| `STATE_DB_PROTOCOL` | opik-backend | jdbc:mysql:// | JDBC protocol prefix for the state database (upstream value). |
| `OPIK_ENCRYPTION_KEY` | opik-backend | - | AES key used to encrypt stored LLM provider API keys. 16 characters like the upstream default. Do not rotate after saving provider keys. |
| `PYTHON_EVALUATOR_URL` | opik-backend | - | URL of the Python backend (custom Python metrics, optimizer). Must include the port. |
| `ANALYTICS_DB_PROTOCOL` | opik-backend | HTTP | ClickHouse client protocol (upstream value). |
| `ANALYTICS_DB_USERNAME` | opik-backend | (secret) | ClickHouse user (mirrors the ClickHouse service). |
| `AWS_SECRET_ACCESS_KEY` | opik-backend | (secret) | S3 secret key (MinIO root password). |
| `OPIK_OTEL_SDK_ENABLED` | opik-backend | false | Skip downloading the OpenTelemetry Java agent at boot (no collector in this template). |
| `STATE_DB_DATABASE_NAME` | opik-backend | - | MySQL database name (state DB: projects, prompts, datasets, feedback definitions). |
| `TOGGLE_OPIK_AI_ENABLED` | opik-backend | false | Opik AI assistant features (upstream compose value). |
| `TOGGLE_DEMO_DATA_ENABLED` | opik-backend | false | false so the UI does not wait for the upstream demo-data generator job, which is not part of this template. |
| `OPIK_USAGE_REPORT_ENABLED` | opik-backend | false | Anonymous usage reports to stats.comet.com. Off by default in this template. |
| `TOGGLE_GUARDRAILS_ENABLED` | opik-backend | false | Guardrails need the separate GPU-sized guardrails-backend image, not included. |
| `ANALYTICS_DB_DATABASE_NAME` | opik-backend | - | ClickHouse database name; the migrations create it ON CLUSTER. |
| `ANALYTICS_DB_MIGRATIONS_URL` | opik-backend | - | Liquibase JDBC URL for the ClickHouse migrations (must include the port). |
| `ANALYTICS_DB_MIGRATIONS_PASS` | opik-backend | - | ClickHouse password for migrations. |
| `ANALYTICS_DB_MIGRATIONS_USER` | opik-backend | (secret) | ClickHouse user for migrations. |
| `TOGGLE_WELCOME_WIZARD_ENABLED` | opik-backend | true | Show the first-run welcome wizard in the UI (upstream compose value). |
| `ANALYTICS_DB_CLUSTER_HEALTH_CHECK_ENABLED` | opik-backend | false | Must stay false: the readiness probe for the multi-node Hyperscale topology would fail on this single-node ClickHouse (upstream compose value). |
| `LLM_PROVIDER_TOKEN_AUTH_DESTINATION_GUARD` | opik-backend | (secret) | Upstream self-host value: allows custom LLM provider base URLs that point at private/internal gateways. |
| `ANALYTICS_DB_COLD_STORAGE_DISK_HEALTH_CHECK_ENABLED` | opik-backend | false | Must stay false: there is no cold_s3 tiered disk in this stack (upstream compose value). |
| `MINIO_ROOT_USER` | MinIO | (secret) | S3 access key. Referenced by opik-backend as AWS_ACCESS_KEY_ID. |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | Generated S3 secret key. Referenced by opik-backend as AWS_SECRET_ACCESS_KEY. |
| `CLICKHOUSE_DB` | ClickHouse | opik | Analytics database name (created by the image entrypoint and by the migrations). |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse user referenced by opik-backend. |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Generated password referenced by opik-backend. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | Enables SQL-driven access control for CLICKHOUSE_USER (upstream compose value). |
| `MYSQL_USER` | MySQL | (secret) | Application user referenced by opik-backend. |
| `MYSQL_DATABASE` | MySQL | opik | Database created on first boot and granted to MYSQL_USER. |
| `MYSQL_PASSWORD` | MySQL | (secret) | Generated application password referenced by opik-backend. |
| `MYSQL_PRIVATE_URL` | MySQL | - | Convenience connection string over the private network (IPv6, includes port). |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Generated root password. |
| `PORT` | Opik | 5173 | nginx listen port. Railway's healthcheck and the public domain probe $PORT, so keep it equal to NGINX_PORT (upstream default 5173). |
| `NGINX_PORT` | Opik | 5173 | Port the upstream image's nginx templates expect. Keep equal to PORT. |
| `OTEL_TRACE` | Opik | off | nginx OpenTelemetry tracing. Keep off: there is no collector in this template. |
| `OPIK_AUTH_USER` | Opik | (secret) | HTTP basic auth username for the UI. Opik open source has no authentication of its own, so this template puts basic auth in front of the whole site. |
| `OPIK_BACKEND_HOST` | Opik | - | host:port of the Java backend on the private network. The start script renders it into nginx as the /api upstream, resolved at request time via Railway's DNS (the upstream image hardcodes backend:8080 + Docker's 127.0.0.11 resolver, which do not exist here). |
| `OPIK_AUTH_PASSWORD` | Opik | (secret) | HTTP basic auth password for the UI AND the API key for SDKs/curl (send it as Authorization: <value>, which is what the Opik SDK does with OPIK_API_KEY). Delete the variable to run Opik fully open (not recommended on a public domain). |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Opik | true | Alpine (musl) image: required for *.railway.internal DNS resolution from this container. |

## Configuration

- **Start command:** `sh -c 'docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --save 60 1 --dir /data --bind :: 0.0.0.0'`
- **Volume:** `/data`
- **Start command:** `sh -c 'cd /opt/opik-python-backend && exec gunicorn --access-logfile - --workers 1 --threads "$PYTHON_CODE_EXECUTOR_PARALLEL_NUM" --worker-class gthread --bind "[::]:$PYTHON_BACKEND_PORT" --chdir ./src "opik_backend:create_app()"'`
- **Healthcheck:** `/healthcheck`
- **Start command:** `bash -c 'for t in "$MYSQL_HOST:3306" "$ANALYTICS_DB_HOST:8123" "$REDIS_HOST:6379"; do n=0; until (exec 3<>"/dev/tcp/${t%:*}/${t##*:}") 2>/dev/null; do n=$((n+1)); if [ "$n" -ge 150 ]; then echo "gave up waiting for $t"; break; fi; echo "waiting for $t"; sleep 2; done; done; ./run_db_migrations.sh && ./provision_agent_insights_readonly_user.sh && exec ./entrypoint.sh'`
- **Healthcheck:** `/health-check`
- **Start command:** `sh -c "mkdir -p /data/public && exec minio server /data --address :9000 --console-address :9001"`
- **Start command:** `bash -c "mkdir -p /etc/clickhouse-server/config.d /etc/clickhouse-server/users.d && echo '<clickhouse><listen_host>::</listen_host></clickhouse>' > /etc/clickhouse-server/config.d/listen.xml && echo '<clickhouse><custom_settings_prefixes>SQL_</custom_settings_prefixes><macros><shard>1</shard><replica>clickhouse</replica><cluster>cluster</cluster></macros><keeper_server><tcp_port>9181</tcp_port><server_id>1</server_id><log_storage_path>/var/lib/clickhouse/coordination/log</log_storage_path><snapshot_storage_path>/var/lib/clickhouse/coordination/snapshots</snapshot_storage_path><raft_configuration><server><id>1</id><hostname>localhost</hostname><port>9234</port></server></raft_configuration></keeper_server><zookeeper><node><host>localhost</host><port>9181</port></node></zookeeper><distributed_ddl><path>/clickhouse/task_queue/ddl</path></distributed_ddl><remote_servers><cluster><shard><internal_replication>true</internal_replication><replica><host>localhost</host><port>9000</port></replica></shard></cluster></remote_servers></clickhouse>' > /etc/clickhouse-server/config.d/opik.xml && echo '<clickhouse><profiles><default><enable_time_time64_type>1</enable_time_time64_type><distributed_background_insert_batch>1</distributed_background_insert_batch><distributed_background_insert_split_batch_on_failure>1</distributed_background_insert_split_batch_on_failure></default></profiles></clickhouse>' > /etc/clickhouse-server/users.d/opik.xml && exec /entrypoint.sh"`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `docker-entrypoint.sh mysqld --datadir=/var/lib/mysql/data --bind-address=::`
- **Volume:** `/var/lib/mysql`
- **Start command:** `sh -c 'echo IyEvYmluL3NoCnNldCAtZXUKUE9SVD0iJHtQT1JUOi01MTczfSIKZXhwb3J0IE5HSU5YX1BPUlQ9IiRQT1JUIgpCQUNLRU5EPSIke09QSUtfQkFDS0VORF9IT1NUOj9PUElLX0JBQ0tFTkRfSE9TVCBtdXN0IGJlIDxob3N0Pjo8cG9ydD4gb2Ygb3Bpay1iYWNrZW5kfSIKQVVUSF9VU0VSPSIke09QSUtfQVVUSF9VU0VSOi1vcGlrfSIKQVVUSF9QQVNTV09SRD0iJHtPUElLX0FVVEhfUEFTU1dPUkQ6LX0iCk5TPSIkKGF3ayAnL15uYW1lc2VydmVyLyB7IHByaW50ICQyOyBleGl0IH0nIC9ldGMvcmVzb2x2LmNvbmYpIgpjYXNlICIkTlMiIGluICo6KikgTlM9IlskTlNdIiA7OyBlc2FjCmlmIFsgLW4gIiRBVVRIX1BBU1NXT1JEIiBdOyB0aGVuCiAgcHJpbnRmICclczp7UExBSU59JXNcbicgIiRBVVRIX1VTRVIiICIkQVVUSF9QQVNTV09SRCIgPiAvdG1wL29waWsuaHRwYXNzd2QKICBVSV9BVVRIPSdhdXRoX2Jhc2ljICJPcGlrIjsgYXV0aF9iYXNpY191c2VyX2ZpbGUgL3RtcC9vcGlrLmh0cGFzc3dkOycKICBBUElfQVVUSD0ic2F0aXNmeSBhbnk7ICRVSV9BVVRIIGF1dGhfcmVxdWVzdCAvX29waWtfYXV0aHo7IgogIE1BUF9CT0RZPSJkZWZhdWx0IDA7IFwiJEFVVEhfUEFTU1dPUkRcIiAxOyIKICBlY2hvICJvcGlrLWZyb250ZW5kOiBiYXNpYyBhdXRoIE9OICh1c2VyICRBVVRIX1VTRVIpOyBBUEkgYWxzbyBhY2NlcHRzIEF1dGhvcml6YXRpb246IDxPUElLX0FVVEhfUEFTU1dPUkQ+IgplbHNlCiAgVUlfQVVUSD0iIgogIEFQSV9BVVRIPSIiCiAgTUFQX0JPRFk9ImRlZmF1bHQgMTsiCiAgZWNobyAib3Bpay1mcm9udGVuZDogT1BJS19BVVRIX1BBU1NXT1JEIGlzIGVtcHR5LCB0aGUgVUkgYW5kIEFQSSBhcmUgT1BFTiB0byBhbnlvbmUgd2l0aCB0aGUgVVJMIgpmaQpQUk9YWV9DT01NT049J3Byb3h5X3NldF9oZWFkZXIgSG9zdCAkaG9zdDsgcHJveHlfc2V0X2hlYWRlciBYLVJlYWwtSVAgJHJlbW90ZV9hZGRyOyBwcm94eV9zZXRfaGVhZGVyIFgtRm9yd2FyZGVkLUZvciAkcHJveHlfYWRkX3hfZm9yd2FyZGVkX2ZvcjsgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Qcm90byAkc2NoZW1lOyBwcm94eV9yZWFkX3RpbWVvdXQgOTA7IHByb3h5X2Nvbm5lY3RfdGltZW91dCA5MDsgcHJveHlfc2VuZF90aW1lb3V0IDkwOycKY2F0ID4gL2V0Yy9uZ2lueC9jb25mLmQvZGVmYXVsdC5jb25mIDw8TkdJTlgKY2xpZW50X21heF9ib2R5X3NpemUgMkc7CmNsaWVudF9oZWFkZXJfYnVmZmVyX3NpemUgMTZrOwpsYXJnZV9jbGllbnRfaGVhZGVyX2J1ZmZlcnMgNCA2NGs7CnJlc29sdmVyICROUyB2YWxpZD0zMHM7CnJlc29sdmVyX3RpbWVvdXQgNXM7Cm1hcCBcJGh0dHBfYXV0aG9yaXphdGlvbiBcJG9waWtfa2V5X29rIHsgJE1BUF9CT0RZIH0Kc2VydmVyIHsKICAgIGxpc3RlbiAkUE9SVCBkZWZhdWx0X3NlcnZlcjsKICAgIGxpc3RlbiBbOjpdOiRQT1JUIGRlZmF1bHRfc2VydmVyOwogICAgc2VydmVyX25hbWUgXzsKICAgIHJvb3QgL3Vzci9zaGFyZS9uZ2lueC9odG1sOwogICAgaW5kZXggaW5kZXguaHRtbDsKICAgIHNldCBcJG9waWtfYmFja2VuZCAiJEJBQ0tFTkQiOwogICAgYWRkX2hlYWRlciBYLUZyYW1lLU9wdGlvbnMgIkRFTlkiIGFsd2F5czsKICAgIGxvY2F0aW9uID0gL2hlYWx0aCB7IGFjY2Vzc19sb2cgb2ZmOyBvdGVsX3RyYWNlIG9mZjsgYWRkX2hlYWRlciBDb250ZW50LVR5cGUgdGV4dC9wbGFpbjsgcmV0dXJuIDIwMCAiaGVhbHRoeSI7IH0KICAgIGxvY2F0aW9uID0gL19vcGlrX2F1dGh6IHsgaW50ZXJuYWw7IGlmIChcJG9waWtfa2V5X29rKSB7IHJldHVybiAyMDQ7IH0gcmV0dXJuIDQwMTsgfQogICAgbG9jYXRpb24gfiBeL2FwaS8oLiopXCQgewogICAgICAgICRBUElfQVVUSAogICAgICAgIHByb3h5X3Bhc3MgaHR0cDovL1wkb3Bpa19iYWNrZW5kL1wkMVwkaXNfYXJnc1wkYXJnczsKICAgICAgICAkUFJPWFlfQ09NTU9OCiAgICAgICAgcHJveHlfaHR0cF92ZXJzaW9uIDEuMTsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIFVwZ3JhZGUgXCRodHRwX3VwZ3JhZGU7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBDb25uZWN0aW9uICJ1cGdyYWRlIjsKICAgIH0KICAgIGxvY2F0aW9uID0gL29hdXRoL2NvbnNlbnQgeyAkVUlfQVVUSCB0cnlfZmlsZXMgL2Rldi9udWxsIC9pbmRleC5odG1sOyB9CiAgICBsb2NhdGlvbiBefiAvb2F1dGgvIHsgJEFQSV9BVVRIIHByb3h5X3Bhc3MgaHR0cDovL1wkb3Bpa19iYWNrZW5kOyBwcm94eV9yZWRpcmVjdCBvZmY7ICRQUk9YWV9DT01NT04gfQogICAgbG9jYXRpb24gPSAvLndlbGwta25vd24vb2F1dGgtYXV0aG9yaXphdGlvbi1zZXJ2ZXIgeyAkQVBJX0FVVEggcHJveHlfcGFzcyBodHRwOi8vXCRvcGlrX2JhY2tlbmQ7IHByb3h5X3JlZGlyZWN0IG9mZjsgJFBST1hZX0NPTU1PTiB9CiAgICBsb2NhdGlvbiAvIHsgJFVJX0FVVEggdHJ5X2ZpbGVzIFwkdXJpIFwkdXJpLyAvaW5kZXguaHRtbDsgfQp9Ck5HSU5YCmVjaG8gIm9waWstZnJvbnRlbmQ6IGxpc3RlbmluZyBvbiAkUE9SVCwgcHJveHlpbmcgL2FwaSAtPiBodHRwOi8vJEJBQ0tFTkQgdmlhIHJlc29sdmVyICROUyIKZXhlYyAvZG9ja2VyLWVudHJ5cG9pbnQuc2ggbmdpbnggLWcgImRhZW1vbiBvZmY7Igo= | base64 -d > /tmp/railway-start.sh && exec sh /tmp/railway-start.sh'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/opik-llm-evals-full-stack)
