# Deploy AI Chatbot on Railway

A full-featured, hackable Next.js AI chatbot. xAI, Groq

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Kd2GIJ)

## About

## Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://sdk.vercel.ai/docs)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports xAI (default), and other model providers
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - Postgres
  - [Vercel Blob](https://vercel.com/storage/blob) for efficient file storage
- [NextAuth.js](https://github.com/nextauthjs/next-auth)
  - Simple and secure authentication

## Model Providers

This template ships with [xAI](https://x.ai) `grok-2-1212` as the default chat model.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ai-chatbot | [IKatsuba/ai-chatbot](https://github.com/IKatsuba/ai-chatbot) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `AUTH_SECRET` | ai-chatbot | (secret) |
| `XAI_API_KEY` | ai-chatbot | (secret) |
| `GROQ_API_KEY` | ai-chatbot | (secret) |
| `AUTH_TRUST_HOST` | ai-chatbot | true |
| `BLOB_READ_WRITE_TOKEN` | ai-chatbot | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/Kd2GIJ)
