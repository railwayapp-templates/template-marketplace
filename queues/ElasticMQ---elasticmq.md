# Deploy ElasticMQ on Railway

A lightweight Amazon SQS-compatible message queue with a web UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/elasticmq)

## About

ElasticMQ is a lightweight Amazon SQS-compatible message queue designed for development, testing, CI/CD, and integration workflows.

This deployment combines ElasticMQ with the official ElasticMQ UI, providing both an SQS-compatible API and a browser-based interface for inspecting queues and messages.

This template deploys ElasticMQ and ElasticMQ UI as separate Railway services.

ElasticMQ provides the SQS-compatible API on port `9324`, while ElasticMQ UI runs on port `9325` and connects to the queue service through Railway private networking.

The UI is exposed publicly, while the SQS API can remain private for applications running in the same Railway project.

No PostgreSQL, Redis, MySQL, MongoDB, or external database is required.

Queue and message state is primarily in memory and should be treated as disposable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| elasticmq-ui | `softwaremill/elasticmq-ui` | Web service |
| elasticmq | [codestorm-official/elasticmq](https://github.com/codestorm-official/elasticmq) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | elasticmq-ui | 9325 | Railway HTTP target port |
| `HOSTNAME` | elasticmq-ui | 0.0.0.0 | Bind UI to all interfaces |
| `AWS_REGION` | elasticmq-ui | us-east-1 | SQS emulator region |
| `SQS_ENDPOINT` | elasticmq-ui | - | ElasticMQ private endpoint |
| `AWS_ACCESS_KEY_ID` | elasticmq-ui | test | Dummy AWS access key |
| `AWS_SECRET_ACCESS_KEY` | elasticmq-ui | (secret) | Dummy AWS secret key |
| `PORT` | elasticmq | 9324 | Railway HTTP target port |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Queues · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/elasticmq)
