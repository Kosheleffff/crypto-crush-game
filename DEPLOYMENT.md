# 🚀 Deployment Guide

## 📋 Quick Deployment Options

### **Option 1: Frontend Only (Easiest)**
**Vercel** (Recommended - Free)
```bash
# 1. Push to GitHub
# 2. Go to vercel.com
# 3. Import your repository
# 4. Deploy automatically
```

**Netlify** (Free)
```bash
# 1. Push to GitHub
# 2. Go to netlify.com
# 3. Drag & drop frontend folder
# 4. Deploy instantly
```

### **Option 2: Full Stack (Backend + Frontend)**
**Render.com** (Free tier)
```bash
# 1. Push to GitHub
# 2. Go to render.com
# 3. Connect repository
# 4. Render detects Node.js and deploys
```

**Heroku** (Free tier available)
```bash
# 1. Push to GitHub
# 2. Create Heroku app
# 3. Connect GitHub repository
# 4. Deploy automatically
```

---

## 🛠️ Step-by-Step GitHub Setup

### **1. Create GitHub Repository**
```bash
# Navigate to your project
cd /Users/konstantin/Downloads/crypto-crush-game

# Initialize Git
git init
git add .
git commit -m "Initial commit - Crypto Crush Telegram Mini App"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/crypto-crush-game.git
git branch -M main
git push -u origin main
```

### **2. Deploy to Vercel (Frontend Only)**
1. Go to **vercel.com**
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **crypto-crush-game** repository
5. Set **Framework Preset** to **"Other"**
6. Set **Root Directory** to **frontend**
7. Click **"Deploy"**

### **3. Deploy to Render (Full Stack)**
1. Go to **render.com**
2. Sign up with GitHub
3. Click **"New +" → "Web Service"**
4. Select **crypto-crush-game** repository
5. Set **Build Command** to `cd backend && npm install`
6. Set **Start Command** to `cd backend && node server.js`
7. Click **"Create Web Service"**

---

## 🌐 Environment Configuration

### **Vercel Environment Variables**
Go to Vercel dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

### **Render Environment Variables**
Go to Render dashboard → Service → Environment:
```
BOT_TOKEN=your_telegram_bot_token
CHANNEL_USERNAME=@your_channel
PORT=3000
```

### **Update Frontend Configuration**
In `frontend/index.html`, update these lines:
```javascript
// For Vercel deployment
const GLOBAL_LEADERBOARD_API = 'https://your-backend.onrender.com/api/leaderboard';

// For local testing
const GLOBAL_LEADERBOARD_API = 'http://localhost:3000/api/leaderboard';
```

---

## 📱 Telegram Mini App Setup

### **1. Create Telegram Bot**
1. Talk to **@BotFather** on Telegram
2. Send `/newbot`
3. Choose name and username
4. Save your **BOT_TOKEN**

### **2. Configure Mini App**
1. Talk to **@BotFather**
2. Send `/mybots` → Select your bot
3. **"Menu Button"** → **"Configure Mini App"**
4. Set **Mini App URL** to your Vercel deployment
5. Add **Menu Button Text** (e.g., "🎮 Play Game")

### **3. Add Bot to Channel**
1. Go to your channel settings
2. **Administrators** → **Add Admin**
3. Add your bot as administrator
4. Give necessary permissions

---

## 🔗 Connecting Frontend & Backend

### **Update API URLs**
After deployment, update `frontend/index.html`:

```javascript
// Production URLs
const GLOBAL_LEADERBOARD_API = 'https://your-backend.onrender.com/api/leaderboard';
const CHANNEL_USERNAME = '@your_channel';
const BOT_TOKEN = 'your_bot_token'; // Only for testing, move to backend in production
```

### **Test Integration**
1. Deploy both frontend and backend
2. Open game in browser
3. Play and submit score
4. Check if leaderboard updates
5. Test in Telegram Mini App

---

## 🎯 Production Checklist

### **Security**
- [ ] Move BOT_TOKEN to backend environment variables
- [ ] Add rate limiting to API endpoints
- [ ] Implement CORS properly
- [ ] Validate input data

### **Performance**
- [ ] Enable gzip compression
- [ ] Add caching headers
- [ ] Optimize images and assets
- [ ] Monitor API response times

### **Reliability**
- [ ] Set up health checks
- [ ] Configure error logging
- [ ] Add backup systems
- [ ] Test error handling

### **Analytics**
- [ ] Add Google Analytics
- [ ] Track user engagement
- [ ] Monitor leaderboard activity
- [ ] Set up performance monitoring

---

## 🚀 Quick Deploy Commands

### **Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### **Render CLI**
```bash
# Install Render CLI
npm install -g @render/cli

# Deploy
render deploy
```

### **Manual Deploy**
```bash
# Push to GitHub (triggers auto-deploy)
git add .
git commit -m "Update for deployment"
git push origin main
```

