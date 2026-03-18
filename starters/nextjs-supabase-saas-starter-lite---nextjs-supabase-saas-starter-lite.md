# Deploy nextjs-supabase-saas-starter-lite on Railway

Lite version of the Makerkit Next.js Supabase kit

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nextjs-supabase-saas-starter-lite)

## About

This is the lite version of the [Makerkit SaaS Starter Kit](https://makerkit.dev) built with Next.js and Supabase.

Besides deploying the Next.js application on Railway, please make sure to create a Supabase project and connect it to this template via the following variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [makerkit/nextjs-saas-starter-kit-lite](https://github.com/makerkit/nextjs-saas-starter-kit-lite) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `NEXT_PUBLIC_SITE_URL` | The URL to your website including the protocol |
| `NEXT_PUBLIC_SITE_TITLE` | The <title> tag |
| `NEXT_PUBLIC_PRODUCT_NAME` | Your product name |
| `NEXT_PUBLIC_SUPABASE_URL` | The public URL of your Supabase instance |
| `SUPABASE_SERVICE_ROLE_KEY` | The secret key or service role key of your Supabase instance |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | The description of your product |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The public key or anon key of your Supabase instance |

## Configuration

- **Start command:** `pnpm run --filter=web start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, HTML, JavaScript, CSS, PLpgSQL, Handlebars

[View on Railway →](https://railway.com/template/nextjs-supabase-saas-starter-lite)
