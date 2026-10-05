# Deploy Mobius on Railway

Mobius [Oct'26] — an AI agent that builds apps, with memory that persists

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mobius-ai-agent)

## About

Möbius is an open-source, self-hosted workspace for AI agents — a personal AI operating system rather than a chat window. A coding agent builds mini-apps beside the conversation, keeps durable memory of how you work, reviews each day overnight, and installs skills that outlive the chat. This template runs it as a single container with a volume holding the part that matters: everything your agent has learned.

Möbius is designed to run on a machine you control, with a shell. Railway gives you a container and no host, and that difference shapes what works.

**In-app platform updates do not work here.** Upstream's setup ends by installing a host-level helper that powers Settings → Replace container, granting that one operation outside the container. Railway has no host to install it on, and a container cannot replace itself. Updating means redeploying through Railway against a newer image or commit, not clicking update inside the app.

**The volume holds a month of accumulated work, not a cache.** Memory, skills, Reflection output and the apps your agent built are all written at runtime. Lose the volume and you have not lost files — you have lost the personalisation that is the whole reason to run this rather than a chat app, and no re-prompting rebuilds it. Confirm the mount before your first real conversation.

**TLS terminates at Railway's edge, not in Caddy.** The repository ships a Caddyfile that obtains certificates for `DOMAIN` on a normal server. Behind Railway's proxy that is the wrong layer — the edge already holds the certificate, and an in-container ACME attempt fails or fights it. Publish the app port directly and let Railway do HTTPS.

**Your provider subscription may not cover this.** Möbius runs on your existing Claude Code or ChatGPT (Codex) plan rather than an API key. Those are individual subscriptions, and driving one from a server-hosted agent — especially a shared pool — is worth checking against your provider's terms first. The architecture is sound; the licence question is yours.

**Published apps are public repositories.** Apps live as repositories under the Möbius OS organisation, so publishing an app means publishing a repo. Useful for sharing, worth knowing before an agent builds something containing your business logic or customer data.

**An agent with a shell behind one login.** By design it writes and runs code in its own environment, reaches connected services, and acts while you are away. Your authentication is the security boundary, so treat the deployment like a server you administer rather than a web app you use.

Typical cost: **~$20–40/month** at $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes. Builds and background runs are bursty, so size for the peak rather than the idle. Möbius is MIT licensed; model usage bills to your existing plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mobius | `ghcr.io/mobius-os/mobius` | Database |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mobius-ai-agent)
