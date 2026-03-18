# Deploy boss-claude on Railway

AI orchestration framework for Claude Code CLI with Redis-backed memory 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/boss-claude)

## About

Boss-claude is an AI orchestration framework for Claude Code CLI that acts as a "conductor" directing specialized agents. It delegates tasks like code exploration, implementation, and testing to  worker agents while tracking efficiency metrics, XP rewards, and delegation ratios. The framework enforces a strict separation where the conductor orchestrates but never directly executes work.     
                                                                                                                                                                                                        
  ## About Hosting boss-claude                                                                                                                                                                          
                                                                                                                                                                                                        
  Hosting boss-claude requires a Node.js runtime environment with Redis for persistent memory storage and session tracking. The deployment involves configuring environment variables for Redis         
  connection strings, setting up the CLI tooling, and ensuring proper network access for agent communication. Railway simplifies this by providing managed Redis instances alongside your application   
  container, automatic environment variable injection, and persistent storage for session data.                                                                                                         
                                                                                                                                                                                                        
  ## Common Use Cases                                                                                                                                                                                   
                                                                                                                                                                                                        
  - Orchestrating complex multi-file refactoring tasks across large codebases with parallel agent delegation                                                                                            
  - Managing automated testing and deployment pipelines where multiple specialized agents handle different concerns                                                                                     
  - Running continuous development sessions with persistent memory that recalls previous work context                                                                                                   
  - Coordinating AI-assisted code reviews where exploration agents analyze and implementation agents fix issues                                                                                         
                                                                                                                                                                                                        
  ## Dependencies for boss-claude Hosting                                                                                                                                                               
                                                                                                                                                                                                        
  - Node.js 18+ runtime environment                                                                                                                                                                     
  - Redis instance for memory persistence and session state management                                                                                                                                  
  - Claude Code CLI with valid API credentials                                                                                                                                                          
                                                                                                                                                                                                        
  ### Deployment Dependencies                                                                                                                                                                           
                                                                                                                                                                                                        
  - [Redis Documentation](https://redis.io/docs/)                                                                                                                                                       
  - [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code)                                                                                                                                   
  - [Railway Redis Template](https://railway.app/template/redis)                                                                                                                                        
                                                                                                                                                                                                        
  ### Implementation Details                                                                                                                                                                            
                                                                                                                                                                                                        
  ```bash                                                                                                                                                                                               
  # Redis Configuration                                                                                                                                                                                 
  REDIS_URL=redis://default:password@host:port                                                                                                                                                          
                                                                                                                                                                                                        
  ## Why Deploy boss-claude on Railway?                                                                                                                                                                    
                                                                                                                                                                                                        
  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and          
  horizontally scale it.                                                                                                                                                                                
                                                                                                                                                                                                        
  By deploying boss-claude on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis-boss-claude | `redis:8.2.1` | Database |
| Postgres-boss-claude | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis-boss-claude | 6379 |
| `REDISUSER` | Redis-boss-claude | default |
| `REDISPASSWORD` | Redis-boss-claude | (secret) |
| `REDIS_PASSWORD` | Redis-boss-claude | (secret) |
| `POSTGRES_DB` | Postgres-boss-claude | boss_claude |
| `POSTGRES_USER` | Postgres-boss-claude | (secret) |
| `POSTGRES_PASSWORD` | Postgres-boss-claude | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/boss-claude)
