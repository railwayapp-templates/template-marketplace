# Deploy OpenSpeedTest on Railway

Internet Speed testing tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openspeedtest)

## About

OpenSpeedTest is a free and open-source HTML5 network performance estimation tool. Written entirely in vanilla JavaScript, it relies purely on built-in Web APIs without requiring third-party frameworks. It provides users with a fast, lightweight, and reliable way to test network speed directly from any modern web browser.
![Speed test](https://raw.githubusercontent.com/openspeedtest/v2-Test/main/images/10G-S.gif)

Hosting OpenSpeedTest on Railway provides a highly available, robust infrastructure for measuring network performance. Railway simplifies the deployment process by automatically pulling the official Docker image and provisioning the necessary computing resources. Because OpenSpeedTest operates purely as a client-side application served by a lightweight static web server, it requires minimal backend resources and scales effortlessly.

The application operates efficiently without needing a persistent database or attached storage volumes. Railway's platform automatically handles public networking, provisioning a secure HTTPS edge network to serve the application directly to users. This seamless scaling and automated TLS management ensure that users can reliably run bandwidth estimation tests securely from any location, with the infrastructure smoothly handling fluctuations in concurrent network diagnostic requests.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| speedtest | `openspeedtest/latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/openspeedtest)
