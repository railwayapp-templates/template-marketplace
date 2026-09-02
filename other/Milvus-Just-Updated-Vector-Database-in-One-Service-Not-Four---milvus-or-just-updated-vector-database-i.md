# Deploy Milvus | (Just Updated) Vector Database in One Service, Not Four on Railway

One billed service, not four. gRPC and REST both reachable, auth enforced.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/milvus-or-just-updated-vector-database-i)

## About

Milvus is the open-source vector database behind a large share of self-hosted RAG and
semantic-search stacks: it stores embeddings, indexes them (HNSW, IVF, DiskANN and more),
and answers nearest-neighbour queries with metadata filtering over both a gRPC API and a
REST API. This template runs Milvus 2.6.22 in standalone mode as **one** billed service on
one volume, with authentication on, a root password generated per deploy, and both the
gRPC and the REST endpoint reachable from outside Railway.

A standard Milvus deployment is three or four containers: Milvus itself, etcd for metadata,
MinIO or S3 for object storage, and often a proxy container in front. Upstream also ships
a single-container mode — the one its own `standalone_embed.sh` installer uses — in which
etcd runs embedded inside the Milvus process and object data is written to the local disk.
That mode is what this template deploys, so a deployer pays for one service and one volume
instead of four services and two volumes, and there is no cross-service network hop on the
metadata path.

Three details decide whether such a deployment actually works on a platform.

Milvus does not read `$PORT`: its gRPC and REST APIs both listen on 19530 and its health
endpoint on 9091, so the public domain has to target 19530 explicitly. gRPC cannot be
carried by an HTTPS edge that terminates and re-frames the request — a gRPC client against
the HTTPS domain is answered as REST and fails authentication — so this template publishes
a **TCP proxy** alongside the HTTP domain: `pymilvus` and every other gRPC client connect
over the proxy, while `curl` and the REST v2 API use the HTTPS domain. And authorization is
off in stock Milvus, so an instance on a public address is world-writable unless it is
turned on before the first boot.

This image handles all three: authorization is enabled in the image, the root password is
taken from the environment and validated before Milvus starts, and everything durable —
embedded etcd, segment data, indexes and logs — lives under the single mounted volume.
Because Milvus only honours the default-root-password setting at the first metastore
initialisation, the entrypoint also records the credential it applied and, on any later
boot where the variable has changed, rotates it through Milvus's own password API. A
redeploy is therefore a working password reset, which stock Milvus has no path to.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| milvus | `ghcr.io/bon5co/milvus-railway@sha256:c8f80ca436f6785efb69ad82127ad8e8e382d19ebef411eb4c88d7e9d16a37fd` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MILVUS_ROOT_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 19530
- **Volume:** `/var/lib/milvus`

**Category:** Other

[View on Railway →](https://railway.com/deploy/milvus-or-just-updated-vector-database-i)
