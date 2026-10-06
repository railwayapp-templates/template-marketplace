# Deploy CloudBeaver on Railway

A web-based database manager for working with multiple SQL databases.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudbeaver-railway-template)

## About

CloudBeaver is a web-based database management platform built by the DBeaver team. It provides a browser interface for connecting to and managing multiple database systems, running SQL queries, exploring schemas, browsing data, and managing database connections from a centralized workspace.

![CloudBeaver on Railway](https://raw.githubusercontent.com/wiki/dbeaver/cloudbeaver/images/gis-demo.png)

Hosting CloudBeaver gives developers and teams a shared browser-based database management environment without requiring each user to install a desktop database client.

CloudBeaver can connect to databases running on Railway, other cloud providers, private infrastructure, or any reachable database server. It supports a wide range of SQL databases and provides a familiar DBeaver-style workflow for query execution, schema exploration, data browsing, and connection management.

Deploying CloudBeaver on Railway simplifies the infrastructure required to keep the service available while preserving application state and configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cloudbeaver | `dbeaver/cloudbeaver:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CLOUDBEAVER_WEB_SERVER_PORT` | 8978 | Port used by the CloudBeaver web interface |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/cloudbeaver/workspace`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/cloudbeaver-railway-template)
