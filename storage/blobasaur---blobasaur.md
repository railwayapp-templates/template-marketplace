# Deploy blobasaur on Railway

Redis-protocol blob store backed by sharded SQLite on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/blobasaur)

## About

[Blobasaur](https://github.com/iamd3vil/blobasaur) is a high-performance Redis-protocol blob store backed by sharded SQLite. Clients speak standard Redis commands (`GET`/`SET`/`HGET`/`HSET`, TTL) while data lands on a volume.

This template deploys `ghcr.io/iamd3vil/blobasaur:latest` with a persistent volume at `/app/blob_data`, a TCP proxy on Redis port 6379, and an optional Prometheus metrics domain on port 9090. On first boot the start command clears an empty volume so shard databases can be created cleanly. Connect with any Redis client to the TCP proxy endpoint Railway assigns.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| blobasaur | `ghcr.io/iamd3vil/blobasaur:latest` | TCP service |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /app/blob_data; if [ ! -f /app/blob_data/shard_0.db ]; then rm -rf /app/blob_data/* /app/blob_data/.[!.]* 2>/dev/null || true; fi; cat > /app/config.toml <<EOF
data_dir = "/app/blob_data"
num_shards = 4
addr = "0.0.0.0:6379"
async_write = true
batch_size = 50
batch_timeout_ms = 10

[storage_compression]
enabled = true
algorithm = "zstd"
level = 3

[sqlite]
cache_size_mb = 200
busy_timeout_ms = 5000
synchronous = "NORMAL"
auto_upgrade_legacy_auto_vacuum = true
auto_upgrade_legacy_auto_vacuum_concurrency = 2

[metrics]
enabled = true
addr = "0.0.0.0:9090"
EOF
exec blobasaur --config /app/config.toml'`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/app/blob_data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/blobasaur)
