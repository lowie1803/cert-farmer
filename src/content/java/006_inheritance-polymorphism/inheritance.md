# Inheritance

## extends & Single Inheritance

Java supports **single class inheritance** — a class can extend exactly one parent. All classes implicitly extend `Object`.

```java
public class Vehicle {
    protected String make;
    protected int year;

    public Vehicle(String make, int year) {
        this.make = make;
        this.year = year;
    }

    public String describe() {
        return year + " " + make;
    }
}

public class Car extends Vehicle {
    private int doors;

    public Car(String make, int year, int doors) {
        super(make, year);     // MUST be first statement
        this.doors = doors;
    }
}
```

## super Keyword

| Usage | Example |
|-------|---------|
| Call parent constructor | `super(args);` — must be first line |
| Call parent method | `super.describe()` |
| Access parent field | `super.make` (if shadowed) |

**Constructor chaining with super():**
- If you don't call `super()` explicitly, the compiler inserts `super()` (no-arg)
- If the parent has no no-arg constructor, you **must** call `super(args)` explicitly
- Cannot use both `this()` and `super()` in the same constructor

## Object Class Methods

Every class inherits from `java.lang.Object`. Override these three together:

| Method | Default behavior | Override when |
|--------|-----------------|---------------|
| `toString()` | `ClassName@hashCode` | Always — for debugging |
| `equals(Object)` | Same as `==` (reference) | Value-based equality needed |
| `hashCode()` | Memory-based int | Whenever you override `equals` |

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Car c)) return false;  // pattern matching (Java 16+)
    return doors == c.doors && year == c.year && Objects.equals(make, c.make);
}

@Override
public int hashCode() {
    return Objects.hash(make, year, doors);
}

@Override
public String toString() {
    return "Car[%s, %d doors]".formatted(describe(), doors);
}
```

**Contract:** if `a.equals(b)` then `a.hashCode() == b.hashCode()`. Violating this breaks `HashMap`, `HashSet`, etc.

## final Classes & Methods

| Modifier | Effect |
|----------|--------|
| `final class` | Cannot be extended (e.g., `String`, `Integer`) |
| `final method` | Cannot be overridden in subclasses |
| `sealed class` (Java 17+) | Restricts which classes can extend it |

```java
public sealed class Shape permits Circle, Rectangle { }
public final class Circle extends Shape { }        // cannot be extended further
public non-sealed class Rectangle extends Shape { } // open for extension
```

## Inheritance Pitfalls

- **Fragile base class** — changes in parent can break subclasses unexpectedly
- **Deep hierarchies** — prefer composition over more than 2-3 levels
- **Constructor order** — parent constructor runs first, then child
- **Field hiding** — subclass fields with same name hide (not override) parent fields
