# Deploy Persistent mise Workspace on Railway

Persistent Linux workspace with mise, Node, Python, uv, and private SSH.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/persistent-mise-workspace)

## About

A private [Debian](https://www.debian.org/) Linux workspace with [mise](https://mise.jdx.dev/) for managing developer tools. [Node.js](https://nodejs.org/), [Python](https://www.python.org/), and [uv](https://docs.astral.sh/uv/) are ready on the first boot without runtime downloads. Connect through [Railway's managed SSH](https://docs.railway.com/cli/ssh) and keep your projects, installed runtimes, virtual environments, and settings across redeployments.

The template deploys one `workspace` service on [Railway](https://railway.com/) with a **5000 MB persistent volume mounted at `/root`**, daily backups, and sleeping disabled. Initial limits are 2 vCPU and 2 GiB memory; increase them for larger workloads as your plan permits. These are resource caps, not reserved capacity or a monthly price estimate.

There is no public domain, exposed SSH daemon, browser terminal, or hosted IDE. No application password or AI-provider key is required. Your Railway account controls access. This is a trusted-owner workspace with root inside the container—not on Railway's host and not an untrusted multi-user sandbox.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| workspace | [RockinPaul/mise-railway-template](https://github.com/RockinPaul/mise-railway-template) (branch: main) | Database |

## Configuration

- **Volume:** `/root`

**Category:** Other · **Languages:** JavaScript, Shell, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/persistent-mise-workspace)
