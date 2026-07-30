# Deploy AI Short Video Generator — Gemini + Veo on Railway

Generate TikTok, Reels & Shorts videos with AI — Gemini + Veo

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-short-video-generator-veo)

## About

I'm Not Moving Today is an open-source AI video generator for short-form content — upload an image, describe your idea, and it uses Google Gemini to craft a viral-ready script and Google Veo 3.1 to generate the actual video for Reels, TikTok, and YouTube Shorts. It handles platform-specific hooks, consistency modes, and motion dynamics automatically. This template deploys the web app on Railway, where it orchestrates the AI calls while Google's models do the heavy video generation.

---

This template is well-suited to Railway precisely because of how the work is split.

**Railway runs the app; Google runs the models.** The container is a Next.js application that builds scripts with Gemini and requests video generation from Google Veo 3.1 over the API. The compute-heavy part — actually rendering the video — happens on Google's infrastructure, not on Railway. That's why this deploys cleanly on standard CPU hosting: Railway serves the UI and coordinates the API calls, and no GPU is required on your end.

**The API key model decides who pays.** `GEMINI_API_KEY` is optional and it controls the cost model. If you set your own key, users of your deployment generate videos for free — and every generation bills *your* Google account. If you leave it unset, each user supplies their own key and pays for their own generation. For a public deployment, understand that setting your key means you're covering everyone's usage.

**Veo generation costs real money — plan for it.** Google Veo 3.1 is a premium model billed per video, and short-form AI video is not cheap to generate. Whether you or your users pay, budget accordingly. `VEO_USE_STANDARD=false` (fast mode) is the cheaper default; `true` raises quality and cost. A `mock` provider mode is available for testing the flow without spending on real generation.

**No database or volume needed for basic use.** The app orchestrates and returns videos; there's no heavy local state to persist for the core flow, which keeps the deployment simple and cheap on the Railway side.

Typical cost: **~$5/month** on Railway for the app itself, **plus Google Veo/Gemini API usage**, which is the main expense and scales with how many videos are generated.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Give Up Video Generator | `supra126/igiveup` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CF_ACCESS_AUD` | - | Cloudflare Access application AUD tag (optional) |
| `GEMINI_API_KEY` | (secret) | Gemini API Key (optional - if set, users get free access) |
| `GEMINI_TEXT_MODEL` | gemini-2.5-flash | - |
| `GEMINI_IMAGE_MODEL` | gemini-3-pro-image-preview | - |
| `RATE_LIMIT_ENABLED` | true | - |
| `CF_ACCESS_TEAM_NAME` | - | Cloudflare Zero Trust team name (optional) |
| `NEXT_PUBLIC_SITE_URL` | - | Site URL for SEO (default: https://igiveup.simoko.com) |
| `RATE_LIMIT_WINDOW_MS` | 60000 | - |
| `GEMINI_THINKING_BUDGET` | 2048 | - |
| `RATE_LIMIT_MAX_REQUESTS` | 2 | - |
| `GEMINI_MAX_OUTPUT_TOKENS` | (secret) | - |
| `SERVER_ACTIONS_BODY_SIZE_LIMIT` | 20mb | - |

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ai-short-video-generator-veo)
