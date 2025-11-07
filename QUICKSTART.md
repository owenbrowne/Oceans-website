# ⚡ Quick Start Guide

Get your site running in 60 seconds!

## View Locally

**Option 1: Python (simplest)**
```bash
cd coral-reef-heat-site
python3 -m http.server 8000
```
Open: http://localhost:8000

**Option 2: VS Code**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

## Deploy to GitHub Pages

1. **Create GitHub repo** named `coral-reef-heat-site`

2. **Push your code**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/coral-reef-heat-site.git
git push -u origin main
```

3. **Enable Pages**:
   - Go to Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: **main** / Folder: **/ (root)**
   - Save

4. **Visit**: `https://YOUR_USERNAME.github.io/coral-reef-heat-site/`

Done! 🎉

---

For detailed instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

