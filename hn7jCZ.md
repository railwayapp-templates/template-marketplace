# Deploy Grafana Persistent on Railway

Grafana, with a volume attached to keep your configurations around

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/hn7jCZ)

## About

This Grafana template provides a starting point for building a powerful monitoring dashboard that helps administrators visualize key data for infrastructure, operations, and performance metrics.

## What's grafana?
Grafana is an open-source tool that enables users to create dynamic, interactive dashboards for monitoring and analyzing time series data. It can pull data from a wide variety of sources, including databases (such as MySQL, PostgreSQL, and Prometheus), cloud services (like AWS and Azure), and custom applications, making it a versatile solution for consolidating data from multiple systems.

With Grafana, users can design visually rich dashboards using customizable panels such as graphs, tables, and gauges. These panels support different visualizations like line charts, bar charts, heatmaps, and more. In addition to displaying data, Grafana allows users to perform data transformations, aggregations, and set up alerts based on specific thresholds.

The platform also offers an interactive experience, allowing you to zoom in on time ranges, drill down into data points, and apply filters to focus on specific aspects of your data. Grafana dashboards support annotations, so you can add context, notes, and comments directly within the dashboard, helping to clarify insights.

## Persistent?

To ensure data persistence, we've mounted a volume at **/var/lib/grafana**. This setup guarantees that your data remains intact, even across system restarts.

## Plugins

Grafana’s plugin ecosystem significantly extends its functionality. With the ability to integrate additional data sources, visualization types, and authentication options, Grafana can be tailored to fit any use case. You can easily explore and install community-developed plugins from the official Grafana Plugin Repository: [Grafana Plugins](https://grafana.com/grafana/plugins).

Widely adopted across industries, Grafana is ideal for infrastructure monitoring, application performance monitoring (APM), and business intelligence. Its flexibility, rich visualizations, and extensibility make it a go-to solution for anyone looking to extract valuable insights from their data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Grafana | [vergissberlin/railwayapp-grafana](https://github.com/vergissberlin/railwayapp-grafana) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `VERSION` | latest | - |
| `GF_LOG_MODE` | console | - |
| `GF_INSTALL_PLUGINS` | grafana-piechart-panel,grafana-worldmap-panel,grafana-clock-panel,grafana-simple-json-datasource | - |
| `GF_SERVER_ROOT_URL` | - | Your grafana base URL, like https://grafana.yourdomain.com |
| `GF_SECURITY_ADMIN_USER` | (secret) | The name of your admin user |
| `GF_DEFAULT_INSTANCE_NAME` | - | The name of your grafana instance |
| `GF_SECURITY_ADMIN_PASSWORD` | (secret) | The password for your admin account |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/grafana`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/hn7jCZ)
