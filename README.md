# Technical Notebook

A minimalistic technical blog for Mathematics, Computer Science, and Competitive Programming with full LaTeX support and a subtle enchanted parchment aesthetic.

## Features

### Technical Capabilities
- **Full LaTeX Support**: KaTeX for fast mathematical typesetting
- **Math Environments**: Theorems, lemmas, definitions, proofs with automatic formatting
- **Equation Numbering**: Inline and display math with numbered equations
- **Syntax Highlighting**: Clean code blocks for C++, Python, Java, and more
- **Responsive Design**: Mobile-friendly and tablet-optimized

### Visual Design
- **Parchment Theme**: Aged parchment aesthetic (#f6efe3) with scholarly typography
- **Academic Typography**: EB Garamond for headings, Lora for body, JetBrains Mono for code
- **Dark Mode**: Charcoal theme with golden text, persists via localStorage
- **Subtle Animations**: Gentle transitions and fade-ins

### Interactive Features
- **Dark Mode Toggle**: Press Alt+D or use the button
- **Copy Code Blocks**: Hover over code to reveal copy button
- **Smooth Scrolling**: Navigation and anchor links
- **Keyboard Shortcuts**: Alt+D (dark mode), Alt+H (home)
- **Accessibility**: Skip links, ARIA labels, semantic HTML

## Structure

```
room-of-requirement/
├── index.html          # Homepage with recent posts
├── math.html           # Mathematics category page
├── cs.html             # Computer Science category page
├── cp.html             # Competitive Programming category page
├── about.html          # About page
├── css/
│   ├── main.css        # Core styles and layout
│   ├── math.css        # Mathematical environments and KaTeX styling
│   └── code.css        # Code blocks and syntax highlighting
├── js/
│   └── main.js         # Dark mode, KaTeX rendering, enhancements
└── posts/
    ├── sample-math-post.html
    ├── sample-cs-post.html
    └── sample-cp-post.html
```

## Creating New Posts

### Math Post Template

```html
<div class="theorem" data-number="1" data-name="Theorem Name">
    <p>Statement here with inline math $x^2$ and display math:</p>
    $$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$
</div>

<div class="proof">
    <div class="proof-content">
        <p>Proof goes here...</p>
    </div>
</div>
```

### Code Block with Language

```html
<div class="code-block-wrapper">
    <span class="code-language">C++</span>
    <pre><code class="language-cpp">
// Your code here
int main() {
    return 0;
}
    </code></pre>
</div>
```

### Input/Output Examples

```html
<div class="io-block io-input">
    <div class="io-label">Input</div>
    <div class="io-content">5
1 2 3 4 5</div>
</div>

<div class="io-block io-output">
    <div class="io-label">Output</div>
    <div class="io-content">15</div>
</div>
```

## Math Environments

Available environments with automatic styling:
- `.theorem` - Theorems with green border
- `.lemma` - Lemmas with olive border
- `.definition` - Definitions with brown border
- `.corollary` - Corollaries with teal border
- `.proposition` - Propositions with purple border
- `.proof` - Proofs with italic "Proof." and QED symbol
- `.remark` - Remarks with subtle styling
- `.example` - Examples with numbering

Attributes: `data-number="1"` and `data-name="Name"` for labeling.

## LaTeX Macros

Pre-configured macros in `main.js`:
- `\RR`, `\NN`, `\ZZ`, `\QQ`, `\CC` - Number sets
- `\abs{x}` - Absolute value
- `\norm{x}` - Norm
- `\floor{x}`, `\ceil{x}` - Floor and ceiling
- `\set{x}` - Set notation

## Deployment to GitHub Pages

1. **Create Repository**: `username.github.io` or any repository name
2. **Upload Files**: Push all files to the `main` or `gh-pages` branch
3. **Enable Pages**: Repository Settings → Pages → Source: branch
4. **Custom Domain** (optional): Add `CNAME` file

```bash
# Initialize and push
git init
git add .
git commit -m "Initial commit: Technical notebook"
git branch -M main
git remote add origin https://github.com/username/your-repo.git
git push -u origin main
```

## Customization

### Colors

Edit CSS variables in `css/main.css`:

```css
:root {
    --parchment-bg: #f6efe3;
    --accent-color: #3d5c4f;
    --charcoal: #1f1f1f;
    /* ... */
}
```

### Typography

Change font families in `main.css` and update the Google Fonts link in HTML:

```css
--font-heading: 'EB Garamond', serif;
--font-body: 'Lora', serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Layout Width

Adjust content width:

```css
--content-width: 720px; /* Change to desired width */
```

## Browser Support

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **KaTeX**: Works in all browsers with JavaScript enabled
- **Dark Mode**: Persists across sessions via localStorage
- **Legacy Browsers**: Graceful degradation (no dark mode toggle)

## Performance

- **Fast Loading**: KaTeX loaded from CDN with defer attribute
- **Minimal JS**: Core functionality only, ~6KB minified
- **Optimized CSS**: Modular structure, ~15KB combined
- **No Build Step**: Pure HTML/CSS/JS, ready to deploy

## Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Skip to content link (press Tab)
- Keyboard navigation support
- High contrast ratios in both themes
- Screen reader friendly math (KaTeX accessible mode)

## License

Free to use and modify for personal or educational purposes.

## Credits

- **KaTeX**: Math typesetting by Khan Academy
- **Fonts**: Google Fonts (EB Garamond, Lora, JetBrains Mono)
- **Design**: Custom parchment theme

---

**Live Demo**: Replace with your GitHub Pages URL after deployment

**Made for**: Serious technical writing in Mathematics, Computer Science, and Competitive Programming
