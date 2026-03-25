# Streams API

## What is a Stream?

A stream is a **pipeline** of operations on a data source. Streams are:
- **Lazy** — intermediate operations are not executed until a terminal operation is called
- **Single-use** — a stream cannot be reused after a terminal operation
- **Non-mutating** — they don't modify the source collection

```
Source → filter → map → sorted → collect
         ────────────────────     ───────
         intermediate ops         terminal op
```

## Creating Streams

```java
// From collection
List<String> list = List.of("a", "b", "c");
Stream<String> s1 = list.stream();

// From values
Stream<String> s2 = Stream.of("x", "y", "z");

// From array
int[] arr = {1, 2, 3};
IntStream s3 = Arrays.stream(arr);

// Generate (infinite)
Stream<Double> randoms = Stream.generate(Math::random);
Stream<Integer> counting = Stream.iterate(0, n -> n + 1);

// Bounded iterate (Java 9+)
Stream<Integer> range = Stream.iterate(0, n -> n < 10, n -> n + 1);
```

## Intermediate Operations (Lazy)

| Operation | Description | Example |
|-----------|-------------|---------|
| `filter(pred)` | Keep elements matching predicate | `.filter(s -> s.length() > 3)` |
| `map(func)` | Transform each element | `.map(String::toUpperCase)` |
| `flatMap(func)` | Flatten nested streams | `.flatMap(list -> list.stream())` |
| `sorted()` | Natural order sort | `.sorted()` |
| `sorted(cmp)` | Custom sort | `.sorted(Comparator.reverseOrder())` |
| `distinct()` | Remove duplicates (by equals) | `.distinct()` |
| `peek(action)` | Debug — perform action without consuming | `.peek(System.out::println)` |
| `limit(n)` | Take first n elements | `.limit(5)` |
| `skip(n)` | Skip first n elements | `.skip(2)` |
| `mapToInt/Long/Double` | Map to primitive stream | `.mapToInt(String::length)` |

## Terminal Operations (Eager)

| Operation | Returns | Description |
|-----------|---------|-------------|
| `collect(collector)` | Varies | Accumulate into collection |
| `forEach(action)` | `void` | Perform action on each |
| `reduce(identity, op)` | `T` | Combine all elements |
| `count()` | `long` | Number of elements |
| `findFirst()` | `Optional<T>` | First element |
| `findAny()` | `Optional<T>` | Any element (parallel-friendly) |
| `anyMatch(pred)` | `boolean` | Any element matches? |
| `allMatch(pred)` | `boolean` | All elements match? |
| `noneMatch(pred)` | `boolean` | No elements match? |
| `toList()` | `List<T>` | Collect to unmodifiable list (Java 16+) |
| `min(cmp)` / `max(cmp)` | `Optional<T>` | Min/max by comparator |

## Collectors

```java
import static java.util.stream.Collectors.*;

// To collections
List<String> list = stream.collect(toList());       // mutable
List<String> list2 = stream.toList();               // immutable (Java 16+)
Set<String> set = stream.collect(toSet());

// Joining strings
String csv = names.stream().collect(joining(", "));  // "Alice, Bob, Carol"

// Grouping
Map<String, List<Article>> bySource = articles.stream()
    .collect(groupingBy(Article::source));

// Grouping with downstream collector
Map<String, Long> countBySource = articles.stream()
    .collect(groupingBy(Article::source, counting()));

// Summarizing
IntSummaryStatistics stats = numbers.stream()
    .collect(summarizingInt(Integer::intValue));
// stats.getAverage(), stats.getMax(), stats.getSum(), stats.getCount()

// Partitioning (true/false groups)
Map<Boolean, List<Integer>> parts = nums.stream()
    .collect(partitioningBy(n -> n > 0));

// To map
Map<String, Integer> nameToAge = people.stream()
    .collect(toMap(Person::name, Person::age));
```

## Practical Examples

```java
// Filter, transform, collect
List<String> result = articles.stream()
    .filter(a -> a.source().equals("Reuters"))
    .map(Article::title)
    .map(String::toUpperCase)
    .sorted()
    .toList();

// Reduce — sum
int total = List.of(1, 2, 3, 4).stream()
    .reduce(0, Integer::sum);  // 10

// FlatMap — flatten nested lists
List<String> allTags = articles.stream()
    .flatMap(a -> a.tags().stream())
    .distinct()
    .sorted()
    .toList();
```

## Parallel Streams

```java
long count = list.parallelStream()
    .filter(s -> s.length() > 3)
    .count();
```

**Caution**: Parallel streams use the common ForkJoinPool. Only use for CPU-bound work on large datasets. Avoid side effects, shared mutable state, and order-dependent operations.
