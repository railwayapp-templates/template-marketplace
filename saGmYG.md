# Deploy Datadog Agent + Node App on Railway

Datadog Agent with a Node App, forwarding logs and metrics.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/saGmYG)

## About

## Overview

Datadog aggregates events, metrics, and logs across the full devops stack.  The Datadog Agent collects data from your applications to send to Datadog, where you can analyze your monitoring and performance data.

## Highlights

 One-click deployment of...

- Datadog Agent
- Node Application running an Express web server with two endpoints.  Within the endpoints, the application sends metrics and logs to the Agent.

## Requirements

You will need your Datadog API key and Datadog Site value.

## Learn More

- [Datadog Agent GitHub repo](https://github.com/DataDog/datadog-agent)
- [Datadog Documentation](https://docs.datadoghq.com/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| datadog-agent | [railwayapp-templates/datadog-agent-railway-starter](https://github.com/railwayapp-templates/datadog-agent-railway-starter) (root: /agent) | Worker |
| node-app | [railwayapp-templates/datadog-agent-railway-starter](https://github.com/railwayapp-templates/datadog-agent-railway-starter) (root: /expressapi) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DD_SITE` | datadog-agent | - | Your DataDog Site |
| `DD_API_KEY` | datadog-agent | (secret) | Your API key from DataDog |
| `DD_HOSTNAME` | datadog-agent | - | The private domain of this agent.  Do not change. |
| `DD_AGENT_HOST` | node-app | - | The private domain of the agent.  Do not change. |
| `DD_TRACE_AGENT_PORT` | node-app | 8126 | Port that the agent is listening on for trace data |
| `DD_AGENT_STATSD_PORT` | node-app | 8125 | StatsD port that the agent is listening on. |
| `DD_AGENT_SYSLOG_PORT` | node-app | 514 | The syslog port that the agent is listening on. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/saGmYG)
