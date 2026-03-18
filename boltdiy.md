# Deploy Bolt DIY [Updated Mar ’26] on Railway

Bolt DIY [Mar ’26] (AI App/Web Builder, Lovable & V0 alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/boltdiy)

## About

Bolt DIY is an open-source, self-hostable experience inspired by bolt.new, an AI-assisted builder for rapid apps, sites, and internal tools. With **diy hosting**, you keep full control over your code, data, and infrastructure while enjoying a familiar “chat-to-build” workflow. A growing community around bolt.diy and bolt diy empowers you with templates, examples, and fast iteration, all without being locked into a single cloud.

With **diy hosting**, you can run self hosted bolt in your own environment and choose the stack, scale, and region that suit you. Railway makes bolt deployment simple: connect your repo, set environment variables, and ship. This approach keeps you flexible on bolt new hosting while retaining privacy and cost control. For teams exploring bolt new alternatives, self hosting on Railway offers predictable performance, quick rollbacks, and no vendor lock-in.

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

[View on Railway →](https://railway.com/template/boltdiy)
