# Deploy Remark42 on Railway

Comment engine you embed on any web page with one script tag

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/remark42-comments)

## About

Remark42 is an open-source commenting engine, written in Go by Umputun, that you embed on any web page with a single script tag. It gives readers threaded discussions, markdown, voting and email or OAuth sign-in, and it gives you what hosted comment platforms never do: the comments themselves, in a file you own, with no third-party tracking scripts. Bloggers, documentation sites and static-site builders on Hugo, Astro or Next.js all end up here.

Self-host Remark42 on Railway and this template wires up the parts that usually take an afternoon. The `remark42` service runs `umputun/remark42:latest` behind a public HTTPS domain, keeping every comment, avatar, uploaded image and nightly backup on a volume at `/srv/var`. A second service, `mailpit`, provides SMTP on the private network so email sign-in links and notifications work the moment the deploy finishes, with a password-protected inbox for reading what was sent. Run Remark42 on Railway and the public URL, the signing secret, the trusted-proxy ranges and the mail wiring are already set.

![Remark42 and Mailpit services on Railway with their volumes](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789467067/remark42-architecture.webp)

Remark42 replaces a hosted comment service with one Go binary and an embedded BoltDB database. No database server, no queue, no cache tier — the installation is one process and one directory. A five-year-old instance with regular activity fits in under 200 MB, and the backup is a gzipped JSON dump the server writes itself every 24 hours.

Key features:

- Threaded comments with full markdown, code blocks, image uploads and emoji
- Sign-in by email token, anonymous name, or OAuth with GitHub, Google, Microsoft, Apple, Facebook, Yandex, Discord, Patreon or a custom provider
- Voting with score thresholds that hide low-scored comments automatically
- Moderation: pin, hide, verify, delete, block, restricted word and name lists
- Email and Telegram notifications, RSS feeds per thread
- Multi-site support from one instance, and an import path from Disqus and WordPress

The `remark42` service is the whole application — API, widget assets and storage. `mailpit` exists because Remark42's most convenient sign-in method is an emailed token, and a fresh deployment with no SMTP host could not send one. Mailpit captures mail rather than delivering it, so it is a safe place to watch notifications before you point Remark42 at a real relay.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| remark42 | `umputun/remark42:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mailpit | 8025 | Inbox UI and health-check port |
| `MP_UI_AUTH` | mailpit | - | user:password for the inbox UI |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `PORT` | remark42 | 8080 | Health-check port; app reads REMARK_PORT |
| `SITE` | remark42 | remark | Site id the widget reports |
| `EMOJI` | remark42 | true | Emoji support in comments |
| `SECRET` | remark42 | (secret) | Signs auth tokens; must stay stable |
| `SMTP_TLS` | remark42 | false | Plain listener, no implicit TLS |
| `AUTH_ANON` | remark42 | false | Anonymous commenting, off by default |
| `SMTP_HOST` | remark42 | - | Private mail host |
| `SMTP_PORT` | remark42 | 1025 | Private SMTP port |
| `TIME_ZONE` | remark42 | Etc/UTC | Container timezone for stored timestamps |
| `REMARK_URL` | remark42 | - | Public URL baked into the widget |
| `NOTIFY_USERS` | remark42 | email | Reply notifications for readers |
| `NOTIFY_ADMINS` | remark42 | email | New-comment notifications for moderators |
| `SMTP_STARTTLS` | remark42 | false | Plain listener advertises no STARTTLS |
| `TRUSTED_PROXY` | remark42 | 100.64.0.0/10,fd00::/8 | Railway edge networks allowed to set client IP |
| `ADMIN_SHARED_ID` | remark42 | - | Comma-separated moderator user ids |
| `AUTH_EMAIL_FROM` | remark42 | - | From address on sign-in mail |
| `AUTH_EMAIL_ENABLE` | remark42 | true | One-time-token email sign-in |
| `NOTIFY_EMAIL_FROM` | remark42 | - | From address on notifications |
| `ADMIN_SHARED_EMAIL` | remark42 | - | Where admin notifications go |
| `AUTH_SEND_JWT_HEADER` | remark42 | true | Keeps cross-domain embeds signed in |
| `IMAGE_PROXY_HTTP2HTTPS` | remark42 | true | Proxies http images to avoid mixed content |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/ping`
- **Volume:** `/srv/var`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/remark42-comments)
