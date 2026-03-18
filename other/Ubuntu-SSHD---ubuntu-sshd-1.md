# Deploy Ubuntu SSHD on Railway

🚀 Deploy and Host Ubuntu SSHD in a few clicks. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-sshd-1)

## About

Deploy an Ubuntu 22.04 container with SSH server access on Railway. This template provides a secure SSH environment for remote development, system administration, and container management tasks.

This Docker image creates an Ubuntu 22.04 environment with OpenSSH server pre-configured for Railway deployment. Access your container remotely via SSH through Railway's TCP proxy feature for full terminal control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-ubuntu-sshd | [georgebrnv/railway-ubuntu-sshd](https://github.com/georgebrnv/railway-ubuntu-sshd) | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SSH_PASSWORD` | (secret) |
| `SSH_USERNAME` | (secret) |

## Configuration

- **TCP Proxies:** 22

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ubuntu-sshd-1)
