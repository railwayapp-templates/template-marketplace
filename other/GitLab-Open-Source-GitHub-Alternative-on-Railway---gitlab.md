# Deploy GitLab | Open Source GitHub Alternative on Railway on Railway

Self-host GitLab CE. Built-in CI/CD (DevOps), Git repos, and issue tracking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitlab)

## About

Deploy GitLab Community Edition on Railway to get a fully self-hosted DevOps platform with built-in Git repository management, CI/CD pipelines, issue tracking, and code review. Self-host GitLab on Railway with a single `gitlab/gitlab-ce` container that bundles PostgreSQL, Redis, Sidekiq, Puma, Gitaly, and Nginx — no external databases required.

This template pre-configures GitLab with memory-optimized settings for Railway's infrastructure, handles TLS termination via Railway's edge proxy, and persists all data (repositories, uploads, database) on a single Railway volume.

GitLab Community Edition is an open-source, end-to-end DevOps platform that covers the entire software development lifecycle in a single application. Unlike GitHub, which requires assembling multiple third-party tools, GitLab integrates everything natively:

- **Source Code Management** — Git repositories with merge requests, code review, and branch protection
- **CI/CD Pipelines** — Auto DevOps detects language, builds containers, runs tests, and deploys automatically
- **Issue Tracking & Boards** — Kanban boards, epics, milestones, and time tracking
- **Container Registry** — Built-in Docker registry for storing and distributing images
- **Security Scanning** — SAST, DAST, dependency scanning, and secret detection
- **Wiki & Snippets** — Project documentation and code snippet sharing

The `gitlab/gitlab-ce` Docker image is an all-in-one container running PostgreSQL, Redis, Puma (web server), Sidekiq (background jobs), Gitaly (Git storage), and Nginx under the Omnibus package manager.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GitLab | `gitlab/gitlab-ce:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | HTTP listening port |
| `GITLAB_ROOT_PASSWORD` | (secret) | Create root password. Note: default username to login is 'root' |
| `GITLAB_OMNIBUS_CONFIG` | - | Omnibus configuration block |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/gitlab`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gitlab)
