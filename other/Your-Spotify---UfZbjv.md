# Deploy Your Spotify on Railway

A self-hosted Spotify tracking dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/UfZbjv)

## About

# Your Spotify

[Your Spotify](https://github.com/Yooooomi/your_spotify) tracks what you listen to on [Spotify](https://spotify.com) and lets you explore those statistics through a pretty-looking web interface.

## Getting Started

You'll need to create an application in [Spotify's developer portal](https://developer.spotify.com) before deploying this template. To do so:

1. Open the [Spotify developer dashboard](https://developer.spotify.com/dashboard).
2. Click **Create app** and fill in whatever you like for the **App name**, **App description**, and **Website** fields.
3. In the **Redirect URI** field, enter `https://example.com/oauth/spotify/callback`. You'll change `example.com` to your backend's actual domain later, but enter `example.com` for now.
4. Click **Settings**. Note your **Client ID**.
5. Click **View client secret**. Note your **Client secret**.

When you deploy this template, provide your client ID and secret when asked. Once the backend has been deployed, edit your Spotify app's redirect URI to replace `example.com` with the backend's public domain (e.g., `your-spotify.up.railway.app`).

## Importing Data

By default, Your Spotify can only access your streaming history from as far back as 24 hours before you first authorized Your Spotify to access your Spotify account. If you want Your Spotify to have access to earlier streaming history (and you probably do), you'll need to manually request that data from Spotify and provide it to Your Spotify. You can request said data [here](https://www.spotify.com/us/account/privacy/) (scroll down to **Download your data**).

There are two kinds of data requests you can make.

### Account data

Your account data contains the last year of your streaming history. It will take Spotify up to five days to prepare this data once you request it.

When you receive your data package, open Your Spotify, go to **Settings** > **Account**, scroll down to **Import data**, and select **Account data** from the dropdown menu. Click **SELECT YOUR STREAMINGHISTORYX.JSON FILES** and upload all files in your data package whose names begin with `StreamingHistory`.

### Extended streaming history

Your extended streaming history contains the streaming history for the lifetime of your account. It will take Spotify up to 30 days to prepare this data once you request it.

When you receive your data package, open Your Spotify, go to **Settings** > **Account**, scroll down to **Import data**, and select **Extended streaming history** from the dropdown menu. Click **SELECT YOUR STREAMING_HISTORY_AUDIO.JSON FILES** and upload all files in your data package whose names begin with `Streaming_History_Audio`.

## Custom Domains

If you add a custom domain to the **frontend**, you must redeploy the server for it to take effect.

If you add a custom domain to the **backend**, you must redeploy **both** the frontend and the backend for it to take effect. You must also add a redirect URI for your custom domain to your Spotify application.

All of this also applies if you change the name of the default `up.railway.app` domain.

## Adding Users

If you want people aside from yourself to be able to use your Your Spotify instance, you'll need to authorize them by hand in the **User Management** tab of your app's page on the Spotify developer dashboard. You can only add up to 25 users. 

**You don't need to authorize yourself** unless you're using Your Spotify with a different Spotify account then the one that owns your Spotify application.

Users who aren't authorized can still log into your Your Spotify instance, but Your Spotify won't be able to request data for them.

If you don't like having to authorize users by hand or can't live with the 25-user cap, you can try your hand at [requesting a quota extension from Spotify](https://developer.spotify.com/documentation/web-api/concepts/quota-modes#:~:text=status%20code%20error-,Extended%20quota%20mode,-Extended%20quota%20mode). If your request is granted, both of these limitations will be lifted.

## Time Zones

This template configures Your Spotify to display statistics in UTC by default. While you can change this default via the backend's `TIMEZONE` environment variable, it's better if you just leave that alone and change your account's time zone in the Your Spotify UI by going to **Settings** > **Statistics** > **Timezone**. 

## Acknowledgements

Your Spotify is developed by [Timothee Boussus](https://github.com/yooooomi). I maintain this template, but have no affiliation with the upstream project.

"Spotify" and the Spotify logo are registered trademarks of Spotify AB. This project is not affiliated with or endorsed by Spotify AB.

## More Information

For more information, visit the [upstream repository](https://github.com/yooooomi/your_spotify).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo` | Database |
| Backend | `yooooomi/your_spotify_server` | Web service |
| Frontend | `yooooomi/your_spotify_client` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Railway TCP Proxy Domain. |
| `MONGOPORT` | MongoDB | - | Mongodb TCP Proxy port. |
| `MONGOUSER` | MongoDB | - | Mongodb user, used for the Data panel. |
| `MONGO_URL` | MongoDB | - | URL to connect to MongoDB, used for Data panel. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password, used for Data panel. |
| `MONGO_PRIVATE_URL` | MongoDB | - | URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `PORT` | Backend | 8080 | The port on which the Your Spotify server will listen. Must be 8080. |
| `TIMEZONE` | Backend | Etc/UTC | The default time zone in which statistics will be displayed. You should leave this at its default setting of Etc/UTC. After deployment, you can set a time zone for your own account in the Your Spotify UI by going to Settings > Statistics > Timezone. |
| `API_ENDPOINT` | Backend | - | The URL at which the Your Spotify server will be found. By default, this is the public domain of the server's Railway service. |
| `MONGO_ENDPOINT` | Backend | - | The URL at which Your Spotify's MongoDB database will be found. By default, this is the private URL of the database's Railway service. |
| `SPOTIFY_PUBLIC` | Backend | - | Your Spotify app's client ID. |
| `SPOTIFY_SECRET` | Backend | (secret) | Your Spotify app's client secret. |
| `CLIENT_ENDPOINT` | Backend | - | The URL at which the Your Spotify client will be found. By default, this is the public domain of the client's Railway service. |
| `PORT` | Frontend | 3000 | The port on which the Your Spotify client will listen. Must be 3000. |
| `API_ENDPOINT` | Frontend | - | The URL at which the Your Spotify server will be found. By default, this is the public domain of the server's Railway service. |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/UfZbjv)
