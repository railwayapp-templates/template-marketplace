# Deploy glance-railway on Railway

A personalized, self-hosted dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/MYrXAY)

## About

![](https://github.com/kimthompson/glance-railway/raw/main/docs/images/glance-railway-dashboard-example.png)

This is an alternative Railway template for Glance, which I made because I couldn't get the original to work. It contains the entire codebase forked on March 27, 2025, with tweaks to the Dockerfile. I will attempt to bring in changes as they are released and keep it relatively up to date.

The benefit of hosting this version is that you can use multiple configuration files instead of simply linking to a single raw file. This comes in handy if, say, you wish to have more than just a "Home" page. To customize this dashboard yourself, edit the files in the `/config` folder.

The custom theme is based on the NeoVim theme [cyberdream](https://github.com/scottmckendry/cyberdream.nvim).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| glance-railway | [kimthompson/glance-railway](https://github.com/kimthompson/glance-railway) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Go, HTML, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/MYrXAY)
