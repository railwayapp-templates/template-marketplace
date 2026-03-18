# Deploy Doku on Railway

Doku is an open-source LLMOps tool to monitor & evaluate LLM applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tZQJlB)

## About

<div align="center">
<img src="https://github.com/dokulabs/.github/blob/main/profile/assets/favicon.png?raw=true" alt="Doku Logo" width="15%"><h4>Doku: Open Source Observability for LLMs</h4>

**[Documentation](https://docs.dokulabs.com/) | [Quickstart](#-getting-started-with-doku) | [Python SDK](https://github.com/dokulabs/dokumetry-python) | [Node SDK](https://github.com/dokulabs/dokumetry-node) | [Helm Chart](https://github.com/dokulabs/helm)**
</div>

Doku is an open-source LLMOps tool engineered to enables developers with comprehensive capabilities to monitor, analyze, and optimize LLM applications. 
It provides valuable real-time data on LLM usage, performance, and costs. Through seamless integrations with leading LLM platforms, including OpenAI, Cohere, Mistral and Anthropic, Doku acts as a central command center for all your LLM needs. It effectively guides your efforts, ensuring that your LLM applications not only operate at peak efficiency but also scale successfully.

This template automates the installation and pre-configuration of the following components:
- Doku Ingester
- Doku Client
- ClickHouse

### Next Steps

#### 🔑 Access Doku UI and Generate an API Key

With Doku running, the next step is to access the Doku UI and generate an API key for secure communication between your applications and Doku.

1. Open your browser and go to Doku UI at `https://doku-client-.up.railway.app/login`
2. Login using theb default credentials
    - Email as `user@dokulabs.com`
    - Password as `dokulabsuser`
3. Once you have logged into Doku UI, Go to API Keys page and create an API Key. Copy the generated API Key.

&gt; 💡 **Tip:** Alternatively, you can use the HTTP API to create your Doku API Key. For further details, take a look at the [API Reference](https://docs.dokulabs.com/latest/api-reference/endpoint/api-keys/create) section.

#### ⚡️ Instrument your Application

Choose the appropriate SDK for your LLM application's programming language and follow the steps to integrate monitoring with just **two lines of code**.

**Python**

Install the `dokumetry` [Python SDK](https://pypi.org/project/dokumetry/) using pip:

```shell
pip install dokumetry
```

Add the following two lines to your application code:

```python
import dokumetry

dokumetry.init(llm=client, doku_url="https://doku-ingester-.up.railway.app/", api_key="YOUR_DOKU_TOKEN")
```

##### Example Usage for monitoring `OpenAI` Usage:

```python
from openai import OpenAI
import dokumetry

client = OpenAI(
    api_key="YOUR_OPENAI_KEY"
)

# Pass the above `client` object along with your Doku Ingester URL and API key and this will make sure that all OpenAI calls are automatically tracked.
dokumetry.init(llm=client, doku_url="https://doku-ingester-.up.railway.app/", api_key="YOUR_DOKU_TOKEN")

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "What is LLM Observability",
        }
    ],
    model="gpt-3.5-turbo",
)
```

Refer to the `dokumetry` [Python SDK repository](https://github.com/dokulabs/dokumetry-python) for more advanced configurations and use cases.

#### Node

Install the `dokumetry` [NodeJS SDK](https://www.npmjs.com/package/dokumetry) using npm:

```shell
npm install dokumetry
```

Add the following two lines to your application code:

```javascript
import DokuMetry from 'dokumetry';

DokuMetry.init({llm: openai, dokuUrl: "https://doku-ingester-.up.railway.app/", apiKey: "YOUR_DOKU_TOKEN"})
```

##### Example Usage for monitoring `OpenAI` Usage:

```javascript
import OpenAI from 'openai';
import DokuMetry from 'dokumetry';

const openai = new OpenAI({
  apiKey: "YOUR_OPENAI_KEY", 
});

// Pass the above `openai` object along with your Doku Ingester URL and API key and this will make sure that all OpenAI calls are automatically tracked.
DokuMetry.init({llm: openai, dokuUrl: "https://doku-ingester-.up.railway.app/", apiKey: "YOUR_DOKU_TOKEN"})

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'What are the key to effective observability?' }],
    model: 'gpt-3.5-turbo',
  });
}

main();
```

Refer to the `dokumetry` [NodeJS SDK repository](https://github.com/dokulabs/dokumetry-node) for more advanced configurations and use cases.

### Visualize and Analyze

Once you have Doku Ingester and `DokuMetry` SDKs set up, you can instantly get insights into how your LLM applications in the Doku Client UI. Just head over to `https://doku-client-.up.railway.app` on your browser to start exploring.

![Doku Client UI](https://github.com/dokulabs/.github/blob/main/profile/assets/doku-client-1.jpg?raw=true)

With Doku, you get a simple, powerful view into important info like how much you’re spending on LLMs, which parts of your app are using them the most, and how well they’re performing. Find out which LLM models are favorites among your applications, and dive deep into performance details to make smart decisions. This setup is perfect for optimizing your app performance and keeping an eye on costs.

### Appendix

[![Doku](https://img.shields.io/badge/Doku-orange)](https://dokulabs.com/)
[![License](https://img.shields.io/github/license/dokulabs/doku?label=License&amp;logo=github&amp;color=f80&amp;logoColor=white)](https://github.com/dokulabs/doku/blob/main/LICENSE)
[![Downloads](https://static.pepy.tech/badge/dokumetry/month)](https://pepy.tech/project/dokumetry)

[![Slack](https://img.shields.io/badge/Slack-4A154B?logo=slack&amp;logoColor=white)](https://join.slack.com/t/dokulabs/shared_invite/zt-2etnfttwg-TjP_7BZXfYg84oAukY8QRQ)
[![X](https://img.shields.io/badge/follow-%40dokulabs-1DA1F2?logo=x&amp;style=social)](https://twitter.com/doku_labs)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Doku Client | `ghcr.io/dokulabs/doku-client:latest` | Web service |
| Doku Ingester | `ghcr.io/dokulabs/doku-ingester:latest` | Web service |
| Clickhouse | `clickhouse/clickhouse-server:24.2.2-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `INIT_DB_HOST` | Doku Client | clickhouse.railway.internal | Sets the host address of the ClickHouse server for Doku Client to connect |
| `INIT_DB_PORT` | Doku Client | 8123 | Sets the port on which ClickHouse listens |
| `INIT_DB_DATABASE` | Doku Client | default | Sets the name of the database in Clickhouse to be used by Doku |
| `INIT_DB_PASSWORD` | Doku Client | (secret) | Sets the password for authenticating with ClickHouse |
| `INIT_DB_USERNAME` | Doku Client | (secret) | Sets the username for authenticating with ClickHouse |
| `SQLITE_DATABASE_URL` | Doku Client | file:/app/client/data/data.db | Sets the location where SQLITE data is stored. |
| `PORT` | Doku Ingester | 9044 | Sets the port on which Ingester is running |
| `DOKU_DB_HOST` | Doku Ingester | clickhouse.railway.internal | Sets the host address of the ClickHouse server for Doku Ingester to connect |
| `DOKU_DB_NAME` | Doku Ingester | default | Sets the name of the database in Clickhouse to be used by Doku |
| `DOKU_DB_PORT` | Doku Ingester | 9000 | Sets the port on which ClickHouse listens |
| `DOKU_DB_USER` | Doku Ingester | (secret) | - |
| `DOKU_DB_PASSWORD` | Doku Ingester | (secret) | Sets the password for authenticating with ClickHouse |
| `CLICKHOUSE_USER` | Clickhouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | Clickhouse | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/client/data`
- **Volume:** `/var/lib/clickhouse`

**Category:** Observability

[View on Railway →](https://railway.com/template/tZQJlB)
