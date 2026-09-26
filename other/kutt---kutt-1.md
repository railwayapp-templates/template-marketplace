# Deploy kutt on Railway

Kutt 3.2: modern URL shortener with stats, custom slugs and an API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kutt-1)

## About

Kutt is a modern, open-source URL shortener. It creates short links with custom slugs, optional passwords and expiry dates, and records visit statistics by browser, country and referrer. It has a clean web interface and a REST API, so scripts and other apps can create links too.

This template runs the official `kutt/kutt:v3.2.6` image as a single service backed by SQLite on a Railway volume. On first boot a small seed script creates the admin account from the variables, because Kutt otherwise hands the first visitor the admin setup page. Public sign-up and anonymous link creation are both turned off, so only you can create links. Short links use your Railway domain; add a custom domain in Railway and update `DEFAULT_DOMAIN` for shorter URLs. Links and statistics survive redeploys. The service uses little memory and runs comfortably on the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kutt | `kutt/kutt:v3.2.6` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `DB_CLIENT` | better-sqlite3 |
| `KUTT_SEED` | // First boot: create the admin account from env vars (Kutt refuses once a user exists).
const base = 'http://127.0.0.1:' + (process.env.PORT || 3000);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (let i = 0; i < 90; i++) {
  try {
    const r = await fetch(base + '/api/auth/create-admin', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ email: process.env.KUTT_ADMIN_EMAIL, password: process.env.KUTT_ADMIN_PASSWORD }),
    });
    console.log('[seed] create-admin ->', r.status, r.ok ? 'created' : '(already set up)');
    break;
  } catch (e) {
    await sleep(2000);
  }
} |
| `SITE_NAME` | Kutt |
| `JWT_SECRET` | (secret) |
| `DB_FILENAME` | /var/lib/kutt/kutt.sqlite |
| `TRUST_PROXY` | true |
| `KUTT_ADMIN_EMAIL` | admin@example.com |
| `KUTT_ADMIN_PASSWORD` | (secret) |
| `DISALLOW_REGISTRATION` | true |
| `DISALLOW_ANONYMOUS_LINKS` | true |

## Configuration

- **Start command:** `sh -c 'printf "%s\n" "$KUTT_SEED" > /tmp/seed.mjs; npm run migrate || exit 1; npm start & pid=$!; trap "kill -TERM $pid; wait $pid; exit 0" TERM INT; node /tmp/seed.mjs & wait $pid'`
- **Healthcheck:** `/api/v2/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/kutt`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kutt-1)
