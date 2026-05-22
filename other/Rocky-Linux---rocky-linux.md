# Deploy Rocky Linux on Railway

Hosted Rocky Linux 9 workspace with SSH and persistent storage. 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rocky-linux)

## About

Rocky Linux SSH is a cloud-hosted Linux workspace that can be accessed through Railway SSH. It uses the official `rockylinux:9` container image, providing a Red Hat Enterprise Linux compatible environment for diagnostics, development, testing, package workflows, automation, and isolated Linux tasks with persistent storage support through Railway Volume.

![Imgur](https://imgur.com/VcPMbev.png)

Hosting Rocky Linux SSH on Railway involves deploying a containerized Rocky Linux 9 environment that can be accessed securely using Railway CLI SSH. Rocky Linux is a community-driven enterprise Linux distribution designed to be compatible with Red Hat Enterprise Linux, making it useful for users who want an RPM-based Linux environment for testing commands, packages, scripts, and server-style workflows.

Instead of manually provisioning a VPS, Railway manages the deployment, runtime, networking, environment, and infrastructure layer for you. After the template is deployed, you can connect to the running Rocky Linux container from your local terminal, inspect the system, install packages with `dnf`, run diagnostic commands, test shell scripts, verify Linux behavior, and store persistent files inside a mounted Railway Volume.

This template is useful as a lightweight enterprise Linux workspace, a debugging shell, a package testing environment, or an isolated cloud-hosted command-line sandbox for developers, students, system administrators, and DevOps workflows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rocky-linux | `rockylinux:9` | Database |

## Configuration

- **Start command:** `bash -lc 'echo "container is running on Railway"; tail -f /dev/null'`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/rocky-linux)
