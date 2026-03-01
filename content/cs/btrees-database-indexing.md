---
title: "B-Trees and Database Indexing"
date: 2026-02-25
draft: false
math: true
categories: ["cs"]
tags: ["Data Structures", "Databases", "Algorithms"]
abstract: "A rigorous examination of B-tree data structures, their invariants, and their application in database systems. We analyze insertion, deletion, and search operations with formal complexity proofs."
---

B-trees are self-balancing tree data structures that maintain sorted data and allow searches, sequential access, insertions, and deletions in logarithmic time. Unlike binary search trees, B-trees are optimized for systems that read and write large blocks of data, making them ideal for database systems and file systems.

## Structure and Invariants

{{< definition number="1" name="B-Tree" >}}
A **B-tree** of order $m$ is a tree data structure where every node has at most $m$ children. More precisely:

- Every node contains at most $m-1$ keys
- Every non-leaf node (except root) has at least $\lceil m/2 \rceil$ children
- The root has at least two children (unless it is a leaf)
- All leaves appear at the same level
- A non-leaf node with $k$ children contains $k-1$ keys
{{< /definition >}}

These invariants ensure that the tree remains balanced and that operations maintain logarithmic complexity. The parameter $m$ is typically chosen based on disk block size to minimize I/O operations.

{{< theorem number="1" name="B-Tree Height" >}}
A B-tree of order $m$ containing $n$ keys has height $h$ bounded by

$$h \leq \log_{\lceil m/2 \rceil} \left(\frac{n+1}{2}\right)$$
{{< /theorem >}}

{{< proof >}}
Consider a B-tree of height $h$ with minimum number of keys. The root contains at least 1 key, and every other node contains at least $\lceil m/2 \rceil - 1$ keys.

Level 1 has at least 2 nodes, level 2 has at least $2\lceil m/2 \rceil$ nodes, and generally level $i$ has at least $2(\lceil m/2 \rceil)^{i-1}$ nodes.

The minimum number of keys is:

$$n \geq 1 + \sum_{i=1}^{h} 2(\lceil m/2 \rceil)^{i-1}(\lceil m/2 \rceil - 1) = 2(\lceil m/2 \rceil)^h - 1$$

Solving for $h$ yields the desired bound.
{{< /proof >}}

## Search Operation

Searching in a B-tree follows a natural recursive approach. At each node, we perform a binary search among the keys to determine which child subtree to explore.

```python
def search(node, key):
    """
    Search for a key in the B-tree rooted at node.
    Returns (node, index) if found, None otherwise.
    """
    # Binary search in current node
    i = 0
    while i < len(node.keys) and key > node.keys[i]:
        i += 1
    
    # Check if key is in current node
    if i < len(node.keys) and key == node.keys[i]:
        return (node, i)
    
    # If leaf node, key not found
    if node.is_leaf:
        return None
    
    # Recursively search in appropriate child
    return search(node.children[i], key)
```

{{< complexity >}}
**Time Complexity:** $O(m \log_m n)$

Each level requires $O(m)$ time for the binary search within a node, and there are $O(\log_m n)$ levels.
{{< /complexity >}}

## Insertion Algorithm

Insertion in a B-tree requires maintaining the balance invariants. When a node becomes full (contains $m-1$ keys), it must be split.

{{< algorithm title="Algorithm: B-Tree Insertion" >}}
**Input:** Root node r, key k
**Output:** Updated B-tree

1. If root is full:
     - Create new root
     - Split old root
     - Insert median into new root
2. Insert k starting from root:
     - If current node is leaf:
         Insert k in sorted position
     - Else:
         Find appropriate child c
         If c is full:
             Split c
             Update current node
         Recursively insert into c
{{< /algorithm >}}

