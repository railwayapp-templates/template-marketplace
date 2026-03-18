# Deploy DENO EDGE RUNTIME FOR SUPABASE on Railway

Deploy and Host DENO EDGE RUNTIME  for SUPABASE with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/edge-runtime)

## About

Supabase Edge Runtime is a lightweight, serverless environment optimized for edge function execution. This template provides a ready-to-deploy setup using the official Docker image `ghcr.io/supabase/edge-runtime`, allowing you to host and scale your Supabase Edge Functions effortlessly via Railway.

This project enables deployment of Supabase Edge Functions on Railway using a custom Dockerfile and a lightweight runtime based on Deno. With built-in support for webhooks, REST endpoints, and Supabase integration, it's ideal for serverless API logic or background processing tasks. Hosting on Railway ensures fast builds, automatic domain generation, environment variable management, and scalability without server management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| public_edge_runtime | [theseedship/public_edge_runtime](https://github.com/theseedship/public_edge_runtime) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | :: |
| `PORT` | 9000 |
| `EDGE_FUNCTION_SECRET` | (secret) |

**Category:** Storage · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/edge-runtime)
