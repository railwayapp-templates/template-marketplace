# Deploy superglue on Railway

Self-healing open source data connector.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wJg5-W)

## About

<p align="center">
  <img alt="superglue_logo_white" width="350" src="https://github.com/user-attachments/assets/be0e65d4-dcd8-4133-9841-b08799e087e7">
</p>

<h2 align="center">self-healing open source data connector 🍯</h2>

superglue is a self-healing open source data connector. You can deploy it as a proxy between you and any complex / legacy APIs and always get the data that you want in the format you expect.

Here's how it works: You define your desired data schema and provide basic instructions about an API endpoint (like "get all issues from jira"). Superglue then does the following:

- Automatically generates the API configuration by analyzing API docs.
- Handles pagination, authentication, and error retries.
- Transforms response data into the exact schema you want using JSONata expressions.
- Validates that all data coming through follows that schema, and fixes transformations when they break.



<div align="center">

[![GitHub](https://img.shields.io/github/license/superglue-ai/superglue?style=flat-square)](https://github.com/superglue-ai/superglue/blob/main/LICENSE)
[![Y Combinator](https://img.shields.io/badge/Y%20Combinator-W25-orange?style=flat-square)](https://www.ycombinator.com/companies/superglue)
[![Client SDK](https://img.shields.io/npm/v/@superglue/client?style=flat-square&amp;logo=npm)](https://www.npmjs.com/package/@superglue/client)
[![Docker](https://img.shields.io/docker/pulls/superglueai/superglue?style=flat-square&amp;logo=Docker)](https://hub.docker.com/r/superglueai/superglue)
[![Twitter Adina](https://img.shields.io/twitter/follow/adinagoerres?style=flat-square&amp;logo=X)](https://twitter.com/adinagoerres)
[![Twitter Stefan](https://img.shields.io/twitter/follow/sfaistenauer?style=flat-square&amp;logo=X)](https://twitter.com/sfaistenauer)
[![Weave Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fapp.workweave.ai%2Fapi%2Frepository%2Fbadge%2Forg_0S2o9PLamHvNsTjHbszc38vC%2F914997268&amp;cacheSeconds=3600&amp;labelColor=#EC6341)](https://app.workweave.ai/reports/repository/org_0S2o9PLamHvNsTjHbszc38vC/914997268)


</div>

If you’re spending a lot of time writing code connecting to weird APIs, fumbling with custom fields in foreign language ERPs, mapping JSONs, extracting data from compressed CSVs sitting on FTP servers, and making sure your integrations don’t break when something unexpected comes through, superglue might be for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dashboard | `ghcr.io/brody192/railway-public-to-private-proxy` | Web service |
| server | `superglueai/superglue` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WEB_PORT` | 3001 | Port for the web dashboard |
| `AUTH_TOKEN` | (secret) | Authentication token for API access |
| `REDIS_HOST` | - | if redis |
| `REDIS_PORT` | - | if redis |
| `STORAGE_DIR` | /data | if file, the path to the datastore directory |
| `GRAPHQL_PORT` | 3000 | Port for the Superglue server |
| `OPENAI_MODEL` | gpt-4o-2024-11-20 | OpenAI model to use. We recommend gpt-4o-2024-11-20 |
| `DATASTORE_TYPE` | file | Datastore type (redis or memory or file) |
| `OPENAI_API_KEY` | (secret) | Your OpenAI API key |
| `REDIS_PASSWORD` | (secret) | if redis |
| `REDIS_USERNAME` | (secret) | if redis |
| `GRAPHQL_ENDPOINT` | - | Endpoint for the graphql api (used so the web dashboard knows where to find the server) |
| `OPENAI_API_BASE_URL` | https://api.openai.com/v1 | Optional: Set a custom OpenAI API URL (for self-hosted models or proxies) |
| `SCHEMA_GENERATION_MODEL` | gpt-4o-2024-11-20 | OpenAI model for schema generation. Should be a faster model than the general one. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/wJg5-W)
