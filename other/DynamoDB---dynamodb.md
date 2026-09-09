# Deploy DynamoDB on Railway

A self-hosted DynamoDB for application development and testing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dynamodb)

## About

DynamoDB Local is a self-hosted Amazon DynamoDB environment for application development and testing. It provides a DynamoDB-compatible API that can be used with AWS SDKs, AWS CLI, automated tests, and local development workflows without connecting to the managed DynamoDB service.

This deployment runs the official DynamoDB Local container on Railway.

DynamoDB Local exposes an HTTP API compatible with common DynamoDB development workflows and can persist local database files on a Railway Volume.

The deployment uses shared database mode so clients can work against a single local DynamoDB database regardless of the AWS access key or region used by the client.

No PostgreSQL, Redis, MySQL, MongoDB, or external database is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dynamodb | `amazon/dynamodb-local:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Railway HTTP target port |

## Configuration

- **Start command:** `sh -c 'java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -dbPath ./data -port ${PORT:-8000} -disableTelemetry'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/dynamodblocal/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/dynamodb)
