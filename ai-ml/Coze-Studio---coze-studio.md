# Deploy Coze Studio on Railway

Agent and workflow studio with SQL, vector search and object storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/coze-studio)

## About

Agent and workflow studio with SQL, vector search and object storage.

**Deployment template.** Deployment incurs Railway charges. Supply your own required model, search and external-service credentials; no example provider credentials are included.

This template provisions 11 services in one Railway project, with image digests or upstream source revisions pinned, generated internal credentials, linked environment variables and the persistent paths listed below. Public HTTP routes use Railway HTTPS. SQL and internal dependency endpoints stay private. Keep stateful services single-replica and configure your own backup policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |
| web | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Worker |
| elasticsearch | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Database |
| nsqlookupd | `nsqio/nsq:v1.2.1@sha256:aa1ac075d45fc3dccaafbe180b8dea5421bfc17df7a9699693987ef35b5be4ad` | Worker |
| milvus | `milvusdb/milvus:v2.5.10@sha256:02e1d60d71ab60f435c60076f4fed2abe59602ecd5e18dcfe229c8c558c4379d` | Database |
| backend | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Worker |
| etcd | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Database |
| nsqd | `nsqio/nsq:v1.2.1@sha256:aa1ac075d45fc3dccaafbe180b8dea5421bfc17df7a9699693987ef35b5be4ad` | Database |
| coze-studio | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Web service |
| mysql | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Database |
| storage | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `BACKEND_HOST` | web | - | Backend host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `STORAGE_HOST` | web | - | Storage host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ES_JAVA_OPTS` | elasticsearch | -Xms1g -Xmx1g | Es java opts for elasticsearch. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LOG_LEVEL` | milvus | info | Log level for milvus. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MINIO_ADDRESS` | milvus | - | Minio address resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MINIO_USE_SSL` | milvus | false | Minio use ssl for milvus. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ETCD_ENDPOINTS` | milvus | - | Etcd endpoints resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MINIO_BUCKET_NAME` | milvus | milvus | Minio bucket name for milvus. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MINIO_ACCESS_KEY_ID` | milvus | - | Minio access key id resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MINIO_SECRET_ACCESS_KEY` | milvus | (secret) | Minio secret access key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ES_ADDR` | backend | - | Es addr resolved automatically from the linked service. Keep this reference when using the included topology. |
| `USE_SSL` | backend | 0 | Use ssl for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MINIO_AK` | backend | - | Minio ak resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MINIO_SK` | backend | - | Minio sk resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LOG_LEVEL` | backend | info | Log level for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MYSQL_DSN` | backend | - | Mysql dsn resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ES_VERSION` | backend | v8 | Es version for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MODEL_ID_0` | backend | - | Required operator-supplied model id 0. Enter your own value before deployment. |
| `REDIS_ADDR` | backend | - | Redis addr resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LISTEN_ADDR` | backend | :8888 | Listen addr for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MILVUS_ADDR` | backend | - | Milvus addr resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SERVER_HOST` | backend | - | Server host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `COZE_MQ_TYPE` | backend | nsq | Coze mq type for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MODEL_NAME_0` | backend | - | Required operator-supplied model name 0. Enter your own value before deployment. |
| `STORAGE_TYPE` | backend | minio | Storage type for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MINIO_USE_SSL` | backend | false | Minio use ssl for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `EMBEDDING_TYPE` | backend | openai | Embedding type for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MINIO_API_HOST` | backend | - | Minio api host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MINIO_ENDPOINT` | backend | - | Minio endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MQ_NAME_SERVER` | backend | - | Mq name server resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_PASSWORD` | backend | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `STORAGE_BUCKET` | backend | opencoze | Storage bucket for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MODEL_API_KEY_0` | backend | (secret) | Required operator-supplied model api key 0. Enter your own value before deployment. |
| `WEB_LISTEN_ADDR` | backend | 0.0.0.0:8888 | Web listen addr for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MODEL_BASE_URL_0` | backend | https://api.openai.com/v1 | Model base url 0 for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MODEL_PROTOCOL_0` | backend | openai | Model protocol 0 for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `VECTOR_STORE_TYPE` | backend | milvus | Vector store type for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ES_NUMBER_OF_SHARDS` | backend | 1 | Es number of shards for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MODEL_OPENCOZE_ID_0` | backend | 100001 | Model opencoze id 0 for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MYSQL_MAX_IDLE_CONNS` | backend | 5 | Mysql max idle conns for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MYSQL_MAX_OPEN_CONNS` | backend | 30 | Mysql max open conns for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ES_NUMBER_OF_REPLICAS` | backend | 0 | Es number of replicas for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MAX_REQUEST_BODY_SIZE` | backend | 33554432 | Max request body size for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENAI_EMBEDDING_DIMS` | backend | 1536 | Openai embedding dims for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENAI_EMBEDDING_MODEL` | backend | text-embedding-3-small | Openai embedding model for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PLUGIN_AES_AUTH_SECRET` | backend | (secret) | Generated plugin aes auth secret. Keep private and preserve with backups. |
| `PLUGIN_AES_STATE_SECRET` | backend | (secret) | Generated plugin aes state secret. Keep private and preserve with backups. |
| `OPENAI_EMBEDDING_API_KEY` | backend | (secret) | Required operator-supplied openai embedding api key. Enter your own value before deployment. |
| `OPENAI_EMBEDDING_BASE_URL` | backend | https://api.openai.com/v1 | Openai embedding base url for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `FILE_UPLOAD_COMPONENT_TYPE` | backend | storage | File upload component type for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `STORAGE_UPLOAD_HTTP_SCHEME` | backend | https | Storage upload http scheme for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OPENAI_EMBEDDING_REQUEST_DIMS` | backend | 1536 | Openai embedding request dims for backend. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PLUGIN_AES_OAUTH_TOKEN_SECRET` | backend | (secret) | Generated plugin aes oauth token secret. Keep private and preserve with backups. |
| `ETCD_LISTEN_CLIENT_URLS` | etcd | http://0.0.0.0:2379 | Etcd listen client urls for etcd. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ETCD_QUOTA_BACKEND_BYTES` | etcd | 4294967296 | Etcd quota backend bytes for etcd. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ALLOW_NONE_AUTHENTICATION` | etcd | yes | Allow none authentication for etcd. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ETCD_AUTO_COMPACTION_MODE` | etcd | revision | Etcd auto compaction mode for etcd. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ETCD_ADVERTISE_CLIENT_URLS` | etcd | - | Etcd advertise client urls resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ETCD_AUTO_COMPACTION_RETENTION` | etcd | 1000 | Etcd auto compaction retention for etcd. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LOOKUP_HOST` | nsqd | - | Lookup host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `BROADCAST_HOST` | nsqd | - | Broadcast host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PORT` | coze-studio | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `ACCESS_USER` | coze-studio | (secret) | Access user for coze-studio. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | coze-studio | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | coze-studio | 80 | Upstream port for coze-studio. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | coze-studio | (secret) | Generated access password. Keep private and preserve with backups. |
| `MYSQL_USER` | mysql | (secret) | Mysql user for mysql. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MYSQL_DATABASE` | mysql | opencoze | Mysql database for mysql. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MYSQL_PASSWORD` | mysql | (secret) | Generated mysql password. Keep private and preserve with backups. |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) | Generated mysql root password. Keep private and preserve with backups. |
| `S3_BUCKETS` | storage | opencoze milvus | S3 buckets for storage. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MINIO_ROOT_USER` | storage | (secret) | Generated minio root user. Keep private and preserve with backups. |
| `MINIO_ROOT_PASSWORD` | storage | (secret) | Generated minio root password. Keep private and preserve with backups. |

## Configuration

- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Volume:** `/bitnami/elasticsearch/data`
- **Start command:** `/nsqlookupd`
- **Start command:** `milvus run standalone`
- **Volume:** `/var/lib/milvus`
- **Volume:** `/bitnami/etcd`
- **Start command:** `sh -c 'exec /nsqd --data-path=/data --lookupd-tcp-address="$LOOKUP_HOST:4160" --broadcast-address="$BROADCAST_HOST"'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci`
- **Volume:** `/var/lib/mysql`

**Category:** AI/ML · **Languages:** JavaScript, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/coze-studio)
