const express = require('express');
const { fetchRealms } = require('wow-realm-status');

const app = express();
const PORT = process.env.PORT || 3000;

// Cache to avoid hammering the API
let cache = {
    eu: { data: null, timestamp: 0 },
    us: { data: null, timestamp: 0 }
};
const CACHE_TTL = 60000; // 1 minute

async function getRealms(region) {
    const now = Date.now();
    if (cache[region].data && (now - cache[region].timestamp) < CACHE_TTL) {
        return cache[region].data;
    }
    
    try {
        const realms = await fetchRealms(region);
        cache[region] = { data: realms, timestamp: now };
        return realms;
    } catch (error) {
        console.error(`Error fetching ${region} realms:`, error.message);
        // Return cached data if available, otherwise empty array
        if (cache[region].data) {
            return cache[region].data;
        }
        console.log('Using demo data due to API error');
        return getDemoData(region);
    }
}

// Demo data for testing when API is unavailable
function getDemoData(region) {
    const euRealms = [
        { name: 'Aegwynn', slug: 'aegwynn', online: true, type: 'pvp', population: 'medium', timezone: 'CET' },
        { name: 'Aerie Peak', slug: 'aerie-peak', online: true, type: 'normal', population: 'high', timezone: 'CET' },
        { name: 'Aggramar', slug: 'aggramar', online: true, type: 'normal', population: 'high', timezone: 'CET' },
        { name: 'Antonidas', slug: 'antonidas', online: true, type: 'normal', population: 'full', timezone: 'CET' },
        { name: 'Argent Dawn', slug: 'argent-dawn', online: true, type: 'rp', population: 'full', timezone: 'CET' },
        { name: 'Arthas', slug: 'arthas', online: true, type: 'pvp', population: 'medium', timezone: 'CET' },
        { name: 'Azjol-Nerub', slug: 'azjol-nerub', online: false, type: 'normal', population: 'low', timezone: 'CET' },
        { name: 'Blackhand', slug: 'blackhand', online: true, type: 'pvp', population: 'high', timezone: 'CET' },
        { name: 'Blackmoore', slug: 'blackmoore', online: true, type: 'pvp', population: 'full', timezone: 'CET' },
        { name: 'Blackrock', slug: 'blackrock', online: true, type: 'pvp', population: 'high', timezone: 'CET' },
        { name: 'Burning Legion', slug: 'burning-legion', online: true, type: 'pvp', population: 'medium', timezone: 'CET' },
        { name: 'Chamber of Aspects', slug: 'chamber-of-aspects', online: true, type: 'normal', population: 'medium', timezone: 'CET' },
        { name: 'Doomhammer', slug: 'doomhammer', online: true, type: 'normal', population: 'high', timezone: 'CET' },
        { name: 'Draenor', slug: 'draenor', online: true, type: 'normal', population: 'full', timezone: 'CET' },
        { name: 'Dragonblight', slug: 'dragonblight', online: false, type: 'normal', population: 'medium', timezone: 'CET' },
        { name: 'Earthen Ring', slug: 'earthen-ring', online: true, type: 'rp', population: 'medium', timezone: 'CET' },
        { name: 'Emerald Dream', slug: 'emerald-dream', online: true, type: 'rp', population: 'medium', timezone: 'CET' },
        { name: 'Frostmane', slug: 'frostmane', online: true, type: 'pvp', population: 'medium', timezone: 'CET' },
        { name: 'Hellscream', slug: 'hellscream', online: true, type: 'normal', population: 'high', timezone: 'CET' },
        { name: 'Kazzak', slug: 'kazzak', online: true, type: 'pvp', population: 'full', timezone: 'CET' },
        { name: 'Kel\'Thuzad', slug: 'kelthuzad', online: true, type: 'pvp', population: 'medium', timezone: 'CET' },
        { name: 'Lightbringer', slug: 'lightbringer', online: true, type: 'normal', population: 'high', timezone: 'CET' },
        { name: 'Magtheridon', slug: 'magtheridon', online: true, type: 'pvp', population: 'medium', timezone: 'CET' },
        { name: 'Outland', slug: 'outland', online: true, type: 'pvp', population: 'full', timezone: 'CET' },
        { name: 'Ragnaros', slug: 'ragnaros', online: true, type: 'pvp', population: 'high', timezone: 'CET' },
        { name: 'Ravencrest', slug: 'ravencrest', online: true, type: 'pvp', population: 'full', timezone: 'CET' },
        { name: 'Silvermoon', slug: 'silvermoon', online: true, type: 'normal', population: 'full', timezone: 'CET' },
        { name: 'Stormrage', slug: 'stormrage', online: true, type: 'normal', population: 'high', timezone: 'CET' },
        { name: 'Stormscale', slug: 'stormscale', online: true, type: 'pvp', population: 'high', timezone: 'CET' },
        { name: 'Tarren Mill', slug: 'tarren-mill', online: true, type: 'pvp', population: 'full', timezone: 'CET' },
        { name: 'Thunderhorn', slug: 'thunderhorn', online: true, type: 'normal', population: 'medium', timezone: 'CET' },
        { name: 'Twisting Nether', slug: 'twisting-nether', online: true, type: 'pvp', population: 'full', timezone: 'CET' },
    ];
    
    const usRealms = [
        { name: 'Aegwynn', slug: 'aegwynn', online: true, type: 'pvp', population: 'low', timezone: 'CST' },
        { name: 'Aerie Peak', slug: 'aerie-peak', online: true, type: 'normal', population: 'high', timezone: 'PST' },
        { name: 'Aggramar', slug: 'aggramar', online: true, type: 'normal', population: 'medium', timezone: 'CST' },
        { name: 'Area 52', slug: 'area-52', online: true, type: 'normal', population: 'full', timezone: 'EST' },
        { name: 'Arthas', slug: 'arthas', online: true, type: 'pvp', population: 'high', timezone: 'EST' },
        { name: 'Azralon', slug: 'azralon', online: true, type: 'pvp', population: 'full', timezone: 'BRT' },
        { name: 'Barthilas', slug: 'barthilas', online: true, type: 'pvp', population: 'full', timezone: 'AEST' },
        { name: 'Bleeding Hollow', slug: 'bleeding-hollow', online: true, type: 'pvp', population: 'high', timezone: 'EST' },
        { name: 'Dalaran', slug: 'dalaran', online: true, type: 'normal', population: 'high', timezone: 'EST' },
        { name: 'Emerald Dream', slug: 'emerald-dream', online: true, type: 'rppvp', population: 'high', timezone: 'CST' },
        { name: 'Frostmourne', slug: 'frostmourne', online: true, type: 'pvp', population: 'full', timezone: 'AEST' },
        { name: 'Illidan', slug: 'illidan', online: true, type: 'pvp', population: 'full', timezone: 'CST' },
        { name: 'Kel\'Thuzad', slug: 'kelthuzad', online: false, type: 'pvp', population: 'high', timezone: 'MST' },
        { name: 'Mal\'Ganis', slug: 'malganis', online: true, type: 'pvp', population: 'full', timezone: 'CST' },
        { name: 'Moon Guard', slug: 'moon-guard', online: true, type: 'rp', population: 'full', timezone: 'CST' },
        { name: 'Proudmoore', slug: 'proudmoore', online: true, type: 'normal', population: 'full', timezone: 'PST' },
        { name: 'Ragnaros', slug: 'ragnaros', online: true, type: 'pvp', population: 'full', timezone: 'CST' },
        { name: 'Sargeras', slug: 'sargeras', online: true, type: 'pvp', population: 'full', timezone: 'CST' },
        { name: 'Stormrage', slug: 'stormrage', online: true, type: 'normal', population: 'full', timezone: 'EST' },
        { name: 'Thrall', slug: 'thrall', online: true, type: 'normal', population: 'full', timezone: 'EST' },
        { name: 'Tichondrius', slug: 'tichondrius', online: true, type: 'pvp', population: 'full', timezone: 'PST' },
        { name: 'Wyrmrest Accord', slug: 'wyrmrest-accord', online: true, type: 'rp', population: 'high', timezone: 'PST' },
        { name: 'Zul\'jin', slug: 'zuljin', online: true, type: 'normal', population: 'full', timezone: 'EST' },
    ];
    
    return region === 'eu' ? euRealms : usRealms;
}

