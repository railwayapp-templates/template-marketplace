# Deploy .NET6 API on Railway

Starter ASP.NET Core API baked with env variables.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fKgMtM)

## About

<div align="center">
  <h3 align="center">ASP.NET Core API (.NET6)</h3>
</div>

<hr>

## Description

Starter ASP.NET Core API baked with env variables.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/fKgMtM?referralCode=8JDnNA)

### Tech Stack

- ASP.NET Core Web API
- .NET 6

## Getting Started

### Installation

1. Clone the repo
   ```
   git clone https://github.com/ayush-lal/dotnet6-api
   ```
2. Navigate to project directory and clone .env.example
   ```
   cd src/ExampleAPI
   ```
   - Windows:
     ```
     copy .env.example .env
     ```
   - Linux/MacOS:
     ```
     cp .env.example .env
     ```
3. Run the API
   ```
   dotnet run
   ```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated!**

If you have a suggestion that would make this project better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star!

1. Clone the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dotnet6-api | [ayush-lal/dotnet6-api](https://github.com/ayush-lal/dotnet6-api) (root: /src/ExampleAPI/) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `Example` | Prod environment variable | example variable for demo purposes |

## Configuration

- **TCP Proxies:** 3000

**Category:** Starters · **Languages:** C#

[View on Railway →](https://railway.com/deploy/fKgMtM)
