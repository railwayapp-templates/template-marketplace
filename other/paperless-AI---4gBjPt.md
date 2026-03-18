# Deploy paperless-AI on Railway

automatically analyze and tag your documents from paperless-ngx

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/4gBjPt)

## About

# Paperless-AI

**An automated document analyzer for Paperless-ngx** using OpenAI API, Ollama, and all OpenAI API-compatible services to analyze and tag your documents automatically.

## Key Features

### **Automated Document Management**
- **Automatic Scanning:** Detects and processes new documents within Paperless-ngx.  
- **AI-Powered Analysis:** Uses OpenAI API and Ollama (Mistral, Llama, Phi 3, Gemma 2) for accurate document insights.  
- **Metadata Assignment:** Automatically assigns titles, tags, and correspondent details.

### **Advanced Customization Options**
- **Predefined Processing Rules:** Specify documents to process based on tags. 🆕  
- **Selective Tag Assignment:** Use selected tags for processing, bypassing prompts. 🆕  
- **Custom Tagging:** Add specific tags to AI-processed documents for easy identification. 🆕  

### **Manual Mode**  
- **AI-Assisted Analysis:** Manually analyze documents using AI through the `/manual` endpoint. 🆕  

### **Interactive Chat Functionality**  
- **Document Querying:** Ask questions about documents and get AI-generated answers. 🆕  

### **Intuitive Web Interface**  
- **Streamlined Setup:** Configure easily at the `/setup` endpoint.  
- **Dashboard Overview:** Monitor and manage document processing with a clean dashboard.

### **Reliability and Security**
- **Error Handling:** Automatic restarts and health monitoring for stability.  
- **Health Checks:** Ensures system integrity and raises alerts for issues.  
- **Docker Integration:** Full support for Docker, including health checks and persistent storage.

---

## **New Feature:** Chrome Extension  
Work directly from Paperless-ngx with the **Document Chat** feature!  
[Download the Chrome Extension here](https://github.com/clusterzx/paperless-ai/blob/main/paperless-ai-chrome-extension.zip).

---

---  
Simplify your document workflows with Paperless-AI!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Paperless | `ghcr.io/paperless-ngx/paperless-ngx` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| paperless-ai | `clusterzx/paperless-ai` | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Paperless | 8000 |
| `PAPERLESS_DATA_DIR` | Paperless | /data |
| `PAPERLESS_ADMIN_USER` | Paperless | (secret) |
| `PAPERLESS_EXPORT_DIR` | Paperless | /data/export |
| `PAPERLESS_MEDIA_ROOT` | Paperless | /data/media |
| `PAPERLESS_SECRET_KEY` | Paperless | (secret) |
| `PAPERLESS_ADMIN_PASSWORD` | Paperless | (secret) |
| `PAPERLESS_CONSUMPTION_DIR` | Paperless | /data/consume |
| `PAPERLESS_ENABLE_HTTP_REMOTE_USER_API` | Paperless | TRUE |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `PGPORT_PRIVATE` | Postgres | 5432 |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/data`
- **Volume:** `/bitnami`

**Category:** Other

[View on Railway →](https://railway.com/deploy/4gBjPt)
