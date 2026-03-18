# Deploy LogCar on Railway

Database using Railway logs as storage-medium

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/logcar)

## About

LogCar is a Railway-native database that uses Railway's logs as a storage medium, providing efficient event logging and retrieval with built-in file upload support and optional encryption for seamless data management.

Hosting LogCar on Railway involves deploying a Node.js/TypeScript server that acts as a REST API interface to Railway's logging system. The deployment process requires configuring environment variables for authentication, Railway API access, and optional encryption settings. LogCar automatically handles log chunking, data compression, and encryption while providing a familiar CRUD API interface. The service integrates directly with Railway's infrastructure, making it ideal for Railway-hosted applications that need persistent data storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LogCar | [FraglyG/logcar](https://github.com/FraglyG/logcar) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `AUTH_TOKEN` | (secret) | Your database's authentication token |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** TypeScript

[View on Railway →](https://railway.com/template/logcar)
