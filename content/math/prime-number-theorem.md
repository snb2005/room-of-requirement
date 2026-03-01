---
title: "The Prime Number Theorem and Riemann's Contribution"
date: 2026-02-28
draft: false
math: true
categories: ["math"]
tags: ["Number Theory", "Analysis", "Prime Numbers"]
abstract: "An exploration of the asymptotic distribution of primes, the Prime Number Theorem, and its connection to the Riemann zeta function. We provide a detailed proof sketch and discuss the analytic methods involved."
---

The distribution of prime numbers has fascinated mathematicians for centuries. While primes appear irregularly among the integers, their global distribution exhibits remarkable regularity. The Prime Number Theorem quantifies this behavior precisely.

{{< theorem number="1" name="Prime Number Theorem" >}}
Let $\pi(x)$ denote the number of primes not exceeding $x$. Then

$$\pi(x) \sim \frac{x}{\ln x}$$

as $x \to \infty$, where $f(x) \sim g(x)$ means $\lim_{x \to \infty} \frac{f(x)}{g(x)} = 1$.
{{< /theorem >}}

This result was conjectured independently by Legendre (1798) and Gauss (1792-1793), and first proved by Hadamard and de la Vallée Poussin in 1896 using complex analysis.

## Connection to the Riemann Zeta Function

The key to proving the Prime Number Theorem lies in studying the Riemann zeta function, defined for $\Re(s) > 1$ by

$$\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s}$$

{{< theorem number="2" name="Euler Product Formula" >}}
For $\Re(s) > 1$, we have

$$\zeta(s) = \prod_{p \text{ prime}} \frac{1}{1 - p^{-s}}$$

where the product is taken over all prime numbers.
{{< /theorem >}}

{{< proof >}}
For each prime $p$ and $\Re(s) > 1$, the geometric series gives

$$\frac{1}{1 - p^{-s}} = \sum_{k=0}^{\infty} p^{-ks}$$

Expanding the product over primes $p_1, p_2, \ldots, p_N$ and using unique prime factorization, we obtain

$$\prod_{i=1}^{N} \frac{1}{1 - p_i^{-s}} = \sum_{n \in S_N} \frac{1}{n^s}$$

where $S_N$ consists of all positive integers whose prime factors are among $p_1, \ldots, p_N$.

Taking $N \to \infty$, the result follows from absolute convergence of $\zeta(s)$.
{{< /proof >}}

{{< remark >}}
The Euler product formula establishes a profound connection between additive properties (the sum defining $\zeta(s)$) and multiplicative properties (prime factorization). This bridge between analysis and number theory is central to modern analytic number theory.
{{< /remark >}}

## Analytic Continuation and the Critical Strip

Riemann showed that $\zeta(s)$ extends to a meromorphic function on $\mathbb{C}$ with a simple pole at $s = 1$. The behavior of $\zeta(s)$ in the critical strip $0 < \Re(s) < 1$ governs the distribution of primes.

{{< definition number="1" >}}
The **critical strip** is the region $\\{s \in \mathbb{C} : 0 < \Re(s) < 1\\}$. The **critical line** is $\\{s \in \mathbb{C} : \Re(s) = \frac{1}{2}\\}$.
{{< /definition >}}

{{< theorem number="3" name="Riemann Hypothesis" >}}
All non-trivial zeros of the Riemann zeta function lie on the critical line $\Re(s) = \frac{1}{2}$.
{{< /theorem >}}

While the Riemann Hypothesis remains unproved, Hadamard and de la Vallée Poussin established the weaker result that $\zeta(s) \neq 0$ for $\Re(s) = 1$, which suffices to prove the Prime Number Theorem.

## Sketch of Proof

The proof proceeds through several steps:

{{< lemma number="1" >}}
Define the Chebyshev function $\psi(x) = \sum_{p^k \leq x} \ln p$. Then the Prime Number Theorem is equivalent to

$$\psi(x) \sim x \quad \text{as } x \to \infty$$
{{< /lemma >}}

{{< lemma number="2" name="Key Analytic Estimate" >}}
The function $\psi(x)$ can be expressed using the Perron formula in terms of the logarithmic derivative of $\zeta(s)$:

$$\psi(x) = \frac{1}{2\pi i} \int_{c - iT}^{c + iT} \left(-\frac{\zeta'(s)}{\zeta(s)}\right) \frac{x^s}{s} ds + O\left(\frac{x \ln^2 x}{T}\right)$$

for $c > 1$ and suitable $T$.
{{< /lemma >}}

The crucial step is showing that the integral can be evaluated by shifting the contour to the left of $\Re(s) = 1$. The non-vanishing of $\zeta(s)$ on $\Re(s) = 1$ ensures that the only pole of the integrand in the region $\Re(s) \geq 1$ is at $s = 1$, contributing the main term $x$.

{{< example number="1" >}}
To illustrate the theorem's accuracy, consider $x = 10^6$. We have:

- $\pi(10^6) = 78{,}498$ (exact count)
- $\frac{10^6}{\ln 10^6} \approx 72{,}382$ (PNT approximation)
- Relative error: approximately $7.8\%$

The approximation improves as $x$ increases. For $x = 10^{10}$, the relative error drops below $2\%$.
{{< /example >}}

## Refined Estimates

A more accurate approximation is given by the logarithmic integral:

$$\text{Li}(x) = \int_2^x \frac{dt}{\ln t}$$

{{< theorem number="4" >}}
We have the stronger asymptotic relation

$$\pi(x) \sim \text{Li}(x)$$

Moreover, assuming the Riemann Hypothesis,

$$\pi(x) = \text{Li}(x) + O(\sqrt{x} \ln x)$$
{{< /theorem >}}

{{< remark >}}
The error term improvement under RH is substantial. Without RH, the best known unconditional bound is $O(x \exp(-c\sqrt{\ln x}))$ for some constant $c > 0$.
{{< /remark >}}

## Conclusion

The Prime Number Theorem stands as one of the crowning achievements of 19th century mathematics, uniting complex analysis with number theory. Riemann's insights into the zeta function opened entirely new avenues of research, many of which remain active today.

The techniques developed for proving the PNT—analytic continuation, contour integration, and the study of zeros of $L$-functions—have become fundamental tools throughout mathematics, with applications ranging from quantum physics to cryptography.
