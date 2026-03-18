# Deploy Zoom CobrowseSDK Auth Sample on Railway

Generate a Zoom Cobrowse SDK JWT to join Zoom Cobrowse SDK sessions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/OjTGvs)

## About

# Zoom Cobrowse SDK Auth Endpoint sample

Use of this sample app is subject to our [Terms of Use](https://explore.zoom.us/en/video-sdk-terms/).


This is a Node.js / Express server that generates a [Cobrowse SDK JWT](https://developers.zoom.us/docs/cobrowse-sdk/auth) via an HTTP request for authorized use of the [Zoom Cobrowse SDK](https://developers.zoom.us/docs/cobrowse-sdk/).

## Usage

Make a POST request to `http://localhost:4000` (or your deployed url) with the following request body:

| Property                 | Type     | Required? | Validation Rule(s)                                                    |
| ------------------------ | -------- | --------- | --------------------------------------------------------------------- |
| `role`                   | `number` | **Yes**   | - Required <br> - Must equal to `1` or `2`                            |
| `expirationSeconds`      | `number` | No        | - Must be between `1800` (30 minutes) and `172800` (48 hours) seconds |
| `userId`                 | `string` | No        | - Please ensure that the user ID is not repeated within a session     |
| `userName`               | `string` | No        |                                                                       |

&gt; Note: `userId` is required to create a JWT, if not provided a random string will be used.

### Example Request

POST `http://localhost:4000`

Request Body:

```json
{
  "role": 1,
  "userId": "user123",
  "userName": "ekaansh"
}
```

If successful, the response body will be a JSON representation of your token:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoiM2YzV0pkZ0FTZC0xN1VZTl9ZSmFQQSIsInJvbGVfdHlwZSI6MCwiaWF0IjoxNzI5MTU5MDkyLCJleHAiOjE3MjkxNjYyOTIsInVzZXJfaWQiOiJ1c2VyMTIzIn0.cVMgCnb5fJzhGr2nTowlYWojAdYiH2INMUhh5v2WTos"
}
```

In the Cobrowse SDK, for the **agent** you can pass in the `token` to the `ACCESS_TOKEN` in your iframe. 


```html

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cobrowsesdk-auth-endpoint-sample | [zoom/cobrowsesdk-auth-endpoint-sample](https://github.com/zoom/cobrowsesdk-auth-endpoint-sample) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ZOOM_SDK_KEY` | - | Your Zoom SDK Key, found on your Zoom SDK app's credentials page |
| `ZOOM_SDK_SECRET` | (secret) | Your Zoom SDK Secret, found on your Zoom SDK app's credentials page |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Shell

[View on Railway →](https://railway.com/deploy/OjTGvs)
