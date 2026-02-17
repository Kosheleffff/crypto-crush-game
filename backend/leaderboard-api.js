// Global Leaderboard API Extension
// Add this to your existing server.js

// In-memory storage for leaderboard (for production, use database)
let globalLeaderboard = [];

// Load initial data from file if exists
const fs = require('fs');
const path = require('path');
const LEADERBOARD_FILE = path.join(__dirname, 'leaderboard.json');

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

// Функция для инициализации эндпоинтов лидерборда
function initLeaderboardAPI(app) {
    // Load leaderboard on startup
    loadLeaderboard();

    // Leaderboard API endpoints
    app.get('/api/leaderboard', (req, res) => {
        try {
            // Return top 100 players, sorted by score
            const top100 = globalLeaderboard
                .sort((a, b) => b.score - a.score)
                .slice(0, 100);
            
            res.json(top100);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            res.status(500).json({ error: 'Failed to fetch leaderboard' });
        }
    });

    app.post('/api/leaderboard', (req, res) => {
        try {
            const { id, name, score, level, date, user_id } = req.body;
            
            if (!id || !name || score === undefined) {
                return res.status(400).json({ 
                    error: 'Missing required fields: id, name, score' 
                });
            }
            
            const entry = {
                id,
                name,
                score: parseInt(score),
                level: parseInt(level) || 1,
                date: date || new Date().toISOString(),
                user_id: user_id || id
            };
            
            // Remove existing entry for this user
            globalLeaderboard = globalLeaderboard.filter(item => item.id !== id);
            
            // Add new entry
            globalLeaderboard.push(entry);
            
            // Keep only top 1000 entries
            globalLeaderboard.sort((a, b) => b.score - a.score);
            globalLeaderboard = globalLeaderboard.slice(0, 1000);
            
            // Save to file
            saveLeaderboard();
            
            // Return user's rank
            const userRank = globalLeaderboard.findIndex(item => item.id === id) + 1;
            
            res.json({ 
                success: true,
                rank: userRank,
                totalPlayers: globalLeaderboard.length,
                message: `Your score ${score} ranks #${userRank} globally!`
            });
            
        } catch (error) {
            console.error('Error saving to leaderboard:', error);
            res.status(500).json({ error: 'Failed to save score' });
        }
    });

    app.get('/api/leaderboard/user/:userId', (req, res) => {
        try {
            const { userId } = req.params;
            const userEntry = globalLeaderboard.find(item => item.id === userId);
            
            if (!userEntry) {
                return res.json({ 
                    found: false,
                    message: 'User not found in leaderboard' 
                });
            }
            
            const userRank = globalLeaderboard.findIndex(item => item.id === userId) + 1;
            const top10 = globalLeaderboard
                .sort((a, b) => b.score - a.score)
                .slice(0, 10);
            
            res.json({ 
                found: true,
                user: userEntry,
                rank: userRank,
                totalPlayers: globalLeaderboard.length,
                top10: top10
            });
            
        } catch (error) {
            console.error('Error fetching user stats:', error);
            res.status(500).json({ error: 'Failed to fetch user stats' });
        }
    });

    app.delete('/api/leaderboard', (req, res) => {
        try {
            const { adminKey } = req.query;
            
            // Simple admin protection (replace with proper auth in production)
            if (adminKey !== 'your-secret-admin-key') {
                return res.status(403).json({ error: 'Unauthorized' });
            }
            
            globalLeaderboard = [];
            saveLeaderboard();
            
            res.json({ 
                success: true,
                message: 'Leaderboard cleared successfully' 
            });
            
        } catch (error) {
            console.error('Error clearing leaderboard:', error);
            res.status(500).json({ error: 'Failed to clear leaderboard' });
        }
    });

    // Auto-save every 5 minutes
    setInterval(saveLeaderboard, 5 * 60 * 1000);
}

// Export for use in main server.js
module.exports = {
    initLeaderboardAPI,
    loadLeaderboard,
    saveLeaderboard,
    globalLeaderboard
};
