# Deploy smoothmq on Railway

A drop-in replacement for AWS SQS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/AJv-64)

## About

SmoothMQ is an open-source message queue that is compatible with the SQS API. This means all existing code and libraries work with it out of the box.

It also improves upon the API. With SmoothMQ, you can:

- Schedule messages for the future
- View and search messages via a dashboard
- Export Prometheus metrics

It is written in Go, deploys as a single binary, and stores data on local disk.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| smoothmq | [poundifdef/smoothmq](https://github.com/poundifdef/smoothmq) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `Q_SERVER_USE_SINGLE_PORT` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Queues · **Languages:** Go, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/AJv-64)
