# Deploy Alltube on Railway

HTML GUI for youtube-dl with video conversion capabilities

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/alltube)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/alltube)

### Deploy and Host AllTube on Railway

**AllTube** is a web user interface for youtube-dl / yt-dlp that enables users to download, stream, remux, and convert videos and audio from YouTube and hundreds of other supported websites. This Railway template deploys the `dnomd343/alltube:latest` Docker image as a lightweight web server listening on port `80` with automated HTTPS public access.

---

#### About Hosting AllTube

Hosting AllTube on Railway runs a single container using the `dnomd343/alltube:latest` image. It serves a clean, responsive HTML web application powered by PHP and underlying media extraction libraries. The server listens on internal port `80` and is exposed publicly via Railway's automatically generated HTTPS domain.

---

#### Common Use Cases

* **Web-based video & audio downloader**: Download videos from YouTube, Vimeo, SoundCloud, and over 1,000 supported platforms directly through your browser.
* **Format conversion & audio extraction**: Automatically extract MP3/AAC audio or convert video files on the fly before downloading.
* **Direct browser streaming**: Stream video or audio directly through the web interface without downloading the entire file first.
* **Self-hosted media grabber**: Maintain a private media downloading portal accessible from desktop or mobile devices.

---

#### Dependencies for AllTube Hosting

* **AllTube image:** `dnomd343/alltube:latest`
* **Railway public domain** mapped to port `80`
* No external database or persistent volume required

**Upstream:** [GitHub](https://github.com/Rudloff/alltube) · [Docker Hub](https://hub.docker.com/r/dnomd343/alltube)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Image** | `dnomd343/alltube:latest` |
| **Web UI Port** | `80` |
| **Volume Mount** | None required |
| **Domain** | `${{RAILWAY_PUBLIC_DOMAIN}}` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **alltube** | Web UI + Downloader / Transcoder | None | Yes (Port `80`) | Single container running PHP + youtube-dl / yt-dlp |

###### Volumes (drives) — what to mount

This service operates statelessly. Downloaded files are converted/streamed in-flight or buffered temporarily in container memory during user sessions. No persistent volume is required.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for the container to provision and initialize.
4. Open the **alltube** service → **Settings** → **Networking** and click the generated public domain URL.
5. Paste any supported video or audio URL into the AllTube web interface to stream or download media.

---

#### Configuration

Container-level environment variables defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `TITLE` | `My AllTube Site` | Web page heading and brand title displayed on the frontend |
| `CONVERT` | `true` | Enables video/audio format conversion options on downloads |
| `STREAM` | `true` | Enables direct media streaming in browser or downstream clients |
| `REMUX` | `true` | Enables remuxing audio and video streams on the fly |
| `PORT` | `80` | Internal HTTP port the web server listens on |

##### Custom Domain

1. Open the **alltube** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Railway provisions TLS automatically.
4. Access your AllTube instance securely at `https://your.custom.domain`.

---

#### Updating AllTube

1. Open the **alltube** service → **Settings** → **Source**.
2. Trigger a redeploy or update the Docker image tag.
3. Click **Redeploy**.

Because AllTube is stateless, updates complete seamlessly without affecting persistent state.

---

#### Traps

**Ways this still fails or surprises people:**

* **Rate limiting & IP blocks by platforms** — High-volume downloading from YouTube or other video hosting providers may result in temporary IP bans or CAPTCHA requirements from the host platform.
* **Large file streaming timeouts** — Remuxing or converting extremely large high-resolution video files on the fly can consume significant container memory or hit HTTP timeout limits.
* **Upstream yt-dlp changes** — Video platforms frequently update their APIs and anti-bot measures. If downloads fail across all URLs, trigger a container redeploy to pull the latest image with updated extraction scripts.
* **Public exposure risks** — Deploying AllTube with a public domain exposes a media downloader to anyone with the link. Consider restricting access via custom domain authorization or Railway access controls if you want to prevent public bandwidth usage.

---

#### Why Deploy AllTube on Railway?

Railway provides a simple, zero-maintenance platform to host lightweight web utilities without managing virtual servers. Hosting AllTube on Railway gives you instant HTTPS deployment, custom domain support, and automatic container orchestration out of the box.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Alltube | `dnomd343/alltube:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port the app listens on inside the container |
| `REMUX` | true | Enables remuxing (repackaging streams into a container without re-encoding) |
| `TITLE` | My AllTube Site | Site title shown in the AllTube web UI |
| `STREAM` | true | Enables direct streaming/preview of media instead of download-only |
| `CONVERT` | true | Enables audio/video format conversion options for downloads |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/alltube)
