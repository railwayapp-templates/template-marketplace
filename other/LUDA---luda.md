# Deploy LUDA on Railway

Production backend deployment for the LUDA MERN stack psychoeducational 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/luda)

## About

LUDA is a robust, full-stack psychoeducational web application built on the modern MERN stack. Designed to streamline administrative workflows, the system securely manages user authentication, dynamic mental health resources, and progress tracking, providing an intuitive experience for both administrators and end-users.

Hosting LUDA on Railway involves deploying a containerized Node.js and Express backend alongside a production-ready database instance. The deployment process automatically builds the application from the repository, provisions the network infrastructure, and exposes a secure public URL. By separating the environment variables, the platform ensures that database connection strings, security tokens, and API keys remain fully protected while enabling seamless, automated redeployments whenever the repository is updated.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LUDA | [kyodarD/LUDA](https://github.com/kyodarD/LUDA) (root: /backend) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5000 |
| `NODE_ENV` | production |
| `EMAIL_PASS` | zbabumledclbpjtg |
| `EMAIL_USER` | (secret) |
| `JWT_EXPIRE` | 7d |
| `JWT_SECRET` | (secret) |
| `MONGODB_URI` | mongodb+srv://ludasaludmental_db_user:Luda_Proyecto@cluster0.olprsjb.mongodb.net/luda_db?retryWrites=true&w=majority |
| `FRONTEND_URL` | https://luda-liart.vercel.app |
| `BREVO_API_KEY` | (secret) |
| `RESEND_API_KEY` | (secret) |
| `CLOUDINARY_API_KEY` | (secret) |
| `CLOUDINARY_API_SECRET` | (secret) |
| `CLOUDINARY_CLOUD_NAME` | dk3sdht4e |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/luda)
