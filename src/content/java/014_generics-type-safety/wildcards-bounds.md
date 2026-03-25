# Wildcards & Bounded Types

## Unbounded Wildcard `?`

`List<?>` accepts a list of **any** type. Useful when you only read or check size:

```java
public static void printAll(List<?> list) {
    for (Object item : list) {
        System.out.println(item);
    }
}

printAll(List.of("a", "b"));   // works
printAll(List.of(1, 2, 3));    // works
```

You cannot `add()` to `List<?>` (except `null`) because the compiler doesn't know the element type.

## Upper Bounded Wildcard `? extends T`

Accepts `T` or any **subtype** of `T`. Use when **reading** from a structure:

```java
// Accepts List<Integer>, List<Double>, etc.
public static double sum(List<? extends Number> list) {
    double total = 0;
    for (Number n : list) {
        total += n.doubleValue();
    }
    return total;
}

sum(List.of(1, 2, 3));       // List<Integer> — works
sum(List.of(1.5, 2.5));      // List<Double> — works
```

**Cannot add** to `List<? extends Number>` — the compiler doesn't know the specific subtype.

## Lower Bounded Wildcard `? super T`

Accepts `T` or any **supertype** of `T`. Use when **writing** to a structure:

```java
// Accepts List<Integer>, List<Number>, List<Object>
public static void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
    list.add(3);
}

List<Number> nums = new ArrayList<>();
addNumbers(nums); // works — Number is a supertype of Integer
```

**Reading** from `List<? super Integer>` returns `Object` — you lose type information.

## PECS: Producer Extends, Consumer Super

This is the key rule for choosing wildcards:

| Role | Wildcard | Example |
|------|----------|---------|
| **Producer** (you read from it) | `? extends T` | `src: List<? extends T>` |
| **Consumer** (you write to it) | `? super T` | `dest: List<? super T>` |
| Both read and write | No wildcard | `List<T>` |

```java
// Collections.copy signature demonstrates PECS
public static <T> void copy(List<? super T> dest,
                             List<? extends T> src) {
    for (int i = 0; i < src.size(); i++) {
        dest.set(i, src.get(i));
    }
}
```

## Bounded Type Parameters

Restrict a type parameter with `extends`:

```java
// T must implement Comparable
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

// Multiple bounds (class first, then interfaces)
public static <T extends Number & Comparable<T>> T clamp(
        T value, T min, T max) {
    if (value.compareTo(min) < 0) return min;
    if (value.compareTo(max) > 0) return max;
    return value;
}
```

## Wildcards vs Type Parameters

| Use | When |
|-----|------|
| `<T>` type parameter | You need to reference the type (return it, use it in multiple places) |
| `?` wildcard | You don't need to name the type, just constrain it |

```java
// Type parameter — T used in return type
<T> T firstOf(List<T> list) { return list.get(0); }

// Wildcard — type not needed elsewhere
void printSize(List<?> list) { System.out.println(list.size()); }
```

## Quick Reference

```
List<?>              → read-only, any type
List<? extends Foo>  → read-only, Foo or subtypes (PRODUCER)
List<? super Foo>    → write Foo, read as Object (CONSUMER)
List<Foo>            → read + write Foo exactly
```
