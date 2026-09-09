# Deploy Litellm-Novita-ai on Railway

Litellm setup connected to novita.ai to execute open source models

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-novita-ai)

## About

Litellm-Novita-ai is a self-hosted, OpenAI-compatible AI gateway that routes requests exclusively to open-source models hosted by Novita AI. It combines LiteLLM with Redis caching and PostgreSQL persistence to provide centralized credentials, virtual 
 API keys, usage tracking, budgets, rate limits, and lower-cost model access through one endpoint.

Hosting Litellm-Novita-ai on Railway deploys a complete three-service stack. LiteLLM provides the public API gateway and administration interface, Redis caches repeated model responses, and PostgreSQL stores virtual keys, users, budgets,              
 configuration, and usage logs. 
Get a Novita AI API key: https://novita.ai/?ref=mzblm2z&utm_source=affiliate

 ## Common Use Cases                                                                                                                                                                                                                                        
   - Provide one OpenAI-compatible endpoint for multiple Novita-hosted models.                                                                                                                                                                                
   - Reduce latency and API costs by caching repeated requests in Redis.                                                                                                                                                                                      
   - Create virtual API keys for separate applications, users, or teams.                                                                                                                                                                                      
   - Apply budgets, expiration dates, and rate limits to API keys.                                                                                                                                                                                            
   - Track model usage and spending in PostgreSQL.                                                                                                                                                                                                            
   - Connect OpenAI-compatible applications to Novita AI models.                                                                                                                                                                                              
   - Keep provider credentials hidden from client applications.                                                                                                                                                                                               
   ## Dependencies for Litellm-Novita-ai Hosting                                                                                                                                                                                                              
   - A Novita AI account and API key.                                                                                                                                                                                                                         
   - LiteLLM Proxy for the OpenAI-compatible gateway.                                                                                                                                                                                                         
   - Redis for response caching.                                                                                                                                                                                                                              
   - PostgreSQL for persistent keys, budgets, and usage logs.                                                                                                                                                                                                 

   ## Deployment Instructions                                                                                                                                                                                                                                 

   1. Deploy the Railway template.                                                                                                                                                                                                                            
   2. Enter your `NOVITA_API_KEY` when prompted.                                                                                                                                                                                                              
   3. Confirm that the project contains:                                                                                                                                                                                                                      
      - LiteLLM Gateway                                                                                                                                                                                                                                       
      - Redis                                                                                                                                                                                                                                                 
      - PostgreSQL                                                                                                                                                                                                                                            
   4. Confirm that the Gateway has these variables:                                                                                                                                                                                                           
      - `REDIS_URL=${{Redis.REDIS_URL}}`                                                                                                                                                                                                                      
      - `DATABASE_URL=${{Postgres.DATABASE_URL}}`                                                                                                                                                                                                                                                                                                                                                                                                      
   5. Open the admin interface at `https://YOUR-GATEWAY.up.railway.app/ui`.                                                                                                                                                                                   


   ## Getting Started

   Configure your application with:

   - `OPENAI_BASE_URL=https://YOUR-GATEWAY.up.railway.app/v1`
   - `OPENAI_API_KEY=YOUR_LITELLM_KEY`

   ## Configuration

   - `NOVITA_API_KEY` — Novita AI provider credential.
   - `LITELLM_MASTER_KEY` — gateway administrator credential.
   - `LITELLM_SALT_KEY` — encryption key for stored credentials.

   ## Security
Only the LiteLLM Gateway should receive a public domain. Redis and PostgreSQL should remain on Railway's private network.

Applications should use LiteLLM virtual keys rather than the master key. Virtual keys can have independent budgets, rate limits, expiration dates, model restrictions, and revocation controls.
 ## Why Deploy Litellm-Novita-ai on Railway?
Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.
By deploying Litellm-Novita-ai on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| litellm-novita-gateway | [iamdgarcia/litellm-novita-gateway](https://github.com/iamdgarcia/litellm-novita-gateway) | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created when PostgreSQL starts. Keep this value aligned with PGDATABASE. |
| `DATABASE_URL` | Postgres | - | Complete private PostgreSQL connection URL used by LiteLLM. Automatically assembled by the PostgreSQL service. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL user created when the database starts. Keep this value aligned with PGUSER. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password assigned to POSTGRES_USER. Automatically generated by the template; do not reuse or disclose it.   |
| `REDIS_URL` | litellm-novita-gateway | - | Private Redis connection URL used for LiteLLM response caching. Automatically provided by the Redis service. |
| `DATABASE_URL` | litellm-novita-gateway | - | Private PostgreSQL connection URL used for virtual keys, budgets, configuration, and usage logs. Automatically provided by PostgreSQL. |
| `NOVITA_API_KEY` | litellm-novita-gateway | (secret) | Your Novita AI API key used for all model requests. Get a key at https://novita.ai/?ref=mzblm2z&utm_source=affiliate |
| `LITELLM_SALT_KEY` | litellm-novita-gateway | - | Automatically generated encryption key for stored credentials. Never change it after deployment or encrypted data may become unreadable. |
| `STORE_MODEL_IN_DB` | litellm-novita-gateway | False | Keeps model definitions in the checked-in configuration so the gateway remains restricted to approved Novita AI models. |
| `LITELLM_MASTER_KEY` | litellm-novita-gateway | admin1234 | Automatically generated administrator key for the LiteLLM UI and management API. Keep it secret and use virtual keys for applications. |
| `REDISHOST` | Redis | - | Private hostname of the Redis service. Automatically generated by Railway; no user input is required. |
| `REDISPORT` | Redis | 6379 | Internal Redis connection port. Automatically configured by the Redis service.   |
| `REDISUSER` | Redis | default | Redis username used by clients connecting through Railway's private network. |
| `REDIS_URL` | Redis | - | Complete private Redis connection URL consumed by LiteLLM. Automatically assembled by the Redis service. |
| `REDISPASSWORD` | Redis | (secret) | Redis password exposed for clients using separate connection fields. Automatically generated by the template. |
| `REDIS_PASSWORD` | Redis | (secret) | Password required by the Redis server. Automatically generated; do not reuse or disclose it.      |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/litellm-novita-ai)
