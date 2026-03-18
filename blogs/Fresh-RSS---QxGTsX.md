# Deploy Fresh RSS on Railway

FreshRSS is a self-hosted RSS feed aggregator.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/QxGTsX)

## About

![](https://github.com/FreshRSS/FreshRSS/raw/edge/docs/img/FreshRSS-logo.png)

FreshRSS is a self-hosted RSS feed aggregator.

It is lightweight, easy to work with, powerful, and customizable.

It is a multi-user application with an anonymous reading mode. It supports custom tags.
There is an API for (mobile) clients, and a [Command-Line Interface](https://github.com/FreshRSS/FreshRSS/blob/edge/cli/README.md).

Thanks to the [WebSub](https://freshrss.github.io/FreshRSS/en/users/WebSub.html) standard,
FreshRSS is able to receive instant push notifications from compatible sources, such as [Friendica](https://friendi.ca), [WordPress](https://wordpress.org/plugins/pubsubhubbub/), Blogger, Medium, etc.

FreshRSS natively supports basic [Web scraping](https://freshrss.github.io/FreshRSS/en/users/11_website_scraping.html),
based on [XPath](https://www.w3.org/TR/xpath-10/), for Web sites not providing any RSS / Atom feed.
Also supports JSON documents.

FreshRSS offers the ability to [reshare selections of articles by HTML, RSS, and OPML](https://freshrss.github.io/FreshRSS/en/users/user_queries.html).

Different [login methods](https://freshrss.github.io/FreshRSS/en/admins/09_AccessControl.html) are supported: Web form (including an anonymous option), HTTP Authentication (compatible with proxy delegation), OpenID Connect.

Finally, FreshRSS supports [extensions](https://github.com/FreshRSS/FreshRSS#extensions) for further tuning.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Fresh RSS | `freshrss/freshrss` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/FreshRSS/data`

**Category:** Blogs

[View on Railway →](https://railway.com/template/QxGTsX)
