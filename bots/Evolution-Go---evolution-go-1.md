# Deploy Evolution Go on Railway

Deploy and Host Evolution Go on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-go-1)

## About

Evolution Go is a high-performance WhatsApp API built in Go. It provides a complete REST API for sending and receiving WhatsApp messages, managing multiple instances, and integrating WhatsApp into any application  
  through webhooks.
                                                                                                                                                                                                                        
  ## About Hosting Evolution Go                                                                                                                                                                                         
   
  Hosting Evolution Go requires a PostgreSQL database for storing authentication data, user sessions, and optionally message history. The service exposes a REST API for managing WhatsApp instances, including creating
   connections, generating QR codes, and sending messages in multiple formats such as text, buttons, polls, lists, and media. Incoming messages are delivered via configurable webhooks. A single Evolution Go
  deployment can manage multiple WhatsApp instances simultaneously, making it suitable for multi-tenant applications and scalable messaging workflows.                                                                  
                  
  ## Common Use Cases

  - Integrating WhatsApp messaging into business applications and CRMs
  - Building chatbots and automated customer support workflows
  - Sending notifications, alerts, and transactional messages via WhatsApp

  ## Dependencies for Evolution Go Hosting

  - PostgreSQL database for authentication and message storage                                                                                                                                                          
  - A WhatsApp account to connect via QR code
                                                                                                                                                                                                                        
  ### Deployment Dependencies
                                                                                                                                                                                                                        
  - [Evolution Go GitHub Repository](https://github.com/EvolutionAPI/evolution-go)
  - [Evolution API Documentation](https://doc.evolution-api.com)
  - [Docker Hub Image](https://hub.docker.com/r/evoapicloud/evolution-go)
                                                                                                                                                                                                                        
  ## Why Deploy Evolution Go on Railway?
                                                                                                                                                                                                                        
  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.   
   
  By deploying Evolution Go on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| evoapicloud/evolution-go | `evoapicloud/evolution-go` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | evoapicloud/evolution-go | 8080 | - |
| `LOGTYPE` | evoapicloud/evolution-go | console | - |
| `WA_DEBUG` | evoapicloud/evolution-go | INFO | - |
| `CLIENT_NAME` | evoapicloud/evolution-go | pipely | - |
| `SERVER_PORT` | evoapicloud/evolution-go | 8080 | - |
| `GLOBAL_API_KEY` | evoapicloud/evolution-go | (secret) | - |
| `DATABASE_SAVE_MESSAGES` | evoapicloud/evolution-go | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/evolution-go-1)
