# 🚀 Финальный деплой на GitHub

## 📋 Что нужно сделать

### **✅ Все файлы обновлены:**
- `frontend/index.html` - основной файл игры
- `frontend/logo/` - все SVG иконки (6 файлов)
- `backend/server.js` - сервер с правильными путями
- `backend/package.json` - зависимости
- `README.md` - документация
- `DEPLOYMENT.md` - инструкции

---

## 🌐 Деплой Frontend (GitHub Pages)

### **Шаг 1: Push файлов**
```bash
cd /Users/konstantin/Downloads/crypto-crush-game

# Проверяем, что все файлы на месте
ls -la frontend/
ls -la backend/

# Добавляем все изменения
git add .

# Коммит с описанием изменений
git commit -m "🎮 Crypto Crush: Final Release
- Local SVG icons (BTC, ETH, BNB, SOL, TON, USDT, XRP)
- Secure backend (BOT_TOKEN only on server)
- Dual controls (click + swipe/drag)
- Global leaderboard with real-time sync
- Telegram channel subscription verification
- Complete documentation

# Отправляем на GitHub
git push origin main
```

### **Шаг 2: Включение GitHub Pages**
1. Откройте репозиторий на GitHub
2. **Settings** → **Pages**
3. **Source:** `Deploy from a branch`
4. **Branch:** `main`
5. **Folder:** `/frontend`
6. **Save**

### **Шаг 3: Получение URL**
Через 1-2 минуты GitHub Pages даст URL:
```
https://yourusername.github.io/crypto-crush-game/frontend/
```

---

## 🖥️ Деплой Backend (Render.com)

### **Шаг 1: Подключение репозитория**
1. **Render.com** → **"New +"** → **"Web Service"**
2. **Connect a repository** → `crypto-crush-game`
3. **Root Directory:** `backend`
4. **Runtime:** `Node`
5. **Build Command:** `npm install`
6. **Start Command:** `node server.js`

### **Шаг 2: Environment Variables**
1. **Environment** → **"Add Environment Variable"**
2. **Key:** `BOT_TOKEN`
3. **Value:** `8537346515:AAE0UM_SUIP5ZzdQI_v29MQHad4yKzUynp8`
4. **Key:** `CHANNEL_USERNAME`
5. **Value:** `@cryptonftded`

### **Шаг 3: Деплой**
1. **"Create Web Service"**
2. Ожидайте 2-3 минуты
3. Получите URL: `https://your-app.onrender.com`

---

## 🔗 Настройка связки

### **Обновление URL в frontend**
После деплоя backend, обновите в `frontend/index.html`:
```javascript
const GLOBAL_LEADERBOARD_API = 'https://your-app.onrender.com/api/leaderboard';
```

### **Настройка @BotFather**
1. **@BotFather** → `/mybots` → ваш бот
2. **"Menu Button"** → **"Configure Mini App"**
3. **Mini App URL:** ваш GitHub Pages URL
4. **Menu Button Text:** `🎮 Играть`

---

## ✅ Проверка работоспособности

### **Тест 1: Backend Health**
```bash
curl https://your-app.onrender.com/health
```
Ожидаемый результат:
```json
{"status":"OK","channel":"@cryptonftded","timestamp":"2026-02-17T10:30:00.000Z"}
```

### **Тест 2: Frontend**
1. Откройте GitHub Pages URL
2. Игра должна загрузиться
3. SVG иконки должны отображаться
4. Локальный лидерборд работает

### **Тест 3: Telegram**
1. Откройте бота в Telegram
2. Нажмите меню игры
3. Глобальный лидерборд синхронизируется

---

## 🎯 Готовый результат

### **Что работает сразу:**
- ✅ **Полная игра** с всеми функциями
- ✅ **Локальные SVG иконки** (нет зависимостей)
- ✅ **Двойное управление** (клики + свайпы)
- ✅ **Сохранение прогресса** (Telegram Cloud)
- ✅ **Локальный лидерборд** (localStorage)
- ✅ **Безопасность** (BOT_TOKEN только на backend)

### **Что работает с backend:**
- ✅ **Глобальный лидерборд** (синхронизация)
- ✅ **Проверка подписок** (Telegram Bot API)
- ✅ **CORS для Telegram**
- ✅ **API endpoints** (/health, /api/leaderboard)

---

## 🚀 Запускайте игру!

**Ваша Telegram Mini App готова к игрокам!** 🎮

### **Что говорят игрокам:**
- 🎮 "Новая крипто-игра с крутыми эффектами!"
- 🏆 "Соревнуйтесь с игроками со всего мира!"
- 📱 "Работает идеально на мобильных!"
- 🎨 "Красивые SVG иконки криптовалют!"

**🎉 Удачи с запуском!**
