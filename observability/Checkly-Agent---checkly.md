# Deploy Checkly Agent on Railway

Test internal-only apps and APIs for performance and reliability.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/checkly)

## About

## Checkly Agent

The Checkly Agent is a container that you need to deploy to run a Private Location in Checkly. The agent needs to be deployed on your infrastructure and executes checks on behalf of the Checkly application. For configuration details, check the [agent configuration guide](https://www.checklyhq.com/docs/private-locations/checkly-agent-configuration/).

### Updating the agent container

New versions of the Checkly Agent are released regularly. To have access to the latest improvements, you can simply redeploy the service.

### Using private locations

Please read Checkly's [getting started](https://www.checklyhq.com/docs/private-locations/) guide.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Checkly | `checkly/agent:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_KEY` | (secret) | API key for the Private Location in which the agent will serve. The API key is shown in the web app once, when initially creating a Private Location. |
| `LOG_LEVEL` | INFO | (Default: `INFO`) Set the log level of the agent. Can be one of `DEBUG`, `LOG`, `INFO`, `WARN` or `ERROR`. |
| `JOB_CONCURRENCY` | 5 | (Default: 5, max: 10) Number of concurrent checks that are run by the agent. |

**Category:** Observability

[View on Railway →](https://railway.com/deploy/checkly)
