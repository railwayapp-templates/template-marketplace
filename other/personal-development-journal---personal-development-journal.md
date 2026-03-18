# Deploy personal-development-journal on Railway

Deploy your own customizeable Personal Development Journal

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/personal-development-journal)

## About

A daily journaling automation tool that uses an LLM to generate a focused personal development prompt and emails it to you each morning via Brevo. Questions rotate across languages and theme categories, and a feedback loop shapes future prompts based on your 👍/👎 responses.

Hosting personal-development-journal on Railway runs the Flask feedback server that powers the thumbs up/thumbs down rating system embedded in your daily emails. When you click a feedback button, the request hits your Railway-hosted endpoint, which authenticates it and writes the rating back to your GitHub repository via the API. Railway provides the persistent, always-on URL that GitHub Actions and Brevo need to close the feedback loop — without it, prompt personalization won't work. Setup requires connecting your GitHub repo, configuring environment variables, and generating a public domain for the service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| personal-development-journal | [kghamilton89/personal-development-journal](https://github.com/kghamilton89/personal-development-journal) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GH_PAT` | - | GitHub Personal Access Token |
| `GH_REPO` | - | Format: YourUsername/YourRepoName (Create a Fork of the repo kghamilton89/PersonalDevelopmentJournal) |
| `GH_BRANCH` | main | - |
| `FEEDBACK_TOKEN` | (secret) | Authenticates requests to the feedback API. Provide any secure value of your own creeation. |
| `FEEDBACK_CSV_PATH` | data/feedback.csv | - |

**Category:** Other · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/template/personal-development-journal)
