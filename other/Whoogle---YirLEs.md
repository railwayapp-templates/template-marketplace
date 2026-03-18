# Deploy Whoogle on Railway

A self-hosted, ad-free, privacy-respecting metasearch engine

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/YirLEs)

## About

# Whoogle

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/ec546e93-8b25-4c4b-83f7-870e2fe67d39?referralCode=HT4TtK)

## What is Whoogle?
Whoogle Search is a privacy-friendly search engine that acts as a proxy between you and Google, providing search results without exposing your personal information to the search giant. Get Google search results, but without any ads, JavaScript, AMP links, cookies, or IP address tracking. Easily deployable in one click as a Docker app, and customizable with a single config file. Quick and simple to implement as a primary search engine replacement on both desktop and mobile.

![picture1](https://imgur.com/XMYLhem.png)
![picture2](https://imgur.com/RFGiVzR.png)
![picture3](https://imgur.com/a8GdbsO.png)

## Features
- **Privacy-Focused**: Whoogle Search acts as an intermediary, preventing Google from directly tracking your searches.
- **Open Source**: The project is open-source, allowing users to review and contribute to the codebase.
- **Customizable**: Users can configure Whoogle Search to suit their preferences and requirements.

## Environment variables

- WHOOGLE_USER The username for basic auth. WHOOGLE_PASS must also be set if used. (default: empty)
- WHOOGLE_PASS The password for basic auth. WHOOGLE_USER must also be set if used. (default: empty)
- PORT 5000
- WHOOGLE_CONFIG_TOR To enable or disable TOR with boolean value of 0 or 1 (default: 0)
- WHOOGLE_CONFIG_GET_ONLY Search using GET requests only (default: 1)

For more information regarding Environment vairables, Please do checkout here: https://github.com/benbusby/whoogle-search?tab=readme-ov-file#environment-variables


## 📝 Notes
- Source repo: https://github.com/benbusby/whoogle-search

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Whoogle Search | `benbusby/whoogle-search` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5000 | - |
| `WHOOGLE_PASS` | - | password for basic auth |
| `WHOOGLE_USER` | (secret) | username for basic auth |
| `WHOOGLE_CONFIG_URL` | - | The root url of the instance |
| `WHOOGLE_TOR_SERVICE` | 0 | Use Tor |
| `WHOOGLE_CONFIG_GET_ONLY` | 1 | Search using GET requests only |
| `WHOOGLE_CONFIG_PREFERENCES_KEY` | - | Key to encrypt preferences in URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/YirLEs)
