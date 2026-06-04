# Deploy Generative Media Starter on Railway

Ship with auth, credits, storage, and generation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/generative-media-starter)

## About

Generative Media Starter is a deployable SaaS baseline for BabySea-powered media generation with auth, prepaid credits, and private output storage. It gives product builders a working Next.js app with Supabase Auth, Stripe Checkout, a credit ledger, BabySea SDK execution, and signed Supabase Storage previews.

Use it when you need the billing and settlement path before building your own creative surface. The starter sells one-time credit packs, grants credits through verified Stripe webhooks, reserves credits before dispatch, and charges or refunds the reservation after the generation reaches a terminal state.

The user signs in through Supabase Auth and enters a private dashboard that routes them to Generate and Billing. Supabase owns the user records, balances, generations, Stripe customer links, and ledger entries while service-role keys, Stripe secrets, and the BabySea API key remain server-side.

In Billing, the user chooses Starter, Builder, or Production credit packs. The app creates a Stripe Checkout session, then the webhook verifies the completed payment and grants credits idempotently through `grant_paid_credits`, leaving an auditable ledger row.

In Generate, the app loads the BabySea model schema, shows normalized fields such as prompt, ratio, output format, output count, and provider order, then checks the current balance against the configured generation cost. On submit, the server rate-limits the user, creates a generation record, and reserves credits atomically before dispatching to BabySea.

When BabySea returns an output, the server copies the asset into private Supabase Storage and creates a signed display URL for the dashboard. The ledger then records a charge for successful work or a refund for failed work, so the UI shows both the generated media and the complete balance history in one flow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| generative-media-starter | [babysea-community/generative-media-starter](https://github.com/babysea-community/generative-media-starter) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BABYSEA_API_KEY` | (secret) |
| `SENTRY_AUTH_TOKEN` | (secret) |
| `STRIPE_SECRET_KEY` | (secret) |
| `SUPABASE_SECRET_KEY` | (secret) |
| `BABYSEA_API_BASE_URL` | https://api.us.babysea.ai |
| `STRIPE_WEBHOOK_SECRET` | (secret) |
| `UPSTASH_REDIS_REST_TOKEN` | (secret) |

**Category:** Starters · **Languages:** TypeScript, JavaScript, PLpgSQL, CSS

[View on Railway →](https://railway.com/deploy/generative-media-starter)
