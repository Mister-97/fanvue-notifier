const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
const SOUND_FILE = path.join(__dirname, 'Fanvue custom Notification.mp3');

// State
let settings = {
  soundEnabled: true,
  popupEnabled: true,
  messageCount: 0,
  lastMessage: null,
};

function playSound() {
  if (!settings.soundEnabled) return;
  if (fs.existsSync(SOUND_FILE)) {
    exec(`afplay "${SOUND_FILE}"`);
  } else {
    exec(`osascript -e 'beep'`);
  }
}

function sendPopup(title, message) {
  if (!settings.popupEnabled) return;
  const safeTitle = title.replace(/"/g, '\\"');
  const safeMessage = message.replace(/"/g, '\\"');
  exec(`terminal-notifier -title "${safeTitle}" -message "${safeMessage}" -subtitle "Fanvue Message" -sound default`);
}

app.post('/webhook', (req, res) => {
  res.sendStatus(200);
  const { sender, message } = req.body;
  if (!sender || !message) return;

  const senderName = sender.displayName || sender.handle || 'Someone';
  const messageText = message.text || (message.hasMedia ? 'Sent media' : '(no text)');

  settings.messageCount++;
  settings.lastMessage = {
    from: senderName,
    text: messageText,
    time: new Date().toLocaleTimeString(),
  };

  console.log(`[${settings.lastMessage.time}] ${senderName}: "${messageText}"`);
  playSound();
  sendPopup(`💬 ${senderName}`, messageText);
});

app.get('/api/status', (req, res) => res.json(settings));

app.post('/api/settings', (req, res) => {
  const { soundEnabled, popupEnabled } = req.body;
  if (typeof soundEnabled === 'boolean') settings.soundEnabled = soundEnabled;
  if (typeof popupEnabled === 'boolean') settings.popupEnabled = popupEnabled;
  res.json(settings);
});

app.post('/api/test', (req, res) => {
  settings.messageCount++;
  settings.lastMessage = {
    from: 'Test Fan',
    text: 'Hey! Is this still available?',
    time: new Date().toLocaleTimeString(),
  };
  playSound();
  sendPopup('💬 Test Fan', 'Hey! Is this still available?');
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Fanvue Notifier running → http://localhost:${PORT}`);
});
