# Deploy Modern Portfolio on Railway

Advanced 3d nextjs Framer portfolio

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/modern-portfolio)

## About

Modern Portfolio is a modern, responsive web developer portfolio template built with Next.js and Framer Motion. Designed for developers and designers, it features interactive UI components, smooth page transitions, dynamic project showcases, contact forms, and customizable sections to display skills, services, and work history seamlessly.

Hosting Modern Portfolio on Railway provides a streamlined deployment process for Next.js applications. Railway builds the application directly from the source code using Node.js or Docker environment settings. The application runs as a web service with automatic HTTPS termination provided through Railway's edge network.

Persistent storage volumes are not required because Modern Portfolio functions as a static and dynamically rendered frontend application. No dedicated database services are needed for basic operation. Modern Portfolio utilizes Railway's public networking to expose HTTP web traffic on the container's standard internal port, allowing easy custom domain mapping and automatic SSL certificate generation. Modern Portfolio scales vertically by adjusting service resource limits in the Railway dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| modern-portfolio | [bilalnawaz072/modern-portfolio](https://github.com/bilalnawaz072/modern-portfolio) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/modern-portfolio)
