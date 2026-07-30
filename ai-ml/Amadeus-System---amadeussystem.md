# Deploy Amadeus System on Railway

A Multimodal AI Application Inspired By Steins;Gate 0

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/amadeussystem)

## About

Amadeus System is a multimodal AI application inspired by Steins;Gate 0 that enables interactive dialogue with virtual AI personas. Designed for fans, developers, and AI enthusiasts, it integrates voice synthesis, text generation, and dynamic chat capabilities into a responsive web interface. The system allows users to experience real-time, character-driven conversational AI seamlessly.

Deploying Amadeus System on Railway provides a streamlined, reliable infrastructure for hosting this multimodal AI platform. Railway automates container deployment using pre-built Docker images, eliminating manual server setup and complex configuration steps. The platform handles incoming web traffic via an integrated HTTP proxy and automatically provisions managed SSL/TLS certificates for custom and generated domains.

Because Amadeus System operates as a stateless web interface connecting to an external WebRTC media service, it requires no persistent database, caching server, or mounted volume storage. Railway monitors service health continuously and maintains high availability, allowing you to scale container resources effortlessly as usage grows without managing underlying cloud infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Amadeus System | `ghcr.io/ai-poet/amadeus-system-new-alpha` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3002 |
| `VITE_APP_DEFAULT_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/amadeussystem)
