# Deploy CouchDB | Open Source NoSQL Database on Railway

Self Host CouchDB. Persistent storage, Fauxton admin UI and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/couchdb)

## About

Deploy CouchDB on Railway to get a fully managed, persistent NoSQL document database with a built-in web UI. 

Self-host CouchDB and run it on Railway with automatic HTTPS, persistent volumes, and zero infrastructure management. This template deploys a single CouchDB service backed by a persistent volume for data storage.

CouchDB stores data as JSON documents, exposes a RESTful HTTP API, and includes Fauxton — a browser-based admin dashboard for managing databases, documents, and replication. Every document operation is an HTTP request, making it trivially scriptable from any language.

Apache CouchDB is an open-source NoSQL database from the Apache Software Foundation that stores data as JSON documents. It was first released in 2005 and powers infrastructure at CERN, IBM Cloud, npm, United Airlines, and the Red Cross.

Key features:

- **RESTful HTTP API** — every operation is a standard HTTP request (GET, PUT, POST, DELETE)
- **Multi-master replication** — sync data bidirectionally between nodes with automatic conflict detection
- **Offline-first architecture** — pairs with PouchDB for client-side sync that works without connectivity
- **MapReduce views** — define JavaScript functions for indexing and querying documents
- **Fauxton web UI** — built-in browser-based dashboard for database and document management
- **MVCC (Multi-Version Concurrency Control)** — no read locks, high concurrency

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CouchDB | `couchdb:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `COUCHDB_USER` | (secret) | Admin username |
| `COUCHDB_SECRET` | (secret) | Cluster secret (static) |
| `COUCHDB_PASSWORD` | (secret) | Create  Admin password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/couchdb/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/couchdb)
