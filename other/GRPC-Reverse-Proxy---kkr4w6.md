# Deploy GRPC Reverse Proxy on Railway

A simple gRPC reverse proxy using Caddy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kkr4w6)

## About

A lightweight gRPC reverse proxy using Caddy that forwards HTTP/2 Cleartext (h2c) traffic to backend gRPC services. Built on Alpine Linux for minimal resource usage while providing robust proxy capabilities for gRPC microservices architectures.

Hosting a gRPC reverse proxy provides a crucial infrastructure component for microservices architectures, enabling load balancing, SSL termination, and routing for gRPC services. Built with Caddy on Alpine Linux, this proxy efficiently handles HTTP/2 Cleartext connections and forwards them to designated backend gRPC services. The lightweight Docker-based solution offers simple configuration through environment variables, making it ideal for containerized deployments where you need to expose internal gRPC services through a unified entry point with minimal overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grpc-reverse-proxy | `ghcr.io/monotykamary/grpc-reverse-proxy:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | The port on which the Caddy server will listen for incoming connections inside the container. |
| `SERVICE_URL` | - | The URL of the backend gRPC service to which traffic will be forwarded (e.g., my-grpc-service:50051). This service must support h2c (HTTP/2 Cleartext). |

**Category:** Other

[View on Railway →](https://railway.com/deploy/kkr4w6)
