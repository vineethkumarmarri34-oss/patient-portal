# Deployment Guide: Patient Portal Analytics Dashboard

Complete step-by-step guide for deploying to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed locally
- Node.js 16+ and npm/yarn installed
- Your project code ready

## 🚀 Quick Deploy (5 Minutes)

### Option 1: Automated Deploy

Run these commands in your frontend directory:

```bash
# 1. Install gh-pages
yarn add --dev gh-pages

# 2. Add homepage to package.json (replace with your info)
npm pkg set homepage="https://YOUR-USERNAME.github.io/YOUR-REPO-NAME"

# 3. Add deploy scripts
npm pkg set scripts.predeploy="yarn build"
npm pkg set scripts.deploy="gh-pages -d build"

# 4. Deploy!
yarn deploy
```

### Option 2: Manual Setup

Follow detailed steps below.

## 📝 Detailed Step-by-Step Guide

### Step 1: Prepare Your Repository

#### 1.1 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `patient-portal-dashboard` (or your choice)
3. Description: "Healthcare analytics dashboard for patient engagement"
4. Make it Public (required for free GitHub Pages)
5. Click "Create repository"

#### 1.2 Initialize Git (if not already done)

```bash
cd frontend
git init
git add .
git commit -m "Initial commit: Patient Portal Analytics Dashboard"
```

#### 1.3 Connect to GitHub

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 2: Configure for GitHub Pages

#### 2.1 Update package.json

Add homepage field at the top level:

```json
{
  "name": "patient-portal-dashboard",
  "version": "1.0.0",
  "homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME",
  "private": true,
  "dependencies": {
    ...
  }
}
```

**Important**: Replace:
- `YOUR-USERNAME` with your GitHub username
- `YOUR-REPO-NAME` with your repository name

Example:
```json
"homepage": "https://johndoe.github.io/patient-portal-dashboard"
```

#### 2.2 Install gh-pages Package

```bash
yarn add --dev gh-pages
# or
npm install --save-dev gh-pages
```

#### 2.3 Add Deploy Scripts

In `package.json`, add these to the `"scripts"` section:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "predeploy": "yarn build",
  "deploy": "gh-pages -d build"
}
```

### Step 3: Build and Deploy

#### 3.1 Test Build Locally

First, ensure your build works:

```bash
yarn build
# or
npm run build
```

Check for errors. The build folder should be created.

#### 3.2 Deploy to GitHub Pages

```bash
yarn deploy
# or
npm run deploy
```

This will:
1. Run `predeploy` (builds your app)
2. Create a `gh-pages` branch (if it doesn't exist)
3. Push the `build` folder contents to `gh-pages` branch
4. Output: "Published"

### Step 4: Enable GitHub Pages

#### 4.1 Configure Repository Settings

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source":
   - Branch: Select `gh-pages`
   - Folder: Select `/ (root)`
5. Click **Save**

#### 4.2 Wait for Deployment

- GitHub will show: "Your site is ready to be published at..."
- Wait 2-5 minutes for first deployment
- Refresh the page to see: "Your site is live at..."

#### 4.3 Access Your Dashboard

Your dashboard will be available at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME
```

## 🔄 Updating Your Deployment

Whenever you make changes:

```bash
# 1. Commit your changes
git add .
git commit -m "Update: description of changes"
git push origin main

# 2. Redeploy
yarn deploy
```

Changes will be live in 1-2 minutes.

## ⚙️ Advanced Configuration

### Custom Domain (Optional)

#### Step 1: Add CNAME File

Create `public/CNAME` with your domain:
```
yourdomain.com
```

#### Step 2: Configure DNS

Add these DNS records with your domain provider:

**For apex domain (yourdomain.com):**
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

**For subdomain (www.yourdomain.com):**
```
CNAME  www   YOUR-USERNAME.github.io
```

#### Step 3: Update Repository Settings

1. Go to Settings > Pages
2. Custom domain: Enter your domain
3. Check "Enforce HTTPS"
4. Wait 24 hours for DNS propagation

### Environment Variables

For different environments:

**Create `.env.production`:**
```env
REACT_APP_TITLE=Patient Portal Analytics
REACT_APP_API_URL=https://api.yourdomain.com
```

**Use in code:**
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

### basename for React Router

If routes don't work after deployment, update `App.js`:

