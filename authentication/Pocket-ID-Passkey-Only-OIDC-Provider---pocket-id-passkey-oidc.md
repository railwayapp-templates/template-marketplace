# Deploy Pocket ID — Passkey-Only OIDC Provider on Railway

Self-host Pocket ID — passwordless passkey SSO for your apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocket-id-passkey-oidc)

## About

Pocket ID is a simple, self-hosted OIDC provider built entirely around passkeys — no passwords, no TOTP codes, no external dependencies. Add single sign-on to your self-hosted services and sign in everywhere with a WebAuthn passkey or a hardware key like a YubiKey. It's the lightweight, passwordless alternative to heavier identity providers like Keycloak and Authentik, designed for people who want one modern login across their apps without running a complex platform. This template deploys it as a single container with the WebAuthn-critical settings handled.

---

Pocket ID is genuinely simple to run, but passkeys make one setting unusually strict — get it right and there's almost nothing else to configure.

**`APP_URL` must exactly match your browser-facing URL — passkeys depend on it.** Pocket ID puts `APP_URL` in three places: the OIDC issuer, the cookie domain, and — critically — the WebAuthn relying-party ID. Passkeys are cryptographically bound to that relying-party domain, so if `APP_URL` doesn't exactly match the URL users visit, **passkeys won't register or verify at all**, and because there are no passwords, there's no fallback. Set it to your exact Railway public domain before you run the first-time setup, and don't change it afterward.

**`TRUST_PROXY=true` is required on Railway, and HTTPS is mandatory.** WebAuthn only works in a secure (HTTPS) context, which Railway provides automatically. But Pocket ID runs behind Railway's proxy, so `TRUST_PROXY=true` must be set or it misreads the request protocol and origin, and passkey checks fail. This template sets it.

**Claim your admin passkey immediately — the setup page is first-come.** On first deploy, visit `/setup` and register your admin passkey right away. Whoever reaches `/setup` first becomes the administrator, so do this the moment the service is live, before the URL is exposed to anyone else.

**`ENCRYPTION_KEY` protects sensitive data — pin it.** Generate it with `openssl rand -base64 32` (at least 16 bytes), set it once, and keep it stable. Combined with the `/app/data` volume, that keeps your identity provider intact across redeploys.

Typical cost: **~$5/month** on Railway for the single lightweight container. Pocket ID is open source and free, and OpenID Connect Certified.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pocket ID | `ghcr.io/pocket-id/pocket-id` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 1411 |
| `TRUST_PROXY` | true |
| `ANALYTICS_DISABLED` | true |
| `VERSION_CHECK_DISABLED` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/pocket-id-passkey-oidc)
