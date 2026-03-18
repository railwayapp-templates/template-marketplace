# Deploy Flatnotes on Railway

A lightweight, self-hosted, markdown-based note-taking web app.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Hl9gkz)

## About

Overview:
Flatnotes is a minimalist, self-hosted note-taking application that emphasizes simplicity and efficiency. Designed to work with markdown-based notes, it provides an intuitive and user-friendly interface for creating, editing, and organizing your notes.

Key features include:
	•	Search functionality to quickly locate specific notes.
	•	Tagging support for effective organization.
	•	A clean web interface that is easy to navigate.

This lightweight solution is ideal for individuals or teams who value privacy and prefer to host their own data. By avoiding unnecessary complexity, Flatnotes offers a practical alternative to more cumbersome note-taking apps.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flatnotes | [chinpeerapat/flatnotes](https://github.com/chinpeerapat/flatnotes) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `FLATNOTES_PASSWORD` | (secret) |
| `FLATNOTES_USERNAME` | (secret) |
| `FLATNOTES_AUTH_TYPE` | password |
| `FLATNOTES_SECRET_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/dara`

**Category:** Other · **Languages:** Vue, Python, JavaScript, SCSS, Dockerfile, Shell, HTML, CSS

[View on Railway →](https://railway.com/template/Hl9gkz)
