# Deploy Huly on Railway

Self-hosted project management and collaboration platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/huly)

## About

Huly requires multiple interconnected services: database layer, message broker, object storage, search engine, application services, and reverse proxy. Railway automatically handles networking between services, provides persistent storage volumes, and offers seamless SSL certificate provisioning. Private networking keeps internal services secure while exposing only necessary public endpoints through Caddy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Workspace Service | `hardcoreeng/workspace` | Worker |
| Authentication | `hardcoreeng/account` | Worker |
| Redpanda | `redpandadata/redpanda:v24.3.6` | Worker |
| Elasticsearch | `elasticsearch` | Database |
| MinIO | `minio/minio` | Database |
| Transactor Service | `hardcoreeng/transactor` | Worker |
| Caddy | `caddy:2-alpine` | Worker |
| cockroachdb | `cockroachdb/cockroach:latest-v24.2` | Database |
| Collaborator Service | `hardcoreeng/collaborator` | Worker |
| The UI | `hardcoreeng/front` | TCP service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_URL` | Workspace Service | postgresql://root@cockroachdb.railway.internal:26257/huly?sslmode=disable |
| `MINIO_PORT` | Workspace Service | 9000 |
| `ELASTIC_URL` | Workspace Service | http://elasticsearch.railway.internal:9200 |
| `SERVER_PORT` | Workspace Service | 3000 |
| `SERVER_SECRET` | Workspace Service | (secret) |
| `COCKROACH_HOST` | Workspace Service | cockroachdb.railway.internal:26257 |
| `MINIO_ENDPOINT` | Workspace Service | minio.railway.internal |
| `MINIO_ACCESS_KEY` | Workspace Service | minioadmin |
| `MINIO_SECRET_KEY` | Workspace Service | (secret) |
| `DB_URL` | Authentication | postgresql://root@cockroachdb.railway.internal:26257/huly?sslmode=disable |
| `SERVER_PORT` | Authentication | 3000 |
| `ACCOUNTS_URL` | Authentication | http://account.railway.internal:3000 |
| `SERVER_SECRET` | Authentication | (secret) |
| `COCKROACH_HOST` | Authentication | cockroachdb.railway.internal:26257 |
| `ES_JAVA_OPTS` | Elasticsearch | Xms512m -Xmx512m |
| `discovery.type` | Elasticsearch | single-node |
| `bootstrap.memory_lock` | Elasticsearch | true |
| `xpack.security.enabled` | Elasticsearch | false |
| `MINIO_ROOT_USER` | MinIO | (secret) |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) |
| `DB_URL` | Transactor Service | postgresql://root@cockroachdb.railway.internal:26257/huly?sslmode=disable |
| `MINIO_PORT` | Transactor Service | 9000 |
| `ELASTIC_URL` | Transactor Service | http://elasticsearch.railway.internal:9200 |
| `SERVER_PORT` | Transactor Service | 3000 |
| `SERVER_SECRET` | Transactor Service | (secret) |
| `COCKROACH_HOST` | Transactor Service | cockroachdb.railway.internal:26257 |
| `MINIO_ENDPOINT` | Transactor Service | minio.railway.internal |
| `MINIO_ACCESS_KEY` | Transactor Service | minioadmin |
| `MINIO_SECRET_KEY` | Transactor Service | (secret) |
| `REDPANDA_BROKERS` | Transactor Service | redpanda.railway.internal:9092 |
| `DB_URL` | Collaborator Service | postgresql://root@cockroachdb.railway.internal:26257/huly?sslmode=disable |
| `MINIO_PORT` | Collaborator Service | 9000 |
| `SERVER_PORT` | Collaborator Service | 3000 |
| `SERVER_SECRET` | Collaborator Service | (secret) |
| `COCKROACH_HOST` | Collaborator Service | cockroachdb.railway.internal:26257 |
| `MINIO_ENDPOINT` | Collaborator Service | minio.railway.internal |
| `MINIO_ACCESS_KEY` | Collaborator Service | minioadmin |
| `MINIO_SECRET_KEY` | Collaborator Service | (secret) |
| `REDPANDA_BROKERS` | Collaborator Service | redpanda.railway.internal:9092 |
| `PORT` | The UI | 8080 |

## Configuration

- **Start command:** `redpanda start --kafka-addr internal://0.0.0.0:9092 --advertise-kafka-addr internal://redpanda.railway.internal:9092 --pandaproxy-addr internal://0.0.0.0:8082 --advertise-pandaproxy-addr internal://redpanda.railway.internal:8082 --schema-registry-addr internal://0.0.0.0:8081 --rpc-addr redpanda.railway.internal:33145 --advertise-rpc-addr redpanda.railway.internal:33145 --mode dev-container --smp 1`
- **Volume:** `/usr/share/elasticsearch/data`
- **Start command:** `server /data --console-address ':9001'`
- **Volume:** `/data`
- **Start command:** `sh -c 'cat > /etc/caddy/Caddyfile << "EOFCADDY" :8080 {     handle_path /account* {         reverse_proxy account.railway.internal:3000     }     handle_path /api* {         reverse_proxy workspace.railway.internal:3000     }     handle_path /collaborator* {         reverse_proxy collaborator.railway.internal:3000     }     handle_path /transactor* {         reverse_proxy transactor.railway.internal:3000     }     handle_path /files* {         reverse_proxy minio.railway.internal:9000     }     handle {         reverse_proxy front.railway.internal:8080     } } EOFCADDY caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Start command:** `start-single-node --accept-sql-without-tls --listen-addr=0.0.0.0:26257`
- **Volume:** `/cockroach/cockroach-data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8080

**Category:** Other

[View on Railway →](https://railway.com/template/huly)
