# Deploy ParrotOS Core — Browser-Based Linux Sandbox on Railway

Self-host a Parrot Core Linux shell in your browser, any device

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/parrotos-core-web-terminal)

## About

ParrotOS Core Web Terminal gives you a full Linux shell in your browser, on the lightweight Parrot Core base — a private, always-on cloud sandbox you reach from any device with no SSH client or local setup. Powered by ttyd on the minimal Core edition (the stripped-down Parrot base, not a bundled toolset), it comes with a persistent `/data` volume that survives redeploys and password-protected access. It's a fast way to get a clean, disposable-yet-persistent Linux environment for learning, quick scripts, and administering your own systems — from a Chromebook, tablet, or locked-down laptop.

---

This is a simple browser-based Linux sandbox, and the one thing to understand is exactly what persists — this template makes it clear, and keeps usage on legitimate ground.

**A real Linux shell, from any browser.** Open your Railway domain, authenticate, and you're in a bash shell on a Parrot Core system — run scripts, clone repos, test commands, and learn Linux, all without touching your local machine. Because it's just a browser tab, it works identically from a laptop, Chromebook, tablet, or a work machine where you can't install a terminal.

**Core edition means a minimal base — add what you need.** Parrot Core is the lightweight foundation edition, deliberately without a bundled application suite, so you start from a clean, small system and install only the tools your work requires — a general-purpose Linux sandbox, not a preloaded appliance.

**Only `/data` persists — plan your work there.** This is the key detail: files you keep in the `/data` volume survive redeploys, restarts, and crashes, but anything outside it — including packages installed with the system package manager — lives on the ephemeral container filesystem and resets on each redeploy. So keep your projects, scripts, and files under `/data`, and script any custom tool installs so you can re-run them after a redeploy.

**Password-protected by default.** Access is guarded by HTTP Basic Auth via the `USERNAME` and `PASSWORD` variables, so set a strong password — this is a shell on the public internet. Railway's automatic HTTPS encrypts the connection.

**Use it responsibly — legitimate use only.** This is a general-purpose dev and learning sandbox for writing and testing code, learning Linux, and administering systems you own or are authorized to manage. It is not for scanning, probing, or attacking systems you don't own, or for background resource-abuse like mining — activities that violate Railway's fair-use and acceptable-use policies and can get your account suspended. Keep it to interactive, authorized, legitimate use.

Typical cost: **~$5/month** on Railway for light interactive use, scaling with the compute and memory you actually use. ParrotOS and ttyd are free and open source.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ParrotOS Core Edition (Web Terminal) | [decoge/parrotos-core-edition-webterminal-railway](https://github.com/decoge/parrotos-core-edition-webterminal-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | Choose a Password for ttyd web terminal basic authentication. |
| `USERNAME` | (secret) | Choose a Username for ttyd web terminal basic authentication. |

## Configuration

- **Volume:** `/work`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/parrotos-core-web-terminal)
