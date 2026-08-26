# Deploy Portainer on Railway

Web interface for managing Docker containers and Kubernetes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/portainer-container)

## About

Portainer is the container management UI that hundreds of thousands of teams point at their Docker, Docker Swarm, Podman and Kubernetes environments. Instead of SSH-ing into a host to read `docker ps`, you get a browser view of every container, image, volume, network and stack — with logs, a console, live stats, a Compose and Helm deployment engine that pulls from Git, registry credentials, and role-based access so an on-call engineer can restart a service without holding root on the box.

Self-host Portainer once, somewhere with a stable HTTPS URL, and connect it outward to whatever you already run: a VPS, a Raspberry Pi cluster at home, a managed Kubernetes cluster, or all three at once. Deploy Portainer on Railway and the Community Edition server comes up with an administrator already created, HTTPS terminated, and a volume holding its embedded database and signing keys.

![Diagram of the Portainer service and its data volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787635497/portainer-architecture.png)

Portainer is a single Go binary with an embedded BoltDB database and a React UI. It runs no workload itself; it talks to the Docker or Kubernetes API of each environment you register and renders the result. That is why teams keep the server away from the machines it manages — when a node goes down, the control plane is still up to tell you.

Key features:

- **Multi-environment**: Docker Standalone, Docker Swarm, Podman and Kubernetes in one UI
- **Stacks**: deploy and update Compose files or Helm charts, optionally synced from Git
- **Registries**: credentials for Docker Hub, GHCR, ECR, Quay, GitLab and custom registries
- **RBAC**: users, teams and per-environment access for non-admins
- **Operations**: logs, exec console, live stats, image pruning, volume and network management

The Railway service is deliberately small: the Portainer server plus one volume at `/data`. No separate database, cache, worker or object storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| portainer | [gridalpha/portainer-railway](https://github.com/gridalpha/portainer-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP listen port behind Railway's edge |
| `AGENT_SECRET` | (secret) | Shared secret for every Portainer Agent |
| `ADMIN_PASSWORD` | (secret) | First administrator password, applied on first boot |
| `PORTAINER_HSTS` | true | Emit Strict-Transport-Security header |
| `PORTAINER_DATA_DIR` | /data | Data directory, matches the volume mount |
| `PORTAINER_LOG_MODE` | NOCOLOR | NOCOLOR, PRETTY or JSON |
| `PORTAINER_LOG_LEVEL` | INFO | DEBUG, INFO, WARN or ERROR |
| `PORTAINER_HTTPS_PORT` | 9443 | Private HTTPS listener port |
| `PORTAINER_TUNNEL_PORT` | 8000 | Edge reverse-tunnel server port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/portainer-container)
