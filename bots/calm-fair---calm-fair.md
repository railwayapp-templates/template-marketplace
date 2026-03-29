# Deploy calm-fair on Railway

GitHub PR lifecycle tracker for Slack: reviews, reactions, cleanup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calm-fair)

## About

calm-fair is a Slack bot that tracks GitHub pull request activity in real time. It posts new PRs to your channel, reacts with emoji as reviews come in (✅ approved, 🐰 changes requested), removes stale reactions when new commits are pushed, and deletes the message           ─
  automatically when a PR is merged or closed.      
                                                                                                                                                                                                                                                                                     
  ## About Hosting calm-fair                                                                                                                                                                                                                                                         
                                                      
  calm-fair is a lightweight Node.js server that listens for two types of incoming events: GitHub webhook payloads (pull request and review activity) and Slack mention events (team queries like "needs review" or "oldest PR"). It maintains a small JSON store mapping PR numbers 
  to Slack message timestamps, which it uses to update reactions and delete messages as PR state changes. The server needs to be always-on with a stable public URL so GitHub and Slack can reach it reliably — Railway handles both out of the box.
                                                                                                                                                                                                                                                                                     
  ## Common Use Cases                               
                                                      
  - Automatically notify your team's Slack channel when a new PR is opened, without anyone having to post it manually
  - Get a live visual indicator of review status on each PR message without leaving Slack
  - Ask the bot for a quick summary of outstanding review work: which PRs need a first review, which are approved and ready to merge, and which have been sitting the longest
                                                                                                                                                                                                                                                                                     
  ## Dependencies for calm-fair Hosting
                                                                                                                                                                                                                                                                                     
  - A Slack app with `chat:write`, `chat:delete`, `reactions:write`, `reactions:read`, `app_mentions:read`, and `channels:history` scopes                                                                                                                                            
  - A GitHub personal access token with `repo` and `read:org` scope, and a webhook configured on your repository
                                                                                                                                                                                                                                                                                     
  ### Deployment Dependencies                       
                                                      
  - [Slack API — Create an app](https://api.slack.com/apps)                                                                                                                                                                                                                          
  - [GitHub — Personal access tokens](https://github.com/settings/tokens)
  - [GitHub — Configuring webhooks](https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks)                                                                                                                                                                            
                                                    
  ### Implementation Details                                                                                                                                                                                                                                                         
                                                    
  The bot uses [@slack/bolt](https://github.com/slackapi/bolt-js) for the Slack integration and [@octokit/rest](https://github.com/octokit/rest.js) for GitHub API queries. All configuration is driven by environment variables — including the emoji used for reactions — so no    
  code changes are needed to customise it for your team.
                                                                                                                                                                                                                                                                                     
  Set your GitHub webhook payload URL to:           
  \```                                                
  https://your-railway-url.railway.app/github/webhook
  \```                                                                                                                                                                                                                                                                               
  And your Slack Event Subscriptions request URL to:
  \```                                                                                                                                                                                                                                                                               
  https://your-railway-url.railway.app/slack/events 
  \```                                                
                                                    
  Add a Railway Volume mounted at `/app/data` to persist PR state across redeploys.

  ## Why Deploy calm-fair on Railway?                                                                                                                                                                                                                                                
   
  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.                                                                
                                                    
  By deploying calm-fair on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GitHub-Slack PR Bot | [yogen-p/github-pr-slack-bot](https://github.com/yogen-p/github-pr-slack-bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TEAMMATES` | - | Comma-separated name-to-GitHub-username mappings (e.g. Maurice:m_moss,Roy:rt123) so the bot understands real names when answering questions |
| `GITHUB_TOKEN` | (secret) | Personal access token (repo, read:org) |
| `EMOJI_APPROVED` | white_check_mark | Slack emoji name (without colons) reacted to the PR message when approved |
| `MENTION_PREFIX` | <!here> | Text prepended to every PR notification. Supports Slack mention syntax. |
| `SLACK_BOT_TOKEN` | (secret) | Bot token(xoxb-...) |
| `GITHUB_REPO_NAME` | - | Repository name |
| `SLACK_CHANNEL_ID` | - | Channel to post PR messages in |
| `ANTHROPIC_API_KEY` | (secret) | Anthropic API key to power natural language understanding for @mention commands |
| `GITHUB_REPO_OWNER` | - | GitHub org or username |
| `SLACK_SIGNING_SECRET` | (secret) | From Slack app Basic Information |
| `GITHUB_WEBHOOK_SECRET` | (secret) | Secret set on the GitHub webhook |
| `EMOJI_CHANGES_REQUESTED` | rabbit | Slack emoji name reacted when a reviewer requests changes. |

**Category:** Bots · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/calm-fair)
