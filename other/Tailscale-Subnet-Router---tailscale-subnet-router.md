# Deploy Tailscale Subnet Router on Railway

Reach ANY private service via Tailscale

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tailscale-subnet-router)

## About

A Tailscale subnet router connects your Railway project's private network to your tailnet. Deploy it as a service and every other service in the environment becomes reachable from your devices — `postgres.myapp-production-railway.internal:5432`, any port, TCP and UDP — without exposing anything publicly.

The container runs `tailscaled` in userspace-networking mode (no `/dev/net/tun` needed) and advertises the environment's private subnets — the IPv6 `/64`, plus private IPv4 ranges in dual-stack environments — detected at runtime from the route table, so nothing is hardcoded and the same image works in any project or environment. It also runs CoreDNS to serve a project-scoped DNS alias (`--railway.internal`), letting multiple projects coexist on one tailnet. Configuration is a single required variable: a Tailscale auth key. New services become reachable the moment they deploy — no per-service setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tailscale-rw | [dotlouis/tailscale-rw](https://github.com/dotlouis/tailscale-rw) | Database |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `TS_EXIT_NODE` | true/false |
| `TAILSCALE_AUTHKEY` | generate it from https://login.tailscale.com/admin/settings/keys |

## Configuration

- **Volume:** `/var/lib/tailscale`

**Category:** Other · **Languages:** TypeScript, Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/tailscale-subnet-router)
