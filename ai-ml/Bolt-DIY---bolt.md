# Deploy Bolt DIY on Railway

[Updated May '26] Deploy and Host Bolt DIY with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bolt)

## About

**What is Bolt?**  
Bolt.diy is an open-source, browser-based platform for AI-powered full-stack web development. It allows developers to harness advanced Large Language Models (LLMs)—like OpenAI, Anthropic, Gemini, Ollama, Mistral, and more—to code, compile, edit, and deploy applications directly from the browser, removing the need for cumbersome server setups or cloud dependencies. The platform is highly customizable and community-driven, offering deep control to technical users.

Hosting Bolt.diy on Railway involves deploying the platform using Railway’s infrastructure-as-a-service, which makes the setup both fast and scalable. With Railway, you can launch a Bolt.diy instance from an official template with just a few clicks. Railway manages the underlying infrastructure, so you simply configure Bolt.diy’s environment variables such as LLM API keys, customize provider settings, and follow the live deployment log. Once deployed, you access your instance via a unique URL, ready for seamless AI-assisted coding and collaboration—no local server setup or complex environment management required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bolt Docker | `minixxie/bolt-diy:85d864f607d7778d759582e464ea478a4b6ed2cc` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5173 |
| `NODE_ENV` | development |
| `XAI_API_KEY` | (secret) |
| `GROQ_API_KEY` | (secret) |
| `VITE_HMR_HOST` | 0.0.0.0 |
| `VITE_HMR_PORT` | 5173 |
| `OPENAI_API_KEY` | (secret) |
| `VITE_LOG_LEVEL` | debug |
| `DEFAULT_NUM_CTX` | 32768 |
| `TOGETHER_API_KEY` | (secret) |
| `ANTHROPIC_API_KEY` | (secret) |
| `RUNNING_IN_DOCKER` | true |
| `VITE_HMR_PROTOCOL` | ws |
| `WATCHPACK_POLLING` | true |
| `CHOKIDAR_USEPOLLING` | true |
| `HuggingFace_API_KEY` | (secret) |
| `OPEN_ROUTER_API_KEY` | (secret) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bolt)
