# Deploy Apollo MCP Server on Railway

Deploy-ready Apollo MCP server for Apollo MCP projects

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apollo-mcp-server)

## About

The Apollo MCP Server provides a standard way for AI models and agents to access, orchestrate, and interact with your GraphQL APIs with little configuration and setup. It acts as a bridge between AI and your GraphQL endpoints, enabling controlled access, observability, and automation through the Model Context Protocol.

Hosting the Apollo MCP Server is a standalone deployment: you run the MCP process by itself and expose MCP tools that wrap your existing APIs (GraphQL or HTTP). Configure your tool definitions, target API URLs, via GraphOS. On Railway, you can deploy the MCP container directly, set env vars in the dashboard, and let the platform handle logging, scaling, and restarts. Clients (e.g., AI agents) then connect to your MCP Server to securely discover and invoke the tools you’ve exposed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Apollo MCP Server | [apollographql/mcp-server-template](https://github.com/apollographql/mcp-server-template) (root: .) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5000 | - |
| `APOLLO_KEY` | - | Your Apollo GraphOS API key used to authenticate the Apollo Router with your GraphOS account. Required for schema delivery, usage reporting, and other cloud features. You can generate it from the Apollo GraphOS dashboard |
| `APOLLO_GRAPH_REF` | - | he reference to your graph in Apollo GraphOS, typically in the format graph-id@variant (e.g., my-graph@current). This tells the Apollo Router which schema to fetch and use at runtime. |
| `APOLLO_MCP_ENDPOINT` | - | The target GraphQL endpoint. |
| `APOLLO_MCP__TRANSPORT_TYPE` | streamable_http | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/apollo-mcp-server)
