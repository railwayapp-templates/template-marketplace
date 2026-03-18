# Deploy QueryWeaver on Railway

Translate natural language into SQL with a graph-powered tool.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/queryweaver)

## About

**QueryWeaver** is an open-source Text2SQL tool that translates natural language questions into SQL queries. It uses a graph to understand the database schema and conversation context, allowing non-technical users to interact with their data using plain English. QueryWeaver returns both the generated SQL and the query results.

***

Hosting QueryWeaver on Railway involves deploying the application's backend and connecting it to the necessary services. The setup typically includes running a FastAPI backend for the API and an instance of **FalkorDB** as the graph database. You'll need to configure environment variables for things like your database connection, AI service provider (like OpenAI or Azure OpenAI), and API keys. The process leverages Railway's services to handle the infrastructure, auto-deploying from your repository and scaling as needed. The platform simplifies the typically complex setup, allowing you to focus on your application's logic.

***

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| QueryWeaver | [FalkorDB/QueryWeaver](https://github.com/FalkorDB/QueryWeaver) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | OpenAI API Key |
| `GITHUB_CLIENT_ID` | - | Github Client ID for Auth0 |
| `GOOGLE_CLIENT_ID` | - | Google Client ID for Auth0 |
| `GITHUB_CLIENT_SECRET` | (secret) | Github Client Secret for Auth0 |
| `GOOGLE_CLIENT_SECRET` | (secret) | Google Client Secret for Auth0 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, TypeScript, CSS, Jinja, Shell, Makefile, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/queryweaver)
