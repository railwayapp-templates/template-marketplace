# Deploy RStudio Server on Railway

The power of centralized access

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/FwxPvi)

## About

<p align="center">
    <a href="https://rocker-project.org/">
        <img style="width: 100px;" src="https://gridonyx.com/assets/img/rocker_logo.svg" alt="rocker project logo">
    </a>
</p>

Using the image built and provided by Rocker Project, RStudio Server by Posit enables you to provide a browser-based interface to a version of R running on a remote Linux server, bringing the power and productivity of the RStudio IDE to server-based deployments of R.

<h3>Logging In</h3>
<p><strong>Username:</strong> rstudio</p>
<p><strong>Password: </strong><em>Created on template deployment</em></p>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RStudio Server | `rocker/rstudio:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8787 | Server Port (Don't change) |
| `PASSWORD` | (secret) | This will be the password for the 'rstudio' user account |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/rstudio/workspace`

**Category:** Other

[View on Railway →](https://railway.com/deploy/FwxPvi)
