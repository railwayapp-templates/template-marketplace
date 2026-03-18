# Deploy conduit-1-click on Railway

Deploy and Host conduit-1-click with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/conduit-1-click)

## About

Psiphon Conduit is a powerful tool that combats internet censorship by creating secure tunnels that allow people to connect and access the free internet. During recent internet blackouts, including in Iran, Conduit has seen significant usage surges, helping millions maintain access to uncensored information and communication.

Hosting Psiphon Conduit involves deploying a proxy server that acts as a bridge for users in censored regions to access the open internet. Your Conduit station becomes part of a global network of over 1.3 million stations supporting internet freedom. The deployment is straightforward on Railway, requiring minimal configuration while providing the infrastructure needed to support users facing censorship. Your station will help relay encrypted traffic and contribute to the global effort of maintaining internet accessibility.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Conduit | `ghcr.io/psiphon-inc/conduit/cli:latest` | Worker |

## Configuration

- **Start command:** `conduit start -m 800 -b 10`

**Category:** Other

[View on Railway →](https://railway.com/deploy/conduit-1-click)
