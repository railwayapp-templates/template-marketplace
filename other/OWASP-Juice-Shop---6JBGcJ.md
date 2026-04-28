# Deploy OWASP Juice Shop on Railway

An intentionally vulnerable web app for security skills testing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/6JBGcJ)

## About

OWASP Juice Shop is a deliberately vulnerable modern web application designed for security training, awareness demos, CTF events, and hands-on practice. It covers over 100 challenges across all OWASP Top Ten vulnerability categories, including injection, broken authentication, XSS, sensitive data exposure, and more.

Juice Shop is a Node.js application served via Docker that runs entirely in-memory with no persistent database — progress resets on each redeploy, which is intentional and useful for repeatable training scenarios. This Railway template deploys the official Docker image as a single service with no additional dependencies. There are no credentials to configure and no environment variables required. Once deployed, navigate to the public Railway URL, find the Score Board challenge to unlock the challenge tracker, and start hacking.
 
⚠️ **Juice Shop is intentionally insecure. Do not deploy it on a network or domain where it could be mistaken for a legitimate service, and do not store any real data in it.**

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| juice-shop | `bkimminich/juice-shop` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/6JBGcJ)
