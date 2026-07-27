# Deploy Rocket | Rust JSON API in an 18 MB Container on Railway

Rocket 0.5 on current Rust, committed lockfile, 18 MB runtime image

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rocket-or-rust-json-api-in-an-18-mb-cont)

## About

A Rocket 0.5 JSON API on current Rust, in an 18 MB container.

The Rocket template on Railway builds from a repository last touched in May 2023, and none of its deployments come up. The reason is one line in its Cargo.toml:

```
rocket = "0.5.0-rc.1"
```

That is a release candidate published in 2022. Rocket 0.5.0 shipped as a final release in November 2023 and is now at 0.5.1, but the pin holds the project on the prerelease, whose dependency tree no longer resolves against current crates.

This template pins 0.5.1 and commits Cargo.lock, so a build a year from now produces the same binary as today rather than depending on what crates.io looked like that morning.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| API | [ak40u/rocket-railway-starter](https://github.com/ak40u/rocket-railway-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Rust, Dockerfile

[View on Railway →](https://railway.com/deploy/rocket-or-rust-json-api-in-an-18-mb-cont)
