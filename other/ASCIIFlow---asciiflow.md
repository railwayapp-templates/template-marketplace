# Deploy ASCIIFlow on Railway

Free web-based ASCII diagram and flowchart drawing tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/asciiflow)

## About

ASCIIFlow is an open-source, web-based drawing editor designed specifically for creating flowcharts, diagrams, and box layouts using ASCII text characters. It provides a simple grid interface that allows developers, researchers, and technical writers to construct retro-style, text-only diagrams that can easily be embedded directly into markdown files and code comments.
![ASCII Flow](https://github.com/lewish/asciiflow/raw/main/assets/asciiflow-scr-dark.png)

Hosting ASCIIFlow on Railway allows you to spin up a private or custom instance of this popular diagramming tool in seconds. The application compiles into a lightweight static frontend bundle. By utilizing Railway's automatic build detection (Railpack or a simple custom Dockerfile), the repository builds seamlessly and deploys onto Railway's edge network. There are no databases, background worker queues, or persistent volumes required, making the deployment highly performant, low-resource, and cost-effective. Once deployed, Railway provides an automatic public HTTPS domain for instant access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Asciiflow | `yaamai/lewish-asciiflow:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/asciiflow)
