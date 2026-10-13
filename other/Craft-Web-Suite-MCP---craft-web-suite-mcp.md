# Deploy Craft Web Suite + MCP on Railway

Storytold + Supergateway. Seven apps, one MCP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/craft-web-suite-mcp)

## About

Craft Web Suite hosts seven [Storytold](https://github.com/storytold/) apps in the browser and joins their command-line MCP servers into one endpoint. PhotoCraft, LightCraft, FilmCraft, EffectCraft, VectorCraft, DesignCraft, and PdfCraft each run as their own service. A supergateway service, MCP, exposes every app at a single Streamable HTTP URL.

Railway builds the images from [feliperosenek/craft-deploy](https://github.com/feliperosenek/craft-deploy). The root Dockerfile downloads the latest Storytold web release and the matching Linux CLI, then serves the editor on port 8080. [supergateway](https://github.com/supercorp-ai/supergateway) turns that CLI, which only speaks MCP on stdin/stdout, into `POST /mcp` on the same domain.

The MCP service uses the `mcp/` directory of the same repository. It does not run the editors. It connects to each app over the Railway private network and publishes one stateful MCP server at `/suite/mcp`. Tool names carry the app as a prefix, so `photocraft_doc_new` and `pdfcraft_text_extract` stay distinct.

`SUPERGATEWAY_API_KEY` is required. Send it as `Authorization: Bearer` or `X-API-Key`. Documents stay in the app container that handled the call. Nothing is stored on a volume, and a new deploy starts from an empty workspace.

A generated domain provides HTTPS, which the browser editors need for WebGPU. `GET /healthz` is the health check.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| EffectCraft | [feliperosenek/craft-deploy](https://github.com/feliperosenek/craft-deploy) | Web service |
| FilmCraft | [feliperosenek/craft-deploy](https://github.com/feliperosenek/craft-deploy) | Web service |
| PhotoCraft | [feliperosenek/craft-deploy](https://github.com/feliperosenek/craft-deploy) | Web service |
| MCP | [feliperosenek/craft-deploy](https://github.com/feliperosenek/craft-deploy) (root: mcp) | Web service |
| LightCraft | [feliperosenek/craft-deploy](https://github.com/feliperosenek/craft-deploy) | Web service |
| PdfCraft | [feliperosenek/craft-deploy](https://github.com/feliperosenek/craft-deploy) | Web service |
| DesignCraft | [feliperosenek/craft-deploy](https://github.com/feliperosenek/craft-deploy) | Web service |
| VectorCraft | [feliperosenek/craft-deploy](https://github.com/feliperosenek/craft-deploy) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SUPERGATEWAY_API_KEY` | EffectCraft | (secret) |
| `SUPERGATEWAY_API_KEY` | FilmCraft | (secret) |
| `SUPERGATEWAY_API_KEY` | PhotoCraft | (secret) |
| `SUPERGATEWAY_API_KEY` | MCP | (secret) |
| `SUPERGATEWAY_API_KEY` | LightCraft | (secret) |
| `SUPERGATEWAY_API_KEY` | PdfCraft | (secret) |
| `SUPERGATEWAY_API_KEY` | DesignCraft | (secret) |
| `SUPERGATEWAY_API_KEY` | VectorCraft | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/craft-web-suite-mcp)
