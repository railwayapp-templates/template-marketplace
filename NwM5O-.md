# Deploy Jenkins on Railway

The leading open source automation server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/NwM5O-)

## About

# Jenkins

#### Build great things at any scale

The leading open source automation server, Jenkins provides hundreds of plugins to support building, deploying and automating any project.

### Setup

1. Deploy this template and wait for it to become healthy.
3. Follow the post-install instructions defined [here](https://www.jenkins.io/doc/book/installing/docker/#setup-wizard) or
    - Copy the admin password printed in the container logs
    -  Goto the Jenkins site by clicking the HTTP URL defined in the settings.
    - Paste admin password and create your account

### Adding more agents

To add more agents, use the [Jenkins Agent template](https://railway.app/template/id4SxN?referralCode=GsFL3s) and follow the instructions defined there.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Jenkins | `jenkins/jenkins:2.514-jdk17` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TINI_SUBREAPER` | 1 |
| `JENKINS_PRIVATE_PORT` | 8080 |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/jenkins_home`

**Category:** Automation

[View on Railway →](https://railway.com/template/NwM5O-)
