# Deploy OpenAI Assistants LInk on Railway

Link your OpenAI Assistants to a database + Evaluate Assistant responses

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-M8zbi)

## About

OpenAI Assistants Link is a repo for linking local resources to the OpenAI Assistants API for leveraging and scaling assistant capabilities. This repo acts as a template for research or enterprise devs trying to scale the use of OpenAI assistants within their organization.

OpenAI Assistants Link also offers a base-level approach to evaluating LLM responses from the Assistants API. These evaluations should act as a guideline for how to begin your approach to LLM evals and should be modified to best fit your needs.

You will probably find this repo useful if one or more of these points apply:

- You are at a company that wants to use OpenAI and you have little experience with it.
- You are at a company that wants to automate customer experiences with chatbots.
- You have automated customer experiences with chatbots but have no testing/evaluation criteria.
- You like learning!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openai-assistants-link | [euskoog/openai-assistants-link](https://github.com/euskoog/openai-assistants-link) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BASE_URL` | openai-assistants-link | - | The base URL of the API deployment |
| `DATABASE_URL` | openai-assistants-link | - | The database url from postgres |
| `API_PREFIX_V1` | openai-assistants-link | /api/v1 | - |
| `OPENAI_API_KEY` | openai-assistants-link | (secret) | Your OpenAI API key |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Python

[View on Railway →](https://railway.com/deploy/-M8zbi)
