# Deploy keen-fair on Railway

Deploy and Host keen-fair with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keen-fair)

## About

keen-fair is a Slack bot that tracks GitHub pull request activity in real time. It posts new PRs to your channel, reacts with emoji as reviews come in (:white_check_mark: approved, :rabbit2: changes requested), removes stale reactions when new commits are pushed, and deletes the message automatically when a PR is merged or closed.

keen-fair is a lightweight Node.js server that listens for two types of incoming events: GitHub webhook payloads (pull request and review activity) and Slack mention events (team queries like “needs review” or “oldest PR”). It maintains a small JSON store mapping PR numbers to Slack message timestamps, which it uses to update reactions and delete messages as PR state changes. The server needs to be always-on with a stable public URL so GitHub and Slack can reach it reliably — Railway handles both out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Slack pr bot | [yogen-p/github-pr-slack-bot](https://github.com/yogen-p/github-pr-slack-bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Optional. HTTP port the Express server listens on. Default: 3000. |
| `TEAMMATES` | Aidan:adlee:U012AB3CD,Sarah:schen:U098ZY7WX | Optional. Maps display names to GitHub usernames and (optionally) Slack user IDs for real @-mentions in thread replies. |
| `GITHUB_REPOS` | your-org/repo1,your-org/repo2 | Required (or use GITHUB_REPO_OWNER + GITHUB_REPO_NAME). Comma-separated repos monitored by @mention commands. |
| `GITHUB_TOKEN` | (secret) | Required. Octokit auth for listing PRs and reviews; needs repo + read:org scopes. |
| `EMOJI_APPROVED` | white_check_mark | Optional. Slack emoji reacted when a reviewer approves. Default: white_check_mark. |
| `MENTION_PREFIX` | <!here> | Optional. Text prepended to PR notifications. Default: <!here>. Set to empty string to disable. |
| `SLACK_BOT_TOKEN` | (secret) | Required. Authenticates all Slack API calls (post, delete, react). |
| `GITHUB_REPO_NAME` | your-repo | Legacy single-repo config. Ignored if GITHUB_REPOS is set. |
| `SLACK_CHANNEL_ID` | C0123456789 | Required. Channel where PR messages are posted. |
| `ANTHROPIC_API_KEY` | (secret) | Optional. Enables Claude-powered @mention replies; falls back to keyword matching when unset. |
| `GITHUB_REPO_OWNER` | your-org | Legacy single-repo config. Ignored if GITHUB_REPOS is set. |
| `SLACK_SIGNING_SECRET` | (secret) | Required. Verifies incoming Slack requests; ExpressReceiver rejects all events without it. |
| `GITHUB_WEBHOOK_SECRET` | (secret) | Strongly recommended. Verifies GitHub webhook signatures; without it, anyone can forge webhooks. Do not run in production without this. |
| `EMOJI_CHANGES_REQUESTED` | rabbit | Optional. Slack emoji reacted when a reviewer requests changes. Default: rabbit. |

**Category:** Bots · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/keen-fair)
