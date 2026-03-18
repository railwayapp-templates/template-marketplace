# Deploy Suno-API on Railway

REST API for Suno AI for interacting with Suno AI's music generator.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/IdlBP8)

## About

<h1 align="center">✨ Suno AI API 🎵</h1>

<h4 align="center">✨ Python API Library for Suno AI — Create Music with Generative AI ! 🚀</h4>
<div align="center">
  Available as Both Python Library and REST API
  <br>

**📚 SunoAI API Library is an unofficial Python client for interacting with [Suno AI](https://suno.ai/)'s music generator**. This library facilitates generating music using Suno's Chirp v3 model and includes main functions of Suno AI with a built-in music downloader. It can be deployed as a **[REST API](#-deployment---rest-api)** using FastAPI, Local, Docker, on a PaaS provider like Heroku.

## ✨ Features
- **Python Client 🐍**: Easily interact with Suno AI.
- **Song Generation 🎶**: Utilize the Chirp v3 model for generating music.
- **Retrieve Song Info by ID 🎵**: Access detailed information about any song on Suno AI.
- **Music Downloader 📥**: Built-in functionality to download any music on Suno AI directly.
- **REST API Deployment 🌐**: Deployable as a REST API on PasS Platform , VPS or Local.
- **Comprehensive Documentation 📚**: Includes detailed examples and usage guides.
- **Docker Support 🐳**: Enables containerized deployment with Docker for flexibility.
- **PaaS Deployment ☁️:** Facilitates deployment on platforms like Heroku for convenient accessibility.

📋 Before deploy REST API, you must sign up on the suno.ai website and obtain your cookie as shown in repo README.md file. Set the cookie in SUNO_COOKIE at Environmental variables section.

💡 You can find cookie from the Web Browser's Developer Tools -&gt; Network Tab

## 🌐 REST API Usage

**1. Generate Music**

`POST /generate`

  - **Request Body:**
    ```
    {
      "prompt": "A serene melody about the ocean",
      "is_custom": false,
      "tags": "relaxing, instrumental",
      "title": "Ocean Waves",
      "make_instrumental": true,
      "wait_audio": true
    }
    ```

  - **Response:**

    <details>
    <summary>Click to view</summary>
    
    ```
    [
        {
            "id": "124b735f-7fb0-42b9-8b35-761aed65a7f6",
            "video_url": "",
            "audio_url": "https://audiopipe.suno.ai/item_id=124b735f-7fb0-42b9-8b35-761aed65a7f6",
            "image_url": "https://cdn1.suno.aiimage_124b735f-7fb0-42b9-8b35-761aed65a7f6.png",
            "image_large_url": "https://cdn1.suno.aiimage_large_124b735f-7fb0-42b9-8b35-761aed65a7f.png",
            "is_video_pending": False,
            "major_model_version": "v3",
            "model_name": "chirp-v3",
            "metadata": {
                "tags": "English men voice",
                "prompt": "I found a love, for me\nDarling,just dive right in and follow mylead\nWell, I found a girl, beautiful andsweet\nOh, I never knew you were thesomeone waiting for me\n\n′Cause we werejust kids when we fell in love\nNot knowingwhat it was\nI will not give you up thistime\nBut darling, just kiss me slow\nYourheart is all I own\nAnd in your eyes,you're holding mine\n\nBaby, I′m dancing inthe dark\nWith you between myarms\nBarefoot on the grass\nListening toour favourite song\nWhen you said youlooked a mess\nI whispered underneath mybreath\nBut you heard it\nDarling, you lookperfect tonight",
                "gpt_description_prompt": None,
                "audio_prompt_id": None,
                "history": None,
                "concat_history": None,
                "type": "gen",
                "duration": None,
                "refund_credits": None,
                "stream": True,
                "error_type": None,
                "error_message": None
            },
            "is_liked": False,
            "user_id":"2340653f-32cb-4343-artb-09203ty749e9",
            "display_name": "Snonymous",
            "handle": "anonymous",
            "is_handle_updated": False,
            "is_trashed": False,
            "reaction": None,
            "created_at": "2024-05-05T11:54:09.356Z",
            "status": "streaming",
            "title": "Perfect by Malith-Rukshan/Suno-API",
            "play_count": 0,
            "upvote_count": 0,
            "is_public": False
        }
    ]
    ```
    </details>

**2. Retrieve Songs**

`POST /songs`

  - **Request Body:**
    ```
    {
      "song_ids": "uuid-format-1234,4567-abcd"
    }
    ```
  - **Response:**
    Array of Clips - Same to `/generate` Response

**3. Get a Specific Song**

`POST /get_song`

  - **Request Body:**
    ```
    {
      "song_id": "uuid-song-id"
    }
    ```
  - **Response:**
    Just Clip Response - Same to `/generate` Response but Only Clip

**4. Retrieve Credit Information**

`GET /credits`

  - **Response:**
    ```
    {
      "credits_left": 50,
      "period": "2024-05",
      "monthly_limit": 100,
      "monthly_usage": 25
    }
    ```

&gt; According to [Suno.ai](https://suno.ai/) Each song generation consumes 5 credits, thus a total of 10 credits is necessary for each successful call.

## ⚖️ License
This project is distributed under the MIT License. This license allows everyone to use, modify, and redistribute the code. However, it comes with no warranties regarding its functionality. For more details, see the [LICENSE](https://github.com/Malith-Rukshan/Suno-API/blob/main/LICENSE) file in the repository.

## 🌟 Support and Community
If you found this project helpful, **don't forget to give it a ⭐ on GitHub.** This helps others find and use the project too! 🫶

Join our Telegram channels, 

- [@SingleDevelopers](https://t.me/SingleDevelopers), for more amazing projects and updates ✓
- [@SunoAPI](https://t.me/SunoAPI), for this project updates ✓

## 📬 Contact
If you have any questions, feedback, or just want to say hi, you can reach out to me:

- Developer : [@MalithRukshan](https://t.me/MalithRukshan)
- Support Group : [@Suno_API](https://t.me/Suno_API)

🧑‍💻 Built with 💖 by [Single Developers  ](https://t.me/SingleDevelopers)

</div>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Suno-API-Service | [Malith-Rukshan/Suno-API](https://github.com/Malith-Rukshan/Suno-API) | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `SUNO_COOKIE` | Sign up on the suno.ai website and obtain your cookie. Refer README.md file to tutorial. |

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/IdlBP8)
