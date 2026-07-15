# Deploy Memgraph Lab on Railway

[Updated Jul 2026] Production Ready Memgraph Lab Instance

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memgraph-lab)

## About

Memgraph Lab is the visual interface for the Memgraph graph database: write Cypher
queries, explore your graph visually, import data, and monitor your instance from the
browser. This template deploys Lab on its own public URL, ready to connect to a
Memgraph instance running in the same project or anywhere else.

Lab is a lightweight Node.js web app, and this template runs the official
`memgraph/lab` image pinned to a specific version. It gets a public URL with a
healthcheck and starts ready to use: open it in the browser, create a connection to
your Memgraph instance, and start querying. You bring the connection details. If Lab
shares a Railway project with a Memgraph service, use the private network hostname
(for a service named "Memgraph" that is `memgraph.railway.internal`, port 7687).
Databases outside the project work too, over any reachable host and port. Lab itself
stores no data, so it needs no volume and very little memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Memgraph Lab | `memgraph/lab:3.11.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/memgraph-lab)
