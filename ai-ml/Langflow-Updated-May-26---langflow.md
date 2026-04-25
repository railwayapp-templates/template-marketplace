# Deploy Langflow [Updated May '26] on Railway

Langflow [May '26] (LLM Workflow Builder, Flowise alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langflow)

## About

Langflow is a powerful, open-source visual programming tool for building AI workflows. It allows you to design, test, and deploy large language model (LLM) applications without complex coding. Whether you are experimenting with AI agents, automating tasks, or prototyping new applications, Langflow gives you a drag‑and‑drop canvas to connect components together, making AI development faster and easier.
In this guide, we’ll cover everything you need to know about **Langflow self host** deployments, including Langflow features, pricing, alternatives, and how to run it on Railway with a single click.

When you **self host Langflow**, you get full control over your workflows, data, and environment. Hosting Langflow on Railway eliminates the pain of manual server setup. Railway automatically provisions secure containers, manages scaling, and lets you deploy Langflow instantly.
By running Langflow on Railway, you can:
* Build AI workflows visually without coding.
* Connect external APIs, vector databases, or custom Python logic.
* Test your apps in real time on a managed platform.
Unlike traditional hosting where you configure every server detail, Railway streamlines the process so you can focus on building your Langflow projects instead of maintaining infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langflow | `logspace/langflow:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | langflow | 7860 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langflow)
