# Deploy Stirling PDF on Railway

A local hosted web based PDF editor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Rn4VSj)

## About

# Stirling PDF

This is a robust, locally hosted web-based PDF manipulation tool using Docker. It enables you to carry out various operations on PDF files, including splitting, merging, converting, reorganizing, adding images, rotating, compressing, and more. This locally hosted web application has evolved to encompass a comprehensive set of features, addressing all your PDF requirements.

Stirling PDF does not initiate any outbound calls for record-keeping or tracking purposes.

All files and PDFs exist either exclusively on the client side, reside in server memory only during task execution, or temporarily reside in a file solely for the execution of the task. Any file downloaded by the user will have been deleted from the server by that point.

## Features

- Dark mode support.
- Custom download options
- Parallel file processing and downloads
- Custom 'Pipelines' to run multiple features in a queue
- API for integration with external scripts
- Optional Login and Authentication support (see [here](https://github.com/Stirling-Tools/Stirling-PDF/tree/main#login-authentication) for documentation)
- Database Backup and Import (see [here](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/DATABASE.md) for documentation)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Stirling PDF | `frooodle/s-pdf:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `LANGS` | en_GB |
| `DOCKER_ENABLE_SECURITY` | false |
| `INSTALL_BOOK_AND_ADVANCED_HTML_OPS` | false |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/trainingData:/usr/share/tessdata`

**Category:** Other

[View on Railway →](https://railway.com/deploy/Rn4VSj)
