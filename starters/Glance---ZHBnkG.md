# Deploy Glance on Railway

A self-hosted dashboard that puts all your feeds in one place

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ZHBnkG)

## About

## Features
### Various widgets
* RSS feeds
* Subreddit posts
* Hacker News posts
* Weather forecasts
* YouTube channel uploads
* Twitch channels
* Market prices
* Docker containers status
* Server stats
* Custom widgets
* [and many more...](https://github.com/glanceapp/glance/blob/main/docs/configuration.md)

### Fast and lightweight
* Low memory usage
* Few dependencies
* Minimal vanilla JS
* Single &lt;20mb binary available for multiple OSs &amp; architectures and just as small Docker container
* Uncached pages usually load within ~1s (depending on internet speed and number of widgets)

### Tons of customizability
* Different layouts
* As many pages/tabs as you need
* Numerous configuration options for each widget
* Multiple styles for some widgets
* Custom CSS

### Optimized for mobile devices
Because you'll want to take it with you on the go.

[mobile-preview](https://raw.githubusercontent.com/glanceapp/glance/refs/heads/main/docs/images/mobile-preview.png)


### Themeable
Easily create your own theme by tweaking a few numbers or choose from one of the [already available themes](https://github.com/glanceapp/glance/blob/main/docs/themes.md).

[themes-example](docs/images/themes-example.png)

## Feature requests

New feature suggestions are always welcome and will be considered, though please keep in mind that some of them may be out of scope for what the project is trying to achieve (or is reasonably capable of). If you have an idea for a new feature and would like to share it, you can do so [here](https://github.com/glanceapp/glance/issues/new?template=feature_request.yml).

Feature requests are tagged with one of the following:

* [Roadmap](https://github.com/glanceapp/glance/labels/roadmap) - will be implemented in a future release
* [Backlog](https://github.com/glanceapp/glance/labels/backlog) - may be implemented in the future but needs further feedback or interest from the community
* [Icebox](https://github.com/glanceapp/glance/labels/icebox) - no plans to implement as it doesn't currently align with the project's goals or capabilities, may be revised at a later date

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Glance | `glanceapp/glance` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GLANCE_CONFIG_SOURCE` | https://raw.githubusercontent.com/glanceapp/glance/refs/heads/main/docs/glance.yml |

## Configuration

- **Start command:** `/bin/sh -c 'if [ ! -f /app/config/glance.yml ]; then echo "Config not found in volume, downloading configuration..." && wget -O /app/config/glance.yml $GLANCE_CONFIG_SOURCE && echo "Configuration has been populated in /app/config/glance.yml"; else echo "Configuration found in volume, continuing with startup..."; fi && echo "Starting Glance..." && ./glance --config /app/config/glance.yml'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/ZHBnkG)