```javascript
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {/* Your routes */}
    </Router>
  );
}
```

### Fix 404 on Page Refresh

Create `public/404.html` (copy of `public/index.html`):

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Patient Portal Analytics</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

## 🐛 Troubleshooting

### Issue 1: Blank Page After Deploy

**Symptoms**: Site loads but shows blank white page

**Solution**:
1. Check `homepage` in `package.json` matches GitHub Pages URL exactly
2. Clear browser cache (Ctrl+Shift+R)
3. Check browser console for errors
4. Verify all imports use correct casing (case-sensitive)

**Verify homepage:**
```json
// ✅ Correct
"homepage": "https://username.github.io/repo-name"

// ❌ Wrong
"homepage": "https://username.github.io/repo-name/"
"homepage": "https://username.github.io"
```

### Issue 2: 404 Error

**Symptoms**: "404 - File not found"

**Solutions**:
1. Wait 5 minutes (initial deploy takes time)
2. Check gh-pages branch exists: `git branch -a`
3. Verify Pages settings point to `gh-pages` branch
4. Redeploy: `yarn deploy`

### Issue 3: CSS/Assets Not Loading

**Symptoms**: No styling, broken images

**Solutions**:
1. Ensure `homepage` is set in package.json
2. Use `PUBLIC_URL` for static assets:
   ```jsx
   <img src={`${process.env.PUBLIC_URL}/logo.png`} />
   ```
3. Check network tab in browser DevTools

### Issue 4: "gh-pages" Command Not Found

**Solution**:
```bash
# Reinstall gh-pages
yarn add --dev gh-pages
# or
npm install --save-dev gh-pages

# Then deploy again
yarn deploy
```

### Issue 5: Permission Denied

**Symptoms**: "Permission denied (publickey)"

**Solution**:
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/USERNAME/REPO.git

# Or set up SSH keys
ssh-keygen -t ed25519 -C "your_email@example.com"
# Add to GitHub: Settings > SSH and GPG keys
```

### Issue 6: Build Fails

**Symptoms**: Build errors during deployment

**Solutions**:
1. Check for TypeScript errors
2. Fix all ESLint warnings
3. Ensure all dependencies are installed
4. Test build locally first: `yarn build`

### Issue 7: Routes Don't Work

**Symptoms**: Direct URLs show 404

**Solutions**:
1. Add 404.html (see above)
2. Use HashRouter instead:
   ```javascript
   import { HashRouter } from 'react-router-dom';
   ```

## 📊 Monitoring Deployment

### Check Build Status

1. Go to repository **Actions** tab
2. See "pages build and deployment" workflow
3. Green check = success, Red X = failed

### View Deployment Logs

```bash
# In your terminal after deploy
yarn deploy --verbose
```

### Check Live Site

Open browser DevTools (F12):
- **Console**: Check for JavaScript errors
- **Network**: Verify all files load (200 status)
- **Application**: Check LocalStorage works

## 🔐 Security Best Practices

1. **Never commit sensitive data**:
   - Add `.env` to `.gitignore`
   - Use GitHub Secrets for API keys

2. **Enable HTTPS** (automatic with GitHub Pages)

3. **Add security headers** in `public/index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'">
```

## 📈 Performance Tips

1. **Optimize Build Size**:
```bash
# Analyze bundle
yarn build
source-map-explorer 'build/static/js/*.js'
```

2. **Enable Compression**: GitHub Pages automatically gzips files

3. **Lazy Load Routes**:
```javascript
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

4. **Use Production Build**: `yarn build` automatically optimizes

## 🔄 CI/CD with GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: yarn install
      
    - name: Build
      run: yarn build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

Now every push to `main` automatically deploys!

## 📱 Alternative Hosting Options

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

## ✅ Deployment Checklist

Before deploying:

- [ ] All features tested locally
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Demo credentials documented
- [ ] README.md updated
- [ ] .gitignore includes node_modules, .env
- [ ] package.json has correct homepage
- [ ] Build succeeds locally
- [ ] All sensitive data removed
- [ ] Links and routes work

## 🎉 Success!

Your dashboard is now live!

Share your link:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME
```

**Next Steps**:
- Share on LinkedIn/Twitter
- Add to your portfolio
- Get feedback from users
- Keep improving!

---

**Need Help?** Check GitHub Pages documentation: https://docs.github.com/en/pages
