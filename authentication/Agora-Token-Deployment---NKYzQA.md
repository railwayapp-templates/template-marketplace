# Deploy Agora Token Deployment on Railway

Token generator for Agora RTM, Video SDK, and Chat.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/NKYzQA)

## About

The Agora Token Service is a convenient utility for generating tokens required for various functionalities of the application, including Agora Real-Time Messaging (RTM), Video SDK, and Chat services. This service simplifies the token generation process and provides an easy-to-use API.

Hosting an Agora Token Service means running a web API that generates authentication tokens for Agora's real-time communication services. The service handles token generation requests and returns secure tokens with configurable expiration times for RTC, RTM, and Chat features. Production deployment requires managing sensitive Agora API credentials, implementing request validation, and ensuring secure token distribution across environments. Railway handles the deployment complexity by managing environment variables for Agora credentials, providing secure API hosting, and automating the service routing with built-in parameter validation and standardized response formatting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agora-token-service | [AgoraIO-Community/agora-token-service](https://github.com/AgoraIO-Community/agora-token-service) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_ID` | - | Login to the Agora.io Developer Dashboard (http://dashboard.agora.io), and navigate to the \"Projects\" tab to get this value. |
| `APP_CERTIFICATE` | - | Login to the Agora.io Developer Dashboard (http://dashboard.agora.io), and navigate to the \"Projects\" tab to get this value |
| `CORS_ALLOW_ORIGIN` | * | The allowed origin for Cross-Origin Resource Sharing (CORS). This determines which origins are permitted to access the resources of your application. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/template/NKYzQA)
