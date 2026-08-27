# Deploy AutoGen Studio on Railway

Visual tool for building and testing teams of AI agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/autogenstudio)

## About

AutoGen Studio is Microsoft's low-code web interface for building multi-agent AI systems. It sits on top of the AutoGen AgentChat framework and turns what is normally Python into a drag-and-drop canvas: assemble agents, attach model clients and tools, pick a termination condition, and watch the team work through a task message by message. Teams use it to prototype an agent workflow in an afternoon, then export it as JSON their application loads directly.

Deploy AutoGen Studio on Railway and three services arrive wired together. A Caddy gateway holds the public domain and puts HTTP basic authentication in front of everything, because AutoGen Studio ships no login of its own. Behind it the app serves the FastAPI backend and the web UI on a private address, with a 5 GB volume for generated files. Managed Postgres stores every team, session, run and message, so your work survives redeploys. Nothing but the gateway is reachable from the internet.

![Diagram of the AutoGen Studio, Caddy gateway and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787685893/autogen-studio-architecture.png)

AutoGen Studio is the visual front end for AutoGen, the multi-agent framework Microsoft Research released in 2023 and rewrote around an asynchronous core for version 0.4. Self-hosting gives you control over the two things that matter with agents: where your model keys live, and where the transcripts of what those agents did end up.

Key features:

- Visual team builder with a node canvas for agents, models, tools and termination conditions
- Streaming playground showing every agent turn, tool call and token count
- Component gallery of reusable teams, agents and tools, importable and exportable as JSON
- Model clients for OpenAI, Azure OpenAI, Anthropic and any OpenAI-compatible endpoint such as Ollama or vLLM
- A web-surfing agent backed by a headless browser, plus a Python code-execution tool

The architecture has three parts. The gateway is stock Caddy: it terminates the public domain, checks basic auth, and reverse-proxies everything to the app over the private network, including the WebSocket that carries a run. The app is a single uvicorn worker — runs are tracked in process memory keyed by run id, so it is deliberately not scaled out. Postgres holds all durable state; the volume holds generated files and migrations.

Upstream calls AutoGen Studio a prototyping tool rather than a production application, and AutoGen moved to community maintenance in 2025 with Microsoft Agent Framework as its successor. Treat it as an internal tool for your team.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| autogen-studio | [gridalpha/autogen-studio-railway](https://github.com/gridalpha/autogen-studio-railway) | Database |
| gateway | [gridalpha/autogen-studio-railway](https://github.com/gridalpha/autogen-studio-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | autogen-studio | 8081 | Port the app binds and Railway probes |
| `DATABASE_URL` | autogen-studio | - | Postgres connection string |
| `AUTOGENSTUDIO_APPDIR` | autogen-studio | /data | Volume for migrations and generated files |
| `AUTOGENSTUDIO_API_DOCS` | autogen-studio | true | Serve OpenAPI docs at /api/docs |
| `AUTOGENSTUDIO_UPGRADE_DATABASE` | autogen-studio | 1 | Keep the schema current across upgrades |
| `PORT` | gateway | 8080 | Port Caddy listens on |
| `APP_UPSTREAM` | gateway | - | Private address of the app |
| `GATEWAY_PASSWORD` | gateway | (secret) | Password, bcrypt-hashed at boot |
| `GATEWAY_USERNAME` | gateway | (secret) | Username for the browser login prompt |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/api/health`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/autogenstudio)
