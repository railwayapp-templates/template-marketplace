# Deploy arize-phoenix on Railway

AI Observability & Evaluation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/PTHRoq)

## About

Phoenix is an open-source AI observability platform designed for experimentation, evaluation, and troubleshooting. It provides:

🔭 Tracing - Trace your LLM application's runtime using OpenTelemetry-based instrumentation.

🧠 Evaluation - Leverage LLMs to benchmark your application's performance using response and retrieval evals.

🗄️ Datasets - Create versioned datasets of examples for experimentation, evaluation, and fine-tuning.

🧪 Experiments - Track and evaluate changes to prompts, LLMs, and retrieval.

Phoenix is vendor and language agnostic with out-of-the-box support for popular frameworks (🦙LlamaIndex, 🦜⛓LangChain, Haystack, 🧩DSPy) and LLM providers (OpenAI, Bedrock, MistralAI, VertexAI, LiteLLM, and more). For details on auto-instrumentation, check out the OpenInference project.

Phoenix is built by Arize AI, the company behind the the industry-leading AI observability platform, and a set of core contributors.

Join our community to connect with thousands of AI builders.

Find us at:

https://github.com/Arize-ai/phoenix
https://docs.arize.com/phoenix
https://x.com/ArizePhoenix
https://phoenix.arize.com

Like what you see? Give us a ★ on GitHub!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| arize-phoenix | `arizephoenix/phoenix:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | arize-phoenix | 6006 | - |
| `PHOENIX_SECRET` | arize-phoenix | (secret) | The secret used to sign keys. Should be kept private. E.x. 3413f9a7735bb780c6b8e4db7d946a492b64d26112a955cdea6a797f4c833593 |
| `PHOENIX_ENABLE_AUTH` | arize-phoenix | True | Enable authentication |
| `PHOENIX_SMTP_HOSTNAME` | arize-phoenix | smtp.sendgrid.net | The SMTP mail service hostname |
| `PHOENIX_SMTP_PASSWORD` | arize-phoenix | (secret) | The password to connect to the SMTP for sending emails |
| `PHOENIX_SMTP_USERNAME` | arize-phoenix | (secret) | the username to use with the smtp server |
| `PHOENIX_SQL_DATABASE_URL` | arize-phoenix | - | The URL to the postgres database |
| `PHOENIX_USE_SECURE_COOKIES` | arize-phoenix | True | Use secure cookies for authentication |
| `PHOENIX_SQL_DATABASE_SCHEMA` | arize-phoenix | phoenix | The database schema name |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/PTHRoq)
