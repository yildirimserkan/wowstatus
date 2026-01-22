const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Demo data - replace with Battle.net API later
function getDemoData(region) {
    const euRealms = [
        { name: 'Aegwynn', online: true, type: 'pvp', population: 'medium', timezone: 'CET' },
        { name: 'Aerie Peak', online: true, type: 'normal', population: 'high', timezone: 'CET' },
        { name: 'Aggramar', online: true, type: 'normal', population: 'high', timezone: 'CET' },
        { name: 'Antonidas', online: true, type: 'normal', population: 'full', timezone: 'CET' },
        { name: 'Argent Dawn', online: true, type: 'rp', population: 'full', timezone: 'CET' },
        { name: 'Arthas', online: true, type: 'pvp', population: 'medium', timezone: 'CET' },
        { name: 'Azjol-Nerub', online: false, type: 'normal', population: 'low', timezone: 'CET' },
        { name: 'Blackhand', online: true, type: 'pvp', population: 'high', timezone: 'CET' },
        { name: 'Blackmoore', online: true, type: 'pvp', population: 'full', timezone: 'CET' },
        { name: 'Blackrock', online: true, type: 'pvp', population: 'high', timezone: 'CET' },
        { name: 'Burning Legion', online: true, type: 'pvp', population: 'medium', timezone: 'CET' },
        { name: 'Chamber of Aspects', online: true, type: 'normal', population: 'medium', timezone: 'CET' },
        { name: 'Doomhammer', online: true, type: 'normal', population: 'high', timezone: 'CET' },
        { name: 'Draenor', online: true, type: 'normal', population: 'full', timezone: 'CET' },
        { name: 'Dragonblight', online: false, type: 'normal', population: 'medium', timezone: 'CET' },
        { name: 'Earthen Ring', online: true, type: 'rp', population: 'medium', timezone: 'CET' },
        { name: 'Emerald Dream', online: true, type: 'rp', population: 'medium', timezone: 'CET' },
        { name: 'Frostmane', online: true, type: 'pvp', population: 'medium', timezone: 'CET' },
        { name: 'Hellscream', online: true, type: 'normal', population: 'high', timezone: 'CET' },
        { name: 'Kazzak', online: true, type: 'pvp', population: 'full', timezone: 'CET' },
        { name: 'Kel\'Thuzad', online: true, type: 'pvp', population: 'medium', timezone: 'CET' },
        { name: 'Lightbringer', online: true, type: 'normal', population: 'high', timezone: 'CET' },
        { name: 'Magtheridon', online: true, type: 'pvp', population: 'medium', timezone: 'CET' },
        { name: 'Outland', online: true, type: 'pvp', population: 'full', timezone: 'CET' },
        { name: 'Ragnaros', online: true, type: 'pvp', population: 'high', timezone: 'CET' },
        { name: 'Ravencrest', online: true, type: 'pvp', population: 'full', timezone: 'CET' },
        { name: 'Silvermoon', online: true, type: 'normal', population: 'full', timezone: 'CET' },
        { name: 'Stormrage', online: true, type: 'normal', population: 'high', timezone: 'CET' },
        { name: 'Stormscale', online: true, type: 'pvp', population: 'high', timezone: 'CET' },
        { name: 'Tarren Mill', online: true, type: 'pvp', population: 'full', timezone: 'CET' },
        { name: 'Thunderhorn', online: true, type: 'normal', population: 'medium', timezone: 'CET' },
        { name: 'Twisting Nether', online: true, type: 'pvp', population: 'full', timezone: 'CET' },
    ];
    
    const usRealms = [
        { name: 'Aegwynn', online: true, type: 'pvp', population: 'low', timezone: 'CST' },
        { name: 'Aerie Peak', online: true, type: 'normal', population: 'high', timezone: 'PST' },
        { name: 'Area 52', online: true, type: 'normal', population: 'full', timezone: 'EST' },
        { name: 'Arthas', online: true, type: 'pvp', population: 'high', timezone: 'EST' },
        { name: 'Azralon', online: true, type: 'pvp', population: 'full', timezone: 'BRT' },
        { name: 'Barthilas', online: true, type: 'pvp', population: 'full', timezone: 'AEST' },
        { name: 'Bleeding Hollow', online: true, type: 'pvp', population: 'high', timezone: 'EST' },
        { name: 'Dalaran', online: true, type: 'normal', population: 'high', timezone: 'EST' },
        { name: 'Emerald Dream', online: true, type: 'rppvp', population: 'high', timezone: 'CST' },
        { name: 'Frostmourne', online: true, type: 'pvp', population: 'full', timezone: 'AEST' },
        { name: 'Illidan', online: true, type: 'pvp', population: 'full', timezone: 'CST' },
        { name: 'Kel\'Thuzad', online: false, type: 'pvp', population: 'high', timezone: 'MST' },
        { name: 'Mal\'Ganis', online: true, type: 'pvp', population: 'full', timezone: 'CST' },
        { name: 'Moon Guard', online: true, type: 'rp', population: 'full', timezone: 'CST' },
        { name: 'Proudmoore', online: true, type: 'normal', population: 'full', timezone: 'PST' },
        { name: 'Ragnaros', online: true, type: 'pvp', population: 'full', timezone: 'CST' },
        { name: 'Sargeras', online: true, type: 'pvp', population: 'full', timezone: 'CST' },
        { name: 'Stormrage', online: true, type: 'normal', population: 'full', timezone: 'EST' },
        { name: 'Thrall', online: true, type: 'normal', population: 'full', timezone: 'EST' },
        { name: 'Tichondrius', online: true, type: 'pvp', population: 'full', timezone: 'PST' },
        { name: 'Wyrmrest Accord', online: true, type: 'rp', population: 'high', timezone: 'PST' },
        { name: 'Zul\'jin', online: true, type: 'normal', population: 'full', timezone: 'EST' },
    ];
    
    return region === 'eu' ? euRealms : usRealms;
}

