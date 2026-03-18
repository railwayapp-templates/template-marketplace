# Deploy Monirail - Log Monitoring on Railway

Set up alerting for logs and metrics using a Railway function

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/monirail-log-monitoring)

## About

Monitor Railway services and notify your team when issues are detected. This is hosted in a lightweight Railway function and is fully customizable by editing the source code.

[See Full Documentation](https://github.com/jaredLunde/monirail/blob/main/README.md)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Monitoring | `ghcr.io/railwayapp/function-bun:1.3.0` | Database |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `SOURCE_SERVICE_ID` | Monitor a specific service by setting the ID of the service here |
| `DISCORD_WEBHOOK_URL` | A Discord webhook URL to push alert notifications to |

## Configuration

- **Start command:** `./run.sh aW1wb3J0IHsgbW9uaXRvciwgc291cmNlLCBub3RpZnksIHdhdGNoIH0gZnJvbSAibW9uaXJhaWxAMS4wLjEyIjsKCmNvbnN0IGRpc2NvcmROb3RpZmllciA9IG5vdGlmeSh7CiAgLy8gT3RoZXIgYXZhaWxhYmxlIG9wdGlvbnMgaW5jbHVkZSAic2xhY2siLCAicGFnZXJkdXR5IiwgIndlYmhvb2siLCBhbmQgImN1c3RvbSIKICB0eXBlOiAiZGlzY29yZCIsCiAgd2ViaG9va1VybDogQnVuLmVudi5ESVNDT1JEX1dFQkhPT0tfVVJMLAp9KTsKCi8vIENoZWNrIG1vbml0b3JzIGV2ZXJ5IDUgbWludXRlcwp3YXRjaCg1LCBbCiAgLy8gWW91IG1heSBhZGQgYXMgbWFueSBtb25pdG9ycyBpbiBoZXJlIGFzIHlvdSB3aXNoCiAgbW9uaXRvcih7CiAgICB0eXBlOiAibWF0Y2giLAogICAgbmFtZTogIkVycm9yIExvZ3MgQWxlcnQiLAogICAgZGVzY3JpcHRpb246ICJBbGVydHMgd2hlbiBlcnJvcnMgYXBwZWFyIGluIGxvZ3MiLAogICAgc291cmNlOiBzb3VyY2UoewogICAgICB0eXBlOiAiZW52aXJvbm1lbnRfbG9ncyIsCiAgICAgIGVudmlyb25tZW50SWQ6IEJ1bi5lbnYuUkFJTFdBWV9FTlZJUk9OTUVOVF9JRCEsCiAgICAgIHNlcnZpY2VJZDogQnVuLmVudi5TT1VSQ0VfU0VSVklDRV9JRCwKICAgIH0pLAogICAgZmlsdGVyOiBgQGxldmVsOmVycm9yYCwKICAgIHRpbWVXaW5kb3c6IDYwLCAvLyBJbiBtaW51dGVzCiAgICBub3RpZnk6IFtkaXNjb3JkTm90aWZpZXJdLAogIH0pLApdKTsK`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/monirail-log-monitoring)
