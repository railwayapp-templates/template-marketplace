# Deploy midwire on Railway

Verify your agent's writes actually landed

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/midwire)

## About

midwire sits between your agent and an MCP server, and checks that writes
actually landed. It reads back every write, catches writes that were dropped
behind a 200, catches the same write sent twice, and records everything your
agent did.

You point midwire at an MCP server you already use. It registers that server's
tools as its own and forwards every call, so your agent changes one URL and
nothing else. After a write returns, midwire fires the read that confirms it
and compares the two. A failed check comes back inside the tool result, so the
agent reads it and tells the user. A status page shows what the agent did and
what read back wrong.

Hosting it means one container, one volume for the ledger, and one environment
variable. Every check is deterministic, so there is no GPU, no model and no
inference cost.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| midwire | [NovusEdge/midwire](https://github.com/NovusEdge/midwire) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MIDWIRE_ADMIN_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, Just

[View on Railway →](https://railway.com/deploy/midwire)
