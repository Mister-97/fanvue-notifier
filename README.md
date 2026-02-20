# Fanvue Notifier 🔔

Get instant Mac desktop notifications when fans message you on Fanvue.

---

## One-Time Setup

### 1. Install ngrok (one time only)
Go to https://ngrok.com/download and download the Mac version.
Or if you have Homebrew: `brew install ngrok`

Then create a free account at https://ngrok.com and run:
```
ngrok config add-authtoken YOUR_TOKEN_HERE
```

---

## Every Time You Want Notifications

Open **two Terminal tabs**:

### Tab 1 — Start the notifier
```bash
cd fanvue-notifier
node index.js
```

### Tab 2 — Start ngrok tunnel
```bash
ngrok http 3000
```

Copy the URL ngrok gives you — it looks like:
`https://abc123.ngrok-free.app`

---

## Set Up the Webhook in Fanvue (one time)

1. Log into Fanvue
2. Go to Settings → Developer / API → Webhooks
3. Add a new webhook:
   - **URL**: `https://YOUR-NGROK-URL.ngrok-free.app/webhook`
   - **Event**: `message.received`
4. Save

That's it! Now when a fan messages you, your Mac will make a sound and show a popup instantly.

---

## Test It

You can test without a real fan message by running this in a third terminal tab:

```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "sender": { "displayName": "Test Fan", "handle": "testfan" },
    "message": { "text": "Hey! Is this still available?", "hasMedia": false }
  }'
```

You should hear a Ping sound and see a Mac notification pop up.
