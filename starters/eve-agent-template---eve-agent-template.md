# Deploy eve-agent-template on Railway

Eve agent template based on the Vercel framework

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eve-agent-template)

## About

[EveAgents](https://www.eveagents.dev) is an open-source directory of agents built for the [Eve framework](https://eve.dev). Each agent includes its instructions, source files, configuration, requirements, and optional integration-specific files.

 The Railway template downloads the selected agent during deployment, validates every file, applies Railway-compatible runtime adapters, and starts the agent on Railway’s assigned port.

 To get started:

 1. Choose an agent from [EveAgents](https://www.eveagents.dev).
 2. Create a key from the [EveAgents API Keys page](https://www.eveagents.dev/dashboard/api-keys).
 3. Paste it into `EVEAGENTS_API_KEY` when Railway asks.
 4. Choose OpenAI, Claude, or Gemini and add the corresponding provider API key.
 5. Add any credentials required by the selected integration.
 6. Deploy the service.

 `EVEAGENTS_API_KEY` is the only EveAgents-issued credential required by the template.

 ## Why Deploy EveAgents on Railway?

 Railway provides a convenient environment for running persistent Eve agents without manually configuring a server.

 The template includes:

 - Automated agent download and file-integrity validation
 - Direct OpenAI, Claude, and Gemini model support
 - Railway-compatible Eve runtime configuration
 - Public HTTP networking
 - Health monitoring through `/eve/v1/health`
 - Persistent workflow storage
 - Automatically generated route authentication
 - Support for standalone agents and compatible integration variants
 - Rebuilds and redeployments from one maintained template

 ## Common Use Cases

 - Deploy productivity agents for meetings, planning, and task management
 - Run engineering agents for incident response, bug triage, and releases
 - Connect agents to Discord, Telegram, Microsoft Teams, and other channels
 - Build research, knowledge-management, support, and analytics workflows
 - Combine a reusable base agent with integration-specific functionality
 - Run internal agents behind password-protected Eve routes

 ## Dependencies for EveAgents Hosting

 The following accounts and credentials may be required:

 - A [Railway](https://railway.com?referralCode=lAH3cp) account
 - An [EveAgents](https://www.eveagents.dev) account
 - An [EveAgents API key](https://www.eveagents.dev/dashboard/api-keys)
 - An API key from one supported AI provider:
 - [OpenAI](https://platform.openai.com/api-keys)
 - [Claude](https://platform.claude.com/settings/keys)
 - [Gemini](https://aistudio.google.com/apikey)
 - Any credentials required by the selected integration

 Integration-specific requirements are listed on the corresponding agent integration page in the [Eve integrations directory](https://www.eveagents.dev/integrations).

 ### Deployment Dependencies

 - [Browse Eve agents](https://www.eveagents.dev)
 - [Create an EveAgents API key](https://www.eveagents.dev/dashboard/api-keys)
 - [Explore Eve integrations](https://www.eveagents.dev/integrations)
 - [Read the Railway deployment guide](https://www.eveagents.dev/deploy/railway)
 - [View the Railway template source](https://github.com/bergside/eve-railway-template)
 - [View the Eve framework](https://eve.dev)

 ## How Distribution Works

 1. `EVE_AGENT_SLUG` selects a published base agent.
 2. `EVE_INTEGRATION_SLUG` optionally selects an assigned integration variant.
 3. The build uses `EVEAGENTS_API_KEY` to download the selected agent.
 4. Integration-specific files are applied over the reusable base files.
 5. Every file path, size, and SHA-256 digest is validated.
 6. Required environment variables are checked before the agent is built.
 7. The template selects the direct model adapter identified by `EVE_MODEL`.
 8. The template adds the Railway-compatible Eve web channel and sandbox adapters.
 9. Eve builds and starts the selected agent on Railway’s assigned `PORT`.

 Each EveAgents API key allows up to 20 agent downloads per hour. Keys can be revoked from the [API Keys page](https://www.eveagents.dev/dashboard/api-keys).

 ## Railway Variables

 - **`EVE_AGENT_SLUG`** — Required. Selects the published agent to deploy (i.e. `incident-response-commander`). [Browse Eve agents](https://www.eveagents.dev).

 - **`EVE_INTEGRATION_SLUG`** — Selects an optional integration variant; leave it empty for the standalone agent (i.e. `slack` or `discord`). [Browse integrations](https://www.eveagents.dev/integrations).

 - **`EVEAGENTS_REGISTRY_URL`** — Defines the registry endpoint used to download the selected agent (i.e. `https://www.eveagents.dev/api/registry/v1`). This value is preconfigured and should not be changed.

 - **`EVEAGENTS_API_KEY`** — Required. Authorizes the template to download an agent from EveAgents (i.e. `eva_live_...`). Create one on the [EveAgents API Keys page](https://www.eveagents.dev/dashboard/api-keys).

 - **`EVE_MODEL`** — Required. Selects the AI provider and model used by the agent (i.e. `openai/gpt-5.4-mini`, `anthropic/claude-sonnet-4-6`, or `google/gemini-3.6-flash`).

 - **`EVE_PROVIDER_API_KEY`** — Required. The direct API key for the provider selected in `EVE_MODEL` (i.e. use an OpenAI key when `EVE_MODEL` starts with `openai/`).

 - **`ROUTE_AUTH_BASIC_USER`** — Defines the username protecting the deployed agent’s public Eve routes (i.e. `eve`). This value is preconfigured.

 - **`ROUTE_AUTH_BASIC_PASSWORD`** — Defines the password protecting the deployed agent’s public Eve routes (i.e. a Railway-generated 32-character secret). It is preconfigured using `${{ secret(32) }}`.

 ## Railway Service Settings

 - Source: `https://github.com/bergside/eve-railway-template`
 - Config file: `/railway.json`
 - Public networking: HTTP enabled
 - Healthcheck: `/eve/v1/health`
 - Persistent volume: `/app/.eve/.workflow-data`

 ## Current Integration Compatibility

 Standalone agents and direct-credential channels can run entirely on Railway.

 Some Slack and MCP/OpenAPI connection variants currently rely on Vercel Connect. These variants require a separately configured Connect authorization flow because Railway does not provide Vercel deployment identity.

 Review the requirements on the selected integration page before deploying.

 ## License

 MIT

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| eve-railway-template | [bergside/eve-railway-template](https://github.com/bergside/eve-railway-template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `EVE_MODEL` | - | Provider-qualified model used by the agent (i.e. openai/gpt-5.4-mini). |
| `EVE_AGENT_SLUG` | - | Agent slug from its EveAgents URL (i.e. incident-response-commander). |
| `EVEAGENTS_API_KEY` | (secret) | API key created in your EveAgents account (i.e. eva_live_...). |
| `EVE_INTEGRATION_SLUG` | - | Integration variant to deploy; leave empty for the standalone agent (i.e. slack). |
| `EVE_PROVIDER_API_KEY` | (secret) | API key matching the provider selected in EVE_MODEL (i.e. an OpenAI key when using openai/gpt-5.4-mini). |
| `ROUTE_AUTH_BASIC_USER` | (secret) | Username protecting the deployed agent’s public HTTP routes. Use eve as the default. |
| `EVEAGENTS_REGISTRY_URL` | https://www.eveagents.dev/api/registry/v1 | EveAgents registry endpoint used to download agents (i.e. https://www.eveagents.dev/api/registry/v1). |
| `ROUTE_AUTH_BASIC_PASSWORD` | (secret) | Required and secret. Password protecting the deployed agent’s public HTTP routes. Railway should generate it automatically with ${{ secret(32) }}. |

**Category:** Starters · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/eve-agent-template)
