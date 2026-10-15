# Deploy LanguageTool | (Just Updated) Grammar and Spell Check API, Self-Hosted Grammarly Alternative on Railway

Self-hosted grammar and spell check API, no setup, 30+ languages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/languagetool-or-just-updated-grammar-and)

## About

LanguageTool is an open-source grammar, style and spell checker covering more than 30 languages. This template runs its HTTP API server (`/v2/check`) as a single service from a digest-pinned community image, with language detection enabled and the JVM heap sized to the container.

LanguageTool is a Java server and needs a few things handled for Railway, all done in the start command:

- **Heap from the container, not the host.** The JVM would otherwise size itself from the host's memory. The start command reads the container memory limit and sets the maximum heap to 70% of it (capped at 6 GB).
- **Railway's port.** The server listens on the port Railway injects, so the HTTP healthcheck on `/v2/languages` reaches it.
- **Language detection.** The bundled fastText model is enabled, so `language=auto` works.
- **No state.** Rules and models ship inside the image, so no volume is needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| languagetool | `erikvl87/languagetool:6.8@sha256:ef8fa12cbd485166c9ceeb7139d76d56d07707a624da6bb1fc1fbb5411750527` | Web service |

## Configuration

- **Start command:** `/bin/bash -c 'cd /LanguageTool; lim=$(cat /sys/fs/cgroup/memory.max 2>/dev/null); if [ "$lim" -gt 0 ] 2>/dev/null; then mb=$((lim/1024/1024*70/100)); [ $mb -gt 6144 ] && mb=6144; else mb=1024; fi; echo "languagetool uid=$(id -u) port=${PORT:-8010} xmx=${mb}m"; exec java -Xms256m -Xmx${mb}m -cp languagetool-server.jar org.languagetool.server.HTTPServer --port ${PORT:-8010} --public --allow-origin "*" --config config.properties'`
- **Healthcheck:** `/v2/languages`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/languagetool-or-just-updated-grammar-and)
