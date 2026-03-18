# Deploy caddy-reverse-proxy on Railway

Provides a basic Caddy reverse proxy setup for your Railway project.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/SmE0Jg)

## About

### **Template Overview**  
**Features:**  
✅ **Reverse Proxy** – Routes traffic to your backend service (e.g., Node.js, Python, Go).  
✅ **Automatic HTTPS** – Caddy handles SSL certificates automatically.  
✅ **Minimal Config** – Easy-to-understand Caddyfile for quick deployment.  
✅ **Port Flexibility** – Proxies requests from `:80` (HTTP) and `:443` (HTTPS) to your app's internal port.  

**Usage:**  
1. Deploy to Railway.  
2. Replace `your-app.up.railway.app` with your Railway domain.  
3. Adjust `${PORT}` if your app uses a different internal port.  

Ideal for **single-container setups** where you need a simple, secure reverse proxy without manual certificate management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| caddy-reverse-proxy | [ali-eljerrari/caddy-reverse-proxy](https://github.com/ali-eljerrari/caddy-reverse-proxy) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/SmE0Jg)
