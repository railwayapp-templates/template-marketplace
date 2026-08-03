# Deploy 3D Lens on Railway

Interactive 3D lens learning

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/3d-lens)

## About

Lens is an interactive 3D optical lens learning application designed to visualize and experiment with optical behaviors in a web browser. Built using Fable 5, it provides real-time 3D rendering and simulation tools for students, educators, and physics enthusiasts looking to explore lens properties dynamically.

Deploying Lens on Railway provisions a lightweight web service optimized for serving static assets and rendering interactive 3D web applications. Railway automates the deployment pipeline directly from the GitHub repository, handling build operations, dependency resolution, and asset hosting without manual server configuration.

Because Lens runs purely on the client side, it requires no persistent storage volumes or external database services. Railway provisions the application with automatic HTTPS certificates, built-in edge networking, and zero-downtime deployments. Custom domain routing and global CDN distribution can be configured through Railway's service settings. Scaling can be handled seamlessly within the Railway platform by adjusting service memory or CPU allocations as incoming traffic grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 3d-lens | [bilalnawaz072/3d-lens](https://github.com/bilalnawaz072/3d-lens) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** HTML, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/3d-lens)
