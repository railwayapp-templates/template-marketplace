# Deploy Budibase on Railway

Open source platform for building internal applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/FNZJ8t)

## About

**Budibase** is an open-source, low-code platform that empowers teams to build internal tools, forms, and workflows rapidly. With its intuitive drag-and-drop interface and support for various data sources, Budibase enables the creation of custom applications without extensive coding knowledge.

Budibase offers flexible hosting options to suit different needs. You can self-host Budibase on your infrastructure using Docker, Kubernetes, or DigitalOcean, providing full control over your applications and data. Alternatively, Budibase Cloud offers a managed hosting solution, allowing you to focus on building applications without worrying about infrastructure management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Budibase | `budibase/budibase:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `JWT_SECRET` | (secret) |
| `INTERNAL_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/FNZJ8t)
