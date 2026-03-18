# Deploy Blazor Server Starter on Railway

Blazor Server starter for building web apps with C# and .NET 9

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/blazor-server-starter)

## About

# ⚡ Deploy Blazor Server Starter

Build modern, interactive web applications with **C# instead of JavaScript**. This minimal Blazor Server template gets you from zero to production in under 90 seconds — no configuration required.

## 🚀 What's Included

**🎯 Production-Ready Blazor Server**  
.NET 9 with interactive server components, real-time SignalR updates, and zero JavaScript configuration. Just pure C# from UI to business logic.

**🐳 Docker Optimized**  
Multi-stage builds reduce image size by 60%. Fast builds, small containers, production-ready deployment with health checks built-in.

**⚙️ Railway Pre-Configured**  
Automatic PORT handling, health monitoring at `/health`, production error handling, and SSL termination at the edge.

## 💡 Perfect For

✨ **Developers who prefer C# over JavaScript** - Write your entire app in one language  
📊 **Internal dashboards and admin panels** - Real-time data grids and interactive charts  
🏢 **Enterprise web applications** - Leverage the full .NET ecosystem  
🚀 **Rapid prototyping** - Ship fast without JavaScript build tools  
🔄 **Real-time applications** - Built-in SignalR for live updates

## 🎯 Key Features

🔹 **Zero JavaScript Required** - Pure C# for interactive UIs  
🔹 **Component-Based Architecture** - Reusable Razor components  
🔹 **Real-Time Updates** - SignalR WebSockets included  
🔹 **Type Safety** - Full IntelliSense and compile-time checking  
🔹 **90-Second Deployment** - From click to live app  
🔹 **Auto-Scaling Ready** - Designed for Railway's infrastructure

## 🏗️ Tech Stack

**Framework:** Blazor Server (.NET 9)  
**Runtime:** ASP.NET Core 9.0  
**Real-Time:** SignalR WebSockets  
**Container:** Multi-stage Docker  
**Platform:** Linux (Railway)

## 📦 Extend It Easily

**Add Database** 🗄️
```bash
# Deploy PostgreSQL from Railway marketplace
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

**Add Authentication** 🔐
```bash
# ASP.NET Identity ready to go
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
```

**Add API Endpoints** 🌐
```csharp
// Mix Blazor UI with Web APIs
app.MapGet("/api/data", () => Results.Ok(myData));
```

## ⚡ Why Blazor Server?

**✅ Write C# everywhere** - No context switching between languages  
**✅ Share code** - Models and logic work on client and server  
**✅ Rich ecosystem** - 100,000+ NuGet packages at your fingertips  
**✅ Excellent tooling** - Visual Studio, Rider, VS Code support  
**✅ Real-time by default** - SignalR built-in for live updates

## 🎓 What You Can Build

📈 **Real-Time Dashboards** - Live charts, metrics, and analytics  
🛠️ **Admin Panels** - Complex data grids with filtering and sorting  
👥 **Customer Portals** - Self-service apps with authentication  
💬 **Collaboration Tools** - Real-time chat and co-editing  
📊 **Business Applications** - CRM, ERP, internal tools

## 🚂 Why Railway?

**🚀 Deploy in seconds** - Git push triggers automatic deployment  
**📊 Built-in monitoring** - Health checks and logs out of the box  
**🔗 Easy add-ons** - Add databases with one click  
**💰 Pay-as-you-go** - Only pay for what you use  
**🌍 Global infrastructure** - Fast performance worldwide

## 📚 Resources

📖 [Blazor Docs](https://learn.microsoft.com/en-us/aspnet/core/blazor/) - Official Microsoft documentation  
🎯 [.NET 9 Features](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-9) - What's new in .NET 9  
🚂 [Railway Docs](https://docs.railway.app/) - Platform guides

## 🏆 Template Stats

⚡ **Build Time:** ~60 seconds  
📦 **Image Size:** Optimized with multi-stage builds  
✅ **Success Rate:** Production-tested  
🔄 **Auto-Updates:** Get improvements automatically

---

## 🎯 Get Started

**1. Click Deploy** → Railway clones the template  
**2. Auto-Build** → Docker builds your app  
**3. Go Live** → App deploys with public URL  

**Total time: 90 seconds** ⏱️

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| blazor-server-starter | [Trailblazors/blazor-server-starter](https://github.com/Trailblazors/blazor-server-starter) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ASPNETCORE_ENVIRONMENT` | Production | Determines the ASP.NET environment |

## Configuration

- **Healthcheck:** `/health`

**Category:** Starters · **Languages:** CSS, HTML, C#, Dockerfile

[View on Railway →](https://railway.com/deploy/blazor-server-starter)
