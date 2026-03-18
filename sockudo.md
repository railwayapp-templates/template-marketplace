# Deploy Sockudo on Railway

Pusher compatible realtime server, performant alternative to socketi.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/sockudo)

## About

Sockudo is a Pusher protocol-compatible WebSocket server written in Rust.
You can keep existing Pusher-style integrations while running realtime infrastructure yourself.

Drop-in Pusher replacement built in Rust. Own your WebSocket infrastructure with enterprise features like delta compression, tag filtering, and multi-region scaling.

Why Sockudo?
Built for teams that need control, performance, and advanced features beyond basic pub/sub.

Blazing Fast
Written in Rust with async I/O. Handle millions of concurrent connections with minimal resource usage. Scales horizontally with Redis, NATS, or Redis Cluster.

Drop-in Compatible
Keep your existing Pusher integrations. Works seamlessly with pusher-js, Laravel Echo, and all official Pusher SDKs. Migrate without changing client code.

Advanced Features
Delta compression with conflation keys reduces bandwidth by 80-95%. Server-side tag filtering sends only relevant messages to clients.

Production Ready
Built-in rate limiting, origin validation, per-app quotas, health checks, Prometheus metrics, and webhook batching. Deploy with confidence.

Flexible Storage
Store app configs in memory, MySQL, PostgreSQL, DynamoDB, ScyllaDB, or Redis. Choose what fits your infrastructure.

Developer Friendly
First-class TypeScript client with Filter API, delta reconstruction, and ergonomic subscription management. JSON config with environment variable overrides.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Sockudo | [orenaksakal/sockudo-railway](https://github.com/orenaksakal/sockudo-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `REDIS_URL` | Sockudo | - | Local redis instance |
| `CACHE_DRIVER` | Sockudo | redis | Cache driver |
| `QUEUE_DRIVER` | Sockudo | redis | Queue driver |
| `ADAPTER_DRIVER` | Sockudo | redis | Adapter driver |
| `RATE_LIMITER_DRIVER` | Sockudo | redis | Use redis for ratelimiter |
| `RATE_LIMITER_ENABLED` | Sockudo | true | Enable ratelimiter |
| `SOCKUDO_DEFAULT_APP_ID` | Sockudo | - | Default app's id for pusher sdk. |
| `SOCKUDO_DEFAULT_APP_KEY` | Sockudo | - | Default app's key for pusher sdk. |
| `SOCKUDO_DEFAULT_APP_SECRET` | Sockudo | (secret) | Default app's secret for pusher sdk |
| `DELTA_COMPRESSION_CLUSTER_COORDINATION` | Sockudo | false | Delta compression reduces bandwidth by transmitting only the differences between consecutive messages instead of sending full payloads every time. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/sockudo)
