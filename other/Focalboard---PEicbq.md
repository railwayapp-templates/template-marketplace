# Deploy Focalboard on Railway

Open source project management for technical teams

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/PEicbq)

## About

<p align="center">
    <a href="https://www.focalboard.com/">
        <img style="width: 500px;" src="https://www.focalboard.com/img/logo.svg?version=v2" alt="rallly logo">
    </a>
</p>

<h3 align="center">Open source project management for technical teams</h3>
Keep everything and everyone on track.

<h4>Accelerate productivity</h4>
Centralize, plan, and track all your work in one place. Focalboard helps your organization maintain a single source of truth, so your teams stay aligned to complete tasks, reach milestones, and achieve their goals.

<h4>Organize and visualize work, your way</h4>
Work in the way that suits you best. Manage all your tasks on a Kanban, table, gallery, and calendar view. Focus on the highest priority items with board filters, and save an unlimited number of filtered views for quick access later.

<h4>Align your teams with real-time collaboration</h4>
Keep everyone in sync with card comments, @mention teammates to get their attention, and set board permissions to share your board with the entire team or specific individuals.

<h4>Tons of templates to get you started</h4>
Get started fast with our pre-built templates or create a fully custom board from scratch.

<h4>Feature Highlights</h4>
<ul>
	<li>Unlimited boards</li>
	<li>Group, filter, and sort tasks</li>
	<li>File sharing</li>
	<li>Unlimited custom attributes</li>
	<li>Customizable templates</li>
	<li>Meeting notes</li>
	<li>Project cards &amp; tasks</li>
	<li>Archiving &amp; back-up snapshots</li>
	<li>Priority labeling</li>
	<li>User permissions</li>
	<li>Team and direct messaging</li>
	<li>Multi-team views</li>
</ul>

<h4>Need help?</h4>
We have tons of documentation to help you make the most out of focalboard, head over to our documentation site to learn more about focalboard.
<a href="https://github.com/mattermost/focalboard/#readme">Go to docs</a>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Focalboard | `mattermost/focalboard:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `EXCLUDE_ENTERPRISE` | 1 |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/focalboard/data`

**Category:** Other

[View on Railway →](https://railway.com/template/PEicbq)
