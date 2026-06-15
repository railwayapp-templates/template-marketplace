# Deploy Steady Page Kit on Railway

A tempolate for hosting your Steady page

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/steady-page-kit)

## About

Steady Page Kit gives your [Steady](https://steadyhq.com) publication its own
website. Your articles, images and categories show up automatically — straight from Steady. Readers can subscribe, log in and pay right on your site. A built-in
design panel lets you change fonts, colors, layout and your logo, then publish it to everyone with a single click.

Clicking **Deploy** puts your website online on Railway and keeps it running, secure and up — so you never have to touch a server. During setup you'll paste two values from your Steady account (your publication's short name and its ID, both found in your Steady settings). That's it: your articles stay in sync with Steady on their own, you get a web address right away, and you can connect your
own domain later. Everything you customize – your design, your logo – is saved and stays put when the site updates. Nothing to install, no code to write.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| steady-page-kit | [steady-media/steady-page-kit](https://github.com/steady-media/steady-page-kit) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `KIT_DATA_DIR` | /app/data |

## Configuration

- **Volume:** `/app/data`

**Category:** Blogs · **Languages:** JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/steady-page-kit)
