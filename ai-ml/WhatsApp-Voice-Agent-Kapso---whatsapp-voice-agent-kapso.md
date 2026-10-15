# Deploy WhatsApp Voice Agent · Kapso on Railway

AI voice agent that answers WhatsApp calls through Kapso, with Grok Voice

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp-voice-agent-kapso)

## About

![Kapso WhatsApp Voice Agent](https://raw.githubusercontent.com/gokapso/whatsapp-voice-agent-starter/main/assets/kapso-voice-agent-starter.png)

Answer WhatsApp calls with your own AI front desk. Riley, the sample agent, says it is an AI,
answers questions about your business, and books, moves or cancels appointments after a clear
yes. Your number and messages stay in [Kapso](https://kapso.ai). This server carries the call
audio and runs the tools; [Grok Voice](https://docs.x.ai/developers/model-capabilities/audio/speech-to-speech)
listens, thinks and speaks.

You fill in three values: your xAI API key, your Kapso project API key and the Meta phone number
ID of your Kapso number. Railway generates the server's own secrets.

On its first start, the server registers its Railway URL as your number's webhook in Kapso, if the
number has none, and never replaces an existing one. Then call the number from WhatsApp, and Riley
answers. Open `https:///operator/` and sign in with the `OPERATOR_TOKEN` variable to
see recent calls, the setup and an event log.

Before you deploy, in the Kapso dashboard:

- Enable Calling on a dedicated number.
- Set the number's **Incoming call answering** to **Agent or integration** (no Inbox fallback),
  and do not assign a dashboard voice agent to it.

Test this server with a WhatsApp call. Browser test calls from the console need the server on
your computer or on a server with a public IP.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| whatsapp-voice-agent-starter | [gokapso/whatsapp-voice-agent-starter](https://github.com/gokapso/whatsapp-voice-agent-starter) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CALENDAR` | local | local is a sample calendar for a first test. For real bookings, set CAL_API_KEY and CALENDAR=calcom. |
| `XAI_API_KEY` | (secret) | xAI API key for Grok Voice (console.x.ai → API keys). Calls are billed per minute by xAI. |
| `ALLOWED_HOSTS` | - | Host names the server accepts: its Railway domain and Railway's health check. Leave as is. |
| `KAPSO_API_KEY` | (secret) | Kapso project API key. The server uses it to answer calls and register its webhook. |
| `OPERATOR_TOKEN` | (secret) | Console access key (generated). Sign in at https://your-domain/operator/ with it. |
| `VOICE_PROVIDER` | grok | grok runs Grok Voice. elevenlabs needs ELEVENLABS_API_KEY and an agent created with the repo's CLI. |
| `ICE_SERVERS_JSON` | [{"urls":"stun:stun.cloudflare.com:3478"}] | STUN server for call audio. Leave as is. |
| `CALLER_KEY_SECRET` | (secret) | Generated key that hashes caller identities for bookings. Keep it unchanged across redeploys. |
| `KAPSO_REGISTER_WEBHOOK` | 1 | 1 = at startup, register this server as the number's webhook in Kapso if the number has none. |
| `WHATSAPP_WEBHOOK_SECRET` | (secret) | Generated secret that Kapso uses to sign webhooks sent to this server. |
| `WHATSAPP_PHONE_NUMBER_ID` | - | Meta phone number ID of your Kapso number with Calling enabled (the numeric ID, not the phone number). |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** Python, JavaScript, CSS, HTML, TypeScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/whatsapp-voice-agent-kapso)
