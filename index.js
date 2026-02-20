const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.FANVUE_CLIENT_ID;
const CLIENT_SECRET = process.env.FANVUE_CLIENT_SECRET;
const BASE_URL = process.env.BASE_URL || 'https://fanvue-notifier.onrender.com';

// In-memory state
let state = {
  soundEnabled: true,
  popupEnabled: true,
  lastMessage: null,
  messageCount: 0,
  accessToken: null,
  authed: false,
};

// ─── OAuth: redirect to Fanvue login ─────────────────────────────────────────
app.get('/oauth/connect', (req, res) => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: `${BASE_URL}/oauth/callback`,
    response_type: 'code',
    scope: 'openid offline_access offline read:self read:chat read:creator',
  });
  res.redirect(`https://auth.fanvue.com/authorize?${params}`);
});

// ─── OAuth: handle callback from Fanvue ──────────────────────────────────────
app.get('/oauth/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.send('No code received from Fanvue.');

  try {
    const response = await fetch('https://auth.fanvue.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: `${BASE_URL}/oauth/callback`,
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      state.accessToken = data.access_token;
      state.authed = true;
      console.log('OAuth success! Access token received.');
      res.redirect('/');
    } else {
      console.error('OAuth failed:', JSON.stringify(data));
      res.send('OAuth failed: ' + JSON.stringify(data));
    }
  } catch (err) {
    console.error('OAuth error:', err);
    res.send('OAuth error: ' + err.message);
  }
});

// ─── Webhook endpoint ─────────────────────────────────────────────────────────
app.post('/webhook', (req, res) => {
  res.sendStatus(200);
  const { sender, message } = req.body;
  if (!sender || !message) return;

  const senderName = sender.displayName || sender.handle || 'Someone';
  const messageText = message.text || (message.hasMedia ? 'Sent media' : '(no text)');

  state.messageCount++;
  state.lastMessage = { from: senderName, text: messageText };

  console.log(`[${new Date().toLocaleTimeString()}] ${senderName}: "${messageText}"`);
});

// ─── API endpoints ────────────────────────────────────────────────────────────
app.get('/api/status', (req, res) => res.json(state));

app.post('/api/settings', (req, res) => {
  const { soundEnabled, popupEnabled } = req.body;
  if (typeof soundEnabled === 'boolean') state.soundEnabled = soundEnabled;
  if (typeof popupEnabled === 'boolean') state.popupEnabled = popupEnabled;
  res.json(state);
});

app.post('/api/test', (req, res) => {
  state.messageCount++;
  state.lastMessage = { from: 'Test Fan', text: 'Hey! Is this still available?' };
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Fanvue Notifier running on port ${PORT}`);
});
