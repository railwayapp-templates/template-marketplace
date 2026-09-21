# Deploy Smart Marking on Railway

AI marking for scripts and Computing files, teacher-checked before release

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/smart-marking-1)

## About

**📘 Smart Marking Setup Guide** — step by step with screenshots of the real app: [read online](https://claude.ai/artifact/Fu6LVAMCYYxg2fPb3oFsFw) · [download the PDF](https://github.com/twahidin/smart-marking-system/raw/main/docs/setup-guide/Smart-Marking-Setup-Guide.pdf) · [on GitHub](https://github.com/twahidin/smart-marking-system/blob/main/docs/setup-guide/README.md)

Smart Marking marks handwritten scripts that students photograph or scan, against **your** mark scheme (maths/science) or rubric (essays). An extractor reads the pages, a marker awards each allocation or band, and an independent reviewer checks it; anything illegible, out of scheme or disputed lands in a **Review** queue for the teacher. Students hand in from their phone with a class code and register number; feedback is shown only after the teacher releases it. Computing classes can hand in Python, Scratch and Excel files (alone or with photos), marked by reading them — never running them; Mother Tongue scripts (Chinese, Malay, Tamil) get feedback in the script's language. Bring your own LLM key (TokenRouter, OpenRouter, OpenAI, Anthropic, Moonshot, Qwen or Google Gemini), with a default model per subject.

The template deploys two services: `web` (FastAPI + React, built from the Dockerfile, with the marking worker embedded) and `Postgres` (assignments, classes, marks and settings; API keys are encrypted at rest with the generated `SECRET_KEY`). Page images live on a volume mounted at `/data` and are deleted after marking by default, so storage stays small. After the deploy finishes, open the `web` domain, sign in with `TEACHER_PASSWORD` (generated — read it from the service's Variables, or set your own before deploying), go to **Settings** to paste a provider key and pick a model, then create an assignment and a class. No student accounts or passwords are needed: students use the class link and their register number. Everything runs inside your Railway project; scripts never leave it except for the model calls you configure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [twahidin/smart-marking-system](https://github.com/twahidin/smart-marking-system) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | web | 8000 | Port the app listens on; must match the service's public HTTP port (8000). |
| `LLM_MODEL` | web | - | Optional. Model id for LLM_PROVIDER; leave blank for the provider's default (pick one under Settings later). |
| `SECRET_KEY` | web | (secret) | Generated. Signs teacher/student sessions and encrypts stored API keys — changing it later signs everyone out and needs keys re-entered. |
| `LLM_API_KEY` | web | (secret) | Optional. API key for LLM_PROVIDER. Leave blank and paste it under Settings after signing in (keys are stored encrypted, one per provider). |
| `STORAGE_DIR` | web | /data | Where page images are stored; must be the volume mount path (/data). Pages are deleted after marking by default. |
| `DATABASE_URL` | web | - | Connection string of the Postgres service in this template (reference variable — leave as is). |
| `LLM_PROVIDER` | web | tokenrouter | One of: tokenrouter, openrouter, openai, anthropic, moonshot, qwen, google. You can change provider and key any time under Settings. |
| `TEACHER_PASSWORD` | web | (secret) | The password teachers use to sign in. A random one is generated; replace it with your own here, or read it later from the service's Variables. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, TypeScript, CSS, Dockerfile, Mako, HTML

[View on Railway →](https://railway.com/deploy/smart-marking-1)
