# Deploy Tcpcore demo on Railway

Runtime governance for every agent API call

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tcpcore-demo)

## About

[TCPcore Demo is a live, self-contained governed MCP surface. It runs the TCPcore governance kernel against four mock integrations with no credentials, database, or external services. A low-risk call executes immediately, a medium-risk write queues for human approval, and an agent-forbidden delete is refused and hidden from the agent's tool list.]

[Hosting TCPcore Demo means running a single container that starts two processes: a mock API server on 127.0.0.1:4001 and the governance kernel via tcpctl serve on the public port. There is no database, no Redis, no queue, and no credential to configure. The kernel loads four demo adapters pointing at the in-container mock, compiles them into a minimal MCP tool list, and exposes a JSON-RPC endpoint at /api/mcp]

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tpcore-demo | [TCPCore/tpcore-demo](https://github.com/TCPCore/tpcore-demo) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tcpcore-demo)
