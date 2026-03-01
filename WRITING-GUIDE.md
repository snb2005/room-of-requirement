# Writing Guide for Technical Notebook

This guide explains how to write blog posts in Markdown for the Technical Notebook Hugo site.

## Quick Start

### Create a New Post

```bash
# Mathematics post
hugo new math/your-topic-name.md

# Computer Science post
hugo new cs/your-algorithm-name.md

# Competitive Programming post
hugo new cp/your-problem-name.md
```

This creates a Markdown file with pre-filled frontmatter.

### Preview Your Post

```bash
./preview.sh
# Or: hugo server --buildDrafts
```

Visit `http://localhost:1313` to see your post with live reload.

### Publish Your Post

1. Edit the post in any text editor
2. Set `draft: false` in the frontmatter
3. Commit and push to GitHub
4. GitHub Actions automatically builds and deploys!

## Frontmatter

Every post begins with YAML frontmatter:

```yaml
---
title: "Your Post Title"
date: 2026-03-01
draft: false              # Set to false to publish
math: true                # Enable KaTeX math rendering
categories: ["math"]      # math, cs, or cp
tags: ["Tag1", "Tag2"]    # Relevant tags
abstract: "Short description shown on homepage"
---
```

## Writing Content

### Basic Markdown

Use standard Markdown syntax:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**  
*Italic text*  

- Bullet list
- Another item

1. Numbered list
2. Another item

