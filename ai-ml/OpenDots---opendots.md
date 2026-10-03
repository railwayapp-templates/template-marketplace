# Deploy OpenDots on Railway

OpenDots by CopilotKit: AI coworkers, pages, and private browsing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opendots)

## About

Run your own OpenDots workspace with AI coworkers, persistent Spaces and pages, chat, scheduled work, and read-only public-page browsing.

This template builds CopilotKit's OpenDots application and its browser service from the public [deployment repository](https://github.com/warengonzaga/opendots-railway). Its Dockerfile pins the upstream application to a specific commit. It generates the owner login token and private browser secret, connects the services over Railway's private network, and stores local application data on a persistent volume. Only the authenticated application receives a public URL.

OpenDots already runs its agents and scheduler in the application, and uses SQLite for local state. This template therefore needs two services and one volume; it does not need Postgres or a separate cron worker. Keep the app at one replica with serverless sleeping disabled.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Browser | [warengonzaga/opendots-railway](https://github.com/warengonzaga/opendots-railway) | Worker |
| OpenDots | [warengonzaga/opendots-railway](https://github.com/warengonzaga/opendots-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BROWSER_HOST` | Browser | :: | Listen on all interfaces for Railway private networking. |
| `BROWSER_PORT` | Browser | 4311 | Private browser service port; keep 4311 to match the app connection. |
| `BROWSER_SECRET` | Browser | (secret) | A fresh secret is generated for each deployment and shared with OpenDots automatically. |
| `OPENDOTS_SERVICE` | Browser | browser | Selects the browser image from the shared Dockerfile. Keep this set to browser. |
| `HOST` | OpenDots | :: | Listen on all interfaces so Railway can reach the application. |
| `PORT` | OpenDots | 4310 | Application port. Keep 4310 to match the public domain target. |
| `NODE_ENV` | OpenDots | production | Run OpenDots in production mode. |
| `OWNER_ID` | OpenDots | - | Stable owner identity derived from this Railway project. Keep it unchanged after deployment. |
| `APP_ORIGIN` | OpenDots | - | Public HTTPS origin used for request protection. Update this if you add a custom domain. |
| `BROWSER_URL` | OpenDots | - | Private address of the Browser service; configured automatically. |
| `OWNER_TOKEN` | OpenDots | (secret) | Generated owner login token. After deployment, copy this value from Variables to sign in; keep it private. |
| `OPENAI_MODEL` | OpenDots | gpt-6-luna | Preconfigured to GPT-6 Luna. No input needed; change only to use another model or provider. |
| `DATABASE_PATH` | OpenDots | /data/opendots.sqlite | SQLite database on the persistent /data volume. |
| `BROWSER_SECRET` | OpenDots | (secret) | References the Browser service secret automatically. |
| `OPENAI_API_KEY` | OpenDots | (secret) | Enter your model-provider API key. Each deployment uses its own credentials. |
| `OPENAI_BASE_URL` | OpenDots | https://api.openai.com/v1 | Preconfigured to the standard OpenAI endpoint. No input needed; change only when using another OpenAI-compatible provider. |
| `OPENDOTS_SERVICE` | OpenDots | app | Selects the app image from the shared Dockerfile. Keep this set to app. |
| `INTELLIGENCE_API_KEY` | OpenDots | (secret) | Enter your CopilotKit Intelligence project API key from intelligence.copilotkit.ai. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/opendots)
