# Deploy Cerbos authorization on Railway

Policy-based authorization with Git-synced policies and secure decisions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cerbos-authorization)

## About

Run a Cerbos policy decision point that loads authorization policies from Git and exposes the HTTP decision API. The template pins Cerbos `0.54.0`, checks readiness at `/_cerbos/health`, and polls your policy repository every 60 seconds.

Cerbos keeps authorization rules outside application code. Your services send principal, resource, and action context to the PDP, and Cerbos returns allow or deny decisions from version-controlled policies. This template exposes the HTTP API through Railway and keeps the gRPC endpoint available to services over private networking.

The default repository contains Cerbos's official sample policies so deployment can be verified immediately. Fork it or point the variables at your own public HTTPS Git repository before application integration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cerbos | `ghcr.io/cerbos/cerbos@sha256:211c261f6031675522a35c6055b13fd719c4aff13747307e4bcb6907326537ef` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3592 | Railway HTTP routing and health-check port; keep this at 3592. |
| `CERBOS_POLICY_BRANCH` | main | Git branch Cerbos clones and polls every 60 seconds. |
| `CERBOS_POLICY_DIRECTORY` | cerbos/policies | Directory inside the repository containing policies and schemas. |
| `CERBOS_POLICY_REPOSITORY` | https://github.com/cerbos/demo-rest.git | Public HTTPS Git repository containing Cerbos policies. |

## Configuration

- **Start command:** `/cerbos server --set=storage.driver=git --set=storage.git.protocol=https --set=storage.git.url=$CERBOS_POLICY_REPOSITORY --set=storage.git.branch=$CERBOS_POLICY_BRANCH --set=storage.git.subDir=$CERBOS_POLICY_DIRECTORY --set=storage.git.checkoutDir=/tmp/cerbos-policies --set=storage.git.updatePollInterval=60s --set=storage.git.operationTimeout=30s --set=telemetry.disabled=true`
- **Healthcheck:** `/_cerbos/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/cerbos-authorization)