app.get('/', async (req, res) => {
    const region = req.query.region || 'eu';
    const realms = await getRealms(region);
    
    // Sort realms by name
    realms.sort((a, b) => a.name.localeCompare(b.name));
    
    // Count stats
    const online = realms.filter(r => r.online).length;
    const offline = realms.filter(r => !r.online).length;
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WoW Realm Status - ${region.toUpperCase()}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            min-height: 100vh;
            color: #fff;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        h1 {
            font-size: 2.5rem;
            color: #ffd700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            margin-bottom: 10px;
        }
        
        .region-selector {
            margin: 20px 0;
        }
        
        .region-selector a {
            display: inline-block;
            padding: 10px 30px;
            margin: 0 10px;
            background: ${region === 'eu' ? '#ffd700' : 'rgba(255,255,255,0.1)'};
            color: ${region === 'eu' ? '#1a1a2e' : '#fff'};
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        
        .region-selector a:last-child {
            background: ${region === 'us' ? '#ffd700' : 'rgba(255,255,255,0.1)'};
            color: ${region === 'us' ? '#1a1a2e' : '#fff'};
        }
        
        .region-selector a:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(255,215,0,0.3);
        }
        
        .stats {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-bottom: 30px;
        }
        
        .stat-box {
            padding: 15px 40px;
            border-radius: 10px;
            text-align: center;
        }
        
        .stat-box.online {
            background: rgba(0, 255, 0, 0.2);
            border: 2px solid #00ff00;
        }
        
        .stat-box.offline {
            background: rgba(255, 0, 0, 0.2);
            border: 2px solid #ff0000;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
        }
        
        .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .search-box {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .search-box input {
            padding: 12px 25px;
            width: 300px;
            border: none;
            border-radius: 25px;
            font-size: 1rem;
            background: rgba(255,255,255,0.1);
            color: #fff;
            outline: none;
        }
        
        .search-box input::placeholder {
            color: rgba(255,255,255,0.5);
        }
        
        .search-box input:focus {
            background: rgba(255,255,255,0.2);
            box-shadow: 0 0 15px rgba(255,215,0,0.3);
        }
        
        .realms-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 15px;
        }
        
        .realm-card {
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            gap: 15px;
            transition: all 0.3s ease;
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .realm-card:hover {
            background: rgba(255,255,255,0.1);
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        }
        
        .status-indicator {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        
        .status-indicator.online {
            background: #00ff00;
            box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
            animation: pulse-green 2s infinite;
        }
        
        .status-indicator.offline {
            background: #ff0000;
            box-shadow: 0 0 10px #ff0000;
            animation: pulse-red 1s infinite;
        }
        
        @keyframes pulse-green {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        @keyframes pulse-red {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .realm-info {
            flex-grow: 1;
        }
        
        .realm-name {
            font-weight: bold;
            font-size: 1.1rem;
        }
        
        .realm-meta {
            font-size: 0.8rem;
            opacity: 0.7;
            margin-top: 3px;
        }
        
        .realm-population {
            padding: 3px 10px;
            border-radius: 15px;
            font-size: 0.75rem;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .pop-full { background: #ff4444; }
        .pop-high { background: #ff8800; }
        .pop-medium { background: #ffcc00; color: #333; }
        .pop-low { background: #44aa44; }
        .pop-very-low { background: #666; }
        
        .last-update {
            text-align: center;
            margin-top: 30px;
            opacity: 0.6;
            font-size: 0.9rem;
        }
        
        .hidden {
            display: none !important;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>⚔️ WoW Realm Status</h1>
            <div class="region-selector">
                <a href="/?region=eu">🇪🇺 Europe</a>
                <a href="/?region=us">🇺🇸 Americas</a>
            </div>
        </header>
        
        <div class="stats">
            <div class="stat-box online">
                <div class="stat-number">${online}</div>
                <div class="stat-label">Online</div>
            </div>
            <div class="stat-box offline">
                <div class="stat-number">${offline}</div>
                <div class="stat-label">Offline</div>
            </div>
        </div>
        
        <div class="search-box">
            <input type="text" id="search" placeholder="Search realms..." onkeyup="filterRealms()">
        </div>
        
        <div class="realms-grid" id="realms-grid">
            ${realms.map(realm => `
                <div class="realm-card" data-name="${realm.name.toLowerCase()}">
                    <div class="status-indicator ${realm.online ? 'online' : 'offline'}"></div>
                    <div class="realm-info">
                        <div class="realm-name">${realm.name}</div>
                        <div class="realm-meta">${realm.type.toUpperCase()} • ${realm.timezone || 'N/A'}</div>
                    </div>
                    <span class="realm-population pop-${realm.population}">${realm.population}</span>
                </div>
            `).join('')}
        </div>
        
        <div class="last-update">
            Last updated: ${new Date().toLocaleString()} • Auto-refresh in 60 seconds
        </div>
    </div>
    
    <script>
        function filterRealms() {
            const search = document.getElementById('search').value.toLowerCase();
            const cards = document.querySelectorAll('.realm-card');
            
            cards.forEach(card => {
                const name = card.dataset.name;
                if (name.includes(search)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }
        
        // Auto-refresh every 60 seconds
        setTimeout(() => location.reload(), 60000);
    </script>
</body>
</html>
    `;
    
    res.send(html);
});

// API endpoint for JSON data
app.get('/api/realms/:region', async (req, res) => {
    const region = req.params.region;
    if (!['eu', 'us'].includes(region)) {
        return res.status(400).json({ error: 'Invalid region. Use "eu" or "us".' });
    }
    
    const realms = await getRealms(region);
    res.json({
        region,
        total: realms.length,
        online: realms.filter(r => r.online).length,
        offline: realms.filter(r => !r.online).length,
        realms
    });
});

app.listen(PORT, () => {
    console.log(`🎮 WoW Realm Status server running at http://localhost:${PORT}`);
    console.log(`   EU Realms: http://localhost:${PORT}/?region=eu`);
    console.log(`   US Realms: http://localhost:${PORT}/?region=us`);
    console.log(`   API: http://localhost:${PORT}/api/realms/eu`);
});