app.get('/', async (req, res) => {
    const region = req.query.region || 'eu';
    const realms = getDemoData(region);
    
    realms.sort((a, b) => a.name.localeCompare(b.name));
    
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
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            min-height: 100vh;
            color: #fff;
            padding: 20px;
        }
        .container { max-width: 1400px; margin: 0 auto; }
        header { text-align: center; margin-bottom: 30px; }
        h1 { font-size: 2.5rem; color: #ffd700; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); margin-bottom: 10px; }
        .region-selector { margin: 20px 0; }
        .region-selector a {
            display: inline-block; padding: 10px 30px; margin: 0 10px;
            background: ${region === 'eu' ? '#ffd700' : 'rgba(255,255,255,0.1)'};
            color: ${region === 'eu' ? '#1a1a2e' : '#fff'};
            text-decoration: none; border-radius: 25px; font-weight: bold;
        }
        .region-selector a:last-child {
            background: ${region === 'us' ? '#ffd700' : 'rgba(255,255,255,0.1)'};
            color: ${region === 'us' ? '#1a1a2e' : '#fff'};
        }
        .stats { display: flex; justify-content: center; gap: 40px; margin-bottom: 30px; }
        .stat-box { padding: 15px 40px; border-radius: 10px; text-align: center; }
        .stat-box.online { background: rgba(0, 255, 0, 0.2); border: 2px solid #00ff00; }
        .stat-box.offline { background: rgba(255, 0, 0, 0.2); border: 2px solid #ff0000; }
        .stat-number { font-size: 2rem; font-weight: bold; }
        .stat-label { font-size: 0.9rem; opacity: 0.8; }
        .search-box { text-align: center; margin-bottom: 20px; }
        .search-box input {
            padding: 12px 25px; width: 300px; border: none; border-radius: 25px;
            font-size: 1rem; background: rgba(255,255,255,0.1); color: #fff; outline: none;
        }
        .search-box input::placeholder { color: rgba(255,255,255,0.5); }
        .realms-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; }
        .realm-card {
            background: rgba(255,255,255,0.05); border-radius: 10px; padding: 15px 20px;
            display: flex; align-items: center; gap: 15px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .realm-card:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
        .status-indicator { width: 16px; height: 16px; border-radius: 50%; }
        .status-indicator.online { background: #00ff00; box-shadow: 0 0 10px #00ff00; }
        .status-indicator.offline { background: #ff0000; box-shadow: 0 0 10px #ff0000; }
        .realm-info { flex-grow: 1; }
        .realm-name { font-weight: bold; font-size: 1.1rem; }
        .realm-meta { font-size: 0.8rem; opacity: 0.7; margin-top: 3px; }
        .realm-population { padding: 3px 10px; border-radius: 15px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; }
        .pop-full { background: #ff4444; }
        .pop-high { background: #ff8800; }
        .pop-medium { background: #ffcc00; color: #333; }
        .pop-low { background: #44aa44; }
        .last-update { text-align: center; margin-top: 30px; opacity: 0.6; font-size: 0.9rem; }
        .hidden { display: none !important; }
        .demo-notice { text-align: center; background: rgba(255,215,0,0.1); border: 1px solid #ffd700; padding: 10px; border-radius: 10px; margin-bottom: 20px; }
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
        <div class="demo-notice">⚠️ Demo Mode - Sample data shown. Add Battle.net API for live status.</div>
        <div class="stats">
            <div class="stat-box online"><div class="stat-number">${online}</div><div class="stat-label">Online</div></div>
            <div class="stat-box offline"><div class="stat-number">${offline}</div><div class="stat-label">Offline</div></div>
        </div>
        <div class="search-box"><input type="text" id="search" placeholder="Search realms..." onkeyup="filterRealms()"></div>
        <div class="realms-grid">
            ${realms.map(r => `
                <div class="realm-card" data-name="${r.name.toLowerCase()}">
                    <div class="status-indicator ${r.online ? 'online' : 'offline'}"></div>
                    <div class="realm-info">
                        <div class="realm-name">${r.name}</div>
                        <div class="realm-meta">${r.type.toUpperCase()} • ${r.timezone}</div>
                    </div>
                    <span class="realm-population pop-${r.population}">${r.population}</span>
                </div>
            `).join('')}
        </div>
        <div class="last-update">Last updated: ${new Date().toLocaleString()}</div>
    </div>
    <script>
        function filterRealms() {
            const s = document.getElementById('search').value.toLowerCase();
            document.querySelectorAll('.realm-card').forEach(c => c.classList.toggle('hidden', !c.dataset.name.includes(s)));
        }
    </script>
</body>
</html>`;
    res.send(html);
});

app.get('/api/realms/:region', (req, res) => {
    const region = req.params.region;
    if (!['eu', 'us'].includes(region)) return res.status(400).json({ error: 'Invalid region' });
    const realms = getDemoData(region);
    res.json({ region, total: realms.length, online: realms.filter(r => r.online).length, offline: realms.filter(r => !r.online).length, realms });
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
