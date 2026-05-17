# Deploy Steel Trader — Inventory Management on Railway

Deploy and Host Steel Trader — Inventory Management with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/steel-trader-inventory-management)

## About

Steel Trader is a full-stack inventory and order management system for SMBs — steel traders, building material distributors, and commodity businesses. Track purchase orders, manage stock lots by receipt, process sales with partial dispatches, and control team access with role-based permissions. Built on FastAPI + React + Tailwind CSS.

Hosting Steel Trader on Railway deploys two services from a single repository: a Python FastAPI backend and a React + Vite frontend. The backend handles all business logic — purchase and sale order lifecycle, stock lot tracking, JWT authentication — and connects to either a Railway PostgreSQL addon (recommended for production) or SQLite (zero-config for demos). The frontend is a static React app served via npx serve. On first boot, the backend automatically creates the database schema and seeds an admin user using environment variables you configure. No manual database migrations or shell access required — Railway handles the entire build and deployment pipeline.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| steel-trader-railway-template | [Ankitgelda8/steel-trader-railway-template](https://github.com/Ankitgelda8/steel-trader-railway-template) | Worker |

**Category:** Other · **Languages:** TypeScript, Python, Shell, JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/steel-trader-inventory-management)
