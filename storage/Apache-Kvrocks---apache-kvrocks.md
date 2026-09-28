# Deploy Apache Kvrocks on Railway

Apache Kvrocks 2.17: Redis-compatible store that keeps data on disk.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-kvrocks)

## About

Apache Kvrocks is a distributed key-value database that speaks the Redis protocol but stores data in RocksDB on disk. Existing Redis clients and commands work against it, while the dataset can grow far beyond the available memory. It is an Apache Software Foundation project used for caches, queues and counters.

This template runs the official `apache/kvrocks:2.17.0` image as one service. Data lives on a Railway volume, so keys survive restarts and redeploys, and memory use stays low even for large datasets. The server requires the generated password and listens on IPv4 and IPv6. Services in the project connect over the private network, and a TCP proxy allows connections from outside Railway. Kvrocks accepts `AUTH ` but not the two-argument `AUTH default ` form, so connection URLs leave the username empty. The process runs as the unprivileged `kvrocks` user and shuts down cleanly on redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kvrocks | `apache/kvrocks:2.17.0` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `KVROCKS_PASSWORD` | (secret) |

## Configuration

- **Start command:** `sh -c 'chown kvrocks:kvrocks /var/lib/kvrocks; exec setpriv --reuid=kvrocks --regid=kvrocks --init-groups kvrocks -c - --dir /var/lib/kvrocks --bind "0.0.0.0 ::" --port 6666 --requirepass "$KVROCKS_PASSWORD" --workers 4 --pidfile /tmp/kvrocks.pid --log-dir stdout </dev/null'`
- **TCP Proxies:** 6666
- **Volume:** `/var/lib/kvrocks`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/apache-kvrocks)
