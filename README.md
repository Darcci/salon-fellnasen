# 🐾 Fellnasen Website

Eine moderne, responsive Website für die Präsentation von Fellnasen-Inhalten.

## 🚀 Technologien

- **HTML5** - Semantische Struktur
- **CSS3** - Modernes Styling mit Flexbox/Grid
- **JavaScript (Vanilla)** - Interaktive Funktionen
- **SVG Assets** - Skalierbare Grafiken

## 📁 Projektstruktur

```
├── index.html          # Hauptseite
├── impressum.html      # Impressum
├── 404.html           # Fehlerseite
├── styles.css         # Haupt-Stylesheet
├── script.js          # JavaScript-Funktionalität
├── .htaccess          # Apache-Konfiguration
├── robots.txt         # Suchmaschinen-Anweisungen
├── sitemap.xml        # Sitemap für SEO
├── favicon.png        # Website-Icon
├── logo.png          # Logo
├── hero-bg.png       # Hero-Hintergrundbild
├── 404.png           # 404-Fehlerseiten-Bild
└── *.svg             # SVG-Assets (Bilder, Icons)
```

## 🛠️ Setup & Development

### Lokale Entwicklung

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd fellnasen-website
   ```

2. **Live Server starten**
   - Mit VS Code Live Server Extension
   - Oder mit Python: `python -m http.server 8000`
   - Oder mit Node.js: `npx http-server`

3. **Website öffnen**
   - Öffne `http://localhost:8000` im Browser

### Datei-Bearbeitung

- **HTML**: Strukturelle Änderungen in `index.html`
- **Styling**: CSS-Anpassungen in `styles.css`
- **Interaktivität**: JavaScript in `script.js`
- **Assets**: Bilder im Root-Verzeichnis

## 🚢 Deployment

### Via FTP/SFTP
1. Alle Dateien auf den Webserver hochladen
2. Sicherstellen, dass `.htaccess` korrekt übertragen wird

### Via Git (wenn Server unterstützt)
```bash
git push origin main
# Automatisches Deployment je nach Server-Setup
```

## 📱 Features

- ✅ Responsive Design
- ✅ SEO-optimiert (Sitemap, robots.txt)
- ✅ 404-Fehlerseite
- ✅ Apache .htaccess Konfiguration
- ✅ Optimierte Assets (SVG, PNG)

## 🎨 Anpassungen

### Farben & Styling
Haupt-Farben und Styles werden in `styles.css` definiert.

### Bilder austauschen
- SVG-Dateien: Direkt ersetzen
- PNG-Dateien: Optimiert für Web verwenden

### Content Updates
Texte und Inhalte direkt in den HTML-Dateien bearbeiten.

## 📊 Performance

- Optimierte Bilder (SVG für Vektorgrafiken)
- Minimaler JavaScript-Footprint
- CSS-Grid & Flexbox für moderne Layouts
- Semantic HTML für Accessibility

## 🐛 Troubleshooting

### Häufige Probleme:
- **Bilder laden nicht**: Pfade in HTML/CSS prüfen
- **Styles nicht angewendet**: CSS-Cache leeren
- **404-Seite funktioniert nicht**: .htaccess Berechtigung prüfen

## 📄 Lizenz

Alle Rechte vorbehalten. Fellnasen Website © 2025

---

*Made with 💻 und ☕ für die Fellnasen* 