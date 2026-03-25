# Design Principles

## SOLID

| Principle | One-liner | Key idea |
|-----------|-----------|----------|
| **S** — Single Responsibility | A class should have only one reason to change. | Split `UserService` into `UserAuth` + `UserProfile` if it handles both. |
| **O** — Open/Closed | Open for extension, closed for modification. | Add new behavior via subclasses or implementations, not by editing existing code. |
| **L** — Liskov Substitution | Subtypes must be substitutable for their base types. | If `Square extends Rectangle`, setting width must not break height expectations. |
| **I** — Interface Segregation | Clients shouldn't depend on methods they don't use. | Split `Worker` into `Workable` + `Feedable` instead of one fat interface. |
| **D** — Dependency Inversion | Depend on abstractions, not concretions. | `NotificationService` depends on `Sender` interface, not `EmailSender` directly. |

## Composition Over Inheritance

Inheritance creates tight coupling. Composition is more flexible:

```java
// Inheritance approach — rigid
public class LoggingList<E> extends ArrayList<E> {
    @Override
    public boolean add(E e) {
        log("Adding: " + e);
        return super.add(e);   // breaks if ArrayList internals change
    }
}

// Composition approach — flexible
public class LoggingList<E> implements List<E> {
    private final List<E> delegate;  // wraps any List implementation

    public LoggingList(List<E> delegate) {
        this.delegate = delegate;
    }

    @Override
    public boolean add(E e) {
        log("Adding: " + e);
        return delegate.add(e);  // delegates, doesn't depend on internals
    }
    // ... delegate other methods
}
```

**When to use each:**

| Use inheritance | Use composition |
|----------------|-----------------|
| True "is-a" relationship | "has-a" or "uses-a" relationship |
| Shared state + behavior | Reusing behavior without coupling |
| Framework requires it (e.g., `HttpServlet`) | Flexibility to swap implementations |

## Coupling vs Cohesion

| Concept | Good | Bad |
|---------|------|-----|
| **Coupling** | Loose — modules interact through interfaces | Tight — modules depend on each other's internals |
| **Cohesion** | High — class methods relate to a single purpose | Low — class does unrelated things |

**Goal:** high cohesion within classes, loose coupling between classes.

```java
// Low cohesion — does too many things
class UserManager {
    void authenticate() { }
    void sendEmail() { }
    void generateReport() { }
}

// High cohesion — each class has one focus
class AuthService { void authenticate() { } }
class EmailService { void sendEmail() { } }
class ReportService { void generateReport() { } }
```

## Law of Demeter

"Talk only to your immediate friends." A method should only call methods on:

1. Its own object (`this`)
2. Its parameters
3. Objects it creates
4. Its direct fields

```java
// Violates Law of Demeter — "train wreck"
String city = order.getCustomer().getAddress().getCity();

// Better — ask, don't dig
String city = order.getShippingCity();
```

This reduces coupling by hiding internal object structure from callers. If `Address` changes, only `Order` needs updating — not every caller.
