# Deploy WooCommerce ChatGPT App on Railway

Deploy ChatGPT App for WooCommerce. Show your products catalog in ChatGPT.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/woocommerce-chatgpt-app)

## About

Start selling your WooCommerce store items on ChatGPT with 800 million monthly active users! This app integrates your WooCommerce store with ChatGPT using the OpenAI Apps SDK, allowing users to browse and discover your products directly within ChatGPT conversations. Perfect for reaching a massive audience and driving traffic to your store.

This template deploys a Node.js application that connects your WooCommerce store to ChatGPT via the Model Context Protocol (MCP). Users configure WooCommerce REST API credentials as environment variables, and Railway handles the hosting infrastructure. The app serves as a bridge, fetching product data from WooCommerce and presenting it in ChatGPT conversations. Supports product search, category filtering, stock checking, and displays images, prices, and descriptions with direct links back to your store for checkout.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| woocommerce-chatgpt-app | [techspawn/woocommerce-chatgpt-app](https://github.com/techspawn/woocommerce-chatgpt-app) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `WC_CONSUMER_SECRET` | (secret) |

**Category:** Other · **Languages:** TypeScript, Shell, HTML

[View on Railway →](https://railway.com/deploy/woocommerce-chatgpt-app)
