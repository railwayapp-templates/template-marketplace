# Deploy SurrealDB 1.x on Railway

A scalable, distributed, collaborative, document-graph database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Axgpqb)

## About

<p align="center">
    <a href="https://surrealdb.com#gh-dark-mode-only">
        <img alt="SurrealDB Logo" src="https://raw.githubusercontent.com/surrealdb/surrealdb/main/img/white/logo.svg" width="300">
    </a>
</p>

<h3 align="center">SurrealDB is the ultimate cloud <br> database for tomorrow's applications
</h3>

<h3 align="center">Develop easier. &nbsp; Build faster. &nbsp; Scale quicker.</h3>

### What is SurrealDB?

SurrealDB is an end-to-end cloud-native database designed for modern applications, including web, mobile, serverless, Jamstack, backend, and traditional applications. With SurrealDB, you can simplify your database and API infrastructure, reduce development time, and build secure, performant apps quickly and cost-effectively.

**Key features of SurrealDB include:**

- **Reduces development time**: SurrealDB simplifies your database and API stack by removing the need for most server-side components, allowing you to build secure, performant apps faster and cheaper.
- **Real-time collaborative API backend service:** SurrealDB functions as both a database and an API backend service, enabling real-time collaboration.
- **Support for multiple querying languages:** SurrealDB supports SQL querying from client devices, GraphQL, ACID transactions, WebSocket connections, structured and unstructured data, graph querying, full-text indexing, and geospatial querying.
- **Granular access control**: SurrealDB provides row-level permissions-based access control, giving you the ability to manage data access with precision.

### Features

- [x] Database server, or embedded library
- [x] Multi-row, multi-table ACID transactions
- [x] Single-node, or highly-scalable distributed mode
- [x] Record links and directed typed graph connections
- [x] Store structured and unstructured data
- [x] Incrementally computed views for pre-computed advanced analytics
- [x] Realtime-api layer, and security permissions built in
- [x] Store and model data in any way with tables, documents, and graph
- [x] Simple schema definition for frontend and backend development
- [x] Connect and query directly from web-browsers and client devices
- [x] Use embedded JavaScript functions for custom advanced functionality

### Documentation

For guidance on development, and administration, see Their [documentation](https://surrealdb.com/docs).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SurrealDB 1.x (Deprecated) | `surrealdb/surrealdb:v1.5.5` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | The internal port railway will route external traffic to |
| `SURREAL_LOG` | trace | The logging level for the database server |
| `SURREAL_URL` | - | Public database URL |
| `SURREAL_BIND` | - | The hostname or ip address to listen for connections on |
| `SURREAL_HOST` | - | Public database hostname |
| `SURREAL_PASS` | - | The password for the initial database user |
| `SURREAL_PATH` | - | Database path used for storing data |
| `SURREAL_PORT` | 443 | Public database port |
| `SURREAL_USER` | (secret) | The username for the initial database user |
| `SURREAL_PRIVATE_URL` | - | Private database URL |
| `SURREAL_PRIVATE_HOST` | - | Private database hostname |
| `SURREAL_PRIVATE_PORT` | 8000 | The Private port that Surreal runs on |
| `SURREAL_CAPS_ALLOW_ALL` | true | Allow all capabilities |

## Configuration

- **Start command:** `/surreal start --deny-guests --no-banner`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/Axgpqb)
