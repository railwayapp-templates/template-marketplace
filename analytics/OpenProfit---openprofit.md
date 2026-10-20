# Deploy OpenProfit on Railway

See what each app earns after its OpenAI, Vercel and Railway bills.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openprofit)

## About

OpenProfit shows what each of your apps earns after costs. It pulls revenue from Stripe, Polar, Paddle, Lemon Squeezy and RevenueCat, and costs from OpenAI, Anthropic, Vercel, Cloudflare, Railway and more. You assign each OpenAI project, Vercel project or Railway project to a product and see profit per product. From the same data, you download a monthly journal for QuickBooks or Xero and the lines for your tax return.

The template deploys one service from the `ghcr.io/morencyr/openprofit` image, on a public domain. OpenProfit keeps its data in an embedded Postgres database on a volume at `/app/data`, so you have no database service to run. Railway generates `SECRET_KEY`, which OpenProfit uses to encrypt the provider keys you paste in, and sets `APP_URL` to the domain.

When the deploy finishes, open `/login` on your domain and enter your email. Without an email provider, OpenProfit writes the sign-in link to the service's deploy logs. Add `RESEND_API_KEY` and `EMAIL_FROM` to send it by mail.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenProfit | `ghcr.io/morencyr/openprofit:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECRET_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/openprofit)
