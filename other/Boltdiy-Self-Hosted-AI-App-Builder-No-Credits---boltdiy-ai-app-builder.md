# Deploy Bolt.diy — Self-Hosted AI App Builder, No Credits on Railway

Self-host Bolt.diy: AI app builder, any LLM, your own key. No credits.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/boltdiy-ai-app-builder)

## About

![Bolt.diy AI app builder interface](https://res.cloudinary.com/dh2nt6hgh/image/upload/v1758194283/Bolt_DIY_Dashboard_nmorfl.png)

Bolt.diy is the open-source, self-hostable version of Bolt.new — an AI full-stack app builder
that writes, runs, and previews web apps live in your browser. Describe what you want and it
generates the code, installs the dependencies, runs it in an in-browser WebContainer, and shows
you the result — then you edit by chatting. Bring your own model: OpenAI, Anthropic Claude,
Google Gemini, Groq, Mistral, Ollama, and more.

**Hosted AI app builders meter you on message credits.** Bolt.new, Lovable, and v0 all charge
per generation and cap you by plan. Bolt.diy on Railway uses *your* API key — pay only for the
tokens you actually use, with no per-message credits and no monthly builder subscription.

---

Bolt.diy (the community fork of StackBlitz's Bolt.new) lets you use any LLM instead of being
locked to one provider, and self-hosting means your prompts, generated code, and API keys stay
on infrastructure you control. Running it means serving the app, wiring an API key for each
provider you want available, and giving it a public HTTPS endpoint.

Railway handles the hosting and HTTPS automatically. Add your provider API keys as Railway
Variables — only the providers you configure appear in the model picker — and the app is live
at your Railway domain.

Typical cost: **~$5–10/month** on Railway's Hobby plan for the app itself, plus whatever your
chosen LLM charges per token. Groq and Gemini offer free API tiers, and local Ollama is free —
so your per-generation model cost can be zero while hosted builders keep charging credits.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bolt Docker | `minixxie/bolt-diy:85d864f607d7778d759582e464ea478a4b6ed2cc` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5173 |
| `NODE_ENV` | development |
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
| `GOOGLE_GENERATIVE_AI_API_KEY` | (secret) |

**Category:** Other

[View on Railway →](https://railway.com/deploy/boltdiy-ai-app-builder)
