# Deploy Lead-Generation on Railway

B2B lead generation and ROI tracking dashboard for immigration lawyers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lead-generation)

## About

Lead-Generation is a lightweight lead capture and CRM platform built for service-based businesses. It provides public landing pages for collecting inquiries, an authenticated admin dashboard for managing clients and leads, automated qualification scoring, ROI tracking, CSV export, and a proof API endpoint. It runs as a Python web service using SQLite for structured data storage.

Hosting Lead-Generation on Railway involves deploying a Dockerized Python application and configuring required environment variables for authentication and API access. The service exposes public lead pages and a secured dashboard, while persisting operational data in a SQLite database. For production reliability, a mounted storage path such as /data should be configured to prevent data loss during restarts. Railway manages networking, container execution, HTTPS provisioning, and scaling automatically, allowing you to focus on application logic instead of infrastructure maintenance or server configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Online-Job | [knightmaiga/Online-Job](https://github.com/knightmaiga/Online-Job) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/lead-generation)
