# Deploy TezosX-mcp on Railway

An MCP server enabling AI agents to interact with the Tezos blockchain.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tezosx-mcp)

## About

TezosX-MCP is a Model Context Protocol (MCP) server that enables AI agents to interact with the Tezos blockchain. It provides wallet tools for sending XTZ, checking balances, viewing transaction history, and supports the x402 payment protocol for seamless pay-per-request micropayments.

Deploying tezosx-mcp on Railway provides a hosted MCP server that AI agents can connect to via HTTP transport. The server requires configuration through environment variables including your Tezos network selection (mainnet or shadownet), a spending limit contract address for controlled fund management, and a private key for signing transactions. Railway handles the Node.js runtime, making deployment straightforward. The server also serves a web-based frontend dashboard for monitoring wallet activity and configuring your spending keys/limits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TezosX-mcp | [ecadlabs/TezosX-mcp](https://github.com/ecadlabs/TezosX-mcp) (root: /mcp) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MCP_TRANSPORT` | http |

## Configuration

- **Start command:** `npm start`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, Vue, CSS, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/tezosx-mcp)
