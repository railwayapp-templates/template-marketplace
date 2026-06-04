# Deploy spring-data-solr on Railway

Spring Data Solr Bookstore sample application

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spring-data-solr)

## About

Spring Data Solr is a modern Spring Boot starter for Apache Solr 10, resurrecting the archived `spring-data-solr` project. It provides auto-configuration, a repository abstraction, template API, and support for highlighting, faceting, and cursor-based deep paging.

This template deploys the spring-data-solr bookstore sample — a fully working REST API backed by Apache Solr 10. It provisions two services: a Solr 10 instance with a pre-configured `books` collection schema, and a Spring Boot application that loads 1,000 curated books on startup. The app exposes search, faceting, highlighting, and cursor-based pagination endpoints, along with Swagger UI at `/docs` and a Spring Boot Actuator health check at `/actuator/health`. No manual Solr configuration is required — the services are wired together automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| solr | `ghcr.io/tomaytotomato/spring-data-solr-solr10:latest` | Database |
| spring-data-solr-sample-book | `ghcr.io/tomaytotomato/spring-data-solr-bookstore:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | solr | 8983 |
| `PORT` | spring-data-solr-sample-book | 8080 |
| `SOLR_PORT` | spring-data-solr-sample-book | 8983 |

## Configuration

- **Volume:** `/var/solr`
- **Healthcheck:** `/actuator/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters

[View on Railway →](https://railway.com/deploy/spring-data-solr)
