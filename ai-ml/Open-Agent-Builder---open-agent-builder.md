# Deploy Open Agent Builder on Railway

Visual AI agent workflow builder powered by Firecrawl

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/open-agent-builder)

## About

Open Agent Builder is a visual workflow builder for creating AI agent pipelines powered by Firecrawl. Design complex agent workflows with a drag-and-drop interface featuring 8 core node types, execute them with real-time streaming updates via LangGraph, and leverage MCP protocol support for extensible tool integration across multiple LLM providers.

![Open Agent Builder Interface](https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/open-agent-builder.png)

![Open Agent Builder Workflow](https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/open-agent-builder-workflow.png)

Hosting Open Agent Builder requires a Next.js 16 application with external managed services. The Railway deployment automatically builds from the official repository using Railpack, which handles Next.js detection and optimization. You'll need to set up Convex (real-time database) and Clerk (authentication with JWT) as external services before deployment. The application is stateless on Railway - all workflow data, executions, and user settings persist in Convex. Optional LLM provider keys (Anthropic Claude, OpenAI, Groq) and E2B for code execution can be configured during deployment or added later through the UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open Agent Builder | [firecrawl/open-agent-builder](https://github.com/firecrawl/open-agent-builder) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `E2B_API_KEY` | (secret) | E2B API key for sandboxed code execution in advanced transform nodes. Create account at https://e2b.dev and generate API key (starts with e2b_). Can also be added via UI after deployment. |
| `GROQ_API_KEY` | (secret) | Groq API key for fast inference with open models. Create account at https://console.groq.com/keys and generate new key (starts with gsk_). Can also be added via UI after deployment. |
| `OPENAI_API_KEY` | (secret) | OpenAI API key for GPT models. Create account at https://platform.openai.com/api-keys and generate new key (starts with sk-). Can also be added via UI after deployment. |
| `CLERK_SECRET_KEY` | (secret) | Clerk secret key for server-side authentication. In Clerk dashboard (https://clerk.com), go to API Keys section and copy the secret key (starts with sk_) |
| `ANTHROPIC_API_KEY` | (secret) | (Recommended) Anthropic Claude API key. Create account at https://console.anthropic.com and generate API key (starts with sk-ant-). Can also be added via UI after deployment. |
| `FIRECRAWL_API_KEY` | (secret) | API key for Firecrawl web scraping service. Get it from https://firecrawl.link/api-keys |
| `NEXT_PUBLIC_CONVEX_URL` | - | Convex database URL from production deployment. Create account at https://convex.dev, create project, run 'npx convex deploy' and copy the URL (format: https://your-deployment.convex.cloud) |
| `CLERK_JWT_ISSUER_DOMAIN` | - | Clerk JWT issuer domain for Convex integration. In Clerk dashboard (https://clerk.com), go to JWT Templates, select Convex, click Apply, and copy the Issuer URL (format: https://your-app.clerk.accounts.dev) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | - | Clerk publishable key for authentication. Create account at https://clerk.com, create application, go to API Keys and copy the publishable key (starts with pk_) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/template/open-agent-builder)
