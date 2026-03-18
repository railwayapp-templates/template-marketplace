# Deploy Minimal API .NET 10 on Railway

Simple ASP.NET Minimal API (.Net, 10 C#). Basic template, demo endpoints.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dynamic-truth)

## About

This is a basic ASP.NET Core starter template. The project structure is clean and minimal, making it easy to understand, extend, and use as a foundation for new APIs.

This template runs on .NET 10 without additional frameworks or external services. It is designed to work as a simple HTTP API that can be expanded with authentication, databases, or other features as needed.

### Common Use Cases

- Creating a new REST API

- Learning Minimal APIs in .NET

- Starting a lightweight backend service

### Dependencies for Minimal API .NET 10 Hosting
- .NET 10.0 or later

### Deployment Dependencies

This template does not require a Dockerfile. Railway uses **Railpack** (new default builder) to automatically detect and build the .NET application. More info https://railpack.com/languages/dotnet

Under **Build → Builder**, make sure **Railpack** is selected. No additional configuration is required.

#### Network configuration
Before deploying, make sure to enable Public Networking for the service and `generate` or `configure a custom domain` in Settings → Networking tab. This allows the API to be accessed publicly over HTTP.

If the service has already been deployed, verify the port of the application, Railway usually suggests the correct port automatically, but it should be explicitly set to `8080` to ensure proper functionality.

### Available Endpoints

GET /
Returns basic API information such as name, version, status, and current UTC timestamp.

Response:

```
{
  "api": "MinimalApiNet10",
  "version": "1.0.0",
  "status": "running",
  "timestamp": "2026-02-24T18:25:43Z"
}
```

GET /hello
Returns a simple "Hello World!" response.

Example response:
```
"Hello World!"
```

GET /greet?name=John&city=Miami
Demonstrates query parameter handling by returning a personalized greeting using name and city.

Example response:
```
"Hello John from Miami!"
```

### License

This project is licensed under the MIT License.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Minimal Api  .Net 10  | [BracoZS/MinimalApi-Net10](https://github.com/BracoZS/MinimalApi-Net10) | Worker |

**Category:** Starters

[View on Railway →](https://railway.com/template/dynamic-truth)
