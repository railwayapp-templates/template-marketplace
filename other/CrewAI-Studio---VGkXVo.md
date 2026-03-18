# Deploy CrewAI Studio on Railway

A user-friendly GUI for managing and running CrewAI agents and tasks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/VGkXVo)

## About

# CrewAI Studio

Welcome to CrewAI Studio! This application provides a user-friendly interface written in Streamlit for interacting with CrewAI, suitable even for those who don't want to write any code. Follow the steps below to install and run the application using Docker/docker-compose or Conda/venv.

## Features

- **Multi-platform support**: Works on Windows, Linux and MacOS.
- **No coding required**: User-friendly interface for interacting with CrewAI.
- **Conda and virtual environment support**: Choose between Conda and a Python virtual environment for installation.
- **Results history**: You can view previous results.
- **Knowledge sources**: You can add knowledge sources for your crews
- **CrewAI tools** You can use crewai tools to interact with real world. ~~Crewai studio uses a forked version of crewai-tools with some bugfixes and enhancements (https://github.com/strnad/crewAI-tools)~~ (bugfixes already merged to crewai-tools)
- **Custom Tools** Custom tools for calling APIs, writing files, enhanced code interpreter, enhanced web scraper... More will be added soon
- **LLM providers supported**: Currently OpenAI, Groq, Anthropic, ollama, Grok and LM Studio backends are supported. OpenAI key is probably still needed for embeddings in many tools. Don't forget to load an embedding model when using LM Studio.
- **Single Page app export**: Feature to export crew as simple single page streamlit app.
- **Threaded crew run**: Crews can run in background and can be stopped.

## Screenshots

<img style="width:50%;" alt="crews definition" src="https://raw.githubusercontent.com/strnad/CrewAI-Studio/main/img/ss1.png"><img style="width:50%;" alt="kickoff" src="https://raw.githubusercontent.com/strnad/CrewAI-Studio/main/img/ss2.png">
<img style="width:50%;" alt="kickoff" src="https://raw.githubusercontent.com/strnad/CrewAI-Studio/main/img/ss3.png"><img style="width:50%;" alt="kickoff" src="https://raw.githubusercontent.com/strnad/CrewAI-Studio/main/img/ss4.png">
<img style="width:50%;" alt="kickoff" src="https://raw.githubusercontent.com/strnad/CrewAI-Studio/main/img/ss5.png"><img style="width:50%;" alt="kickoff" src="https://raw.githubusercontent.com/strnad/CrewAI-Studio/main/img/ss6.png">

## Video tutorial
Video tutorial on CrewAI Studio made by Josh Poco

[![FREE CrewAI Studio GUI EASY AI Agent Creation!🤖 Open Source AI Agent Orchestration Self Hosted](https://img.youtube.com/vi/3Uxdggt88pY/hqdefault.jpg)](https://www.youtube.com/watch?v=3Uxdggt88pY)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CrewAI-Studio | [strnad/CrewAI-Studio](https://github.com/strnad/CrewAI-Studio) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OPENAI_API_KEY` | CrewAI-Studio | (secret) | - |
| `AGENTOPS_ENABLED` | CrewAI-Studio | False | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, Shell, Batchfile, Dockerfile

[View on Railway →](https://railway.com/template/VGkXVo)
