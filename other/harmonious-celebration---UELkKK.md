# Deploy harmonious-celebration on Railway

It is web soccet chat, where you can guess the word that admin think

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/UELkKK)

## About

Game Chat - Template Overview

Project Description

Game Chat is a real-time multiplayer word-guessing game where players join a chatroom, and one player (admin) sets a secret word. The other players try to guess the word through the chat interface. The game features a countdown timer at the start and announces the winner when the word is guessed.

Tech Stack

Backend: Node.js with Express

WebSockets: Socket.io for real-time communication

Frontend: HTML, CSS, JavaScript

Deployment: Railway

Key Features

Real-time chat functionality

Admin control to start the game and set the word

Dynamic countdown timer at game start

Winner announcement with festive message

User-friendly and minimalist UI with dark/gray theme

Folder Structure

project-root/
|-- public/
|   |-- index.html       # Frontend UI
|   |-- style.css        # CSS for styling
|   |-- script.js        # Client-side WebSocket handling
|-- server.js            # Backend server and WebSocket logic
|-- package.json         # Project dependencies
|-- Procfile             # Start command for deployment

Deployment Setup

Push project to GitHub repository

Deploy to Railway:

Link GitHub repository

Configure start command: node server.js

Access deployed project via provided Railway URL

Usage

Open the deployed game URL

Enter a nickname and join the game

Admin sets a secret word and starts the game

Countdown timer appears for all players

Players guess the word in the chat

Winner and guessed word are announced

Future Enhancements

Add sound effects for game events

Implement multiple rounds

Add player score tracking

Enhance UI with more animations

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Game-chat | [BaturaVetal/Game-chat](https://github.com/BaturaVetal/Game-chat) | Worker |

**Category:** Other

[View on Railway →](https://railway.com/deploy/UELkKK)
