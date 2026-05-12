# Deploy beevibe on Railway

Self-hosted agent runtime — pinned to release branch (latest stable tag)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/beevibe)

## About

A self-hosted runtime for autonomous AI agent teams. Beevibe lets you run a small organization of Claude Code agents that delegate to each other, negotiate, escalate to humans when stuck, and build up shared
  memory over time. Open source under Apache 2.0, designed for self-hosting.

  ## About Hosting beevibe                                                                                                                                                                                        
   
  This template deploys three services — api, scheduler, web — plus a managed Postgres instance with pgvector for memory. After deploy, you provide your own ANTHROPIC_API_KEY and OPENAI_API_KEY (for chat and   
  embeddings respectively). The web UI then walks you through installing the local beevibe-daemon binary on your own machine — that's where your agents' Claude CLI subprocesses actually run, so your code never
  leaves your filesystem. Database migrations apply automatically on every deploy. The template is pinned to the latest stable release branch; redeploy from Railway's dashboard to pick up new versions when you
  want.                                                                                                                                                                                                           
   
  ## Common Use Cases                                                                                                                                                                                             
                                                                                                                          
  - Build a team of specialized agents (researcher, coder, reviewer) that delegate work to each other autonomously
  - Run multi-agent negotiation and escalation flows for decisions you'd otherwise tackle one prompt at a time
  - Centralize agent memory and tool access across an organization while keeping each user's code execution local on their own machine
                                              
  ## Dependencies for beevibe Hosting     
                                                                                                                                                                                                                  
  - An Anthropic API key — used for every agent CLI call. Get one at [console.anthropic.com](https://console.anthropic.com).                                                                                      
  - An OpenAI API key — used for memory embeddings (the agent fact-archive uses pgvector + OpenAI's text-embedding model). Get one at [platform.openai.com](https://platform.openai.com).                         
  - The local `beevibe-daemon` binary on each user's machine — installed via Homebrew (`brew install beevibe-ai/tap/beevibe-daemon`), npm (`npx -y @beevibe/daemon@latest`), or direct download. The web UI's     
  welcome wizard walks you through this after sign-up.                                                                                                                                                            
  - The `claude` CLI installed locally where the daemon runs — see [Claude Code docs](https://docs.claude.com/en/docs/claude-code/overview).
                                                                                                                                                                                                                  
  ### Deployment Dependencies                                                                                                                                                                                     
                                                                                                                                                                                                                  
  - [beevibe GitHub repository](https://github.com/beevibe-ai/beevibe) — source code, release history, and self-host docs                                                                                         
  - [beevibe-daemon Homebrew tap](https://github.com/beevibe-ai/homebrew-tap) — `brew install beevibe-ai/tap/beevibe-daemon`
  - [@beevibe/daemon on npm](https://www.npmjs.com/package/@beevibe/daemon) — `npx -y @beevibe/daemon@latest`                                                                                                     
  - [Anthropic API console](https://console.anthropic.com) — for the API key                                                                                                                                      
  - [OpenAI API platform](https://platform.openai.com) — for the API key
  - [Claude Code CLI](https://docs.claude.com/en/docs/claude-code/overview) — runs locally, spawned by the daemon                                                                                                 
                                                                                                                                                                                                                  
  ### Implementation Details                                                                                                                                                                                      
                                                                                                                                                                                                                  
  The deployed services on Railway handle orchestration, web UI, the MCP tool surface for agents, and the shared memory database. The actual `claude` CLI subprocesses that do the work run on the user's local   
  machine via the `beevibe-daemon`, which connects back to Railway over WebSocket + HTTP. This split keeps your code, filesystem, and execution context entirely on your own hardware while Railway handles the
  multi-agent coordination and persistence.                                                                                                                                                                       
                                                                                                                                                                                                                  
  The template pins all services to the `release` branch — a movable pointer maintained by the [release workflow](https://github.com/beevibe-ai/beevibe/blob/main/.github/workflows/release.yml) that always
  points at the latest stable tag. New deploys get the freshest stable version; existing deploys stay frozen until you click Redeploy.                                                                            
                                                                                                                          
  ## Why Deploy beevibe on Railway?                                                                                                                                                                               
   
                                                                                                                                                            
  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale
  it.                                         
                                          
  By deploying beevibe on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [beevibe-ai/beevibe](https://github.com/beevibe-ai/beevibe) (branch: release) | Web service |
| api | [beevibe-ai/beevibe](https://github.com/beevibe-ai/beevibe) (branch: release) | Web service |
| scheduler | [beevibe-ai/beevibe](https://github.com/beevibe-ai/beevibe) (branch: release) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Postgres database name. Leave default (railway). |
| `DATABASE_URL` | Postgres | - | Connection string for Postgres — referenced by api and scheduler. Auto-resolved. |
| `POSTGRES_USER` | Postgres | (secret) | Postgres role. Leave default (postgres). |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres password — auto-generated by Railway. Don't change. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public-internet connection string for direct DB tooling (e.g. local psql). Optional. |
| `NEXT_PUBLIC_BV_API_URL` | web | - | URL of your api service — baked into the web bundle at build time. Auto-points at this project's api. |
| `DATABASE_URL` | api | - | Postgres connection string — auto-points at this project's Postgres service. |
| `OPENAI_API_KEY` | api | (secret) | Your OpenAI API key — required for memory embeddings. Get one at platform.openai.com. |
| `ANTHROPIC_API_KEY` | api | (secret) | Your Anthropic API key — required. Get one at console.anthropic.com. |
| `BEEVIBE_CORS_ORIGINS` | api | - | Comma-separated origins allowed to call the api. Auto-points at this project's web service. |
| `DATABASE_URL` | scheduler | - | Postgres connection string — auto-points at this project's Postgres service. |
| `OPENAI_API_KEY` | scheduler | (secret) | Your OpenAI API key — required for memory embeddings. Get one at platform.openai.com. |
| `ANTHROPIC_API_KEY` | scheduler | (secret) | Your Anthropic API key — required. Get one at console.anthropic.com. |
| `BEEVIBE_MCP_SERVER_URL` | scheduler | - | URL of your api's /mcp endpoint — auto-points at this project's api. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, HTML, JavaScript, Shell, PLpgSQL, CSS

[View on Railway →](https://railway.com/deploy/beevibe)
