# Deploy Steel Browser on Railway

Open Source Browser API for AI Agents & Apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/steelbrowser)

## About

## Deploy and Host Steel Browser with Railway
Steel Browser is a managed browser service that provides access to a serverless Chrome instance via API. It enables developers to automate web interactions, run browser automation scripts, and perform web scraping tasks without needing to think about building/deploying browsers.

### About Hosting Steel Browser
Hosting Steel Browser on Railway provides a reliable, scalable environment for running headless Chrome instances. The Steel Browser API handles browser session management, proxy configuration, and CDP passthroughs while Railway provides extremely easy APIs to scale and handles resource allocation automatically. Running Steel Browser on Railway's infrastructure ensures your browser automations run consistently with minimal configuration, while providing automatic scaling and health monitoring for production workloads.

### Common Use Cases
- **Web Scraping:** Extract data from dynamic websites that require JavaScript rendering
- **Browser Automation:** Automate repetitive web tasks and workflows
- **End-to-End Testing:** Run automated browser tests for web applications
- **Screenshot & PDF Generation:** Capture screenshots or generate PDFs from web content
- **Data Collection:** Gather information from multiple web sources programmatically

### Dependencies for Hosting Steel Browser
- **Docker:** Steel Browser runs as a containerized application
- **Chrome/Chromium:** Headless browser engine (included in the Docker image)
- **Node.js Runtime:** Required for the Steel Browser service

### Deployment Dependencies
- [Steel Browser GitHub Repository](https://github.com/steel-dev/steel-browser)
- [Steel Browser Documentation](https://docs.steel.dev/)
- [Chrome DevTools Protocol Documentation](https://chromedevtools.github.io/devtools-protocol/)

### Implementation Details
You can read more about connecting to and running browser sessions with Steel Browser on Railway [here](https://docs.steel.dev/overview/self-hosting/railway#implementation-details).

### Why Deploy Steel Browser on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying Steel Browser on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

**Benefits of Steel Browser on Railway:**
- Automatic HTTPS/SSL configuration
- Built-in health monitoring
- Easy scaling as your browser automation needs grow
- Simple environment variable management
- Seamless integration with other Railway services

### Post-Deployment Notes

After deploying this template, users should:

1. **Access the Instance:** Navigate to the Railway-provided public domain
2. **Verify Health:** Check the `/v1/health` endpoint returns a successful response
3. **Configure API Access:** Use the public domain URL in their application code
4. **Monitor Usage:** Check Railway's metrics dashboard for resource usage

### Security Considerations:
- Consider adding authentication if exposing publicly
- Monitor for unusual traffic patterns
- Set up rate limiting if needed for production use

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Steel Browser | `ghcr.io/steel-dev/steel-browser` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `USE_SSL` | true |
| `CDP_REDIRECT_PORT` | 9223 |

## Configuration

- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Verified:** Yes

[View on Railway →](https://railway.com/deploy/steelbrowser)
