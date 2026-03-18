# Deploy Translate Manager on Railway

i18n painel translate manager usin Ai

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ji6AXE)

## About

O Translation Manager é uma aplicação web desenvolvida com Next.js que permite gerenciar facilmente as traduções para internacionalização (i18n) de websites e aplicações. O sistema utiliza MongoDB para armazenar as traduções e integra-se com a API da Groq para tradução automática.

Principais Características
✅ Interface intuitiva para gerenciar chaves e valores de tradução
🔒 Sistema de autenticação para proteger o acesso
🤖 Tradução automática de português para outros idiomas usando IA
📤 Exportação de traduções em formato JSON
📥 Importação de traduções de várias fontes
🔍 Busca e filtragem de traduções
🌐 Suporte para múltiplos idiomas (PT, EN, ES)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TranslateManager | [Geordani-Machado/TranslateManager](https://github.com/Geordani-Machado/TranslateManager) | Worker |
| MongoDB | `mongo:7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGODB_DB` | TranslateManager | test | database name |
| `MONGODB_URI` | TranslateManager | - | database url |
| `GROQ_API_KEY` | TranslateManager | (secret) | you_groq_key |
| `RABBITMQ_URL` | TranslateManager | - | Rabbitmq url |
| `ADMIN_PASSWORD` | TranslateManager | (secret) | Admin Password |
| `ADMIN_USERNAME` | TranslateManager | (secret) | Admin Username |
| `ALLOWED_ORIGINS` | TranslateManager | - | http://localhost:3333 |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Automation · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/ji6AXE)
