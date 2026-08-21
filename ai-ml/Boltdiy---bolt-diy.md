# Deploy Bolt.diy on Railway

Chat with an AI to build and run web apps in your browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bolt-diy)

## About

bolt.diy is the open-source, MIT-licensed AI app builder from the StackBlitz Labs community — the self-hostable sibling of bolt.new. Describe an application in chat and it writes the code, installs the dependencies, runs the dev server and shows you the result, all inside a WebContainer in your own browser tab. Unlike hosted builders that lock you to one model and bill per token, it is provider-agnostic: Anthropic, OpenAI, Google, Groq, Mistral, DeepSeek, xAI, OpenRouter, Amazon Bedrock, any OpenAI-compatible endpoint, or a local Ollama or LM Studio server. You bring the key, so you pay the provider directly and nothing else. Developers use it to get from a sentence to a working React, Next.js, Astro or Svelte project in minutes, then keep editing in the file tree, terminal and diff viewer.

Self-host bolt.diy on Railway and you get two services. `boltdiy` runs the application and stays entirely on the private network. In front of it sits `auth-gateway`, a small Caddy reverse proxy that puts HTTP basic auth on every public request before passing it inward. That split is deliberate: bolt.diy ships no user accounts, and one of its routes will fetch any HTTPS URL it is handed so the browser can clone git repositories. Public and unguarded, it is an open forward proxy that also hands your model credits to whoever finds the URL. The gateway closes both holes with one username and one password, and everything else — chats, settings, keys, generated projects — lives in the visitor's browser, so there is nothing to back up.

![Diagram of the bolt.diy app behind its Caddy gateway on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787224657/bolt-diy-architecture.png)

bolt.diy is a Remix application served by Cloudflare's `workerd` runtime, and almost all the interesting work happens client-side. Generated projects execute in a WebContainer — a Node.js environment compiled to WebAssembly, running in the browser tab — so the container on Railway never compiles anyone's code and never stores a project. It is stateless, and a restart loses nothing.

Key features:

- Chat-driven code generation with an editable file tree, diff view and terminal
- Twenty-plus model providers, including local Ollama and LM Studio, selectable per chat
- Starter templates for React, Next.js, Astro, Svelte, Qwik, Remix, Vue and Expo
- Clone any public git repository, or import a folder or an earlier chat
- Publish finished projects to Netlify, Vercel or GitHub, and roll a chat back to any earlier version

The two services divide cleanly. `boltdiy` is the application; it holds no state and can be restarted at any time. `auth-gateway` is stock Caddy: it checks basic auth, forwards over the private network to `boltdiy:5173`, streams responses unbuffered so model output arrives token by token, and answers `/healthz` for the health check.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| auth-gateway | [gridalpha/bolt-diy-railway](https://github.com/gridalpha/bolt-diy-railway) | Web service |
| boltdiy | [gridalpha/bolt-diy-railway](https://github.com/gridalpha/bolt-diy-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | auth-gateway | 8080 | Port Caddy listens on |
| `BOLT_UPSTREAM` | auth-gateway | - | Private address of the app |
| `BOLT_AUTH_PASSWORD` | auth-gateway | (secret) | Password for the public URL |
| `BOLT_AUTH_USERNAME` | auth-gateway | (secret) | Username for the public URL |
| `PORT` | boltdiy | 5173 | Port the app listens on |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/health`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/bolt-diy)
