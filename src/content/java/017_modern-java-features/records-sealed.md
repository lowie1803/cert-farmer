# Records & Sealed Classes

## Records (Java 16)

Records are **immutable data carriers** — like Kotlin data classes or Lombok `@Value`. The compiler auto-generates: constructor, getters, `equals()`, `hashCode()`, `toString()`.

```java
public record Point(int x, int y) {}

var p = new Point(3, 4);
p.x();          // 3 (accessor — no "get" prefix)
p.toString();   // "Point[x=3, y=4]"
```

### Compact Constructors

Validate without repeating field assignments:

```java
public record Email(String address) {
    public Email {
        // 'address' is the parameter, auto-assigned after this block
        if (!address.contains("@")) {
            throw new IllegalArgumentException("Invalid email: " + address);
        }
        address = address.strip().toLowerCase(); // normalize
    }
}
```

### Custom Methods

Records can have static methods, instance methods, and implement interfaces:

```java
public record Range(int start, int end) implements Comparable<Range> {
    public int length() { return end - start; }

    @Override
    public int compareTo(Range other) {
        return Integer.compare(this.start, other.start);
    }

    public static Range of(int start, int end) {
        return new Range(start, end);
    }
}
```

### Limitations

| Cannot | Reason |
|--------|--------|
| Extend a class | Records implicitly extend `java.lang.Record` |
| Be extended | Records are implicitly `final` |
| Have mutable fields | All fields are `final` |
| Declare instance fields | Only the component fields in the header |

Records **can**: implement interfaces, have static fields, have static and instance methods, be generic (`record Pair<T>(T first, T second)`).

## Sealed Classes (Java 17)

Sealed classes restrict which classes can extend them:

```java
public sealed class Shape
    permits Circle, Rectangle, Triangle {
    // ...
}

public final class Circle extends Shape {
    private final double radius;
    // ...
}

public sealed class Rectangle extends Shape
    permits Square {           // further restricts
    // ...
}

public non-sealed class Triangle extends Shape {
    // open for extension
}

public final class Square extends Rectangle {
    // ...
}
```

### Permitted Subclass Rules

| Modifier | Meaning |
|----------|---------|
| `final` | No further subclasses |
| `sealed` | Restricts its own subclasses with `permits` |
| `non-sealed` | Opens up — any class can extend |

All three are required — every permitted subclass must be one of these.

### Sealed Interfaces

```java
public sealed interface Result<T>
    permits Success, Failure {
}

public record Success<T>(T value) implements Result<T> {}
public record Failure<T>(String error) implements Result<T> {}
```

Records are implicitly `final`, making them ideal as sealed interface implementations.

## When to Use Records vs Classes

| Use Record When | Use Class When |
|-----------------|----------------|
| Pure data carrier | Mutable state needed |
| Value semantics (equals by content) | Identity semantics (equals by reference) |
| DTOs, events, responses | Entities with lifecycle |
| Small number of fields | Complex construction (Builder pattern) |
| No inheritance needed | Part of a class hierarchy |
