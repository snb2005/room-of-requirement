// ==========================================
// Dark Mode Toggle
// ==========================================

function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Save preference
            const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            
            // Optional: Add animation feedback
            themeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }
}

// ==========================================
// KaTeX Rendering
// ==========================================

function renderMath() {
    // Wait for KaTeX to load
    if (typeof renderMathInElement === 'undefined') {
        setTimeout(renderMath, 100);
        return;
    }
    
    // Render all math on the page
    renderMathInElement(document.body, {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '\\[', right: '\\]', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false}
        ],
        throwOnError: false,
        errorColor: '#cc0000',
        strict: false,
        trust: false,
        macros: {
            "\\RR": "\\mathbb{R}",
            "\\NN": "\\mathbb{N}",
            "\\ZZ": "\\mathbb{Z}",
            "\\QQ": "\\mathbb{Q}",
            "\\CC": "\\mathbb{C}",
            "\\PP": "\\mathbb{P}",
            "\\EE": "\\mathbb{E}",
            "\\abs": "\\left|#1\\right|",
            "\\norm": "\\left\\|#1\\right\\|",
            "\\floor": "\\left\\lfloor#1\\right\\rfloor",
            "\\ceil": "\\left\\lceil#1\\right\\rceil",
            "\\set": "\\left\\{#1\\right\\}",
            "\\seq": "\\left\\langle#1\\right\\rangle"
        }
    });
    
    // Add fade-in effect after rendering
    setTimeout(() => {
        document.querySelectorAll('.katex').forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.3s ease-in';
            setTimeout(() => {
                el.style.opacity = '1';
            }, 10);
        });
    }, 50);
}

// ==========================================
// Smooth Scroll
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// Code Block Enhancements
// ==========================================

function enhanceCodeBlocks() {
    // Add copy button to code blocks
    document.querySelectorAll('pre code').forEach(block => {
        const pre = block.parentElement;
        
        // Skip if already enhanced
        if (pre.querySelector('.copy-button')) return;
        
        // Create copy button
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code');
        
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                button.textContent = 'Failed';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            }
        });
        
        // Wrap pre in container if not already wrapped
        if (!pre.parentElement.classList.contains('code-block-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);
        }
        
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
}

// ==========================================
// Table of Contents Generator (Optional)
// ==========================================

function generateTOC() {
    const article = document.querySelector('.post-content');
    if (!article) return;
    
    const headings = article.querySelectorAll('h2, h3');
    if (headings.length < 3) return; // Don't generate TOC for short articles
    
    const toc = document.createElement('nav');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h3>Contents</h3><ul></ul>';
    const list = toc.querySelector('ul');
    
    headings.forEach((heading, index) => {
        // Add ID if not present
        if (!heading.id) {
            heading.id = `section-${index + 1}`;
        }
        
        const item = document.createElement('li');
        item.className = heading.tagName.toLowerCase();
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        
        item.appendChild(link);
        list.appendChild(item);
    });
    
    // Insert TOC after the first paragraph or at the beginning
    const firstP = article.querySelector('section > p');
    if (firstP) {
        firstP.parentNode.insertBefore(toc, firstP.nextSibling);
    }
}

// ==========================================
// Equation Numbering
// ==========================================

function numberEquations() {
    const equations = document.querySelectorAll('.numbered-equation');
    equations.forEach((eq, index) => {
        const number = eq.querySelector('.equation-number');
        if (number && !number.textContent.trim()) {
            number.textContent = `(${index + 1})`;
        }
    });
}

// ==========================================
// Responsive Tables
// ==========================================

function makeTablesResponsive() {
    document.querySelectorAll('table').forEach(table => {
        if (!table.parentElement.classList.contains('table-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-wrapper';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
}

// ==========================================
// Image Lazy Loading
// ==========================================

function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        document.querySelectorAll('img').forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Use Intersection Observer for older browsers
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ==========================================
// External Links
// ==========================================

function handleExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.hostname.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Optional: Add external link indicator
            if (!link.querySelector('.external-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-icon';
                icon.setAttribute('aria-label', 'External link');
                icon.textContent = ' ↗';
                link.appendChild(icon);
            }
        }
    });
}

// ==========================================
// Scroll Progress Indicator
// ==========================================

function initScrollProgress() {
    const article = document.querySelector('.post-content');
    if (!article) return;
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const bar = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        
        const start = articleTop - windowHeight / 2;
        const end = articleTop + articleHeight - windowHeight / 2;
        
        let progress = (scrollTop - start) / (end - start);
        progress = Math.max(0, Math.min(1, progress));
        
        bar.style.width = `${progress * 100}%`;
    });
}

// ==========================================
// Print Optimization
// ==========================================

function optimizeForPrint() {
    window.addEventListener('beforeprint', () => {
        // Expand all collapsed sections
        document.querySelectorAll('details').forEach(details => {
            details.setAttribute('open', '');
        });
    });
}

// ==========================================
// Keyboard Shortcuts
// ==========================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Alt+D: Toggle dark mode
        if (e.altKey && e.key === 'd') {
            e.preventDefault();
            document.getElementById('theme-toggle')?.click();
        }
        
        // Alt+H: Go to home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            window.location.href = '/index.html';
        }
    });
}

// ==========================================
// Accessibility Enhancements
// ==========================================

function enhanceAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main id if not present
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main';
    }
}

// ==========================================
// Initialize Everything
// ==========================================

function init() {
    // Core functionality
    initDarkMode();
    renderMath();
    
    // Enhancements
    initSmoothScroll();
    enhanceCodeBlocks();
    numberEquations();
    makeTablesResponsive();
    initLazyLoading();
    handleExternalLinks();
    optimizeForPrint();
    initKeyboardShortcuts();
    enhanceAccessibility();
    
    // Optional features (uncomment if desired)
    // generateTOC();
    // initScrollProgress();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Also run math rendering when KaTeX loads (fallback)
window.addEventListener('load', () => {
    if (typeof renderMathInElement !== 'undefined') {
        renderMath();
    }
});
