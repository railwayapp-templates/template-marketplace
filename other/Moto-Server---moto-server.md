# Deploy Moto Server on Railway

A local in-memory AWS instance for use with any AWS client.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moto-server)

## About

Moto Server is a lightweight in-memory AWS service emulator that provides AWS-compatible APIs for development, testing, and automation. It allows applications, AWS SDKs, CLI tools, and test suites to interact with mocked AWS services without connecting to real AWS infrastructure.

This template deploys Moto in standalone server mode on Railway using the official `motoserver/moto` container.

Moto Server exposes a single HTTP endpoint that can be used by AWS-compatible clients such as AWS CLI, boto3, AWS SDK for JavaScript, Java AWS SDK, Terraform, and other tools that support custom AWS endpoints.

Moto stores its mocked resources primarily in memory, making it well suited for disposable development environments, automated testing, CI workflows, and API integration testing.

No external PostgreSQL, MySQL, Redis, or persistent Railway Volume is required for the standard deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| moto | `motoserver/moto:5.2.3` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5000 | Railway HTTP target port |
| `MOTO_PORT` | 5000 | Moto Server listening port |

## Configuration

- **Start command:** `sh -c 'moto_server -H 0.0.0.0 -p ${PORT:-5000}'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/moto-server)
