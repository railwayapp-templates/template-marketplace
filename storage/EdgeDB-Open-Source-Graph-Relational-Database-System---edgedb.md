# Deploy EdgeDB (Open-Source Graph-Relational Database System) on Railway

EdgeDB [Mar ’26] (Query Data with Modern Graph Features) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/edgedb)

## About

EdgeDB is an advanced, open-source database engine that combines the power of a relational database with the simplicity of a document store. It is designed to make database modeling, querying, and management more intuitive for developers, eliminating the complexity of traditional SQL while maintaining all its robustness. ## About Hosting EdgeDB on Railway (Self Hosting EdgeDB on Railway)

Hosting EdgeDB on Railway allows you to build and scale modern applications effortlessly. By self-hosting EdgeDB, you retain full control of your data, schema evolution, and deployment pipeline - with zero vendor lock-in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| edgedb | `edgedb/edgedb:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5656 |
| `EDGEDB_SERVER_ADMIN_UI` | enabled |
| `EDGEDB_SERVER_PASSWORD` | (secret) |
| `EDGEDB_SERVER_TLS_CERT_MODE` | generate_self_signed |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/edgedb/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/edgedb)
