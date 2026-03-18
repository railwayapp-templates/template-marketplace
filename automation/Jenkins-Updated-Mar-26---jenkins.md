# Deploy Jenkins [Updated Mar ’26] on Railway

Jenkins [Mar ’26] (Automate Builds, Tests & Deployments Easily) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/jenkins)

## About

Jenkins is an open-source automation server that helps developers build, test, and deploy their software reliably. Available on GitHub, Jenkins automates parts of the software development process related to building, testing, and delivering code, making it an essential part of modern DevOps pipelines.

Self-hosting Jenkins on Railway allows you to fully control your CI/CD workflows, plugins, and credentials in a secure environment. By deploying Jenkins yourself, you can customize every aspect of your build automation process, integrating with your favorite tools like GitHub, Docker, Kubernetes, or Slack.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| robertcoder/jenkins-tools:latest | `robertcoder/jenkins-tools:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/jenkins_home`

**Category:** Automation

[View on Railway →](https://railway.com/template/jenkins)
