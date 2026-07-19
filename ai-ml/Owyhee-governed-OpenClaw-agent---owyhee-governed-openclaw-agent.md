# Deploy Owyhee-governed OpenClaw agent on Railway

OpenClaw agent with Owyhee governance: custody, approvals, audit trail.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/owyhee-governed-openclaw-agent)

## About

An OpenClaw AI agent, pre-hardened and wired to Owyhee — the control plane that keeps the agent's credentials in custody, gates risky actions behind approvals, enforces budgets, and records an audit trail of everything the agent does. Deploy, claim your account from the email you receive, approve and go.

This template runs the hardened OpenClaw container as a single private service — no public domain is exposed, and the agent only talks outbound to the Owyhee control plane. On first boot it provisions a claimable Owyhee account for the email you provide and sends a claim link. The volume mounted at /data preserves the agent's identity and account across redeploys. You supply your own Anthropic API key for inference. Tool credentials never live in the container — they stay in Owyhee custody, and every tool action is checked against your policies before it runs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| machinesofdesire/owyhee-openclaw:latest | `ghcr.io/machinesofdesire/owyhee-openclaw:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OWYHEE_BASE_URL` | https://console.kipplelabs.com | Owyhee control plane URL. Leave the default unless you self-host Owyhee. |
| `ANTHROPIC_API_KEY` | (secret) | Anthropic API key the agent uses for inference (from console.anthropic.com). |
| `OWYHEE_DEPLOY_REF` | railway | Deploy path identifier — leave as "railway". |
| `OWYHEE_MCP_SERVERS` | - | Optional: MCP servers to connect through Owyhee's governed proxy (comma-separated). |
| `OWYHEE_DEPLOY_EMAIL` | - | Your email — receives the claim link for the governed account. |
| `OWYHEE_DEPLOY_TOKEN` | (secret) | Optional: provisioning token from Kipple Labs, needed while claimable accounts are gated. |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/owyhee-governed-openclaw-agent)
