# 🎮 Crypto Crush - Telegram Mini App

Match-3 puzzle game with cryptocurrency themes for Telegram Mini Apps.

## 🌟 Features

### **Gameplay**
- ✅ **Match-3 mechanics** with cryptocurrency icons
- ✅ **Dual controls**: Click + Swipe/Drag
- ✅ **Combo system** with score multipliers
- ✅ **Level progression** with increasing difficulty
- ✅ **Power-ups and boosters**

### **Social Features**
- ✅ **Global leaderboard** with real-time sync
- ✅ **Telegram channel subscription** rewards
- ✅ **Quest system** with achievements
- ✅ **Save/Load game state** across sessions

### **Technical Features**
- ✅ **Telegram WebApp integration**
- ✅ **Local SVG icons** (no external dependencies)
- ✅ **Responsive design** for all devices
- ✅ **Offline fallback** functionality
- ✅ **Auto-save** system

## 🚀 Quick Start

### **For Players**
Just open the game link in Telegram or browser!

### **For Developers**

#### **Frontend Only (Quick Test)**
```bash
# Open directly
open frontend/index.html
```

#### **Full Backend Setup**
```bash
# Install dependencies
cd backend
npm install

# Start server
node server.js

# Update frontend API URL
# In frontend/index.html, change:
const GLOBAL_LEADERBOARD_API = 'http://localhost:3000/api/leaderboard';
```

## 📁 Repository Structure

```
crypto-crush-game/
├── frontend/
│   ├── index.html          # Complete game (67KB)
│   └── logo/              # SVG icons
│       ├── btc.svg
│       ├── eth.svg
│       ├── bnb.svg
│       ├── sol.svg
│       ├── ton.svg
│       ├── usdt.svg
│       └── xrp.svg
├── backend/
│   ├── server.js           # Express server
│   ├── package.json        # Dependencies
│   └── leaderboard-api.js  # Leaderboard logic
└── README.md
```

## 🛠️ Deployment

### **Frontend (GitHub Pages)**
1. Push to GitHub
2. Enable Pages in Settings
3. URL: `https://username.github.io/crypto-crush-game/frontend/`

### **Backend (Render.com)**
1. Connect repository to Render
2. Root Directory: `backend`
3. Runtime: `Node`
4. Build: `npm install`
5. Start: `node server.js`

### **Environment Variables**
```bash
BOT_TOKEN=8537346515:AAE0UM_SUIP5ZzdQI_v29MQHad4yKzUynp8
CHANNEL_USERNAME=@cryptonftded
```

## 🎮 How to Play

1. **Match 3+ identical** cryptocurrencies
2. **Controls:**
   - **Click**: Select first, click adjacent to swap
   - **Swipe**: Touch and drag to adjacent cell
3. **Create combos** for bonus points
4. **Complete quests** for rewards
5. **Climb global leaderboard**
6. **Subscribe to channel** for boosters

## 🏆 Game Features

### **Scoring System**
- **Base points**: 10 points per matched icon
- **Combo multiplier**: 20 points × combo level
- **Big match bonus**: 100 points for 5+ matches
- **Level completion**: Bonus points and rewards

### **Quest System**
- **First steps**: Score 500 points
- **Master combo**: Achieve 3x combo
- **BTC collector**: Destroy 50 BTC icons
- **Level conqueror**: Reach level 5
- **Subscriber**: Join Telegram channel

### **Power-ups**
- **Boosters**: Remove 5 random icons
- **Extra moves**: Get more chances to complete levels
- **Level rewards**: Earn boosters for progression

## 🌐 API Endpoints

### **Leaderboard API**
```javascript
GET  /api/leaderboard          // Get top 100 players
POST /api/leaderboard          // Submit score
POST /api/leaderboard/check-subscription  // Check channel subscription
GET  /health                    // Health check
```

## 🎨 Customization

### **Change Cryptocurrencies**
Edit the `CRYPTOS` array in `frontend/index.html`:
```javascript
const CRYPTOS = [
    { name: 'BTC', icon: './logo/btc.svg', color: '#F7931A' },
    // Add more cryptocurrencies
];
```

### **Modify Quests**
Update the `quests` array to add/change achievements.

### **Styling**
Customize CSS variables for different themes and colors.

## 🔧 Configuration

### **Frontend Variables**
```javascript
const CHANNEL_USERNAME = '@your_channel';
const GLOBAL_LEADERBOARD_API = 'https://your-backend.com/api/leaderboard';
const LEADERBOARD_SYNC_INTERVAL = 60000; // 1 minute
```

### **Backend Variables**
```bash
BOT_TOKEN=your_telegram_bot_token
CHANNEL_USERNAME=@your_channel
PORT=3000
```

## 📱 Mobile Optimization

- **Touch controls** with swipe gestures
- **Responsive design** for all screen sizes
- **Performance optimized** for mobile devices
- **Haptic feedback** support (when available)

## 🛡️ Security

- ✅ **No BOT_TOKEN in frontend** (backend only)
- ✅ **CORS configured** for Telegram domains
- ✅ **Input validation** on all endpoints
- ✅ **Local SVG icons** (no external dependencies)

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - feel free to use and modify.

## 🆘 Support

- **Documentation**: Check inline comments
- **Issues**: Report via GitHub Issues
- **Community**: Join Telegram channel

## 🚀 Future Updates

- [ ] Sound effects and music
- [ ] More power-ups and special effects
- [ ] Tournament mode
- [ ] Guild/team features
- [ ] Achievement badges
- [ ] Daily challenges

---

**🎮 Made with ❤️ for Telegram Mini Apps**

**⭐ Star this repository if you like the game!**
