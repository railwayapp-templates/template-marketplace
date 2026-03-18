# Deploy fronted on Railway

web element and rtc and the for call

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fronted)

## About

What is fronted?  
Fronted is a lightweight frontend service that provides a user-facing interface for interacting with backend systems. It typically serves static assets, handles routing, and connects users to core services like authentication, messaging, or APIs. By deploying fronted, you enable a clean, accessible entry point for your application stack.

Hosting fronted on Railway involves deploying a frontend service that can serve static files or act as a proxy to backend APIs. The process requires configuring environment variables for service URLs, client IDs, and themes, while ensuring integration with supporting services like MAS, Synapse, and LiveKit. Railway simplifies this by auto-injecting domains and managing secrets, so you don’t need to manually configure hostnames or credentials. With Railway, fronted can be deployed quickly, scaled automatically, and integrated seamlessly with other services in your stack, making it ideal for production-ready frontend hosting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| matrix rtc | [Penghuot/ess-helm](https://github.com/Penghuot/ess-helm) (root: /to-test-with-railway/matrix-rtc) | Web service |
| lk-jwt-service | [Penghuot/ess-helm](https://github.com/Penghuot/ess-helm) (root: /to-test-with-railway/lk-jwt-service) | Web service |
| web element | [Penghuot/ess-helm](https://github.com/Penghuot/ess-helm) (root: /to-test-with-railway/element-web) | Web service |
| element call | [Penghuot/ess-helm](https://github.com/Penghuot/ess-helm) (root: /to-test-with-railway/element-call) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | matrix rtc | 7880 | Port your service listens on inside the container. Example: 7880 |
| `LIVEKIT_DOMAIN` | matrix rtc | - | Domain for your LiveKit deployment. Example: livekit.example.com |
| `LIVEKIT_API_KEY` | matrix rtc | (secret) | API key for LiveKit server authentication. Example: lk_api_key_12345 |
| `LIVEKIT_API_SECRET` | matrix rtc | (secret) | API secret for LiveKit server authentication. Example: lk_api_secret_67890 |
| `LIVEKIT_KEY` | lk-jwt-service | - | Alternate key for LiveKit client authentication. Example: lk_client_key_abcdef |
| `LIVEKIT_URL` | lk-jwt-service | - | Base URL for LiveKit server. Example: https://livekit.example.com |
| `LIVEKIT_SECRET` | lk-jwt-service | (secret) | Alternate secret for LiveKit client authentication. Example: lk_client_secret_xyz |
| `LIVEKIT_FULL_ACCESS_HOMESERVERS` | lk-jwt-service | - | Comma-separated list of homeservers with full LiveKit access. Example: synapse.example.com,another-hs.example.com |
| `MAS_URL` | web element | - | Public URL of the MAS service. Example: https://mas-service-production.up.railway.app |
| `SERVER_NAME` | web element | - | Matrix homeserver name (same as Synapse server name). Example: synape-production-7433.up.railway.app |
| `HOMESERVER_URL` | web element | - | Public URL of the Synapse homeserver. Example: https://synape-production-7433.up.railway.app |
| `ELEMENT_WEB_URL` | web element | - | Public URL of your Element Web client. Example: https://web-element-production.up.railway.app |
| `ELEMENT_CALL_URL` | web element | - | Public URL of your Element Call service. Example: https://element-call-production.up.railway.app |
| `LK_JWT_SERVICE_URL` | web element | - | Public URL of your JWT service for LiveKit. Example: https://lk-jwt-service-production.up.railway.app |
| `ELEMENT_DEFAULT_THEME` | web element | - | Default theme for Element Web. Example: light |
| `ELEMENT_WEB_CLIENT_ID` | web element | - | OIDC client ID registered for Element Web. Example: 00000000000000000000SEC0ND |
| `LIVEKIT_URL` | element call | - | Base URL for LiveKit server (duplicate variable, ensure consistency). Example: https://livekit.example.com |
| `SERVER_NAME` | element call | - | Matrix homeserver name (duplicate, ensure consistency). Example: synape-production-7433.up.railway.app |
| `HOMESERVER_URL` | element call | - | Public URL of the Synapse homeserver (duplicate, ensure consistency). Example: https://synape-production-7433.up.railway.app |
| `LIVEKIT_JWT_SERVICE_URL` | element call | - | Public URL of the JWT service used by LiveKit. Example: https://lk-jwt-service-production.up.railway.app |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Python, Go Template, Go, Jinja, Shell, Dockerfile, HCL

[View on Railway →](https://railway.com/deploy/fronted)
