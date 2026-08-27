# Deploy Screenshot to Code on Railway

Turn screenshots and Figma designs into editable frontend code with AI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shotcode-source)

## About

Turn screenshots, mockups, Figma designs, screen recordings or plain-English prompts into editable frontend code. Choose HTML/CSS, Tailwind, React, Vue, Bootstrap or Ionic, then refine the result with follow-up prompts.

[Explore live examples on the official Screenshot to Code website](https://screenshottocode.com)

| Original screenshot | Generated frontend |
| --- | --- |
| ![Original website screenshot](https://screenshottocode.com/demos/nyt-lifestyle-before.webp) | ![Frontend generated from the screenshot](https://screenshottocode.com/demos/nyt-lifestyle-after.webp) |

[Screenshot to Code](https://screenshottocode.com) is an open-source AI workspace for turning visual ideas into working frontend code. Upload a screenshot or mockup, import a Figma design, record an interface in action or describe a UI in text. You can compare output across supported frontend stacks and keep refining it inside the app.

This Railway template gives you your own protected workspace. The public Web app uses generated Basic Auth, the Backend stays on Railway's private network and design systems and local assets persist on a `/data` volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Web | [just-deploy-it/screenshot-to-code-railway](https://github.com/just-deploy-it/screenshot-to-code-railway) (root: web) | Web service |
| Backend | [just-deploy-it/screenshot-to-code-railway](https://github.com/just-deploy-it/screenshot-to-code-railway) (root: backend) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Web | 8080 |
| `BASIC_AUTH_PASSWORD` | Web | (secret) |
| `PORT` | Backend | 7001 |
| `LOCAL_ASSET_DIR` | Backend | /data/local_assets |
| `SCREENSHOT_TO_CODE_DATA_DIR` | Backend | /data |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/shotcode-source)
