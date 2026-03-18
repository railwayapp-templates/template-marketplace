# Deploy R Shiny on Railway

Minimalist R Shiny Web App 📊

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/r-shiny)

## About

**What is R Shiny?**
R Shiny is an open-source R package that provides an elegant web framework for building interactive web applications directly from R. It allows data scientists to turn analyses into dynamic, responsive dashboards and visualizations without requiring deep knowledge of HTML, CSS, or JavaScript, making data insights easily accessible.

Hosting R Shiny requires an environment pre-configured with the R runtime and necessary system dependencies. Since Shiny apps often perform heavy statistical computations in real-time, the hosting setup must efficiently manage active sessions and resource allocation. By using a Docker-based approach on Railway, the entire environment—including R, your app code, and its libraries—is containerized. Railway automates the deployment process by reading your Dockerfile, mapping the dynamic port, and providing a scalable infrastructure, allowing you to focus on your data while Railway handles the server management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| r-shiny | [codestorm-official/r-shiny](https://github.com/codestorm-official/r-shiny) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3838 |

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/r-shiny)
