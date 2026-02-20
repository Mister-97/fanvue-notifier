# Fanvue Notifier 🔔

Get instant browser notifications when fans message you on Fanvue — no terminal, no tunnels.

## How it works

1. Deploy this to Railway (free)
2. Paste your Railway URL into Fanvue's webhook settings
3. Open your Railway URL in a browser tab and keep it open
4. When a fan messages you → sound plays + alert pops up instantly

## Deploy to Railway

1. Fork this repo
2. Go to [railway.app](https://railway.app) and create a new project
3. Select **Deploy from GitHub repo** and pick this repo
4. Railway will give you a public URL — that's your webhook endpoint

## Set up Fanvue Webhook

1. Log into Fanvue → **Settings → Webhooks**
2. Check **Message Received**
3. Paste your Railway URL + `/webhook` as the endpoint
4. Click Save

## Custom notification sound

Upload your `notification.mp3` to the `public/` folder and Railway will serve it automatically.
