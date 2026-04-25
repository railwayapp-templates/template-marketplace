# Deploy Syncthing (Open-Source Peer-to-Peer File Synchronization Platform) on Railway

Syncthing [May ’26] (OSS File Sync Alternative to Google Drive) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/syncthing)

## About

Syncthing is a free, open-source file synchronization tool available on [GitHub](https://github.com/syncthing/syncthing). It allows you to securely sync files between computers, mobile devices, or servers without relying on third-party cloud storage. With **Syncthing Docker**, you can easily deploy and manage your own secure file-sync service across platforms like Windows, macOS, Linux, Android, and iOS.

Whether you want to sync your notes between **Obsidian**, back up project files across devices, or run a **Syncthing setup** for teams, Railway makes deployment painless. With just one click, you can host a managed Syncthing service that scales automatically and stays online 24/7.

---

Self-hosting Syncthing with Docker gives you full control over your file synchronization setup. You decide where your data lives, which devices can connect, and how traffic flows. Unlike centralized file-sharing services, Syncthing uses peer-to-peer connections with encryption for maximum privacy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| syncthing/syncthing:latest | `syncthing/syncthing:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8384 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/syncthing`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/syncthing)
