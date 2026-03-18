# Deploy NodeJS-multipart-uploader on Railway

Multipart Upload Manager for uploads to AWS S3

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ZvGKWx)

## About

This project is a starting point for managing multipart uploads to AWS S3 buckets without the need for the file to pass through the server which will save time, effort, and money by leveraging a client to do the upload directly to S3 via pre-signed URLs.

This nodeJS server is designed to act as a backend that will be able to securely generate the pre-signed URLs and to provide a client with the necessary information to manage multipart uploads with the ability to resume the upload if a connection is lost.

Steps to prepare for use:
1. Create an account with AWS.
2. Create a new S3 bucket
3. Create an IAM user with permissions on that same bucket
4. Generate credentials for that IAM user (access_key, access_secret)

Set ENV Variables for deployment:
There are 5 required variables needed for this starter to work for you, visit the repo in gitHub to see the example env file.


This starter is meant to work in conjunction with a client application or script which will need to make the API calls to the NodeJS server once deployed in order to retrieve the data and generate the pre-signed URLs to be used when uploading large files to S3.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nodejs-multipart-uploader | [Mitchell8210/nodejs-multipart-uploader](https://github.com/Mitchell8210/nodejs-multipart-uploader) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AWS_SECRET` | (secret) |

## Configuration

- **Start command:** `npm run start`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/ZvGKWx)
