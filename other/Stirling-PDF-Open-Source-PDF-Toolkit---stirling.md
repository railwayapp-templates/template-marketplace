# Deploy Stirling-PDF | Open Source PDF Toolkit on Railway

Self-host Stirling-PDF. Private PDF processing, split, merge, OCR & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stirling)

## About

Stirling-PDF is a self-hosted, web-based PDF manipulation toolkit with 50+ tools — merge, split, rotate, OCR, sign, redact, compress, and convert to and from Office formats — all running locally with no third-party uploads. Self-host Stirling-PDF on Railway to keep sensitive PDFs inside your own infrastructure while replacing paid services like Adobe Acrobat online and ILovePDF.

This Railway template deploys the official `stirlingtools/stirling-pdf:latest-fat` image with login enabled, a persistent volume mounted at `/configs` (so user accounts and settings survive redeploys), reverse-proxy headers configured for Railway's TLS-terminating edge, and sensible production defaults.

![Stirling-PDF logo](https://res.cloudinary.com/asset-cloudinary/image/upload/v1778338601/5094a35c-dee3-4c1f-99dd-d0292cc80fee.png)

Stirling-PDF is an open-source Spring Boot application that wraps LibreOffice, Tesseract OCR, qpdf, Ghostscript, OCRmyPDF, and Calibre into a single web UI. It runs locally — every PDF you upload is processed inside your Railway container and never leaves the box.

**Key features:**
- 50+ PDF tools — merge, split, rotate, crop, watermark, redact, sign, compress, repair
- Optical Character Recognition (OCR) with multi-language Tesseract data files
- Office format conversions (DOCX, XLSX, PPTX, ODT) via embedded LibreOffice
- Pipelines: chain multiple operations into reusable workflows
- Built-in user accounts, role-based access, and an API-key system for programmatic use
- REST API documented via Swagger UI

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Stirling-PDF | `stirlingtools/stirling-pdf:latest-fat` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Hardcoded internal port (do not change) |
| `LANGS` | en_GB,en_US | Frontend locale codes |
| `UI_APPNAME` | Stirling-PDF | Browser tab + header app name |
| `SHOW_SURVEY` | false | Hide in-app survey banner |
| `METRICS_ENABLED` | true | Expose /actuator Prometheus endpoints |
| `JAVA_CUSTOM_OPTS` | -Xmx3g | Cap JVM heap so LibreOffice has headroom |
| `UI_APPNAMENAVBAR` | Stirling-PDF | Navbar app name |
| `SYSTEM_MAXFILESIZE` | 200 | Max upload size in MB |
| `UI_HOMEDESCRIPTION` | Self-hosted PDF toolkit on Railway | Home page tagline |
| `SECURITY_ENABLELOGIN` | (secret) | Force login screen for all users |
| `SYSTEM_DEFAULTLOCALE` | en-US | Default UI locale |
| `DOCKER_ENABLE_SECURITY` | true | Enable login/security features |
| `SYSTEM_GOOGLEVISIBILITY` | false | Block search-engine indexing |
| `DISABLE_ADDITIONAL_FEATURES` | false | Keep extra features (Calibre, etc.) on |
| `SECURITY_CUSTOMGLOBALAPIKEY` | - | Global REST API key |
| `SERVER_FORWARDHEADERSSTRATEGY` | NATIVE | Trust Railway X-Forwarded-* headers |
| `SECURITY_INITIALLOGIN_PASSWORD` | (secret) | Initial admin password (ASCII only) |
| `SECURITY_INITIALLOGIN_USERNAME` | (secret) | Initial admin username |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/configs`

**Category:** Other

[View on Railway →](https://railway.com/deploy/stirling)
