# Deploy MaxKB on Railway

Open-source platform for building enterprise-grade agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/maxkb)

## About

MaxKB is an open-source platform designed for building enterprise-grade agents powered by Retrieval-Augmented Generation (RAG) pipelines, robust workflows, and advanced tool-use capabilities. It supports multimodal processing (text, images, audio, video) and can seamlessly integrate into business systems, making it suitable for intelligent automation and augmented knowledge management scenarios.

Hosting MaxKB involves setting up the platform to handle AI-driven processes including smart question-answering, internal documentation, and integration with third-party systems. The platform is model-agnostic, supporting both private and public large language models, and offers rapid deployment through containerization. Hosting typically requires configuring the database, backend services, and connecting with preferred AI models to ensure scalable, reliable operation. Railway simplifies this by abstracting much of the infrastructure configuration, allowing quick vertical and horizontal scaling in cloud environments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 1panel/maxkb | `1panel/maxkb` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/maxkb`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/maxkb)
