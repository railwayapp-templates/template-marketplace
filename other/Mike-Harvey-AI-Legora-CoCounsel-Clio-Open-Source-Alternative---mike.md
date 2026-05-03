# Deploy Mike | Harvey AI, Legora, CoCounsel, Clio Open Source Alternative on Railway

Mike [May '26] (AI Legal Document Analysis & Contract Review) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mike)

## About

Mike is an open-source AI legal platform that replicates the core capabilities of Harvey AI ($11B) and Legora ($5.5B) at zero cost. It features AI-powered document analysis, verbatim citation with source pages, contract drafting, tabular review for extracting data from hundreds of documents, multi-step legal workflows, and project management. It supports Claude and Gemini as LLM providers. Mike is a self-hosted alternative to Harvey AI, Legora, CoCounsel, and Clio.

Self hosting Mike means your legal documents, client data, and API keys stay on infrastructure you control. Attorney-client privilege is preserved because documents never transit through third-party AI vendor servers. With Railway, the full stack deploys automatically - frontend, backend, Supabase auth, PostgREST, Kong gateway, PostgreSQL, and S3 storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| supabase-auth | `supabase/gotrue:v2.180.0` | Database |
| supabase-kong | [Shinyduo/mike-kong](https://github.com/Shinyduo/mike-kong) | Web service |
| mike-frontend | [Shinyduo/mike-frontend](https://github.com/Shinyduo/mike-frontend) | Web service |
| mike-db | [Shinyduo/mike-db](https://github.com/Shinyduo/mike-db) | Database |
| supabase-rest | `postgrest/postgrest:v13.0.7` | Database |
| mike-backend | [Shinyduo/mike](https://github.com/Shinyduo/mike) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | supabase-auth | 9999 | - |
| `GOTRUE_JWT_EXP` | supabase-auth | 3600 | - |
| `GOTRUE_API_HOST` | supabase-auth | 0.0.0.0 | - |
| `GOTRUE_DB_DRIVER` | supabase-auth | postgres | - |
| `GOTRUE_JWT_SECRET` | supabase-auth | (secret) | - |
| `GOTRUE_DISABLE_SIGNUP` | supabase-auth | false | - |
| `GOTRUE_MAILER_AUTOCONFIRM` | supabase-auth | true | - |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | supabase-auth | true | - |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | supabase-auth | authenticated | - |
| `PORT` | supabase-kong | 8000 | - |
| `PORT` | mike-frontend | 3000 | - |
| `SUPABASE_SECRET_KEY` | mike-frontend | (secret) | - |
| `PORT` | mike-db | 5432 | - |
| `ANON_KEY` | mike-db | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzM1Njg5NjAwLCJleHAiOjQxMDI0NDQ4MDB9.HkNglV1-w8AXJF4mnTOcFr-2gPVjKReH2oGJPnL5Z-w | - |
| `JWT_SECRET` | mike-db | (secret) | - |
| `POSTGRES_DB` | mike-db | railway | - |
| `SERVICE_KEY` | mike-db | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3MzU2ODk2MDAsImV4cCI6NDEwMjQ0NDgwMH0.g7sUd1YF1GGJAFG9c_EI7NR_CWJ4dawlNtRjUbR4Kjo | - |
| `POSTGRES_PASSWORD` | mike-db | (secret) | - |
| `PORT` | supabase-rest | 3000 | - |
| `PGRST_DB_SCHEMAS` | supabase-rest | public | - |
| `PGRST_JWT_SECRET` | supabase-rest | (secret) | - |
| `PGRST_DB_ANON_ROLE` | supabase-rest | anon | - |
| `PGRST_DB_CHANNEL_ENABLED` | supabase-rest | true | - |
| `PGRST_DB_USE_LEGACY_GUCS` | supabase-rest | false | - |
| `PORT` | mike-backend | 3001 | - |
| `GEMINI_API_KEY` | mike-backend | (secret) | Use either Gemini or Anthropic Key. If using Anthropic, enter random placeholder here |
| `ANTHROPIC_API_KEY` | mike-backend | (secret) | - |
| `SUPABASE_SECRET_KEY` | mike-backend | (secret) | - |
| `R2_SECRET_ACCESS_KEY` | mike-backend | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/mike)
