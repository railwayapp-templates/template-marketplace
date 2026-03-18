# Deploy Extract Chat - chat with firecrawl on Railway

Scrape anything with a simple chat  [powered by Firecrawl & OpenAI]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/UzxNSc)

## About

Extract.chat: AI Chatbot with Firecrawl Integration
Extract.chat is an AI-powered chatbot application that enables real-time data extraction and search capabilities through Firecrawl integration. This project is a fork of Vercel's AI Chatbot, enhanced with specialized tools for retrieving and analyzing information from websites.
Project Overview
Extract.chat combines the power of Next.js, AI SDK, and Firecrawl to create a versatile chatbot that can not only engage in conversations but also fetch and extract structured data from the web in real-time.
Short description (75 characters):
Web-enabled AI assistant that searches and extracts structured data from websites.
Key Features
Core Functionality

Firecrawl Integration: Search the web for information and extract structured data from multiple websites
Next.js App Router: Advanced routing with React Server Components (RSCs) and Server Actions
AI SDK Integration: Unified API for generating text, structured objects, and tool calls with LLMs
User Authentication: Secure login/registration system with anonymous access option
Document Creation: Generate and manipulate text, code, and spreadsheet documents

Technical Highlights

Data Persistence: PostgreSQL database integration for chat history and user data
File Storage: Vercel Blob support for efficient file handling
Responsive UI: Modern interface built with shadcn/ui and Tailwind CSS
Real-time Streaming: Server-sent events for responsive chat interactions

Architecture
The application follows a modern web architecture:

Frontend: React-based UI with Next.js App Router
Backend: Server-side functions for authentication, chat processing, and database operations
AI Integration: Connection to AI models via the AI SDK
Web Integration: Firecrawl API for searching and extracting data from websites
Database: Vercel Postgres for data persistence

Deployment Requirements
To deploy Extract.chat, you'll need:

Environment Variables:

OPENAI_API_KEY: API key for OpenAI
AUTH_SECRET: A secret for authentication
BLOB_READ_WRITE_TOKEN: Vercel Blob storage token
POSTGRES_URL: Connection string for Postgres database
FIRECRAWL_API_KEY: API key for Firecrawl service


Vercel Account: For hosting and database integration
Node.js environment: For local development

Getting Started

Clone the repository
Install dependencies: pnpm install
Set up environment variables in .env.local
Start the development server: pnpm dev

Customization Options

AI Model: Configured to use OpenAI gpt-4o by default, but can be switched to other providers
UI Appearance: Customizable with Tailwind CSS
Authentication Flow: Modifiable login/register processes

Use Cases

Research Assistant: Quickly gather information from multiple websites
Data Extraction: Pull structured data from web pages
Content Creation: Generate documents and code with AI assistance
Knowledge Base: Create and maintain a personal knowledge repository

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |
| http | `ghcr.io/ikatsuba/serverless-redis:latest` | Database |
| app | [chinpeerapat/extract-chat-T9si](https://github.com/chinpeerapat/extract-chat-T9si) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `SR_TOKEN` | http | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | http | true | - |
| `AUTH_SECRET` | app | (secret) | - |
| `OPENAI_API_KEY` | app | (secret) | - |
| `FIRECRAWL_API_KEY` | app | (secret) | sign up for an API key --> https://www.firecrawl.dev/referral?rid=KHWQEVPX |
| `UPSTASH_REDIS_REST_TOKEN` | app | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/template/UzxNSc)
