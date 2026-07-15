# Deploy hippocamp on Railway

Run Hippocamp Dream overnight and open reviewable memory compaction PRs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hippocamp)

## About

Run Hippocamp's memory compaction overnight without keeping your computer awake. This template creates a scheduled Railway service that clones your private Lagoon memory repository, compacts projects over the configured wake-up threshold, and opens one reviewable pull request per project.

The service runs once per day at `03:17 UTC` and exits after it finishes. Each run starts from a fresh clone, writes only `current_state.md` and `open_threads.md`, and leaves append-only events untouched. GitHub remains the audit trail and review surface; Railway only hosts the scheduled job.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dream | [guillaumegay13/hippocamp](https://github.com/guillaumegay13/hippocamp) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GITHUB_TOKEN` | (secret) |
| `MANIFEST_API_KEY` | (secret) |

**Category:** AI/ML · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/hippocamp)
