# Deploy localpdf.io on Railway

Privacy-first PDF tools, fully local and secure

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/localpdfio)

## About

LocalPDF is a privacy-first PDF toolkit that runs entirely on your own infrastructure. It allows you to merge, split, compress, convert, and process PDFs without uploading files to external services, ensuring full data control and security.

Hosting LocalPDF on Railway gives you a fully self-contained PDF processing service with minimal setup. The application runs locally within your Railway environment, meaning all document operations happen server-side under your control. This is ideal for internal tools, secure workflows, or SaaS products that need PDF features without exposing user data to third-party platforms. Railway handles deployment, networking, and scaling, so you can focus on integrating PDF functionality into your applications while maintaining strict privacy guarantees.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| localpdf.io | [nsx07/localpdf.io](https://github.com/nsx07/localpdf.io) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/.`

**Category:** Other · **Languages:** Python, Shell

[View on Railway →](https://railway.com/template/localpdfio)
