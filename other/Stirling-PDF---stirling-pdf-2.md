# Deploy Stirling PDF on Railway

All in one PDF multitool, OCR, merge, sign. Demo for myownsuite.org

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stirling-pdf-2)

## About

Stirling PDF is a self-hosted, browser-based toolbox for everyday PDF work — merge, split, compress, convert, OCR, sign, and redact documents from one private web app. It's a self-hosted alternative to iLovePDF, Smallpdf, and Adobe's online PDF tools. This template runs Stirling PDF on infrastructure you control, so sensitive files never get uploaded to a third-party website.

Hosting your own Stirling PDF gives you a full PDF toolkit without handing your documents to a random online converter. Contracts, scanned IDs, tax paperwork, and confidential reports are processed on your own server instead of someone else's upload queue, and you keep complete ownership and control of every file.

This template is ready to run: Railway provisions the container, storage, and public HTTPS URL for you, so you get a working Stirling PDF instance in a couple of minutes with no low-level server setup. Analytics are turned off by default in this deployment.

Stirling PDF is also one of the apps in **[My Own Suite](https://myownsuite.org/)**, an open-source, all-in-one private cloud you can self-host — files, documents, photos, passwords, calendars, and PDF tools in a single suite. If you like running your own Stirling PDF, the [My Own Suite documentation](https://myownsuite.org/docs/apps/stirling-pdf/) shows how it fits alongside the rest of your private cloud, with more self-hosting guides over at [Funkyton](https://funkyton.com/).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Stirling | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/stirling-pdf) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | - |
| `LANGS` | en_GB | - |
| `SYSTEM_DISABLEPIXEL` | true | Disables analytics/tracking pixel behavior and related consent-prompt tracking hooks. |
| `SYSTEM_ENABLEPOSTHOG` | false | Explicitly disables PostHog analytics/reporting if supported by the image/runtime. |
| `SYSTEM_ENABLEANALYTICS` | false | Turns off Stirling PDF's built-in analytics collection. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/configs`

**Category:** Other · **Languages:** JavaScript, TypeScript, CSS, Astro, MDX, Shell, PowerShell, Dockerfile, HTML, Standard ML

[View on Railway →](https://railway.com/deploy/stirling-pdf-2)
