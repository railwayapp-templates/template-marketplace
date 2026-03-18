# Deploy consultralph on Railway

ConsultRalph - AI autonomous agent for consultants

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/passionate-abundance)

## About

Consult Ralph is an autonomous deep research AI agent for consultants. It generates comprehensive due diligence reports, market analyses, competitive landscapes, and strategic insights in minutes. It can also run multiple research tasks simultaneously, like a swarm of agents completing in minutes what would normally take days or weeks or months.

It's very important that you sign up on [Valyu AI](https://platform.valyu.ai/auth) and get an API key for ConsultRalph to work as expected.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| consultralph | [unicodeveloper/consultralph](https://github.com/unicodeveloper/consultralph) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `VALYU_API_KEY` | (secret) | This is the API key for Valyu.  Get your API key at https://valyu.ai |
| `VALYU_APP_URL` | https://platform.valyu.ai | Valyu Platform URL (for user info and proxy) |
| `NEXT_PUBLIC_APP_MODE` | self-hosted | The self-hosted mode of ConsultRalph |
| `NEXT_PUBLIC_ENTERPRISE` | false | - |
| `NEXT_PUBLIC_VALYU_AUTH_URL` | https://auth.valyu.ai | - |

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/passionate-abundance)
