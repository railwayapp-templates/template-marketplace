# Deploy ASP.NET Minimal API on Railway

ASP.NET Core minimal API on .NET 9 (dotnet) with a Dockerfile build

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zsaPAU)

## About

A minimal API is the smallest ASP.NET Core application there is: a `Program.cs` that maps routes to functions, no controllers, no startup class. This template deploys one on .NET 9 with a multi-stage Dockerfile and three endpoints, so you have a working C# HTTP service on Railway to build from in a couple of minutes.

The service builds from a small repository with the included Dockerfile: the .NET 9 SDK image restores and publishes the project, and the runtime image (`mcr.microsoft.com/dotnet/aspnet:9.0`) runs the published DLL. The ASP.NET Core runtime image listens on port 8080 by default, so after deploying, generate a domain for the service and set the target port to 8080 to reach it.

`Program.cs` is the whole application:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/json", () => Results.Json(new { message = "Hello World!" }));
app.MapGet("/json/{name}", (string name) => Results.Json(new { message = $"Hello {name}!" }));

app.Run();
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ASP.NET-Minimal-API | [ThallesP/ASP.NET-Minimal-API](https://github.com/ThallesP/ASP.NET-Minimal-API) | Worker |

**Category:** Starters

[View on Railway →](https://railway.com/deploy/zsaPAU)
