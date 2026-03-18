# Deploy Qdrant Cluster on Railway

High-performance Vector Database and Vector Search Engine

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dbhF-C)

## About

<p align="center">
  <img alt="Qdrant" src="https://github.com/qdrant/qdrant/raw/master/docs/logo.svg" height="100">
</p>

<p align="center">
    <b>Vector Search Engine for the next generation of AI applications</b>
</p>

**Qdrant** (read: _quadrant_) is a vector similarity search engine and vector database.
It provides a production-ready service with a convenient API to store, search, and manage points—vectors with an additional payload
Qdrant is tailored to extended filtering support. It makes it useful for all sorts of neural-network or semantic-based matching, faceted search, and other applications.

Qdrant is written in Rust 🦀, which makes it fast and reliable even under high load. See [benchmarks](https://qdrant.tech/benchmarks/).

With Qdrant, embeddings or neural network encoders can be turned into full-fledged applications for matching, searching, recommending, and much more!

## Features

### Filtering and Payload

Qdrant can attach any JSON payloads to vectors, allowing for both the storage and filtering of data based on the values in these payloads.
Payload supports a wide range of data types and query conditions, including keyword matching, full-text filtering, numerical ranges, geo-locations, and more.

Filtering conditions can be combined in various ways, including `should`, `must`, and `must_not` clauses,
ensuring that you can implement any desired business logic on top of similarity matching.

### Hybrid Search with Sparse Vectors

To address the limitations of vector embeddings when searching for specific keywords, Qdrant introduces support for sparse vectors in addition to the regular dense ones.

Sparse vectors can be viewed as an generalization of BM25 or TF-IDF ranking. They enable you to harness the capabilities of transformer-based neural networks to weigh individual tokens effectively.

### Vector Quantization and On-Disk Storage

Qdrant provides multiple options to make vector search cheaper and more resource-efficient.
Built-in vector quantization reduces RAM usage by up to 97% and dynamically manages the trade-off between search speed and precision.

### Distributed Deployment

Qdrant offers comprehensive horizontal scaling support through two key mechanisms:
1. Size expansion via sharding and throughput enhancement via replication
2. Zero-downtime rolling updates and seamless dynamic scaling of the collections

### Highlighted Features

* **Query Planning and Payload Indexes** - leverages stored payload information to optimize query execution strategy.
* **SIMD Hardware Acceleration** - utilizes modern CPU x86-x64 and Neon architectures to deliver better performance.
* **Async I/O** - uses `io_uring` to maximize disk throughput utilization even on a network-attached storage.
* **Write-Ahead Logging** - ensures data persistence with update confirmation, even during power outages.

## API

### REST

Online OpenAPI 3.0 documentation is available [here](https://api.qdrant.tech/).
OpenAPI makes it easy to generate a client for virtually any framework or programming language.

You can also download raw OpenAPI [definitions](https://github.com/qdrant/qdrant/blob/master/docs/redoc/master/openapi.json).

### gRPC

For faster production-tier searches, Qdrant also provides a gRPC interface. You can find gRPC documentation [here](https://qdrant.tech/documentation/interfaces/#grpc-interface).

### Clients

Qdrant offers the following client libraries to help you integrate it into your application stack with ease:

- Official:
  - [Go client](https://github.com/qdrant/go-client)
  - [Rust client](https://github.com/qdrant/rust-client)
  - [JavaScript/TypeScript client](https://github.com/qdrant/qdrant-js)
  - [Python client](https://github.com/qdrant/qdrant-client)
  - [.NET/C# client](https://github.com/qdrant/qdrant-dotnet)
  - [Java client](https://github.com/qdrant/java-client)
- Community:
  - [Elixir](https://hexdocs.pm/qdrant/readme.html)
  - [PHP](https://github.com/hkulekci/qdrant-php)
  - [Ruby](https://github.com/andreibondarev/qdrant-ruby)
  - [Java](https://github.com/metaloom/qdrant-java-client)

### Where do I go from here?

- [Quick Start Guide](docs/QUICK_START.md)
- End to End [Colab Notebook](https://colab.research.google.com/drive/1Bz8RSVHwnNDaNtDwotfPj0w7AYzsdXZ-?usp=sharing) demo with SentenceBERT and Qdrant
- Detailed [Documentation](https://qdrant.tech/documentation/) are great starting points
- [Step-by-Step Tutorial](https://qdrant.to/qdrant-tutorial) to create your first neural network project with Qdrant

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Qdrant Peer 2 | `qdrant/qdrant:v1.12.5` | Web service |
| Qdrant Peer 1 | `qdrant/qdrant:v1.12.5` | Web service |
| Qdrant Peer 3 | `qdrant/qdrant:v1.12.5` | Web service |
| Qdrant Main | `qdrant/qdrant:v1.12.5` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Qdrant Peer 2 | 6333 | Port to use for the Public Proxy and Health check |
| `QDRANT_API_KEY` | Qdrant Peer 2 | (secret) | An api-key |
| `QDRANT_PUBLIC_URI` | Qdrant Peer 2 | - | The public https URL |
| `QDRANT_PRIVATE_URI` | Qdrant Peer 2 | - | The private http URL |
| `QDRANT__SERVICE__HOST` | Qdrant Peer 2 | :: | Listen on IPv6 |
| `QDRANT_INTERNAL_P2P_URI` | Qdrant Peer 2 | - | The URL that this peer will advertise as |
| `QDRANT__CLUSTER__ENABLED` | Qdrant Peer 2 | true | Run Qdrant in distributed deployment mode |
| `QDRANT__SERVICE__API_KEY` | Qdrant Peer 2 | (secret) | An api-key |
| `QDRANT__CLUSTER__P2P__PORT` | Qdrant Peer 2 | - | Port for internal communication between peers |
| `QDRANT__SERVICE__HTTP_PORT` | Qdrant Peer 2 | - | HTTP port to bind the service on |
| `QDRANT__TELEMETRY_DISABLED` | Qdrant Peer 2 | true | Set to true to prevent service from sending usage statistics to the developers |
| `QDRANT_INTERNAL_BOOTSTRAP_URI` | Qdrant Peer 2 | - | The URL of the main peer to bootstrap from |
| `QDRANT__SERVICE__READ_ONLY_API_KEY` | Qdrant Peer 2 | (secret) | An api-key for read-only operations |
| `PORT` | Qdrant Peer 1 | 6333 | Port to use for the Public Proxy and Health check |
| `QDRANT_API_KEY` | Qdrant Peer 1 | (secret) | An api-key |
| `QDRANT_PUBLIC_URI` | Qdrant Peer 1 | - | The public https URL |
| `QDRANT_PRIVATE_URI` | Qdrant Peer 1 | - | The private http URL |
| `QDRANT__SERVICE__HOST` | Qdrant Peer 1 | :: | Listen on IPv6 |
| `QDRANT_INTERNAL_P2P_URI` | Qdrant Peer 1 | - | The URL that this peer will advertise as |
| `QDRANT__CLUSTER__ENABLED` | Qdrant Peer 1 | true | Run Qdrant in distributed deployment mode |
| `QDRANT__SERVICE__API_KEY` | Qdrant Peer 1 | (secret) | An api-key |
| `QDRANT__CLUSTER__P2P__PORT` | Qdrant Peer 1 | - | Port for internal communication between peers |
| `QDRANT__SERVICE__HTTP_PORT` | Qdrant Peer 1 | - | HTTP port to bind the service on |
| `QDRANT__TELEMETRY_DISABLED` | Qdrant Peer 1 | true | Set to true to prevent service from sending usage statistics to the developers |
| `QDRANT_INTERNAL_BOOTSTRAP_URI` | Qdrant Peer 1 | - | The URL of the main peer to bootstrap from |
| `QDRANT__SERVICE__READ_ONLY_API_KEY` | Qdrant Peer 1 | (secret) | An api-key for read-only operations |
| `PORT` | Qdrant Peer 3 | 6333 | Port to use for the Public Proxy and Health check |
| `QDRANT_API_KEY` | Qdrant Peer 3 | (secret) | An api-key |
| `QDRANT_PUBLIC_URI` | Qdrant Peer 3 | - | The public https URL |
| `QDRANT_PRIVATE_URI` | Qdrant Peer 3 | - | The private http URL |
| `QDRANT__SERVICE__HOST` | Qdrant Peer 3 | :: | Listen on IPv6 |
| `QDRANT_INTERNAL_P2P_URI` | Qdrant Peer 3 | - | The URL that this peer will advertise as |
| `QDRANT__CLUSTER__ENABLED` | Qdrant Peer 3 | true | Run Qdrant in distributed deployment mode |
| `QDRANT__SERVICE__API_KEY` | Qdrant Peer 3 | (secret) | An api-key |
| `QDRANT__CLUSTER__P2P__PORT` | Qdrant Peer 3 | - | Port for internal communication between peers |
| `QDRANT__SERVICE__HTTP_PORT` | Qdrant Peer 3 | - | HTTP port to bind the service on |
| `QDRANT__TELEMETRY_DISABLED` | Qdrant Peer 3 | true | Set to true to prevent service from sending usage statistics to the developers |
| `QDRANT_INTERNAL_BOOTSTRAP_URI` | Qdrant Peer 3 | - | The URL of the main peer to bootstrap from |
| `QDRANT__SERVICE__READ_ONLY_API_KEY` | Qdrant Peer 3 | (secret) | An api-key for read-only operations |
| `PORT` | Qdrant Main | 6333 | Port to use for the Public Proxy and Health check |
| `QDRANT_API_KEY` | Qdrant Main | (secret) | An api-key |
| `QDRANT_PUBLIC_URI` | Qdrant Main | - | The public https URL |
| `QDRANT_PRIVATE_URI` | Qdrant Main | - | The private http URL |
| `QDRANT__SERVICE__HOST` | Qdrant Main | :: | Listen on IPv6 |
| `QDRANT_INTERNAL_P2P_URI` | Qdrant Main | - | The URL that other peers will access the main peer with |
| `QDRANT__CLUSTER__ENABLED` | Qdrant Main | true | Run Qdrant in distributed deployment mode |
| `QDRANT__SERVICE__API_KEY` | Qdrant Main | (secret) | An api-key |
| `QDRANT__CLUSTER__P2P__PORT` | Qdrant Main | 6335 | Port for internal communication between peers |
| `QDRANT__SERVICE__HTTP_PORT` | Qdrant Main | - | HTTP port to bind the service on |
| `QDRANT__TELEMETRY_DISABLED` | Qdrant Main | true | Set to true to prevent service from sending usage statistics to the developers |
| `QDRANT__SERVICE__READ_ONLY_API_KEY` | Qdrant Main | (secret) | An api-key for read-only operations |

## Configuration

- **Start command:** `/bin/sh -c "exec ./entrypoint.sh --uri ${QDRANT_INTERNAL_P2P_URI} --bootstrap ${QDRANT_INTERNAL_BOOTSTRAP_URI}"`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/qdrant/storage`
- **Start command:** `/bin/sh -c "exec ./entrypoint.sh --uri ${QDRANT_INTERNAL_P2P_URI}"`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/dbhF-C)
