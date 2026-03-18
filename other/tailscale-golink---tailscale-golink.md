# Deploy tailscale-golink on Railway

A shortlink service for your private network (tailnet).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tailscale-golink)

## About

golink is a private *experimental* shortlink service for your tailnet. It lets you create short, memorable links of the form `go/your-link` for the websites you and your team use most.

*If you were looking for a SaaS go link service that doesn't use Tailscale, you might be thinking of golinks.io or trot.to*

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| golink | `ghcr.io/tailscale/golink:latest` | Database |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `TS_AUTHKEY` | Provide a Tailscale auth key to deploy golink. Ideally it should have a tag attached e.g. golink. |

## Configuration

- **Volume:** `/home/nonroot`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tailscale-golink)
