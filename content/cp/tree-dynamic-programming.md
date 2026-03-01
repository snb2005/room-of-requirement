---
title: "Advanced Dynamic Programming on Trees"
date: 2026-02-20
draft: false
math: true
categories: ["cp"]
tags: ["Dynamic Programming", "Trees", "Graphs"]
abstract: "Techniques for solving tree DP problems efficiently. We cover rerooting, subtree merging, and centroid decomposition with annotated solutions to classic competitive programming problems."
---

Tree dynamic programming is a powerful technique for solving optimization problems on tree structures. Unlike linear DP, tree DP requires careful consideration of subtree relationships and parent-child dependencies. This article covers fundamental patterns and advanced techniques including rerooting.

## Problem 1: Maximum Independent Set

**Problem Statement:** Given a tree with $n$ nodes where each node has a value $v_i$, find the maximum sum of values such that no two selected nodes are adjacent.

{{< io type="input" label="Input" >}}
5
10 5 8 12 7
1 2
1 3
2 4
2 5
{{< /io >}}

{{< io type="output" label="Output" >}}
29
{{< /io >}}

### Approach

Define $\text{dp}[u][0]$ as the maximum value in the subtree rooted at $u$ when $u$ is *not* included, and $\text{dp}[u][1]$ when $u$ *is* included.

{{< definition number="1" >}}
**Recurrence Relations:**

$$\text{dp}[u][0] = \sum_{v \in \text{children}(u)} \max(\text{dp}[v][0], \text{dp}[v][1])$$

$$\text{dp}[u][1] = v_u + \sum_{v \in \text{children}(u)} \text{dp}[v][0]$$
{{< /definition >}}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1e5 + 5;
vector<int> adj[MAXN];
long long dp[MAXN][2];
int val[MAXN];
bool visited[MAXN];

void dfs(int u) {
    visited[u] = true;
    
    // Base case: leaf node
    dp[u][0] = 0;
    dp[u][1] = val[u];
    
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
            
            // If u is not taken, can take or not take v
            dp[u][0] += max(dp[v][0], dp[v][1]);
            
            // If u is taken, cannot take v
            dp[u][1] += dp[v][0];
        }
    }
}

int main() {
    int n;
    cin >> n;
    
    for (int i = 1; i <= n; i++) {
        cin >> val[i];
    }
    
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    dfs(1);
    
    cout << max(dp[1][0], dp[1][1]) << "\n";
    
    return 0;
}
```

{{< complexity >}}
**Time Complexity:** $O(n)$  
**Space Complexity:** $O(n)$

Each node is visited once during the DFS traversal, and we maintain two DP states per node.
{{< /complexity >}}

## Problem 2: Tree Rerooting

**Problem Statement:** For each node $u$ in the tree, compute the maximum distance from $u$ to any other node (the tree diameter rooted at $u$).

{{< remark >}}
Naive approach: Run DFS from each node separately. Time: $O(n^2)$.  
Optimal approach: Use rerooting technique. Time: $O(n)$.
{{< /remark >}}

### Rerooting Technique

The key insight is to compute answers for all possible roots in two passes:

1. **Pass 1 (Downward):** Compute subtree information for an arbitrary root
2. **Pass 2 (Upward):** Reroot the tree and incorporate parent contributions

{{< definition number="2" >}}
**DP States:**

- $\text{down}[u]$: Maximum depth in subtree rooted at $u$
- $\text{up}[u]$: Maximum distance from $u$ going through parent
{{< /definition >}}

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1e5 + 5;
vector<int> adj[MAXN];
int down[MAXN], up[MAXN], ans[MAXN];

// Pass 1: Compute down values
void dfs1(int u, int p) {
    down[u] = 0;
    
    for (int v : adj[u]) {
        if (v != p) {
            dfs1(v, u);
            down[u] = max(down[u], down[v] + 1);
        }
    }
}

// Pass 2: Compute up values and answers
void dfs2(int u, int p) {
    // Find two largest down values from children
    int max1 = 0, max2 = 0;
    
    for (int v : adj[u]) {
        if (v != p) {
            int child_down = down[v] + 1;
            if (child_down > max1) {
                max2 = max1;
                max1 = child_down;
            } else if (child_down > max2) {
                max2 = child_down;
            }
        }
    }
    
    // Answer for node u
    ans[u] = max(down[u], up[u]);
    
    // Reroot to children
    for (int v : adj[u]) {
        if (v != p) {
            // Compute up[v] based on u's information
            // If v's subtree gives max1, use max2, else use max1
            int other_down = (down[v] + 1 == max1) ? max2 : max1;
            up[v] = max(up[u], other_down) + 1;
            
            dfs2(v, u);
        }
    }
}

int main() {
    int n;
    cin >> n;
    
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    up[1] = 0;
    dfs1(1, 0);
    dfs2(1, 0);
    
    for (int i = 1; i <= n; i++) {
        cout << ans[i] << "\n";
    }
    
    return 0;
}
```

