# Deploy Flask OpenAPI on Railway

OpenAPI-compatible with Swagger and redoc, using fastopenapi

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/SE518g)

## About

# Flask FastOpenAPI Application
A Flask web application enhanced with FastOpenAPI integration, providing automatic API documentation, type safety, and OpenAPI specification generation - all without the complexity of switching frameworks.

## Why FastOpenAPI with Flask?
- **Keep Flask's Simplicity**: Maintain Flask's familiar syntax and patterns
- **Type Safety**: Get runtime type checking and validation using Pydantic models
- **Auto Documentation**: Generate OpenAPI specs and interactive docs automatically
- **Better Developer Experience**: Get IDE autocompletion and type hints
- **Production Ready**: Built-in validation and error handling

## Features
- RESTful API with message management endpoints
- Interactive API documentation with Swagger UI and ReDoc
- FastOpenAPI integration for type-safe API development
- Ready for deployment on Railway

## API Documentation
The application provides two interactive API documentation interfaces:
- **Swagger UI**: Available at `/api/docs` - Interactive API documentation with request/response examples
- **ReDoc**: Available at `/api/redoc` - Beautiful, responsive API documentation with search functionality

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flask | [chinpeerapat/flask-fastopenapi-rw](https://github.com/chinpeerapat/flask-fastopenapi-rw) | Web service |

## Configuration

- **Start command:** `gunicorn main:app`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, HTML, CSS, Procfile

[View on Railway →](https://railway.com/template/SE518g)
