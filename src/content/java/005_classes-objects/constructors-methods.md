# Constructors & Methods

## Constructors

Constructors initialize objects. They have no return type and must match the class name.

```java
public class Product {
    private String name;
    private double price;
    private String category;

    // Primary constructor
    public Product(String name, double price, String category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    // Overloaded — fewer params
    public Product(String name, double price) {
        this(name, price, "General");   // constructor chaining with this()
    }

    // Default-like
    public Product(String name) {
        this(name, 0.0);               // chains to 2-arg, which chains to 3-arg
    }
}
```

**Constructor rules:**
- If you write no constructor, the compiler generates a no-arg default
- If you write any constructor, the default is **not** generated
- `this()` must be the **first statement** in a constructor
- Constructor chaining avoids duplicating initialization logic

## Method Signatures

```java
// [access] [static] returnType name(params) [throws]
public static double calculateTax(double amount, double rate) throws Exception {
    return amount * rate;
}
```

| Component | Required? | Notes |
|-----------|-----------|-------|
| Access modifier | No (default = package-private) | `public`, `protected`, `private` |
| `static` | No | Class-level, no `this` |
| Return type | Yes | Use `void` for no return |
| Name | Yes | camelCase convention |
| Parameters | Yes (can be empty) | Comma-separated |
| `throws` | No | Checked exceptions only |

## Varargs

Variable-length arguments — must be the **last** parameter, only one per method:

```java
public int sum(int... numbers) {     // receives as int[]
    int total = 0;
    for (int n : numbers) total += n;
    return total;
}

sum(1, 2, 3);       // 6
sum();               // 0
sum(new int[]{4,5}); // 9
```

## Static vs Instance Methods

| Feature | Instance method | Static method |
|---------|----------------|---------------|
| Called on | Object (`obj.method()`) | Class (`Class.method()`) |
| Access to `this` | Yes | No |
| Can access instance fields | Yes | No (needs object reference) |
| Common use | Behavior of object | Utility/factory methods |

```java
public class MathUtils {
    public static int max(int a, int b) { return a > b ? a : b; }  // static utility
}
MathUtils.max(3, 7);  // no object needed
```

## Method Overloading

Same name, different parameter list (type, count, or order). Return type alone is **not** enough.

```java
public class Formatter {
    String format(int value)           { return String.valueOf(value); }
    String format(double value)        { return String.format("%.2f", value); }
    String format(String label, int v) { return label + ": " + v; }

    // ❌ Compile error — same params, different return type
    // int format(int value) { return value; }
}
```

**Overloading resolution order:** exact match > widening > autoboxing > varargs.

## Quick Reference

```java
// Record — concise immutable class (Java 16+)
public record Point(double x, double y) {
    // Compact constructor for validation
    public Point {
        if (x < 0 || y < 0) throw new IllegalArgumentException();
    }
}

var p = new Point(1.0, 2.0);
p.x();  // accessor (not getX)
```
