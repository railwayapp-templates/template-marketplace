# Deploy CrewAI Studio — No-Code Multi-Agent AI Builder on Railway

Self-host CrewAI Studio — build multi-agent AI teams, no code

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crewai-studio-multi-agent)

## About

CrewAI Studio is a no-code GUI for building and running multi-agent AI teams — a visual interface on top of CrewAI, the fastest-growing multi-agent framework. Define agents with roles, goals, and tools, assemble them into crews that collaborate on complex tasks, and run everything from your browser without writing Python. This template deploys CrewAI Studio with PostgreSQL and a persistent volume pre-wired, so your crews, agents, and results survive redeploys — the piece that breaks most containerized CrewAI setups.

---

CrewAI Studio is powerful and approachable, and one detail decides whether your work survives — this template handles it.

**Bring your own keys, build with no code.** CrewAI Studio is a visual layer over CrewAI: you add your own provider keys (OpenAI, Anthropic, Groq, Grok, Ollama, or LM Studio) and build agents and crews through the GUI — roles, goals, backstories, tools, and tasks — with no Python. You pay each provider directly and keep control of your keys.

**Persistence is the trap — and it's solved here.** CrewAI's default local storage is ephemeral inside a container, so a plain deployment loses your agents, crews, and results on every redeploy. This template wires CrewAI Studio to a PostgreSQL database with a persistent volume, so your definitions, tasks, and run history persist across redeploys, restarts, and crashes. This is the difference between a demo you rebuild each time and a workspace you actually keep.

**An OpenAI key is often needed for embeddings.** Even if your agents run on Anthropic, Groq, or another provider, many CrewAI tools use embeddings that default to OpenAI — so an `OPENAI_API_KEY` is commonly required alongside your primary provider. Set it to avoid tool errors, or configure an alternative embedding source if you're running fully local.

**Multiple providers, per-agent models.** Assign different models to different agents — a powerful model for your lead researcher, a cheaper, faster one for summarizers — mixing providers in one crew to balance quality and cost. Switching providers is a matter of keys and model strings, not code.

**Run crews in the background, export your work.** Crews can run threaded in the background and be stopped, and you can import/export crews as JSON or export a crew as a standalone single-page app — portable, not locked in.

**Secure the interface.** CrewAI Studio holds your provider keys and can execute tools, so keep the deployment access-controlled. Railway's automatic HTTPS encrypts the connection.

Typical cost: **~$10–15/month** on Railway for the Studio and Postgres, plus whatever you pay your LLM providers for agent runs. CrewAI Studio is open source and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| crewai-studio | `tham0nk/crewai-studio:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | crewai-studio | 8501 | - |
| `GOOGLE_API_KEY` | crewai-studio | (secret) | - |
| `OPENAI_API_KEY` | crewai-studio | (secret) | - |
| `ANTHROPIC_API_KEY` | crewai-studio | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/crewai-studio-multi-agent)
