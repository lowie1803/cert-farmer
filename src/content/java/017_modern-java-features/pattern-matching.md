# Pattern Matching & Virtual Threads

## Pattern Matching for instanceof (Java 16)

Eliminates redundant casting:

```java
// Old way
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// Pattern matching — cast and bind in one step
if (obj instanceof String s) {
    System.out.println(s.length());
}

// With negation — s is in scope in the else-equivalent
if (!(obj instanceof String s)) {
    return;
}
// s is in scope here (flow scoping)
System.out.println(s.toUpperCase());
```

## Switch Pattern Matching (Java 21)

Full pattern matching in switch — works with any type, not just primitives/enums/strings:

```java
static String describe(Object obj) {
    return switch (obj) {
        case Integer i when i > 0 -> "positive int: " + i;
        case Integer i            -> "non-positive int: " + i;
        case String s             -> "string of length " + s.length();
        case null                 -> "null";
        default                   -> "other: " + obj.getClass().getSimpleName();
    };
}
```

### Key Rules

- **Dominance**: more specific patterns must come before general ones (`Integer i when i > 0` before `Integer i`)
- **Exhaustiveness**: switch must cover all possible types (use `default` or sealed class permits)
- **null handling**: `case null` is now allowed (instead of NullPointerException)

## Record Patterns / Deconstruction (Java 21)

Destructure records directly in patterns:

```java
record Point(int x, int y) {}
record Line(Point start, Point end) {}

static String describePoint(Object obj) {
    return switch (obj) {
        case Point(int x, int y) when x == 0 && y == 0 -> "origin";
        case Point(int x, int y)   -> "(%d, %d)".formatted(x, y);
        case Line(Point s, Point e) -> "line from %s to %s".formatted(s, e);
        default -> "not a shape";
    };
}
```

Nested deconstruction works too — `Line(Point(int x1, int y1), Point(int x2, int y2))`.

## Guarded Patterns

The `when` keyword adds conditions to patterns:

```java
switch (shape) {
    case Circle c when c.radius() > 100 -> "large circle";
    case Circle c                        -> "small circle";
    case Rectangle r when r.area() > 500 -> "large rectangle";
    case Rectangle r                     -> "small rectangle";
    default -> "unknown";
}
```

## Exhaustive Switch with Sealed Types

```java
sealed interface Shape permits Circle, Rectangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}

double area(Shape shape) {
    return switch (shape) {
        case Circle(var r)      -> Math.PI * r * r;
        case Rectangle(var w, var h) -> w * h;
        // No default needed — sealed type is exhaustive
    };
}
```

## Virtual Threads (Java 21)

Lightweight threads managed by the JVM — millions can run concurrently:

```java
// Create a virtual thread
Thread.ofVirtual().start(() -> {
    System.out.println("Running on: " + Thread.currentThread());
});

// With executor
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 10_000; i++) {
        executor.submit(() -> {
            // Each task gets its own virtual thread
            return fetchUrl(url);
        });
    }
} // auto-waits for all tasks

// Check if current thread is virtual
Thread.currentThread().isVirtual();
```

### When to Use Virtual Threads

| Use For | Avoid For |
|---------|-----------|
| I/O-bound tasks (HTTP, DB, file) | CPU-bound computation |
| High-concurrency servers | Tasks using `synchronized` heavily |
| Simple request-per-thread model | Tasks needing thread-local caching |

Virtual threads **mount/unmount** from carrier (platform) threads. They yield automatically during blocking I/O — no need for async/reactive patterns.

## Structured Concurrency (Preview)

```java
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Subtask<String> user = scope.fork(() -> fetchUser(id));
    Subtask<List<Order>> orders = scope.fork(() -> fetchOrders(id));

    scope.join().throwIfFailed();

    return new UserProfile(user.get(), orders.get());
}
```

Groups related concurrent tasks with proper lifecycle management. Still in preview as of Java 21.
