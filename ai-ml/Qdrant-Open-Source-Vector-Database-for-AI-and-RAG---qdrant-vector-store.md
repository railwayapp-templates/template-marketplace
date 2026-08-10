# Deploy Qdrant | Open Source Vector Database for AI and RAG on Railway

Vector database for AI search and RAG — API key enabled, data on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qdrant-vector-store)

## About

Qdrant is an open-source vector database written in Rust: store embeddings alongside their payloads, filter on that payload while you search, and get nearest neighbours back in milliseconds. It is the storage layer behind semantic search, RAG pipelines and recommendation systems.

This template runs the official `qdrant/qdrant` image on a pinned stable tag, with collections, the write-ahead log and snapshots on a persistent Railway volume. Nothing is rebuilt or forked, so upstream releases and upstream security fixes are what you get.

Both transports are live from the first deploy. The REST API and the built-in dashboard are served on your public Railway domain, and the gRPC API — the faster one, and the one the official Python, JavaScript, Rust and Go clients prefer — is published through a Railway TCP proxy. The same process also answers on the private network, so other services in your project can reach `http://qdrant.railway.internal:6333` without leaving Railway or paying for egress.

An API key is generated at deploy time and required on every request, REST and gRPC alike. This is worth checking before you trust any Qdrant template: a vector database on a public domain with no key set is a database anyone can read, write and drop, and several of the templates in this marketplace ship exactly that.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Qdrant | `qdrant/qdrant:v1.19.0` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 6333 | Railway routes traffic by this variable. Qdrant never reads it, and the image exposes two ports, so it is set explicitly to the REST port. |
| `QDRANT__SERVICE__HOST` | :: | Bind address. `::` leaves the socket dual-stack, so the service answers both Railway's IPv6-only private network and the IPv4 edge proxy. Do not change it, and do not add brackets — the gRPC listener parses this value as a bare IP address. |
| `QDRANT__SERVICE__API_KEY` | (secret) | API key required on every REST and gRPC request, in the `api-key` header. Generated for you — copy it before you give the URL to a client. Without it the database would accept unauthenticated writes from anyone who has the public domain. |
| `QDRANT__SERVICE__GRPC_PORT` | 6334 | gRPC API, exposed through the TCP proxy for native clients. The official SDKs are faster over gRPC than over REST. |
| `QDRANT__SERVICE__HTTP_PORT` | 6333 | REST API and the built-in dashboard at /dashboard. Must stay in step with PORT and with the public domain's target port. |
| `QDRANT__TELEMETRY_DISABLED` | true | Turns off anonymous usage reporting to Qdrant Cloud. Set to false if you would rather help upstream. |
| `QDRANT__STORAGE__SNAPSHOTS_PATH` | /qdrant/storage/snapshots | Snapshots are written inside the volume rather than the default /qdrant/snapshots, which lives in the container's ephemeral layer and would be lost on every redeploy. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6334
- **Volume:** `/qdrant/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/qdrant-vector-store)
