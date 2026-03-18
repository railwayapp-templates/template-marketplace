# Deploy N8N Task Runner (only) on Railway

N8N Task Runner - add Python/JavaScript code execution to existing N8N

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-task-runner-only)

## About

n8n Task Runners execute Python and JavaScript code with custom dependencies. This template deploys **only the Task Runners service** to connect to your existing n8n instance, enabling Code nodes with custom packages like pandas, moment.js, requests, and hundreds of other libraries. Perfect for adding code execution to existing n8n Cloud or self-hosted deployments without redeployment.

Hosting n8n Task Runners involves deploying a service that connects to your existing n8n instance to execute Python and JavaScript code. The deployment requires configuring two environment variables on both your n8n instance and the task runners service: an authentication token and broker URI. Once connected, you can manage custom dependencies through Railway's dashboard by updating environment variables and redeploying. The service executes code in isolated containers, with deployment times ranging from 2-3 minutes for lightweight packages to 5-10 minutes for scientific packages. No server management or Docker knowledge required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n-runner | [nick0lay/n8n](https://github.com/nick0lay/n8n) (root: railway-deployment/runner) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `JS_PACKAGES` | moment@2.30.1,axios@^1.7.0,lodash@^4.17.21 | - |
| `N8N_VERSION` | latest | - |
| `PY_PACKAGES` | requests==2.31.0,python-dateutil==2.8.2 | - |
| `JS_ALLOW_LIST` | moment,axios,lodash | - |
| `PY_ALLOW_LIST` | * | - |
| `PY_STDLIB_ALLOW` | * | - |
| `GENERIC_TIMEZONE` | - | The default timezone is America/New_York. For instance, the Schedule node uses it to know at what time the workflow should start. To set a different default timezone, set GENERIC_TIMEZONE to the appropriate value. |
| `N8N_RUNNERS_AUTH_TOKEN` | (secret) | A shared secret task runners use to connect to the broker. Example template: ${{n8n.N8N_RUNNERS_AUTH_TOKEN}} |
| `N8N_RUNNERS_TASK_TIMEOUT` | 300 | - |
| `N8N_RUNNERS_MAX_CONCURRENCY` | 5 | - |
| `N8N_RUNNERS_TASK_BROKER_URI` | - | The address of the task broker server within the n8n instance (for example:  http://n8n-main:5679). Template example: http://${{n8n.RAILWAY_PRIVATE_DOMAIN}}:${{n8n.N8N_RUNNERS_BROKER_PORT}}  |
| `NODE_FUNCTION_ALLOW_BUILTIN` | * | - |
| `N8N_RUNNERS_LAUNCHER_LOG_LEVEL` | info | - |

**Category:** Automation · **Languages:** TypeScript, Vue, SCSS, JavaScript, Python, Handlebars, Dockerfile, Shell, HCL, HTML, Just, Rich Text Format, CSS, Batchfile

[View on Railway →](https://railway.com/template/n8n-task-runner-only)
