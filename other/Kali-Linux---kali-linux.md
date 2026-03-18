# Deploy Kali Linux on Railway

Kali Linux rolling Docker image for penetration testing and security labs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kali-linux)

## About

Kali Linux is a Debian-based Linux distribution designed specifically for penetration testing, security auditing, and digital forensics. It provides a powerful, flexible platform trusted by security professionals worldwide and is accessed entirely via the command line using the Railway CLI.

Deploying Kali Linux on Railway uses the official **kali-rolling** Docker image in a lightweight, containerized environment. Railway handles orchestration, networking, and scaling, giving you instant access to a clean Kali Linux system without managing servers, SSH keys, or infrastructure manually.

A persistent volume is mounted at `/data` to retain installed tools, scripts, configurations, and collected artifacts across redeployments and restarts. This setup delivers an on-demand, cloud-hosted Kali Linux environment ideal for penetration testing labs, security research, and isolated experimentation.

&gt; **Important:** The base Kali image does **not** include tools by default. This allows you to keep the environment minimal and install only what you need.

You can install tools manually, for example:

```bash
apt update && apt -y install 
```

Or install predefined toolsets:

```bash
apt update && apt -y install kali-linux-headless
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kali Linux | `kalilinux/kali-rolling` | Database |

## Configuration

- **Start command:** `sleep infinity`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/kali-linux)
