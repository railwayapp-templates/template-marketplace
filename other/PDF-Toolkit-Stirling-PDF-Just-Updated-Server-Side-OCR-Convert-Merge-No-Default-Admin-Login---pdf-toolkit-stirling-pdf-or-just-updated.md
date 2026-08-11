# Deploy PDF Toolkit (Stirling-PDF) | (Just Updated) Server-Side OCR, Convert, Merge — No Default Admin Login on Railway

Server-side OCR, convert and merge PDFs. No default admin login, data kept.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pdf-toolkit-stirling-pdf-or-just-updated)

## About

Stirling-PDF is a self-hosted PDF toolkit: OCR scanned documents, convert Office files and
images to PDF, merge, split, rotate, compress, sign, redact, add or remove passwords, and run
the same 50+ operations over a documented REST API. Unlike browser-only PDF apps, the heavy
work (Tesseract OCR, LibreOffice conversion, Ghostscript compression) runs on the server, so
it also works as an automation backend for scripts, n8n and agents.

This template deploys the official `stirlingtools/stirling-pdf:2.14.3-fat` image — the
variant that ships Tesseract, LibreOffice, Ghostscript, qpdf, ImageMagick and Calibre, so
OCR and Office conversion work on the first request with nothing to install.

Two things are done differently here, and both were measured against the other Stirling-PDF
listings on Railway:

1. **The admin account is seeded from a generated secret.** Stirling-PDF creates a
   `admin` / `stirling` account whenever `SECURITY_INITIALLOGIN_PASSWORD` is empty — and it
   does that in the fat image even with `DOCKER_ENABLE_SECURITY=false`, because the security
   profile is always active in that jar. On a public Railway URL that means anyone can log in
   with the documented default and take the instance over. This template generates the
   password per deploy and **refuses to boot** if it is blank.
2. **Everything stateful lands on one volume.** Railway allows a single mount per service,
   while Stirling-PDF writes to five paths: `/configs` (settings plus the H2 user database),
   `/storage` (server-side file storage), `/customFiles` (branding overrides), `/pipeline`
   (automation configs) and `/logs`. The start command relocates all five onto `/data` and
   repairs ownership, because Railway mounts volumes as uid 0 while the app runs as uid 1000.

No JVM heap flag is set on purpose: the image's own init script reads the container's cgroup
memory limit and applies `-XX:MaxRAMPercentage=50`, so a fixed `-Xmx` only caps the heap
below what the plan already allows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| stirling-pdf | `stirlingtools/stirling-pdf:2.14.3-fat` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECURITY_INITIALLOGIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "set -e;if [ -z \"$SECURITY_INITIALLOGIN_PASSWORD\" ]; then echo \"[railway] SECURITY_INITIALLOGIN_PASSWORD is empty; refusing to boot (upstream would create the default admin/stirling account)\"; exit 1; fi;export DOCKER_ENABLE_SECURITY=true SECURITY_ENABLELOGIN=true SECURITY_INITIALLOGIN_USERNAME=admin SYSTEM_GOOGLEVISIBILITY=false SYSTEM_ENABLEANALYTICS=false SYSTEM_MAXFILESIZE=200 SHOW_SURVEY=false METRICS_ENABLED=false SERVER_FORWARDHEADERSSTRATEGY=NATIVE LANGS=en_US UI_APPNAME=Stirling-PDF UI_APPNAMENAVBAR=Stirling-PDF;mkdir -p /data;for d in /configs /customFiles /pipeline /storage /logs; do t=/data/$(basename $d); if [ ! -L $d ]; then if [ ! -d $t ]; then mkdir -p $t; [ -d $d ] && cp -a $d/. $t/ 2>/dev/null || true; fi; rm -rf $d; ln -s $t $d; fi; chown -R 1000:1000 $t; done;chown 1000:1000 /data;echo \"[railway] data owner=$(stat -c %u:%g /data)\";exec tini -- /scripts/init.sh;"`
- **Healthcheck:** `/api/v1/info/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pdf-toolkit-stirling-pdf-or-just-updated)
