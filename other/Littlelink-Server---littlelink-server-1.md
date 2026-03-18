# Deploy Littlelink Server on Railway

A lightweight, open source, stateless alternative to linktree and many.link

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/littlelink-server-1)

## About

LittleLink-Server is a lightweight, self-hostable alternative to services like Linktree. It lets you create a single page with all your important links. Built with NodeJS and React, it's designed to be easily deployed as a Docker container and customized entirely through simple environment variables.

Hosting LittleLink Server is straightforward due to its containerized nature. It's packaged as a Docker image, allowing for deployment on any platform that supports containers. Configuration is managed entirely through environment variables—no code editing required. You simply set variables for your name, avatar, social links, analytics IDs, and theme choice. This makes it ideal for modern hosting platforms like Railway, where you can set these variables in a simple UI and have the service build and deploy the container automatically, abstracting away server management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| littlelink-server | `timothystewart6/littlelink-server` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BIO` | Your Profession | Your Hobby | Your Passion | A short biography displayed on the page. |
| `LANG` | en | The primary language of your site (e.g., en, es, fr). |
| `NAME` | Your Name | Your display name on the page. |
| `PORT` | 3000 | Exposed service port |
| `THEME` | Dark | The color theme for the site (e.g., Dark, Light). |
| `FOOTER` | Your Name © 2025 | The text displayed in the site footer. |
| `GITHUB` | https://github.com/your-username | - |
| `OG_URL` | https://your-domain.com | The canonical URL for your site. |
| `TWITCH` | https://twitch.tv/your-username | - |
| `DISCORD` | https://discord.gg/your-invite-code | - |
| `TWITTER` | https://twitter.com/your-username | - |
| `YOUTUBE` | https://youtube.com/c/your-channel | - |
| `OG_IMAGE` | https://your-domain.com/og-image.jpg | The image shown when your site is shared (1200x630 recommended). |
| `OG_TITLE` | Your Site Title | The title shown when your page is shared. |
| `INSTAGRAM` | https://instagram.com/your-username | - |
| `LINKED_IN` | https://linkedin.com/in/your-username | - |
| `AVATAR_ALT` | Your Name Profile Pic | Alt text for your avatar image for accessibility. |
| `AVATAR_URL` | https://your-domain.com/avatar.jpg | URL for your main profile picture. |
| `META_TITLE` | Your Name | Your Title | The title of the page in the browser tab. |
| `FAVICON_URL` | https://your-domain.com/favicon.ico | URL for the site's favicon. |
| `META_AUTHOR` | Your Name | The author of the site. |
| `BUTTON_ORDER` | GITHUB,TWITTER,YOUTUBE,INSTAGRAM,CUSTOM_BUTTON_1,CUSTOM_BUTTON_2 | Use the variable names below (e.g., GITHUB, TWITTER, CUSTOM_BUTTON_1) to set the display order. |
| `OG_SITE_NAME` | Your Site Name | The name of your site for social media embeds. |
| `AVATAR_2X_URL` | https://your-domain.com/avatar_2x.jpg | URL for a higher resolution profile picture. |
| `META_KEYWORDS` | keyword1, keyword2, keyword3 | Comma-separated keywords for SEO. |
| `GA_TRACKING_ID` | G-XXXXXXXXXX | Your Google Analytics tracking ID. |
| `OG_DESCRIPTION` | A brief description of your site for social media. | - |
| `OG_IMAGE_WIDTH` | 1200 | The width of the Open Graph image. |
| `OG_IMAGE_HEIGHT` | 630 | The height of the Open Graph image. |
| `META_DESCRIPTION` | A brief description of you and your site for search engines. | - |
| `CUSTOM_BUTTON_URL` | https://your-blog-url.com,https://your-store-url.com | - |
| `META_INDEX_STATUS` | all | Instructs search engine crawlers (e.g., all, noindex). |
| `CUSTOM_BUTTON_ICON` | fas fa-rss,fas fa-shopping-cart | Font Awesome icon class. |
| `CUSTOM_BUTTON_NAME` | CUSTOM_BUTTON_1,CUSTOM_BUTTON_2 | - |
| `CUSTOM_BUTTON_TEXT` | My Blog,My Store | - |
| `CUSTOM_BUTTON_COLOR` | #007bff,#28a745 | Hex color for the button background. |
| `CUSTOM_BUTTON_TEXT_COLOR` | #ffffff,#ffffff | Hex color for the button text. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/littlelink-server-1)
