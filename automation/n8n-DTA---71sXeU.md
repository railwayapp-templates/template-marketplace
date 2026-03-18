# Deploy n8n-DTA on Railway

A worflow automation for Digital Team Academy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/71sXeU)

## About

# DTA - N8N

This template will be usefull for students at Digital Team Academy.

The infrastrcture :

1. Postgresql Database for storing user creds, workflow configurations, worflow logs etc...
2. N8N, for the UI and Backend

N8N is an open-source workflow automation tool that allows users to connect various applications and automate tasks between them. It provides a powerful and flexible way to create workflows using a visual editor, enabling users to design and manage complex processes without the need for extensive coding knowledge. 

## Key Features

- **Visual Workflow Designer**: N8N offers an intuitive drag-and-drop interface to design workflows, making it accessible for users of all technical levels.
- **Extensive Integrations**: It supports integration with numerous applications and services, including databases, APIs, and various SaaS products.
- **Custom Nodes**: Users can create custom nodes to extend the functionality and connect with proprietary or less common services.
- **Self-Hosted**: Being open-source, N8N can be self-hosted, providing users with full control over their data and workflows.
- **Scalable**: It can handle simple tasks as well as complex automation processes, making it suitable for both small businesses and large enterprises.

## Use Cases

- **Data Synchronization**: Automatically sync data between different systems, ensuring consistency and accuracy across platforms.
- **Notifications and Alerts**: Set up automated notifications for specific events or conditions, improving responsiveness and communication.
- **ETL Processes**: Extract, transform, and load data across various databases and data warehouses.
- **API Integration**: Easily connect and interact with different APIs, enabling seamless data exchange between systems.
- **Automation of Repetitive Tasks**: Streamline repetitive tasks to save time and reduce manual effort.

## Getting Started

To start using N8N, you can either use the hosted version provided by the N8N team or set up your own instance by following the installation instructions available on their [official documentation](https://docs.n8n.io/).

## Conclusion

N8N is a versatile and powerful tool for automating workflows and integrating applications. Its open-source nature and extensive feature set make it a valuable resource for developers and businesses looking to improve efficiency and streamline operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Primary | `n8nio/n8n` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Primary | 5678 |
| `DB_TYPE` | Primary | postgresdb |
| `N8N_METRICS` | Primary | false |
| `EXECUTIONS_MODE` | Primary | regular |
| `DB_POSTGRESDB_USER` | Primary | (secret) |
| `N8N_TEMPLATES_ENABLED` | Primary | false |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) |
| `N8N_DIAGNOSTICS_ENABLED` | Primary | false |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | Primary | false |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `PGPORT_PRIVATE` | Postgres | 5432 |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/71sXeU)
