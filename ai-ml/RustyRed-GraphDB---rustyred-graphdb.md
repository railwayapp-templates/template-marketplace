# Deploy RustyRed-GraphDB on Railway

Deploy and Host RustyRed-GraphDB with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustyred-graphdb)

## About

# The RustyRed GraphDB

RustyRed is a remarkably fast Graph + Vector database. It runs entirely in RAM. Designed to help humans and their agents work well together.

Featuring GraphCache graph state-aware cache, a first-class MCP agent port, built-in-RAG both graph and vector multi-tenancy, HNSW vector search, confidence-weighted epistemic edges, and document storage. Written in Rust, the best way to write a database. In my humble opinion.

## What Rusty Red does
Graph storage with AOF/snapshot persistence, per-tenant isolation, single-writer serializable commits, and committed read snapshots
Stable, versioned on-disk format with rustyred-upgrade-format migrations between releases (no export/re-import on upgrade)
HNSW vector search on node properties via instant-distance, with hybrid scoring that blends vector similarity and graph proximity
Inverted-index BM25 full-text search with automatic indexing on node upserts
H3 spatial index on node lat/lon properties with radius and bounding-box queries
Epistemic edge types (Supports, Contradicts, Tension, Derives, Cites) with confidence-weighted traversal across configurable hop depth
Graph algorithms over HTTP/MCP: PPR, connected components, PageRank, and label-propagation community detection
Harness Instant KG merged views: session-fresh code deltas overlay durable tenant graph artifacts for code PPR, impact analysis, related-object lookup, search, and edge explanations
MCP agent port with scoped auth tokens, read-only and read-write modes, tool annotations, and structured tool/resource/prompt surfaces
Graph-version-aware cache (10 kinds) that detects stale entries when the underlying graph mutates
Bounded Cypher surface: single-hop and outgoing multi-hop MATCH, bounded variable-length expand, path aliases, property projections, COUNT(*) / COUNT(binding), and transaction-scoped CREATE/MERGE/SET/DELETE
JSONL bulk loader for nodes and edges
Observability: Prometheus /metrics (17 counters), slow-query ring buffer at /v1/diagnostics/slow_queries
HTTP transaction API: /v1/transactions/begin|commit|rollback with snapshot isolation
Native algorithm helpers exposed through the root PyO3 compatibility crate, including ACL local-push Personalized PageRank
Deploy on Railway
Quickstart (one-click)
Click the Deploy on Railway badge above.
Railway will show you the variables the template will set. The only one that matters for first-time use is RUSTY_RED_API_TOKENS — it is pre-filled with a freshly generated 64-character hex secret. Copy it somewhere safe; this is the bearer token your clients will use.
Click Deploy. Railway provisions the service, attaches a 1 GiB volume at /app/data/rusty-red, and starts the container. The health probe waits for /ready to return 200.
Open https://.up.railway.app/openapi.json to verify the service is reachable, then make your first authenticated request:

Algorithm reference
Andersen, R., Chung, F., and Lang, K. (2006). Local Graph Partitioning using PageRank Vectors. FOCS 2006.

License
MIT.

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/rustyred-graphdb)
