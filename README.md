# Technical Notebook

A minimalistic technical blog for Mathematics, Computer Science, and Competitive Programming with full LaTeX support and an enchanted parchment aesthetic.

**Write in Markdown with LaTeX. Hugo builds to HTML. Deploy automatically.**

## Quick Start

```bash
# Create a new post
hugo new math/topic-name.md

# Preview with live reload
./preview.sh

# Build for production
./build.sh
```

Visit `http://localhost:1313` to preview.

## Features

- **Markdown + LaTeX**: Write posts in Markdown with `$math$` and `$$display$$` equations
- **12 Shortcodes**: theorem, lemma, definition, proof, corollary, proposition, remark, example, equation, io, complexity, algorithm
- **Parchment Theme**: Aged parchment aesthetic with EB Garamond, Lora, and JetBrains Mono fonts
- **Dark Mode**: Alt+D to toggle, persists via localStorage
- **Auto Deploy**: GitHub Actions builds and publishes on push
- **Syntax Highlighting**: Automatic via Hugo's Chroma
- **Responsive**: Mobile-friendly design

## Writing Posts

### Create New Post

```bash
hugo new math/your-topic.md       # Mathematics
hugo new cs/algorithm-name.md     # Computer Science
hugo new cp/problem-solution.md   # Competitive Programming
```

### Post Frontmatter

```yaml
---
title: "Your Post Title"
date: 2026-03-01
draft: false
math: true
categories: ["math"]
tags: ["Tag1", "Tag2"]
abstract: "Brief description"
---
```

### Math & Content

```markdown
The Prime Number Theorem states that $\pi(x) \sim \frac{x}{\log x}$.

For large $x$:
$$\lim_{x \to \infty} \frac{\pi(x) \log x}{x} = 1$$
```

## Shortcodes

### Math Environments

```markdown
{{</* theorem number="1" name="Pythagorean Theorem" */>}}
In a right triangle: $a^2 + b^2 = c^2$
{{</* /theorem */>}}

{{</* proof */>}}
We proceed by induction...
{{</* /proof */>}}

{{</* definition number="1" */>}}
A **group** is a set with...
{{</* /definition */>}}

{{</* equation 1 */>}}
$$E = mc^2$$
{{</* /equation */>}}
```

Available: `theorem`, `lemma`, `definition`, `corollary`, `proposition`, `proof`, `remark`, `example`, `equation`

### CP Features

```markdown
{{</* io type="input" label="Input" */>}}
5
1 2 3 4 5
{{</* /io */>}}

{{</* complexity */>}}
**Time:** $O(n \log n)$  
**Space:** $O(n)$
{{</* /complexity */>}}

{{</* algorithm title="Binary Search" */>}}
1. Set left ← 1, right ← n
2. **while** left ≤ right **do**
3.     mid ← ⌊(left + right)/2⌋
{{</* /algorithm */>}}
```

### Code Blocks

````markdown
```python
def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)
```
````

## Deployment

### GitHub Pages (Automatic)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/repo.git
   git push -u origin main
   ```

2. **Enable Pages:**
   - Settings → Pages → Source: "GitHub Actions"

3. **Done!** Site live at `https://username.github.io/repo/`

GitHub Actions automatically builds and deploys on every push.

## Customization

### Colors (`static/css/main.css`)

```css
:root {
    --parchment-bg: #f6efe3;
    --accent-color: #3d5c4f;
    --ink-brown: #4a3a2a;
    --charcoal: #1f1f1f;
}
```

### Site Config (`hugo.toml`)

```toml
baseURL = "https://username.github.io/repo/"
title = "Your Title"

[[menu.main]]
name = "Mathematics"
url = "/math/"
weight = 1
```

## LaTeX Macros

Pre-configured in `static/js/main.js`:
- `\RR`, `\NN`, `\ZZ`, `\QQ`, `\CC` - Number sets
- `\abs{x}`, `\norm{x}`, `\floor{x}`, `\ceil{x}`, `\set{x}`

Full KaTeX docs: https://katex.org/docs/supported.html

## Troubleshooting

**Build fails:**
```bash
hugo --buildDrafts --verbose
```
Check for unclosed shortcodes or YAML errors.

**Math not rendering:**
- Add `math: true` to frontmatter
- Use `$...$` for inline, `$$...$$` for display

**Dark mode issues:**
- Clear localStorage: `localStorage.clear()` in console

## Example Posts

See sample posts in `content/`:
- [Prime Number Theorem](content/math/prime-number-theorem.md)
- [B-Trees and Database Indexing](content/cs/btrees-database-indexing.md)
- [Tree Dynamic Programming](content/cp/tree-dynamic-programming.md)

## Detailed Guide

See [WRITING-GUIDE.md](WRITING-GUIDE.md) for comprehensive documentation.

## Tech Stack

- **Hugo** v0.123.7+ - Static site generator
- **KaTeX** v0.16.9 - Math typesetting
- **Chroma** - Syntax highlighting
- **Goldmark** - Markdown parser

## License

Free to use for personal or educational purposes.

---

**Write content. Hugo handles the rest.**
