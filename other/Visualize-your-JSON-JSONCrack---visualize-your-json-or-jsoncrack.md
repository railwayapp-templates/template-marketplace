# Deploy Visualize your JSON | JSONCrack on Railway

The best online JSON viewer to visualize, format and explore.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/visualize-your-json-or-jsoncrack)

## About

JSON Crack is an innovative, open-source visualization tool that transforms complex data formats—including JSON, YAML, XML, and CSV—into interactive, easy-to-read graphs. It provides developers and data analysts with powerful features like format validation, JSON schema generation, code conversion, and localized data processing for enhanced privacy.

Hosting JSON Crack on a platform like Railway involves deploying the application using its provided source code. Since the project uses a monorepo structure (utilizing Turbo) and requires Node.js, you would typically deploy the `apps/www` folder. Deployment requires configuring the build environment to execute the necessary package installation (pnpm) and the build process defined in the `package.json`. By connecting your GitHub repository to Railway, you can leverage automated builds and persistent deployment, ensuring your instance of the visualizer is always up-to-date with your specific configurations or custom tweaks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jsoncrack.com | [AykutSarac/jsoncrack.com](https://github.com/AykutSarac/jsoncrack.com) | Web service |

## Configuration

- **Start command:** `npx serve@latest apps/www/out`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Dockerfile, Shell, HTML

[View on Railway →](https://railway.com/deploy/visualize-your-json-or-jsoncrack)
