# Deploy railq on Railway

Deploy and Host sqs like queues on Railway with minimal memory footprint

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/railq)

## About

**railq** is a simple, SQS-like in-memory queuing system designed for modern cloud-native applications. It provides a RESTful API for message queuing, visibility timeouts, and message lifecycle management, making it easy to integrate reliable background processing and decoupled communication into your Railway projects.

Hosting railq on Railway allows you to quickly spin up a robust, lightweight queuing service without managing infrastructure. With a single deploy, you get a fully managed, horizontally scalable queue that supports message retention, visibility timeouts, and easy integration with your microservices or serverless functions. Configuration is handled via environment variables, and the service is ready to use out-of-the-box for development, prototyping, or lightweight production workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railq | [davidachris/railq](https://github.com/davidachris/railq) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `QUEUE_RETENTION_PERIOD` | 7d | Time to retain a message in the queue (default: '7d') |
| `QUEUE_VISIBILITY_TIMEOUT` | 30 | Time a message is in flight (default: 30) |

## Configuration

- **Healthcheck:** `/config`

**Category:** Queues · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/template/railq)
