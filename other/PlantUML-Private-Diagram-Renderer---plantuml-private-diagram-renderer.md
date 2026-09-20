# Deploy PlantUML Private Diagram Renderer on Railway

Render UML diagrams from text behind owner access and sandbox controls.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plantuml-private-diagram-renderer)

## About

Render UML diagrams from text behind owner access and sandbox controls.

PlantUML Server converts textual UML descriptions into images. The private Jetty service listens on port 8080 and the owner gateway exposes HTTPS. This stateless renderer has no persistent volume; preserve your diagram source files in your own repository.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| plantuml | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | `plantuml/plantuml-server:jetty-v1.2026.8@sha256:5f6f99ec2fc11c8236e80630d622b0ba22b8d9301b39b18db4bb2b95cae87781` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | plantuml | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | plantuml | true | Owner auth for plantuml. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | plantuml | all | Owner scope for plantuml. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | plantuml | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | plantuml | 8080 | Upstream port for plantuml. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | plantuml | (secret) | Generated access password. Keep private and preserve with backups. |
| `JAVA_TOOL_OPTIONS` | core | -Xms128m -Xmx512m | Initial and maximum Java heap. Provision additional memory for the JVM and Graphviz. |
| `PLANTUML_LIMIT_SIZE` | core | 4096 | Maximum rendered image width or height in pixels. Keep bounded for resource control. |
| `PLANTUML_SECURITY_PROFILE` | core | SANDBOX | Disable diagram access to local files and remote URLs; keep SANDBOX for this private renderer. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/plantuml-private-diagram-renderer)
