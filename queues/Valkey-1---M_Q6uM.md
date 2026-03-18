# Deploy Valkey : 1$ on Railway

High-Performance Valkey In-Memory Database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/M_Q6uM)

## About

# High-Performance Valkey In-Memory Database

## What You Get
This template provides a standalone, fully optimized Valkey in-memory database service, offering Redis-compatible caching and data storage with enhanced performance and enterprise-grade reliability.

### Components:
- **Valkey**: High-performance Redis-compatible in-memory database with advanced optimizations

## Key Features
- ✅ **Redis Compatible**: Works with all Redis clients and libraries
- ✅ **Enhanced Performance**: Optimized memory management and faster operations
- ✅ **Production Ready**: Pre-configured with best practices for reliability
- ✅ **IPv6 Optimized**: Full IPv6 support for Railway's networking infrastructure
- ✅ **Secure by Default**: Authentication enabled and configurable
- ✅ **Low Memory Footprint**: Efficient memory utilization for cost savings

## Usage Instructions
1. **Deploy Template**: One-click deployment sets up Valkey with optimized settings
2. **Connect Applications**: Use the provided connection variables in your apps
3. **Scale as Needed**: Easily adjust memory allocation based on your requirements

## Environment Variables
- Connection string: `redis://${{valkey.REDIS_USERNAME}}:${{valkey.REDIS_PASSWORD}}@${{valkey.REDIS_HOST}}:${{valkey.REDIS_PORT}}/0`
- Default credentials: Username=`default`, Password=`valkey123` (change as needed)
- IPv6 support: Enabled by default for Railway compatibility

## Technical Specifications
- Latest Valkey version with memory-optimized configuration
- Persistent storage with AOF and RDB for data reliability
- Automatic memory management with volatile-LRU eviction policy
- Multi-threaded I/O for enhanced read performance
- Automatic defragmentation for better memory utilization
- Minimal logging with focus on critical information
- Configured for 10,000+ simultaneous connections

Support me if you think this is good, one dollar is also very valuable to me, I'm really broke man. https://linktr.ee/givemesomehope

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| valkey | [antisofisme/railway](https://github.com/antisofisme/railway) (root: n8n/valkey) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDIS_HOST` | - | Host Redis/Valkey |
| `REDIS_PORT` | 6379 | Port Redis/Valkey |
| `VALKEY_SAVE` | 900 1 300 100 60 10000 | Enhanced RDB snapshotting |
| `REDIS_PASSWORD` | (secret) | Password untuk koneksi Redis |
| `REDIS_USERNAME` | (secret) | Username untuk koneksi Redis |
| `VALKEY_TIMEOUT` | 0 | Tidak ada timeout koneksi |
| `VALKEY_LOGLEVEL` | notice | Hanya log error, warning, dan pesan penting |
| `VALKEY_MAXMEMORY` | 1536MB | Increased memory limit |
| `VALKEY_APPENDONLY` | yes | Aktifkan Append-Only File |
| `VALKEY_IO_THREADS` | 6 | Increased threads for better concurrency |
| `VALKEY_MAXCLIENTS` | 10000 | Maksimum koneksi klien |
| `VALKEY_APPENDFSYNC` | everysec | Best balance of performance/safety |
| `VALKEY_TCP_BACKLOG` | 2048 | Increased connection queue |
| `VALKEY_ACTIVEDEFRAG` | yes | Aktifkan defragmentasi otomatis |
| `VALKEY_BIND_ADDRESS` | 0.0.0.0 :: | Bind ke IPv4 dan IPv6 |
| `VALKEY_IPV6_ENABLED` | yes | Aktifkan dukungan IPv6 |
| `VALKEY_TCP_KEEPALIVE` | 60 | Reduced keepalive untuk respon lebih cepat |
| `VALKEY_LATENCY_TRACKING` | yes | Aktifkan pelacakan latensi |
| `VALKEY_MAXMEMORY_POLICY` | volatile-lru | Prioritize keeping non-expiring keys |
| `VALKEY_MAXMEMORY_SAMPLES` | 10 | More precise LRU |
| `VALKEY_PROTO_MAX_BULK_LEN` | 512mb | Ukuran bulk request maksimum |
| `VALKEY_REPLICA_LAZY_FLUSH` | yes | Flush asinkron untuk replika |
| `VALKEY_IO_THREADS_DO_READS` | yes | Gunakan thread untuk operasi baca |
| `VALKEY_ACTIVE_EXPIRE_EFFORT` | 5 | Optimize expiration scan |
| `VALKEY_AOF_USE_RDB_PREAMBLE` | yes | Faster restarts |
| `VALKEY_LAZYFREE_LAZY_EXPIRE` | yes | Expire asinkron |
| `VALKEY_LAZYFREE_LAZY_EVICTION` | yes | Eviksi asinkron |
| `VALKEY_ACTIVE_DEFRAG_CYCLE_MAX` | 75 | Maximum CPU percentage for defrag |
| `VALKEY_ACTIVE_DEFRAG_CYCLE_MIN` | 25 | Minimum CPU percentage for defrag |
| `VALKEY_LAZYFREE_LAZY_SERVER_DEL` | yes | Delete asinkron |
| `VALKEY_AUTO_AOF_REWRITE_MIN_SIZE` | 64mb | Minimum size for rewrite |
| `VALKEY_LATENCY_MONITOR_THRESHOLD` | 25 | Ambang monitor latensi (ms) |
| `VALKEY_NO_APPENDFSYNC_ON_REWRITE` | yes | Better write performance during rewrites |
| `VALKEY_CLIENT_OUTPUT_BUFFER_LIMIT` | normal 0 0 0 pubsub 32mb 8mb 60 slave 256mb 64mb 60 | Timezone |
| `VALKEY_AUTO_AOF_REWRITE_PERCENTAGE` | 100 | Optimize rewrites |
| `VALKEY_ACTIVE_DEFRAG_THRESHOLD_LOWER` | 5 | Lower threshold to start sooner |
| `VALKEY_ACTIVE_DEFRAG_THRESHOLD_UPPER` | 75 | Lowered to prevent high overhead |

## Configuration

- **Volume:** `/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/M_Q6uM)
