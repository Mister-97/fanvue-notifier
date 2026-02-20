# Fanvue Notifier

Get real-time notifications when fans message you on Fanvue — on your phone, desktop, or both. No Fanvue app required.

## How It Works

When a fan sends you a message on Fanvue, you get:
- 📱 **Phone push notification** via ntfy (works even with browser closed)
- 🖥️ **Desktop notification** in Chrome
- 🔊 **Sound alert** in the dashboard
- 💬 **Pop-up banner** in the dashboard

## Setup (about 10 minutes)

### 1. Fork this repo
Click **Fork** at the top right of this page.

### 2. Create a Fanvue OAuth App
1. Go to [fanvue.com/developers/apps](https://fanvue.com/developers/apps)
2. Click **Create App**
3. Under **Redirects**, add: `https://YOUR-APP-NAME.onrender.com/oauth/callback`
4. Check these scopes: `read:chat`, `read:creator`, `read:self`
5. Save and copy your **Client ID** and **Client Secret**

### 3. Set up ntfy (phone notifications)
1. Install the **ntfy** app on your phone — [iOS](https://apps.apple.com/us/app/ntfy/id1625396347) or [Android](https://play.google.com/store/apps/details?id=io.heckel.ntfy)
2. Open the app and subscribe to a topic — pick any unique name like `fanvue-yourname`
3. Keep note of that topic name

### 4. Deploy to Render (free)
1. Go to [render.com](https://render.com) and sign up
2. Click **New → Web Service**
3. Connect your forked GitHub repo
4. Set these environment variables:
   - `FANVUE_CLIENT_ID` → your Client ID
   - `FANVUE_CLIENT_SECRET` → your Client Secret
   - `BASE_URL` → `https://YOUR-APP-NAME.onrender.com`
   - `NTFY_TOPIC` → your ntfy topic name (e.g. `fanvue-yourname`)
5. Click **Deploy**

### 5. Set up Fanvue Webhook
1. Go to Fanvue Settings → Webhooks
2. Enable **Message Received**
3. Set endpoint URL to: `https://YOUR-APP-NAME.onrender.com/webhook`

### 6. Connect your Fanvue account
Visit `https://YOUR-APP-NAME.onrender.com/oauth/connect` and log in with your Fanvue creator account.

---

## You're done!

- **Phone notifications** work 24/7 — no browser or computer needed
- **Dashboard** at `https://YOUR-APP-NAME.onrender.com` for sound/popup alerts (tab must be open)
- Hit **Fire Test Notification** to confirm everything is working

## Notes

- Each creator needs their own deployment (free on Render)
- The dashboard tab must be open for sound and popup alerts
- Phone notifications via ntfy work regardless of whether the dashboard is open
