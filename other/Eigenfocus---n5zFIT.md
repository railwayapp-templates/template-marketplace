# Deploy Eigenfocus on Railway

Project Management, Time Tracking and Focus App 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n5zFIT)

## About

<div align="center">
  <a href="https://eigenfocus.com?utm_source=github-readme&amp;utm_content=banner"><img alt="Eigenfocus" src="https://raw.githubusercontent.com/Eigenfocus/focus-assets/refs/heads/main/images/eigenfocus-github-banner.png"></a>
</div>

# Features

- Projects: create/edit/update/archive you projects
- Boards: each project has a board where you can customize columns to your workflow
- Issues: create issues, write markdown descriptions and attach files
- Workflow with Boards: Make changes to your boards and see changes in real-time
- Issue Labels and Shortcuts: Organize your issues and workflow with labels
- Time Tracking: track time spent on a Project and a Specific Issue
- Time Report: generate time reports by project and time periods
- Focus Space where you can setup
- Themes: customize the UI to your taste

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| eigenfocus | `eigenfocus/eigenfocus:1.1.0-free` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `HTTP_AUTH_USER` | (secret) |
| `HTTP_AUTH_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/eigenfocus-app/app-data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/n5zFIT)
