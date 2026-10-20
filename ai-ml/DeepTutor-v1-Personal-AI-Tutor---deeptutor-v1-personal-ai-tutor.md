# Deploy DeepTutor v1 Personal AI Tutor on Railway

Personalized AI tutoring over your own documents, with quizzes and notes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deeptutor-v1-personal-ai-tutor)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deeptutor-v1-personal-ai-tutor?referralCode=20H68q)

DeepTutor is an open-source (Apache-2.0) AI tutor from HKU's Data Intelligence Lab. Upload your own textbooks and notes, then learn from them: ask questions with citations, generate quizzes, follow guided learning paths and keep notebooks. This community template runs DeepTutor v1.6.15 on Railway behind one HTTPS URL with a protected login.

DeepTutor ships as one container that runs a FastAPI backend and a Next.js web app under supervisord, with all settings, accounts, knowledge bases and notes in one data folder. Hosting it well means pinning the image, putting that folder on a volume, keeping login on because the app holds your provider keys, and configuring it through its JSON settings files, which the image reads instead of environment variables. This template writes those settings from Railway variables on every start: it creates the admin account from a generated password, connects Redis for turn coordination with two API workers, keeps the API on loopback behind the web app, and can pre-select your LLM and embedding provider.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DeepTutor | [baranberkay96/deeptutor-railway](https://github.com/baranberkay96/deeptutor-railway) (branch: main) (root: /services/deeptutor) | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | DeepTutor | UTC | Time zone for the backend and frontend (e.g. Europe/Istanbul). |
| `PORT` | DeepTutor | 3782 | Port of the Next.js web app (0.0.0.0). Railway routes the public domain and the /api/auth/status healthcheck here; the app proxies /api and /ws to the API on 127.0.0.1:8001. |
| `LLM_MODEL` | DeepTutor | gpt-5-mini | Model id on that provider (e.g. gpt-5-mini, claude-sonnet-4-5, gemini-2.5-flash). |
| `LLM_API_KEY` | DeepTutor | (secret) | Optional, recommended. Chat model API key. When set, a 'Railway' provider profile is created and selected on boot. You can instead add providers in Settings after login. |
| `LLM_BINDING` | DeepTutor | openai | DeepTutor provider id for LLM_API_KEY, e.g. openai, anthropic, gemini, deepseek, openrouter, groq, mistral. |
| `BACKEND_HOST` | DeepTutor | 127.0.0.1 | Bind address of the FastAPI backend. Loopback only: the browser reaches it through the web app's proxy, never directly. |
| `LLM_BASE_URL` | DeepTutor | - | Optional. API base URL; empty uses the provider's default (e.g. https://api.openai.com/v1). |
| `EMBEDDING_MODEL` | DeepTutor | text-embedding-3-small | Embedding model id used for new knowledge bases. |
| `DEEPTUTOR_EXTRAS` | DeepTutor | - | Optional upstream extras installed on every start, comma-separated (e.g. parse-markitdown, rag-lightrag). Slows boot; the pip cache is kept on the volume. |
| `DEEPTUTOR_WORKERS` | DeepTutor | 2 | API worker processes (1-8). More than 1 needs Redis; the start script falls back to 1 if Redis is unreachable. Each worker adds roughly 0.4-0.6 GB RAM. |
| `EMBEDDING_API_KEY` | DeepTutor | (secret) | Optional. Embedding API key. Empty: reuses LLM_API_KEY (and LLM_BASE_URL) when EMBEDDING_BINDING equals LLM_BINDING. Knowledge bases need an embedding model. |
| `EMBEDDING_BINDING` | DeepTutor | openai | Embedding provider id for knowledge bases (openai, gemini, cohere, jina, siliconflow, ...). |
| `EMBEDDING_BASE_URL` | DeepTutor | - | Optional. Embedding endpoint; empty uses LLM_BASE_URL when the LLM key is reused, otherwise the provider's default. |
| `DEEPTUTOR_REDIS_URL` | DeepTutor | - | Private Redis URL for DeepTutor's turn coordination (event streams, leases, multi-worker mode). |
| `EMBEDDING_DIMENSION` | DeepTutor | - | Optional. Vector size. Empty: 1536/3072 for OpenAI text-embedding-3-small/-large, otherwise the provider's default. |
| `DEEPTUTOR_APT_PACKAGES` | DeepTutor | - | Optional Debian packages installed on every start, comma-separated (e.g. ffmpeg). |
| `DEEPTUTOR_CORS_ORIGINS` | DeepTutor | - | Allowed browser origins for the API, comma-separated. Add your custom domain here if you attach one. |
| `DEEPTUTOR_ADMIN_PASSWORD` | DeepTutor | (secret) | Admin password, generated at deploy (min. 12 characters). Login is always required; the public sign-up page stays closed. To rotate, change it here and redeploy. |
| `DEEPTUTOR_ADMIN_USERNAME` | DeepTutor | (secret) | Username of the admin account (3-64 letters, digits, '.', '_' or '-', or an email). |
| `DEEPTUTOR_ALLOW_CODE_EXEC` | DeepTutor | false | Keep false unless you need it. true lets admins' chats run model-written code (office-file skills, code answers) as a restricted subprocess inside this container, which can read the app's data and keys. Railway has no Docker sandbox. |
| `DEEPTUTOR_REDIS_WAIT_SECONDS` | DeepTutor | 300 | How long the start script waits for Redis before starting with 1 in-memory worker instead. |
| `DEEPTUTOR_TOKEN_EXPIRE_HOURS` | DeepTutor | (secret) | How long a login stays valid, in hours (upstream default 24). |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |

## Configuration

- **Healthcheck:** `/api/auth/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --appendonly yes --appendfsync everysec --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML · **Tags:** deeptutor, ai-tutor, education, learning, rag · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/deeptutor-v1-personal-ai-tutor)
