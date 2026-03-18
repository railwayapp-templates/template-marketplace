# Deploy Apache RocketMQ on Railway

Spins up a RocketMQ broker + HTTP Proxy + NameServer

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/apache-rocketmq)

## About

Apache RocketMQ is a distributed messaging and streaming platform with low latency, high performance, reliability, and trillion-level capacity. It provides asynchronous communication between distributed systems and supports message ordering, transaction messages, scheduled messages, and message filtering for enterprise-grade applications.

Hosting Apache RocketMQ requires two core components working together: a NameServer for routing and coordination, and a Broker for message storage and delivery. The NameServer provides lightweight service discovery and routing information, while the Broker handles message persistence, replication, and delivery with configurable storage options. This template deploys both components with the HTTP Proxy enabled on the Broker, allowing REST API access for modern web applications. RocketMQ excels at handling high-throughput messaging workloads with minimal latency while maintaining message durability through persistent storage. Railway provides scalable CPU, RAM, and persistent storage volumes for the Broker's message store, ensuring reliable message delivery and data persistence.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NameServer | [crisog/apache-rocketmq](https://github.com/crisog/apache-rocketmq) | Worker |
| Broker | [crisog/apache-rocketmq](https://github.com/crisog/apache-rocketmq) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ENABLE_PROXY` | true |

## Configuration

- **Volume:** `/home/rocketmq/store`

**Category:** Queues · **Languages:** Shell

[View on Railway →](https://railway.com/template/apache-rocketmq)
