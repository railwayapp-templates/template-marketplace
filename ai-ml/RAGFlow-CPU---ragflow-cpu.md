# Deploy RAGFlow CPU on Railway

Document ingestion and retrieval with private databases and CPU workers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ragflow-cpu)

## About

RAGFlow 0.27.1 with CPU processing, MySQL, Elasticsearch, authenticated Redis, and S3-compatible object storage. The adapter supplies a service configuration referencing Railway private hosts and avoids exposing the administration API.

Release tested on Railway with an operator-configured embedding provider. No model provider is bundled.

The template defines 5 services with pinned container digests, generated deployment secrets, explicit service references, and persistent volumes for stateful dependencies. Repository-backed adapters build from `main`. Railway terminates HTTPS for the public endpoints; databases and internal workers have no public TCP proxies. Fresh initialization was tested in an isolated Railway project. Each deployment has its own database and storage resources. Backups are not scheduled by this template, and filesystem-backed services should remain single-replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |
| elasticsearch | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Database |
| mysql | `mysql:8.0.40@sha256:d58ac93387f644e4e040c636b8f50494e78e5afc27ca0a87348b2f577da2b7ff` | Database |
| storage | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Database |
| ragflow | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `ES_JAVA_OPTS` | elasticsearch | -Xms1g -Xmx1g | Initial Java heap. Increase only with sufficient Railway memory. |
| `discovery.type` | elasticsearch | single-node | Single-node search index. This is not a high-availability cluster. |
| `ELASTIC_PASSWORD` | elasticsearch | (secret) | Generated elastic password. Keep private and preserve with backups. |
| `node.store.allow_mmap` | elasticsearch | false | Avoid dependence on host vm.max_map_count, which cannot be changed from a Railway container. |
| `xpack.security.enabled` | elasticsearch | true | Xpack.security.enabled for elasticsearch. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `xpack.security.http.ssl.enabled` | elasticsearch | false | Xpack.security.http.ssl.enabled for elasticsearch. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MYSQL_USER` | mysql | (secret) | Mysql user for mysql. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MYSQL_DATABASE` | mysql | rag_flow | Mysql database for mysql. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MYSQL_PASSWORD` | mysql | (secret) | Generated mysql password. Keep private and preserve with backups. |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) | Generated mysql root password. Keep private and preserve with backups. |
| `S3_BUCKET` | storage | ragflow | Private bucket created on first startup; changing this does not move existing objects. |
| `MINIO_ROOT_USER` | storage | (secret) | Generated minio root user. Keep private and preserve with backups. |
| `MINIO_ROOT_PASSWORD` | storage | (secret) | Generated minio root password. Keep private and preserve with backups. |
| `TZ` | ragflow | UTC | Tz for ragflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | ragflow | 80 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `DEVICE` | ragflow | cpu | Device for ragflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_TYPE` | ragflow | mysql | Db type for ragflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ES_HOST` | ragflow | - | Es host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DOC_ENGINE` | ragflow | elasticsearch | Doc engine for ragflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MINIO_HOST` | ragflow | - | Minio host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MINIO_USER` | ragflow | (secret) | Minio user resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MYSQL_HOST` | ragflow | - | Mysql host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MYSQL_PORT` | ragflow | 3306 | Mysql port for ragflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MYSQL_USER` | ragflow | (secret) | Mysql user for ragflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_HOST` | ragflow | - | Private Redis/Valkey hostname supplied by the redis service reference. |
| `MYSQL_DBNAME` | ragflow | rag_flow | Mysql dbname for ragflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ALLOW_ANY_HOST` | ragflow | 0 | Allow any host for ragflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MINIO_PASSWORD` | ragflow | (secret) | Minio password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MYSQL_PASSWORD` | ragflow | (secret) | Mysql password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_PASSWORD` | ragflow | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `ENABLE_REGISTER` | ragflow | 1 | Enable register for ragflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `API_PROXY_SCHEME` | ragflow | python | Api proxy scheme for ragflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ELASTIC_PASSWORD` | ragflow | (secret) | Elastic password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MYSQL_MAX_PACKET` | ragflow | 1073741824 | Mysql max packet for ragflow. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REGISTER_ENABLED` | ragflow | 1 | Enable account onboarding initially. Disable registration after creating the intended accounts. |

## Configuration

- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Volume:** `/usr/share/elasticsearch/data`
- **Start command:** `docker-entrypoint.sh mysqld --max-connections=150 --max-allowed-packet=1073741824 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-authentication-plugin=mysql_native_password --binlog-expire-logs-seconds=604800`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/ragflow-cpu)
