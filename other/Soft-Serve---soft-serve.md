# Deploy Soft Serve on Railway

Charm Soft Serve 0.12 self-hosted Git server over SSH and HTTPS with a TUI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/soft-serve)

## About

Soft Serve is a self-hostable Git server from Charm with a delightful terminal UI over SSH. You create, browse and manage repositories with `ssh`, clone and push over SSH or HTTPS, and control access with users, collaborators and access tokens. Git LFS is built in, and it runs as a single small Go binary.

This template deploys Soft Serve v0.12.2 from the official image with repositories and its database on a Railway volume. SSH is exposed through the Railway TCP proxy and HTTPS through the Railway domain. Anonymous access is off, so every repository is private unless you change it. You must paste your SSH public key into `SOFT_SERVE_INITIAL_ADMIN_KEYS` when deploying; that key becomes the admin. The unencrypted git daemon protocol is disabled. Soft Serve is light and fits the Hobby plan, with storage growing with your repositories. Back up the volume regularly to protect your repositories.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| softserve | `charmcli/soft-serve:v0.12.2` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 23232 |
| `SOFT_SERVE_NAME` | Soft Serve |
| `SOFT_SERVE_ANON_ACCESS` | no-access |
| `SOFT_SERVE_GIT_ENABLED` | false |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 23231
- **Volume:** `/soft-serve`

**Category:** Other

[View on Railway →](https://railway.com/deploy/soft-serve)
