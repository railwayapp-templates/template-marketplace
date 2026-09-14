# Deploy draw.io on Railway

Diagram editor for flowcharts, UML and cloud architecture

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/drawio)

## About

draw.io is the diagram editor behind diagrams.net — the tool engineers and architects use for flowcharts, UML, network and cloud architecture, ER models, BPMN and mind maps. It ships thousands of shapes, including the official AWS, Azure, Google Cloud, Cisco and Kubernetes icon sets, and it reads and writes plain XML, so a diagram is a file you own rather than a row in someone else's database. Self-host draw.io when the diagrams describe systems you would rather not upload: network topologies, data flows, access maps.

Deploy draw.io on Railway and you get two services. **drawio** is the editor itself, an Apache Tomcat webapp behind a small reverse proxy that adds compression, security headers and optional password protection. **export-server** is draw.io's own renderer — Node driving headless Chrome — and it is what turns a diagram into a PDF or a high-resolution PNG. The browser never talks to it directly: the editor posts to `/service/0` on its own origin, drawio forwards that over Railway's private network, and export-server returns the file. Nothing reaches draw.io's public conversion endpoint.

![Diagram of the drawio and export-server services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789243630/drawio-architecture.webp)

draw.io is Apache-2.0 licensed and developed by JGraph. The hosted diagrams.net is free, but its PDF conversion endpoint receives the full XML of anything you export. Self-hosting removes that and gives you a fixed URL you can put behind your own network controls.

What you get:

- Thousands of shapes across flowchart, UML, ER, BPMN, network, mockup and rack libraries, plus the AWS, Azure, GCP, Cisco and Kubernetes icon sets
- Text-to-diagram from Mermaid and PlantUML, both rendered in the browser
- Import from Visio (`.vsdx`), Gliffy, Lucidchart and plain `.drawio` XML
- Export to PNG, JPEG, SVG, PDF, HTML and XML, server-rendered for PDF
- Optional Google Drive, OneDrive and GitLab storage over real OAuth

**drawio** serves the editor and proxies export requests, and is the only service with a public domain. **export-server** has no public address and is reachable only from inside the project — a service that renders arbitrary markup is not one to expose.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| export-server | [gridalpha/drawio-railway](https://github.com/gridalpha/drawio-railway) | Worker |
| drawio | [gridalpha/drawio-railway](https://github.com/gridalpha/drawio-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | export-server | 8080 | Health shim port; Railway probes here |
| `EXPORT_PORT` | export-server | 8000 | Port the export server itself binds |
| `PRIVATE_URL` | export-server | http://export-server.railway.internal:8000 | Referenced by drawio as EXPORT_URL |
| `DRAWIO_BASE_URL` | export-server | http://drawio.railway.internal:8080 | Where Chrome loads export3.html |
| `DRAWIO_SERVER_URL` | export-server | http://drawio.railway.internal:8080 | Legacy name for the same setting |
| `PORT` | drawio | 8090 | Proxy port; Railway probes and routes here |
| `JAVA_OPTS` | drawio | -XX:MaxRAMPercentage=50 -Djava.net.preferIPv6Addresses=true | Heap cap and IPv6 preference |
| `EXPORT_URL` | drawio | - | Private renderer behind /service/0 |
| `PUBLIC_DNS` | drawio | - | CN of the internal self-signed keystore |
| `DRAWIO_LANG` | drawio | - | Default UI language; empty follows the browser |
| `PRIVATE_URL` | drawio | http://drawio.railway.internal:8080 | Tomcat address for the renderer |
| `DRAWIO_CONFIG` | drawio | - | draw.io configuration JSON |
| `KEYSTORE_PASS` | drawio | - | Replaces the image's published keystore default |
| `ROBOTS_POLICY` | drawio | noindex | Serves Disallow: /; allow to be indexed |
| `DRAWIO_BASE_URL` | drawio | - | Public base URL of the editor |
| `DRAWIO_PASSWORD` | drawio | (secret) | Basic-auth password, hashed at startup |
| `DRAWIO_USERNAME` | drawio | (secret) | Basic-auth username; set with the password |
| `X_FRAME_OPTIONS` | drawio | SAMEORIGIN | Frame policy; off permits embedding |
| `DRAWIO_GITLAB_ID` | drawio | - | GitLab OAuth application id |
| `DRAWIO_CSP_HEADER` | drawio | - | Overrides the editor's own Content-Security-Policy |
| `DRAWIO_GITLAB_URL` | drawio | - | GitLab instance base URL |
| `DRAWIO_GITLAB_SECRET` | drawio | (secret) | GitLab OAuth application secret |
| `DRAWIO_GOOGLE_APP_ID` | drawio | - | Google Drive app id |
| `DRAWIO_GOOGLE_CLIENT_ID` | drawio | - | Google Drive OAuth client id |
| `DRAWIO_MSGRAPH_CLIENT_ID` | drawio | - | OneDrive OAuth client id |
| `DRAWIO_MSGRAPH_TENANT_ID` | drawio | - | OneDrive tenant id |
| `DRAWIO_GOOGLE_CLIENT_SECRET` | drawio | (secret) | Google Drive OAuth client secret |
| `DRAWIO_MSGRAPH_CLIENT_SECRET` | drawio | (secret) | OneDrive OAuth client secret |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/drawio)
