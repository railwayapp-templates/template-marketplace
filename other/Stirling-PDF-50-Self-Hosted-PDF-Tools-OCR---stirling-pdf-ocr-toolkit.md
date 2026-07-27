# Deploy Stirling PDF — 50+ Self-Hosted PDF Tools + OCR on Railway

Private PDF toolkit — merge, OCR, sign, convert, with login

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stirling-pdf-ocr-toolkit)

## About

Stirling PDF is the most-starred open-source PDF toolkit on GitHub — 50+ operations (merge, split, convert, OCR, sign, compress, redact, and more) in a clean web UI and a full REST API. It's a private, self-hosted alternative to Adobe Acrobat and SmallPDF where every file is processed on your own server and deleted immediately after. This template deploys it with login enabled and both configuration **and OCR language data** persisted — so multi-language OCR survives redeploys, which most templates get wrong.

---

Stirling PDF wraps LibreOffice, Tesseract, and qpdf into one interface, and hosting it on Railway has three specifics that determine whether it works.

**Use the `latest-fat` image, not `latest`.** The standard image ships without the security JARs, so login silently doesn't work — the app loads straight to the tools with no authentication, no matter how you set the login variables. The `-fat` image includes the security components and enables `DISABLE_ADDITIONAL_FEATURES=false` to take effect. This is the single most common Stirling PDF deployment mistake, and this template uses the correct image.

**First boot takes about 90 seconds.** Spring Boot warms its bean graph and LibreOffice's conversion pool initializes on startup. Railway's default healthcheck would flag the service unhealthy before that completes, so this template sets a generous healthcheck window — a slow first boot is normal, not a failure.

**OCR languages need a persisted `tessdata` volume — and most templates skip it.** Extra Tesseract language packs live in `/usr/share/tessdata`, downloaded on first use. If that directory isn't on a volume, every redeploy wipes non-English OCR support. This template persists it, so a legal or healthcare team running French, Spanish, or German OCR keeps it across redeploys — the difference that matters for anyone using OCR beyond English.

Files themselves are never stored — Stirling processes each in memory and deletes it immediately, so nothing sensitive lingers on the server.

Typical cost: **~$5–10/month** on Railway. Stirling PDF is MIT-licensed; Adobe Acrobat Pro runs about $20/month per seat for less privacy.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| stirling-pdf | `stirlingtools/stirling-pdf:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECURITY_ENABLELOGIN` | (secret) |
| `SYSTEM_DEFAULTLOCALE` | en-US |
| `DOCKER_ENABLE_SECURITY` | true |
| `SECURITY_INITIALLOGIN_PASSWORD` | (secret) |
| `SECURITY_INITIALLOGIN_USERNAME` | (secret) |

## Configuration

- **Volume:** `/configs`

**Category:** Other

[View on Railway →](https://railway.com/deploy/stirling-pdf-ocr-toolkit)
