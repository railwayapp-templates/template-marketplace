# Deploy Zoom Webhook Sample on Railway

Node / Express server to receive Zoom Platform and Zoom Video SDK Webhooks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ERSEbO)

## About

This is a Node.js / Express server that receives [Zoom Platform Webhooks](https://developers.zoom.us/docs/api/rest/webhook-reference/#enable-webhooks) and [Zoom Video SDK Webhooks](https://developers.zoom.us/docs/api/rest/webhook-reference/#enable-webhooks).

## Usage

1. Trigger the respective Webhook.

   For example, if you chose the [Start Meeting Webhook](https://developers.zoom.us/docs/api/rest/reference/zoom-api/events/#operation/meeting.started), start a Zoom Meeting. You will see the Webhook headers and payload logged in terminal.

   ```json
   {
     "host": "abc123.ngrok.io",
     "user-agent": "Zoom Marketplace/1.0a",
     "content-length": "335",
     "authorization": "{LEGACY_WEBHOOK_VERIFICATION_TOKEN}",
     "clientid": "{CLIENT_ID}",
     "content-type": "application/json; charset=utf-8",
     "x-forwarded-for": "{X_FORWARDED_FOR}",
     "x-forwarded-proto": "https",
     "x-zm-request-timestamp": "X_ZM_REQUEST_TIMESTAMP",
     "x-zm-signature": "v0={HASHED_WEBHOOK_SECRET_TOKEN}",
     "x-zm-trackingid": "{X_ZM_TRACKINGID}",
     "accept-encoding": "gzip"
   }
   ```

   ```json
   {
     "event": "meeting.started",
     "payload": {
       "account_id": "{ACCOUNT_ID}",
       "object": {
         "duration": 0,
         "start_time": "2021-11-02T20:43:19Z",
         "timezone": "America/Denver",
         "topic": "{TOPIC}",
         "id": "{MEETING_ID}",
         "type": 4,
         "uuid": "{MEETING_UUID}",
         "host_id": "{HOST_ID}"
       }
     },
     "event_ts": 1635885799302
   }
   ```

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://explore.zoom.us/docs/en-us/developer-support-plans.html) plans.


Use of this sample app is subject to our [Terms of Use](https://explore.zoom.us/en/legal/zoom-api-license-and-tou/).

**NOTE:** This Sample App has been updated to use the [Webhook Secret Token](https://developers.zoom.us/docs/api/rest/webhook-reference/#verify-webhook-events) instead of the [Webhook Verification Token](https://developers.zoom.us/docs/api/rest/webhook-reference/#verify-webhook-events) to validate requests are sent from Zoom.

From: [https://github.com/zoom/webhook-sample/](https://github.com/zoom/webhook-sample/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| webhook-sample | [zoom/webhook-sample](https://github.com/zoom/webhook-sample) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ZOOM_WEBHOOK_SECRET_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/ERSEbO)
