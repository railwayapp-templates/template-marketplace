# Deploy InfluxDB on Railway

High-performance time-series database optimized

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/9qgsKj)

## About

This template deploys InfluxDB, an open-source time-series database designed to handle high write and query loads. It’s ideal for storing data like sensor readings, server metrics, IoT events, and financial data points — all with built-in support for time-based queries.

With this template, you can quickly spin up a ready-to-use InfluxDB instance on Railway, complete with the HTTP API and Admin UI.

⸻

🔧 Features:
	•	InfluxDB v2.x single-node instance
	•	Built-in web UI on port 8086
	•	Time-series data optimized storage engine
	•	Native support for Flux and InfluxQL queries
	•	Easily integrates with Telegraf, Grafana, or IoT systems

⸻

🚀 Quick Start:
	•	Admin UI: http://localhost:8086
	•	Default exposed ports:
	•	8086: HTTP API & UI
	•	Persistent volume support for long-term storage
	•	Optionally configure tokens, buckets, and orgs via environment variables

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| influxdb | `influxdb` | Database |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/influxdb2`

**Category:** Other

[View on Railway →](https://railway.com/template/9qgsKj)