```python
def insert(tree, key):
    """Insert a key into the B-tree."""
    root = tree.root
    
    # If root is full, split it
    if len(root.keys) == tree.order - 1:
        new_root = BNode(is_leaf=False)
        new_root.children.append(root)
        split_child(new_root, 0, root)
        tree.root = new_root
        root = new_root
    
    # Insert into non-full root
    insert_non_full(root, key)

def insert_non_full(node, key):
    """Insert key into node that is not full."""
    i = len(node.keys) - 1
    
    if node.is_leaf:
        # Insert into leaf node
        node.keys.append(None)
        while i >= 0 and key < node.keys[i]:
            node.keys[i + 1] = node.keys[i]
            i -= 1
        node.keys[i + 1] = key
    else:
        # Find child to insert into
        while i >= 0 and key < node.keys[i]:
            i -= 1
        i += 1
        
        # Split child if full
        if len(node.children[i].keys) == tree.order - 1:
            split_child(node, i, node.children[i])
            if key > node.keys[i]:
                i += 1
        
        insert_non_full(node.children[i], key)
```

## Node Splitting

The split operation is crucial for maintaining balance. When a node becomes full, it is split into two nodes, and the median key is promoted to the parent.

```python
def split_child(parent, index, full_child):
    """
    Split a full child node.
    
    Args:
        parent: Parent node
        index: Index of full_child in parent's children
        full_child: The full child to be split
    """
    order = len(full_child.keys) + 1
    median_index = order // 2
    
    # Create new node for right half
    new_node = BNode(is_leaf=full_child.is_leaf)
    
    # Move keys to new node
    new_node.keys = full_child.keys[median_index:]
    full_child.keys = full_child.keys[:median_index]
    
    # Move children if not leaf
    if not full_child.is_leaf:
        new_node.children = full_child.children[median_index + 1:]
        full_child.children = full_child.children[:median_index + 1]
    
    # Insert median key into parent
    median_key = full_child.keys[median_index]
    parent.keys.insert(index, median_key)
    parent.children.insert(index + 1, new_node)
```

{{< theorem number="2" >}}
All B-tree operations (search, insert, delete) can be performed in $O(\log n)$ disk accesses, where each disk access reads or writes an entire node.
{{< /theorem >}}

## Database Indexing Application

B-trees are the standard data structure for database indexes. Consider a table with millions of records indexed by a key field:

{{< example number="1" >}}
**Scenario:** Database table with 10 million records.

- Using B-tree with order $m = 200$ (typical for disk blocks)
- Tree height: $h \leq \log_{100}(10^7/2) \approx 3.5$, so $h \leq 4$
- Search requires at most 4 disk accesses
- Without index: average $5 \times 10^6$ comparisons

This represents a reduction from millions of operations to a handful of disk reads—a dramatic performance improvement.
{{< /example >}}

## Comparison with Other Structures

{{< remark >}}
**Binary Search Trees vs B-Trees:**

- **BST:** Optimized for in-memory operations, $O(\log n)$ comparisons
- **B-Tree:** Optimized for disk I/O, $O(\log_m n)$ disk accesses

Since disk I/O is orders of magnitude slower than memory access, minimizing disk operations is paramount. B-trees achieve this by having large fanout (many children per node), reducing tree height.
{{< /remark >}}

## Variants and Extensions

Several variants of B-trees exist for specialized applications:

{{< definition number="2" name="B+ Tree" >}}
A **B+ tree** is a variant where:

- Only leaf nodes contain actual data or pointers to data
- Internal nodes contain only keys for routing
- Leaf nodes are linked as a linked list

This structure optimizes range queries, as all data resides at the leaves and can be scanned sequentially.
{{< /definition >}}

## Conclusion

B-trees represent a fundamental trade-off in computer science: by increasing the branching factor and node size, we reduce tree height and thus the number of disk accesses required for operations. This principle—matching data structure design to the characteristics of the underlying storage medium—is essential for building efficient systems.

Modern database systems like PostgreSQL, MySQL, and MongoDB all rely on B-tree variants for indexing. Understanding their structure and invariants is crucial for database optimization and query performance analysis.
