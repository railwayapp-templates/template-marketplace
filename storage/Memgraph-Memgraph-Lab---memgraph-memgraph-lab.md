# Deploy Memgraph + Memgraph Lab on Railway

[Updated Jul 2026] Production Ready Memgraph Instance with Memgraph Lab

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memgraph-memgraph-lab)

## About

Memgraph is an open source, in-memory graph database written in C++: fast, ACID
compliant, Cypher and Bolt compatible, with the MAGE library of 300+ graph algorithms
included. Memgraph Lab is its visual interface for writing queries, exploring graphs,
and monitoring your instance. This template deploys both, wired together and ready to
use.

You get two services. The database runs the official `memgraph/memgraph-mage` image,
pinned to a specific version, with authentication enabled from the first boot, a
persistent volume at `/var/lib/memgraph`, and a public Bolt endpoint published as
`BOLT_URL`. Memgraph Lab runs on its own public URL, and its connect form comes
pre-filled with the database's private network address, so the two talk to each other
without leaving Railway. Memory limit and log level are plain environment variables.
Plan at least 2 GB of RAM for the database, since Memgraph keeps its working set in
memory. Lab itself is lightweight.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Memgraph Lab | `memgraph/lab:3.11.0` | Web service |
| Memgraph | `memgraph/memgraph-mage:3.11.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Memgraph Lab | 3000 |
| `QUICK_CONNECT_MG_PORT` | Memgraph Lab | 7687 |
| `PYTHONPATH` | Memgraph | /home/memgraph/.local/lib/python3.12/site-packages |
| `MEMGRAPH_USER` | Memgraph | (secret) |
| `MEMGRAPH_PASSWORD` | Memgraph | (secret) |
| `MEMGRAPH_MEMORY_LIMIT` | Memgraph | 1024 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'exec /usr/lib/memgraph/memgraph --bolt-address=:: --memory-limit=${MEMGRAPH_MEMORY_LIMIT:-1024} --log-level=${MEMGRAPH_LOG_LEVEL:-WARNING} --also-log-to-stderr ${MEMGRAPH_EXTRA_ARGS:-}'`
- **TCP Proxies:** 7687
- **Volume:** `/var/lib/memgraph`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/memgraph-memgraph-lab)
