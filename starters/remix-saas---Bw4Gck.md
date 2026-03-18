# Deploy remix-saas on Railway

A Lightweight, Production-Ready Remix Stack for your next SaaS Application.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Bw4Gck)

## About

<h1 align="center">
  🛍️ Remix SaaS
</h1>

<div align="center">
  <p>
  A Lightweight, Feature-Rich, and Production-Ready Remix Stack for your next SaaS application.
  </p>
</div>

<div align="center">
  <p>
    <a href="https://remix-saas-production.up.railway.app">Live Demo</a>
    ·
    <a href="https://github.com/dev-xo/remix-saas/tree/main/docs">Documentation</a>
    ·
    <a href="https://twitter.com/DanielKanem">Twitter</a>
  </p>
</div>

```sh
npx create-remix-saas@latest
```

## [Live Demo](https://remix-saas-production.up.railway.app)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/Bw4Gck)

We've created a simple demo that displays all template-provided features.

&gt; [!NOTE]
&gt; Remix SaaS is an Open Source Template that shares common bits of code with: [Indie Stack](https://github.com/remix-run/indie-stack), [Epic Stack](https://github.com/epicweb-dev/epic-stack), [Supa Stripe Stack](https://github.com/rphlmr/supa-stripe-stack), and some other amazing Open Source Remix resources. Check them out, please!

## Getting Started

Please, read the [Getting Started Documentation](https://github.com/dev-xo/remix-saas/tree/main/docs#remix-saas-documentation) to successfully initialize your **Remix SaaS** Template.

## Support

If you found **Remix SaaS** helpful, consider supporting it with a ⭐ [Star](https://github.com/dev-xo/remix-saas). It helps the repository grow and provides the required motivation to continue maintaining the project. Thank you!

## Acknowledgments

Special thanks to [@mw10013](https://github.com/mw10013) who has been part of the Remix SaaS development.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Remix Saas | [railwayapp-templates/remix-saas](https://github.com/railwayapp-templates/remix-saas) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `RESEND_API_KEY` | Remix Saas | (secret) | Resend API Key |
| `STRIPE_SECRET_KEY` | Remix Saas | (secret) | Add Stripe Secret Key |
| `STRIPE_WEBHOOK_ENDPOINT` | Remix Saas | - | Add Stripe Webhook Endpoint |
| `HONEYPOT_ENCRYPTION_SEED` | Remix Saas | - | Honeypot Encryption Seed |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/template/Bw4Gck)