[Link text](https://example.com)
```

### Mathematics

#### Inline Math

Use single dollar signs: `$x^2 + y^2 = z^2$`

Result: $x^2 + y^2 = z^2$

#### Display Math

Use double dollar signs:

```markdown
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

#### Available LaTeX Commands

Pre-configured macros:

- Number sets: `\RR`, `\NN`, `\ZZ`, `\QQ`, `\CC`
- `\abs{x}` - Absolute value: $|x|$
- `\norm{x}` - Norm: $\|x\|$
- `\floor{x}` - Floor: $\lfloor x \rfloor$
- `\ceil{x}` - Ceiling: $\lceil x \rceil$
- `\set{x}` - Set notation: $\{x\}$

## Mathematical Environments

### Theorem

```markdown
{{</* theorem number="1" name="Pythagorean Theorem" */>}}
In a right triangle with legs $a$ and $b$ and hypotenuse $c$,

$$a^2 + b^2 = c^2$$
{{</* /theorem */>}}
```

Options:
- `number="1"` - Adds "Theorem 1"
- `name="Name"` - Adds "(Name)" after number
- Both optional

### Proof

```markdown
{{</* proof */>}}
We proceed by induction on $n$.

**Base case:** For $n = 1$, ...

**Inductive step:** Assume true for $n = k$, ...

Therefore the result holds.
{{</* /proof */>}}
```

Automatically adds "Proof." at start and □ at end.

### Other Environments

All follow the same pattern:

```markdown
{{</* lemma number="1" name="Key Lemma" */>}}
Content here...
{{</* /lemma */>}}

{{</* definition number="1" name="Group" */>}}
A **group** is a set $G$ with...
{{</* /definition */>}}

{{</* corollary number="1" */>}}
As an immediate consequence...
{{</* /corollary */>}}

{{</* proposition number="1" */>}}
We claim that...
{{</* /proposition */>}}

{{</* remark */>}}
Note that this result...
{{</* /remark */>}}

{{</* example number="1" */>}}
Consider the case where...
{{</* /example */>}}
```

### Numbered Equations

```markdown
{{</* equation 1 */>}}
$$E = mc^2$$
{{</* /equation */>}}
```

Creates equation with number (1) on the right.

## Code Blocks

### Basic Code Block

Use triple backticks with language identifier:

````markdown
```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
```
````

Supported languages: Python, C++, Java, JavaScript, Go, Rust, and many more.

### Code with Explanation

````markdown
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

The above code prints "Hello, World!" to standard output.
````

## Competitive Programming Features

### Input/Output Examples

```markdown
{{</* io type="input" label="Input" */>}}
5
1 2 3 4 5
{{</* /io */>}}

{{</* io type="output" label="Output" */>}}
15
{{</* /io */>}}
```

Creates styled input/output boxes.

### Complexity Analysis

```markdown
{{</* complexity */>}}
**Time Complexity:** $O(n \log n)$  
**Space Complexity:** $O(n)$

The algorithm performs $n$ iterations, each taking $O(\log n)$ time
due to the binary search within each iteration.
{{</* /complexity */>}}
```

### Algorithm Pseudocode

```markdown
{{</* algorithm title="Algorithm: Binary Search" */>}}
**Input:** Sorted array A[1..n], target value x  
**Output:** Index of x in A, or -1 if not found

1. Set left ← 1, right ← n
2. **while** left ≤ right **do**
3.     mid ← ⌊(left + right)/2⌋
4.     **if** A[mid] = x **then**
5.         **return** mid
6.     **else if** A[mid] < x **then**
7.         left ← mid + 1
8.     **else**
9.         right ← mid - 1
10. **return** -1
{{</* /algorithm */>}}
```

## Complete Example Post

Here's a complete example combining all features:

```markdown
---
title: "Binary Search: Theory and Implementation"
date: 2026-03-01
draft: false
math: true
categories: ["cs"]
tags: ["Algorithms", "Binary Search", "Divide and Conquer"]
abstract: "A comprehensive look at binary search, including correctness proof and
implementation details."
---

Binary search is a fundamental algorithm for finding elements in sorted arrays.

## Definition

{{</* definition number="1" */>}}
**Binary Search** is a search algorithm that finds the position of a target  
value within a sorted array by repeatedly dividing the search interval in half.
{{</* /definition */>}}

## Correctness

{{</* theorem number="1" */>}}
Binary search correctly finds any element in a sorted array $A[1..n]$ or  
determines its absence, making at most $\lceil \log_2 n \rceil$ comparisons.
{{</* /theorem */>}}

{{</* proof */>}}
By induction on the size of the search interval...

The invariant is that if $x$ exists in $A$, it lies in $A[left..right]$...

Therefore the algorithm is correct.
{{</* /proof */>}}

## Implementation

```python
def binary_search(arr, target):
    """
    Search for target in sorted array arr.
    Returns index if found, -1 otherwise.
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

{{</* complexity */>}}
**Time Complexity:** $O(\log n)$  
**Space Complexity:** $O(1)$
{{</* /complexity */>}}

## Example

{{</* example number="1" */>}}
Search for 7 in array [1, 3, 5, 7, 9, 11]:

Iteration 1: mid = 2, A[2] = 5 < 7, left = 3  
Iteration 2: mid = 4, A[4] = 9 > 7, right = 3  
Iteration 3: mid = 3, A[3] = 7 = 7, found!
{{</* /example */>}}

{{</* remark */>}}
Binary search requires the array to be sorted. For unsorted data,  
linear search or preprocessing (sorting first) is necessary.
{{</* /remark */>}}
```

## Tips for Good Posts

### Content Organization

1. **Start with motivation**: Why is this topic important?
2. **Define terms clearly**: Use definition environment
3. **State results formally**: Use theorem/lemma environments
4. **Provide intuition**: Explain the ideas before details
5. **Show examples**: Concrete cases help understanding
6. **Include code**: Annotated implementations
7. **Analyze complexity**: Time and space requirements

### Writing Style

- **Be precise**: Use mathematical notation correctly
- **Be clear**: Explain each step
- **Be concise**: Avoid unnecessary verbosity
- **Be structured**: Use sections and subsections
- **Be correct**: Verify all claims and code

### Mathematical Writing

- **Define before using**: Introduce notation first
- **Number important results**: Theorems, lemmas, definitions
- **Provide proofs**: Or outline proof ideas
- **Use consistent notation**: $n$ for size, $i$ for index, etc.
- **Label equations**: For later reference

### Code Style

- **Commented**: Explain non-obvious parts
- **Clean**: Follow language conventions
- **Complete**: Runnable examples
- **Tested**: Verify code works

## Common Patterns

### Mathematics Post Structure

```markdown
1. Introduction
   - Motivation
   - Historical context

2. Definitions
   - Key concepts
   - Notation

3. Main Results
   - Theorems with proofs
   - Lemmas and corollaries

4. Examples
   - Concrete instances
   - Applications

5. Extensions
   - Generalizations
   - Related results

6. Conclusion
   - Summary
   - Further reading
```

### CS Post Structure

```markdown
1. Problem Statement
   - What we're solving
   - Why it matters

2. Approach
   - High-level idea
   - Data structures needed

3. Algorithm
   - Pseudocode
   - Invariants

4. Implementation
   - Full code
   - Edge cases

5. Analysis
   - Correctness argument
   - Complexity analysis

6. Applications
   - Real-world uses
   - Variations
```

### CP Post Structure

```markdown
1. Problem Statement
   - Official problem text
   - Input/output format
   - Constraints

2. Solution Idea
   - Key observations
   - Algorithm choice

3. Implementation
   - Annotated code
   - Input/output examples

4. Complexity
   - Time and space
   - Why it fits constraints

5. Common Mistakes
   - Edge cases
   - Optimization tips

6. Similar Problems
   - Related techniques
   - Practice links
```

## Workflow

### Daily Routine

```bash
# Morning: Start new post
hugo new math/topic.md

# Throughout day: Write in editor
# Auto-save enabled

# Afternoon: Preview
./preview.sh
# Check localhost:1313

# Evening: Publish
# Set draft: false
git add content/math/topic.md
git commit -m "Add post on [topic]"
git push

# GitHub Actions deploys automatically!
```

### Review Checklist

Before publishing, verify:

- [ ] Frontmatter complete and correct
- [ ] `draft: false` set
- [ ] Math renders correctly (check preview)
- [ ] Code blocks have language tags
- [ ] All shortcodes properly closed
- [ ] Links work
- [ ] Images (if any) load
- [ ] Responsive on mobile (check preview)
- [ ] No spelling/grammar errors

## Keyboard Shortcuts

While previewing:

- **Ctrl+C**: Stop preview server
- **Ctrl+R**: Refresh browser (auto-refreshes on save)
- **Alt+D**: Toggle dark mode (in browser)

## Getting Help

### Build Errors

If `hugo` command fails:

1. Check YAML frontmatter syntax
2. Verify all shortcodes closed with `{{</* /shortcode */>}}`
3. Look for unescaped special characters
4. Run `hugo --buildDrafts` for detailed errors

### Math Not Rendering

1. Ensure `math: true` in frontmatter
2. Use `$...$` for inline, `$$...$$` for display
3. Check KaTeX supported commands
4. Escape underscores in text: `\_`

### Shortcode Issues

1. Use `{{</* ... */>}}` not `{{%/* ... */%}}`
2. Check shortcode name spelling
3. Verify closing tag matches opening
4. Content inside should be Markdown

## Resources

- **Hugo Docs**: https://gohugo.io/documentation/
- **KaTeX Docs**: https://katex.org/docs/supported.html
- **Markdown Guide**: https://www.markdownguide.org/
- **Chroma Styles**: https://xyproto.github.io/splash/docs/

---

Happy writing! Focus on content, Hugo handles the rest.
