# Deploy Memgraph on Railway

[Updated Jul 2026] Production Ready Memgraph Instance

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memgraph)

## About

Memgraph is an open source, in-memory graph database written in C++. It is fast, ACID
compliant, and runs transactional and analytical workloads in the same engine. It
speaks Cypher and Bolt, so Neo4j drivers work out of the box, and it ships with MAGE,
a library of over 300 graph algorithms.

This template gives you a production-ready Memgraph instance in one click. It runs the
official `memgraph/memgraph-mage` image, pinned to a specific version for stability.
Authentication is on from the start: an admin user is created on first boot with a
randomly generated password. Your data lives on a Railway volume mounted at
`/var/lib/memgraph`, so snapshots and write-ahead logs survive restarts and redeploys.
A public TCP endpoint exposes the Bolt protocol, and ready-made connection strings are
published as `BOLT_URL` and `BOLT_PRIVATE_URL`. Memory limit and log level are plain
environment variables, no start-command editing needed. Plan at least 2 GB of RAM,
since Memgraph keeps its working set in memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Memgraph | `memgraph/memgraph-mage:3.11.0` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PYTHONPATH` | /home/memgraph/.local/lib/python3.12/site-packages |
| `MEMGRAPH_USER` | (secret) |
| `MEMGRAPH_PASSWORD` | (secret) |
| `MEMGRAPH_MEMORY_LIMIT` | 1024 |

## Configuration

- **Start command:** `sh -c 'exec /usr/lib/memgraph/memgraph --bolt-address=:: --memory-limit=${MEMGRAPH_MEMORY_LIMIT:-1024} --log-level=${MEMGRAPH_LOG_LEVEL:-WARNING} --also-log-to-stderr ${MEMGRAPH_EXTRA_ARGS:-}'`
- **TCP Proxies:** 7687
- **Volume:** `/var/lib/memgraph`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/memgraph)
