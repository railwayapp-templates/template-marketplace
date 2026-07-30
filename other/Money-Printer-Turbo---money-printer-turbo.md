# Deploy Money Printer Turbo on Railway

AI generates HD short videos from a single topic instantly with one click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/money-printer-turbo)

## About

MoneyPrinterTurbo turns a topic or keyword into a finished short video. It writes the script with an LLM, pulls matching stock footage, generates voiceover and subtitles, adds background music, and renders high-definition vertical or landscape clips through a web UI, a REST API, or in batches.

![Interface](https://raw.githubusercontent.com/arloodots/MoneyPrinterTurbo/refs/heads/main/moneyprinter.png)

Hosting this template deploys two services on Railway. The app service runs the Streamlit WebUI and FastAPI service side by side within a single container, backed by a 5 GB volume that preserves **config.toml** and all generated videos. The proxy service uses Caddy to serve both tools on a single public domain, securing them with a login prompt since MoneyPrinterTurbo lacks built-in authentication. The initial deployment takes several minutes to pull the multi-GB image. Rendering is CPU-intensive, taking a minute or more per video, or longer if you configure Whisper for subtitles, which downloads its model on first use.

![apis](https://raw.githubusercontent.com/arloodots/MoneyPrinterTurbo/main/docs/api.jpg)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/harry0703/moneyprinterturbo:latest` | Web service |
| proxy | `caddy:2-alpine` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | app | 8501 | Port Streamlit binds. Railway's healthcheck probes it, so leave at 8501. |
| `HIDE_CONFIG` | app | false | Hide the WebUI's settings panel once configured. |
| `LLM_API_KEY` | app | (secret) | API key for LLM_PROVIDER. Can also be set later in the WebUI. |
| `SEED_SCRIPT` | app | """Seed /data/config.toml from config.example.toml plus Railway variables.

Runs once, on first boot only. After that the file on the volume is the source
of truth, because the WebUI writes settings back to it and those edits must
survive a redeploy.
"""

import os

import toml

SRC = "/MoneyPrinterTurbo/config.example.toml"
DST = "/data/config.toml"


def env(name):
    value = os.getenv(name, "").strip()
    return value or None


def env_list(name):
    value = env(name)
    if not value:
        return None
    return [item.strip() for item in value.split(",") if item.strip()]


cfg = toml.load(SRC)
app = cfg.setdefault("app", {})

provider = env("LLM_PROVIDER") or app.get("llm_provider", "moonshot")
app["llm_provider"] = provider

# Each provider keeps its credentials under its own prefixed keys, so the
# generic LLM_* variables are written to whichever provider is selected.
for var, suffix in (
    ("LLM_API_KEY", "api_key"),
    ("LLM_BASE_URL", "base_url"),
    ("LLM_MODEL_NAME", "model_name"),
):
    value = env(var)
    if value:
        app[f"{provider}_{suffix}"] = value

for source in ("pexels", "pixabay", "coverr"):
    keys = env_list(f"{source.upper()}_API_KEYS")
    if keys:
        app[f"{source}_api_keys"] = keys

for var, key in (("VIDEO_SOURCE", "video_source"), ("SUBTITLE_PROVIDER", "subtitle_provider")):
    value = env(var)
    if value:
        app[key] = value

hide_config = env("HIDE_CONFIG")
if hide_config:
    app["hide_config"] = hide_config.lower() in ("1", "true", "yes")

whisper_model = env("WHISPER_MODEL_SIZE")
if whisper_model:
    cfg.setdefault("whisper", {})["model_size"] = whisper_model

with open(DST, "w", encoding="utf-8") as fp:
    toml.dump(cfg, fp)

print(f"seeded {DST} (llm_provider={provider})")
 | Internal: writes config.toml from these variables on first boot only. Do not edit. |
| `LLM_BASE_URL` | app | - | Override the provider's API base URL. Leave empty for its default. |
| `LLM_PROVIDER` | app | moonshot | LLM used to write scripts, e.g. moonshot, openai, gemini, deepseek, qwen. |
| `START_SCRIPT` | app | set -eu

# The volume is the only writable, persistent path. config.toml and storage/
# both live there; the app's own directory is recreated from the image on
# every deploy.
mkdir -p /data/storage

if [ ! -f /data/config.toml ]; then
	printf '%s' "$SEED_SCRIPT" > /tmp/seed-config.py
	python3 /tmp/seed-config.py
fi

# config.toml must sit inside the app root: config.py derives its path from the
# package location and rewrites the file in place via os.replace(), which would
# clobber a symlink. So copy it in at boot and mirror edits back to the volume.
cp -f /data/config.toml /MoneyPrinterTurbo/config.toml
(
	while true; do
		sleep 10
		cp -f /MoneyPrinterTurbo/config.toml /data/config.toml 2>/dev/null || true
	done
) &

# storage/ only ever gets new files written into it, so a symlink is safe here.
rm -rf /MoneyPrinterTurbo/storage
ln -sfn /data/storage /MoneyPrinterTurbo/storage

# Upstream runs these as two containers sharing one bind mount. A Railway volume
# attaches to a single service, and both processes need the same config.toml and
# storage/, so they run side by side here instead.
python3 main.py &

exec streamlit run ./webui/Main.py \
	--server.address=0.0.0.0 \
	--server.port=8501 \
	--browser.serverAddress="$PUBLIC_DOMAIN" \
	--browser.serverPort=443 \
	--server.enableCORS=true \
	--server.enableXsrfProtection=true \
	--browser.gatherUsageStats=false \
	--client.toolbarMode=minimal \
	--logger.hideWelcomeMessage=true \
	--server.showEmailPrompt=False
 | Internal: boot script that wires the volume and runs both processes. Do not edit. |
| `VIDEO_SOURCE` | app | pexels | Where footage comes from: pexels, pixabay, coverr, or local.Can also be set later in the WebUI. |
| `PUBLIC_DOMAIN` | app | - | Proxy's public domain; Streamlit needs it to accept the websocket. |
| `LLM_MODEL_NAME` | app | - | Override the provider's model. Leave empty for its default.Can also be set later in the WebUI. |
| `COVERR_API_KEYS` | app | (secret) | Coverr keys, comma-separated. Needed if VIDEO_SOURCE=coverr.Can also be set later in the WebUI. |
| `PEXELS_API_KEYS` | app | (secret) | Free Pexels keys for stock footage, comma-separated. Needed if VIDEO_SOURCE=pexels.Can also be set later in the WebUI. |
| `PIXABAY_API_KEYS` | app | (secret) | Pixabay keys, comma-separated. Needed if VIDEO_SOURCE=pixabay.Can also be set later in the WebUI. |
| `SUBTITLE_PROVIDER` | app | edge | Subtitles from TTS timings (edge) or local transcription (whisper). |
| `WHISPER_MODEL_SIZE` | app | large-v3-turbo | Whisper model, downloaded on first use. Only used when SUBTITLE_PROVIDER=whisper. |
| `PORT` | proxy | 8080 | Port the proxy binds. Must match the public domain's port. |
| `API_HOST` | proxy | - | Internal: private address of the FastAPI service. |
| `CADDYFILE` | proxy | {
	admin off
	auto_https off
}

:{$PORT} {
	respond /proxy-healthz 200

	# The healthcheck must stay reachable without credentials, or the deploy
	# never goes healthy.
	@protected not path /proxy-healthz
	basic_auth @protected {
		{$WEBUI_USERNAME} {$WEBUI_PASSWORD_HASH}
	}

	# The FastAPI service owns these paths; Streamlit serves everything else.
	@api path /api/* /docs /docs/* /redoc /openapi.json /tasks/*
	reverse_proxy @api {$API_HOST}

	reverse_proxy {$WEBUI_HOST}
}
 | Internal: proxy config routing the API and WebUI. Do not edit. |
| `WEBUI_HOST` | proxy | - | Internal: private address of the Streamlit WebUI. |
| `WEBUI_PASSWORD` | proxy | (secret) | Password for the login prompt. |
| `WEBUI_USERNAME` | proxy | (secret) | Username for the login prompt guarding the app. |

## Configuration

- **Start command:** `sh -c 'printf "%s" "$START_SCRIPT" > /tmp/start-app.sh && exec sh /tmp/start-app.sh'`
- **Healthcheck:** `/_stcore/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `sh -c 'export WEBUI_PASSWORD_HASH=$(caddy hash-password --plaintext "$WEBUI_PASSWORD") && printf "%s" "$CADDYFILE" > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/proxy-healthz`

**Category:** Other

[View on Railway →](https://railway.com/deploy/money-printer-turbo)
