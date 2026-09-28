# Deploy Elasticsearch | (Just Updated) v9 Search & Vector DB, Locked Down on Railway

Elasticsearch 9 search + vector DB. No anonymous reads, password resets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/elasticsearch-or-just-updated-v9-search-)

## About

Elasticsearch is the distributed search and analytics engine behind the Elastic Stack: full-text
search, structured queries and aggregations, dense-vector (kNN) search for RAG and semantic
search, and log analytics, all over one REST API.

This template runs Elasticsearch 9.5.3 as a single node with its index on a Railway volume,
authentication on from the first boot, and a prebuilt, digest-pinned image, so a deploy starts in
seconds instead of building from source.

Elasticsearch runs on Railway only after a few things are handled for you:

- **Nothing is readable without a password.** Only `GET /` (name and version) answers anonymously,
  because Railway's healthcheck needs it. `_cluster/state`, `_nodes`, `_cat/*` and every index
  return `401`. A common Railway setup grants anonymous users the `monitor` privilege, which
  exposes every index name and its full field mapping through `_cluster/state`, plus the node's
  IP address and OS through `_nodes`, to anyone holding the URL.
- **Your password variable stays in charge.** Elasticsearch only reads `ELASTIC_PASSWORD` until
  the password is first changed through its API; after that, a stock deploy ignores the variable
  forever. Here the container checks it on every boot and re-applies it, so setting a new value
  and redeploying is a working password reset.
- **The volume is repaired, not worked around.** Railway mounts volumes owned by root while
  Elasticsearch refuses to run as root. The entrypoint takes ownership of the data directory and
  then hands the process to the unprivileged user.
- **Memory-mapped storage stays on.** mmap is Elasticsearch's fast path for index files and HNSW
  vector graphs. It is enabled whenever the host's `vm.max_map_count` allows it, which Railway's
  does.
- **The heap follows your plan.** No `-Xmx` is hard-coded, so Elasticsearch sizes its heap from
  the container's memory limit.
- **TLS is Railway's job.** Railway terminates HTTPS at its edge, so the node serves plain HTTP
  internally and binds IPv4 and IPv6, which makes it reachable from your other services over
  Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| elasticsearch | `ghcr.io/bon5co/elasticsearch-railway@sha256:c7ee7e4eb04a78b22b2be03b46181816f712dbc9391d09125c00441b4253e358` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ELASTIC_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/share/elasticsearch/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/elasticsearch-or-just-updated-v9-search-)
