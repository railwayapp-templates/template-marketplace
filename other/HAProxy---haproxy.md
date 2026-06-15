# Deploy HAProxy on Railway

The Reliable, High Perf. TCP/HTTP Load Balancer and Reverse Proxy Solution.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/haproxy)

## About

HAProxy is a high-performance open-source load balancer and reverse proxy used to distribute traffic across backend services. It helps improve availability, route HTTP/TCP traffic, handle failover, and provide a reliable entry point for web applications, APIs, microservices, and internal services.

On Railway, HAProxy can run as a lightweight traffic layer for your application stack. It is useful when you need a dedicated reverse proxy, load balancer, simple routing layer, or central entry point for self-hosted services.

This template includes a default HAProxy configuration so the service can start immediately after deployment. You can keep the default configuration, customize it through Git/GitHub, or provide a persistent custom configuration through a Railway Volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| haproxy | [codestorm-official/haproxy](https://github.com/codestorm-official/haproxy) | Database |

## Configuration

- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/haproxy)
