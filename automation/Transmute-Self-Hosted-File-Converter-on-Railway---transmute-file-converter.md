# Deploy Transmute — Self-Hosted File Converter on Railway on Railway

Self-host 2,000+ format file converter. No per-conversion fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/transmute-file-converter)

## About

![Transmute File Converter](YOUR_TRANSMUTE_SCREENSHOT_URL_HERE)

Transmute is a free, open-source, self-hosted file converter with **2,000+ supported format
conversions** — images, video, audio, documents, spreadsheets, subtitles, fonts, and structured
data — served through a polished web UI and a fully documented REST API. No file size limits.
No watermarks. No files uploaded to third-party servers. No per-conversion billing.

Deploy once on Railway and run unlimited conversions at a flat ~$5/month — versus CloudConvert
at $0.016 per conversion minute or Convertio at $9.99/month with format restrictions.

---

Cloud file conversion services like CloudConvert and Convertio process your files on their
own servers — your documents, media, and data leave your infrastructure on every conversion.
Credit-based billing means costs scale unpredictably: a single PDF-to-Office conversion costs
4 CloudConvert credits, and high-volume usage compounds quickly.

Transmute runs entirely on Railway's managed infrastructure. Every conversion happens inside
your own container — files never leave your instance. The built-in REST API makes it
straightforward to integrate with n8n, Make, or any backend service. Built-in authentication
with per-user data isolation means you can safely deploy for a team without cross-user file
access.

Typical cost: **~$5/month** on Railway's Hobby plan — flat, unlimited conversions with no
credit system, no format surcharges, and no file size caps.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Transmute | `ghcr.io/transmute-app/transmute` | Database |

## Configuration

- **Volume:** `/app/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/transmute-file-converter)
