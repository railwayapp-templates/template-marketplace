# Deploy Mastra Agent Builder on Railway

Hosted Studio agent builder with MastraEditor. Enterprise license needed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mastra-agent-builder)

## About

[Mastra](https://mastra.ai) is the open-source TypeScript framework for building AI agents and workflows. This template deploys the Mastra Agent Builder: a server with `MastraEditor` that lets you create and edit agents from Studio with a configurable feature matrix — allowed models, tools, sub-agents, workflows, avatars, and observational memory. Optional integrations add Composio tools, Stagehand/Browserbase browsing, and an E2B-backed sandboxed workspace.

The public domain serves Mastra Studio, and agent definitions are stored in LibSQL on an attached volume. Every third-party integration is optional and activates when you set its variables: WorkOS for auth and roles, Composio for tenant-scoped tools, Browserbase for web browsing, E2B for sandboxed code workspaces. Start with just an OpenAI API key and add providers as you need them. The deployment has no authentication until you configure WorkOS, so anyone with the URL can use the agents and spend your OpenAI credit. Set `WORKOS_API_KEY` and `WORKOS_CLIENT_ID`, or remove the public domain, before you share the URL.

The Agent Builder and WorkOS role-based access control are Mastra Enterprise features. Set `MASTRA_LICENSE_KEY` to turn them on. Without the license key the server still runs Studio, the agents, the tools, and the workflow, and WorkOS still authenticates users; only the builder UI and the role checks stay off. The deploy form does not ask for the license key: after the deploy finishes, open the Mastra Server service, add `MASTRA_LICENSE_KEY` in Variables, and redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mastra Server | [leoisadev1/mastra-template-agent-builder](https://github.com/leoisadev1/mastra-template-agent-builder) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENAI_API_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/mastra-agent-builder)
