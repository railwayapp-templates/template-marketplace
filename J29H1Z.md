# Deploy SerpBear on Railway

Search Engine Position Rank Tracking App

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/J29H1Z)

## About

<p align="center">
    <a href="https://docs.serpbear.com/">
        <img alt="SerpBear logo" src="https://raw.githubusercontent.com/towfiqi/serpbear/51ebe3e3267b0b00af28add6dc978d2ba920fdb7/public/icon.png" style="width: 200px;">
    </a>
</p>

<p style="color: white; font-size: 40px;" align="center">SerpBear</p>

**SerpBear** is an Open Source Search Engine Position Tracking App. It allows you to track your website's keyword positions in Google and get notified of their positions.

### Features

- **Unlimited Keywords:** Add unlimited domains and unlimited keywords to track their SERP.

- **Email Notification:** Get notified of your keyword position changes daily/weekly/monthly through email.

- **SERP API:** SerpBear comes with built-in API that you can use for your marketing &amp; data reporting tools.

- **Google Search Console Integration:** Get the actual visit count, impressions &amp; more for Each keyword. Discover new keywords, and find the most performing keywords, countries, pages.

- **Export CSV:** Export your domain keywords and their data in csv files whenever you want.

- **Mobile App:** Add the PWA app to your mobile for a better mobile experience.

- **Zero Cost to RUN:** Run the App on mogenius.com or Fly.io for free.

### How it Works

The App uses third party website scrapers like ScrapingAnt, ScrapingRobot or Your given Proxy ips to scrape google search results to see if your domain appears in the search result for the given keyword.

### Getting Started

- **Step 1:** Deploy the App.

- **Step 2:** Access your App and Login.

- **Step 3:** Add your First domain.

- **Step 4:** Get an free API key from either ScrapingAnt or ScrapingRobot. Skip if you want to use Proxy ips.

- **Step 5:** Setup the Scraping API/Proxy from the App's Settings interface.

- **Step 6:** Add your keywords and start tracking.

- **Step 7:** Optional. From the Settings panel, setup SMTP details to get notified of your keywords positions through email. You can use ElasticEmail and Sendpulse SMTP services that are free.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SerpBear | `towfiqi/serpbear` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `USER` | - | The username you want to use to login to the app |
| `APIKEY` | - | API key that will be used to access the app's API |
| `SECRET` | (secret) | A secret key that will be used for encrypting 3rd party API keys & passwords |
| `PASSWORD` | (secret) | The password you want to use to log in to the app |
| `SCREENSHOT_API` | - | **(Optional)** The website screenshot thumbnails are fetched with thum.io API using an API key created for SerpBear which has a 1000/month limit. When this limit is crossed, it fails to fetch screenshot thumbnails. You can create a free account on thum.io and insert your own thum.io API auth value to avoid facing the API limit issue. After creating an account, create an API key, copy the auth variable, and use that variable as the value of this property |
| `SESSION_DURATION` | 24 | The duration(in hours) of the user's logged-in session |
| `NEXT_PUBLIC_APP_URL` | - | The URL where your app is hosted and can be accessed |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/template/J29H1Z)
