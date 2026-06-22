# Deploy NetBird Peer Client on Railway

Deploy a NetBird peer to connect your service directly to your network.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/netbird-peer-client)

## About

NetBird Peer Client is a secure, zero-configuration VPN agent that connects your application to a private overlay network based on WireGuard. It enables seamless, encrypted peer-to-peer communication between your servers, containers, databases, and local devices, bypassing firewalls without exposing ports to the public internet.

Deploying the NetBird Peer Client on Railway is straightforward and fully automated. When you trigger the deployment, Railway builds the service using the provided Dockerfile. You simply supply your NetBird Setup Key as an environment variable (`NB_SETUP_KEY`) during setup. The client starts automatically, registers itself with your NetBird management server, and joins your secure mesh network. There is no need to configure ingress rules, expose public ports, or manage firewall rules locally, as all connections are established outbound.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| netbird-peer | [ali-eljerrari/netbird-peer](https://github.com/ali-eljerrari/netbird-peer) | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `NB_SETUP_KEY` | Get SETUP KEY from netbird dashboard |

**Category:** Authentication · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/netbird-peer-client)
