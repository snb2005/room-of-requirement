# GitHub Pages Setup Instructions

## Quick Start

1. **Create a new repository** on GitHub:
   - For user/org site: `username.github.io`
   - For project site: any name (e.g., `technical-blog`)

2. **Upload these files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Technical Notebook"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `main` (or `gh-pages`)
   - Folder: `/ (root)`
   - Click Save

4. **Wait a few minutes** for deployment
   - Your site will be live at `https://username.github.io/repo-name/`

## Custom Domain (Optional)

1. **Create CNAME file** in root:
   ```
   yourdomain.com
   ```

2. **Configure DNS** with your domain provider:
   - Add A records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add CNAME record: `username.github.io`

3. **Enable custom domain** in repository settings

## Local Testing

Simply open `index.html` in a browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with npx)
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Adding New Posts

1. Create HTML file in `posts/` directory
2. Copy structure from existing sample posts
3. Update category page (math.html, cs.html, or cp.html)
4. Update index.html with post preview
5. Commit and push

## Automatic Deployment

GitHub Pages automatically rebuilds when you push to the configured branch.
No build process needed - pure static HTML/CSS/JS.

## Troubleshooting

- **404 errors**: Check that files are in the root directory
- **Styles not loading**: Verify CSS paths are relative
- **Math not rendering**: Check browser console for KaTeX errors
- **Dark mode not persisting**: Ensure localStorage is enabled

## Performance Tips

- KaTeX loads from CDN (fast, cached)
- Images: Convert to WebP format
- Keep individual pages under 1MB
- Use browser caching headers (GitHub Pages does this automatically)

## SEO

Add to `<head>` of each page:
```html
<meta name="description" content="Your page description">
<meta name="keywords" content="mathematics, computer science, algorithms">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="URL to image">
<meta name="twitter:card" content="summary">
```

## Analytics (Optional)

Add Google Analytics by including this before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## License

This is a personal blog template. Use freely for your own technical writing.
