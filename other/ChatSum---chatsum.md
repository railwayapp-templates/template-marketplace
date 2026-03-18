# Deploy ChatSum on Railway

Servidor FastAPI para extensão ChatSum usando Google Gemini

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatsum)

## About

**PT-BR:**
Implante e hospede o ChatSum no Railway com apenas alguns cliques. Este template cria automaticamente toda a infraestrutura necessária para executar o backend FastAPI do ChatSum.

**EN:**
Deploy and host ChatSum on Railway in just a few clicks. This template automatically provisions all required infrastructure to run the ChatSum FastAPI backend.

---

**PT-BR:**
O ChatSum é um backend baseado em FastAPI desenvolvido para funcionar em conjunto com a extensão de navegador ChatSum. Ele recebe conversas de chat, processa o conteúdo utilizando o Google Gemini e retorna resumos claros e estruturados, ideais para fluxos de atendimento ao cliente.

Para hospedar o ChatSum, é necessário apenas:

* Um serviço FastAPI
* Uma chave de API do Google Gemini

O Railway cuida automaticamente de variáveis de ambiente, rede, deploy e escalabilidade. Após o deploy, basta configurar a chave da API e informar a URL do servidor na extensão ChatSum.

**EN:**
ChatSum is a FastAPI-based backend designed to work with the ChatSum browser extension. It receives chat conversations, processes them using Google Gemini, and returns clear, structured summaries optimized for customer support workflows.

Hosting ChatSum requires only:

* A FastAPI service
* A Google Gemini API key

Railway automatically handles environment variables, networking, deployment, and scaling. After deployment, users simply configure their API key and connect the service URL to the ChatSum browser extension.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chatsum-extension | [tairony-cristian/chatsum-extension](https://github.com/tairony-cristian/chatsum-extension) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GEMINI_API_KEY` | (secret) |  Entre no link para obter sua chave API (https://aistudio.google.com/app/api-keys) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Python, HTML, CSS, Shell, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/chatsum)
