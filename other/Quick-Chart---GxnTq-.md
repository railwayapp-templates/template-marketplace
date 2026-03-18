# Deploy Quick Chart on Railway

API service that generates chart images for emails, reports, and dashboards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/GxnTq-)

## About

# QuickChart: Open-Source Chart Generation API

QuickChart is a powerful, open-source chart image generation API that has served over 4 billion charts worldwide. Built on Chart.js, the most popular open-source charting library, QuickChart enables developers to generate customizable charts through simple URL parameters or client libraries.

## Key Features

- **RESTful API** for generating chart images via URL parameters
- Support for multiple chart types: bar, line, pie, radar, and more
- Official client libraries for Python, JavaScript, Java, C#, Ruby, PHP, and Go
- Customizable styling, colors, gradients, and animations
- Built-in support for responsive designs and retina displays
- Compatible with email clients, markdown documents, and any platform that displays images
- Easy integration with no-code tools like Zapier, Make, Airtable, and Google Sheets

## Technical Specifications

### Core Technology
- Built on Node.js and Chart.js
- Supports Chart.js 2.9.4 configurations
- Outputs PNG images by default

### Deployment
- Docker-ready for easy deployment
- Memory-efficient image rendering
- Horizontally scalable architecture
- AGPLv3 licensed with commercial license option

## Why Self-Host QuickChart?

Self-hosting QuickChart gives you complete control over your chart generation infrastructure, ensuring:
- Data privacy and security
- Customization flexibility
- On-premise deployment options
- Scalable chart generation

Get started with one-click deployment on Railway and join thousands of developers and businesses already using QuickChart for their data visualization needs.

## Quick Start

```javascript
// Example usage
const chartUrl = 'https://quickchart.io/chart?c={type:"bar",data:{labels:["Q1","Q2","Q3","Q4"], datasets:[{label:"Users",data:[50,60,70,180]}]}}';
Integration Examples
pythonCopyfrom quickchart import QuickChart

qc = QuickChart()
qc.width = 500
qc.height = 300
qc.config = {
    'type': 'bar',
    'data': {
        'labels': ['Q1', 'Q2', 'Q3', 'Q4'],
        'datasets': [{
            'label': 'Users',
            'data': [50, 60, 70, 180]
        }]
    }
}

# Get chart URL or save as image
print(qc.get_url())
qc.to_file('chart.png')
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Quick Chart | `ianw/quickchart` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/GxnTq-)
