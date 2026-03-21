# Deploy Easytier on Railway

✨ A simple, secure, decentralized networking solution

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/capable-emotion)

## About

EasyTier is a simple, secure, decentralized tool for intranet penetration and remote networking, suitable for various scenarios such as remote work, remote access, and game acceleration. It requires no public IP and no complex configuration, enabling secure interconnection between devices in different locations with ease.

- Decentralized: No reliance on central servers; all nodes are equal and independent, capable of forwarding and networking.
- Secure Encryption: Supports WireGuard and AES-GCM encryption to ensure data security.
- Cross-Platform: Supports MacOS, Linux, Windows, FreeBSD, Android, and will support iOS in the future.
Networking Without Public IP: Enables networking using shared public nodes.
- NAT Traversal: Supports UDP NAT traversal for stable connections in complex network environments.
Intelligent Routing: Automatically selects the best link to reduce latency and increase throughput.
- High Availability: Supports multipath and automatically switches to healthy links to improve stability.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| easytier/easytier:latest | `easytier/easytier:v2.5.0` | TCP service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 11012

**Category:** Other

[View on Railway →](https://railway.com/deploy/capable-emotion)
