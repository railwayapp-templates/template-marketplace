# Deploy Dashy on Railway

Helps you organize your self-hosted services

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/MtdjAQ)

## About

# Dashy

Dashy helps you organize your self-hosted services by making them accessible from a single place

## Features 🌈
- 📃 Support for multiple pages
- 🚦 Real-time status monitoring for each of your apps/links
- 📊 Use widgets to display info and dynamic content from self-hosted services
- 🔎 Instant search by name, domain, or tags + customizable hotkeys & keyboard shortcuts
- 🎨 Many built-in color themes, with UI color editor and support for custom CSS
- 🧸 Many icon options - Font-Awesome, homelab icons, auto-fetching Favicon, images, emojis, etc.
- 💂 Optional authentication with multi-user access, configurable privileges, and SSO support
- 🌎 Multi-language support, with 10+ human-translated languages, and more on the way
- ☁ Optional, encrypted, free off-site cloud backup and restore feature available
- 💼 A workspace view, for easily switching between multiple apps simultaneously
- 🛩️ A minimal view, for use as a fast-loading browser Startpage
- 🖱️ Choose app launch methods: new tab, same tab, clipboard, pop-up modal, or open in workspace view
- 📏 Customizable layout, sizes, text, component visibility, sort order, behavior, etc.
- 🖼️ Options for a full-screen background image, custom nav-bar links, HTML footer, title, etc.
- 🚀 Easy to setup with Docker, or on bare metal, or with 1-Click cloud deployment
- ⚙️ Easy single-file YAML-based configuration, and option to configure app through the UI
- ✨ Under active development with improvements and new features added regularly 
- 🤏 Small bundle size, fully responsive UI, and PWA for basic offline access
- 🆓 100% free and open-source
- 🔐 Strong focus on privacy
- 🌈 And loads more...

## Showcase

![Showcase Gif](https://i.ibb.co/L8YbNNc/dashy-demo2.gif)

## Configuration

This template fetches Dashy's default configuration from Dashy's GitHub. You can supply your own custom configuration by editing the `DASHY_CONFIG_SOURCE` service variable. 

NOTE: You'll have to wipe the volume when doing this because it won't fetch the config if an existing config is already found.

## Documentation

For more information, please visit the [Dashy docs](https://dashy.to/docs/).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dashy | `lissy93/dashy` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | - |
| `DASHY_CONFIG_SOURCE` | https://raw.githubusercontent.com/Lissy93/dashy/refs/heads/master/user-data/conf.yml | An endpoint to raw text containing the configuration you want to use for Dashy |

## Configuration

- **Start command:** `/bin/sh -c 'if [ ! -f /app/user-data/conf.yml ]; then echo "Config not found in volume, downloading configuration..." && node -e "fetch(process.env.DASHY_CONFIG_SOURCE).then(r=>r.text()).then(t=>require(\"fs\").writeFileSync(\"/app/user-data/conf.yml\", t))" && echo "Configuration has been populated in /app/user-data/conf.yml" && echo "Configuration contents:" && cat /app/user-data/conf.yml; else echo "Configuration found in volume, continuing with startup..."; fi && echo "Starting Dashy..." && yarn build-and-start'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/user-data`

**Category:** Observability

[View on Railway →](https://railway.com/template/MtdjAQ)
