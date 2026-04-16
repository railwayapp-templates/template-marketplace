# Deploy S3 Bucket Explorer on Railway

Self-hosted S3 file manager with web UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/s3-bucket-explorer-1)

## About

S3 Bucket Explorer is a modern, self-hosted S3 file manager built with React Router 7. Browse, upload, download, preview, and manage files in any S3-compatible storage service — including AWS S3, MinIO, Cloudflare R2, 
  DigitalOcean Spaces, Backblaze B2, and Wasabi.                                                 
                                                                                                                                                                                                                            
  ## About Hosting S3 Bucket Explorer                                                            

  Deploying S3 Bucket Explorer on Railway is straightforward. The template uses a Docker image built from the included Dockerfile. You just need to provide your S3-compatible storage credentials as environment variables 
  — endpoint, access key, secret key, and region. Optionally, you can lock down access with username/password authentication. Railway handles the container orchestration, networking, and public URL generation
  automatically. No infrastructure management required.                                                                                                                                                                     
                                                                                                 
  ## Common Use Cases

  - Self-hosted file browser for your S3, MinIO, or R2 buckets with a clean web UI
  - Internal tool for teams to manage cloud storage without AWS Console access
  - Quick drag-and-drop file uploads with inline preview for images, video, audio, and PDFs
                                                                                                                                                                                                                            
  ## Dependencies for S3 Bucket Explorer Hosting
                                                                                                                                                                                                                            
  - Any S3-compatible storage service (AWS S3, MinIO, Cloudflare R2, DigitalOcean Spaces, Backblaze B2, Wasabi)                                                                                                             
  - S3 credentials: endpoint URL, access key ID, and secret access key
                                                                                                                                                                                                                            
  ### Deployment Dependencies                                                                    

  - [AWS S3](https://aws.amazon.com/s3/)
  - [MinIO](https://min.io/)
  - [Cloudflare R2](https://developers.cloudflare.com/r2/)                                                                                                                                                                  
  - [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces)
  - [GitHub Repository](https://github.com/soratekstudio/s3-explorer)                                                                                                                                                       
                                                                                                                                                                                                                            
  ## Why Deploy S3 Bucket Explorer on Railway?
                                                                                                                                                                                                                            
  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying S3 Bucket Explorer on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| soratekstudio/s3-explorer:latest | `ghcr.io/soratekstudio/s3-explorer:latest` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AUTH_PASSWORD` | (secret) |
| `AUTH_USERNAME` | (secret) |
| `SESSION_SECRET` | (secret) |
| `S3_SECRET_ACCESS_KEY` | (secret) |

**Category:** Storage

[View on Railway →](https://railway.com/deploy/s3-bucket-explorer-1)
