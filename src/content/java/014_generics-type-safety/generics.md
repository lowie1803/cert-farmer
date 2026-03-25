# Generics Fundamentals

## Why Generics?

Without generics, collections store `Object` — requiring casts and risking `ClassCastException` at runtime. Generics move type checking to **compile time**.

```java
// Without generics (pre-Java 5)
List list = new ArrayList();
list.add("hello");
String s = (String) list.get(0); // manual cast

// With generics
List<String> list = new ArrayList<>();
list.add("hello");
String s = list.get(0); // no cast needed
```

## Generic Classes

```java
public class Box<T> {
    private T value;

    public Box(T value) { this.value = value; }
    public T getValue() { return value; }
    public void setValue(T value) { this.value = value; }
}

Box<String> stringBox = new Box<>("hello");
Box<Integer> intBox = new Box<>(42);
```

Multiple type parameters:

```java
public class Pair<K, V> {
    private final K key;
    private final V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }
}

Pair<String, Integer> entry = new Pair<>("age", 30);
```

## Generic Methods

```java
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

// Type inferred from arguments
String s = max("apple", "banana");  // "banana"
int n = max(10, 20);                // 20
```

The `<T>` before the return type declares the type parameter — it is scoped to the method, not the class.

## Naming Conventions

| Parameter | Convention |
|-----------|-----------|
| `T` | Type (general) |
| `E` | Element (collections) |
| `K` | Key |
| `V` | Value |
| `N` | Number |
| `S, U` | Second, third types |

## Type Erasure

Generics are a **compile-time** feature. The compiler:
1. Replaces type parameters with their bounds (or `Object`)
2. Inserts casts where needed
3. Generates bridge methods for polymorphism

At runtime, `List<String>` and `List<Integer>` are both just `List`. This is **type erasure**.

### Implications

| Cannot Do | Why |
|-----------|-----|
| `new T()` | Type unknown at runtime |
| `new T[10]` | Cannot create generic array |
| `instanceof List<String>` | Type info erased |
| `T.class` | No class literal for type parameter |
| Use primitives: `List<int>` | Primitives have no Object supertype |

```java
// Workaround for generic array
@SuppressWarnings("unchecked")
T[] array = (T[]) new Object[size];

// Workaround for instanceof
if (list instanceof List<?> l) { ... }  // unbounded wildcard OK
```

## Diamond Operator (Java 7+)

```java
// Type inferred from left side
Map<String, List<Integer>> map = new HashMap<>();  // diamond <>
// var (Java 10+) also works
var map = new HashMap<String, List<Integer>>();
```
