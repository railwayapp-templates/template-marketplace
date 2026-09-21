# Deploy Typesense Helpdesk on Railway

search tickets, macros, and FAQs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-helpdesk)

## About

The moment an agent types "refund" and Typesense corrects it before the word finishes, you understand why helpdesk search matters. Most ticketing systems offer exact-match search that returns nothing for "passwrd reset." Typesense Helpdesk is a self-hosted search layer for tickets, macros, KB FAQs, and agent replies with typo tolerance, sub-50ms latency, and zero per-search billing.

Support teams feel broken search daily: agents retype queries, duplicate tickets because the old one didn't surface, and write new macros because nobody found the existing one. Built-in helpdesk search is often a database LIKE query or a metered index.

Typesense Helpdesk flips that. Deploy one Typesense node on Railway, point it at ticket exports, macro libraries, and KB articles, and get typo-tolerant instant search across all of it. It's GPL-3.0 open source. No API request metering, no records-stored line item. Just a container with an in-memory index.

Railway handles provisioning, persistent volume for /data, exposing port 8108, and health checks. You bring data and schema.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense-railway | [Shinyduo/typesense-railway](https://github.com/Shinyduo/typesense-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | PORT |
| `TYPESENSE_URL` | - | TYPESENSE_URL |
| `TYPESENSE_API_KEY` | (secret) | TYPESENSE_API_KEY |
| `TYPESENSE_DATA_DIR` | - | TYPESENSE_DATA_DIR |
| `TYPESENSE_PUBLIC_URL` | - | TYPESENSE_PUBLIC_URL |
| `TYPESENSE_THREAD_POOL_SIZE` | 64 | TYPESENSE_THREAD_POOL_SIZE |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | 32 | TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/typesense-helpdesk)
