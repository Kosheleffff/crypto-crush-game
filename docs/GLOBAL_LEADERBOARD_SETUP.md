# Global Leaderboard Setup Guide

## 🏆 What's Implemented

### **Frontend Features:**
- ✅ **Global leaderboard** with real-time synchronization
- ✅ **Auto-sync** every 60 seconds
- ✅ **Current player highlighting** with special styling
- ✅ **Rank notifications** when submitting scores
- ✅ **Manual sync button** for instant updates
- ✅ **Offline fallback** using localStorage
- ✅ **Top 20 display** with medals for top 3

### **Backend Features:**
- ✅ **REST API** for leaderboard operations
- ✅ **Top 1000 players** storage
- ✅ **Automatic rank calculation**
- ✅ **User statistics** endpoint
- ✅ **File-based persistence** (easy to upgrade to database)

---

## 🔧 Setup Instructions

### **1. Backend Setup**

#### **Install Dependencies:**
```bash
cd /Users/konstantin/Downloads/backend
npm install express cors axios
```

#### **Update server.js:**
Add the leaderboard API to your existing server.js:

```javascript
// Add these lines to your server.js
const path = require('path');
const fs = require('fs');

// Add after your existing middleware
const LEADERBOARD_FILE = path.join(__dirname, 'leaderboard.json');
let globalLeaderboard = [];

function loadLeaderboard() {
    try {
        if (fs.existsSync(LEADERBOARD_FILE)) {
            const data = fs.readFileSync(LEADERBOARD_FILE, 'utf8');
            globalLeaderboard = JSON.parse(data);
            console.log('📊 Loaded leaderboard:', globalLeaderboard.length, 'entries');
        }
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        globalLeaderboard = [];
    }
}

function saveLeaderboard() {
    try {
        fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(globalLeaderboard, null, 2));
        console.log('💾 Saved leaderboard:', globalLeaderboard.length, 'entries');
    } catch (error) {
        console.error('Error saving leaderboard:', error);
    }
}

// Load on startup
loadLeaderboard();

// API Endpoints
app.get('/api/leaderboard', (req, res) => {
    try {
        const top100 = globalLeaderboard
            .sort((a, b) => b.score - a.score)
            .slice(0, 100);
        res.json(top100);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

app.post('/api/leaderboard', (req, res) => {
    try {
        const { id, name, score, level, date } = req.body;
        
        if (!id || !name || score === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const entry = {
            id,
            name,
            score: parseInt(score),
            level: parseInt(level) || 1,
            date: date || new Date().toISOString()
        };
        
        // Remove existing entry for this user
        globalLeaderboard = globalLeaderboard.filter(item => item.id !== id);
        globalLeaderboard.push(entry);
        
        // Keep only top 1000
        globalLeaderboard.sort((a, b) => b.score - a.score);
        globalLeaderboard = globalLeaderboard.slice(0, 1000);
        
        saveLeaderboard();
        
        const userRank = globalLeaderboard.findIndex(item => item.id === id) + 1;
        
        res.json({ 
            success: true,
            rank: userRank,
            totalPlayers: globalLeaderboard.length
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to save score' });
    }
});

// Auto-save every 5 minutes
setInterval(saveLeaderboard, 5 * 60 * 1000);
```

#### **Start Backend:**
```bash
node server.js
```

### **2. Frontend Configuration**

#### **Update API URL:**
In your HTML file, update this line:
```javascript
const GLOBAL_LEADERBOARD_API = 'http://localhost:3000/api/leaderboard';
```

#### **For Production:**
```javascript
const GLOBAL_LEADERBOARD_API = 'https://your-domain.com/api/leaderboard';
```

---

## 🚀 How It Works

### **Data Flow:**
```
Game Ends → Submit to Backend → Backend Saves → Sync to All Players
```

### **Sync Process:**
1. **Auto-sync** every 60 seconds
2. **Manual sync** via refresh button
3. **Real-time updates** when scores are submitted
4. **Offline fallback** if backend unavailable

### **Features:**

#### **Player Experience:**
- 🏆 **See global ranking** among all players
- 🎯 **Highlighted current player** position
- 🥇 **Medals for top 3 players**
- 📊 **Level information** displayed
- 🔄 **Live updates** with timestamps

#### **Technical Features:**
- 📱 **Mobile-optimized** display
- 💾 **Local caching** for offline play
- 🔒 **Duplicate prevention** (one score per user)
- ⚡ **Fast API responses**
- 🛡️ **Error handling** and fallbacks

---

## 📱 Testing

### **Local Testing:**
1. Start backend: `node server.js`
2. Open game in multiple browser tabs
3. Play and submit scores
4. Check leaderboard updates

### **Multi-User Testing:**
1. Use different Telegram accounts
2. Submit scores from different users
3. Verify global ranking works
4. Test sync functionality

---

## 🔒 Production Considerations

### **Security:**
- Add **authentication** to API endpoints
- Implement **rate limiting** for submissions
- Validate **score data** to prevent cheating
- Add **CORS** configuration for your domain

### **Database Upgrade:**
For production, consider upgrading from file storage to:
- **MongoDB** - Flexible and scalable
- **PostgreSQL** - Reliable and fast
- **Redis** - For real-time leaderboards

### **Performance:**
- Add **caching** for frequent requests
- Implement **pagination** for large leaderboards
- Use **CDN** for static assets
- Monitor **API response times**

---

## 🎮 Customization

### **Change Sync Interval:**
```javascript
const LEADERBOARD_SYNC_INTERVAL = 30000; // 30 seconds
```

### **Change Display Count:**
```javascript
globalLeaderboard.slice(0, 50) // Show top 50 instead of 20
```

### **Custom Styling:**
Modify these CSS classes:
- `.leaderboard-item` - Basic item styling
- `.current-player` - Current user highlight
- `.badge` - Medal styling

---

## 🐛 Troubleshooting

### **Common Issues:**

#### **"Backend unavailable"**
- Check if server is running
- Verify API URL in frontend
- Check CORS settings

#### **"Scores not syncing"**
- Check browser console for errors
- Verify network connectivity
- Check backend logs

#### **"Duplicate entries"**
- Clear localStorage: `localStorage.clear()`
- Check backend data file
- Verify user ID uniqueness

### **Debug Mode:**
Add console logging to track sync:
```javascript
console.log('🔄 Syncing leaderboard...');
console.log('📊 Received data:', data.length);
```

---

## 📈 Analytics Ideas

### **Track:**
- Daily active players
- Score distribution
- Peak playing times
- User retention rates
- Level completion stats

### **Add to Backend:**
```javascript
app.post('/api/analytics', (req, res) => {
    // Track game events
});
```

---

## 🌍 Deployment

### **Easy Options:**
1. **Render.com** - Free tier, Node.js support
2. **Vercel** - Free tier, serverless functions
3. **Heroku** - Free tier available
4. **DigitalOcean** - Affordable VPS

### **Domain Setup:**
1. Deploy backend to service
2. Update API URL in frontend
3. Configure SSL certificate
4. Set up custom domain

---

## ✅ Success Metrics

Your global leaderboard is successful when:
- ✅ Players can see their global rank
- ✅ Scores sync across all devices
- ✅ Leaderboard updates in real-time
- ✅ Works offline with fallback
- ✅ Handles multiple players simultaneously

**🎉 Your game now has a competitive global leaderboard!**
