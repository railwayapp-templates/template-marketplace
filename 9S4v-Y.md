# Deploy LavinMQ on Railway

A message queue & streaming server that implements the AMQP 0-9-1 protocol.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/9S4v-Y)

## About

![LavinMQ](https://github.com/cloudamqp/lavinmq/raw/main/static/img/banner-lavinmq.svg)

## LavinMQ

### A message queue & streaming server that implements the AMQP 0-9-1 protocol.
Written in [Crystal](https://crystal-lang.org/).

Aims to be very fast, has low RAM requirements, handles very long queues,
many connections, and requires minimal configuration.

#### Overview

LavinMQ is a high-performance message broker that implements the AMQP protocol, providing robust messaging capabilities for your applications. This Railway template offers a streamlined deployment of LavinMQ, allowing you to quickly set up a reliable messaging system for your microservices architecture.

#### Features

1. Persistent Message Storage: Ensures your messages survive broker restarts
2. Fully AMQP 0-9-1 Compatible: Works with existing AMQP clients
3. Web Management Interface: Monitor and manage your message broker through an intuitive dashboard
4. High Throughput: Optimized for message processing performance
5. Clustering Support: Scale horizontally across multiple nodes when needed
6. Queue Federation: Connect brokers across different regions or environments
7. Access Control: Fine-grained permission system for users and applications

#### Quick Start

- Click the Deploy on Railway button to create a new project
- Deploy the service
- Set Railway domain to point to **PORT: 15672**
- Access the management UI at https://your-service-name.railway.app

#### Default user
- Username: **guest**
- Password: **guest**

*Remember to add new user with strong password and remove guest user on production (guest user has administrator privileges)*

Read more at [LavinMQ.com](https://lavinmq.com)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LavinMQ | `cloudamqp/lavinmq:main` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/lavinmq`

**Category:** Queues

[View on Railway →](https://railway.com/template/9S4v-Y)
