# Deploy Promptfoo — Self-Hosted LLM Eval Dashboard on Railway

Self-host Promptfoo — private dashboard for LLM eval results

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/promptfoo-llm-evals)

## About

Promptfoo is a popular open-source tool for testing, evaluating, and red-teaming LLM apps — used by teams to catch prompt regressions, compare models, and probe applications for vulnerabilities. This template deploys the self-hosted Promptfoo server: a private web dashboard where your team's evaluation results live on your own infrastructure instead of the public cloud. Run evals locally or in CI, then share the results to your Railway instance — keeping sensitive prompts, outputs, and red-team findings entirely under your control.

---

This template hosts Promptfoo's self-hosted results dashboard — knowing exactly what it's for keeps expectations right, and this template handles the setup.

**It's a private results dashboard and sharing target — not where you run evals.** The main workflow stays the same: you run `promptfoo eval` locally or in your CI pipeline. What this server changes is *where the results go* — instead of publishing to Promptfoo's public cloud with `promptfoo eval --share`, you point sharing at your Railway instance, so your team browses, compares, and reviews eval history on infrastructure you own. This is the reason to self-host: keeping sensitive prompts and outputs private.

**Point your local Promptfoo at this instance.** After deploy, set your local environment to share to your Railway URL: `PROMPTFOO_REMOTE_API_BASE_URL=https://your-instance.railway.app` and `PROMPTFOO_SHARE_STORE_TYPE=database`. Then `promptfoo eval --share` publishes results to your private dashboard instead of the public site. You can also run evals directly from the web UI if you add provider keys.

**Persist the volume — it holds all your eval history.** The SQLite database at `/home/promptfoo/.promptfoo` stores every evaluation you've shared. Without the mounted volume, that history is wiped on redeploy. This template mounts it so your results persist.

**Best for individuals and small teams — by design.** Promptfoo's self-hosted server is intended for individual or small-team use: SQLite, no horizontal scaling, no multi-team access control or SSO. Run a single instance (multiple replicas can't share the SQLite database and will error). For organization-wide or high-scale needs, Promptfoo offers an Enterprise platform — this template fits a team wanting a private, self-hosted results hub.

**Add provider keys for in-UI evals.** Optionally set `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or others so users can create and run evals directly from the web UI, bringing your own keys. Without them, the instance still serves as the results dashboard for CLI/CI evals.

**Red-teaming and regression testing.** Use Promptfoo to run adversarial tests against your LLM app and review attack results and failure modes in the dashboard, and to catch prompt regressions automatically in CI — with all findings stored privately on your instance.

Typical cost: **~$5/month** on Railway — Promptfoo is lightweight, since the heavy compute happens on the LLM provider side. It's MIT-licensed and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Promptfoo | `ghcr.io/promptfoo/promptfoo` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `PROMPTFOO_DISABLE_UPDATE` | 1 |
| `PROMPTFOO_DISABLE_TELEMETRY` | 1 |

## Configuration

- **Volume:** `/home/promptfoo/.promptfoo`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/promptfoo-llm-evals)
