# Deploy BabyChain on Railway

Every output becomes the next input.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/babychain)

## About

BabyChain is a self-hosted API starter for chaining image and video generation steps into one durable run. Its built-in `chain` template supports `text-to-image` into `image-to-video`, `image-to-image` into `image-to-video`, and optional image refinement before final video output.

Use it when you want callers to submit one request, let each model output become the next model input, and receive one signed final callback. The starter runs on Next.js with Supabase-backed run state, BabySea SDK execution, direct BYOK execution for Alibaba Cloud, Black Forest Labs, and BytePlus, or mock mode for deterministic local runs without inference provider keys.

A caller starts in the API surface by listing available templates, inspecting model schemas, or posting to `POST /api/v1/chains/runs` with `Authorization: Bearer BABYCHAIN_API_KEY`. BabyChain uses one `chain` template and caller-selected models to decide whether the run starts from text, an uploaded image, or an optional refinement step.

The create-run route validates the input against the template schema, rejects credential-like request fields, checks safe HTTPS input files, estimates the selected steps, stores the run and step records in Supabase, and returns the public run resource immediately. The returned resource includes `steps` plus a compact `timeline` array for ordered status display.

The processor resumes queued work through the server runner. For each ready step, it resolves the selected model, chooses BabySea, BYOK, or mock provider execution, starts or polls the generation, stores provider metadata needed for recovery, and injects each successful output URL into the dependent input for the next step.

After every step reaches a terminal state, the run presenter returns one caller-facing resource with step details, final output references, and timeline events. The callback worker sends the same signed JSON payload to the configured webhook URL, while API consumers can still retrieve or cancel runs without coordinating individual provider jobs themselves.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| babychain | [babysea-community/babychain](https://github.com/babysea-community/babychain) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BFL_REGION` | global |
| `ARK_API_KEY` | (secret) |
| `BFL_API_KEY` | (secret) |
| `BABYSEA_REGION` | us |
| `BABYSEA_API_KEY` | (secret) |
| `BFL_API_BASE_URL` | https://api.bfl.ai/v1 |
| `BABYCHAIN_API_KEY` | (secret) |
| `SENTRY_AUTH_TOKEN` | (secret) |
| `SUPABASE_SECRET_KEY` | (secret) |
| `BABYSEA_API_BASE_URL` | https://api.us.babysea.ai |
| `BABYCHAIN_CRON_SECRET` | (secret) |
| `BABYSEA_WEBHOOK_SECRET` | (secret) |
| `UPSTASH_REDIS_REST_TOKEN` | (secret) |
| `BABYCHAIN_CALLBACK_SECRET` | (secret) |

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, PLpgSQL, CSS

[View on Railway →](https://railway.com/deploy/babychain)
