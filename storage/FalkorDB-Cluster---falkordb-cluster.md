# Deploy FalkorDB Cluster on Railway

High-availability FalkorDB cluster for AI, ML, and GraphRAG workloads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/falkordb-cluster)

## About

## Deploy and Host FalkorDB Cluster on Railway

[FalkorDB](https://www.falkordb.com) is a high-performance graph database purpose-built for GraphRAG, knowledge graphs, and AI/ML applications. It uses [GraphBLAS](https://graphblas.org/) for sparse adjacency matrix graph representation, delivering low-latency Cypher queries on highly connected data.

This template deploys a **multi-node FalkorDB cluster** with:
- Multiple primary nodes (each owning a hash-slot range) and replica nodes for failover
- A FalkorDB Browser service for interactive graph exploration
- Persistent Railway volumes per node so data survives restarts
- Auto-generated connection variables (`FALKORDB_PRIVATE_URL`, `FALKORDB_PUBLIC_URL`, `FALKORDB_PASSWORD`, `FALKORDB_HOST`, `FALKORDB_PORT`)

> Each graph lives on one shard. Clustering helps when you have many graphs or high write throughput distributed across graph names; it does not partition a single large graph across shards.

## Common Use Cases

- **GraphRAG for LLM Applications** — Ground LLM responses in a structured knowledge graph to reduce hallucinations and improve retrieval accuracy
- **Agentic Memory at Scale** — Give AI agents persistent, queryable memory across sessions with high-availability guarantees
- **Recommendation Engines** — Model user–item relationships and traverse them for real-time personalized recommendations across large datasets
- **Fraud Detection** — Detect suspicious transaction patterns through multi-hop graph traversal with replica reads spreading query load
- **Multi-Tenant Knowledge Graphs** — Isolate tenants into separate named graphs while sharing cluster infrastructure

## Connecting to the Cluster

After deployment, Railway injects connection variables into your services. Use `FALKORDB_PRIVATE_URL` for services inside the same Railway project (traffic stays on Railway's private network). Use `FALKORDB_PUBLIC_URL` for external or local access (requires TCP Proxy enabled on the FalkorDB service).

Always use **cluster-aware clients** — the cluster may redirect commands with `MOVED` responses when a graph key lives on a different node. Both `FalkorDB.from_url()` (Python) and the TypeScript SDK auto-detect cluster mode at connection time.

### Python

```python
import os
from falkordb import FalkorDB

# from_url() probes INFO server and auto-detects cluster mode — no extra flag needed
# Swap FALKORDB_PRIVATE_URL for FALKORDB_PUBLIC_URL for external/local access
db = FalkorDB.from_url(os.environ["FALKORDB_PRIVATE_URL"])
graph = db.select_graph("MyGraph")

graph.query("CREATE (:Person {name: 'Alice', role: 'Engineer'})")
result = graph.query(
    "MATCH (p:Person) WHERE p.role = $role RETURN p.name",
    {"role": "Engineer"}
)
```

### Node.js / TypeScript

```typescript
import { FalkorDB } from 'falkordb';

const db = await FalkorDB.connect({
  socket: {
    host: process.env.FALKORDB_HOST,
    port: Number(process.env.FALKORDB_PORT)
  },
  password: process.env.FALKORDB_PASSWORD
});

const graph = db.selectGraph('MyGraph');
await graph.query(`CREATE (:Person {name: 'Alice', role: 'Engineer'})`);

const result = await graph.query(
  `MATCH (p:Person) WHERE p.role = $role RETURN p.name`,
  { params: { role: 'Engineer' } }
);

db.close();
```

### redis-cli (quick test, cluster mode)

```bash
# From a service inside Railway (private endpoint)
redis-cli -c -u "$FALKORDB_PRIVATE_URL" GRAPH.QUERY MyGraph "RETURN 'connected' AS status"

# From your local machine or external client (public endpoint)
redis-cli -c -u "$FALKORDB_PUBLIC_URL" GRAPH.QUERY MyGraph "RETURN 'connected' AS status"
```

The `-c` flag enables cluster-follow mode so `redis-cli` automatically follows `MOVED` redirects.

## Browser Interface

The FalkorDB Browser is included in this deployment. After deploying, click the public domain in your Railway service settings to open it. Use `FALKORDB_PASSWORD` from the **Variables** tab to log in.

## Data Persistence

Each cluster node has a dedicated Railway volume. Data survives restarts and redeployments. Replica nodes provide an additional copy of your data for failover. For production workloads, configure Railway volume backups and review [FalkorDB durability options](https://docs.falkordb.com/operations/durability/).

## Resources

- [FalkorDB on Railway — Full Guide](https://docs.falkordb.com/operations/railway)
- [Setting Up a FalkorDB Cluster](https://docs.falkordb.com/operations/cluster)
- [FalkorDB Documentation](https://docs.falkordb.com/)
- [FalkorDB Docker Hub](https://hub.docker.com/r/falkordb/falkordb)
- [FalkorDB GitHub](https://github.com/FalkorDB/FalkorDB)
- [Community Discord](https://discord.gg/falkordb)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FalkorDB Node 3 | `falkordb/falkordb-server` | Database |
| Falkordb Browser | `falkordb/falkordb` | Web service |
| FalkorDB Node 2 | `falkordb/falkordb-server` | Database |
| FalkorDB Node 1 | `falkordb/falkordb-server` | Database |
| FalkorDB Node 6 | `falkordb/falkordb-server` | Database |
| FalkorDB Node 4 | `falkordb/falkordb-server` | Database |
| FalkorDB Node 5 | `falkordb/falkordb-server` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Falkordb Browser | 3000 |
| `FALKOR_PASSWORD` | Falkordb Browser | (secret) |
| `PORT` | FalkorDB Node 1 | 16379 |
| `FALKOR_PASSWORD` | FalkorDB Node 1 | (secret) |

## Configuration

- **Volume:** `/var/lib/falkordb/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Verified:** Yes

[View on Railway →](https://railway.com/deploy/falkordb-cluster)
