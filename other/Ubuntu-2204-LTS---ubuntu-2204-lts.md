# Deploy Ubuntu 22.04 LTS on Railway

Ubuntu 22.04 with storage and SSH for diagnostics, testing, and dev tasks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-2204-lts)

## About

Ubuntu 22.04 LTS, also known as Jammy Jellyfish, is a stable long-term support Linux distribution based on Debian. This template provides a lightweight Ubuntu environment on Railway with persistent storage and SSH access, making it useful for diagnostics, testing, development tasks, scripts, and isolated Linux workflows.

![](https://assets.ubuntu.com/v1/ff6a9a38-ubuntu-logo-2022.svg)

Deploying Ubuntu 22.04 LTS on Railway uses the official Ubuntu Docker image in a containerized environment. Railway handles infrastructure, networking, deployments, and scaling, so you can run an Ubuntu-based service without managing a server manually. A persistent volume can be mounted to retain files, configuration, logs, and project data across restarts and redeployments. SSH access through Railway makes it easy to inspect the environment, install packages, run commands, debug issues, test workflows, or use the container as a simple cloud-hosted Ubuntu workspace.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu | `ubuntu:22.04` | Database |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ubuntu-2204-lts)
