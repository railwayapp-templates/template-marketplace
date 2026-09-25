# Deploy etcd on Railway

etcd 3.7 distributed key-value store with authentication enabled.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/etcd)

## About

etcd is the strongly consistent, distributed key-value store behind Kubernetes. Applications use it for configuration, service discovery, leader election and distributed locks, reading and writing keys through a gRPC API with watches, leases and transactions. Client libraries exist for Go, Python, Java, Node.js, Rust and more.

This template deploys etcd v3.7.2 as a single node from a small public wrapper image that builds on the official release, pinned by digest. On first boot the wrapper creates the `root` user with a generated password and enables authentication, so the server is never open. Data is stored on a Railway volume with hourly auto-compaction and a 2 GB backend quota. Services connect over the private network on port 2379, and external clients use the Railway TCP proxy. A single node gives no fault tolerance, but it suits development and small production setups on the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| etcd | [aalfath/etcd-railway-template](https://github.com/aalfath/etcd-railway-template) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 2379 |
| `ETCD_ROOT_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **TCP Proxies:** 2379
- **Volume:** `/etcd-data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/etcd)
