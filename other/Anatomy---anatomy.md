# Deploy Anatomy on Railway

3D Interactive Human Anatomay

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anatomy)

## About

Anatomy Atelier is an interactive 3D human anatomy explorer designed for medical students, educators, and curious learners. Built using Three.js and Next.js/vinext, the platform provides a detailed, visual interface for examining human organs and anatomical structures with real-time interactive models and AI-assisted educational features.

Deploying Anatomy Atelier on Railway provisions a full-stack web application powered by Node.js and Next.js/vinext. Railway handles the build process automatically from the repository using the specified runtime configurations, providing instant HTTPS endpoints and automated CI/CD deployments directly from source control.

The hosting architecture utilizes Cloudflare D1 via Drizzle ORM for serverless database persistence, allowing structured storage for user interactions, saved records, and customized learning views. Public networking is managed via Railway's HTTP proxy, routing external traffic efficiently to the application's target web port. Scaling is handled seamlessly within Railway, enabling easy vertical or horizontal resource adjustments to maintain smooth 3D rendering performance across client sessions without manual infrastructure management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| anatomy | [bilalnawaz072/anatomy](https://github.com/bilalnawaz072/anatomy) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/anatomy)
