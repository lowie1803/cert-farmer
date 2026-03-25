# Custom Exceptions & Best Practices

## Creating Custom Exceptions

**Checked exception** — caller must handle:

```java
public class FeedParseException extends Exception {
    public FeedParseException(String message) {
        super(message);
    }

    public FeedParseException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

**Unchecked exception** — caller may handle:

```java
public class InvalidArticleException extends RuntimeException {
    private final String articleId;

    public InvalidArticleException(String articleId, String message) {
        super(message);
        this.articleId = articleId;
    }

    public String getArticleId() { return articleId; }
}
```

## Exception Chaining

Preserve the original cause when wrapping exceptions:

```java
try {
    parseXml(input);
} catch (SAXException e) {
    throw new FeedParseException("Failed to parse feed", e);
    // e is the cause — accessible via getCause()
}
```

This preserves the full stack trace chain for debugging while presenting a domain-specific exception to callers.

## Best Practices

### Do

- **Use specific exceptions** — throw `IllegalArgumentException` not `RuntimeException`
- **Include context** in messages — `"User not found: id=" + id` not just `"Not found"`
- **Use try-with-resources** for all `AutoCloseable` resources
- **Chain exceptions** — always pass the cause when wrapping
- **Log at the boundary** — log once when you handle, not at every rethrow
- **Favor unchecked exceptions** for programming errors (bad input, invalid state)
- **Use checked exceptions** when the caller can reasonably recover (file not found, network timeout)

### Don't

| Anti-Pattern | Why |
|-------------|-----|
| `catch (Exception e) {}` | Swallows all errors silently |
| `catch (Throwable t)` | Catches Errors you cannot recover from |
| `throw new Exception()` | Too generic, forces broad catch |
| Exceptions for flow control | Expensive — use `Optional` or return codes |
| `e.printStackTrace()` in production | Use a logger instead |
| Catching and rethrowing unchanged | Adds noise, no value |

## Pattern: Resource Cleanup

```java
// Modern — always prefer this
try (var conn = dataSource.getConnection();
     var stmt = conn.prepareStatement(sql);
     var rs = stmt.executeQuery()) {
    while (rs.next()) {
        process(rs);
    }
}

// Custom AutoCloseable
public class Pipeline implements AutoCloseable {
    private final BufferedWriter writer;

    public Pipeline(String path) throws IOException {
        this.writer = new BufferedWriter(new FileWriter(path));
    }

    @Override
    public void close() throws IOException {
        writer.close();
    }
}
```

## Helpful NullPointerExceptions (Java 14+)

JVM now provides detailed NPE messages:

```java
var name = user.getAddress().getCity().toUpperCase();
// NullPointerException: Cannot invoke "Address.getCity()"
// because the return value of "User.getAddress()" is null
```

Enable with `-XX:+ShowCodeDetailsInExceptionMessages` (on by default since Java 15).
