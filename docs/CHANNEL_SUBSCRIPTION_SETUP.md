# Telegram Channel Subscription Setup Guide

## 🎯 What's Implemented
- ✅ Frontend subscription quest with special styling
- ✅ "Open Channel" button using Telegram WebApp API
- ✅ "Verify Subscription" button with status feedback
- ✅ Reward system (5 boosters for subscribing)

## 🔧 Setup Required

### 1. Create Telegram Bot
1. Talk to @BotFather on Telegram
2. Create new bot: `/newbot`
3. Get your **BOT_TOKEN** (looks like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Add Bot to Channel Admin
1. Go to your channel settings
2. Add your bot as **Administrator**
3. Give bot permission to view members

### 3. Update Configuration in HTML
Find these lines in your HTML file and update them:

```javascript
const CHANNEL_USERNAME = '@your_channel'; // Replace with your channel
const BOT_TOKEN = 'YOUR_BOT_TOKEN'; // Replace with your bot token
```

Example:
```javascript
const CHANNEL_USERNAME = '@crypto_crush_channel'; // Your actual channel
const BOT_TOKEN = '1234567890:ABCdefGHIjklMNOpqrsTUVwxyz'; // Your actual bot token
```

## 🚀 How It Works

### Frontend Flow:
1. User sees "Подписчик" quest in the quest list
2. Clicks "📢 Открыть канал" → Opens your channel in Telegram
3. User subscribes to the channel
4. Clicks "✅ Проверить подписку" → Verifies subscription
5. If subscribed → Gets 5 boosters reward

### Backend Verification:
The verification happens via Telegram Bot API:
- Calls `getChatMember` method
- Checks if user status is: `member`, `administrator`, or `creator`
- Returns verification result to frontend

## 🔒 Security Notes

### ⚠️ Important: Bot Token Exposure
**Current implementation exposes your bot token in frontend code!**

For production, you should:

1. **Create a backend API endpoint** that hides the bot token
2. **Move verification logic to server-side**
3. **Use your backend as proxy** for Telegram API calls

### Example Backend Setup (Node.js):
```javascript
// server.js
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const BOT_TOKEN = 'your-secret-bot-token';
const CHANNEL_USERNAME = '@your_channel';

app.post('/verify-subscription', async (req, res) => {
    const { userId } = req.body;
    
    try {
        const response = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember`,
            {
                chat_id: CHANNEL_USERNAME,
                user_id: userId
            }
        );
        
        const status = response.data.result.status;
        const isSubscribed = ['member', 'administrator', 'creator'].includes(status);
        
        res.json({ subscribed: isSubscribed });
    } catch (error) {
        res.status(500).json({ error: 'Verification failed' });
    }
});

app.listen(3000);
```

### Updated Frontend Call:
```javascript
async function checkChannelSubscription(userId) {
    try {
        const response = await fetch('https://your-backend.com/verify-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });
        
        const data = await response.json();
        return data.subscribed;
    } catch (error) {
        console.error('Ошибка проверки подписки:', error);
        return false;
    }
}
```

## 🧪 Testing

### Local Testing:
1. Update config with your actual channel and bot token
2. Open HTML file in browser (won't work fully - needs Telegram WebApp)
3. Test in Telegram Mini App environment

### Production Testing:
1. Deploy to web hosting
2. Configure Telegram Mini App with your URL
3. Test subscription flow end-to-end

## 🎨 Customization

### Change Reward:
```javascript
{ id: 9, title: 'Подписчик', description: 'Подпишитесь на наш канал', 
  target: 1, current: 0, type: 'subscribe', reward: 10, claimed: false } // Change reward to 10
```

### Change Quest Title/Description:
```javascript
{ id: 9, title: 'Telegram Fan', description: 'Join our community', 
  target: 1, current: 0, type: 'subscribe', reward: 5, claimed: false }
```

### Multiple Channels:
Add more subscription quests:
```javascript
{ id: 10, title: 'Premium Subscriber', description: 'Subscribe to premium channel', 
  target: 1, current: 0, type: 'subscribe', reward: 10, claimed: false, channelUsername: '@premium_channel' }
```

## 📱 User Experience

The subscription quest appears with:
- 🌟 Special gradient background
- 🔵 Blue "Open Channel" button
- 🟠 Orange "Verify Subscription" button
- 📊 Real-time verification status
- ✅ Success confirmation with reward

## 🔧 Troubleshooting

### Common Issues:
1. **"Bot not found" error** → Check bot token is correct
2. **"Chat not found" error** → Check channel username and bot admin rights
3. **"Forbidden" error** → Bot needs to be channel administrator
4. **CORS errors** → Need backend proxy for production

### Debug Mode:
Add console logs to see API responses:
```javascript
console.log('Bot API Response:', data);
```

## 🚀 Next Steps

1. **Set up backend** for production (recommended)
2. **Test with real channel** and bot
3. **Customize rewards** and quest text
4. **Add more subscription quests** for multiple channels
5. **Implement analytics** to track subscription conversions

Your subscription system is now ready! 🎉
