# Deploy n8n Starter on Railway

[May '26] The cheapest n8n instance. Period.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-starter-1)

## About

**n8n** (pronounced “n-eight-n”) is a powerful, open-source automation tool that lets you build workflows visually, connecting APIs, services, and databases without writing full-blown code.

With this n8n starter kit, you can deploy and **host n8n in one click**.  It’s built for **beginners, makers, and hobbyists** who want a **quick, cost-effective, and hassle-free** way to explore workflow automation or prototype data-driven systems without spending hours on setup.

This setup comes fully pre-configured — just click **Deploy** and your **n8n** instance deploys instantly on Railway. No linking, no setup, no extra steps.  


It comes with two key environment variables already set up for you:

- **Port (`N8N_PORT`)** – The HTTP port n8n runs on. Default: `5678`. You can leave it as-is in most cases.
- **Webhook URL (`WEBHOOK_URL`)** – The public URL where n8n receives webhook requests. Railway automatically provides this, but you can manually set it if you’re using a custom domain or proxy.

These settings make it **really simple to get started** — just deploy and start using n8n right away. No complex setup required.

By skipping the need for a full database or Redis, this deployment stays **lightweight and cost-effective**, ideal for small workflows, experiments, or just exploring automation for the first time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5678 | The HTTP port on which n8n will run. Default is 5678. Change only if it conflicts with another service. |
| `WEBHOOK_URL` | - | Public URL where n8n will receive webhook requests. Automatically set if using Railway’s deployment URL, or manually provide it if behind a proxy. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-starter-1)
