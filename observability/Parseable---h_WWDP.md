# Deploy Parseable on Railway

Lightweight, high performance log analytics for the cloud native era

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/h_WWDP)

## About

<p align="center">
    <a href="https://www.parseable.io">
        <img style="border-radius: 5px; width: 800px;" src="https://raw.githubusercontent.com/parseablehq/.github/main/images/logo.svg" alt="chatwoot logo">
    </a>
</p>

<h3 align="center">Cloud native log analytics</h3><br>

Parseable is a log analytics platform, built for the modern, cloud native era. Parseable uses a index-free mechanism to organize and query data allowing low latency, and high throughput ingestion and query.

For comparison, Parseable consumes up to **_~80% lower memory_** and **_~50% lower CPU_** than Elastic for similar ingestion throughput. Read more in the [benchmarks directory ↗︎](./benchmarks/).

![Parseable Console](https://raw.githubusercontent.com/parseablehq/.github/main/images/console.png)

## Quick start

Once deployed you can open the dashboard from the auto generated Railway Domain. You can login to the dashboard with the credentials from the `P_USERNAME` and `P_PASSWORD` service variables.

To ingest data, run the below command. This will send logs to the `test` stream. You can see the logs in the dashboard.

```
curl --location --request POST '{service domain}/api/v1/ingest' \
--header 'X-P-Stream: test' \
--header 'Authorization: Basic {base64 encoded username:password}' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "id": "11f7ce5c-cfaf-4719-bb34-8ed8d0f5b70c",
        "datetime": "16/Dec/2023:00:00:00 +0000",
        "host": "Railway"
    }
]'
```

## Highlights

- Choose storage backend - local drive or S3 (or compatible) object store.
- Ingestion API compatible with HTTP + JSON output of log agents.
- Query log data with PostgreSQL compatible SQL.
- Single binary includes all components - ingestion, store and query. Built-in UI.

### Enterprise ready

- [Alerts ↗︎](https://www.parseable.io/docs/alerts)
- [RBAC ↗︎](https://www.parseable.io/docs/rbac)
- [OAuth2 ↗︎](https://www.parseable.io/docs/oidc)
- [Grafana ↗︎](https://github.com/parseablehq/parseable-datasource)
- [LLM ↗︎](https://www.parseable.io/docs/llm)
- [Stats ↗︎](https://www.postman.com/parseable/workspace/parseable/request/22353706-b32abe55-f0c4-4ed2-9add-110d265888c3)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Parseable | `parseable/parseable:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Port used for Railway |
| `P_ADDR` | - | Address (IP Address and Port) on which Parseable server would listen for new connections. |
| `P_ENDPOINT` | - | Public endpoint |
| `P_PASSWORD` | (secret) | Password for the admin user. Will be used to access API and UI. |
| `P_USERNAME` | (secret) | Username for the admin user. Will be used to access API and UI. |
| `P_CHECK_UPDATE` | false | Specify whether server should check for new updates from Parseable download server. |
| `P_OPENAI_API_KEY` | (secret) | Specify your OpenAI API key to generate SQL automatically from plain text. [Read more here.](https://www.parseable.io/docs/llm) |
| `P_ENDPOINT_PRIVATE` | - | Private endpoint |
| `P_SEND_ANONYMOUS_USAGE_DATA` | false | Specify whether server should send anonymous usage data to Parseable analytics. |

## Configuration

- **Start command:** `parseable local-store`
- **Healthcheck:** `/api/v1/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/parseable/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/h_WWDP)
