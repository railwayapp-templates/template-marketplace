# Deploy APITable on Railway

API-oriented low-code platform | Airtable alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apitable)

## About

APITable is an open-source, API-oriented low-code platform for building collaborative database applications. It combines a spreadsheet-like interface with real-time editing, configurable views, forms, automations, permissions, dashboards, REST APIs, and embeddable components—making it a flexible self-hosted alternative for internal tools, operational workflows, and visual database products.

Hosting APITable on Railway provides a managed environment for running a self-hosted collaborative workspace without maintaining servers manually. APITable is a full-stack application that includes a web interface, real-time collaboration services, and persistent application data. Deploy the application alongside its required backing services, configure environment variables and public domains, and attach persistent storage where needed. Railway manages builds, deployments, networking, service-to-service communication, logs, and scaling, while allowing you to operate APITable as a private visual database and low-code platform for your team, customers, or embedded application workflows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| APITable | `apitable/all-in-one:v1.10.0-beta.3_1997` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/apitable`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/apitable)
