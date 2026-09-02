# Deploy Opik on Railway

Open-source LLM observability: evaluation, tracing and guardrails

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opik)

## About

Opik is Comet's open-source platform for tracing, evaluating and optimising LLM applications. It records every prompt, model call, retrieval step and tool invocation your app makes, groups them into traces you can replay, and scores them with LLM-as-a-judge metrics, heuristic checks or your own Python code. Teams building RAG pipelines, assistants and agents use it to answer what logs cannot: which prompt version raised hallucination rate, which model is burning the token budget, and whether last night's change made answers better or only different. It is Apache-2.0 licensed, with integrations for OpenAI, Anthropic, LangChain, LlamaIndex, LiteLLM, CrewAI and OpenTelemetry.

Deploy Opik on Railway and you get the full production topology, not a single-container demo. This template runs seven services: an nginx **frontend** serving the React UI and proxying the API, the Java **backend** that owns ingestion and evaluation, a **python-backend** running code metrics and the prompt optimizer, **ClickHouse** for trace analytics with a **Keeper** node coordinating its replicated tables, and managed **MySQL** and **Redis**. A storage bucket holds attachments. Only the frontend is public; everything else talks over Railway's private network, and the whole surface sits behind HTTP basic auth, because open-source Opik has no login of its own.

![Diagram of the seven Opik services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788201459/opik-architecture.png)

Opik separates two things most logging tools conflate: the record of what your application did, and a judgement about whether it did it well. Traces land in ClickHouse, where a month of ingestion still answers aggregate queries in milliseconds, and evaluation runs on top of that record. Self-hosting matters because traces carry your users' prompts and your model outputs.

Key features:

- Tracing for OpenAI, Anthropic, Gemini, Bedrock, LangChain, LlamaIndex, LiteLLM, CrewAI and OpenTelemetry
- LLM-as-a-judge and code-based metrics, online against live traffic or offline against datasets
- Datasets, experiments and test suites for prompt and model regression testing
- A prompt library with version history, and an optimizer that tunes prompts for you
- Cost, latency and token dashboards per project

