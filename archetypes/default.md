---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
math: true
categories: []
tags: []
abstract: ""
---

Write your post content here.

## Example Math Environment

{{</* theorem number="1" name="Example Theorem" */>}}
State your theorem here with inline math $x^2$ and display math:

$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$
{{</* /theorem */>}}

{{</* proof */>}}
Write your proof here.
{{</* /proof */>}}

## Example Code Block

```python
def example():
    print("Hello, world!")
```

{{</* complexity */>}}
**Time Complexity:** $O(n)$  
**Space Complexity:** $O(1)$
{{</* /complexity */>}}
