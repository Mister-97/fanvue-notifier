# 🟢 Fanvue Notifier

> Real-time message alerts for Fanvue creators — on your phone, desktop, or both.

When a fan messages you on Fanvue, you instantly get:

| Alert Type | Works When |
|---|---|
| 📱 Phone push (ntfy) | Always — even with browser closed |
| 🖥️ Desktop notification | Browser open in background |
| 🔊 Sound alert | Dashboard tab open |
| 💬 Pop-up banner | Dashboard tab open |

---

## ⚡ Quick Setup (~10 minutes)

### Step 1 — Fork this repo
Click **Fork** at the top right of this page to copy it to your GitHub account.

---

### Step 2 — Create a Fanvue OAuth App

1. Go to [fanvue.com/developers/apps](https://fanvue.com/developers/apps)
2. Click **Create App**
3. Under **Redirects**, add your callback URL:
   ```
   https://YOUR-APP-NAME.onrender.com/oauth/callback
   ```
4. Enable these scopes: `read:chat` `read:creator` `read:self`
5. Save — copy your **Client ID** and **Client Secret**

---

### Step 3 — Set up ntfy (phone notifications)

1. Install the ntfy app → [iOS](https://apps.apple.com/us/app/ntfy/id1625396347) · [Android](https://play.google.com/store/apps/details?id=io.heckel.ntfy)
2. Open the app and subscribe to a unique topic name, e.g. `fanvue-yourname`
3. Keep note of that topic name for the next step

---

### Step 4 — Deploy to Render

1. Go to [render.com](https://render.com) and sign up (free)
2. Click **New → Web Service**
3. Connect your forked GitHub repo
4. Add these environment variables:

   | Variable | Value |
   |---|---|
   | `FANVUE_CLIENT_ID` | Your Client ID from Step 2 |
   | `FANVUE_CLIENT_SECRET` | Your Client Secret from Step 2 |
   | `BASE_URL` | `https://YOUR-APP-NAME.onrender.com` |
   | `NTFY_TOPIC` | Your ntfy topic from Step 3 |

5. Click **Deploy** and wait for it to go live

---

### Step 5 — Set up Fanvue Webhook

1. Go to **Fanvue Settings → Webhooks**
2. Enable **Message Received**
3. Set the endpoint URL to:
   ```
   https://YOUR-APP-NAME.onrender.com/webhook
   ```

---

### Step 6 — Connect your Fanvue account

Visit your app and log in:
```
https://YOUR-APP-NAME.onrender.com/oauth/connect
```

---

## ✅ You're live!

Open your dashboard and hit **🧪 Fire Test Notification** to confirm everything works.

```
https://YOUR-APP-NAME.onrender.com
```

> 💡 **Tip:** Phone notifications work 24/7 with no browser needed. The dashboard just needs to be open for sound and pop-up alerts.

---

## 🙋 FAQ

**Do I need to change any code?**
Nope — everything is configured through environment variables on Render.

**Can multiple creators use this?**
Yes — each creator deploys their own free instance and connects their own Fanvue account.

**What if I close the browser?**
Phone notifications via ntfy still work. Sound and pop-up alerts require the dashboard tab to be open.