---

## 🛠️ Troubleshooting

### **Common Issues**

#### **"Backend not found"**
- Check if backend is running
- Verify API URL in frontend
- Check CORS settings

#### **"Telegram WebApp not working"**
- Verify Mini App URL in @BotFather
- Check if URL is accessible
- Test in Telegram desktop app

#### **"Leaderboard not syncing"**
- Check backend logs
- Verify API endpoints
- Test network connectivity

### **Debug Mode**
Add console logging to track issues:
```javascript
console.log('🔄 API URL:', GLOBAL_LEADERBOARD_API);
console.log('📱 Telegram WebApp:', tg);
```

---

## 📈 Scaling Considerations

### **When to Upgrade**
- **100+ concurrent players**: Consider database
- **1000+ daily users**: Add caching
- **10000+ users**: Load balancing

### **Recommended Upgrades**
1. **Database**: PostgreSQL or MongoDB
2. **Caching**: Redis for leaderboard
3. **CDN**: CloudFlare for static assets
4. **Monitoring**: Sentry for error tracking

---

## ✅ Success Metrics

Your deployment is successful when:
- ✅ Game loads in web browser
- ✅ Leaderboard works across devices
- ✅ Telegram Mini App functions
- ✅ Scores sync globally
- ✅ Channel subscription works

---

**🎉 Your game is now ready for the world!**

# 🚀 Финальная инструкция деплоя

## 📋 Что нужно задеплоить

### **✅ Файлы готовы:**
- `frontend/index.html` - основная игра
- `frontend/logo/` - все SVG иконки
- `backend/server.js` - API сервер
- `backend/package.json` - зависимости

---

## 🌐 Деплой Frontend (GitHub Pages)

### **Шаг 1: Push на GitHub**
```bash
cd /path/to/crypto-crush-game
git add .
git commit -m "🎮 Final version: Local SVG icons, secure backend, dual controls"
git push origin main
```

### **Шаг 2: Включить Pages**
1. GitHub → Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `main`
4. Folder: `/frontend`
5. Save

### **Шаг 3: Получить URL**
```
https://yourusername.github.io/crypto-crush-game/frontend/
```

---

## 🖥️ Деплой Backend (Render.com)

### **Шаг 1: Connect Repository**
1. Render.com → "New +" → "Web Service"
2. Connect GitHub repository `crypto-crush-game`
3. Root Directory: `backend`
4. Runtime: `Node`
5. Build Command: `npm install`
6. Start Command: `node server.js`

### **Шаг 2: Environment Variables**
```
BOT_TOKEN=8537346515:AAE0UM_SUIP5ZzdQI_v29MQHad4yKzUynp8
CHANNEL_USERNAME=@cryptonftded
PORT=3000
```

### **Шаг 3: Deploy**
- Нажмите "Create Web Service"
- Ожидайте 2-3 минуты
- Получите URL: `https://your-app.onrender.com`

---

## 🔗 Настройка связки

### **Обновите URL в frontend**
В `frontend/index.html` замените:
```javascript
const GLOBAL_LEADERBOARD_API = 'https://your-app.onrender.com/api/leaderboard';
```

### **Настройте @BotFather**
1. @BotFather → `/mybots` → ваш бот
2. "Menu Button" → "Configure Mini App"
3. Mini App URL: ваш GitHub Pages URL
4. Menu Button Text: `🎮 Играть`

---

## ✅ Проверка работоспособности

### **Тест 1: Backend**
```bash
curl https://your-app.onrender.com/health
```
Должен вернуть: `{"status":"OK","channel":"@cryptonftded"}`

### **Тест 2: Frontend**
- Откройте GitHub Pages URL
- Игра должна загрузиться
- Иконки должны отображаться

### **Тест 3: Telegram**
- Откройте бота в Telegram
- Нажмите меню игры
- Лидерборд должен синхронизироваться

---

## 🎯 Готово к запуску!

### **Что работает сразу:**
- ✅ **Игра** - полная функциональность
- ✅ **Локальный лидерборд** - сохранение в localStorage
- ✅ **Сохранение игры** - Telegram Cloud Storage
- ✅ **Двойное управление** - клики + свайпы
- ✅ **Мобильные иконки** - локальные SVG файлы

### **Что работает с backend:**
- ✅ **Глобальный лидерборд** - синхронизация между игроками
- ✅ **Проверка подписок** - через Telegram Bot API
- ✅ **Безопасность** - BOT_TOKEN только на backend

---

## 🚀 Запускайте игру!

**Ваша Telegram Mini App готова к игрокам!** 🎮

### **Что говорят игрокам:**
- "🎮 Играйте в нашу новую крипто-игру!"
- "🏆 Соревнуйтесь с игроками со всего мира!"
- "📱 Работает на всех устройствах!"
- "🎨 Красивые анимации и эффекты!"

**Удачи с запуском!** 🚀🎉
