# Deploy FalkorDB on Railway

A FalkorDB single instance for AI, ML, and GraphRAG workloads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/falkordb-1)

## About

## Deploy and Host FalkorDB on Railway

[FalkorDB](https://www.falkordb.com) is a high-performance graph database purpose-built for GraphRAG, knowledge graphs, and AI/ML applications. It uses [GraphBLAS](https://graphblas.org/) for sparse adjacency matrix graph representation, delivering low-latency Cypher queries on highly connected data.

This template deploys a **standalone FalkorDB instance** with:
- One FalkorDB service (server + browser UI)
- A persistent Railway volume for data storage
- Auto-generated connection variables (`FALKORDB_PRIVATE_URL`, `FALKORDB_PUBLIC_URL`, `FALKORDB_PASSWORD`, `FALKORDB_HOST`, `FALKORDB_PORT`)

## Common Use Cases

- **GraphRAG for LLM Applications** — Ground LLM responses in a structured knowledge graph to reduce hallucinations and improve retrieval accuracy
- **Agentic Memory** — Give AI agents persistent, queryable memory across sessions using graph relationships
- **Recommendation Engines** — Model user-item relationships and traverse them for real-time personalized recommendations
- **Fraud Detection** — Detect suspicious transaction patterns through multi-hop graph traversal
- **Knowledge Management** — Connect documents, concepts, and entities for intelligent enterprise search

## Connecting to FalkorDB

After deployment, Railway injects connection variables into your services. Use `FALKORDB_PRIVATE_URL` for services running inside the same Railway project, and `FALKORDB_PUBLIC_URL` for external or local access.

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

### Python

```python
import os
from falkordb import FalkorDB

db = FalkorDB.from_url(os.environ["FALKORDB_PRIVATE_URL"])
graph = db.select_graph("MyGraph")

graph.query("CREATE (:Person {name: 'Alice', role: 'Engineer'})")
result = graph.query(
    "MATCH (p:Person) WHERE p.role = $role RETURN p.name",
    {"role": "Engineer"}
)
```

### redis-cli (quick test)

```bash
redis-cli -u "$FALKORDB_PUBLIC_URL" GRAPH.QUERY MyGraph "RETURN 'connected' AS status"
```

FalkorDB integrates with popular AI frameworks including [LangChain](https://python.langchain.com/docs/integrations/graphs/falkordb/), [LlamaIndex](https://docs.llamaindex.ai/en/stable/examples/query_engine/falkordb_query_engine/), and [GraphRAG-SDK](https://github.com/FalkorDB/GraphRAG-SDK).

## Browser Interface

The FalkorDB Browser is included in this deployment. After deploying, click the public domain in your Railway service settings to open it. Use `FALKORDB_PASSWORD` from the **Variables** tab to log in.

## Data Persistence

Your data is stored on a Railway volume mounted to the FalkorDB container. Data survives restarts and redeployments. For production workloads, configure Railway volume backups and review [FalkorDB durability options](https://docs.falkordb.com/operations/durability/).

## Resources

- [FalkorDB on Railway — Full Guide](https://docs.falkordb.com/operations/railway)
- [FalkorDB Documentation](https://docs.falkordb.com/)
- [FalkorDB Docker Hub](https://hub.docker.com/r/falkordb/falkordb)
- [FalkorDB GitHub](https://github.com/FalkorDB/FalkorDB)
- [Community Discord](https://discord.gg/falkordb)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FalkorDB | `falkordb/falkordb` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `FALKORDB_PORT` | 16379 |
| `FALKORDB_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 16379
- **Volume:** `/var/lib/falkordb/data`

**Category:** Storage · **Verified:** Yes

[View on Railway →](https://railway.com/deploy/falkordb-1)
