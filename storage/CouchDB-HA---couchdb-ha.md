# Deploy CouchDB HA on Railway

Clustered CouchDB: Document database with load balancing, volumes & HA

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/couchdb-ha)

## About

Apache CouchDB is a document database that stores JSON, speaks plain HTTP, and treats replication as a first-class feature rather than an add-on. Every document is reachable at a URL, and any two CouchDB instances — or a server and a PouchDB database inside a browser tab — sync in either direction and resolve conflicts deterministically. That is why teams self-host CouchDB for offline-first apps, field data collection, and anything that must keep working when the network does not.

Deploy CouchDB on Railway in the shape the project recommends for production: a three-node cluster, not a single container. `couchdb-node1`, `couchdb-node2` and `couchdb-node3` each run CouchDB 3.5 with their own volume and join into one cluster over Railway's private network. `couchdb-lb` is a small Caddy service that holds the public domain and round-robins across the nodes, health-checking each so one that goes away stops receiving traffic. Databases get two shards and three replicas, so losing a node still leaves a write quorum.

![Three CouchDB nodes behind a Caddy load balancer on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789272241/couchdb-architecture.webp)

CouchDB solves a problem most databases push back onto the application: keeping copies of the same data in sync across machines that are not always reachable. Its replication protocol is incremental, resumable, bidirectional and conflict-aware, so a laptop offline for a week reconnects and reconciles without custom merge code. Self-hosting matters because the sync endpoint *is* the product, and Apache-2.0 puts no edition gate on clustering.

Key features:

- HTTP/JSON API — no proprietary wire protocol or driver required
- Multi-master replication with conflict detection and revision history
- Mango, a declarative JSON query language, with secondary indexes
- JavaScript map/reduce views for aggregation and materialised indexes
- Changes feeds, long-poll and continuous, for reactive apps
- PouchDB compatibility, so browsers and React Native apps sync natively

