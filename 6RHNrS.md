# Deploy ScyllaDB on Railway

A high-performance NoSQL database system

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/6RHNrS)

## About

[ScyllaDB](http://www.scylladb.com/) is a high-performance NoSQL database system, fully compatible with Apache Cassandra.

ScyllaDB lets you deploy ScyllaDB on Railway and use it out-of-the-box.

### License

- ScyllaDB prior than v2025.x is licensed under GNU Affero General Public License version 3 and the Apache License, and is a **free and open-source** software.
- ScyllaDB version v2025.x or newer are licensed under [ScyllaDB Software License Agreement](https://github.com/scylladb/scylladb/blob/8d64be94e2638b12686b794cee2e4b7f5cdb5b99/LICENSE-ScyllaDB-Source-Available.md), and is now a **source-available** software. (REF: https://www.scylladb.com/2024/12/18/why-were-moving-to-a-source-available-license/)

### Versions
This template uses v5.1.4 by default due to IPv6 support being broken on newer version of ScyllaDB, but there are other versions that you can use: https://github.com/users/null2264/packages/container/package/scylladb-railway. (This will be changing soon once Railway rolled out IPv4 Private Network for everyone)

Please keep in mind that versions with the format YYYY.MAJOR.MINOR are **no longer** free and open-source software! (The last open source version of ScyllaDB is v6.2)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ScyllaDB | `ghcr.io/null2264/scylladb-railway:5.1.4-v2` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MEM` | 2G | Memory limit |
| `SMP` | 2 | CPU Core Count limit |
| `SEEDS` | :: | ScyllaDB's seed list, seperated by commas |
| `API_ADDR` | :: | ScyllaDB's Rest API address. Change this to 0.0.0.0 for IPv4 support. |
| `OVERPROV` | 1 | Toggle overprovisioned mode, recommended to leave it on (1 = on, 0 = off) |
| `LISTEN_ADDR` | :: | The IP that ScyllaDB binds to for connection. Change this to 0.0.0.0 for IPv4 support. |
| `SCYLLA_HOST` | - | Keep as is! Use this variable's value to connect your software to ScyllaDB. |
| `SYCLLA_PORT` | - | Keep as is! Use this variable's value to connect your software to ScyllaDB. |
| `AUTH_SUPERUSER_NAME` | cassandra | Username for ScyllaDB's superuser |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to ScyllaDB. You can use this to connect to ScyllaDB using something like `cqlsh` |
| `SCYLLA_PRIVATE_HOST` | - | Keep as is! Use this variable's value to connect your software to ScyllaDB (Through Railway's Private Network, requires IPv6). |
| `SCYLLA_PRIVATE_PORT` | - | Keep as is! Use this variable's value to connect your software to ScyllaDB (Through Railway's Private Network, requires IPv6). |
| `AUTH_SUPERUSER_SHA512_PASSWORD` | (secret) | Password for ScyllaDB's superuser (Use `mkpasswd --method=sha512crypt [password]` or `openssl passwd -6 [password]` to generate the value!) |

## Configuration

- **TCP Proxies:** 9042
- **Volume:** `/var/lib/scylla`

**Category:** Storage

[View on Railway →](https://railway.com/template/6RHNrS)
