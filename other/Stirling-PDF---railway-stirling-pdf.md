# Deploy Stirling PDF on Railway

Stirling PDF — 50+ self-hosted PDF tools: merge, split, OCR, and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-stirling-pdf)

## About

# Stirling PDF — Railway Deployment Template

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/stirling-pdf-1)

<p align="center">
  <img width="100%" alt="Stirling PDF on Railway" src="https://raw.githubusercontent.com/INAPP-Mobile/railway-stirling-pdf/main/og-image.svg">
</p>

[![GitHub Repo](https://img.shields.io/badge/GitHub/Stirling--Tools/Stirling--PDF-181717?style=flat-square&amp;logo=github)](https://github.com/Stirling-Tools/Stirling-PDF)
[![Docker Pulls](https://img.shields.io/docker/pulls/stirlingtools/stirling-pdf?style=flat-square&amp;logo=docker)](https://hub.docker.com/r/stirlingtools/stirling-pdf)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Stirling-Tools/Stirling-PDF?style=flat-square)](https://github.com/Stirling-Tools/Stirling-PDF)

&gt; **The #1 open-source PDF platform — edit, sign, convert, OCR, merge, split, compress, and more.**  \
&gt; 84,000+ GitHub stars · MIT licensed · 50+ PDF tools · 38+ languages  \
&gt; **Single container** — no database or Redis required. Persistent volume auto-provisioned at `/configs`.
&gt;
&gt; ⏳ **First deploy takes 3-5 minutes** — Stirling-PDF is a ~1GB Java/Spring Boot image. Railway downloads it on the first deploy. Subsequent deploys use the cached layer. This is normal — don't cancel the deployment!

---

## Features

- **50+ PDF Tools** — Merge, split, convert, compress, OCR, sign, redact, extract, rotate, and more — all in one app.
- **No Data Leaves Your Server** — Everything runs locally. Files are processed in-memory and deleted after the task.
- **Single Container** — Java/Spring Boot app. No database or Redis needed. Includes persistent volume at `/configs`.
- **REST API** — All tools are accessible via API for automation and integration into existing workflows.
- **Global UI** — Interface available in 38+ languages with active community translations.
- **Multi-Arch** — Official image supports both amd64 and arm64 architectures.
- **Free Tier Ready** — Fits comfortably on Railway's free tier (~1GB image, configurable RAM).

---

## Screenshots

| Dashboard | PDF Editor | Pipeline Tools |
|---|---|---|
| <img width="300" alt="Dashboard" src="https://raw.githubusercontent.com/Stirling-Tools/Stirling-PDF/main/images/home-light.png"> | &nbsp; | &nbsp; |

*Screenshots captured from a live deployment. Replace with your own after deploying.*

---

## Prerequisites

- A [Railway](https://railway.app) account
- A [GitHub](https://github.com) account (to fork and deploy)

---

## One-Click Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/stirling-pdf-1)

Click the button above and Railway will:

1. Clone this repository
2. Build the Docker container from the official `stirlingtools/stirling-pdf` image
3. Deploy with automatic HTTPS, health checks, and monitoring
4. Assign a wildcard domain (e.g., `stirling-pdf-production-xxxx.up.railway.app`)

---

## Environment Variables

Stirling-PDF is ready to go with zero configuration, but you can customise via these environment variables:

### Security &amp; Authentication

| Variable | Default | Description |
|---|---|---|
| `SECURITY_ENABLELOGIN` | `true` | Enable or disable authentication |
| `SECURITY_INITIALLOGIN_USERNAME` | `admin` | Custom initial admin username |
| `SECURITY_INITIALLOGIN_PASSWORD` | `stirling` | Custom initial admin password (change on first login!) |
| `LOGIN_ATTEMPT_COUNT` | `5` | Failed login attempts before account lockout |
| `LOGIN_RESET_TIME_MINUTES` | `10` | Minutes before locked account auto-unlocks |
| `CSRF_DISABLED` | `false` | Set `true` to disable CSRF (not recommended for production) |

### System Configuration

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8080` | HTTP port (Railway sets this automatically) |
| `SYSTEM_DEFAULTLOCALE` | `en-US` | Default language/locale (e.g., `de-DE`, `fr-FR`, `ja-JP`) |
| `TZ` | `UTC` | Server timezone |
| `SYSTEM_GOOGLEVISIBILITY` | `false` | Allow Google indexing via robots.txt |
| `UI_LOGOSTYLE` | `classic` | Logo style: `classic` or `modern` |

### Email (optional — for user invitations)

| Variable | Default | Description |
|---|---|---|
| `MAIL_ENABLED` | `false` | Enable SMTP email for user invitations |
| `MAIL_HOST` | — | SMTP server host |
| `MAIL_PORT` | `587` | SMTP server port |
| `MAIL_USERNAME` | — | SMTP username |
| `MAIL_PASSWORD` | — | SMTP password |
| `MAIL_FROM` | — | From address for invitation emails |
| `MAIL_ENABLEINVITES` | `false` | Enable email-based user invitations |

### Advanced Configuration

For full configuration options — OAuth 2.0, SAML SSO, external databases, LibreOffice settings, and more — see the [Stirling PDF Configuration Guide](https://docs.stirlingpdf.com/setup/server-configuration).

---

## Why Deploy Stirling PDF on Railway?

| Feature | Benefit |
|---|---|
| **Single container** | No database or Redis needed — just deploy |
| **Single container** | No complex orchestration or multi-service setup |
| **50+ built-in tools** | Replace dozens of separate PDF utilities with one app |
| **REST API included** | Automate PDF workflows in your existing pipeline |
| **File processing is stateless** | Files auto-deleted after processing — no cleanup needed |
| **Multi-arch support** | Runs on any Railway region and hardware |

With Railway, you get automatic HTTPS, global CDN, health monitoring, and scalable infrastructure — without managing servers.

---

## Deploy and Host

### About HostingStirling PDF runs as a single Docker container with no external database required. It uses file-based storage at `/configs`, which is mounted as a Railway persistent volume. This ensures your settings, user accounts, and custom configurations survive redeploys.

The default admin credentials are:
- **Username:** `admin`
- **Password:** `stirling`

You will be forced to change the password on first login when authentication is enabled.

### Health Endpoint

Railway uses the following endpoint for health checks:
- **URL:** `/api/v1/info/status`
- **Timeout:** 30 seconds
- **Start period:** 30 seconds (gives Java time to boot)

---

## Common Use Cases

- **Personal PDF toolkit** — Replace Acrobat with a self-hosted, private alternative
- **Team document processing** — Share PDF tools across a team without per-seat licenses
- **API-driven automation** — Integrate PDF conversion, OCR, and signing into CI/CD pipelines
- **Document signing workflows** — Self-hosted signing without third-party services

---

## Dependencies for Stirling PDF

### Deployment Dependencies

- **Runtime:** Java 17+ (bundled in container)
- **Storage:** Persistent volume at `/configs` — stores settings, user accounts, and config (auto-provisioned)
- **Optional:** PostgreSQL or MySQL for external database mode (not needed for basic usage)

---

## Local Development

```bash
# Clone this template
git clone https://github.com/INAPP-Mobile/railway-stirling-pdf.git
cd railway-stirling-pdf

# Run with Docker (standalone)
docker run -d -p 8080:8080 stirlingtools/stirling-pdf:latest

# Open http://localhost:8080
```

---

## License

Stirling PDF is open-core. The core PDF tools are MIT-licensed, with paid enterprise features available. See the [LICENSE](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/LICENSE) for details.

**Template License:** MIT — feel free to fork and adapt.

---

## Resources

- [Stirling PDF Documentation](https://docs.stirlingpdf.com)
- [Stirling PDF GitHub](https://github.com/Stirling-Tools/Stirling-PDF)
- [Stirling PDF API Docs](https://registry.scalar.com/@stirlingpdf/apis/stirling-pdf-processing-api/)
- [Railway Documentation](https://docs.railway.app)
- [Community Discord](https://discord.gg/HYmhKj45pU)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-stirling-pdf | [INAPP-Mobile/railway-stirling-pdf](https://github.com/INAPP-Mobile/railway-stirling-pdf) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Server timezone |
| `PORT` | 8080 | HTTP listen port |
| `SYSTEM_ALLOWOCR` | true | Enable/disable OCR features globally |
| `SYSTEM_ROOTPATH` | / | Base URL path for reverse proxy deployments |
| `SYSTEM_MAIL_PORT` | 587 | SMTP server port |
| `SYSTEM_UI_APPNAME` | Stirling-PDF | Custom application title |
| `SYSTEM_MAIL_ENABLED` | false | Enable SMTP email for invitations |
| `SYSTEM_UI_HIDELANGUAGE` | false | Hide language selection dropdown |
| `SYSTEM_SECURITY_LOGINENABLED` | (secret) | Enable authentication (true/false) |
| `SYSTEM_SECURITY_INITIALLOGINPASS` | (secret) | Initial admin password (change on first login) |
| `SYSTEM_SECURITY_INITIALLOGINUSER` | (secret) | Initial admin username |
| `SYSTEM_SECURITY_ENABLEMULTITENANCY` | false | Enable multi-instance user isolation |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/configs`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/railway-stirling-pdf)
