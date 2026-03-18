# Deploy ActiveMQ on Railway

The most popular open source, multi-protocol, Java-based message broker.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/JwaQug)

## About

Apache ActiveMQ® is the most popular open source, multi-protocol, Java-based message broker. It supports industry standard protocols so users get the benefits of client choices across a broad range of languages and platforms. Connect from clients written in JavaScript, C, C++, Python, .Net, and more. Integrate your multi-platform applications using the ubiquitous AMQP protocol. Exchange messages between your web applications using STOMP over websockets. Manage your IoT devices using MQTT. Support your existing JMS infrastructure and beyond. ActiveMQ offers the power and flexibility to support any messaging use-case.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ActiveMQ | `apache/activemq-artemis:2.35.0` | Database |
| ActiveMQ UI | `ghcr.io/brody192/railway-public-to-private-proxy` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ACTIVEMQ_URL` | - | The public TCP proxy domain for the service. |
| `ARTEMIS_USER` | (secret) | - |
| `ACTIVEMQ_PORT` | - | The external port for the TCP Proxy. |
| `ANONYMOUS_LOGIN` | (secret) | - |
| `ACTIVEMQ_UI_PORT` | 8161 | - |
| `ARTEMIS_PASSWORD` | (secret) | - |
| `ACTIVEMQ_PRIVATE_URL` | - | The private DNS name of the service. |
| `ACTIVEMQ_PRIVATE_PORT` | - | The internal port for the TCP Proxy. |

## Configuration

- **TCP Proxies:** 61616
- **Volume:** `/var/lib/artemis-instance`
- **Networking:** Public domain with automatic HTTPS

**Category:** Queues

[View on Railway →](https://railway.com/template/JwaQug)