The Railway architecture is four services. The three `couchdb-node` services are the database: they share one cluster, shard each database across the group, and replicate every shard to all three. `couchdb-lb` terminates the public domain, spreads requests over the nodes, and probes each node's liveness endpoint so traffic skips one that is restarting. Only the load balancer is reachable from the internet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| couchdb-node3 | [gridalpha/couchdb-railway](https://github.com/gridalpha/couchdb-railway) | Database |
| couchdb-node2 | [gridalpha/couchdb-railway](https://github.com/gridalpha/couchdb-railway) | Database |
| couchdb-node1 | [gridalpha/couchdb-railway](https://github.com/gridalpha/couchdb-railway) | Database |
| couchdb-lb | [gridalpha/couchdb-railway](https://github.com/gridalpha/couchdb-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | couchdb-node3 | 5984 | CouchDB clustered HTTP port |
| `COUCHDB_USER` | couchdb-node3 | (secret) | Cluster administrator username |
| `COUCHDB_UUID` | couchdb-node3 | - | Server id, shared by every node |
| `COUCHDB_SECRET` | couchdb-node3 | (secret) | Session cookie signing key |
| `TINI_SUBREAPER` | couchdb-node3 | 1 | Reap children when tini is not PID 1 |
| `COUCHDB_PASSWORD` | couchdb-node3 | (secret) | Cluster administrator password |
| `PRIVATE_HOSTPORT` | couchdb-node3 | couchdb-node3.railway.internal:5984 | Address the load balancer dials |
| `COUCHDB_CLUSTER_N` | couchdb-node3 | 3 | Replicas of each shard |
| `COUCHDB_CLUSTER_Q` | couchdb-node3 | 2 | Shards per database |
| `COUCHDB_LOG_LEVEL` | couchdb-node3 | warning | CouchDB log verbosity |
| `COUCHDB_NODE_HOST` | couchdb-node3 | couchdb-node3.railway.internal | This node's Erlang node name |
| `COUCHDB_CLUSTER_ROLE` | couchdb-node3 | member | Joins the cluster the coordinator forms |
| `COUCHDB_CORS_ORIGINS` | couchdb-node3 | - | Set to enable CORS for browser clients |
| `COUCHDB_ERLANG_COOKIE` | couchdb-node3 | - | Shared node authentication token |
| `TINI_KILL_PROCESS_GROUP` | couchdb-node3 | 1 | Forward SIGTERM to the process group |
| `COUCHDB_MAX_DOCUMENT_SIZE` | couchdb-node3 | 8000000 | Largest accepted document, bytes |
| `PORT` | couchdb-node2 | 5984 | CouchDB clustered HTTP port |
| `COUCHDB_USER` | couchdb-node2 | (secret) | Cluster administrator username |
| `COUCHDB_UUID` | couchdb-node2 | - | Server id, shared by every node |
| `COUCHDB_SECRET` | couchdb-node2 | (secret) | Session cookie signing key |
| `TINI_SUBREAPER` | couchdb-node2 | 1 | Reap children when tini is not PID 1 |
| `COUCHDB_PASSWORD` | couchdb-node2 | (secret) | Cluster administrator password |
| `PRIVATE_HOSTPORT` | couchdb-node2 | couchdb-node2.railway.internal:5984 | Address the load balancer dials |
| `COUCHDB_CLUSTER_N` | couchdb-node2 | 3 | Replicas of each shard |
| `COUCHDB_CLUSTER_Q` | couchdb-node2 | 2 | Shards per database |
| `COUCHDB_LOG_LEVEL` | couchdb-node2 | warning | CouchDB log verbosity |
| `COUCHDB_NODE_HOST` | couchdb-node2 | couchdb-node2.railway.internal | This node's Erlang node name |
| `COUCHDB_CLUSTER_ROLE` | couchdb-node2 | member | Joins the cluster the coordinator forms |
| `COUCHDB_CORS_ORIGINS` | couchdb-node2 | - | Set to enable CORS for browser clients |
| `COUCHDB_ERLANG_COOKIE` | couchdb-node2 | - | Shared node authentication token |
| `TINI_KILL_PROCESS_GROUP` | couchdb-node2 | 1 | Forward SIGTERM to the process group |
| `COUCHDB_MAX_DOCUMENT_SIZE` | couchdb-node2 | 8000000 | Largest accepted document, bytes |
| `PORT` | couchdb-node1 | 5984 | CouchDB clustered HTTP port |
| `COUCHDB_USER` | couchdb-node1 | (secret) | Cluster administrator username |
| `COUCHDB_UUID` | couchdb-node1 | - | Server id, shared by every node |
| `COUCHDB_SECRET` | couchdb-node1 | (secret) | Session cookie signing key |
| `TINI_SUBREAPER` | couchdb-node1 | 1 | Reap children when tini is not PID 1 |
| `COUCHDB_PASSWORD` | couchdb-node1 | (secret) | Cluster administrator password |
| `PRIVATE_HOSTPORT` | couchdb-node1 | couchdb-node1.railway.internal:5984 | Address the load balancer dials |
| `COUCHDB_CLUSTER_N` | couchdb-node1 | 3 | Replicas of each shard |
| `COUCHDB_CLUSTER_Q` | couchdb-node1 | 2 | Shards per database |
| `COUCHDB_LOG_LEVEL` | couchdb-node1 | warning | CouchDB log verbosity |
| `COUCHDB_NODE_HOST` | couchdb-node1 | couchdb-node1.railway.internal | This node's Erlang node name |
| `COUCHDB_CLUSTER_ROLE` | couchdb-node1 | coordinator | Forms the cluster at boot |
| `COUCHDB_CORS_ORIGINS` | couchdb-node1 | - | Set to enable CORS for browser clients |
| `COUCHDB_CLUSTER_PEERS` | couchdb-node1 | couchdb-node2.railway.internal couchdb-node3.railway.internal | Peers to join |
| `COUCHDB_ERLANG_COOKIE` | couchdb-node1 | - | Shared node authentication token |
| `TINI_KILL_PROCESS_GROUP` | couchdb-node1 | 1 | Forward SIGTERM to the process group |
| `COUCHDB_MAX_DOCUMENT_SIZE` | couchdb-node1 | 8000000 | Largest accepted document, bytes |
| `PORT` | couchdb-lb | 8080 | Public HTTP port Caddy listens on |
| `COUCHDB_UPSTREAMS` | couchdb-lb | - | Nodes to balance across |

## Configuration

- **Healthcheck:** `/_up`
- **Volume:** `/opt/couchdb/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/couchdb-ha)
