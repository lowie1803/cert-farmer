# Classes & Fields

## Class Anatomy

A Java class is a blueprint for objects. Every `.java` file can contain one public class whose name must match the filename.

```java
public class Account {
    // Fields (instance variables)
    private String owner;
    private double balance;

    // Static field (shared across all instances)
    private static int totalAccounts = 0;

    // Constant (static + final)
    public static final double MIN_BALANCE = 0.0;

    // Final field (must be set once — in declaration or constructor)
    private final String id;

    public Account(String id, String owner) {
        this.id = id;           // 'this' refers to current instance
        this.owner = owner;
        this.balance = 0.0;
        totalAccounts++;
    }
}
```

## Field Types

| Modifier | Scope | Lifetime | Access via |
|----------|-------|----------|------------|
| Instance field | Per object | Object lifetime | `obj.field` |
| `static` field | Per class | Class lifetime | `ClassName.field` |
| `final` field | Per object | Object lifetime | Immutable after init |
| `static final` | Per class | Class lifetime | Constant — `ClassName.CONST` |

## Object Creation

Objects are created with `new`, which allocates heap memory and calls a constructor:

```java
Account acc = new Account("A001", "Alice");  // reference on stack, object on heap
Account acc2 = acc;     // copies reference, same object
Account acc3 = null;    // reference to nothing
```

- `new` always returns a reference, never the object itself
- `==` compares references; `.equals()` compares content
- Unreferenced objects are garbage-collected automatically

## The `this` Keyword

| Usage | Example |
|-------|---------|
| Disambiguate field vs parameter | `this.name = name;` |
| Call another constructor | `this(defaultId, owner);` |
| Pass current object | `list.add(this);` |
| Return current object (fluent API) | `return this;` |

## Nested & Inner Classes

```java
public class Outer {
    // Static nested — no access to Outer instance
    static class StaticNested { }

    // Inner — has implicit reference to Outer instance
    class Inner { }

    void demo() {
        // Local class — inside a method
        class Local { }

        // Anonymous class — inline subclass/impl
        Runnable r = new Runnable() {
            public void run() { System.out.println("anon"); }
        };
    }
}
```

| Type | Has `Outer.this`? | Can be `static`? | Common use |
|------|-------------------|------------------|------------|
| Static nested | No | Yes | Helper/builder classes |
| Inner | Yes | No | Iterators, event handlers |
| Local | Yes (if non-static method) | No | One-off logic |
| Anonymous | Yes (if non-static method) | No | Quick interface impl |

> **Java 16+**: Records and sealed classes provide modern alternatives to many nested class patterns.
