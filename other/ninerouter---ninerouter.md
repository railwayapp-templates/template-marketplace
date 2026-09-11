# Deploy nine_router on Railway

Nine Router deploys 9Router to Railway with Docker.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ninerouter)

## About

nine_router is a lightweight AI API gateway designed to provide a centralized and OpenAI-compatible endpoint for connecting applications with AI model providers. It simplifies AI API access by allowing requests to be routed through a single service instead of configuring each application with separate provider endpoints.

Deploying nine_router on Railway provides a convenient way to run the gateway as a managed containerized service. Once deployed, you can configure your provider credentials, API routing, authentication, and other supported settings through environment variables. The service can then be accessed by your applications using the Railway-generated public domain or a custom domain.

Hosting nine_router on Railway allows you to deploy the gateway without manually setting up and maintaining a traditional VPS. Railway manages the underlying container infrastructure, networking, deployment process, and service lifecycle, allowing you to focus on configuring and using the gateway.

After deployment, configure the required environment variables and set the initial authentication password. You can then connect nine_router to the AI providers you use and expose its API endpoint to your applications.

nine_router can be used as a centralized layer between applications and AI providers. This makes it easier to manage API access, route requests, and maintain a consistent API interface across different applications.

Railway also allows the service to be scaled when additional CPU, memory, or traffic capacity is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nine_router | [rapdrzky/nine_router](https://github.com/rapdrzky/nine_router) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `INITIAL_PASSWORD` | (secret) | this is default password for first login |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/ninerouter)
