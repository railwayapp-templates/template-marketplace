# Deploy KeyDB on Railway

A Database Built for Scale

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/keydb)

## About

<p align="center">
    <a href="https://docs.keydb.dev/">
        <img style="background: #313845; padding: 30px; border-radius: 5px; width: 400px;" src="https://docs.keydb.dev/img/keydb.svg" alt="keydb logo">
    </a>
</p>

<h3 align="center">A Database Built for Scale</h3>

<p align="center">KeyDB is a fully open source database, backed by Snap, and a faster drop in alternative to Redis</p>

# What is KeyDB?

KeyDB is a high performance fork of Redis with a focus on multithreading, memory efficiency, and high throughput. In addition to performance improvements, KeyDB offers features such as Active Replication, FLASH Storage and Subkey Expires. KeyDB has a MVCC architecture that allows you to execute queries such as KEYS and SCAN without blocking the database and degrading performance.

KeyDB maintains full compatibility with the Redis protocol, modules, and scripts. This includes the atomicity guarantees for scripts and transactions. Because KeyDB keeps in sync with Redis development KeyDB is a superset of Redis functionality, making KeyDB a drop in replacement for existing Redis deployments.

On the same hardware KeyDB can achieve significantly higher throughput than Redis. Active-Replication simplifies hot-spare failover allowing you to easily distribute writes over replicas and use simple TCP based load balancing/failover. KeyDB's higher performance allows you to do more on less hardware which reduces operation costs and complexity.

# Features

KeyDB Speeds Up The User Experience For Any Project.

Whether you're starting small or serving millions of users,
KeyDB enables you to provide a fast and reliable experience to your users.

- **High Throughput:** KeyDB is meant to handle heavy workloads with a single node benchmarking at over 1 million ops/sec. KeyDB is a multithreaded database and will outperform Redis on a per-node basis.

- **Low Latency:** By keeping data in-memory, KeyDB can serve up data with submillisecond latencies.

- **A Variety of Data Structures:** A variety of data structures are supported such as strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, geospatial indexes, and streams

- **Multiple Persistence Options:** Periodically dump the dataset to disk or by appending each command to a disk-based log. Durability preferences for RDB and AOF persistence are configurable.

- **MVCC Non-Blocking Architecture:** With an MVCC implementation at the underlying architecture, KeyDB can query individual snapshots of the database, avoiding otherwise blocking calls such as SCAN and KEYS. Such queries can now be called concurrently at scale without reducing overall performance of existing workloads.

- **Better EXPIRation:** KeyDB offers Subkey EXPIREs which enables expiration of members within a set. EXPIREs now also have near real time active deletion that removes major lags associated with old models of removing expired keys.

- **ModJS:** Create your own commands with KeyDB’s open source javascript module. Built on the powerful V8 JIT engine, ModJS is faster than LUA and supports many node.js modules to offer extensive library support for common tasks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| KeyDB | `eqalpha/keydb:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `KEYDB_URL` | - | URL to connect to KeyDB over the private network |
| `KEYDB_HOST` | - | Railway private domain name |
| `KEYDB_PORT` | 6379 | Port to connect to KeyDB over the private network |
| `KEYDB_USER` | (secret) | Default user to connect to KeyDB |
| `KEYDB_PASSWORD` | (secret) | Password to connect to KeyDB |
| `KEYDB_PUBLIC_URL` | - | URL to connect to KeyDB Publically |
| `KEYDB_PUBLIC_HOST` | - | Railway public TCP domain name |
| `KEYDB_PUBLIC_PORT` | - | Port to connect to KeyDB Publically |

## Configuration

- **Start command:** `/bin/sh -c "exec keydb-server /etc/keydb/keydb.conf --server-threads 16 --always-show-logo no --appendonly yes --requirepass ${KEYDB_PASSWORD} --port ${KEYDB_PORT}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/keydb)
