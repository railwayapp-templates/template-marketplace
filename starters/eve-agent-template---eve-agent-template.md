# Deploy eve-agent-template on Railway

Eve agent template based on the Vercel framework

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eve-agent-template)

## About

Deploy a published EveAgents (https://www.eveagents.dev) agent as a long-running Eve service on Railway. Choose a standalone
  agent or an integration variant, connect your model and service credentials, and launch it using the maintained EveAgents Railway template.

  ## About Hosting EveAgents

  EveAgents (https://www.eveagents.dev) is an open-source directory of agents built for the Eve framework. Each agent includes
  its instructions, source files, configuration, requirements, and optional integration-specific files.

  The Railway template downloads the selected agent during deployment, validates every file, applies the Railway-compatible
  runtime adapters, and starts the agent on Railway's assigned port.

  To get started:

  1. Choose an agent from EveAgents (https://www.eveagents.dev).
  2. Create a key from the EveAgents API Keys page (https://www.eveagents.dev/dashboard/api-keys).
  3. Paste it into EVEAGENTS_API_KEY when Railway asks.
  4. Add your OpenAI key and any credentials required by the selected integration.
  5. Deploy the service.

  EVEAGENTS_API_KEY is the only EveAgents-issued credential required by the template.

  ## Why Deploy EveAgents on Railway?

  Railway provides a convenient environment for running persistent Eve agents without manually configuring a server.

  The template includes:

  - Automated agent download and file integrity validation
  - Railway-compatible Eve runtime configuration
  - Public HTTP networking
  - Health monitoring through /eve/v1/health
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

  - A Railway (https://railway.com) account
  - An EveAgents (https://www.eveagents.dev) account
  - An EveAgents API key (https://www.eveagents.dev/dashboard/api-keys)
  - An OpenAI API key (https://platform.openai.com/api-keys)
  - Any credentials required by the selected integration

  Integration-specific requirements are listed on the corresponding agent integration page in the Eve integrations directory
  (https://www.eveagents.dev/integrations).

  ### Deployment Dependencies

  - Browse Eve agents (https://www.eveagents.dev)
  - Create an EveAgents API key (https://www.eveagents.dev/dashboard/api-keys)
  - Explore Eve integrations (https://www.eveagents.dev/integrations)
  - Read the Railway deployment guide (https://www.eveagents.dev/deploy/railway)
  - View the Railway template source (https://github.com/bergside/eve-railway-template)
  - View the Eve framework (https://eve.dev)

  ## How Distribution Works

  1. EVE_AGENT_SLUG selects a published base agent.
  2. Optional EVE_INTEGRATION_SLUG selects an assigned integration variant.
  3. The build uses EVEAGENTS_API_KEY to download the selected agent.
  4. Integration-specific files are applied over the reusable base files.
  5. Every file path, size, and SHA-256 digest is validated.
  6. Required environment variables are checked before the agent is built.
  7. The template adds the Railway-compatible model, Eve web channel, and sandbox adapters.
  8. Eve builds and starts the selected agent on Railway's assigned PORT.

  Each EveAgents API key allows up to 20 agent downloads per hour. Keys can be revoked from the API Keys page
  (https://www.eveagents.dev/dashboard/api-keys).

  ## Railway Variables

- **`EVE_AGENT_SLUG`** — Required. The agent to deploy, such as `meeting-action-planner`. [Browse Eve agents](https://www.eveagents.dev).

- **`EVE_INTEGRATION_SLUG`** — Optional. The integration to include, such as `slack` or `discord`. Leave empty for the
  standalone agent. [Browse integrations](https://www.eveagents.dev/integrations).

- **`EVEAGENTS_REGISTRY_URL`** — Fixed to `https://www.eveagents.dev/api/registry/v1`. Do not change this value.

- **`EVEAGENTS_API_KEY`** — Required. Create and copy your key from the [EveAgents API Keys page](https://www.eveagents.dev/dashboard/api-keys).

- **`OPENAI_API_KEY`** — Required. The OpenAI credential used by the agent.

- **`EVE_MODEL`** — The OpenAI model used by the agent. Defaults to `gpt-5.4-mini`.

- **`ROUTE_AUTH_BASIC_USER`** — Username protecting the deployed Eve routes. Defaults to `eve`.

- **`ROUTE_AUTH_BASIC_PASSWORD`** — Automatically generated password protecting the deployed Eve routes. Uses `${{ secret(32) }}`.

  ## Railway Service Settings

  - Source: https://github.com/bergside/eve-railway-template
  - Config file: /railway.json
  - Public networking: HTTP enabled
  - Healthcheck: /eve/v1/health
  - Persistent volume: /app/.eve/.workflow-data

  ## Current Integration Compatibility

  Standalone agents and direct-credential channels can run entirely on Railway.

  Some Slack and MCP/OpenAPI connection variants currently rely on Vercel Connect. These variants require a separately
  configured Connect authorization flow because Railway does not provide Vercel deployment identity.

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
| `EVE_MODEL` | - | OpenAI model used by the agent. Guide: https://www.eveagents.dev/deploy/railway |
| `EVE_AGENT_SLUG` | - | Agent slug from its EveAgents URL, for example meeting-action-planner: https://www.eveagents.dev/                        productivity/meeting-action-planner |
| `OPENAI_API_KEY` | (secret) | OpenAI credential required by the agent. Guide: https://www.eveagents.dev/deploy/railway |
| `EVEAGENTS_API_KEY` | (secret) | Create your EveAgents API key at: https://www.eveagents.dev/dashboard/api-keys |
| `EVE_INTEGRATION_SLUG` | - | Optional integration slug found at: https://www.eveagents.dev/integrations |
| `EVEAGENTS_REGISTRY_URL` | https://www.eveagents.dev/api/registry/v1 | Fixed agent download API: https://www.eveagents.dev/api/registry/v1 |

**Category:** Starters · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/eve-agent-template)
