# Deploy Kali Linux (ssh) on Railway

Kali linux machine that you can ssh into.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kali-linux-ssh)

## About

Kali Linux is a Debian-based distribution for penetration testing and security auditing with hundreds of pre-installed security tools. This template provides SSH access to a cloud-hosted Kali Linux environment.

Deploys the official Kali Linux rolling Docker image with a configured SSH server. The container automatically creates a user account from environment variables and starts SSH on port 22. Supports persistent storage via volume mounts to `/home`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kali Railway (ssh) | [dbx0/kali-railway](https://github.com/dbx0/kali-railway) (root: /) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | Random 32 characters password |
| `USERNAME` | (secret) | Random 16 characters username |

## Configuration

- **TCP Proxies:** 22
- **Volume:** `/home`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/kali-linux-ssh)
