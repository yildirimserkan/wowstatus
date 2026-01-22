# WoW Realm Status Server

Real-time World of Warcraft server durumlarını gösteren basit web uygulaması.

## Özellikler

- 🟢 Online/Offline göstergesi (yeşil/kırmızı LED)
- 🔍 Realm arama
- 📊 Online/Offline sayısı
- 🌍 EU ve US region desteği
- 🔄 60 saniyede bir auto-refresh
- 📱 Responsive tasarım
- 🎨 WoW temalı dark UI

## Kurulum

```bash
npm install
node server.js
```

## Kullanım

- Web UI: http://localhost:3000
- EU Realms: http://localhost:3000/?region=eu
- US Realms: http://localhost:3000/?region=us
- JSON API: http://localhost:3000/api/realms/eu

## API Response Örneği

```json
{
  "region": "eu",
  "total": 267,
  "online": 265,
  "offline": 2,
  "realms": [
    {
      "name": "Silvermoon",
      "slug": "silvermoon",
      "online": true,
      "type": "normal",
      "population": "full",
      "timezone": "CET"
    }
  ]
}
```

## Notlar

- `wow-realm-status` paketi Blizzard'ın sitesinden scraping yapıyor
- API rate limit'e dikkat (1 dakika cache var)
- API erişilemezse demo data gösterir
