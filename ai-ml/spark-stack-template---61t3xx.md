# Deploy spark-stack-template on Railway

Spark Stack is an tool for building web apps with prompts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/61t3xx)

## About

# Spark Stack

Spark Stack is an tool for building web applications through an AI-powered chat interface. Create quick MVPs and prototypes using natural language prompts. [[Blog Post]](https://blog.sshh.io/p/building-v0-in-a-weekend)

<img src="https://github.com/user-attachments/assets/4c1912c9-85c9-4169-9d6c-bb5f96edd23e" alt="chrome_vMZlrhHm0u" width="800">

## Features

- 🤖 AI-powered code generation
- ⚡️ Real-time development environment
- 🎨 Multiple arbitrary starter templates (see `/images`)
- 👥 Team collaboration and management
- 📝 Git version control
- 🔄 Live preview
- 🧠 Chain-of-Thought reasoning for complex asks
- 🔌 Support for OpenAI and Anthropic models
- 📱 Multi-page app generation
- 📸 Sketch and screenshot uploads
- 🚀 Deployment to GitHub (+ Netlify, Vercel, etc)
- 🌙 Dark mode support
- 🔗 Share chats and projects publicly

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| spark-stack | [sshh12/spark-stack](https://github.com/sshh12/spark-stack) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MODAL_TOKEN_ID` | spark-stack | (secret) | - |
| `OPENAI_API_KEY` | spark-stack | (secret) | - |
| `ANTHROPIC_API_KEY` | spark-stack | (secret) | - |
| `AWS_ACCESS_KEY_ID` | spark-stack | TODO | - |
| `MODAL_TOKEN_SECRET` | spark-stack | (secret) | - |
| `AWS_SECRET_ACCESS_KEY` | spark-stack | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** JavaScript, Python, CSS, Dockerfile, Mako

[View on Railway →](https://railway.com/template/61t3xx)
