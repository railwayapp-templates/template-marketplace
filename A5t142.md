# Deploy Angular 19 SSR on Railway

The web development framework for building the future

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/A5t142)

## About

# SSR Angular + TypeScript

This project was originally generated with [`ng new my-app`](https://angular.dev/installation#create-a-new-project) and selecting `Yes` when asked to use SSR.

## ✨ Features

- SSR Angular 19 + TypeScript

## 💁‍♀️ Local Development

- Install required dependencies with `npm install`
- Run `npm run dev` for a local development server
- Navigate to `http://127.0.0.1:4200/`. The application will automatically reload if you change any of the source files.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## ❓ What was changed from the default Angular 19 Server Side Rendered example?

- The `start` script was renamed to `dev` since it starts a local development server.
- The `serve:ssr:my-app` script was renamed to `start` since it starts the production server.

Railway will automatically use the `build` and `start` scripts from the package.json.

Angular's server side rendered server will listen on the host `0.0.0.0` and the `PORT` environment variable that Railway expects the app to.

Thats all the changes needed to deploy a server side rendered Angular 19 app on Railway!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Angular | [brody192/angular-starter-ssr](https://github.com/brody192/angular-starter-ssr) | Web service |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** HTML, TypeScript, CSS

[View on Railway →](https://railway.com/template/A5t142)
