# Deploy Kafka on Railway

A Kafka template on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/K5vWpm)

## About

# Kafka Deployment on Railway

This template facilitates the deployment of an instance of [Apache Kafka](https://kafka.apache.org/) in conjunction with [Apache ZooKeeper](https://zookeeper.apache.org/) on Railway.app. It includes examples illustrating Kafka's consumer and producer capabilities implemented in NodeJS.

## Features

- Kafka and ZooKeeper Integration
- NodeJS Consumer Example (/consumer) [(source)](https://github.com/)
- NodeJS Producer Example (/producer) [(source)](https://github.com/)

## Usage

1. Click the "Deploy on Railway" button above.
2. Configure Kafka and ZooKeeper according to your specific requirements within the designated directories.
3. Input the necessary environment variables and establish authentication parameters as needed.
4. Deploy the template to initiate your Kafka and ZooKeeper instance.

## Resources

- [Kafka Official Documentation](https://kafka.apache.org/documentation/)
- [ZooKeeper Official Documentation](https://zookeeper.apache.org/doc/)
- [Kafka Source Code](https://kafka.apache.org/)
- [ZooKeeper Source Code](https://zookeeper.apache.org/)
- [NodeJS Consumer & Producer Samples](https://github.com/your-kafka-samples-path)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Zookeeper | [oussamajabnouni/railway-kafka](https://github.com/oussamajabnouni/railway-kafka) (root: /zookeeper) | Worker |
| Producer | [oussamajabnouni/railway-kafka](https://github.com/oussamajabnouni/railway-kafka) (root: /producer) | Worker |
| Consumer | [oussamajabnouni/railway-kafka](https://github.com/oussamajabnouni/railway-kafka) (root: /consumer) | Worker |
| Kafka | [oussamajabnouni/railway-kafka](https://github.com/oussamajabnouni/railway-kafka) (root: /kafka) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Zookeeper | 2181 |
| `ZOOKEEPER_CLIENT_PORT` | Zookeeper | 2181 |
| `BROKERS` | Producer | kafka.railway.internal:29092 |
| `BROKERS` | Consumer | kafka.railway.internal:29092 |
| `PORT` | Kafka | 29092 |
| `KAFKA_ZOOKEEPER_CONNECT` | Kafka | zookeeper.railway.internal:2181 |
| `KAFKA_ADVERTISED_LISTENERS` | Kafka | INTERNAL://kafka.railway.internal:29092 |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | Kafka | INTERNAL |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | Kafka | INTERNAL:PLAINTEXT |

**Category:** Queues · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/K5vWpm)
