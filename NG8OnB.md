# Deploy Selenium Grid on Railway

Chrome, Firefox and Edge connected by a Selenium Hub. Deployed with ease.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/NG8OnB)

## About

## Selenium Grid with Chrome, Firefox and Edge

![Standalone Grid Example](https://link.storjshare.io/jw4emervo5ex345yz4zuf4nacrlq/readme-photos%2Fseleniumgrid%2Fselenium-grid-example.png?view=1)

### Overview

[Selenium Grid](https://www.selenium.dev/documentation/grid/) allows you to run tests in parallel with the execution of WebDriver scripts on remote machines by routing commands sent by the client to remote browser instances.

### Highlights

- Run all 3 major browsers with just a few clicks to be using the Selenium grid for your tests in minutes.
- Run your tests in parallel to speed up total testing time.
- Running on Railway gives you the ability to have a public selenium grid URL in a matter of no time.
- SSL/TLS encryption certificate by default

### How To Use
- After deploying, just add the generated **up.railway.app** URL in your selenium tests as the remote web driver URL and you'll be ready to test!
- `RemoteWebDriver(new URL("https://CHANGEME.up.railway.app/")`

### Learn More

- [Selenium.dev website](https://www.selenium.dev/)
- [Selenium-docker github repo](https://github.com/SeleniumHQ/docker-selenium)
- [LICENSE](https://github.com/SeleniumHQ/docker-selenium/blob/trunk/LICENSE.md)

---

<a href="https://www.buymeacoffee.com/bamtech"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;"></a>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| firefox-node | `selenium/node-firefox` | Worker |
| chrome-node | `selenium/node-chrome` | Worker |
| selenium-hub | `selenium/hub:latest` | Web service |
| edge-node | `selenium/node-edge` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SE_NODE_HOST` | firefox-node | firefox-node.railway.internal | Internal name of this deployed node |
| `SE_EVENT_BUS_HOST` | firefox-node | selenium-hub.railway.internal | Internal name of the Selenium hub service |
| `SE_EVENT_BUS_PUBLISH_PORT` | firefox-node | 4442 | - |
| `SE_EVENT_BUS_SUBSCRIBE_PORT` | firefox-node | 4443 | - |
| `SE_NODE_HOST` | chrome-node | chrome-node.railway.internal | Internal name of this deployed node |
| `SE_EVENT_BUS_HOST` | chrome-node | selenium-hub.railway.internal | Internal name of the Selenium hub service |
| `SE_EVENT_BUS_PUBLISH_PORT` | chrome-node | 4442 | - |
| `SE_EVENT_BUS_SUBSCRIBE_PORT` | chrome-node | 4443 | - |
| `PORT` | selenium-hub | 4444 | Default Selenium Hub Port |
| `SE_NODE_HOST` | edge-node | edge-node.railway.internal | Internal name of this deployed node |
| `SE_EVENT_BUS_HOST` | edge-node | selenium-hub.railway.internal | Internal name of the Selenium hub service |
| `SE_EVENT_BUS_PUBLISH_PORT` | edge-node | 4442 | - |
| `SE_EVENT_BUS_SUBSCRIBE_PORT` | edge-node | 4443 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/template/NG8OnB)
