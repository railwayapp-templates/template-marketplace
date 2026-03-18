# Deploy nats-server on Railway

High performance nats server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/AEaP8G)

## About

# **NATS Server Template**

![NATS Logo](https://nats.io/img/logos/nats-horizontal-color.png)

Welcome to the **NATS Server Template** – your go-to solution for lightweight, high-performance messaging systems! This template is designed to accelerate your development by providing a robust, scalable, and easy-to-configure NATS server setup.

Harness the power of NATS for real-time communications and microservices orchestration. With this template, you can effortlessly integrate NATS into your project, ensuring low latency, high throughput, and seamless message distribution across your systems.

Perfect for developers looking to implement **pub/sub**, **request/reply**, and **distributed queue messaging** patterns. Get started quickly and take your system's performance to the next level with our streamlined NATS Server Template!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nats | [bael-code/nats](https://github.com/bael-code/nats) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `STORE_DIR` | - | The mount path of the attached volume. |
| `SERVER_NAME` | - | The service name. |
| `CLUSTER_ROUTES_SEED` | nats://localhost:6222 | Put the private host |

## Configuration

- **Volume:** `/nats`

**Category:** Queues · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/AEaP8G)
