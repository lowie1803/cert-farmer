# Lambda Expressions

## Lambda Syntax

A lambda is a concise way to represent a single-method interface (functional interface):

```java
// Full syntax
(String a, String b) -> { return a.compareTo(b); }

// Simplified — type inference, single expression
(a, b) -> a.compareTo(b)

// Single parameter — no parentheses needed
x -> x * 2

// No parameters
() -> System.out.println("hello")
```

**Rules**: If the body is a single expression, `return` and braces are optional. If it has multiple statements, braces and explicit `return` are required.

## Core Functional Interfaces

All in `java.util.function`:

| Interface | Method | Signature | Example |
|-----------|--------|-----------|---------|
| `Predicate<T>` | `test` | `T → boolean` | `s -> s.isEmpty()` |
| `Function<T,R>` | `apply` | `T → R` | `s -> s.length()` |
| `Consumer<T>` | `accept` | `T → void` | `s -> System.out.println(s)` |
| `Supplier<T>` | `get` | `() → T` | `() -> new ArrayList<>()` |
| `BiFunction<T,U,R>` | `apply` | `(T, U) → R` | `(a, b) -> a + b` |
| `BiPredicate<T,U>` | `test` | `(T, U) → boolean` | `(s, i) -> s.length() > i` |
| `BiConsumer<T,U>` | `accept` | `(T, U) → void` | `(k, v) -> map.put(k, v)` |
| `UnaryOperator<T>` | `apply` | `T → T` | `s -> s.toUpperCase()` |
| `BinaryOperator<T>` | `apply` | `(T, T) → T` | `(a, b) -> a + b` |

## Composing Functions

```java
Predicate<String> notEmpty = s -> !s.isEmpty();
Predicate<String> startsWithA = s -> s.startsWith("A");
Predicate<String> combined = notEmpty.and(startsWithA);

Function<String, String> trim = String::strip;
Function<String, String> upper = String::toUpperCase;
Function<String, String> pipeline = trim.andThen(upper);
pipeline.apply("  hello  ");  // "HELLO"
```

## Method References

Four types — shorthand for lambdas:

| Type | Syntax | Lambda Equivalent |
|------|--------|-------------------|
| Static | `Integer::parseInt` | `s -> Integer.parseInt(s)` |
| Instance (bound) | `str::startsWith` | `s -> str.startsWith(s)` |
| Instance (unbound) | `String::toUpperCase` | `s -> s.toUpperCase()` |
| Constructor | `ArrayList::new` | `() -> new ArrayList<>()` |

```java
List<String> names = List.of("Alice", "Bob", "Carol");
names.forEach(System.out::println);          // bound instance
names.stream().map(String::toLowerCase);     // unbound instance
names.stream().map(StringBuilder::new);      // constructor
```

## Effectively Final

Lambdas can capture local variables, but they must be **effectively final** (never reassigned after initialization):

```java
String prefix = "Hello";  // effectively final
// prefix = "Hi";         // would break the lambda below

Consumer<String> greeter = name -> System.out.println(prefix + " " + name);
```

## Comparator with Lambdas

```java
// Old way
list.sort(new Comparator<String>() {
    public int compare(String a, String b) {
        return a.length() - b.length();
    }
});

// Lambda
list.sort((a, b) -> a.length() - b.length());

// Comparator factory methods (best)
list.sort(Comparator.comparingInt(String::length));
list.sort(Comparator.comparing(String::length).reversed());
list.sort(Comparator.comparing(Person::lastName)
                    .thenComparing(Person::firstName));
```
