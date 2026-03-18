# Deploy Portainer Server on Railway

Manage your containers with ease (Community Edition, w/ Edge Agents)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/portainer-server)

## About

Portainer Server is an open-source lightweight management UI that allows you to easily manage your Docker containers, images, networks, and volumes. It provides a simple and intuitive interface for both beginners and experienced users to interact with their Docker environments.

Hosting Portainer Server involves deploying the application on a cloud platform, configuring the necessary resources, and ensuring that it can communicate with your Docker environment. This typically includes setting up a container for Portainer, configuring storage for persistent data, and managing access controls for users, and opening the Portainer Tunnel for any Edge Agents you plan to configure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Portainer Tunnel | `ghcr.io/brody192/railway-public-to-private-proxy` | Web service |
| Portainer Server | `portainer/portainer-ce:lts` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PROXY_PORT` | Portainer Tunnel | 8000 |
| `PORT` | Portainer Server | 9000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/portainer-server)
