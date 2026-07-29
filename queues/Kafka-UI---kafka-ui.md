# Deploy Kafka UI on Railway

Kafbat UI — Open-source web UI to monitor and manage Apache Kafka clusters

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kafka-ui)

## About

**Kafbat UI** is a free, open-source, versatile, fast and lightweight web UI for managing Apache Kafka® clusters. It lets you monitor brokers, topics, partitions, consumer groups, and messages through a clean browser dashboard — without needing CLI tools or complex setup.

![Kafka UI](https://opengraph.githubassets.com/027231e34679f13d043884e2d69bd69e052e500e3bf7b5b03c72101eda21b724/kafbat/kafka-ui)

Hosting Kafka UI on Railway is straightforward. This template deploys the official **Kafbat UI** image (`ghcr.io/kafbat/kafka-ui:latest`) with basic authentication enabled by default. A persistent volume is mounted at `/etc/kafkaui` so that any cluster configuration you create via the built-in Configuration Wizard (and uploaded certificates) survives restarts. No custom start command is required. After deploy, open the public URL, log in with the default credentials, and connect your Kafka cluster in a few clicks. Ideal for development, staging, or lightweight production observability.

![Kafka UI](https://raw.githubusercontent.com/kafbat/kafka-ui/images/overview.gif)

**Default Credentials**
- Username: `kafka`
- Password: Auto-generated 16-character secret (visible in the Variables tab after successful deploy)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kafbat | `ghcr.io/kafbat/kafka-ui:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SERVER_PORT` | 8080 |
| `DYNAMIC_CONFIG_ENABLED` | true |
| `SPRING_SECURITY_USER_NAME` | kafka |
| `SPRING_SECURITY_USER_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/actuator/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/kafkaui`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/kafka-ui)
