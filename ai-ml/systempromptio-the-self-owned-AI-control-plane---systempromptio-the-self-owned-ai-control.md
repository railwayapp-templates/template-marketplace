# Deploy systemprompt.io: the self-owned AI control plane on Railway

Stop renting your AI. The Rust control plane you own.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/systempromptio-the-self-owned-ai-control)

## About

**[The AI control plane you own](https://systemprompt.io)**

  Your team already uses AI. The only question is whether you can see it,
  govern it, and prove what happened when someone asks. Most companies answer
  by renting a dashboard: another SaaS, another vendor holding your prompts,
  another black box between your engineers and your models.

  This template is the other answer.

  ## About Hosting systemprompt

  One Rust binary and a Postgres database, deployed in about five minutes,
  owned by you from the first boot.

  Every inference request and every MCP tool call passes through a four-stage
  governance pipeline before it reaches a model:

  1. **Scope check.** Does this identity have the right to make this call?
  2. **Secret scan.** 35+ patterns catch keys and credentials before they leave.
  3. **Blocklist.** Deny what policy says is denied.
  4. **Rate limit.** Per user, per tier, with burst control.

  Every decision, allowed or denied, is written to your Postgres with a trace
  id that links identity to agent to tool to result to cost. When security
  asks "who sent what to which model, and what did it cost", the answer is a
  SQL query on a database you control, not a support ticket to a vendor.

  ## Why Deploy systemprompt on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway
  will host your infrastructure so you don't have to deal with configuration,
  while allowing you to vertically and horizontally scale it.

  Deploying systemprompt on Railway pairs the fastest way to run a container
  and a Postgres with a control plane built on ownership: one-click
  provisioning, automatic wiring between gateway and database, and a
  deployment where the policies, the audit trail, and the data are yours.

  ## Common Use Cases

  - **Standardise Claude Code across teams.** The gateway speaks the Anthropic
    API. Point Claude Code, or any Anthropic SDK client, at your deployment
    with a one-line change. Your developers notice nothing. You start seeing
    everything: usage, spend, and every governance decision, per user.
  - **One policy layer for every provider.** OpenAI and Gemini requests route
  through the same four-stage pipeline, so governance is uniform no matter
  which model a team prefers.
- **Keep secrets inside the building.** Secret scanning catches keys and
  credentials before a prompt ever leaves your infrastructure. No telemetry
  back to us, no prompts in someone else's cloud, no per-seat pricing that
  punishes adoption. It is a library you embed and extend, not a platform
  you rent.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| systemprompt-template | `ghcr.io/systempromptio/systemprompt-template:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | systemprompt-template | :: | - |
| `PORT` | systemprompt-template | 8080 | - |
| `RUST_LOG` | systemprompt-template | info | - |
| `HTTP_PORT` | systemprompt-template | 8080 | - |
| `GEMINI_API_KEY` | systemprompt-template | (secret) | Optional if another provider is set |
| `OPENAI_API_KEY` | systemprompt-template | (secret) | Optional if another provider is set |
| `ANTHROPIC_API_KEY` | systemprompt-template | (secret) | Optional if another provider is set |
| `POSTGRES_DB` | Postgres | systemprompt | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/systempromptio-the-self-owned-ai-control)
