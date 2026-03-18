# Deploy jirtech-solution on Railway

Deploy and Host jirtech-solution with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/jirtech-solution)

## About

JirTech Solution is a one-page portfolio + backend service that can be deployed to cloud hosting providers like Railway, Render, or Dockerized VPS.

The project serves a frontend portfolio (HTML/CSS/JS) and includes a Node.js backend (Express) that handles contact form submissions via email.

This project is designed for containerized hosting environments:

Railway – Easy GitHub integration, deploy with one click.

Render – Simple full-stack hosting with environment variables.

Docker VPS – Deploy anywhere (AWS, DigitalOcean, GCP) using Docker.

The server binds to 0.0.0.0 and dynamically respects the hosting provider’s PORT.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jirtech-solution | [jhnrbrt/jirtech-solution](https://github.com/jhnrbrt/jirtech-solution) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `EMAIL_PASS` | your-app-password |
| `EMAIL_USER` | (secret) |
| `EMAIL_RECEIVER` | reinhonculada@gmail.com |

**Category:** Other · **Languages:** HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/jirtech-solution)
