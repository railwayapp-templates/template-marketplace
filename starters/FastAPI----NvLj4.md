# Deploy FastAPI on Railway

Web framework for developing RESTful APIs in Python

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-NvLj4)

## About

FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.

Hosting FastAPI means running a Python web application that leverages ASGI servers to handle asynchronous HTTP requests and API endpoints with automatic OpenAPI documentation generation. The framework requires ASGI server configuration like Uvicorn or Hypercorn, dependency management through requirements.txt, and type hint validation for request/response handling. Production deployment involves managing Python environments, configuring ASGI workers for concurrent processing, and handling automatic API documentation serving. Railway simplifies FastAPI deployment by detecting Python applications, managing ASGI server configuration, handling dependency installation, and providing environment variable management for different deployment stages.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FastAPI | [railwayapp-templates/fastapi](https://github.com/railwayapp-templates/fastapi) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Tags:** python, server · **Languages:** Python

[View on Railway →](https://railway.com/deploy/-NvLj4)