## Problem 3: Subtree Size Queries

**Problem Statement:** Given a tree, answer queries on subtree properties efficiently using Euler tour and segment trees.

{{< algorithm title="Euler Tour Technique" >}}
1. Perform DFS and record entry time in[u] and exit time out[u]
2. Subtree of u corresponds to range [in[u], out[u]]
3. Use segment tree or Fenwick tree for range queries

**Properties:**
- Node v is in subtree of u iff in[u] ≤ in[v] ≤ out[u]
- Subtree queries become range queries
- Supports path queries with LCA
{{< /algorithm >}}

```python
class EulerTour:
    def __init__(self, n, adj):
        self.n = n
        self.adj = adj
        self.timer = 0
        self.in_time = [0] * (n + 1)
        self.out_time = [0] * (n + 1)
        self.euler = []
        
        self.dfs(1, 0)
    
    def dfs(self, u, parent):
        """Perform DFS and record entry/exit times."""
        self.timer += 1
        self.in_time[u] = self.timer
        self.euler.append(u)
        
        for v in self.adj[u]:
            if v != parent:
                self.dfs(v, u)
        
        self.out_time[u] = self.timer
    
    def is_ancestor(self, u, v):
        """Check if u is ancestor of v."""
        return (self.in_time[u] <= self.in_time[v] and 
                self.out_time[v] <= self.out_time[u])
    
    def subtree_range(self, u):
        """Return range [L, R] representing subtree of u."""
        return (self.in_time[u], self.out_time[u])

# Usage example
n = 5
adj = [[] for _ in range(n + 1)]
edges = [(1, 2), (1, 3), (2, 4), (2, 5)]

for u, v in edges:
    adj[u].append(v)
    adj[v].append(u)

tour = EulerTour(n, adj)

# Subtree of node 2 is nodes with in_time in range [2, 4]
l, r = tour.subtree_range(2)
print(f"Subtree of node 2: range [{l}, {r}]")
```

## Advanced Pattern: DP on Subtrees with Recomputation

Some problems require computing DP values excluding certain subtrees. This is common in "all pairs" tree problems.

{{< example number="1" >}}
**Problem:** For each node, count pairs of nodes in different subtrees.

**Solution Sketch:**

1. Compute subtree sizes for each node
2. For node $u$ with children $v_1, \ldots, v_k$, count:
   $$\text{pairs}[u] = \sum_{i < j} \text{size}[v_i] \times \text{size}[v_j]$$
3. Total answer sums contributions from all nodes
{{< /example >}}

{{< complexity >}}
**Key Insight:** Use prefix sums to avoid $O(k^2)$ per node.

Compute cumulative sizes and calculate pairs in $O(k)$ per node, achieving $O(n)$ overall.
{{< /complexity >}}

## Common Pitfalls

{{< remark >}}
1. **Forgetting to mark visited nodes:** In undirected trees, always track parent
2. **Integer overflow:** Use `long long` for DP values that can grow large
3. **Incorrect base cases:** Verify leaf node behavior separately
4. **Root dependency:** Some problems need rerooting even if not obvious
{{< /remark >}}

## Practice Problems

To master tree DP, solve these progressively harder problems:

1. **Tree Matching:** Maximum matching on trees (CF 1156D)
2. **Distance Sums:** Sum of distances for all nodes (CSES 1133)
3. **Subtree Queries:** Range updates on subtrees (CSES 1137)
4. **Tree Distances II:** Rerooting technique (CSES 1133)
5. **Binary Tree Cameras:** Optimal placement (LC 968)

## Conclusion

Tree DP is fundamental to competitive programming. The patterns presented here—basic subtree DP, rerooting, and Euler tour—form the foundation for solving most tree problems efficiently. Master these techniques, and you'll find that even complex tree problems become tractable.

Remember: always visualize the tree, identify the optimal substructure, and carefully define your DP states. With practice, recognizing when to apply these patterns becomes second nature.
