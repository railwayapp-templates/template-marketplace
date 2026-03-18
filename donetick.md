# Deploy Donetick (Open-Source Task & Team Productivity Management Tool) on Railway

DoneTick [Mar ’26] (Alternative to Paid to-do Applications) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/donetick)

## About

Donetick is an open-source, self-hosted to-do and task management application built for people who want to focus on finishing tasks instead of managing complex systems. It is intentionally minimal, fast, and distraction-free, making it perfect for personal productivity, daily task tracking, and lightweight team workflows.
Unlike heavy project management tools, Donetick does not try to do everything. It focuses on one core goal: help you consistently complete tasks. You get a clean interface, simple task creation, recurring tasks, and clear completion tracking, without bloated features or SaaS lock-in.
Because Donetick is fully self-hosted, your tasks, habits, and productivity data stay entirely under your control. With Railway, deploying Donetick is reduced to a single click, making self-hosting accessible even if you’ve never managed a server before.

Self hosting Donetick means your task data is stored on infrastructure you control, not on third-party productivity platforms. There are no subscriptions, no per-user limits, and no surprise pricing changes.

Traditionally, self hosting even a simple to-do app would require:

*   Setting up a server  
*   Configuring runtime dependencies      
*   Ensuring data persistence  
With Railway, all of this complexity is removed.
Railway runs Donetick in a managed container environment. It handles service restarts, networking, environment variables, and persistent storage automatically. You simply deploy, open the URL, and start using Donetick immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| donetick/donetick | `donetick/donetick` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DT_ENV` | selfhosted |
| `DT_JWT_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/donetick)
