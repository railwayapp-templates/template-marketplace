# Deploy VPN border0 on Railway

Deploy and Host overflowing-caring with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/overflowing-caring)

## About

The border0 railway template is a streamlined deployment package designed to integrate Border0’s zero-trust networking capabilities directly into the Railway ecosystem. It allows developers to securely expose private services—such as databases or internal web apps—using identity-aware tunnels, effectively replacing traditional VPNs with a modern, cloud-native access layer.

Hosting the border0 railway template involves running a lightweight connector as a Railway service that communicates with the Border0 Global Edge. When deployed, this template manages the lifecycle of secure "sockets," which act as encrypted entry points to your infrastructure. The process is primarily configuration-driven; once you provide your Border0 credentials, Railway handles the container orchestration while Border0 manages identity verification (SSO) and policy enforcement. This setup ensures that your backend services remain private and unreachable via the public internet, only becoming visible to authenticated users through the secure Border0 tunnel.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| border0 | [contourkde/border0](https://github.com/contourkde/border0) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BORDER0_TOKEN` | (secret) | Border0 Service Account token |

**Category:** Authentication · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/overflowing-caring)
