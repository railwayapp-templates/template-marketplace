# Deploy InfluxDB (Open-Source Time Series Database & Metrics Platform) on Railway

InfluxDB [Mar ’26] (Store & Query Time Series Data Easily) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/influxdb)

## About

InfluxDB is a powerful open-source time series database designed for storing and analyzing large volumes of time-stamped data such as metrics, events, and sensor readings. It is highly optimized for performance and scalability, making it ideal for IoT, DevOps, monitoring, and analytics use cases. With InfluxDB, developers can efficiently collect, store, and query data in real-time using its specialized query language, Flux.

Self-hosting InfluxDB ensures that all your metrics and performance data remain under your control without relying on third-party services. By deploying InfluxDB on Railway, you can easily set up a scalable and managed time-series database with minimal effort.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| influxdb | `influxdb` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DOCKER_INFLUXDB_INIT_ORG` | default |
| `DOCKER_INFLUXDB_INIT_MODE` | setup |
| `DOCKER_INFLUXDB_INIT_BUCKET` | default |
| `DOCKER_INFLUXDB_INIT_PASSWORD` | (secret) |
| `DOCKER_INFLUXDB_INIT_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/influxdb2`

**Category:** Storage

[View on Railway →](https://railway.com/template/influxdb)
