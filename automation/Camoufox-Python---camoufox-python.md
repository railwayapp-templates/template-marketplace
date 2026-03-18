# Deploy Camoufox (Python) on Railway

An open source anti-detect browser with robust fingerprint injection.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/camoufox-python)

## About

A minimal Camoufox Python starter template that provides an anti-detect browser environment with automatic fingerprint generation and rotation. Uses a modified Firefox build optimized for web automation while remaining undetectable to anti-bot systems.

This template sets up Camoufox with Python in a containerized environment on Railway. Camoufox wraps around Playwright's API and automatically generates unique device characteristics including OS info, navigator properties, fonts, headers, screen dimensions, WebGL parameters, and more. It uses BrowserForge to generate fingerprints that mimic real-world traffic distribution patterns.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| camoufox-py | [railtools/camoufox-py](https://github.com/railtools/camoufox-py) | Worker |

**Category:** Automation · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/camoufox-python)
