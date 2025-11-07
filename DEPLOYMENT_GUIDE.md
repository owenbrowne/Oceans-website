# 🚀 GitHub Pages Deployment Guide

This guide will walk you through deploying your Coral Reefs & Ocean Warming site to GitHub Pages step by step.

## Prerequisites

- Git installed on your computer ([download here](https://git-scm.com/))
- A GitHub account ([sign up here](https://github.com/join))
- Your project files ready in the `coral-reef-heat-site` directory

## Step 1: Create a GitHub Repository

1. **Log in to GitHub** at [github.com](https://github.com)

2. **Click the "+" icon** in the top-right corner and select **"New repository"**

3. **Configure your repository**:
   - **Repository name**: `coral-reef-heat-site`
   - **Description**: "Educational site about ocean warming and coral reef impacts"
   - **Visibility**: Choose "Public" (required for free GitHub Pages)
   - **Do NOT check** "Add a README file" (we already have one)
   - **Do NOT check** "Add .gitignore" (we already have one)
   - **License**: Optional (MIT recommended)

4. **Click "Create repository"**

## Step 2: Connect Your Local Repository to GitHub

The repository is already initialized locally. Now connect it to GitHub:

```bash
# Navigate to your project directory
cd "/Users/owenbrowne/website for oceans/coral-reef-heat-site"

# Add GitHub as the remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/coral-reef-heat-site.git

# Verify the remote was added
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/coral-reef-heat-site.git (fetch)
origin  https://github.com/YOUR_USERNAME/coral-reef-heat-site.git (push)
```

## Step 3: Push Your Code to GitHub

```bash
# Ensure you're on the main branch
git branch -M main

# Push your code
git push -u origin main
```

**You may be prompted to authenticate**:
- If using HTTPS: Enter your GitHub username and [personal access token](https://github.com/settings/tokens)
- If using SSH: Ensure your SSH key is configured

## Step 4: Enable GitHub Pages

1. **Go to your repository** on GitHub:
   ```
   https://github.com/YOUR_USERNAME/coral-reef-heat-site
   ```

2. **Click "Settings"** (tab near the top)

3. **Click "Pages"** in the left sidebar (under "Code and automation")

4. **Configure the source**:
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select "main"
   - **Folder**: Select "/ (root)"
   - **Click "Save"**

5. **Wait for deployment** (usually 1-3 minutes)

## Step 5: Access Your Live Site

Your site will be published at:

```
https://YOUR_USERNAME.github.io/coral-reef-heat-site/
```

**To find your exact URL**:
1. Go to Settings → Pages
2. Look for the green box at the top that says "Your site is live at..."
3. Click the "Visit site" button

## Step 6: Verify Everything Works

Visit your site and check:

- ✅ Page loads without errors
- ✅ Hero image displays
- ✅ Chart renders with data
- ✅ Map displays with markers
- ✅ Popups work on map markers
- ✅ All sections scroll smoothly
- ✅ Links work correctly
- ✅ Site is responsive on mobile

**Open browser DevTools (F12)** and check:
- Console tab: No errors
- Network tab: All resources load (no 404s)

## Step 7: Test on Multiple Devices

Test your site on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- Tablet devices

## Making Updates

Whenever you make changes to your site:

```bash
# 1. Make your changes to files

# 2. Stage the changes
git add .

# 3. Commit with a descriptive message
git commit -m "Update: describe your changes here"

# 4. Push to GitHub
git push origin main
```

GitHub Pages will **automatically rebuild** your site (takes 1-3 minutes).

## Troubleshooting

### Issue: Site shows 404 error

**Solution**:
- Verify GitHub Pages is enabled (Settings → Pages)
- Check that branch is set to "main" and folder to "/ (root)"
- Wait a few more minutes for initial deployment
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Chart or map doesn't load

**Solution**:
- Open browser DevTools (F12) and check Console for errors
- Verify `data/sst_anomalies.json` and `data/reefs.geojson` exist
- Check that file paths are correct (case-sensitive on GitHub Pages)
- Ensure all files were pushed: `git status` should show "working tree clean"

### Issue: Images don't display

**Solution**:
- Verify images exist in the `assets/` folder
- Check file extensions match exactly (case-sensitive)
- Ensure images were committed: `git ls-files assets/`
- Try hard refresh (Ctrl+Shift+R)

### Issue: Styles look broken

**Solution**:
- Verify `styles.css` was pushed: `git ls-files styles.css`
- Check browser DevTools → Network tab for failed CSS load
- Clear browser cache
- Ensure the CSS file path in `index.html` is correct: `href="styles.css"`

### Issue: "Mixed content" warning (HTTP/HTTPS)

**Solution**:
- GitHub Pages uses HTTPS
- Ensure all CDN links in `index.html` use `https://` (not `http://`)
- This is already configured correctly in the template

## Custom Domain (Optional)

To use a custom domain like `coral-reefs.example.com`:

1. **Buy a domain** from a registrar (Namecheap, Google Domains, etc.)

2. **Configure DNS** with your registrar:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`
   - Or add A records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Add custom domain to GitHub**:
   - Settings → Pages → Custom domain
   - Enter your domain
   - Click "Save"
   - Check "Enforce HTTPS" (after DNS propagation)

4. **Wait for DNS propagation** (up to 24 hours)

## Performance Optimization

Once live, run a **Lighthouse audit**:

1. Open site in Chrome
2. Press F12 (DevTools)
3. Click "Lighthouse" tab
4. Select "Desktop" or "Mobile"
5. Click "Generate report"

**Aim for scores of 90+** in all categories.

## Monitoring & Analytics (Optional)

To track visitors:

1. **Google Analytics**:
   - Create account at [analytics.google.com](https://analytics.google.com)
   - Get tracking code
   - Add to `<head>` section of `index.html`

2. **GitHub Traffic**:
   - Go to your repo → Insights → Traffic
   - View visitors, clones, and popular content

## Security Best Practices

- ✅ Use HTTPS (automatic with GitHub Pages)
- ✅ Keep dependencies updated (check CDN versions quarterly)
- ✅ Don't commit sensitive data (API keys, passwords)
- ✅ Review pull requests before merging
- ✅ Enable Dependabot alerts (Settings → Security → Dependabot)

## Need Help?

- **GitHub Pages Documentation**: [docs.github.com/pages](https://docs.github.com/en/pages)
- **GitHub Community**: [github.community](https://github.community)
- **This Project Issues**: Open an issue on the repository

---

**Congratulations!** 🎉 Your site is now live and accessible worldwide!

**Share your URL**:
- On social media with hashtags: #CoralReefs #OceanWarming #ClimateChange
- With educators and students
- With marine conservation organizations

Every visitor is another person learning about coral reef conservation! 🌊🪸

