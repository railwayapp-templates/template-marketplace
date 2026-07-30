# Deploy Basic Auth Proxy — Password-Protect Any Service on Railway

Put any service behind a username & password — nginx proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/basic-auth-proxy)

## About

Basic Auth Proxy is a lightweight nginx reverse proxy that puts any service behind a username and password — no code changes to the service itself. Point it at an app, dashboard, API, or staging site that has no login of its own, set a username and password, and it adds an HTTP Basic Authentication gate in front. Built on Alpine Linux for a tiny footprint, it's the fastest way to lock down something that was never built to be public.

---

Plenty of useful things weren't built with a login screen — an internal dashboard, a staging deploy, a metrics UI, a quick API. Making them public is risky; building auth into each one is overkill. This proxy is the middle path: a password gate you drop in front, in minutes.

**Point `ORIGIN` at a private service.** Set `ORIGIN` to the upstream you want to protect — ideally a Railway private domain like `http://myapp.railway.internal:3000`, so the real service is never exposed to the public internet at all and only this proxy can reach it. Requests that pass the password check are forwarded; everything else gets a `401`. You can also proxy an external URL if you need to add a gate in front of something already public.

**Set `BASIC_AUTH` to your credentials.** The format is `username:password`. The proxy generates the password file at startup, so there's no htpasswd tooling to run — just set the variable. Combined with Railway's automatic HTTPS, the credentials are encrypted in transit.

**Know what Basic Auth is and isn't.** HTTP Basic Authentication is a shared username and password, not a full identity system — there are no per-user accounts, no MFA, and no session management. Over HTTPS it's perfectly good for gating a staging site, an internal tool, or an admin panel that just needs to be kept out of public hands. For per-user logins, SSO, or MFA, use a full identity provider instead. This is the simple, fast option for the common case.

**Avoid the no-auth override in production.** The image supports an `ALLOW_NO_AUTH=true` flag that runs the proxy with no password at all. That's for local testing only — never set it on a public deployment, or you've built an open proxy to your service.

Typical cost: **~$5/month or less** on Railway — the Alpine image is tiny and the proxy is nearly free to run. It's open source and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nginx-password-auth | [biw/railway-nginx-password-auth](https://github.com/biw/railway-nginx-password-auth) | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `ORIGIN` | The URL that is proxied. i.e. express.railway.local:3000 |
| `BASIC_AUTH` | username:password |

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/basic-auth-proxy)
