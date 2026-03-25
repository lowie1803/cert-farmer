# Maps & Queues

## Map Implementations

Map is **not** part of the Collection interface — it maps keys to values.

| Feature | HashMap | LinkedHashMap | TreeMap |
|---------|---------|---------------|---------|
| Order | None | Insertion order | Sorted by key |
| `get/put/remove` | O(1) | O(1) | O(log n) |
| Null keys | Yes (one) | Yes (one) | No |
| Null values | Yes | Yes | Yes |
| Implements | Map | Map | NavigableMap |

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);
scores.get("Alice");           // 95
scores.getOrDefault("Eve", 0); // 0
scores.containsKey("Bob");     // true
scores.putIfAbsent("Bob", 99); // no-op, Bob already exists
```

## Useful Map Methods (Java 8+)

```java
// Compute if absent — lazy initialization
map.computeIfAbsent("key", k -> new ArrayList<>()).add(item);

// Merge — combine values
map.merge("key", 1, Integer::sum); // increment counter

// Replace
map.replace("key", oldVal, newVal); // conditional replace

// forEach
map.forEach((k, v) -> System.out.println(k + "=" + v));
```

## Map Factory Methods (Java 9+)

```java
Map<String, Integer> m = Map.of("a", 1, "b", 2);          // up to 10 pairs
Map<String, Integer> m2 = Map.ofEntries(
    Map.entry("a", 1),
    Map.entry("b", 2),
    Map.entry("c", 3)
);
// Both return immutable maps — no null keys or values
```

Java 21 adds `SequencedMap` — `LinkedHashMap` and `TreeMap` implement it.

## Queue & Deque

| Method | Throws Exception | Returns Special Value |
|--------|-----------------|----------------------|
| Insert | `add(e)` | `offer(e)` → `boolean` |
| Remove | `remove()` | `poll()` → `null` if empty |
| Examine | `element()` | `peek()` → `null` if empty |

**ArrayDeque** — default choice for both Queue and Stack:

```java
// As a Queue (FIFO)
Deque<String> queue = new ArrayDeque<>();
queue.offer("first");
queue.offer("second");
queue.poll();  // "first"

// As a Stack (LIFO)
Deque<String> stack = new ArrayDeque<>();
stack.push("bottom");
stack.push("top");
stack.pop();   // "top"
```

Prefer `ArrayDeque` over `Stack` (legacy, synchronized) and `LinkedList` (node overhead).

**PriorityQueue** — elements ordered by natural order or Comparator:

```java
Queue<Integer> pq = new PriorityQueue<>(); // min-heap
pq.offer(3); pq.offer(1); pq.offer(2);
pq.poll(); // 1 (smallest first)
```

## Iteration Patterns

```java
// Enhanced for-each
for (Map.Entry<String, Integer> e : map.entrySet()) {
    System.out.println(e.getKey() + ": " + e.getValue());
}

// forEach with lambda
list.forEach(System.out::println);
map.forEach((k, v) -> System.out.println(k + "=" + v));

// Iterator (allows removal during iteration)
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().startsWith("x")) it.remove();
}
```

## Collections Utility Class

| Method | Description |
|--------|-------------|
| `Collections.sort(list)` | Sort (prefer `list.sort(cmp)`) |
| `Collections.unmodifiableList(list)` | Unmodifiable view |
| `Collections.synchronizedMap(map)` | Thread-safe wrapper |
| `Collections.singletonList(e)` | Immutable single-element list |
| `Collections.emptyList()` | Immutable empty list |
| `Collections.frequency(coll, obj)` | Count occurrences |
| `Collections.reverse(list)` | Reverse in place |
