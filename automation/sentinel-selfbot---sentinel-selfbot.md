# Deploy sentinel-selfbot on Railway

The core  for the Sentinel ecosystem, a Discord intelligence platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sentinel-selfbot)

## About

# Sentinel Selfbot – Railway Template Overview

Deploy the Sentinel selfbot on Railway in one click. This template runs the selfbot as a cloud‑based data collection engine for the Sentinel ecosystem, storing all data in a **cloud Supabase database** for persistent, always‑available analytics.

---

## # Deploy and Host

| | |
|-|-|
| **One‑click deploy** | [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/sentinel-selfbot) |
| **Hosting platform** | Railway (https://railway.app) |
| **Regions** | Choose any Railway region (US, EU, Asia‑Pacific) |
| **Resource requirements** | ~256 MB RAM, 0.1 vCPU – fits within Railway’s free $5/month credit |
| **Persistent storage** | Not used (data lives in Supabase) |

After deployment, Railway automatically builds and starts the selfbot. No server maintenance required.

---

## ## About Hosting

Railway is a modern application hosting platform that handles infrastructure, auto‑restarts, SSL certificates, and scaling. When you deploy this template:

- **Ephemeral filesystem** – The selfbot container has no permanent disk. That’s why we require **Supabase** for database storage.
- **Auto‑restart** – If the selfbot crashes, Railway restarts it immediately.
- **Public URL** – Railway assigns a `*.up.railway.app` HTTPS domain, or you can add a custom domain.
- **Logs** – Real‑time logs are available in the Railway dashboard.
- **Environment variables** – All secrets are encrypted and can be updated without redeploy.

This template is optimised for Railway’s free tier – the selfbot runs 24/7 without extra cost.

---

## ## Why Deploy

Deploying the Sentinel selfbot on Railway gives you:

| Benefit | Description |
|---------|-------------|
| **Always online** | No need to keep your local computer running 24/7 |
| **Zero maintenance** | Railway auto‑restarts on failure, applies OS updates, and manages SSL |
| **Global access** | Connect your Sentinel web panel from anywhere – home, office, mobile |
| **Free tier eligible** | Runs entirely within Railway’s $5/month free credit |
| **Scalable** | As you add more targets, Railway can upgrade resources automatically |
| **Secure** | All traffic is HTTPS by default; secrets are environment variables |
| **No VPS management** | No SSH, no firewall rules, no `systemd` or PM2 setup |

Compared to a local or VPS deployment, Railway removes operational overhead so you can focus on using Sentinel.

---

## ## Common Use Cases

This selfbot is designed for monitoring and analytics. Typical use cases include:

| Use Case | Description |
|----------|-------------|
| **Personal research** | Study online behaviour patterns, activity cycles, or community engagement |
| **Server moderation assistance** | Detect unusual activity from problem users (requires proper consent/notice) |
| **Activity logging for friends** | With explicit permission, track when friends are online, playing games, or listening to music |
| **Security auditing** | Monitor for compromised accounts by detecting anomalous login times or devices |
| **Academic / social science** | Collect de‑identified activity data for research on digital behaviour |
| **Self‑hosted alternative to commercial tracking** | Replace third‑party bots with your own data‑sovereign solution |

> **Important:** Only track people you have a legitimate reason to monitor and where it complies with Discord’s Terms of Service and applicable privacy laws.

---

## ## Dependencies for

The selfbot requires three external dependencies to function on Railway:

| Dependency | Purpose | Required? |
|------------|---------|-----------|
| **Discord account + token** | The selfbot logs in as a user account to observe data | ✅ Always |
| **Supabase project** | Cloud database for persistent storage (Railway’s disk is ephemeral) | ✅ Always |
| **Railway platform** | Hosting environment (provided automatically when you deploy) | ✅ Always |

These are **runtime dependencies** – you must provide the Discord token and Supabase credentials before the selfbot can start.

---

### ### Deployment Dependencies

The following **configuration values must be set as environment variables** in Railway **before** the selfbot will run successfully. No additional software installation is needed.

| Variable | Description | How to obtain |
|----------|-------------|----------------|
| `DISCORD_TOKEN` | Discord user token for a **dedicated alt account** | Extract via browser DevTools (Network tab → `Authorization` header). Never use your main account. |
| `API_AUTH_TOKEN` | Bearer token for API authentication | Generate a strong random string (e.g., `openssl rand -hex 32`). Keep it secret. |
| `SUPABASE_URL` | URL of your Supabase project | In Supabase dashboard → **Settings → API** → **Project URL** |
| `SUPABASE_SERVICE_KEY` | Supabase `service_role` key (not the anon key) | Same API settings page → **service_role key** (starts with `eyJ...`) |
| `API_PORT` (optional) | Port the API listens on | Default `48923` – Railway automatically detects and exposes it |

**Steps to set dependencies during Railway deploy:**

1. Create a free Supabase project at [supabase.com](https://supabase.com).
2. Copy the **Project URL** and **service_role key**.
3. Click **Deploy on Railway** button above.
4. In the Railway variable form, paste:
   - `DISCORD_TOKEN` (your alt account token)
   - `API_AUTH_TOKEN` (your own generated token)
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
5. Click **Deploy** – Railway builds and starts the selfbot automatically.

After deployment, the selfbot connects to Discord, creates the required tables in Supabase, and starts the API. You can verify it works by visiting `https://your-railway-url.railway.app/api/status` with the `Authorization: Bearer YOUR_API_AUTH_TOKEN` header.

---

## Full Environment Variable Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DISCORD_TOKEN` | ✅ | — | Discord user account token |
| `API_AUTH_TOKEN` | ✅ | — | Bearer token for API authentication |
| `SUPABASE_URL` | ✅ | — | Supabase project URL (e.g., `https://xxxx.supabase.co`) |
| `SUPABASE_SERVICE_KEY` | ✅ | — | Supabase `service_role` key |
| `API_PORT` | ❌ | `48923` | Port the API listens on (Railway auto‑maps) |
| `DB_MODE` | ❌ | `cloud` | Fixed to `cloud` for Railway – do not change |
| `LOG_LEVEL` | ❌ | `info` | Set to `debug` for troubleshooting |
| `RANDOM_JITTER` | ❌ | `false` | Randomise polling intervals (increases stealth) |

---

## After Deployment – Connect the Sentinel Web Panel

1. **Get your Railway public URL** – In Railway dashboard → your service → **Settings** → **Networking** → **Generate Domain**. Copy the HTTPS URL.
2. **Open your Sentinel web panel** (e.g., `https://sentinel-panel.vercel.app/settings`).
3. **Fill in:**
   - **Sentinel API URL** → your Railway URL
   - **API Token** → the `API_AUTH_TOKEN` you set
4. **Save** – the panel will connect and show the selfbot status.
5. **Add your first target** from the Dashboard.

---

## Support & Links

- [Selfbot GitHub Repository](https://github.com/Privex-chat/sentinel-selfbot)
- [Full Selfbot Documentation](https://github.com/Privex-chat/sentinel/blob/main/docs/selfbot.md)
- [Sentinel Web Panel](https://github.com/Privex-chat/sentinel-web)
- [Supabase Free Tier](https://supabase.com/pricing)
- [Railway Free Tier](https://railway.app/pricing)

---

**License:** [PolyForm Noncommercial License 1.0.0](https://github.com/Privex-chat/sentinel-selfbot/blob/main/LICENSE)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sentinel-selfbot | [Privex-chat/sentinel-selfbot](https://github.com/Privex-chat/sentinel-selfbot) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DB_MODE` | cloud | Required when DB_MODE=local+cloud or DB_MODE=cloud |
| `DB_PATH` | ./data/sentinel.db | - |
| `API_PORT` | 48923 | - |
| `LOG_LEVEL` | info | - |
| `SUPABASE_URL` | https://your-project-ref.supabase.co | - |
| `DISCORD_TOKEN` | (secret) | - |
| `RANDOM_JITTER` | true | ── Database mode ───────────────────────────────────────────────────────────── |
| `API_AUTH_TOKEN` | (secret) | - |
| `SUPABASE_SERVICE_KEY` | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... | How often (ms) to push SQLite data to Supabase. |
| `STATUS_POLL_INTERVAL_MS` | 120000 | - |
| `PROFILE_POLL_INTERVAL_MS` | 300000 | - |
| `DAILY_SUMMARY_INTERVAL_MS` | 3600000 | ── Randomisation ───────────────────────────────────────────────────────────── |
| `SUPABASE_SYNC_INTERVAL_MS` | 300000 | - |

## Configuration

- **Start command:** `npm start`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/sentinel-selfbot)
