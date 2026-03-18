# Deploy Gitea on Railway

Self Hosted GitHub Alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ZHGJu6)

## About

<p align="center">
  <a href="https://gitea.io/">
    <img width="220" src="https://raw.githubusercontent.com/go-gitea/gitea/main/public/assets/img/gitea.svg" alt="Gitea">
  </a>
</p>
<h1 align="center">Gitea - Git with a cup of tea</h1>

## Notes

Due to Railway only allowing 1 port to be forwarded to your project, you must use HTTP for checkout and push to the repositories setup in your Gitea instance.

## Purpose

The goal of this project is to make the easiest, fastest, and most
painless way of setting up a self-hosted Git service.

As Gitea is written in Go, it works across **all** the platforms and
architectures that are supported by Go, including Linux, macOS, and
Windows on x86, amd64, ARM and PowerPC architectures.
This project has been
[forked](https://blog.gitea.com/welcome-to-gitea/) from
[Gogs](https://gogs.io) since November of 2016, but a lot has changed.

## Setup Instructions

To deploy the Gitea project on Railway, just click through, all environment variables are already configured for you. Once deployed, visit your domain, and you can start setting up your instance.

## FAQ

**How do you pronounce Gitea?**

Gitea is pronounced [/ɡɪ’ti:/](https://youtu.be/EM71-2uDAoY) as in "gi-tea" with a hard g.

## License

This project is licensed under the MIT License.
See the [LICENSE](https://github.com/go-gitea/gitea/blob/main/LICENSE) file
for the full license text.

## Screenshots

Looking for an overview of the interface? Check it out!

|![Dashboard](https://dl.gitea.com/screenshots/home_timeline.png)|![User Profile](https://dl.gitea.com/screenshots/user_profile.png)|![Global Issues](https://dl.gitea.com/screenshots/global_issues.png)|
|:---:|:---:|:---:|
|![Branches](https://dl.gitea.com/screenshots/branches.png)|![Web Editor](https://dl.gitea.com/screenshots/web_editor.png)|![Activity](https://dl.gitea.com/screenshots/activity.png)|
|![New Migration](https://dl.gitea.com/screenshots/migration.png)|![Migrating](https://dl.gitea.com/screenshots/migration.gif)|![Pull Request View](https://image.ibb.co/e02dSb/6.png)|
|![Pull Request Dark](https://dl.gitea.com/screenshots/pull_requests_dark.png)|![Diff Review Dark](https://dl.gitea.com/screenshots/review_dark.png)|![Diff Dark](https://dl.gitea.com/screenshots/diff_dark.png)|

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gitea | `gitea/gitea` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Default Port for Gitea to listen on (don't change) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/ZHGJu6)
