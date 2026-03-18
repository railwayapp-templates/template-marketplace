# Deploy ScyllaDB (Deprecated) on Railway

Use https://railway.app/template/6RHNrS?referralCode=NreDXR instead!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/uHWaRy)

## About

# ScyllaDB

[ScyllaDB](http://www.scylladb.com/) is a high-performance NoSQL database system, fully compatible with Apache Cassandra.

## Features
- ScyllaDB out-of-the-box

## Usage
- Add a project as new service
- Edit a service's configuration to point to ScyllaDB's railway public network's domain. You can find these value from these special variables (Can be found on ScyllaDB service -> Variables tab):
     - `$SCYLLA_HOST`
     - `$SCYLLA_PORT`
- Your service(s) should now be connected to the ScyllaDB

## Known Issues
- [IPv6 support is broken on version newer than 5.1.4](https://github.com/scylladb/scylladb/issues/14738) so you can only use Railway's TCP Public Network to connect to the service. You can use [ScyllaDB 5.1.4](https://railway.app/template/6RHNrS?referralCode=NreDXR) template instead if you need IPv6 support (to use Railway's Private Network for example).

## Environment Variables
- `MEM`: Memory limit, default: `2G`
- `SMP`: Restricts ScyllaDB to N logical cores, default: `2`
- `LISTEN_ADDR`: ScyllaDB's listen address, default: `0.0.0.0`
- `API_ADDR`: ScyllaDB's Rest API address, default: `0.0.0.0`

## Special Environment Variables
- `SCYLLA_HOST`: You can use this variable's value to connect your software to ScyllaDB. You can also use it to connect to ScyllaDB from you favorite DB (Cassandra-compatible) client
- `SCYLLA_PORT`: You can use this variable's value to connect your software to ScyllaDB. You can also use it to connect to ScyllaDB from you favorite DB (Cassandra-compatible) client

## Learn More
- [Best Practices for Running ScyllaDB on Docker](https://opensource.docs.scylladb.com/stable/operating-scylla/procedures/tips/best-practices-scylla-on-docker.html)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ScyllaDB | `ghcr.io/null2264/scylladb-railway:2025.1-experimental` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MEM` | 2G | Memory limit |
| `SMP` | 2 | CPU Core Count limit |
| `API_ADDR` | 0.0.0.0 | ScyllaDB's Rest API address. |
| `OVERPROV` | 1 | Toggle overprovisioned mode, recommended to leave it on (1 = on, 0 = off) |
| `LISTEN_ADDR` | 0.0.0.0 | The IP that ScyllaDB binds to for connection. |
| `SCYLLA_HOST` | - | Keep as is! Use this variable's value to connect your software to ScyllaDB. |
| `SYCLLA_PORT` | - | Keep as is! Use this variable's value to connect your software to ScyllaDB. |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to ScyllaDB |
| `SCYLLA_PRIVATE_HOST` | - | Keep as is! Use this variable's value to connect your software to ScyllaDB (Through Railway's Private Network, requires IPv6). |
| `SCYLLA_PRIVATE_PORT` | - | Keep as is! Use this variable's value to connect your software to ScyllaDB (Through Railway's Private Network, requires IPv6). |

## Configuration

- **TCP Proxies:** 9042
- **Volume:** `/var/lib/scylla`

**Category:** Storage

[View on Railway →](https://railway.com/template/uHWaRy)
