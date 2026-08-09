# Deploy Mastra Evals with Memory on Railway

Run Mastra evals on memory-enabled agents. Mock model, no API keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mastra-evals-with-memory)

## About

[Mastra](https://mastra.ai) is the open-source TypeScript framework for building AI agents and workflows. This template runs three working recipes for evaluating memory-enabled agents with Mastra evals: a global `runEvals` call with shared memory, a per-item loop that gives each dataset row its own thread, and a `Dataset.startExperiment` run that forwards memory through an inline task. It uses a deterministic mock model, so runs are reproducible and need no API keys.

This is a run-once demo service. On deploy, it executes all three eval recipes and prints scored results to the deploy logs, then exits. Redeploy to run the evals again. Swap the mock model for a real provider and point the dataset at your own agent to turn it into a real eval harness for CI or scheduled quality checks (add a cron schedule in service settings).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mastra Evals | [leoisadev1/mastra-template-evals-with-memory](https://github.com/leoisadev1/mastra-template-evals-with-memory) | Worker |

**Category:** AI/ML · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/mastra-evals-with-memory)
