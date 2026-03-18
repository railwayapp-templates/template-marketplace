# Deploy Valkey on Railway

A distributed key-value database for caching and realtime workloads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/valkey-1)

## About

**What is Valkey?**  
Valkey is an open-source, high-performance in-memory key/value datastore created as a modern fork of Redis OSS under a permissive BSD license. It supports rich data structures and high-throughput workloads, making it ideal for caching, message queuing, real-time analytics, and more.

---

Hosting Valkey on Railway is streamlined and production-ready. You’ll deploy Valkey using the official Docker image, alongside a persistent volume for data durability, all configured via environment variables. Railway handles secrets, logs, deployment pipelines and horizontal/vertical scaling. With a dedicated Railway volume for storing the Valkey data directory, your key/value store persists across restarts and updates without manual config file edits. The setup delivers a self-hosted high-performance datastore stack that you can spin up in minutes and scale as your application demands grow.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Valkey | `valkey/valkey` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `VALKEY_EXTRA_FLAGS` | --save 60 10 --loglevel warning | CLI Flags for Valkey Server |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/valkey-1)
