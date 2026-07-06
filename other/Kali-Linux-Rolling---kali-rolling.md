# Deploy Kali Linux Rolling on Railway

[Jul'26] Hosted Kali Linux workspace with SSH & persistent storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kali-rolling)

## About

Kali Linux is a Debian-based Linux distribution designed for security research, penetration testing, digital forensics, and advanced Linux workflows. This template deploys Kali Rolling on Railway using the `kalilinux/kali-rolling` Docker image, giving you a cloud-hosted Kali environment with Railway SSH access and optional persistent storage.

![Imgur](https://imgur.com/gWBQl7G.png)

Hosting Kali Linux on Railway involves deploying the official Kali Rolling Docker image as a containerized Linux environment. Railway handles infrastructure, deployment, runtime management, networking, and service configuration so you can launch a Kali-based workspace without manually provisioning a VPS. Once deployed, you can connect to the running container using Railway SSH, inspect the system, install packages with `apt`, run commands, test scripts, and store files in a mounted Railway Volume for persistence across restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kali-linux | `kalilinux/kali-rolling` | Database |

## Configuration

- **Start command:** `bash -lc 'echo "container is running on Railway"; tail -f /dev/null'`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kali-rolling)
