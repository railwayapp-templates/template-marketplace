# Deploy bytebase on Railway

Database governance built for humans and agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bytebase-1)

## About

Bytebase is an open-source database governance platform that unifies schema change, data access, security, and audit workflows. It gives engineering teams a browser-based control plane for managing diverse databases, reviewing changes, enforcing policy, querying data safely, and maintaining a complete operational history from one dependable workspace.

Railway runs the official pinned Bytebase container as a single web service, provides HTTPS routing, and persists the embedded metadata database on a managed volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bytebase | `bytebase/bytebase:3.22.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/bytebase`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/bytebase-1)
