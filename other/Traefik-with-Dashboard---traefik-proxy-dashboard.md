# Deploy Traefik with Dashboard on Railway

[Jul'26] Self-hosted Traefik with dashboard and editable Railway config

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/traefik-proxy-dashboard)

## About

Traefik is a modern open-source reverse proxy and edge router for routing traffic to backend services. It supports HTTP routing, load balancing, middleware, dashboards, and dynamic configuration, making it useful for APIs, web applications, microservices, and self-hosted infrastructure.

Hosting Traefik on Railway gives you a lightweight way to run a proxy and routing layer in front of your services. This template can route traffic to Railway private services, external HTTP services, APIs, dashboards, or self-hosted applications.

This template includes a working Traefik Dashboard and uses file-based dynamic configuration. Routing rules can be edited through Railway Console or Railway CLI by updating the dynamic configuration file stored in the Railway Volume.

When deployed, the root URL automatically redirects to the Traefik Dashboard, so you can confirm the service is running immediately after deployment.

![Imgur](https://imgur.com/6sKJEH5.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| traefik | `traefik` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `TRAEFIK_LOG_LEVEL` | info |
| `TRAEFIK_API_INSECURE` | true |
| `TRAEFIK_PROVIDERS_FILE_WATCH` | true |
| `TRAEFIK_ENTRYPOINTS_WEB_ADDRESS` | :80 |
| `TRAEFIK_PROVIDERS_FILE_FILENAME` | /data/dynamic.yml |

## Configuration

- **Start command:** `sh -c 'mkdir -p /data; if [ ! -f /data/dynamic.yml ]; then printf "%s\n" "http:" "  routers:" "    root-redirect:" "      rule: \"Path(\`/\`)\"" "      entryPoints:" "        - web" "      middlewares:" "        - redirect-to-dashboard" "      service: noop@internal" "" "    dashboard:" "      rule: \"PathPrefix(\`/api\`) || PathPrefix(\`/dashboard\`)\"" "      entryPoints:" "        - web" "      service: api@internal" "" "  middlewares:" "    redirect-to-dashboard:" "      redirectRegex:" "        regex: \"^https?://([^/]+)/?$\"" "        replacement: \"https://\${1}/dashboard/\"" "        permanent: false" > /data/dynamic.yml; fi; exec traefik'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/traefik-proxy-dashboard)
