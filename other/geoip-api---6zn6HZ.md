# Deploy geoip-api on Railway

A self-hosted IP Geo API and Python package that works completely offline!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/6zn6HZ)

## About

<p style="text-align:center;" align="center">
  <img align="center" src="https://raw.githubusercontent.com/Malith-Rukshan/geoip-api/refs/heads/main/api/static/img/logo.png" alt="GeoIP API" width="300px" height="300px">
</p>
<h1 align="center">GeoIP API</h1>
<div align="center">

[![FastAPI](https://img.shields.io/badge/FastAPI-Powered-009688?logo=fastapi&amp;style=flat)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&amp;style=flat)](https://hub.docker.com/r/malithrukshan/geoip-api)
</div>

<h4 align="center">✨ A self-hosted REST API for IP geolocation that works completely offline! 🚀</h4>

<div align="center">
  - Deploy your own private GeoIP service with complete control over your data and infrastructure -
  <br>
  <sup><sub>Powered by MaxMind's GeoLite2 databases ツ</sub></sup>
</div>

---

<h3 align="center">🚀 Live Demo: <a href="https://geoip-api.malith.dev/">https://geoip-api.malith.dev/</a></h3>

---

## ✨ Features

- 🌍 Fast and reliable IP geolocation lookups via a REST API
- 🔒 Self-hosted solution with no external API dependencies
- 🐳 Easy deployment with Docker and cloud platforms
- 📊 Get country, city, coordinates, timezone, ISP, and ASN data
- 🎨 Beautiful, interactive demo UI for testing available at the root endpoint
- 🚀 Built with FastAPI for high performance
- 📦 Automatic GeoLite2 database downloads and updates

## 🛠️ Usage

The GeoIP API provides simple endpoints to perform IP lookups.

### REST API Endpoints

```

# Simple path parameter

[https://your-domain.com/8.8.8.8](https://your-domain.com/8.8.8.8)

# Query parameter

[https://your-domain.com/?ip=8.8.8.8](https://your-domain.com/?ip=8.8.8.8)

```

#### Standard API Endpoint

```

[https://your-domain.com/api/v1/geoip/lookup/8.8.8.8](https://your-domain.com/api/v1/geoip/lookup/8.8.8.8)

````

#### Response Format

```json
{
  "ip": "8.8.8.8",
  "code": "US",
  "country": "United States",
  "city": "Mountain View",
  "lat": 37.4056,
  "lon": -122.0775,
  "tz": "America/Los_Angeles",
  "isp": "Google LLC",
  "asn": 15169
}
````

## 📦 Deployment Options

### 🚀 Cloud Deployment

One-click deployment to popular platforms, ideal for quickly getting your own instance running:

[](https://railway.app/template/geoip-api)
[](https://heroku.com/deploy)
[](https://app.netlify.com/start/deploy?repository=https://github.com/Malith-Rukshan/geoip-api)
[](https://render.com/deploy?repo=https://github.com/Malith-Rukshan/geoip-api)

## 🌐 Use Cases

  - **Security &amp; Compliance**: Enhance security systems with IP-based threat detection while maintaining data sovereignty
  - **Content Localization**: Deliver region-specific content based on visitor location without sharing user data
  - **Analytics**: Analyze traffic patterns and user demographics with geographic data that remains within your infrastructure
  - **Fraud Prevention**: Identify suspicious login attempts based on geographic anomalies
  - **Development Environment**: Use a local GeoIP service in your development environment without external API dependencies

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

## ⚠️ Database License Notice

This project uses GeoLite2 data created by MaxMind, available from [https://www.maxmind.com](https://www.maxmind.com). The GeoLite2 databases are licensed under the Creative Commons Attribution-ShareAlike 4.0 International License.

## 🔧 Acknowledgements

  - GeoLite2 databases provided by [MaxMind](https://www.maxmind.com)
  - Mirror of GeoLite2 databases maintained by [P3TERX](https://github.com/P3TERX/GeoLite.mmdb)
  - Built with [FastAPI](https://fastapi.tiangolo.com/) and [Python](https://www.python.org/)
  - Powered by [geoip2](https://github.com/maxmind/GeoIP2-python) library

## 🤝 Contributing

Contributions are welcome\! Please feel free to submit a Pull Request.

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

## 🌟 Support and Community

If you found this project helpful, please give it a ⭐ on GitHub. This helps more developers discover the project\! 🫶

## 📬 Contact

If you have any questions, feedback, or just want to say hi, you can reach out to me:

  - Email: [hello@malith.dev](mailto:hello@malith.dev)
  - GitHub: [@Malith-Rukshan](https://github.com/Malith-Rukshan)

🧑‍💻 Built with 💖 by [Malith Rukshan](https://github.com/Malith-Rukshan)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| malithrukshan/geoip-api | `malithrukshan/geoip-api` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |

## Configuration

- **Healthcheck:** `http://localhost:8000/api/v1/geoip/lookup/8.8.8.8`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/6zn6HZ)
