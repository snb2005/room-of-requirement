# Technical Notebook

A minimalistic technical blog for Mathematics, Computer Science, and Competitive Programming with full LaTeX support and a subtle enchanted parchment aesthetic.

**Write in Markdown with LaTeX. Hugo builds to HTML. Deploy automatically.**

## Quick Start

```bash
# Install Hugo (if not already installed)
sudo apt install hugo

# Create a new post
hugo new math/topic-name.md

# Preview locally with live reload
./preview.sh
# Or: hugo server --buildDrafts

# Build for production
./build.sh
# Or: hugo --minify
```

Visit `http://localhost:1313` to preview. Edit Markdown files in `content/`, and Hugo automatically rebuilds.

## Features

### Technical Capabilities
- **Markdown Authoring**: Write posts in Markdown, not raw HTML
- **Full LaTeX Support**: KaTeX for fast mathematical typesetting with `$...$` and `$$...$$`
- **Hugo Shortcodes**: Clean syntax for theorems, proofs, algorithms, and more
- **Math Environments**: 12 shortcodes (theorem, lemma, definition, proof, etc.)
- **Auto Syntax Highlighting**: Hugo's Chroma highlighter for all major languages
- **Automatic Deployment**: GitHub Actions builds and publishes on push

### Visual Design
- **Parchment Theme**: Aged parchment aesthetic (#f6efe3) with scholarly typography
- **Academic Typography**: EB Garamond for headings, Lora for body, JetBrains Mono for code
- **Dark Mode**: Charcoal theme with golden text, persists via localStorage
- **Responsive Design**: Mobile-friendly and tablet-optimized
- **Subtle Animations**: Gentle transitions and fade-ins

### Interactive Features
- **Dark Mode Toggle**: Press Alt+D or use the button
- **Copy Code Blocks**: Hover over code to reveal copy button
- **Live Reload**: Preview updates instantly as you write
- **Keyboard Shortcuts**: Alt+D (dark mode), Alt+H (home)
- **Accessibility**: Skip links, ARIA labels, semantic HTML

## Project Structure

```
room-of-requirement/
├── hugo.toml                    # Hugo configuration
├── content/                     # Markdown source files
│   ├── math/                    # Mathematics posts
│   │   └── prime-number-theorem.md
│   ├── cs/                      # Computer Science posts
│   │   └── btrees-database-indexing.md
│   ├── cp/                      # Competitive Programming posts
│   │   └── tree-dynamic-programming.md
│   └── about/                   # About page
│       └── _index.md
├── layouts/                     # Hugo templates
│   ├── _default/
│   │   ├── baseof.html         # Base template
│   │   ├── single.html         # Single post layout
│   │   └── list.html           # Category listing
│   ├── index.html              # Homepage
│   ├── partials/
│   │   ├── header.html
│   │   └── footer.html
│   └── shortcodes/             # Hugo shortcodes
│       ├── theorem.html
│       ├── proof.html
│       ├── lemma.html
│       ├── definition.html
│       └── ...                 # 12 shortcodes total
├── static/                      # Static assets
│   ├── css/
│   │   ├── main.css            # Core parchment theme
│   │   ├── math.css            # Math environment styling
│   │   ├── code.css            # Syntax highlighting
│   │   └── post.css            # Post-specific styles
│   └── js/
│       └── main.js             # Dark mode, copy buttons, KaTeX
├── archetypes/
│   └── default.md              # New post template
├── build.sh                    # Build script
├── preview.sh                  # Preview script
└── .github/workflows/
    └── hugo.yml                # GitHub Actions deployment
```

## Writing Posts

### Create New Post

```bash
# Mathematics post
hugo new math/your-topic.md

# Computer Science post
hugo new cs/algorithm-name.md

# Competitive Programming post
hugo new cp/problem-solution.md
```

This creates a Markdown file with pre-filled frontmatter in the appropriate `content/` subdirectory.

### Frontmatter

Every post starts with YAML metadata:

```yaml
---
title: "The Prime Number Theorem"
date: 2026-03-01
draft: false              # Set to false to publish
math: true                # Enable KaTeX rendering
categories: ["math"]      # math, cs, or cp
tags: ["Number Theory", "Analysis"]
abstract: "Brief description shown on homepage"
---
```

### Writing Content

Write in Markdown with LaTeX math:

```markdown
The Prime Number Theorem states that $\pi(x) \sim \frac{x}{\log x}$, where 
$\pi(x)$ is the number of primes less than or equal to $x$.

This means that for large $x$:

$$\lim_{x \to \infty} \frac{\pi(x) \log x}{x} = 1$$
```

## Hugo Shortcodes

### Mathematical Environments

**Theorem:**
```markdown
{{</* theorem number="1" name="Pythagorean Theorem" */>}}
In a right triangle with legs $a$ and $b$ and hypotenuse $c$,

$$a^2 + b^2 = c^2$$
{{</* /theorem */>}}
```

**Proof:**
```markdown
{{</* proof */>}}
We proceed by induction...

Therefore the result holds.
{{</* /proof */>}}
```

**Other Environments:**
- `lemma` - Lemmas with olive border
- `definition` - Definitions with brown border  
- `corollary` - Corollaries with teal border
- `proposition` - Propositions with purple border
- `remark` - Remarks with subtle styling
- `example` - Examples with numbering

All support `number="1"` and `name="Name"` parameters (both optional).

**Numbered Equations:**
```markdown
{{</* equation 1 */>}}
$$E = mc^2$$
{{</* /equation */>}}
```

### Competitive Programming Features

**Input/Output Examples:**
```markdown
{{</* io type="input" label="Input" */>}}
5
1 2 3 4 5
{{</* /io */>}}

{{</* io type="output" label="Output" */>}}
15
{{</* /io */>}}
```

**Complexity Analysis:**
```markdown
{{</* complexity */>}}
**Time Complexity:** $O(n \log n)$  
**Space Complexity:** $O(n)$
{{</* /complexity */>}}
```

**Algorithm Pseudocode:**
```markdown
{{</* algorithm title="Binary Search" */>}}
1. Set left ← 1, right ← n
2. **while** left ≤ right **do**
3.     mid ← ⌊(left + right)/2⌋
4.     **return** mid if A[mid] = x
{{</* /algorithm */>}}
```

### Code Blocks

Use standard Markdown fenced code blocks:

````markdown
```python
def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)
```
````

Hugo automatically adds syntax highlighting via Chroma.

## LaTeX Support

### Inline Math
Use single dollar signs: `$x^2 + y^2 = z^2$`

### Display Math
Use double dollar signs:
```markdown
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

### Pre-configured Macros
Defined in `static/js/main.js`:
- `\RR`, `\NN`, `\ZZ`, `\QQ`, `\CC` - Number sets
- `\abs{x}` - Absolute value: $|x|$
- `\norm{x}` - Norm: $\|x\|$
- `\floor{x}`, `\ceil{x}` - Floor and ceiling
- `\set{x}` - Set notation: $\{x\}$

All standard KaTeX commands work. See: https://katex.org/docs/supported.html

## Build and Preview

### Local Development

```bash
# Start Hugo development server with live reload
./preview.sh

# Or manually:
hugo server --buildDrafts

# Access at: http://localhost:1313
```

The server watches for file changes and automatically rebuilds. Drafts (`draft: true`) are included in preview but not in production builds.

### Production Build

```bash
# Clean build with minification
./build.sh

# Or manually:
hugo --minify

# Output: public/ directory
```

The `public/` directory contains the complete static site ready for deployment.

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically builds and deploys on every push to `main`.

**Setup:**

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Hugo technical notebook"
   git branch -M main
   git remote add origin https://github.com/username/your-repo.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will automatically deploy on next push

3. **Done!** Your site will be available at:
   - `https://username.github.io/your-repo/` (project site)
   - `https://username.github.io/` (if repo named `username.github.io`)

**Workflow File:** `.github/workflows/hugo.yml`

The workflow:
- Triggers on push to `main` branch
- Installs Hugo
- Builds the site with `hugo --minify`
- Deploys to GitHub Pages
- Takes ~1-2 minutes to complete

### Manual Deployment

If you prefer manual deployment:

```bash
# Build site
hugo --minify

# Deploy public/ directory to GitHub Pages branch
cd public
git init
git add .
git commit -m "Deploy"
git push -f origin main:gh-pages
```

### Custom Domain

To use a custom domain:

1. Add `baseURL = "https://yourdomain.com"` in `hugo.toml`
2. Create `static/CNAME` file with your domain
3. Configure DNS with your domain provider

## Customization

### Site Configuration

Edit `hugo.toml`:

```toml
baseURL = "https://yourusername.github.io/your-repo/"
title = "Your Site Title"
languageCode = "en-us"

[params]
description = "Your site description"
author = "Your Name"
```

### Colors

Edit CSS variables in `static/css/main.css`:

```css
:root {
    --parchment-bg: #f6efe3;      /* Background */
    --accent-color: #3d5c4f;       /* Links and accents */
    --ink-brown: #4a3a2a;          /* Primary text */
    --charcoal: #1f1f1f;           /* Dark mode background */
}
```

### Typography

Change fonts in `static/css/main.css`:

```css
--font-heading: 'EB Garamond', serif;
--font-body: 'Lora', serif;
--font-mono: 'JetBrains Mono', monospace;
```

Update the Google Fonts link in `layouts/_default/baseof.html` if you change fonts.

### Layout Width

Adjust content width in `static/css/main.css`:

```css
--content-width: 720px;  /* Change to desired width */
```

### Menu Items

Edit navigation in `hugo.toml`:

```toml
[[menu.main]]
name = "Mathematics"
url = "/math/"
weight = 1

[[menu.main]]
name = "CS"
url = "/cs/"
weight = 2
```

## Hugo Configuration Details

Key settings in `hugo.toml`:

```toml
[markup.goldmark.renderer]
unsafe = true  # Allow raw HTML in Markdown

[markup.highlight]
style = "monokai"  # Syntax highlighting theme
lineNos = false
noClasses = false

[markup.goldmark.extensions]
typographer = true  # Smart quotes
```

## Writing Tips

See [WRITING-GUIDE.md](WRITING-GUIDE.md) for comprehensive documentation including:
- Complete shortcode reference with examples
- Mathematical writing best practices
- Code block styling
- Post structure templates
- Workflow tips

## Performance

- **Fast Builds**: Hugo builds 23 pages in ~70ms
- **Live Reload**: Instant preview updates (<100ms)
- **Minimal Output**: Optimized HTML/CSS/JS
- **CDN Assets**: KaTeX loaded from fast CDN
- **Static Site**: No server-side processing

## Browser Support

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **KaTeX**: Works in all browsers with JavaScript enabled
- **Dark Mode**: Persists across sessions via localStorage
- **Progressive Enhancement**: Core content works without JS

## Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Skip to content link (Tab key)
- Keyboard navigation (Alt+D, Alt+H)
- High contrast ratios in both themes
- KaTeX accessible math rendering

## Tech Stack

- **[Hugo](https://gohugo.io/)** v0.123.7+ - Static site generator
- **[KaTeX](https://katex.org/)** v0.16.9 - Math typesetting
- **[Chroma](https://github.com/alecthomas/chroma)** - Syntax highlighting (built into Hugo)
- **[Goldmark](https://github.com/yuin/goldmark)** - Markdown parser (Hugo's default)
- **HTML5/CSS3/JavaScript** - No frameworks, pure web standards

## Example Posts

The repository includes three complete example posts:

1. **[Prime Number Theorem](content/math/prime-number-theorem.md)** - Mathematics post with theorems, proofs, and complex LaTeX
2. **[B-Trees and Database Indexing](content/cs/btrees-database-indexing.md)** - CS post with algorithms and Python code
3. **[Tree Dynamic Programming](content/cp/tree-dynamic-programming.md)** - CP post with C++ implementation and complexity analysis

Preview these to see how shortcodes, math, and code blocks render.

## Troubleshooting

### Build Fails

**Check Hugo version:**
```bash
hugo version
# Should be v0.123.0 or higher
```

**Common issues:**
- Unclosed shortcodes: Every `{{</* shortcode */>}}` needs `{{</* /shortcode */>}}`
- YAML syntax errors in frontmatter
- Unescaped special characters in content

**Get detailed errors:**
```bash
hugo --buildDrafts --verbose
```

### Math Not Rendering

- Ensure `math: true` in frontmatter
- Check browser console for KaTeX errors
- Verify math delimiters: `$...$` for inline, `$$...$$` for display
- Escape underscores in regular text: `\_`

### Dark Mode Not Working

- Clear browser localStorage: `localStorage.clear()` in console
- Check JavaScript is enabled
- Verify `static/js/main.js` is loaded

### GitHub Actions Deployment Fails

- Check workflow file: `.github/workflows/hugo.yml`
- Verify Pages is enabled in repo settings
- Check build logs in Actions tab
- Ensure `baseURL` in `hugo.toml` matches your GitHub Pages URL

## Migration from HTML

If you have an existing HTML-based blog and want to migrate:

1. Convert HTML posts to Markdown
2. Replace `<div class="theorem">` with shortcodes `{{</* theorem */>}}`
3. Move inline styles to CSS
4. Update internal links to use Hugo's relative URL syntax

The `old-html/` directory contains the original HTML files for reference.

## Contributing

Feel free to:
- Report bugs or issues
- Suggest new shortcodes or features  
- Improve documentation
- Share your customizations

## License

Free to use and modify for personal or educational purposes.

## Credits

- **[Hugo](https://gohugo.io/)** - The world's fastest static site generator
- **[KaTeX](https://katex.org/)** - Fast math typesetting by Khan Academy
- **[Google Fonts](https://fonts.google.com/)** - EB Garamond, Lora, JetBrains Mono
- **Design** - Custom parchment theme inspired by academic notebooks

## Resources

- **Hugo Documentation**: https://gohugo.io/documentation/
- **KaTeX Supported Functions**: https://katex.org/docs/supported.html
- **Markdown Guide**: https://www.markdownguide.org/
- **Shortcode Reference**: See [WRITING-GUIDE.md](WRITING-GUIDE.md)

---

**Write content in Markdown. Hugo handles the rest.**
