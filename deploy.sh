#!/bin/bash

echo "🚀 Начинаем деплой Crypto Crush на GitHub..."

# Проверяем что мы в правильной папке
if [ ! -f "frontend/index.html" ]; then
    echo "❌ Ошибка: frontend/index.html не найден. Убедитесь что вы в корневой папке проекта."
    exit 1
fi

# Инициализация git (если нужно)
if [ ! -d ".git" ]; then
    echo "📦 Инициализация Git репозитория..."
    git init
    git add .
    git commit -m "🎮 Initial commit: Crypto Crush Telegram Mini App"
    echo ""
    echo "⚠️  Теперь создайте репозиторий на GitHub и выполните:"
    echo "   git remote add origin https://github.com/ВАШ_USERNAME/crypto-crush-game.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "После этого вернитесь и запустите скрипт снова."
    exit 0
fi

# Добавляем все изменения
echo "📝 Добавляем изменения..."
git add .

# Коммит
echo "💾 Создаем коммит..."
git commit -m "🎮 Crypto Crush: Ready for deployment
- Fixed leaderboard API integration
- Updated API URLs for production
- Optimized for GitHub Pages + Render.com
- Added deployment documentation

$(date)"

# Пуш на GitHub
echo "📤 Отправляем на GitHub..."
git push origin main

echo ""
echo "✅ Успешно! Теперь:"
echo "1. Откройте GitHub и включите Pages для папки /frontend"
echo "2. Разверните backend на Render.com"
echo "3. Настройте Telegram бота"
echo ""
echo "📖 Подробная инструкция: DEPLOYMENT_GUIDE.md"
