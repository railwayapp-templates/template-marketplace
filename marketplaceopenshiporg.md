# Deploy marketplace.openship.org on Railway

Deploy and Host marketplace.openship.org with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/marketplaceopenshiporg)

## About

A conversational commerce marketplace where shopping happens entirely in AI chat. Products, cart, checkout, and payment are all rendered in the conversation via MCP UI. Zero transaction fees. Zero data collection. Complete store independence. Merchants keep 100% of revenue while getting discovered through curated directories.

The marketplace is a Next.js 15 application built on Model Context Protocol (MCP) that enables conversational shopping without centralized infrastructure. It queries independent e-commerce stores in real-time, renders interactive product cards and checkout flows directly in AI chat, and routes payments straight to each store's Stripe or PayPal account. No database required—everything happens through API queries to stores configured in `marketplace.config.json`. Hosting on Railway means forking the repo, adding your curated stores, and deploying a zero-fee discovery platform where merchants own their data and customers shop through natural conversation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| marketplace | [openshiporg/marketplace](https://github.com/openshiporg/marketplace) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/template/marketplaceopenshiporg)
