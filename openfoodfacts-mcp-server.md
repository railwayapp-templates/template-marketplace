# Deploy openfoodfacts-mcp-server on Railway

Deploy and Host openfoodfacts-mcp-server with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openfoodfacts-mcp-server)

## About

A MCP (Model Context Protocol) server that provides access to the Open Food Facts dataset using DuckDB and parquet for fast queries. Supports both local Claude Desktop integration and remote deployment with authentication.

Simply deploy this template and have a running mcp server. It will take some time to boot on the first start as it needs to download the ~4GB parquet file that contains open food facts db.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openfoodfacts-mcp-server | [noot-app/openfoodfacts-mcp-server](https://github.com/noot-app/openfoodfacts-mcp-server) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ENV` | production | Sets the remote mcp to run in production mode |
| `OPENFOODFACTS_MCP_TOKEN` | (secret) | The API token used to access this mcp server remotely |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Go, Shell, Dockerfile

[View on Railway →](https://railway.com/template/openfoodfacts-mcp-server)
