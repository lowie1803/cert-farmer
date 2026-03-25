# Encapsulation

## Access Modifiers

Java has four access levels. The table shows visibility from different contexts:

| Modifier | Class | Package | Subclass (other pkg) | World |
|----------|-------|---------|---------------------|-------|
| `private` | Yes | No | No | No |
| *(default)* | Yes | Yes | No | No |
| `protected` | Yes | Yes | Yes | No |
| `public` | Yes | Yes | Yes | Yes |

**Memory aid:** private < default < protected < public (increasing visibility).

> Default (package-private) has no keyword — just omit the modifier.

## Getters & Setters

Encapsulation hides fields behind methods, letting you control access, validate, and change internal representation without breaking callers:

```java
public class BankAccount {
    private double balance;         // hidden
    private final String id;        // immutable after construction

    public BankAccount(String id, double initialBalance) {
        this.id = id;
        setBalance(initialBalance); // validate via setter
    }

    public double getBalance() { return balance; }
    public String getId() { return id; }  // no setter — immutable

    public void setBalance(double balance) {
        if (balance < 0) throw new IllegalArgumentException("Negative balance");
        this.balance = balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Positive amount required");
        this.balance += amount;    // direct field access within class is fine
    }
}
```

**Why not public fields?**
- No validation on writes
- Cannot add logging/auditing later
- Cannot change internal type without breaking all callers
- Cannot make read-only

## Immutable Objects

An immutable object cannot be modified after creation. Thread-safe by design.

**Recipe:**
1. All fields `private final`
2. No setters
3. If fields hold mutable objects, return defensive copies
4. Class itself can be `final` (or use `record`)

```java
public record Money(String currency, BigDecimal amount) {
    public Money {   // compact constructor — validation
        Objects.requireNonNull(currency);
        if (amount.compareTo(BigDecimal.ZERO) < 0)
            throw new IllegalArgumentException("Negative amount");
    }
}
// Records are final, fields are private final, accessors generated
```

## JavaBeans Convention

Many frameworks (Spring, JPA, Jackson) expect this pattern:

| Rule | Example |
|------|---------|
| No-arg constructor | `public User() {}` |
| Private fields | `private String name;` |
| `getX()` / `setX()` accessors | `getName()`, `setName(String)` |
| `isX()` for booleans | `isActive()` |
| Implements `Serializable` | Optional but common |

```java
public class User implements Serializable {
    private String name;
    private boolean active;

    public User() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
```

> **Modern Java:** prefer records for data carriers, JavaBeans only when frameworks require mutability.
