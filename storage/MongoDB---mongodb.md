# Deploy MongoDB on Railway

Self-hosted MongoDB latest with persistence volume. It just works.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongodb)

## About

MongoDB is a popular open-source NoSQL document database that provides a flexible and scalable way to store and manage unstructured and semi-structured data. This template deploys the latest official MongoDB image with persistence volume and authentication enabled.

This template runs the official `mongo` Docker image (latest version) on Railway. It includes an optimized start command for Railway’s private networking, automatic root user initialization, and a persistent volume at `/data/db`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MONGO_INITDB_ROOT_PASSWORD` | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | (secret) |

## Configuration

- **Start command:** `mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mongodb)
