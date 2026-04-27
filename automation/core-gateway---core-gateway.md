# Deploy core-gateway on Railway

Deploy and host core-gateway 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/core-gateway)

## About

The CoreBrain Gateway is a single-container runtime that gives your CORE workspace a remote machine to *do work* on — clone repos, run shell commands, drive a browser, and run coding
   agents (Claude Code + Codex) — all from the CORE webapp. One container, one Railway volume, one URL. No local install needed.
                                                                                                                                                                                        
  ## About Hosting CoreBrain Gateway                                                                                                                                                    
   
  Deploying a gateway means standing up a long-lived container that connects back to your CORE webapp and registers itself as an executor. The webapp dispatches tasks (file ops, shell 
  commands, browser automation, agent runs) over HTTPS to your gateway; the gateway runs them and streams results back. The image ships with Claude Code, Codex CLI, Playwright, and
  Brave pre-installed, so the only setup is wiring credentials.                                                                                                                         
                  
  The gateway image has a built-in Railway mode (`COREBRAIN_DEPLOY_MODE=railway`) that maps both the workspace (`/app`) and gateway state (`/home/corebrain`) into a single mounted     
  volume — one volume covers cloned repos, agent login state, and Playwright/Brave cache.
                                                                                                                                                                                        
  ## Common Use Cases                                                                                                                                                                   
   
  - Remote coding agent runtime (Claude Code + Codex over the web)                                                                                                                      
  - Cloud workspace for cloning, editing, and pushing private repos
  - Headless browser automation via Brave + Playwright
  - Always-on executor for CORE tasks without leaving a laptop running                                                                                                                  
  - Shared team gateway pinned to a known security key
                                                                                                                                                                                        
  ## Dependencies for CoreBrain Gateway Hosting                                                                                                                                         
   
  - A CORE webapp instance (`COREBRAIN_API_URL`)                                                                                                                                        
  - A personal access token for that workspace (`COREBRAIN_API_KEY`)
  - A Railway volume mounted at `/mnt/volume` for persistent state
                                                                                                                                                                                        
  ### Optional Dependencies
                                                                                                                                                                                        
  - `GITHUB_TOKEN` — enables `git clone` / `git push` on private repos and auto-fills the gateway's git author identity                                                                 
  - `CLAUDE_CODE_OAUTH_TOKEN` — pre-authenticates Claude Code (skip the OAuth flow)
  - `OPENAI_API_KEY` — pre-authenticates Codex CLI                                                                                                                                      
  - `COREBRAIN_GATEWAY_SECURITY_KEY` — pin to a known value; omit on first boot to let the gateway generate one and print it to the deploy logs
                                                                                                                                                                                        
  ### Deployment Dependencies
                                                                                                                                                                                        
  - [CoreBrain Gateway Docker image](https://hub.docker.com/r/redplanethq/core-gateway)                                                                                                 
   
  ## Why Deploy CoreBrain Gateway on Railway?                                                                                                                                           
                  
  Railway is a singular platform to deploy your infrastructure stack. Railway will host your gateway so you don't have to deal with VM provisioning, TLS, or volume management, while   
  letting you scale CPU/RAM as your agent workloads grow.
                                                                                                                                                                                        
  By deploying the CoreBrain Gateway on Railway you get a public HTTPS URL, persistent storage for cloned repos and agent login state, and one-click rolling updates when a new image   
  ships — all paired with the rest of your CORE stack (webapp, database, MCP servers) on the same project. Drop in the env vars, mount one volume, copy the security key from the boot
  logs into the CORE webapp's *Register Gateway* dialog, and you're connected.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core-gateway | `redplanethq/core-gateway:0.6.0` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GITHUB_TOKEN` | (secret) |
| `OPENAI_API_KEY` | (secret) |
| `RESTART_POLICY` | unless |
| `COREBRAIN_API_KEY` | (secret) |
| `COREBRAIN_API_URL` | https://app.getcore.me |
| `COREBRAIN_DEPLOY_MODE` | railway |
| `COREBRAIN_GATEWAY_NAME` | cloud-gateway |
| `CLAUDE_CODE_OAUTH_TOKEN` | (secret) |
| `COREBRAIN_GATEWAY_HTTP_PORT` | 7787 |
| `COREBRAIN_GATEWAY_DESCRIPTION` | Cloud-hosted CoreBrain gateway |

## Configuration

- **Volume:** `/mnt/volume`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/core-gateway)