The services divide along those lines. The frontend serves the UI and proxies `/api`. The backend owns ingestion, evaluation and every database migration. The python-backend executes user-supplied metric code and optimizer jobs from a Redis queue. ClickHouse stores traces, spans and feedback scores, and Keeper coordinates the replicated tables and cluster-wide DDL that Opik's schema requires. MySQL holds projects, prompts, datasets and experiments, Redis carries locks and online-scoring streams, and the bucket holds attachments stripped from large traces.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | `ghcr.io/comet-ml/opik/opik-backend:2.2.45` | Worker |
| MySQL | `mysql:9.4` | Database |
| python-backend | `ghcr.io/comet-ml/opik/opik-python-backend:2.2.45` | Worker |
| frontend | [gridalpha/opik-railway](https://github.com/gridalpha/opik-railway) (root: frontend) | Web service |
| Redis | `redis:8.2` | Database |
| keeper | [gridalpha/opik-railway](https://github.com/gridalpha/opik-railway) (root: keeper) | Database |
| clickhouse | [gridalpha/opik-railway](https://github.com/gridalpha/opik-railway) (root: clickhouse) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CORS` | backend | false | Cross-origin requests to the API |
| `PORT` | backend | 8081 | Admin port, used for the health check |
| `S3_URL` | backend | - | Object storage endpoint |
| `IS_MINIO` | backend | true | Use the S3-compatible client and path-style URLs |
| `JAVA_OPTS` | backend | -Dliquibase.propertySubstitutionEnabled=true -XX:+UseG1GC -XX:MaxRAMPercentage=70.0 | JVM flags; the Liquibase flag is required |
| `REDIS_URL` | backend | - | Locks, streams and queues |
| `S3_BUCKET` | backend | - | Attachment bucket name |
| `S3_REGION` | backend | - | Bucket region |
| `AWS_REGION` | backend | - | Region for the AWS SDK |
| `STATE_DB_URL` | backend | - | State database host and options |
| `STATE_DB_PASS` | backend | - | State database password |
| `STATE_DB_USER` | backend | (secret) | State database user |
| `ANALYTICS_DB_HOST` | backend | - | ClickHouse private hostname |
| `ANALYTICS_DB_PASS` | backend | - | ClickHouse password |
| `ANALYTICS_DB_PORT` | backend | 8123 | ClickHouse HTTP port |
| `AWS_ACCESS_KEY_ID` | backend | - | Bucket access key |
| `STATE_DB_PROTOCOL` | backend | jdbc:mysql:// | JDBC scheme for the state database |
| `OPIK_ENCRYPTION_KEY` | backend | - | At-rest key for stored provider keys |
| `PYTHON_EVALUATOR_URL` | backend | - | Python metric service |
| `ANALYTICS_DB_PROTOCOL` | backend | HTTP | ClickHouse client protocol |
| `ANALYTICS_DB_USERNAME` | backend | (secret) | ClickHouse user |
| `AWS_SECRET_ACCESS_KEY` | backend | (secret) | Bucket secret key |
| `STATE_DB_DATABASE_NAME` | backend | - | State database name |
| `TOGGLE_OPIK_AI_ENABLED` | backend | false | Hosted-only AI assistant |
| `OPIK_USAGE_REPORT_ENABLED` | backend | false | Anonymous usage reporting to Comet |
| `TOGGLE_GUARDRAILS_ENABLED` | backend | false | Guardrails service is not deployed |
| `ANALYTICS_DB_DATABASE_NAME` | backend | opik | ClickHouse database name |
| `ANALYTICS_DB_MIGRATIONS_URL` | backend | - | ClickHouse URL for migrations |
| `ANALYTICS_DB_MIGRATIONS_PASS` | backend | - | Migration password |
| `ANALYTICS_DB_MIGRATIONS_USER` | backend | (secret) | Migration user |
| `TOGGLE_WELCOME_WIZARD_ENABLED` | backend | true | First-run welcome dialog |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the server |
| `PORT` | python-backend | 8000 | HTTP port for metric execution |
| `REDIS_URL` | python-backend | - | Job queue and worker registry |
| `OPIK_URL_OVERRIDE` | python-backend | - | API used by the SDK |
| `RQ_WORKER_ENABLED` | python-backend | true | Run the optimizer worker in this process |
| `PYTHON_BACKEND_PORT` | python-backend | 8000 | Same port, read by the app |
| `OPIK_OTEL_SDK_ENABLED` | python-backend | false | OpenTelemetry instrumentation |
| `OPIK_REVERSE_PROXY_URL` | python-backend | - | Proxy URL for callbacks |
| `OPTSTUDIO_MAX_CONCURRENT_JOBS` | python-backend | 5 | Parallel optimizer jobs |
| `PYTHON_CODE_EXECUTOR_STRATEGY` | python-backend | process | Run metric code in-process, not in Docker |
| `PORT` | frontend | 5173 | Port nginx listens on |
| `NGINX_PORT` | frontend | 5173 | Same port, read by the image's own scripts |
| `OTEL_TRACE` | frontend | off | nginx OpenTelemetry tracing |
| `OPIK_BACKEND_HOST` | frontend | - | Private hostname of the API |
| `OPIK_BACKEND_PORT` | frontend | 8080 | API port proxied by nginx |
| `OPIK_BASIC_AUTH_USER` | frontend | (secret) | Username for the UI and API |
| `OPIK_BASIC_AUTH_PASSWORD` | frontend | (secret) | Password for the UI and API |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | frontend | 1 | Size workers from the CPU quota |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | keeper | 9182 | Readiness port, used for the health check |
| `KEEPER_SERVER_ID` | keeper | 1 | Raft node id |
| `PORT` | clickhouse | 8123 | HTTP port, used for the health check |
| `KEEPER_HOSTS` | clickhouse | - | Coordination node hostname |
| `CLICKHOUSE_USER` | clickhouse | (secret) | Analytics database user |
| `CLICKHOUSE_CLUSTER` | clickhouse | cluster | Cluster macro used by the migrations |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Analytics database password |
| `CLICKHOUSE_SHARD_ID` | clickhouse | 1 | Shard macro used by the migrations |
| `CLICKHOUSE_REPLICA_ID` | clickhouse | clickhouse | Replica macro; must stay stable |

## Configuration

- **Start command:** `/bin/bash -c "./run_db_migrations.sh && ./provision_agent_insights_readonly_user.sh && ./entrypoint.sh"`
- **Healthcheck:** `/healthcheck`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `tini -s -- /bin/sh -c "exec gunicorn --access-logfile - --workers 1 --threads 5 --worker-class gthread --bind [::]:8000 --chdir ./src 'opik_backend:create_app()'"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/clickhouse`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opik)
