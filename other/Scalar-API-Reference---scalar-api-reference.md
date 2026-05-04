# Deploy Scalar API Reference on Railway

Modern API documentation for OpenAPI/Swagger

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/scalar-api-reference)

## About

Scalar API Reference renders OpenAPI/Swagger documents into modern, interactive API documentation. 

Includes a built-in API testing client, code samples across multiple languages and frameworks, customizable theming, and 1st-class OpenAPI support. 
Free alternative to Swagger UI and Redoc.

[Demo](https://docs.scalar.com/swagger-editor)

Hosting Scalar API Reference means serving a lightweight web app that loads your OpenAPI/Swagger document and renders interactive docs. 

Deployment serves static HTML + JavaScript bundle, pointed at your OpenAPI spec via URL or inline content. 

Configuration is done through a Railway variable and covers theming, routing, authentication persistence, proxy settings for CORS, and telemetry.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Scalar API Reference | `scalarapi/api-reference:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `API_REFERENCE_CONFIG` | {"sources":[{"url": "https://registry.scalar.com/@scalar/apis/galaxy?format=json"}],"theme": "purple"} | Refer to https://scalar.com/products/api-references/configuration for configuration |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/scalar-api-reference)
