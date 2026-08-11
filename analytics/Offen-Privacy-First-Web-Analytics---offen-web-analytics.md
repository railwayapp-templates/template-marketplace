# Deploy Offen — Privacy-First Web Analytics on Railway

Self-host Offen — encrypted, opt-in analytics your users control

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/offen-web-analytics)

## About

Offen Fair Web Analytics is a radically privacy-first, open-source analytics tool with a feature no other option has: your visitors can access, review, and delete the data collected about them. Collection is strictly opt-in, all usage data is end-to-end encrypted (the server literally cannot decrypt it), and no IP addresses or User-Agent strings are ever collected. This template deploys Offen with PostgreSQL and a generated operator login, running behind Railway's HTTPS — a genuinely fair, GDPR-aligned alternative to Google Analytics where transparency is the point.

---

Offen takes a stricter privacy stance than any mainstream analytics tool, and a couple of Railway-specific setup details make it deploy cleanly — both handled here.

**Users can see and delete their own data — the defining feature.** Every tracked visitor can open the Auditorium to review exactly what's been collected about them, with plain-language explanations, and delete it or opt out entirely at any time. No other analytics tool gives end users this access — it's the strongest possible privacy story, real transparency rather than just a claim.

**End-to-end encrypted, opt-in, no IPs.** Clients encrypt usage data in the browser before it's sent, so the server storing it cannot decrypt it — an accidental leak or a compromised instance exposes nothing. Collection is opt-in only, so visitors who don't consent leave no trace, and Offen never collects IP addresses or User-Agent strings — a fundamentally different posture from tools that collect everything and anonymize later.

**The operator login is generated at setup — not via env vars.** Offen creates your first operator account through a one-time setup step that also generates `OFFEN_SECRET`, rather than reading a plain admin password from the environment. This template runs that setup with populate, so a working operator account and secret exist on first deploy — check your deployment for the generated credentials to log in, then add your websites in the dashboard.

**Run behind Railway's proxy, not Offen's own TLS.** Offen can fetch its own Let's Encrypt certificates, but on Railway you don't want that — Railway terminates HTTPS at its edge. Set `OFFEN_SERVER_REVERSEPROXY=true` so Offen serves plain HTTP internally and trusts Railway's proxy for TLS, which this template configures. Encrypted usage data and accounts persist in PostgreSQL.

**Lightweight and multi-site.** Offen is a single Go binary — light and fast — and one installation can track multiple websites, with accounts shareable across a team. Add a small script snippet to each site to start collecting from opted-in visitors.

Typical cost: **~$5/month** on Railway for the Go service and Postgres. Offen is free and open source, supported by the NLnet Foundation's Next Generation Internet initiative — it will always be free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| offen | [monotykamary/railway-template-offen](https://github.com/monotykamary/railway-template-offen) | Worker |
| postgres | `postgres:17.6-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OFFEN_SECRET` | offen | (secret) | - |
| `OFFEN_ADMIN_EMAIL` | offen | - | Email address for the initial Offen operator. |
| `OFFEN_ACCOUNT_NAME` | offen | My Website | - |
| `OFFEN_ADMIN_PASSWORD` | offen | (secret) | - |
| `POSTGRES_DB` | postgres | offen | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/offen-web-analytics)
