# Lists & Sets

## Collection Hierarchy

```
Iterable
  └─ Collection
       ├─ List (ordered, duplicates allowed)
       │    ├─ ArrayList
       │    └─ LinkedList
       ├─ Set (no duplicates)
       │    ├─ HashSet
       │    ├─ LinkedHashSet
       │    └─ TreeSet (SortedSet → NavigableSet)
       └─ Queue
            ├─ PriorityQueue
            └─ Deque
                 └─ ArrayDeque
```

Java 21 adds **SequencedCollection** as a supertype for collections with a defined encounter order.

## List: ArrayList vs LinkedList

| Feature | ArrayList | LinkedList |
|---------|-----------|------------|
| Backed by | Resizable array | Doubly-linked list |
| `get(i)` | O(1) | O(n) |
| `add(e)` (end) | O(1) amortized | O(1) |
| `add(i, e)` (middle) | O(n) — shifts elements | O(1) after traversal |
| `remove(i)` | O(n) | O(1) after traversal |
| Memory | Compact, cache-friendly | Node overhead per element |
| **Default choice** | **Yes** | Rarely — only for heavy insert/remove at ends |

```java
List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.get(0);         // "Alice"
names.set(1, "Carol"); // replace at index
names.remove("Alice"); // remove by value
```

## Set: HashSet vs TreeSet vs LinkedHashSet

| Feature | HashSet | LinkedHashSet | TreeSet |
|---------|---------|---------------|---------|
| Order | None | Insertion order | Sorted (natural or Comparator) |
| `add/contains/remove` | O(1) | O(1) | O(log n) |
| Null allowed | Yes (one) | Yes (one) | No (unless Comparator handles it) |
| Implements | Set | Set | NavigableSet |
| Use when | Fast lookup, order irrelevant | Preserve insertion order | Need sorted iteration |

```java
Set<String> tags = new HashSet<>();
tags.add("java");
tags.add("java");   // ignored — duplicate
tags.size();        // 1

Set<Integer> sorted = new TreeSet<>(List.of(3, 1, 2));
// [1, 2, 3] — automatically sorted
```

## Factory Methods (Java 9+)

```java
List<String> list = List.of("a", "b", "c");     // immutable
Set<String> set = Set.of("x", "y", "z");         // immutable, no duplicates allowed

// Mutable copy
List<String> mutable = new ArrayList<>(List.of("a", "b"));
```

**Immutable collections** throw `UnsupportedOperationException` on `add()`, `remove()`, `set()`. They also disallow `null` elements.

## SequencedCollection (Java 21)

New interface adding first/last access to ordered collections:

```java
SequencedCollection<String> seq = new ArrayList<>(List.of("a", "b", "c"));
seq.getFirst();    // "a"
seq.getLast();     // "c"
seq.addFirst("z"); // ["z", "a", "b", "c"]
seq.reversed();    // reversed view
```

Implemented by: `ArrayList`, `LinkedList`, `LinkedHashSet`, `TreeSet`.

## Choosing the Right Implementation

| Need | Use |
|------|-----|
| Fast random access, ordered | `ArrayList` |
| No duplicates, fast lookup | `HashSet` |
| No duplicates, sorted | `TreeSet` |
| No duplicates, insertion order | `LinkedHashSet` |
| Queue/stack behavior | `ArrayDeque` |
