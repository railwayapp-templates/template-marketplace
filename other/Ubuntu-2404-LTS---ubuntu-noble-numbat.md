# Deploy Ubuntu 24.04 LTS on Railway

Cloud-hosted Ubuntu 24.04 with SSH and persistent volume storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-noble-numbat)

## About

Ubuntu 24.04 LTS (Noble Numbat) is a stable, long-term-support Linux distribution supported until April 2029. This template deploys the official Ubuntu 24.04 Docker image on Railway as a lightweight, cloud-hosted Linux environment with SSH access and a persistent volume — a clean Ubuntu box you can reach from anywhere, without provisioning or maintaining a VPS.

---

Spinning up a Linux box normally means renting a VPS, configuring SSH, patching the OS, and paying for it whether or not you use it. For a quick sandbox — testing a script, inspecting a package, running a one-off command — that is a lot of overhead for a throwaway environment.

This template gives you a running Ubuntu 24.04 container in about a minute. Connect over SSH from the Railway dashboard, run Linux commands, install packages with `apt`, test binaries, or use it as a cloud-hosted shell. Because Railway runs containers rather than virtual machines, anything written to the root filesystem is lost on redeploy — so a Railway Volume is mounted at `/data`, and files, logs, configuration, and project data placed there survive restarts and redeployments.

Typical cost: **~$5/month** on Railway's Hobby plan for a single always-on Ubuntu environment, scaling with the resources you actually use.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ubuntu | `ubuntu:24.04` | Database |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ubuntu-noble-numbat)
