# Deploy R Studio Server on Railway

R Studio Server preinstalled with many libraries

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/r-studio-server)

## About

__RStudio__ is an integrated development environment (IDE) specifically designed for __R__, a _programming language used for statistical computing and graphics_. It provides a user-friendly interface that streamlines data analysis by combining a console, a syntax-highlighting editor, and dedicated tools for plotting, history, and workspace management in one screen. Whether you are cleaning datasets, building complex statistical models, or creating interactive visualizations, RStudio enhances productivity through features like direct code execution and integrated support for R Markdown, __Quarto__, and __Shiny__ applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ikanx101/r-custom:latest | `ikanx101/r-custom:latest` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8787 |
| `ROOT` | true |
| `PASSWORD` | (secret) |

**Category:** Analytics

[View on Railway →](https://railway.com/template/r-studio-server)
