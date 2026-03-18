# Deploy Chrome - Selenium Standalone Node on Railway

Single Instance Chrome Browser Driver 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/XXPeWN)

## About

## Chrome in Selenium Standalone Grid Mode

![Standalone Chrome Example](https://link.storjshare.io/jw6abmifaue6ls7vhqo4hxwhifwa/readme-photos%2Fseleniumgrid%2Fselenium-standalone-chrome-example.png?view=1)

### Overview

[Standalone grid mode](https://www.selenium.dev/documentation/grid/getting_started/#standalone) combines all [Selenium Grid](https://www.selenium.dev/documentation/grid/) components seamlessly into one. 

### Highlights

- Running a Grid in Standalone mode gives you a fully functional Grid with a single command, within a single process.
- Running on Railway gives you the ability to have a public selenium grid URL in a matter of seconds.
- SSL/TLS encryption certificate by default

### How To Use

- After deploying, just add the generated **up.railway.app** URL in your selenium tests as the remote web driver URL and you'll be testing in no time!
- `RemoteWebDriver(new URL("https://CHANGEME.up.railway.app/")`

### Learn More

- [Selenium.dev website](https://www.selenium.dev/)
- [Selenium-docker github repo](https://github.com/SeleniumHQ/docker-selenium)
- [LICENSE](https://github.com/SeleniumHQ/docker-selenium/blob/trunk/LICENSE.md)

---

<a href="https://www.buymeacoffee.com/bamtech"><img style="height: 60px !important;width: 217px !important;" alt="Buy Me A Coffee" src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png"></a>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| standalone-chrome | `selenium/standalone-chrome` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4444 | The selenium grid port |

## Configuration

- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/template/XXPeWN)
