# Deploy Apollo Runtime on Railway

Deploy-ready Apollo Runtime for Apollo GraphOS federation projects.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apollo-router)

## About

Apollo Runtime is a high-performance, configurable execution environment that powers federated supergraphs. It combines the Apollo Router (written in Rust) and, optionally, the Apollo MCP server for advanced configuration, control, and observability. Enabling teams to run federated GraphQL workloads in production or evaluation environments.

Hosting Apollo Runtime involves deploying the Router (and optionally the MCP server), connecting to Apollo GraphOS, and configuring the environment variables required to fetch and serve your supergraph schema. With Railway, you can launch this setup in minutes using a deploy-ready template. Railway manages scaling, routing, and environment configuration automatically, so you can focus on developing and evolving your graph instead of managing infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Apollo Runtime (Router) | [apollographql/router-template](https://github.com/apollographql/router-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8088 | PORT used by health check. to configure where the router serves the graphql endpoint use ROUTER_PORT  |
| `APOLLO_KEY` | - | Your Apollo GraphOS API key used to authenticate the Apollo Router with your GraphOS account. Required for schema delivery, usage reporting, and other cloud features. You can generate it from the Apollo GraphOS dashboard |
| `MCP_ENABLE` | 0 | Enable MCP Server - Defaults to false |
| `APOLLO_GRAPH_REF` | - | he reference to your graph in Apollo GraphOS, typically in the format graph-id@variant (e.g., my-graph@current). This tells the Apollo Router which schema to fetch and use at runtime. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/apollo-router)
