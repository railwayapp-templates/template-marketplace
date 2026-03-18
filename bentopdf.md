# Deploy BentoPDF on Railway

A Privacy First PDF Toolkit | StirlingPDF alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bentopdf)

## About

BentoPDF is a privacy-first, client-side PDF toolkit designed to let users manipulate, edit, merge, and process PDF files directly within their browser. All processing occurs locally, ensuring files are never uploaded to a server, providing security and privacy for the user.

Hosting BentoPDF involves deploying a modern web application that leverages front-end technologies such as Vite, TypeScript, and Tailwind CSS, alongside integrating powerful libraries like PDFLib.js, PDF.js, and PDFKit for PDF processing. While BentoPDF emphasizes client-side operations, deploying it on a platform like Railway enables streamlined infrastructure management, horizontal and vertical scaling, and seamless updates. Deployment can be performed using Docker and Docker Compose, which facilitates rapid setup, auto-restart, and security best practices (non-root execution, high port numbers). Maintaining a Railway deployment means you can offer a distraction-free, robust PDF toolkit accessible via the web for personal use, teams, or educational institutions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bentopdf/bentopdf:latest | `bentopdf/bentopdf:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/bentopdf)
