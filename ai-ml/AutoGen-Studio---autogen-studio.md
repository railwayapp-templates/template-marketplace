# Deploy AutoGen Studio on Railway

Build Multi-Agent Apps and rapidly prototype AI agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/autogen-studio)

## About

AutoGen Studio is a low-code interface for rapidly prototyping and managing AI agents built on the Microsoft AutoGen framework. It allows users to define agents, compose skills, and create multi-agent workflows through a visual UI, enabling complex task automation and orchestration without extensive coding.

![](https://media.githubusercontent.com/media/microsoft/autogen/refs/heads/main/python/packages/autogen-studio/docs/ags_screen.png)

This template turns hosting AutoGen Studio into a seamless, one-click experience. It handles the complete Python environment setup and automatically configures a persistent Volume, ensuring your agent workflows, skills, and database are saved and never lost during restarts.

Crucially, this deployment solves the lack of built-in security by automatically adding an authentication layer. The template pre-configures a lightweight Nginx proxy that password-protects your interface immediately upon launch, securing your agents and API usage from public access without any manual configuration required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AutoGen Studio | [decoge/autogen-studio-railway](https://github.com/decoge/autogen-studio-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AUTH_PASS` | - | Choose a password to login with |
| `AUTH_USER` | (secret) | Choose a username to login with |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/autogen-studio)
