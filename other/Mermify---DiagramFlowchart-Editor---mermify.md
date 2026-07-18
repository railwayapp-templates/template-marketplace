# Deploy Mermify - Diagram,Flowchart Editor on Railway

Hybrid editor for Mermaid.js flowcharts and sequence diagrams

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mermify)

## About

Mermify is a free, open-source visual editor for Mermaid.js flowcharts and sequence diagrams. It combines a Monaco code editor with an interactive drag-and-drop canvas, enabling real-time, bi-directional synchronization between Mermaid source code and visual diagrams while supporting high-quality exports and modern editing tools.

Hosting Mermify on Railway provides a simple way to deploy the Vite-powered web application without managing infrastructure. Railway automatically builds the project from the repository and serves it over HTTPS with a public domain or your own custom domain. Since Mermify is a browser-based application that performs diagram editing entirely on the client side, it does not require a database or persistent server storage. Railway handles deployments, networking, and scaling, allowing you to publish updates with minimal operational overhead while providing users with a fast, responsive diagram editor accessible from anywhere.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mermify | [kaviarahul123/mermify](https://github.com/kaviarahul123/mermify) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NODE_ENV` | production |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/mermify)
