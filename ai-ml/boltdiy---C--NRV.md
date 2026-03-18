# Deploy bolt.diy on Railway

AI-Powered Full-Stack Web Development in the Browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/C--NRV)

## About

### Bolt.new - AI-Powered Full-Stack Web Development
TLDR: Build complete websites/apps by chatting with AI assistnat - no coding experience needed.


### What is Bolt.new?
Imagine having a smart coding assistant that understands plain English and can build websites for you right in your browser. That's Bolt.new! No need to install anything on your computer - just open your browser, tell it what you want to build, and watch it happen.

### Core Features Explained Simply

### 📝 Talk to Build
- Just describe what you want to build in plain English
- The AI understands and creates the code for you
- Need changes? Simply ask, and it will modify the code

### 🔧 Everything Happens in Your Browser
- No complicated setup needed
- See your website come to life instantly
- Make changes and watch them update in real-time
- Share your work with others using a simple link

### 🚀 Complete Website Building
- Creates both what users see (frontend) and how it works (backend)
- Can add features like user login, databases, and more
- Installs all necessary tools automatically
- Can put your website online with one click

## ⭐ What's Enhanced in This Version?
- **No Limits**: Use it as much as you want without restrictions
- **Multiple AI Options**: Choose from OpenAI, Anthropic, Groq, Gemini, OpenRouter, or Ollama
- **Quick Setup**: Just add your preferred AI service key and start building

## Who Is It For?
- Beginners learning to code
- Anyone wanting to build websites quickly
- Developers trying out new ideas
- Teams needing quick website prototypes

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/stackblitz-labs/bolt.diy` | Web service |

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

[View on Railway →](https://railway.com/deploy/C--NRV)
