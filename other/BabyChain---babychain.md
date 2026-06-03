# Deploy BabyChain on Railway

Every output becomes the next input.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/babychain)

## About

BabyChain is an API-first starter for chaining image and video generation steps into one durable run. It exposes chain templates for `text-to-image` into `image-to-video`, `image-to-image` into `image-to-video`, and three-step image transformation flows before final video output.

Use it when you want callers to submit one request, let each model output become the next model input, and receive one signed final callback. The starter supports BabySea mode or BYOK mode with server-side Black Forest Labs and BytePlus credentials, while Supabase stores runs, steps, callbacks, and API-key state.

A caller starts in the API surface by listing available templates or posting to a specific chain route with `Authorization: Bearer BABYCHAIN_API_KEY`. BabyChain validates the chain input against the template schema, rejects credential-like request fields, checks safe HTTPS input files, estimates the run, stores the run and step records in Supabase, and returns the public run resource immediately.

The processor resumes queued work through the server runner. For each ready step, it resolves the selected model, chooses BabySea or BYOK provider execution, starts the generation, and records provider metadata needed to poll without exposing provider secrets to the caller.

When a step succeeds, BabyChain reads the output file URL and injects it into the dependent input for the next step. That is how a `text-to-image` result becomes an `image-to-video` source, or how a generated image is restyled before final video creation in the three-step chain.

After every step reaches a terminal state, the run presenter returns a single caller-facing resource and the callback worker sends one signed JSON payload to the configured webhook URL. API consumers can still retrieve or cancel runs, but they do not need to coordinate individual provider jobs themselves.

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

**Category:** Other · **Languages:** TypeScript, JavaScript, PLpgSQL, CSS

[View on Railway →](https://railway.com/deploy/babychain)
