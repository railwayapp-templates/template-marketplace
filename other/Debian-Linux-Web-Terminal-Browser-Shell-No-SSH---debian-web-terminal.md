# Deploy Debian Linux Web Terminal — Browser Shell, No SSH on Railway

Full Debian terminal in your browser. No SSH, no VPS. Optional persistence.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/debian-web-terminal)

## About

A full Debian Bookworm Linux terminal in your browser — no VPS, no SSH client, no local
install. Password-protected web shell powered by ttyd, with pre-installed developer tools
(git, curl, python3, build essentials) and an optional persistent volume so your files and
installed packages survive every redeploy. Open a tab, log in, and you have a real Linux box
from any device, anywhere.

Self-host for ~$2–5/month on Railway — a cheaper, faster-to-launch alternative to a $5/month
VPS, with automatic HTTPS and zero server setup. Spin it up in 30 seconds, tear it down when
you're done.

---

A cloud Linux terminal is one of the most useful things to keep on hand — testing shell
scripts, learning Linux, running quick Python jobs, trying CLI tools, or having a clean
throwaway environment that isn't your laptop. The usual options are a $5/month VPS you have to
provision, secure, and SSH into, or a local VM that's tied to one machine.

Railway gives you the same thing through a browser tab. This template runs Debian behind a
password-protected ttyd web terminal with automatic HTTPS — no SSH key setup, no firewall
config, no provisioning. Add a Railway volume and your environment persists; leave it off and
it's a clean throwaway box every deploy.

Typical cost: **~$2–5/month** on Railway's Hobby plan — and it scales to zero when idle, so a
terminal you use occasionally costs almost nothing. A traditional VPS bills 24/7 whether you
use it or not.

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

[View on Railway →](https://railway.com/deploy/debian-web-terminal)
