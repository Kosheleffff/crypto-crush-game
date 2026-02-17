const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Подключаем API лидерборда
const { initLeaderboardAPI } = require('./leaderboard-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
const CHANNEL_USERNAME = '@cryptonftded';
const BOT_TOKEN = process.env.BOT_TOKEN || '8537346515:AAE0UM_SUIP5ZzdQI_v29MQHad4yKzUynp8';
const BOT_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

// CORS for all sources (including Telegram)
app.use(cors({
    origin: '*', // Разрешаем все источники для TMA
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.static('public'));

// Инициализируем API лидерборда
initLeaderboardAPI(app);

// Serve game HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK',
        channel: CHANNEL_USERNAME,
        timestamp: new Date().toISOString()
    });
});

// Verify subscription endpoint
app.post('/verify-subscription', async (req, res) => {
    const { userId } = req.body;
    
    if (!userId) {
        return res.status(400).json({ 
            error: 'User ID is required',
            subscribed: false 
        });
    }

    try {
        console.log(`Checking subscription for user ${userId} to channel ${CHANNEL_USERNAME}`);
        
        const response = await axios.post(
            `${BOT_API_URL}/getChatMember`,
            {
                chat_id: CHANNEL_USERNAME,
                user_id: parseInt(userId)
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if (response.data.ok) {
            const status = response.data.result.status;
            const isSubscribed = ['member', 'administrator', 'creator'].includes(status);
            
            console.log(`User ${userId} status: ${status}, subscribed: ${isSubscribed}`);
            
            res.json({ 
                subscribed: isSubscribed,
                status: status,
                user_id: userId
            });
        } else {
            console.error('Bot API error:', response.data);
            res.status(400).json({ 
                error: 'Failed to check subscription',
                description: response.data.description,
                subscribed: false 
            });
        }
    } catch (error) {
        console.error('Error checking subscription:', error.message);
        
        if (error.response) {
            console.error('Bot API response:', error.response.data);
        }
        
        res.status(500).json({ 
            error: 'Internal server error',
            subscribed: false 
        });
    }
});

// Проверка подписки на канал
app.post('/api/leaderboard/check-subscription', async (req, res) => {
    try {
        const { userId, channel } = req.body;
        
        if (!userId || !channel) {
            return res.status(400).json({ error: 'Missing userId or channel' });
        }
        
        // Проверяем подписку через Telegram Bot API
        const response = await axios.post(`${BOT_API_URL}/getChatMember`, {
            chat_id: channel,
            user_id: userId
        });
        
        if (response.data.result) {
            const status = response.data.result.status;
            const isSubscribed = status !== 'left' && status !== 'kicked';
            res.json({ isSubscribed, status });
        } else {
            res.json({ isSubscribed: false });
        }
        
    } catch (error) {
        console.error('Error checking subscription:', error);
        res.status(500).json({ error: 'Failed to check subscription' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK',
        channel: CHANNEL_USERNAME,
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 API endpoints ready`);
    console.log(`🔗 Channel: ${CHANNEL_USERNAME}`);
    console.log(`🤖 Bot configured and ready`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});
