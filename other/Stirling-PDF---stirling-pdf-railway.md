# Deploy Stirling PDF on Railway

Adobe Acrobat alternative. Merge, split, compress, OCR, redact & sign

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stirling-pdf-railway)

## About

Stirling-PDF is an open source, self-hosted web toolkit for the PDF jobs people normally open Adobe Acrobat or a free upload site for: merge and split, rotate, compress, OCR scans, redact, watermark, sign forms, and convert to and from Word, Excel, PowerPoint and images. Around fifty tools share one browser UI and nearly all have a REST endpoint too, so one instance serves the person fixing a contract and the script stamping invoices overnight — and nothing uploaded leaves infrastructure you control.

Deploy Stirling-PDF on Railway and the fiddly parts are wired already. The template runs the official `stirlingtools/stirling-pdf:latest` image — the build with LibreOffice, Tesseract, OCRmyPDF, Ghostscript and qpdf baked in — on port 8080 behind managed HTTPS, with a 5 GB volume at `/configs` for the user database, settings, signing keys and saved signatures. Beside it runs `unoserver`, a private LibreOffice conversion service. An `admin` account is created with a generated password, and `/api/v1/info/status` health-gates each redeploy.

![Stirling-PDF Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786979801/579165f7-5c20-44f4-8321-e32455362ea6.png)

PDF work is where sensitive documents pile up. Public converters want all of it uploaded and desktop licences charge per seat, while a self-hosted instance gives a whole team the same operations on hardware you own.

- Roughly 50 tools: merge, split, rotate, crop, compress, repair, page numbers, watermarks
- OCR through Tesseract and OCRmyPDF, using the language data shipped in the image
- Office conversion both ways via LibreOffice, plus HTML and eBook conversion
- Redaction, password changes, certificate signing, and a REST endpoint per tool

**How the services fit together.** `stirling-pdf` is a Spring Boot backend with the frontend embedded, serving UI and API on 8080; all state sits on its volume — the H2 user database, `settings.yml`, JWT keys, the signing certificate and saved signatures. `unoserver` runs LibreOffice on port 2003 with no volume and no public domain, reached in upstream's "remote UNO" mode, which sends file *contents* over the private network, so no shared filesystem is needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| unoserver | `ghcr.io/stirling-tools/stirling-unoserver:latest` | Worker |
| stirling-pdf | `stirlingtools/stirling-pdf:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `UNOSERVER_PORT` | unoserver | 2003 | Conversion listen port |
| `UNOSERVER_UNO_PORT` | unoserver | 2002 | Internal UNO bridge port |
| `UNOSERVER_INTERFACE` | unoserver | 0.0.0.0 | Bind all interfaces |
| `UNOSERVER_CONVERSION_TIMEOUT` | unoserver | 1800 | Max seconds per conversion |
| `UNOSERVER_RECYCLE_INTERVAL_SECONDS` | unoserver | 3600 | Restart LibreOffice hourly |
| `PORT` | stirling-pdf | 8080 | Port Railway routes and probes |
| `METRICS_ENABLED` | stirling-pdf | true | Powers the health-check endpoint |
| `SYSTEM_BACKENDURL` | stirling-pdf | - | Public URL for OAuth/SAML callbacks |
| `SYSTEM_FRONTENDURL` | stirling-pdf | - | Public URL for invites and QR codes |
| `SECURITY_ENABLELOGIN` | stirling-pdf | (secret) | Require sign-in for UI and API |
| `SYSTEM_DEFAULTLOCALE` | stirling-pdf | en-US | Default interface language |
| `SYSTEM_ENABLEANALYTICS` | stirling-pdf | false | Keep upstream telemetry off |
| `SYSTEM_GOOGLEVISIBILITY` | stirling-pdf | false | Serve disallow-all robots.txt |
| `PROCESSEXECUTOR_AUTOUNOSERVER` | stirling-pdf | false | Same switch, Java binding name |
| `SECURITY_INITIALLOGIN_PASSWORD` | stirling-pdf | (secret) | First admin password, generated once |
| `SECURITY_INITIALLOGIN_USERNAME` | stirling-pdf | (secret) | First admin username |
| `PROCESS_EXECUTOR_AUTO_UNO_SERVER` | stirling-pdf | false | Startup script: skip local UNO pool |
| `PROCESSEXECUTOR_UNOSERVERENDPOINTS_0_HOST` | stirling-pdf | - | Conversion worker hostname |
| `PROCESSEXECUTOR_UNOSERVERENDPOINTS_0_PORT` | stirling-pdf | 2003 | Conversion worker port |
| `PROCESSEXECUTOR_UNOSERVERENDPOINTS_0_PROTOCOL` | stirling-pdf | http | Worker transport |
| `PROCESSEXECUTOR_UNOSERVERENDPOINTS_0_HOSTLOCATION` | stirling-pdf | remote | Send file contents, not paths |
| `PROCESSEXECUTOR_SESSIONLIMIT_LIBREOFFICESESSIONLIMIT` | stirling-pdf | 1 | Match the endpoint count |

## Configuration

- **Start command:** `/bin/bash -c 'set -e; mkdir -p /configs/customFiles /configs/pipeline; for d in customFiles pipeline; do [ -L "/$d" ] || { rm -rf "/$d"; ln -s "/configs/$d" "/$d"; }; done; echo "boot: $(ls -ld /customFiles /pipeline | tr "\n" " ")"; exec tini -- /scripts/init.sh'`
- **Healthcheck:** `/api/v1/info/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/configs`

**Category:** Other

[View on Railway →](https://railway.com/deploy/stirling-pdf-railway)
