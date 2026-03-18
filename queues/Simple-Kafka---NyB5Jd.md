# Deploy Simple Kafka on Railway

Simple Kafka Setup For Small Projects

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/NyB5Jd)

## About

# Simple Kafka Template

This template provides a straightforward setup for **Kafka** (with internal and public connectivity), perfect for small projects and lightweight production deployments.

## **How to Setup**

You can connect to Kafka using one of the two provided environment variables:

* **`KAFKA_URL`** → for internal access within your private or production network
* **`KAFKA_PUBLIC_URL`** → for external access (via TCP proxy) from outside the network

In your application, simply use the appropriate environment variable based on your deployment environment.

**Example:**

```bash
# Internal app (same Railway network)
KAFKA_URL=kafka-broker.railway.internal:9092

# External app (internet access)
KAFKA_PUBLIC_URL=random-url.proxy.rlwy.net:12354
```

After connecting, create your topics in your code — but always **check if a topic already exists before creating it**.

## **Services**

* **Kafka Broker:** Uses the [`apache/kafka:latest`](https://hub.docker.com/r/apache/kafka) image.
  Runs both **broker** and **controller** roles in one container for simplicity.

## **Kafka Broker Environment Variables**

```bash
KAFKA_NODE_ID="1"
KAFKA_PROCESS_ROLES="broker,controller"
KAFKA_LISTENERS="PLAINTEXT://:9092,PLAINTEXT_HOST://:29092,CONTROLLER://:9093"
KAFKA_ADVERTISED_LISTENERS="PLAINTEXT://${{KAFKA_URL}},PLAINTEXT_HOST://${{KAFKA_PUBLIC_URL}}"
KAFKA_CONTROLLER_LISTENER_NAMES="CONTROLLER"
KAFKA_LISTENER_SECURITY_PROTOCOL_MAP="CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT"
KAFKA_CONTROLLER_QUORUM_VOTERS="1@${{RAILWAY_PRIVATE_DOMAIN}}:9093"
KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR="1"
KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR="1"
KAFKA_TRANSACTION_STATE_LOG_MIN_ISR="1"
KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS="0"
KAFKA_NUM_PARTITIONS="3"
KAFKA_URL="${{RAILWAY_PRIVATE_DOMAIN}}:9092"
KAFKA_PUBLIC_URL="${{RAILWAY_TCP_PROXY_DOMAIN}}:${{RAILWAY_TCP_PROXY_PORT}}"
```

### Explanation of Key Variables

| Variable                                   | Description                                                                                                                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`KAFKA_URL`**                            | Internal Kafka endpoint used for private/production connections within the same network.                                                                                  |
| **`KAFKA_PUBLIC_URL`**                     | Public TCP proxy endpoint used for external connections (e.g., from local dev or monitoring tools).                                                                       |
| **`KAFKA_ADVERTISED_LISTENERS`**           | Advertises both internal (`PLAINTEXT://${KAFKA_URL}`) and external (`PLAINTEXT_HOST://${KAFKA_PUBLIC_URL}`) listeners so Kafka knows how to respond to different clients. |
| **`KAFKA_LISTENERS`**                      | Defines the listener ports inside the container: internal (`9092`), external (`29092`), and controller (`9093`).                                                          |
| **`KAFKA_LISTENER_SECURITY_PROTOCOL_MAP`** | Maps each listener to its security protocol — all use PLAINTEXT for simplicity.                                                                                           |
| **`KAFKA_CONTROLLER_QUORUM_VOTERS`**       | Sets the controller configuration for single-broker operation.                                                                                                            |
| **`KAFKA_NUM_PARTITIONS`**                 | Default partition count for new topics (3 is a balanced default).                                                                                                         |

### **Notes**

* Internal services on the same network should always use `KAFKA_URL`.
* External clients (like staging or developer laptops) should use `KAFKA_PUBLIC_URL`.
* All security protocols are `PLAINTEXT` — not recommended for sensitive data or production-grade clusters without TLS/SASL.

**By:** Bello Shehu Ango
📧 **Email:** [angobello0@gmail.com](mailto:angobello0@gmail.com)
💻 **GitHub:** [github.com/BelloAngo](https://github.com/BelloAngo)

---

Would you like me to add a **connection test section** (e.g., using `kafka-console-producer` and `kafka-console-consumer` examples) to verify both internal and public connections? It’s handy for quick debugging.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kafka Broker | `apache/kafka:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `KAFKA_NODE_ID` | 1 |
| `KAFKA_LISTENERS` | PLAINTEXT://:9092,PLAINTEXT_HOST://:29092,CONTROLLER://:9093 |
| `KAFKA_PROCESS_ROLES` | broker,controller |
| `KAFKA_NUM_PARTITIONS` | 3 |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | CONTROLLER |
| `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR` | 1 |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT |
| `KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS` | 0 |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | 1 |
| `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` | 1 |

## Configuration

- **TCP Proxies:** 29092

**Category:** Queues

[View on Railway →](https://railway.com/deploy/NyB5Jd)
