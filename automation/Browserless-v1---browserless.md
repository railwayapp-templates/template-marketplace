# Deploy Browserless v1 on Railway

Web browser automation built for everyone, and loved by developers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/browserless)

## About

<p align="center">
    <a href="https://www.browserless.io/">
        <img style="width: 150px;" src="https://raw.githubusercontent.com/browserless/browserless/v1/assets/browserless_logo_screen_gradient.png" alt="browserless logo">
    </a>
</p>

<h1 align="center">Browserless</h1>

<p align="center">Browserless allows remote clients to connect and execute headless work, all inside of docker</p>

### Overview

Browserless supports the standard, Puppeteer, Selenium and Playwright libraries.

It takes care of common issues such as missing system-fonts, missing external libraries, and performance improvements, along with edge-cases like downloading files and managing sessions. For details, check out the [documentation](https://browserless.io/docs/docker-quickstart).

If you've been struggling to deploy headless browsers without running into issues or bloated resource requirements, then Browserless was built for you.

### Examples

Various minimal code examples for using Browserless on Railway with some common libraries -

https://github.com/brody192/puppeteer-example (Node)

https://github.com/brody192/playwright-example (Node)

https://github.com/brody192/playwright-example-python

https://github.com/brody192/selenium-example (Node)

https://github.com/brody192/selenium-example-python

https://github.com/brody192/chromedp-example (Golang)

### Highlights

- Works seamlessly with Puppeteer, Playwright, and Selenium.
- No need to install extra packages, dependencies, or system libraries.
- RAM, CPU and GPU are fully managed to stop browsers devouring resources.
- Scaling and load balancing is handled for you to absorb any traffic surges.
- Chrome's zombie processes are cleared away to stop servers from clogging up.

### Features

- Parallelism and queueing are built-in and configurable.
- Fonts and emoji's working out-of-the-box.
- Works with most headless libraries.
- Configurable session timers to keep things running smoothly.
- Error tolerant: if Chrome dies it won't.

### Learn More

- [Browserless](https://browserless.io/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Browserless | [railwayapp-templates/browserless](https://github.com/railwayapp-templates/browserless) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TOKEN` | (secret) | <a href="https://www.browserless.io/docs/docker#securing-your-instance">Securing your instance</a> |
| `KEEP_ALIVE` | false | <a href="https://www.browserless.io/docs/docker#keeping-chrome-alive">Keeping Chrome Alive</a> |
| `ENABLE_CORS` | true | <a href="https://www.browserless.io/docs/docker#enable-cors">Enable CORS</a> |
| `BROWSER_TOKEN` | (secret) | Simple reference to `TOKEN` |
| `BROWSER_DOMAIN` | - | Public Browserless domain |
| `PREBOOT_CHROME` | false | <a href="https://www.browserless.io/docs/docker#pre-booting-chrome">Pre-booting Chrome</a> |
| `MAX_QUEUE_LENGTH` | 10 | <a href="https://www.browserless.io/docs/docker#max-queue-length">Max Queue Length</a> |
| `PREBOOT_QUANTITY` | 0 | <a href="https://www.browserless.io/docs/docker#pre-boot-quantity">Pre-boot quantity</a> |
| `CONNECTION_TIMEOUT` | 300000 | 5 Minutes - <a href="https://www.browserless.io/docs/docker#connection-timeout">Connection Timeout</a> |
| `BROWSER_WS_ENDPOINT` | - | Public websockets endpoint |
| `BROWSER_PORT_PRIVATE` | 3001 | Private Browserless port |
| `BROWSER_DOMAIN_PRIVATE` | - | Private Browserless domain |
| `MAX_CONCURRENT_SESSIONS` | 10 | <a href="https://www.browserless.io/docs/docker#max-concurrent-sessions">Max Concurrent Sessions</a> |
| `BROWSER_WEBDRIVER_ENDPOINT` | - | Public webdriver endpoint |
| `BROWSER_PLAYWRIGHT_ENDPOINT` | - | Public playwright endpoint |
| `BROWSER_WS_ENDPOINT_PRIVATE` | - | Private websockets endpoint |
| `BROWSER_WEBDRIVER_ENDPOINT_PRIVATE` | - | Private webdriver endpoint |
| `BROWSER_PLAYWRIGHT_ENDPOINT_PRIVATE` | - | Private playwright endpoint |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Tags:** browser, chrome, automation, testing · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/browserless)
