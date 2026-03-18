# Deploy openstatus-checker on Railway

The checker service to ping external service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/6lMioC)

## About

The OpenStatus Checker is a lightweight service designed to monitor the availability of external services by regularly pinging them. It captures response data and seamlessly integrates with Tinybird for real-time data processing and analytics. This ensures that users can track the status of their services efficiently, gaining valuable insights into performance and uptime. With easy deployment options, including Docker and Render, the OpenStatus Checker is versatile and suitable for both small-scale monitoring and large, distributed infrastructures.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openstatushq/checker:latest | `ghcr.io/openstatushq/checker:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/6lMioC)
