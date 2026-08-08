# Deploy Debian Web Terminal — Browser-Based Linux Sandbox on Railway

Self-host a Linux shell in your browser — code from any device

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/debian-browser-linux-sandbox)

## About

Debian Web Terminal gives you a full Linux shell in your browser — a private, always-on cloud sandbox you can reach from any device with no SSH client, VPN, or local setup. Powered by ttyd on a stable Debian Bookworm base, it comes with git, Python 3, pip, curl, and wget ready to go, a persistent `/data` volume that survives redeploys, and password-protected access. It's the fastest way to get a throwaway-yet-persistent Linux environment for quick scripts, testing, and learning — from a Chromebook, tablet, or locked-down work laptop.

---

This is a simple, powerful utility, and the one thing to understand is exactly what persists — this template makes it clear.

**A real Linux shell, from any browser.** Open your Railway domain, authenticate, and you're in a bash shell on a full Debian system — run Python scripts, clone repos, test commands, install packages, all without touching your local machine. Because it's just a browser tab, it works identically from a laptop, a Chromebook, a tablet, or a work machine where you can't install a terminal.

**Only `/data` persists — plan your work there.** This is the key detail: files you keep in the `/data` volume survive redeploys, restarts, and crashes, but anything outside it — including packages installed with `apt-get` — lives on the container's ephemeral filesystem and resets on each redeploy. So keep your projects, scripts, and files under `/data`, and if you need specific tools installed permanently, note them in a setup script under `/data` rather than expecting `apt-get` installs to stick. Understanding this upfront is the difference between a sandbox that works for you and one that surprises you.

**Password-protected by default.** Access is guarded by HTTP Basic Auth via the `USERNAME` and `PASSWORD` variables, so set a strong password — this is a shell on the public internet. Railway's automatic HTTPS encrypts the connection.

**Pre-loaded and ready.** git, Python 3, pip, curl, and wget are installed out of the box, so you can clone a repo and run something immediately. The Debian Bookworm Slim base keeps the image tiny (~20 MB), so it starts fast and stays cheap.

**Use it responsibly.** This is a legitimate dev sandbox and learning environment — for writing and testing code, remote administration, and experimenting with Linux. It isn't for running background compute like mining or other resource-abuse workloads, which violate Railway's fair-use policy and can get your account suspended. Keep it to interactive, legitimate use.

Typical cost: **~$5/month** on Railway for light interactive use, scaling with the compute and memory you actually use. Debian and ttyd are free and open source.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Debian Linux | [sahilrupani/debian-linux](https://github.com/sahilrupani/debian-linux) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `PASSWORD` | (secret) | Set a password |
| `USERNAME` | (secret) | Set a username |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/debian-browser-linux-sandbox)
