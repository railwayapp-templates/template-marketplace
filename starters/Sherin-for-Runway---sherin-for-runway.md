# Deploy Sherin for Runway on Railway

Own key. Own domain. Own storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sherin-for-runway)

## About

Sherin is a self-hosted private creative workspace for one owner who wants their own key, domain, and storage for generative media. It ships with a dashboard for Studio, Gallery, References, Usage, and Profile, all gated by Supabase Google OAuth and a configured owner email.

Use it when you want a deployable workspace rather than a managed SaaS product. Sherin can run direct Runway or BabySea execution, stores generation records in Supabase Postgres, and lets you choose Supabase Storage, AWS S3, Cloudflare R2, or Vercel Blob for generated media and references.

The owner signs in through Supabase Google OAuth, and Sherin compares the account email with `OWNER_EMAIL` before allowing access to the dashboard. Once inside, the navigation exposes Studio, Gallery, References, Usage, and Profile as a private workspace tied to that deployment.

In Studio, the owner selects a model, writes a prompt, adjusts schema-aware fields, and attaches optional input images. Sherin validates the active provider configuration, stores the generation record and request metadata, uploads input assets when needed, then dispatches the job through Runway or BabySea provider path.

While a job is queued or running, the dashboard can kick the processing route so stale work continues without leaving the UI. References collects uploaded and URL-based input files from generation metadata, resolves their storage URLs, and keeps copyable reference links close to the creative workflow.

When the generation reaches a terminal state, Gallery displays the latest output, failed state, or unavailable asset state from the stored record. Usage and Profile complete the loop by showing inference provider status, storage provider status, queue activity, quota settings, and owner-visible deployment configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sherin-for-runway | [babysea-community/sherin-for-runway](https://github.com/babysea-community/sherin-for-runway) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CRON_SECRET` | (secret) |
| `BABYSEA_API_KEY` | (secret) |
| `STORAGE_PROVIDER` | supabase-storage |
| `SENTRY_AUTH_TOKEN` | (secret) |
| `INFERENCE_PROVIDER` | runway |
| `RUNWAYML_API_SECRET` | (secret) |
| `SUPABASE_SECRET_KEY` | (secret) |
| `BABYSEA_API_BASE_URL` | https://api.us.babysea.ai |
| `BLOB_READ_WRITE_TOKEN` | (secret) |
| `AWS_S3_SECRET_ACCESS_KEY` | (secret) |
| `CUSTOM_USER_STORAGE_QUOTA_GB` | 10 |
| `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | (secret) |

**Category:** Starters · **Languages:** TypeScript, JavaScript, PLpgSQL, CSS

[View on Railway →](https://railway.com/deploy/sherin-for-runway)
