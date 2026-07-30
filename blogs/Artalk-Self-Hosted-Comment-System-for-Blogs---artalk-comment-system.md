# Deploy Artalk — Self-Hosted Comment System for Blogs on Railway

Self-host Artalk — a fast, private Disqus alternative for blogs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/artalk-comment-system)

## About

Artalk is a lightweight, open-source, self-hosted comment system — a fast, privacy-respecting alternative to Disqus for blogs, documentation sites, and personal websites. Written in Go, it's tiny and quick, with email notifications, social login, captcha, spam moderation, Markdown, emoji packs, and multi-site support built in. This template deploys it in one click with a persistent volume, so your comments, uploads, and configuration are safe across redeploys.

---

Artalk is refreshingly simple to run, and the one thing that matters most on a container platform is persistence.

**The `/data` volume is everything — and it's the one thing you must not skip.** Artalk stores the SQLite database (all your comments), uploaded images, and logs under `/data`. Without a persistent volume mounted there, a container restart or redeploy wipes every comment and your configuration. This template mounts it, so your data is durable. SQLite is a great fit here — comment systems are read-heavy and low-write — which is why Artalk needs no separate database service and stays cheap and simple.

**Two settings make the widget actually appear on your site.** `ATK_SITE_URL` must be set to your site's URL, and `ATK_TRUSTED_DOMAINS` must list the domains allowed to load comments — if these are wrong, browsers block the widget on cross-origin grounds and comments silently fail to render. Set both to your blog's real domain.

**The admin password is a bcrypt hash, not plain text.** Artalk expects the admin password as a bcrypt hash (prefixed `(bcrypt)`), not a plaintext string. Generate a hash and set it, or complete the initial setup in the dashboard on first run. The first user matching the configured admin email becomes the administrator.

**Point your blog at it in two lines.** Once deployed, add Artalk's small JS snippet to your site with your Railway URL as the `server` and a `pageKey` per page. It works with any static site, blog engine, or framework — Hugo, Hexo, Astro, WordPress, or hand-rolled HTML.

Typical cost: **~$5/month** on Railway for the single lightweight service — the Go binary and SQLite keep resource use minimal. Artalk is MIT-licensed and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Artalk | `artalk/artalk-go:2.10.0` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 23366 | - |
| `ATK_HOST` | 0.0.0.0 | - |
| `ATK_PORT` | 23366 | - |
| `ATK_LOCALE` | en | - |
| `ATK_DB_FILE` | /data/artalk.db | - |
| `ATK_DB_TYPE` | sqlite | - |
| `ATK_TIMEZONE` | UTC | - |
| `ATK_SITE_DEFAULT` | Artalk | - |
| `ARTALK_ADMIN_NAME` | - | Administrator username used to sign in to Artalk. |
| `ARTALK_ADMIN_EMAIL` | - | Administrator email used to sign in to Artalk. |
| `ARTALK_ADMIN_PASSWORD` | (secret) | Administrator password. Use at least 12 unique characters. |
| `ATK_HTTP_PROXY_HEADER` | X-Forwarded-For | - |

## Configuration

- **Volume:** `/data`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/artalk-comment-system)
