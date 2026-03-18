# Deploy FlowiseAI on Railway

Flowise AI with persisted volume, PostGIS & private networking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/A7Dwg9)

## About

FlowiseAI is a low-code/no-code platform for building customized LLM orchestration flows and AI agents. It provides a drag-and-drop interface to create conversational AI applications, chatbots, and complex AI workflows without extensive coding knowledge, making AI development accessible to both developers and non-technical users.

Hosting FlowiseAI involves deploying a Node.js application that requires a persistent database for storing chat flows, configurations, and conversation histories. The deployment needs proper environment configuration for database connections, authentication settings, and storage volumes for maintaining data persistence. This template simplifies the process by providing pre-configured settings, automatic database setup with PostGIS, and optimized internal networking to reduce costs while ensuring reliable performance and scalability.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgis | `postgis/postgis:latest` | Database |
| Flowise | [Somi-AI/flowiseai-railway](https://github.com/Somi-AI/flowiseai-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgis | flowise | - |
| `DATABASE_URL` | Postgis | - | URL to connect to Postgres database over public networking |
| `POSTGRES_USER` | Postgis | (secret) | - |
| `POSTGRES_PASSWORD` | Postgis | (secret) | - |
| `DATABASE_PRIVATE_URL` | Postgis | - | URL to connect to Postgres database over private network |
| `POSTGRES_INITDB_ARGS` | Postgis | -c ssl=on -c ssl_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem -c ssl_key_file=/etc/ssl/private/ssl-cert-snakeoil.key | Additional arguments to pass to postgresql initdb, enables SSL |
| `LOG_PATH` | Flowise | /opt/flowise/.flowise/logs | Location where log files are stored |
| `APIKEY_PATH` | Flowise | /opt/flowise/.flowise | Location where API keys are saved |
| `STORAGE_TYPE` | Flowise | local | Type of storage for uploaded files. default is local |
| `DATABASE_HOST` | Flowise | - | Private or Public Host URL - i.e. postgis.railway.internal |
| `DATABASE_NAME` | Flowise | - | Database name (When DATABASE_TYPE is not sqlite) |
| `DATABASE_PATH` | Flowise | /opt/flowise/.flowise | Location where database is saved (When DATABASE_TYPE is sqlite) |
| `DATABASE_PORT` | Flowise | - | Private or Public database port (When DATABASE_TYPE is not sqlite) - i.e. 5432 |
| `DATABASE_TYPE` | Flowise | postgres | Type of database to store the flowise data - i.e. sqlite, mysql, postgres |
| `DATABASE_USER` | Flowise | (secret) | Database username (When DATABASE_TYPE is not sqlite) - i.e. postgres |
| `SECRETKEY_PATH` | Flowise | (secret) | Location where encryption key (used to encrypt/decrypt credentials) is saved |
| `FLOWISE_PASSWORD` | Flowise | (secret) | Password to login |
| `FLOWISE_USERNAME` | Flowise | (secret) | Username to login |
| `BLOB_STORAGE_PATH` | Flowise | /opt/flowise/.flowise/storage | Location where uploaded files are saved when STORAGE_TYPE is local |
| `DATABASE_PASSWORD` | Flowise | (secret) | Database password (When DATABASE_TYPE is not sqlite) |
| `OVERRIDE_DATABASE` | Flowise | false | Database Synchronization on every application launch. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Flowise | true | A workaround for alpine private networking |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/flowise/.flowise`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/A7Dwg9)
