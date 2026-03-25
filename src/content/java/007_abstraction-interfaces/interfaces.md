# Interfaces

## Interface Declaration

An interface defines a **contract** — a set of methods a class must implement. Since Java 8+, interfaces can also provide default implementations.

```java
public interface Searchable {
    // Abstract method (implicitly public abstract)
    List<String> search(String query);

    // Default method (Java 8+) — provides implementation
    default List<String> searchIgnoreCase(String query) {
        return search(query.toLowerCase());
    }

    // Static method (Java 8+) — utility, called on interface
    static Searchable noOp() {
        return query -> List.of();
    }

    // Private method (Java 9+) — shared logic for defaults
    private boolean isValid(String query) {
        return query != null && !query.isBlank();
    }

    // Constant (implicitly public static final)
    int MAX_RESULTS = 100;
}
```

## implements & Multiple Interfaces

A class can implement **multiple** interfaces (unlike single class inheritance):

```java
public class ProductRepository implements Searchable, Sortable, Serializable {
    @Override
    public List<String> search(String query) { /* ... */ }

    @Override
    public void sort(String field) { /* ... */ }
}
```

## Method Evolution

| Version | Feature | Purpose |
|---------|---------|---------|
| Java 7 | Abstract methods, constants | Contract definition |
| Java 8 | `default` methods, `static` methods | API evolution without breaking impls |
| Java 9 | `private` methods | Share code between defaults |
| Java 17 | `sealed` interfaces | Restrict implementations |

## Functional Interfaces

An interface with exactly **one** abstract method. Can be used with lambda expressions:

```java
@FunctionalInterface
public interface Converter<F, T> {
    T convert(F from);
    // Can still have default/static methods
}

// Lambda implementation
Converter<String, Integer> toInt = Integer::parseInt;
int result = toInt.convert("42");
```

Key built-in functional interfaces (`java.util.function`):

| Interface | Method | Signature |
|-----------|--------|-----------|
| `Function<T,R>` | `apply` | `T -> R` |
| `Predicate<T>` | `test` | `T -> boolean` |
| `Consumer<T>` | `accept` | `T -> void` |
| `Supplier<T>` | `get` | `() -> T` |
| `UnaryOperator<T>` | `apply` | `T -> T` |

## Interface vs Abstract Class

| Criteria | Interface | Abstract class |
|----------|-----------|----------------|
| Multiple inheritance | Yes (implements many) | No (extends one) |
| State (instance fields) | No (only constants) | Yes |
| Constructors | No | Yes |
| Access modifiers on methods | `public` only (abstract) | Any |
| Default implementations | `default` methods | Regular methods |
| **Use when** | Defining capability/contract | Sharing state + partial impl |

**Rule of thumb:** Use interfaces for "can-do" relationships (`Comparable`, `Serializable`) and abstract classes for "is-a" relationships with shared state.

## Diamond Problem

When two interfaces provide the same default method, the implementing class **must** override it:

```java
interface A { default String greet() { return "A"; } }
interface B { default String greet() { return "B"; } }

class C implements A, B {
    @Override
    public String greet() {
        return A.super.greet();  // explicitly choose
    }
}
```
