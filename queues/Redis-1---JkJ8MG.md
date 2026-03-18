# Deploy Redis : 1$ on Railway

n8n-Optimized Redis Database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/JkJ8MG)

## About

# n8n-Optimized Redis Database

## What You Get
This template provides a Redis in-memory database service optimized for use within n8n workflows as a data storage, caching, and message broker solution.

### Components:
- **Redis**: High-performance in-memory database with n8n node integration

## Key Features
- ✅ **n8n Node Integration**: Ready for Redis node operations in your workflows
- ✅ **Data Persistence**: Store workflow data between executions
- ✅ **Caching Layer**: Improve performance by caching API responses
- ✅ **Pub/Sub Messaging**: Build event-driven workflows with message subscriptions
- ✅ **Atomic Operations**: Reliable counters and distributed locks for workflows
- ✅ **Fast Storage**: Sub-millisecond data access for time-sensitive operations
- ✅ **IPv6 Ready**: Full IPv6 support for Railway's network infrastructure

## Usage In n8n Workflows
1. **Add Redis Node**: Use the Redis node in your n8n workflows
2. **Configure Connection**: Enter the connection details shown below
3. **Choose Operations**: Use SET, GET, HSET, PUBLISH, SUBSCRIBE, and other Redis commands

## Redis Node Configuration
When adding a Redis node in your n8n workflow, use these credentials:
- **Host**: `${{redis.REDIS_HOST}}`
- **Port**: `${{redis.REDIS_PORT}}` (typically 6379)
- **Username**: `${{redis.REDIS_USERNAME}}` (typically "default")
- **Password**: `${{redis.REDIS_PASSWORD}}`
- **Database**: 0
- **Use TLS/SSL**: No (unless specifically configured)

## Common Workflow Use Cases
- **API Rate Limiting**: Store API call counts and timestamps
- **Cross-Workflow Data Sharing**: Share data between different workflows
- **Caching**: Store expensive API responses for reuse
- **Job Queues**: Create custom queuing systems with RPUSH/LPOP
- **Counters**: Track metrics with atomic increment operations
- **Session Storage**: Maintain web session state across workflow runs
- **Feature Flags**: Store flags to control workflow behavior

## Technical Specifications
- Redis 7.x with optimized configuration
- Persistent storage for reliable data retention
- Memory policies tuned for workflow data patterns
- High availability for mission-critical workflows
- Maximum compatibility with n8n Redis nodes

Support me if you think this is good, one dollar is also very valuable to me, I'm really broke man. https://linktr.ee/givemesomehope

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis-workflow | [antisofisme/railway](https://github.com/antisofisme/railway) (root: n8n/redis) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `REDIS_URL` | redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}/0 |
| `REDIS_BIND` | :: |
| `REDIS_PORT` | 6379 |
| `REDIS_FAMILY` | 0 |
| `REDIS_LAZYFREE` | yes |
| `REDIS_LOGLEVEL` | notice |
| `REDIS_PASSWORD` | (secret) |
| `REDIS_USERNAME` | (secret) |
| `REDIS_MAXMEMORY` | 4gb |
| `REDIS_APPENDONLY` | yes |
| `REDIS_IO_THREADS` | 4 |
| `REDIS_MAXCLIENTS` | 10000 |
| `REDIS_APPENDFSYNC` | everysec |
| `REDIS_TCP_BACKLOG` | 511 |
| `REDIS_TLS_ENABLED` | false |
| `REDIS_IPV6_ENABLED` | yes |
| `REDIS_RDB_SAVE_KEYS` | 1 10 10000 |
| `REDIS_TCP_KEEPALIVE` | 300 |
| `ALLOW_EMPTY_PASSWORD` | (secret) |
| `REDIS_ACTIVEREHASHING` | yes |
| `REDIS_CLUSTER_ENABLED` | false |
| `REDIS_MAXMEMORY_POLICY` | allkeys-lru |
| `REDIS_RDB_SAVE_SECONDS` | 900 300 60 |
| `REDIS_REPLICATION_MODE` | master |
| `REDIS_MAXMEMORY_SAMPLES` | 10 |
| `REDIS_AUTO_AOF_REWRITE_MIN_SIZE` | 64mb |
| `REDIS_AUTO_AOF_REWRITE_PERCENTAGE` | 100 |

## Configuration

- **Volume:** `/bitnami/redis/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/JkJ8MG)
