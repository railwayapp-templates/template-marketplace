# Deploy sveltekit-hono-template on Railway

sveltekit with hono as api, builtin openapi doc generation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/O7COhP)

## About

This template is using bun as runtime

Navigate to {domain}/api/docs for the scalar openapi docs

No variables are needed for this template 

To add database orm, run `bunx sv add drizzle` to automatically add drizzle orm using svelte's cli

Look for lib/api-client.ts for the hono rpc file, checkout https://hono.dev/docs/guides/rpc#using-rpc-with-larger-applications to learn more about how to properly use hono rpc to make sure its typed properly

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sveltekit-hono-template | [TZGyn/sveltekit-hono-template](https://github.com/TZGyn/sveltekit-hono-template) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, HTML, Dockerfile, Svelte, JavaScript, CSS

[View on Railway →](https://railway.com/template/O7COhP)
