# Deploy FastAPIChat on Railway

A FastAPI App for benchmarking LLM models from various vendors.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_-qAbG)

## About

## Overview

**FastAPIChat** is a modern, high-performance application for benchmarking LLM models from different vendors. Built with FastAPI and Python 3.9+, it leverages the power of FastAPI's asynchronous capabilities and provides an extensive system for collecting user feedback.

## Highlights

* Multi-LLM Benchmarking: Easily compare and evaluate the performance of LLM models from various vendors with different system prompts and temperature settings.
* Feedback Collection: Implement a robust feedback system to rate LLM outputs, enabling data collection for future fine-tuning and improvements.
* Streaming Responses: Integrated with FastAPI for real-time, non-blocking streaming responses, enhancing the user experience with immediate feedback.

## Learn More
* [Github](https://github.com/yuting1214/FastAPIChat)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| FastAPIChat | `ghcr.io/yuting1214/fastapi-chat-ghcr:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `PASSWORD` | FastAPIChat | (secret) | - |
| `DATABASE_URL` | FastAPIChat | - | Private Postgres URL |
| `OPENROUTER_API_KEY` | FastAPIChat | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/_-qAbG)
