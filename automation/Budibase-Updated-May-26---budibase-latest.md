# Deploy Budibase [Updated May ’26] on Railway

Budibase [May ’26] (Build Business Apps Fast Without Coding) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/budibase-latest)

## About

BudiBase is a powerful open-source low-code platform designed to help users build internal tools, web applications, and admin dashboards effortlessly. It’s available on GitHub and provides an intuitive interface for creating professional-grade apps without deep programming knowledge.

Self-hosting BudiBase on Railway gives you total control over your data, configurations, and deployment environment. It eliminates third-party dependencies, ensuring complete data privacy and security. BudiBase’s self-hosted deployment allows you to integrate your existing data sources, set up authentication, and manage your apps with full flexibility.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| budibase | `budibase/budibase:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `JWT_SECRET` | (secret) |
| `INTERNAL_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/budibase-latest)
