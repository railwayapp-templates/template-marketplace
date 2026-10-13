# Deploy 9Router on Railway

AI gateway with provider routing, API keys and persistent SQLite.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-5)

## About

![9Router provider dashboard](https://raw.githubusercontent.com/Timboslice212/9router-railway/bbafad3211150b9fffa899db8c22a33797f0d745/assets/screenshots/providers.png)

*Official upstream provider dashboard preview. This historical screenshot uses the earlier Endpoint Proxy name; providers shown connected are examples, not included accounts.*

Run your own AI gateway with a dashboard and an OpenAI-compatible endpoint for coding tools and API clients.

9Router routes requests to configured AI providers and supports format translation, model aliases, fallback combinations and token-saving features. This template deploys one Node.js/Next.js service and one persistent SQLite volume. It uses an independent Railway wrapper around official 9Router 0.5.99, with a small deployment compatibility adjustment and a mandatory first-run password change.

### Getting started

1. Deploy and open the generated HTTPS domain.
2. Sign in with the initial password `123456`, then choose a new password before entering the dashboard.
3. Connect a provider you are authorized to use in Providers.
4. Generate a gateway key in Endpoint & Key.
5. Configure your client with `https://YOUR-DOMAIN/v1`, your gateway key and a model available on your instance.

The dashboard starts with the upstream default password `123456`. It grants access only to the password-change screen until you choose a new password of at least 8 characters. Complete setup immediately, because the default password is public. Internal signing secrets are generated separately for each deployment. Keep dashboard login and gateway API-key protection enabled. Free providers and quotas can change; no free access or unlimited usage is guaranteed.

### Architecture and defaults

One service listens on port 20128. The /app/data volume preserves SQLite, provider connections, API keys, settings and backups. BASE_URL follows the generated Railway domain. HTTPS session cookies and API-key authentication protect remote access. Cloud sync, tunnels and request-payload logging are disabled by default. Headroom is optional and not included. Local credential imports, MITM certificates, host modification and local-only process controls are outside this remote deployment scope.

Use the gateway for coding assistants, compatible SDKs and applications needing a central provider endpoint. Available models depend on the providers and accounts you connect.

### Model combinations

Configure named combinations in Combo & Vision Adapter. Fallback tries another configured model when a request fails; round robin distributes requests across models. Fusion queries a panel and a judge, which can increase provider usage and cost.

![9Router Fusion and Fallback combinations](https://raw.githubusercontent.com/Timboslice212/9router-railway/bbafad3211150b9fffa899db8c22a33797f0d745/assets/screenshots/combos.png)

*Official upstream combination preview. Model names and interface details are illustrative and may differ from your deployment. [Screenshot source and attribution](https://github.com/Timboslice212/9router-railway/tree/bbafad3211150b9fffa899db8c22a33797f0d745/assets/screenshots).*

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9Router | [Timboslice212/9router-railway](https://github.com/Timboslice212/9router-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 20128 | Listening port for the dashboard and AI gateway; matches the public domain target port. |
| `BASE_URL` | - | Instance URL generated from this deployment's Railway public domain. |
| `DATA_DIR` | /app/data | Persistent SQLite, settings, credentials and backup directory; must match the /app/data volume mount. |
| `HOSTNAME` | 0.0.0.0 | Bind to all container interfaces so Railway can route requests. |
| `NODE_ENV` | production | Use the production application runtime. |
| `JWT_SECRET` | (secret) | Generated signing secret for dashboard sessions. Keep private and stable across restarts. |
| `API_KEY_SECRET` | (secret) | Generated HMAC secret for gateway API keys. Keep private and stable across restarts. |
| `MACHINE_ID_SALT` | - | Generated per-instance salt for consistent machine identity. |
| `INITIAL_PASSWORD` | (secret) | Initial dashboard password: 123456. On first login, choose a new password before accessing the dashboard. Complete setup immediately. |
| `AUTH_COOKIE_SECURE` | true | Send dashboard session cookies only over HTTPS. |
| `ENABLE_REQUEST_LOGS` | false | Disable request payload logging to reduce sensitive prompt storage. |
| `OBSERVABILITY_ENABLED` | false | Disable optional detailed observability storage by default. |
| `NEXT_TELEMETRY_DISABLED` | 1 | Disable Next.js telemetry. |

## Configuration

- **Start command:** `node custom-server.js`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/9router-5)
