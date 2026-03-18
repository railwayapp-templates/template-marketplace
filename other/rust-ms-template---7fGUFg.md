# Deploy rust-ms-template on Railway

rust gRPC + Postgres + backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/7fGUFg)

## About

# rust-grpc-quickstart-template

# CLIs

## Buf

https://buf.build/docs/installation

```sh
cargo install protoc-gen-prost-crate
```







































































### Generation

```sh
make protos
```
or
```sh
buf generate
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grpc-server | [oc8/rust-grpc-quickstart-template](https://github.com/oc8/rust-grpc-quickstart-template) | Worker |
| backup-manager | [oc8/backup-manager](https://github.com/oc8/backup-manager) | Database |
| redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | grpc-server | 50051 | - |
| `CACHE_TTL` | grpc-server | 60 | - |
| `REDIS_TLS` | grpc-server | false | - |
| `ENABLE_IPV6` | grpc-server | true | - |
| `METRICS_PORT` | grpc-server | 3000 | - |
| `REDIS_PASSWORD` | grpc-server | (secret) | - |
| `PORT` | backup-manager | 2703 | - |
| `POSTGRES_DB` | backup-manager | railway | - |
| `MINIO_REGION` | backup-manager | us-east-1 | - |
| `POSTGRES_USER` | backup-manager | (secret) | - |
| `BACKUP_COMPRESS` | backup-manager | tgz | - |
| `BACKUP_SCHEDULE` | backup-manager | 0 0 * * * | - |
| `POSTGRES_PASSWORD` | backup-manager | (secret) | - |
| `MINIO_SECRET_ACCESS_KEY` | backup-manager | (secret) | - |
| `REDISHOST` | redis | - | Railway Private Domain Name. |
| `REDISPORT` | redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | redis | - | URL to connect to Redis over private network. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** Rust, Dockerfile, PLpgSQL, Makefile, Python, Shell

[View on Railway →](https://railway.com/template/7fGUFg)
