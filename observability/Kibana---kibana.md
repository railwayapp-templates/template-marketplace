# Deploy Kibana on Railway

Kibana is a visualization and dashboarding tool for data from Elastic.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kibana)

## About

Kibana is an open-source visualization and dashboarding tool that works seamlessly with Elasticsearch. It allows users to explore, analyze, and visualize large datasets in real time through intuitive dashboards, charts, and search capabilities. With Kibana, you can turn complex data into actionable insights for monitoring, reporting, and decision-making.

Hosting Kibana involves deploying the web-based UI that connects to your Elasticsearch instance. Since Kibana acts as the interface to Elasticsearch, you’ll need to configure it with your cluster’s endpoint and credentials. Once deployed, Kibana provides a secure, scalable environment for visualizing data, setting up alerts, and managing dashboards. On Railway, you can streamline this process by deploying Kibana with minimal setup, managing environment variables, and scaling resources as your data grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kibana:8.19.6 | `kibana:8.19.6` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5601 | - |
| `SERVER_HOST` | 0.0.0.0 | - |
| `SERVER_NAME` | kibana | - |
| `ELASTICSEARCH_PASSWORD` | (secret) | Generate  by running "bin/elasticsearch-reset-password -u kibana_system" in your elastic instance |
| `ELASTICSEARCH_USERNAME` | (secret) | - |
| `XPACK_SECURITY_ENABLED` | true | - |
| `XPACK_MONITORING_UI_ENABLED` | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/kibana)
