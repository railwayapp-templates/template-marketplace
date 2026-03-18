# Deploy Nexterm on Railway

Open source server management software for SSH, VNC & RDP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nexterm)

## About

Nexterm is an open-source server management platform for secure remote access via SSH, VNC, and RDP. It supports SFTP file management, Docker and Proxmox container deployment, two-factor authentication, OIDC SSO, and team-based organization of servers and users—all with encrypted credentials.

Nexterm is deployed as a Docker container, making it straightforward on platforms like Railway. A critical requirement is setting a secure 64-character hexadecimal `ENCRYPTION_KEY` environment variable (generate with `openssl rand -hex 32`) to encrypt sensitive data like passwords and keys. The app runs on port 6989 by default. For full functionality (e.g., Wake-on-LAN and localhost connections), host networking is recommended, though Railway's environment will use bridged networking with exposed ports. Note that Nexterm is currently in early preview development and not recommended for production use, ideal for testing or personal server management setups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nexterm | `germannewsmaker/nexterm:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ENCRYPTION_KEY` | aba3aa8e29b9904d5d8d705230b664c053415c54be20ad13be99af0057dfa23a | Encryption key for passwords, SSH keys and passphrases |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/nexterm)
